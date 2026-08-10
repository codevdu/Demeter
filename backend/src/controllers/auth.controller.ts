import { Request, Response } from 'express';
import { z } from 'zod';
import { Prisma, Profile } from '@prisma/client';
import { AuthService } from '../services/auth.service.js';
import { UserRepository } from '../repositories/user.repository.js';

const registerSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(2, 'Nome é obrigatório'),
  cpfCnpj: z.string().min(11, 'CPF/CNPJ inválido'),

  // Opcionais/Inferidos pelo serviço
  carReceipt: z.string().optional().nullable(),
  state: z.string().length(2).optional().nullable(),
  municipalityId: z.number().int().optional().nullable(),
  municipality: z.string().optional().nullable(),
  profile: z.nativeEnum(Profile).optional().default(Profile.PRODUTOR),
});

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
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
      const parsedData = registerSchema.parse(req.body);
      const result = await this.authService.register(parsedData);

      return res.status(201).json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.issues });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return res.status(400).json({ error: 'E-mail ou CPF/CNPJ já cadastrado.' });
      }

      return res.status(400).json({ error: error.message || 'Erro ao realizar cadastro.' });
    }
  };

  async login(req: Request, res: Response) {
    try {
      const parsedData = loginSchema.parse(req.body);
      const result = await this.authService.login(parsedData);

      return res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.issues });
      }

      return res.status(401).json({ error: error.message || 'Erro ao realizar login.' });
    }
  };
}