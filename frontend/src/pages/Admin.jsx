import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import SecondaryButton from "../components/SecondaryButton.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { updateAsset, updatePricing } from "../services/api.js";

const assetFields = [
  { label: "Imagem do Hero (Home)", key: "homeHero" },
  { label: "Categoria - Aulas curtas", key: "categories.aulas-curtas" },
  { label: "Categoria - Iniciantes", key: "categories.iniciantes" },
  { label: "Categoria - Invertidas", key: "categories.invertidas" },
  { label: "Planos - Grupo", key: "plans.group" },
  { label: "Planos - Personal", key: "plans.personal" }
];

const Admin = () => {
  const { config, setConfig } = useSiteConfig();
  const [token, setToken] = useState("");
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [pricingGroup, setPricingGroup] = useState(config.pricingGroup);
  const [pricingPersonal, setPricingPersonal] = useState(config.pricingPersonal);

  const assetMap = useMemo(() => config.assets, [config.assets]);

  const handleAssetChange = async (key, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const image = reader.result;
        const response = await updateAsset(token, { key, image });
        setConfig((prev) => ({ ...prev, assets: response.assets }));
        setFeedback({ type: "success", message: "Imagem atualizada com sucesso." });
      } catch (error) {
        setFeedback({ type: "error", message: error.message });
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePricingSubmit = async () => {
    try {
      const response = await updatePricing(token, {
        pricingGroup,
        pricingPersonal
      });
      setConfig((prev) => ({ ...prev, ...response }));
      setFeedback({ type: "success", message: "Preços atualizados." });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  const renderAssetPreview = (key) => {
    if (key === "homeHero") return assetMap.homeHero;
    const [section, subKey] = key.split(".");
    if (section === "categories") return assetMap.categories[subKey];
    if (section === "plans") return assetMap.plans[subKey];
    return "";
  };

  return (
    <Section>
      <SectionTitle
        overline="Admin"
        title="Gerenciar conteúdo"
        subtitle="Atualize imagens e preços sem alterar o código."
      />
      <Stack spacing={2} sx={{ maxWidth: 420 }}>
        <TextField
          label="Token de admin"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          helperText="Defina o mesmo token em ADMIN_TOKEN no backend."
        />
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>
        Imagens
      </Typography>
      <Grid container spacing={3}>
        {assetFields.map((field) => (
          <Grid item xs={12} md={6} key={field.key}>
            <Box
              sx={{
                border: "1px solid rgba(202, 163, 84, 0.25)",
                borderRadius: 4,
                p: 2,
                bgcolor: "background.paper"
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {field.label}
              </Typography>
              <Box
                component="img"
                src={renderAssetPreview(field.key)}
                alt={field.label}
                sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 3, mb: 2 }}
              />
              <SecondaryButton component="label" fullWidth>
                Enviar nova imagem
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(event) => handleAssetChange(field.key, event.target.files?.[0])}
                />
              </SecondaryButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>
        Planos e valores
      </Typography>
      <Stack spacing={2}>
        <Typography variant="subtitle1">Aulas em grupo</Typography>
        {pricingGroup.map((row, index) => (
          <Grid container spacing={2} key={row.period}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Período"
                value={row.period}
                onChange={(event) => {
                  const next = [...pricingGroup];
                  next[index] = { ...row, period: event.target.value };
                  setPricingGroup(next);
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="1x semana"
                value={row.one}
                onChange={(event) => {
                  const next = [...pricingGroup];
                  next[index] = { ...row, one: event.target.value };
                  setPricingGroup(next);
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="2x semana"
                value={row.two}
                onChange={(event) => {
                  const next = [...pricingGroup];
                  next[index] = { ...row, two: event.target.value };
                  setPricingGroup(next);
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Aulas particulares</Typography>
        {pricingPersonal.map((row, index) => (
          <Grid container spacing={2} key={row.label}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Plano"
                value={row.label}
                onChange={(event) => {
                  const next = [...pricingPersonal];
                  next[index] = { ...row, label: event.target.value };
                  setPricingPersonal(next);
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Valor"
                value={row.value}
                onChange={(event) => {
                  const next = [...pricingPersonal];
                  next[index] = { ...row, value: event.target.value };
                  setPricingPersonal(next);
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
        <PrimaryButton onClick={handlePricingSubmit}>Salvar preços</PrimaryButton>
        {feedback.message && <Alert severity={feedback.type}>{feedback.message}</Alert>}
      </Stack>
    </Section>
  );
};

export default Admin;
