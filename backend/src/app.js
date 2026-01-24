import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import planRoutes from "./routes/plans.js";
import profileRoutes from "./routes/profile.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", authRoutes);
app.use("/api", planRoutes);
app.use("/api", profileRoutes);
app.use("/api", bookingRoutes);

export default app;
