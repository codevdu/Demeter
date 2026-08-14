import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository.js";

export interface Icar {
  id: string;
  carReceipt: string
  municipality: string
  municipalityId: string
  userId: string
}

export class MeController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async me(req: Request, res: Response) {
    const usuario = await this.userRepository.findById(req.user!.id);
    const car = await this.userRepository.findById(req.user!.id)

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const userData = usuario as any;
    const userCar = car?.carProperties as Icar[]

    return res.status(200).json({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      profile: userData.profile,
      carProperties: userCar
    });
  }
}