import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import leadRoutes from "./routes/leads.js";
import profileRoutes from "./routes/profile.js";

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

export default app;
