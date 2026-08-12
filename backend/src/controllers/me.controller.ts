import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";

export class MeController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async me(req: Request, res: Response) {
    const usuario = await this.userRepository.findById(req.user!.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const userData = usuario as any;

    return res.status(200).json({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      profile: userData.profile,
      municipalityId: userData.municipalityId,
      municipality: userData.municipality,
    });
  }
}