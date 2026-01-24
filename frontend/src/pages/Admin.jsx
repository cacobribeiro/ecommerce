import {
  Alert,
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useMemo, useState } from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";
import SecondaryButton from "../components/SecondaryButton.jsx";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { fetchAdminAssets, updateAsset, updatePricing } from "../services/api.js";

const assetFields = [
  { label: "Imagem do Hero (Home)", key: "homeHero", size: "1600x900" },
  { label: "Categoria - Aulas curtas", key: "categories.aulas-curtas", size: "1200x800" },
  { label: "Categoria - Iniciantes", key: "categories.iniciantes", size: "1200x800" },
  { label: "Categoria - Invertidas", key: "categories.invertidas", size: "1200x800" },
  { label: "Planos - Grupo", key: "plans.group", size: "1200x800" },
  { label: "Planos - Personal", key: "plans.personal", size: "1200x800" }
];

const Admin = () => {
  const { config, setConfig } = useSiteConfig();
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [isAuthorized, setIsAuthorized] = useState(false);
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
        const response = await updateAsset(credentials, { key, image });
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
      const response = await updatePricing(credentials, {
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

  const handleCredentialsChange = (event) => {
    setCredentials((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetchAdminAssets(credentials);
      setConfig((prev) => ({ ...prev, assets: response }));
      setIsAuthorized(true);
      setFeedback({ type: "", message: "" });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  if (!isAuthorized) {
    return (
      <Section>
        <SectionTitle
          overline="Admin"
          title="Acesso restrito"
          subtitle="Faça login para acessar a área administrativa."
        />
        <Stack
          spacing={2}
          component="form"
          onSubmit={handleAuthSubmit}
          sx={{ maxWidth: 420 }}
        >
          <TextField
            name="login"
            label="Login"
            value={credentials.login}
            onChange={handleCredentialsChange}
            required
          />
          <TextField
            name="password"
            label="Senha"
            type="password"
            value={credentials.password}
            onChange={handleCredentialsChange}
            required
          />
          <PrimaryButton type="submit">Entrar</PrimaryButton>
          {feedback.message && <Alert severity={feedback.type}>{feedback.message}</Alert>}
        </Stack>
      </Section>
    );
  }

  return (
    <Section>
      <SectionTitle
        overline="Admin"
        title="Gerenciar conteúdo"
        subtitle="Atualize imagens e preços sem alterar o código."
      />
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
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                Tamanho recomendado: {field.size}
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
