import { useEffect, useState } from "react";
import { Alert, Box, Grid, List, ListItem, ListItemText } from "@mui/material";
import PlanCard from "../components/PlanCard.jsx";
import Section from "../components/Section.jsx";
import { fetchPlans } from "../services/api.js";

const Plans = () => {
  const [data, setData] = useState({ plans: [], rules: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlans()
      .then((response) => setData(response))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <Box>
      <Section title="Planos disponíveis" subtitle="Escolha o formato ideal para você.">
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {data.plans.map((plan) => (
            <Grid item xs={12} md={3} key={plan.id}>
              <PlanCard {...plan} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Regras e políticas">
        <List>
          {data.rules.map((rule) => (
            <ListItem key={rule}>
              <ListItemText primary={rule} />
            </ListItem>
          ))}
        </List>
      </Section>
    </Box>
  );
};

export default Plans;
