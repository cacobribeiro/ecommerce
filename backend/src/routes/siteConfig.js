import express from "express";
import { siteConfig, updateAsset, updatePricing } from "../data.js";

const router = express.Router();

const adminAuth = (req, res, next) => {
  const token = req.headers["x-admin-token"];
  const expected = process.env.ADMIN_TOKEN || "admin123";
  if (!token || token !== expected) {
    return res.status(401).json({ message: "Token de admin inválido." });
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
