import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import leadRoutes from "./routes/leads.js";
import siteConfigRoutes from "./routes/siteConfig.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", leadRoutes);
app.use("/api", siteConfigRoutes);

export default app;
