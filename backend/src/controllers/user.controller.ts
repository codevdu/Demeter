import { Request, Response } from 'express';
import { z } from 'zod';
import { Profile } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';

// Schema com validação condicional via superRefine
const updateProfileSchema = z
  .object({
    profile: z.nativeEnum(Profile),
    coordinates: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    // Se a nova permissão for TECNICO, obriga o envio das coordenadas
    if (data.profile === Profile.TECNICO) {
      if (!data.coordinates || data.coordinates.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Coordenadas são obrigatórias para o perfil TÉCNICO.',
          path: ['coordinates'],
        });
      }
    }
  });

export class UserController {
  private userService: UserService;
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService(this.userRepository);
  }

  // Lista apenas os usuários do estado do Gestor
  listByState = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const gestor = await this.userRepository.findById(userId);

      if (!gestor?.state) {
        return res.status(400).json({ error: 'Gestor não possui estado (UF) associado.' });
      }

      const users = await this.userService.listUsersByState(gestor.state);
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Erro ao buscar usuários.' });
    }
  };

  // Atualiza a Profile do usuário (e coordenadas se for TECNICO)
  updateProfile = async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

      if (!id) {
        return res.status(400).json({ error: 'ID do usuário não fornecido.' });
      }

      // Validação do body incluindo tratamento de coordenadas
      const { profile, coordinates } = updateProfileSchema.parse(req.body);

      const updatedUser = await this.userService.updateUserProfile(
        id,
        profile,
        coordinates ?? undefined
      );

      return res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.issues });
      }
      return res.status(400).json({ error: error.message || 'Erro ao atualizar permissão.' });
    }
  };

  // Exclui um usuário
  delete = async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

      if (!id) {
        return res.status(400).json({ error: 'ID do usuário não fornecido.' });
      }

      await this.userService.deleteUser(id);

      return res.status(200).json({ message: 'Usuário removido com sucesso.' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Erro ao remover usuário.' });
    }
  };
}