import {
  Alert,
  Box,
  Divider,
  Grid,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
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
  const [cropState, setCropState] = useState({
    open: false,
    key: "",
    imageSrc: "",
    width: 1200,
    height: 800,
    zoom: 1,
    offsetX: 50,
    offsetY: 50
  });

  const assetMap = useMemo(() => config.assets, [config.assets]);

  const parseSize = (size) => {
    const [width, height] = size.split("x").map((value) => Number(value));
    return {
      width: Number.isFinite(width) ? width : 1200,
      height: Number.isFinite(height) ? height : 800
    };
  };

  const handleAssetChange = async (key, file, size) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== "string") {
        setFeedback({ type: "error", message: "Não foi possível carregar a imagem." });
        return;
      }
      const { width, height } = parseSize(size);
      setCropState({
        open: true,
        key,
        imageSrc: reader.result,
        width,
        height,
        zoom: 1,
        offsetX: 50,
        offsetY: 50
      });
    };
    reader.readAsDataURL(file);
  };

  const createCroppedWebp = ({ imageSrc, width, height, zoom, offsetX, offsetY }) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Não foi possível processar a imagem."));
          return;
        }
        const scaledWidth = image.width * zoom;
        const scaledHeight = image.height * zoom;
        const centerX = (offsetX / 100) * width;
        const centerY = (offsetY / 100) * height;
        const drawX = centerX - scaledWidth / 2;
        const drawY = centerY - scaledHeight / 2;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(image, drawX, drawY, scaledWidth, scaledHeight);
        resolve(canvas.toDataURL("image/webp", 0.9));
      };
      image.onerror = () => reject(new Error("Não foi possível carregar a imagem."));
      image.src = imageSrc;
    });

  const handleCropSave = async () => {
    try {
      const image = await createCroppedWebp(cropState);
      const response = await updateAsset(credentials, { key: cropState.key, image });
      setConfig((prev) => ({ ...prev, assets: response.assets }));
      setFeedback({ type: "success", message: "Imagem atualizada com sucesso." });
      setCropState((prev) => ({ ...prev, open: false }));
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
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
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(event) =>
                    handleAssetChange(field.key, event.target.files?.[0], field.size)
                  }
                />
              </SecondaryButton>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                Enviaremos a imagem em WebP. Ajuste o recorte antes de salvar.
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={cropState.open} onClose={() => setCropState((prev) => ({ ...prev, open: false }))}>
        <DialogTitle>Recortar imagem</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Ajuste o enquadramento para o tamanho {cropState.width}x{cropState.height}.
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: 320,
              borderRadius: 2,
              border: "1px solid rgba(202, 163, 84, 0.25)",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              backgroundImage: `url(${cropState.imageSrc})`,
              backgroundSize: `${cropState.zoom * 100}%`,
              backgroundPosition: `${cropState.offsetX}% ${cropState.offsetY}%`,
              backgroundRepeat: "no-repeat",
              mb: 3
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Zoom
          </Typography>
          <Slider
            value={cropState.zoom}
            min={1}
            max={3}
            step={0.05}
            onChange={(_, value) =>
              setCropState((prev) => ({ ...prev, zoom: Number(value) }))
            }
          />
          <Typography variant="caption" color="text.secondary">
            Posição horizontal
          </Typography>
          <Slider
            value={cropState.offsetX}
            min={0}
            max={100}
            step={1}
            onChange={(_, value) =>
              setCropState((prev) => ({ ...prev, offsetX: Number(value) }))
            }
          />
          <Typography variant="caption" color="text.secondary">
            Posição vertical
          </Typography>
          <Slider
            value={cropState.offsetY}
            min={0}
            max={100}
            step={1}
            onChange={(_, value) =>
              setCropState((prev) => ({ ...prev, offsetY: Number(value) }))
            }
          />
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={() => setCropState((prev) => ({ ...prev, open: false }))}>
            Cancelar
          </SecondaryButton>
          <PrimaryButton onClick={handleCropSave}>Salvar recorte</PrimaryButton>
        </DialogActions>
      </Dialog>

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
