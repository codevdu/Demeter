import { Request, Response, NextFunction } from "express";
import { Profile } from "@prisma/client";

export function authorizeRoles(...perfisPermitidos: Profile[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Não autenticado." });
    }

    if (!perfisPermitidos.includes(req.user.profile)) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para acessar este recurso." });
    }

    return next();
  };
}