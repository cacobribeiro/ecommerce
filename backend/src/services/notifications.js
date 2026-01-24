import nodemailer from "nodemailer";

const createTransporter = () => {
  if (!process.env.SMTP_HOST) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

export const sendBookingEmail = async ({ to, name, date, type }) => {
  const transporter = createTransporter();
  if (!transporter) {
    return { skipped: true };
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "agendamentos@yoga.com",
    to,
    subject: "Novo agendamento de aula",
    text: `Olá ${name}, sua aula ${type} foi agendada para ${date}.`
  });

  return { skipped: false };
};
