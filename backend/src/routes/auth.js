import express from "express";
import { users } from "../data.js";
import { createToken } from "../services/auth.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const token = createToken({ id: user.id, email: user.email, name: user.name });
  return res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      plan: user.plan
    }
  });
});

export default router;
