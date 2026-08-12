import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../@types/express.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Não autenticado." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = payload;
    return next();
  } catch (err) {
    console.log("jwt.verify falhou:", err);
    return res.status(401).json({ error: "Sessão expirada ou inválida." });
  }
}