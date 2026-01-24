import express from "express";
import { users } from "../data.js";
import { authMiddleware } from "../services/auth.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  const user = users.find((item) => item.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  return res.json({
    name: user.name,
    email: user.email,
    level: user.level,
    goal: user.goal,
    preferredDays: user.preferredDays,
    preferredTimes: user.preferredTimes
  });
});

export default router;
