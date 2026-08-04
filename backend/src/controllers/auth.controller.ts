import { Request, Response } from 'express';
import { z } from 'zod';
import { Profile } from '@prisma/client';
import { AuthService } from '../services/auth.service.js';
import { UserRepository } from '../repositories/user.repository.js';

const registerSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(2, 'Nome é obrigatório'),
  profile: z.enum(Profile),
  localId: z.string().optional().nullable(),
  allowedLocals: z.array(z.string()).optional(),
});

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export class AuthController {
  private authService: AuthService;

  constructor() {
    const userRepository = new UserRepository();
    this.authService = new AuthService(userRepository);
  }

  async register(req: Request, res: Response) {
    try {
      const parsedData = registerSchema.parse(req.body)
      await this.authService.register(parsedData)

      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso',
      })
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      return res.status(400).json({ error: error.message || 'Erro ao realizar cadastro' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const parsedData = loginSchema.parse(req.body);
      const result = await this.authService.login(parsedData);

      return res.json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      return res.status(401).json({ error: error.message || 'Credenciais inválidas' });
    }
  }
}
