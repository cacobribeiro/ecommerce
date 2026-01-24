import express from "express";
import { addUser, users, verifyUserPassword } from "../data.js";
import { createToken } from "../services/auth.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email);

  if (!user || !verifyUserPassword(user, password)) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const token = createToken({ id: user.id, email: user.email, name: user.name });
  return res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      level: user.level,
      goal: user.goal,
      preferredDays: user.preferredDays,
      preferredTimes: user.preferredTimes
    }
  });
});

router.post("/register", (req, res) => {
  const { name, email, password, level, goal, preferredDays, preferredTimes } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios." });
  }

  const exists = users.some((item) => item.email === email);
  if (exists) {
    return res.status(400).json({ message: "E-mail já cadastrado." });
  }

  const user = addUser({ name, email, password, level, goal, preferredDays, preferredTimes });
  const token = createToken({ id: user.id, email: user.email, name: user.name });

  return res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      level: user.level,
      goal: user.goal,
      preferredDays: user.preferredDays,
      preferredTimes: user.preferredTimes
    }
  });
});

export default router;
