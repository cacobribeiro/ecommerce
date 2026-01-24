import { useState } from "react";
import { Alert, Grid, Stack, TextField, Typography } from "@mui/material";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { contactInfo } from "../data/content.js";
import { sendContactMessage } from "../services/api.js";

const Contato = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name) nextErrors.name = "Informe seu nome.";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Informe um e-mail válido.";
    }
    if (!form.message) nextErrors.message = "Escreva sua mensagem.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    try {
      await sendContactMessage(form);
      setFeedback({ type: "success", message: "Mensagem enviada com sucesso." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  return (
    <Section>
      <SectionTitle
        overline="Contato"
        title="Estamos aqui para conversar"
        subtitle="Entre em contato para dúvidas, parcerias ou informações adicionais."
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Stack spacing={2}>
            <Typography variant="body1" color="text.secondary">
              E-mail: {contactInfo.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Telefone: {contactInfo.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Responderemos em até 48h úteis.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}>
          <Stack component="form" spacing={2} onSubmit={handleSubmit} noValidate>
            <TextField
              name="name"
              label="Nome"
              value={form.name}
              onChange={handleChange}
              required
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              name="email"
              label="E-mail"
              value={form.email}
              onChange={handleChange}
              required
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              name="message"
              label="Mensagem"
              value={form.message}
              onChange={handleChange}
              required
              multiline
              minRows={3}
              error={Boolean(errors.message)}
              helperText={errors.message}
            />
            <PrimaryButton type="submit">Enviar mensagem</PrimaryButton>
            {feedback.message && <Alert severity={feedback.type}>{feedback.message}</Alert>}
          </Stack>
        </Grid>
      </Grid>
    </Section>
  );
};

export default Contato;
