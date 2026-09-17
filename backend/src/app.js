const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const config = require("./config");
const { connectDB } = require("./utils/mongo");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./config/logger");

const app = express();

app.use(helmet());
app.use(cors({ origin: config.cors.origin }));
app.use(express.json({ limit: "10kb" }));

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((req, _res, next) => {
  logger.debug(`${req.method} ${req.path}`);
  next();
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/bands", require("./routes/band.routes"));
app.use("/api/bands", require("./routes/profile.routes"));

app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} [${config.nodeEnv}]`);
  });
};

start().catch((err) => {
  logger.error("Failed to start server:", err);
  process.exit(1);
});

module.exports = app;
