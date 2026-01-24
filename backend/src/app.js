import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import leadRoutes from "./routes/leads.js";
import profileRoutes from "./routes/profile.js";
import siteConfigRoutes from "./routes/siteConfig.js";

dotenv.config();

const app = express();
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : true;

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin: corsOrigins,
    credentials: true
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(
  session({
    name: "yoga.sid",
    secret: process.env.SESSION_SECRET || "dev-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 8
    }
  })
);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", leadRoutes);
app.use("/api", siteConfigRoutes);

export default app;
