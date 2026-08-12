import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../@types/express.js';
import { Profile } from '@prisma/client';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Formato do token inválido' });
  }

  const token = parts[1];

  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret) as TokenPayload;
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

export const requireGestor = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.profile !== Profile.GESTOR) {
    return res.status(403).json({ error: 'Acesso negado. Apenas gestores podem realizar esta ação.' });
  }
  return next();
};