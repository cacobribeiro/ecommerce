import { Box, Grid, Stack, Typography } from "@mui/material";
import ContentCard from "../components/ContentCard.jsx";
import PricingTable from "../components/PricingTable.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import SecondaryButton from "../components/SecondaryButton.jsx";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import {
  aboutContent,
  agendaHighlights,
  heroContent,
  recordedCategories,
  shopProducts
} from "../data/content.js";

const Home = () => {
  const { config } = useSiteConfig();

  return (
    <Box>
      <Section>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography variant="overline" color="secondary.main" fontWeight={600}>
                {heroContent.eyebrow}
              </Typography>
              <Typography variant="h1" sx={{ color: "primary.main" }}>
                {heroContent.title}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {heroContent.teacher}
              </Typography>
              <Typography variant="h6">{heroContent.subtitle}</Typography>
              <Typography variant="body1" color="text.secondary">
                {heroContent.description}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <PrimaryButton href="/agenda">Ver agenda</PrimaryButton>
                <SecondaryButton href="/gravadas">Conhecer aulas gravadas</SecondaryButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={config.assets.homeHero}
              alt="Foto da professora"
              sx={{ width: "100%", borderRadius: 6, border: "1px solid rgba(202, 163, 84, 0.2)" }}
            />
          </Grid>
        </Grid>
      </Section>

      <Section variant="dark">
        <SectionTitle
          overline="Nossa proposta"
          title="Um caminho de presença e acolhimento"
          subtitle="Vivenciar o yoga para se descobrir e se conhecer através dele."
        />
        <Grid container spacing={3}>
          {aboutContent.map((paragraph) => (
            <Grid item xs={12} md={4} key={paragraph}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "background.paper",
                  border: "1px solid rgba(202, 163, 84, 0.2)",
                  height: "100%"
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {paragraph}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle
          overline="Agenda em destaque"
          title="Aulas ao vivo para fortalecer a sua prática"
          subtitle="Escolha a experiência que combina com o seu ritmo."
        />
        <Grid container spacing={3}>
          {agendaHighlights.map((item) => (
            <Grid item xs={12} md={6} key={item.title}>
              <ContentCard
                title={item.title}
                description={item.description}
                image="/placeholders/placeholder-card.svg"
                actionLabel="Ver detalhes"
                actionHref={item.action}
                variant="secondary"
              />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section variant="dark">
        <SectionTitle
          overline="Aulas gravadas"
          title="Práticas para todos os momentos"
          subtitle="Conteúdo organizado por temas para apoiar sua jornada."
        />
        <Grid container spacing={3}>
          {recordedCategories.map((category) => (
            <Grid item xs={12} md={4} key={category.slug}>
              <ContentCard
                title={category.name}
                description={category.description}
                image={config.assets.categories[category.slug]}
                actionLabel="Ver aulas"
                actionHref={`/gravadas/${category.slug}`}
              />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle
          overline="Planos e valores"
          title="Investimento transparente e flexível"
          subtitle="Escolha a modalidade e o formato que fazem sentido para você."
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <PricingTable
              title="Aulas em grupo"
              subtitle="Valores para 1x/semana (4 aulas) ou 2x/semana (8 aulas)."
              columns={["Período", "1x semana", "2x semana"]}
              rows={config.pricingGroup.map((row) => ({
                period: row.period,
                cells: [row.period, row.one, row.two]
              }))}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <PricingTable
              title="Aulas particulares online"
              columns={["Plano", "Valor"]}
              rows={config.pricingPersonal.map((row) => ({
                label: row.label,
                cells: [row.label, row.value]
              }))}
            />
            <Box
              component="img"
              src={config.assets.plans.personal}
              alt="Imagem plano personal"
              sx={{ width: "100%", borderRadius: 4, mt: 2 }}
            />
          </Grid>
        </Grid>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
          <PrimaryButton href="/agenda">Quero participar</PrimaryButton>
          <SecondaryButton href="/contato">Falar sobre planos</SecondaryButton>
        </Stack>
      </Section>

      <Section variant="dark">
        <SectionTitle
          overline="Loja"
          title="Mandalas para trazer intenção"
          subtitle="Peças artesanais para complementar sua prática."
        />
        <Grid container spacing={3}>
          {shopProducts.map((product) => (
            <Grid item xs={12} md={4} key={product.id}>
              <ContentCard
                title={product.name}
                description={product.description}
                image={product.image}
                actionLabel="Ver loja"
                actionHref="/loja"
                variant="secondary"
              />
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
};

export default Home;
