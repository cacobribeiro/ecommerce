import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Section from "../components/Section.jsx";

const Home = () => (
  <Box>
    <Box sx={{ py: 8, bgcolor: "secondary.main" }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h2">Aulas de yoga para corpo e mente</Typography>
              <Typography variant="body1" color="text.secondary">
                Experiências personalizadas e em grupo com foco em respiração, postura e
                equilíbrio emocional. Tudo online, ao vivo e com acompanhamento próximo.
              </Typography>
              <Stack direction="row" spacing={2}>
                <PrimaryButton>Agendar aula experimental</PrimaryButton>
                <PrimaryButton variant="outlined">Conhecer planos</PrimaryButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: 320,
                bgcolor: "#f2e7e0",
                borderRadius: 4
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>

    <Section
      title="Nossa proposta"
      subtitle="Planos flexíveis, atenção individual e práticas alinhadas ao seu ritmo."
    >
      <Grid container spacing={3}>
        {[
          "Turmas pequenas com acompanhamento próximo.",
          "Aulas personalizadas para objetivos específicos.",
          "Comunicação em tempo real com avisos de agenda.",
          "Conteúdo complementar e lembretes por e-mail."
        ].map((item) => (
          <Grid item xs={12} md={3} key={item}>
            <Box sx={{ p: 3, bgcolor: "white", borderRadius: 3, height: "100%" }}>
              <Typography variant="body1">{item}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  </Box>
);

export default Home;
