import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ContentCard from "../components/ContentCard.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { recordedCategories, recordedLessons } from "../data/content.js";
import { useAuth } from "../context/AuthContext.jsx";

const GravadaCategoria = () => {
  const { categoria } = useParams();
  const { isAuthenticated } = useAuth();
  const category = useMemo(
    () => recordedCategories.find((item) => item.slug === categoria),
    [categoria]
  );

  const lessons = recordedLessons.filter((lesson) => lesson.categorySlug === categoria);

  return (
    <Section>
      <SectionTitle
        overline="Aulas gravadas"
        title={category?.name || "Categoria"}
        subtitle={category?.description}
      />
      <Grid container spacing={3}>
        {lessons.map((lesson) => (
          <Grid item xs={12} md={4} key={lesson.id}>
            <ContentCard
              title={lesson.title}
              description={`${lesson.duration} • ${lesson.level}`}
              image={lesson.image}
              actionLabel={lesson.requiresLogin && !isAuthenticated ? "Faça login para acessar" : "Assistir"}
              actionHref={lesson.requiresLogin && !isAuthenticated ? "/login" : "#"}
              variant={lesson.requiresLogin && !isAuthenticated ? "secondary" : "primary"}
            />
          </Grid>
        ))}
      </Grid>
      {!lessons.length && (
        <Box sx={{ mt: 4 }}>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Em breve teremos novas práticas nesta categoria.
            </Typography>
            <PrimaryButton href="/gravadas">Voltar para categorias</PrimaryButton>
          </Stack>
        </Box>
      )}
    </Section>
  );
};

export default GravadaCategoria;
