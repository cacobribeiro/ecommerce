import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";
const EXPIRATION = "8h";

export const createToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: EXPIRATION });

export const verifyToken = (token) => jwt.verify(token, SECRET);

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado." });
  }

  const [, token] = authHeader.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Token inválido." });
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token expirado ou inválido." });
  }
};

export const socketAuth = (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Token não informado"));
  }

  try {
    socket.user = verifyToken(token);
    return next();
  } catch (error) {
    return next(new Error("Token inválido"));
  }
};
