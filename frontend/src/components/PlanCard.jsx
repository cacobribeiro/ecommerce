import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import PrimaryButton from "./PrimaryButton.jsx";

const PlanCard = ({ title, price, sessionsPerWeek, description }) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Stack spacing={1}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">R$ {price}</Typography>
        <Chip label={`${sessionsPerWeek} aula(s) / semana`} color="secondary" />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Stack>
    </CardContent>
    <Stack sx={{ p: 2, pt: 0 }}>
      <PrimaryButton fullWidth>Quero este plano</PrimaryButton>
    </Stack>
  </Card>
);

export default PlanCard;
