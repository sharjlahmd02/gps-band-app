const { MongoClient, ObjectId } = require("mongodb");
const config = require("../config");
const logger = require("../config/logger");

let client;
let db;

const connectDB = async () => {
  if (db) return db;

  client = new MongoClient(config.databaseUrl, {
    maxPoolSize: 10,
    minPoolSize: 2,
  });

  await client.connect();
  const urlParts = config.databaseUrl.split("/");
  const dbName = urlParts[urlParts.length - 1].split("?")[0];
  db = client.db(dbName);

  logger.info(`Connected to MongoDB: ${dbName}`);

  process.on("SIGINT", async () => {
    await client.close();
    logger.info("MongoDB connection closed");
    process.exit(0);
  });

  return db;
};

const getDB = () => {
  if (!db) throw new Error("Database not connected. Call connectDB() first.");
  return db;
};

const toObjectId = (id) => {
  if (id instanceof ObjectId) return id;
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
};

module.exports = { connectDB, getDB, ObjectId, toObjectId };
