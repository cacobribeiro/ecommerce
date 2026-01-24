import express from "express";
import { plans } from "../data.js";

const router = express.Router();

router.get("/plans", (req, res) => {
  return res.json({
    rules: [
      "Pagamentos feitos antecipadamente.",
      "Cancelamentos até 2h antes da aula.",
      "Aulas via Google Meet, link enviado após confirmação."
    ],
    plans
  });
});

export default router;
