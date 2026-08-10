import { Profile } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository.js';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async listUsersByState(state: string) {
    return this.userRepository.findByState(state);
  }

  async updateUserProfile(userId: string, profile: Profile, coordinates?: string) {
    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      throw new Error('Usuário não encontrado.');
    }

    return this.userRepository.updateProfile(userId, profile, coordinates);
  }

  async deleteUser(userId: string) {
    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      throw new Error('Usuário não encontrado.');
    }

    return this.userRepository.delete(userId);
  }
}