import express from "express";
import { siteConfig, updateAsset, updatePricing } from "../data.js";

const router = express.Router();

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, encoded] = authHeader.split(" ");
  if (scheme !== "Basic" || !encoded) {
    return res.status(401).json({ message: "Credenciais de admin inválidas." });
  }

  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const [login, password] = decoded.split(":");
  const expectedLogin = process.env.ADMIN_USER || "login";
  const expectedPass = process.env.ADMIN_PASS || "senha";
  if (login !== expectedLogin || password !== expectedPass) {
    return res.status(401).json({ message: "Credenciais de admin inválidas." });
  }
  return next();
};

router.get("/site-config", (req, res) => {
  res.json(siteConfig);
});

router.get("/admin/assets", adminAuth, (req, res) => {
  res.json(siteConfig.assets);
});

router.put("/admin/assets", adminAuth, (req, res) => {
  const { key, image } = req.body;
  if (!key || !image) {
    return res.status(400).json({ message: "Informe chave e imagem." });
  }
  if (typeof image !== "string" || !image.startsWith("data:image/webp")) {
    return res.status(400).json({
      message: "Envie a imagem no formato WebP (data URL)."
    });
  }

  const updated = updateAsset(key, image);
  if (!updated) {
    return res.status(400).json({ message: "Chave inválida." });
  }

  return res.json({ assets: siteConfig.assets });
});

router.put("/admin/pricing", adminAuth, (req, res) => {
  updatePricing(req.body || {});
  return res.json({
    pricingGroup: siteConfig.pricingGroup,
    pricingPersonal: siteConfig.pricingPersonal
  });
});

export default router;
