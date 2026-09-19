const { getDB, toObjectId } = require("../utils/mongo");
const AppError = require("../utils/AppError");
const { computeZoneStatus } = require("./zoneEngine");
const { emit } = require("./wsEmitter");

const resolveSos = async (bandId, userId) => {
  const db = getDB();
  const oid = toObjectId(bandId);
  if (!oid) throw new AppError("Band not found", 404);

  const band = await db.collection("bands").findOne({ _id: oid });
  if (!band) throw new AppError("Band not found", 404);
  if (band.owner_user_id.toString() !== userId) throw new AppError("Access denied", 403);

  if (band.status !== "sos") {
    throw new AppError("Band is not in SOS status", 400);
  }

  const now = new Date();

  // Find the most recent unresolved SOS event
  const sosEvent = await db
    .collection("sos_events")
    .findOne(
      { band_id: oid, resolved_at: null },
      { sort: { triggered_at: -1 } }
    );

  if (!sosEvent) {
    throw new AppError("No active SOS event found", 404);
  }

  // Compute zone-based status based on last known location
  let newStatus = "offline";
  if (band.last_lat !== null && band.last_lng !== null) {
    newStatus = await computeZoneStatus(oid, band.last_lat, band.last_lng);
  }

  // Update SOS event
  await db.collection("sos_events").updateOne(
    { _id: sosEvent._id },
    {
      $set: {
        resolved_at: now,
        resolved_by_user_id: toObjectId(userId),
      },
    }
  );

  // Update band status
  await db.collection("bands").updateOne(
    { _id: oid },
    { $set: { status: newStatus, updated_at: now } }
  );

  // Log SOS resolved
  await db.collection("activity_logs").insertOne({
    band_id: oid,
    user_id: toObjectId(userId),
    type: "sos_resolved",
    details: {
      sosEventId: sosEvent._id.toString(),
      resolvedStatus: newStatus,
      lat: band.last_lat,
      lng: band.last_lng,
    },
    created_at: now,
  });

  // Broadcast events
  emit("sos_resolved", {
    bandId: bandId,
    sosEventId: sosEvent._id.toString(),
    resolvedBy: userId,
    newStatus,
    timestamp: now,
  });

  emit("band_status_updated", {
    bandId: bandId,
    status: newStatus,
    previousStatus: "sos",
    timestamp: now,
  });

  return {
    sosEventId: sosEvent._id.toString(),
    resolvedAt: now,
    newStatus,
    lat: band.last_lat,
    lng: band.last_lng,
  };
};

module.exports = { resolveSos };
