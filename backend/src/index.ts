import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { initDb } from "./db.js";
import blessingsRouter from "./routes/blessings.js";
import galleryRouter from "./routes/gallery.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const isProduction = process.env.NODE_ENV === "production";

// ── Security & logging middleware ──────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: isProduction
    ? [FRONTEND_URL, /\.vercel\.app$/]
    : ["http://localhost:5173", "http://localhost:4173"],
  credentials: true,
}));
app.use(express.json({ limit: "5mb" }));

if (isProduction) {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// ── Rate limiting ──────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" },
});
app.use("/api/", apiLimiter);

// Stricter limiter for write operations
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many write operations, please try again later" },
});

// ── Health check ───────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "chibuike-dedication-api",
    environment: isProduction ? "production" : "development",
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ─────────────────────────────────────────────────────────
app.use("/api/blessings", writeLimiter, blessingsRouter);
app.use("/api/gallery", writeLimiter, galleryRouter);

// ── Error handling ─────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ── Start server ───────────────────────────────────────────────────
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} [${isProduction ? "production" : "development"}]`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });