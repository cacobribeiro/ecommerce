import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Alert,
  Box,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import SecondaryButton from "../components/SecondaryButton.jsx";
import ContentCard from "../components/ContentCard.jsx";
import { groupClasses } from "../data/content.js";
import { sendPrivateLessonLead } from "../services/api.js";

const Agenda = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    preferredTime: ""
  });
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!location.hash) return;
    const element = document.querySelector(location.hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name) nextErrors.name = "Informe seu nome.";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Informe um e-mail válido.";
    }
    if (!form.message) nextErrors.message = "Conte um pouco sobre o seu objetivo.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    try {
      await sendPrivateLessonLead(form);
      setFeedback({ type: "success", message: "Enviado! Em breve entraremos em contato." });
      setForm({ name: "", email: "", message: "", preferredTime: "" });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  return (
    <Box>
      <Section>
        <SectionTitle
          overline="Agenda"
          title="Encontros ao vivo para viver o yoga"
          subtitle="Aulas em grupo e particulares para diferentes fases da sua jornada."
        />
        <Grid container spacing={3}>
          {groupClasses.map((group) => (
            <Grid item xs={12} md={6} key={group.days}>
              <ContentCard
                title={`${group.days} às ${group.time}`}
                description={group.description}
                image="/placeholders/placeholder-card.svg"
                actionLabel="Ver detalhes"
                actionHref="#grupo"
                variant="secondary"
              />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section variant="dark">
        <Box id="grupo">
          <SectionTitle
            overline="Aulas em grupo"
            title="Jornada de Conexão - Aulas em grupo"
            subtitle="Aulas pela plataforma Zoom"
          />
          <Stack spacing={2}>
            <Typography variant="body1" color="text.secondary">
              São aulas com um propósito específico por semana, trazendo temas como yoga com as
              fases da lua, ansiedade, equilíbrio, flexibilidade e outros. Duração de 1 hora,
              finalizando com um momento aberto para compartilhamento e troca.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Turmas disponíveis no momento:
            </Typography>
            <Stack spacing={1}>
              <Typography>• Segundas e Quartas às 20h</Typography>
              <Typography>• Quartas e Sextas às 08h30</Typography>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {["Você escolhe a turma", "Recebe o link da aula", "Pratica ao vivo", "Compartilha se quiser"].map(
                (step, index) => (
                  <Grid item xs={12} sm={6} md={3} key={step}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 4,
                        bgcolor: "background.paper",
                        border: "1px solid rgba(202, 163, 84, 0.2)",
                        height: "100%"
                      }}
                    >
                      <Typography variant="overline" color="secondary.main" fontWeight={600}>
                        Passo {index + 1}
                      </Typography>
                      <Typography variant="body2">{step}</Typography>
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
            <PrimaryButton href="/contato">Quero entrar para a Jornada</PrimaryButton>
          </Stack>
        </Box>
      </Section>

      <Section>
        <Box id="particular">
          <SectionTitle
            overline="Aulas particulares"
            title="Aulas Particulares ao vivo"
            subtitle="Conte o que você busca e montamos uma experiência personalizada."
          />
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="name"
                  label="Nome"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="email"
                  label="E-mail"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="message"
                  label="O que você está procurando com o yoga?"
                  value={form.message}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  minRows={3}
                  required
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="preferredTime"
                  label="Preferência de dia e horário"
                  value={form.preferredTime}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
              <PrimaryButton type="submit">Enviar</PrimaryButton>
              <SecondaryButton href="/contato">Falar pelo WhatsApp</SecondaryButton>
            </Stack>
            {feedback.message && (
              <Alert severity={feedback.type} sx={{ mt: 2 }}>
                {feedback.message}
              </Alert>
            )}
          </Box>
        </Box>
      </Section>
    </Box>
  );
};

export default Agenda;
