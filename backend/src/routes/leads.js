import express from "express";
import { contactMessages, privateLessonLeads } from "../data.js";

const router = express.Router();

router.post("/private-lessons", (req, res) => {
  const { name, email, message, preferredTime } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Preencha nome, e-mail e mensagem." });
  }

  privateLessonLeads.push({
    id: `lead-${Date.now()}`,
    name,
    email,
    message,
    preferredTime: preferredTime || ""
  });

  return res.status(201).json({ message: "Recebemos sua solicitação." });
});

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Preencha nome, e-mail e mensagem." });
  }

  contactMessages.push({
    id: `contact-${Date.now()}`,
    name,
    email,
    message
  });

  return res.status(201).json({ message: "Mensagem recebida." });
});

export default router;
