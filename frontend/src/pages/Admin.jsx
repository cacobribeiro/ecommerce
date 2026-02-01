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
import { useEffect, useMemo, useRef, useState } from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";
import SecondaryButton from "../components/SecondaryButton.jsx";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import {
  adminLogin,
  fetchAdminAssets,
  fetchAdminSession,
  updateAsset,
  updatePricing
} from "../services/api.js";

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
  const [imageMeta, setImageMeta] = useState({ width: 0, height: 0 });
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef(null);
  const dragState = useRef(null);

  const assetMap = useMemo(() => config.assets, [config.assets]);

  useEffect(() => {
    let isMounted = true;
    fetchAdminSession()
      .then((data) => {
        if (!isMounted || !data.authenticated) return;
        setIsAuthorized(true);
        return fetchAdminAssets()
          .then((assets) => {
            if (!isMounted) return;
            setConfig((prev) => ({ ...prev, assets }));
          })
          .catch(() => null);
      })
      .catch(() => null);
    return () => {
      isMounted = false;
    };
  }, [setConfig]);

  const parseSize = (size) => {
    const [width, height] = size.split("x").map((value) => Number(value));
    return {
      width: Number.isFinite(width) ? width : 1200,
      height: Number.isFinite(height) ? height : 800
    };
  };

  const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

  const getCoverScale = (frameWidth, frameHeight, imageWidth, imageHeight) => {
    if (!frameWidth || !frameHeight || !imageWidth || !imageHeight) return 1;
    return Math.max(frameWidth / imageWidth, frameHeight / imageHeight);
  };

  const getOffsetBounds = (scaledWidth, scaledHeight, frameWidth, frameHeight) => {
    if (!scaledWidth || !scaledHeight || !frameWidth || !frameHeight) {
      return { minX: 0, maxX: 100, minY: 0, maxY: 100 };
    }
    let minX = 50;
    let maxX = 50;
    if (scaledWidth > frameWidth) {
      const edge = (frameWidth / 2 / scaledWidth) * 100;
      minX = edge;
      maxX = 100 - edge;
    }
    let minY = 50;
    let maxY = 50;
    if (scaledHeight > frameHeight) {
      const edge = (frameHeight / 2 / scaledHeight) * 100;
      minY = edge;
      maxY = 100 - edge;
    }
    return { minX, maxX, minY, maxY };
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
      setImageMeta({ width: 0, height: 0 });
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

  useEffect(() => {
    if (!cropState.open) return;
    const preview = previewRef.current;
    if (!preview) return;
    const updatePreviewSize = () => {
      const width = preview.clientWidth;
      const height = width
        ? Math.min(360, Math.round((width * cropState.height) / cropState.width))
        : 0;
      setPreviewSize({ width, height });
    };
    updatePreviewSize();
    const resizeObserver = new ResizeObserver(updatePreviewSize);
    resizeObserver.observe(preview);
    window.addEventListener("resize", updatePreviewSize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePreviewSize);
    };
  }, [cropState.open, cropState.width, cropState.height]);

  const previewScale = useMemo(() => {
    if (
      !previewSize.width ||
      !previewSize.height ||
      !imageMeta.width ||
      !imageMeta.height
    ) {
      return { baseScale: 1, scaledWidth: 0, scaledHeight: 0 };
    }
    const baseScale = getCoverScale(
      previewSize.width,
      previewSize.height,
      imageMeta.width,
      imageMeta.height
    );
    const scaledWidth = imageMeta.width * baseScale * cropState.zoom;
    const scaledHeight = imageMeta.height * baseScale * cropState.zoom;
    return { baseScale, scaledWidth, scaledHeight };
  }, [cropState.zoom, imageMeta.height, imageMeta.width, previewSize.height, previewSize.width]);

  const previewBounds = useMemo(
    () =>
      getOffsetBounds(
        previewScale.scaledWidth,
        previewScale.scaledHeight,
        previewSize.width,
        previewSize.height
      ),
    [previewScale.scaledHeight, previewScale.scaledWidth, previewSize.height, previewSize.width]
  );

  useEffect(() => {
    if (!cropState.open) return;
    if (!previewSize.width || !previewSize.height) return;
    setCropState((prev) => {
      const nextX = clampValue(prev.offsetX, previewBounds.minX, previewBounds.maxX);
      const nextY = clampValue(prev.offsetY, previewBounds.minY, previewBounds.maxY);
      if (nextX === prev.offsetX && nextY === prev.offsetY) return prev;
      return { ...prev, offsetX: nextX, offsetY: nextY };
    });
  }, [
    cropState.open,
    previewBounds.maxX,
    previewBounds.maxY,
    previewBounds.minX,
    previewBounds.minY,
    previewSize.height,
    previewSize.width
  ]);

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
        const baseScale = getCoverScale(width, height, image.width, image.height);
        const scaledWidth = image.width * baseScale * zoom;
        const scaledHeight = image.height * baseScale * zoom;
        const bounds = getOffsetBounds(scaledWidth, scaledHeight, width, height);
        const safeOffsetX = clampValue(offsetX, bounds.minX, bounds.maxX);
        const safeOffsetY = clampValue(offsetY, bounds.minY, bounds.maxY);
        const centerX = (safeOffsetX / 100) * scaledWidth;
        const centerY = (safeOffsetY / 100) * scaledHeight;
        const drawX = width / 2 - centerX;
        const drawY = height / 2 - centerY;
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
      const response = await updateAsset({ key: cropState.key, image });
      setConfig((prev) => ({ ...prev, assets: response.assets }));
      setFeedback({ type: "success", message: "Imagem atualizada com sucesso." });
      setCropState((prev) => ({ ...prev, open: false }));
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  const handleCropReset = () => {
    setCropState((prev) => ({
      ...prev,
      zoom: 1,
      offsetX: 50,
      offsetY: 50
    }));
  };

  const handlePointerDown = (event) => {
    if (!previewRef.current) return;
    event.preventDefault();
    previewRef.current.setPointerCapture(event.pointerId);
    dragState.current = {
      startX: event.clientX,
      startY: event.clientY,
      startOffsetX: cropState.offsetX,
      startOffsetY: cropState.offsetY
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (!dragState.current || !previewScale.scaledWidth || !previewScale.scaledHeight) return;
    event.preventDefault();
    const deltaX = event.clientX - dragState.current.startX;
    const deltaY = event.clientY - dragState.current.startY;
    const nextOffsetX = clampValue(
      dragState.current.startOffsetX - (deltaX / previewScale.scaledWidth) * 100,
      previewBounds.minX,
      previewBounds.maxX
    );
    const nextOffsetY = clampValue(
      dragState.current.startOffsetY - (deltaY / previewScale.scaledHeight) * 100,
      previewBounds.minY,
      previewBounds.maxY
    );
    setCropState((prev) => ({
      ...prev,
      offsetX: nextOffsetX,
      offsetY: nextOffsetY
    }));
  };

  const handlePointerUp = (event) => {
    if (!previewRef.current) return;
    if (dragState.current) {
      previewRef.current.releasePointerCapture(event.pointerId);
      dragState.current = null;
    }
    setIsDragging(false);
  };

  const handlePricingSubmit = async () => {
    try {
      const response = await updatePricing({
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
      await adminLogin(credentials);
      const response = await fetchAdminAssets();
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
            ref={previewRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            sx={{
              width: "100%",
              height: previewSize.height ? `${previewSize.height}px` : "auto",
              maxHeight: 360,
              borderRadius: 2,
              border: "1px solid rgba(202, 163, 84, 0.25)",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              overflow: "hidden",
              position: "relative",
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "none",
              mb: 2
            }}
          >
            {cropState.imageSrc && (
              <Box
                component="img"
                src={cropState.imageSrc}
                alt="Prévia do recorte"
                onLoad={(event) => {
                  setImageMeta({
                    width: event.currentTarget.naturalWidth,
                    height: event.currentTarget.naturalHeight
                  });
                }}
                sx={{
                  position: "absolute",
                  top: previewSize.height
                    ? `calc(50% - ${(cropState.offsetY / 100) * previewScale.scaledHeight}px)`
                    : "50%",
                  left: previewSize.width
                    ? `calc(50% - ${(cropState.offsetX / 100) * previewScale.scaledWidth}px)`
                    : "50%",
                  width: previewScale.scaledWidth || "auto",
                  height: previewScale.scaledHeight || "auto",
                  transform: previewSize.width && previewSize.height ? "none" : "translate(-50%, -50%)",
                  opacity: previewScale.scaledWidth ? 1 : 0,
                  userSelect: "none",
                  pointerEvents: "none"
                }}
              />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
            Arraste a imagem com o mouse para reposicionar o recorte.
          </Typography>
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
            min={previewBounds.minX}
            max={previewBounds.maxX}
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
            min={previewBounds.minY}
            max={previewBounds.maxY}
            step={1}
            onChange={(_, value) =>
              setCropState((prev) => ({ ...prev, offsetY: Number(value) }))
            }
          />
          <SecondaryButton onClick={handleCropReset} sx={{ mt: 1 }}>
            Voltar ao tamanho padrão
          </SecondaryButton>
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
