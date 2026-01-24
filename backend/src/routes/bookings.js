import express from "express";
import { bookings } from "../data.js";
import { authMiddleware } from "../services/auth.js";
import { sendBookingEmail } from "../services/notifications.js";

const router = express.Router();

const toDate = (value) => new Date(value);

router.get("/bookings", authMiddleware, (req, res) => {
  const userBookings = bookings.filter((item) => item.userId === req.user.id);
  return res.json({ bookings: userBookings });
});

router.post("/bookings", authMiddleware, async (req, res) => {
  const { date, type, notes } = req.body;
  if (!date || !type) {
    return res.status(400).json({ message: "Data e tipo da aula são obrigatórios." });
  }

  const bookingDate = toDate(date);
  if (Number.isNaN(bookingDate.getTime())) {
    return res.status(400).json({ message: "Data inválida." });
  }

  const booking = {
    id: `booking-${Date.now()}`,
    userId: req.user.id,
    date: bookingDate.toISOString(),
    type,
    notes: notes || "",
    status: "confirmado"
  };

  bookings.push(booking);

  await sendBookingEmail({
    to: req.user.email,
    name: req.user.name,
    date: bookingDate.toLocaleString("pt-BR"),
    type
  });

  req.app.get("io").to(req.user.id).emit("booking:created", booking);

  return res.status(201).json({ booking });
});

router.post("/bookings/:id/cancel", authMiddleware, (req, res) => {
  const booking = bookings.find((item) => item.id === req.params.id && item.userId === req.user.id);
  if (!booking) {
    return res.status(404).json({ message: "Agendamento não encontrado." });
  }

  const diffMs = new Date(booking.date).getTime() - Date.now();
  const diffHours = diffMs / (1000 * 60 * 60);
  if (diffHours < 2) {
    return res.status(400).json({
      message: "Cancelamento permitido apenas até 2h antes da aula."
    });
  }

  booking.status = "cancelado";
  req.app.get("io").to(req.user.id).emit("booking:cancelled", booking);
  return res.json({ booking });
});

export default router;
