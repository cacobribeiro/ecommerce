import { Grid, Stack, Typography } from "@mui/material";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ContentCard from "../components/ContentCard.jsx";
import SecondaryButton from "../components/SecondaryButton.jsx";
import { shopProducts } from "../data/content.js";

const Loja = () => (
  <Section>
    <SectionTitle
      overline="Loja"
      title="Mandalas que inspiram intenção"
      subtitle="Produtos artesanais para levar a energia do Caminho do Ser para a sua casa."
    />
    <Grid container spacing={3}>
      {shopProducts.map((product) => (
        <Grid item xs={12} md={4} key={product.id}>
          <ContentCard
            title={product.name}
            description={`${product.description} • ${product.price}`}
            image={product.image}
            actionLabel="Tenho interesse"
            actionHref="https://wa.me/5500000000000"
            variant="secondary"
          />
        </Grid>
      ))}
    </Grid>
    <Stack spacing={1} sx={{ mt: 4 }}>
      <Typography variant="body2" color="text.secondary">
        Em breve teremos checkout completo e novos produtos.
      </Typography>
      <SecondaryButton href="/contato">Falar com a equipe</SecondaryButton>
    </Stack>
  </Section>
);

export default Loja;
