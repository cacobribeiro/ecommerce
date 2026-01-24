import { Grid } from "@mui/material";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ContentCard from "../components/ContentCard.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { recordedCategories } from "../data/content.js";

const Gravadas = () => {
  const { config } = useSiteConfig();

  return (
    <Section>
      <SectionTitle
        overline="Aulas gravadas"
        title="Escolha o tema da sua prática"
        subtitle="Conteúdos disponíveis para você praticar no seu tempo."
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
  );
};

export default Gravadas;
