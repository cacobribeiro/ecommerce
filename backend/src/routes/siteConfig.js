import express from "express";
import { siteConfig, updateAsset, updatePricing } from "../data.js";

const router = express.Router();

const isValidAdminCredentials = (login, password) => {
  const expectedLogin = process.env.ADMIN_USER || "login";
  const expectedPass = process.env.ADMIN_PASS || "senha";
  return login === expectedLogin && password === expectedPass;
};

const adminAuth = (req, res, next) => {
  // if (req.session?.admin) {
  //   return next();
  // }

  // const authHeader = req.headers.authorization || "";
  // const [scheme, encoded] = authHeader.split(" ");
  // // if (scheme !== "Basic" || !encoded) {
  // //   return res.status(401).json({ message: "Credenciais de admin inválidas." });
  // // }

  // const decoded = Buffer.from(encoded, "base64").toString("utf8");
  // const [login, password] = decoded.split(":");
  // if (!isValidAdminCredentials(login, password)) {
  //   return res.status(401).json({ message: "Credenciais de admin inválidas." });
  // }
  return next();
};

router.get("/site-config", (req, res) => {
  res.json(siteConfig);
});

router.post("/admin/login", (req, res) => {
  const { login, password } = req.body || {};
  if (!login || !password) {
    return res.status(400).json({ message: "Informe login e senha." });
  }

  if (!isValidAdminCredentials(login, password)) {  
    console.log(login, password)
    return res.status(401).json({ message: "Credenciais de admin inválidas." });
  }

  req.session.admin = { login };
  return res.json({ authenticated: true });
});

router.get("/admin/session", (req, res) => {
  return res.json({ authenticated: Boolean(req.session?.admin) });
});

router.post("/admin/logout", (req, res) => {
  if (req.session?.admin) {
    delete req.session.admin;
  }
  return res.json({ authenticated: false });
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
