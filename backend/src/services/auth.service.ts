import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Profile } from '@prisma/client';
import { UserRepository, CreateUserData } from '../repositories/user.repository.js';

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  profile: Profile;
  localId?: string | null;
  allowedLocals?: string[];
}

export interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  constructor(private userRepository: UserRepository) { }

  async register(data: RegisterDTO) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('E-mail já cadastrado');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      email: data.email,
      name: data.name,
      passwordHash,
      profile: data.profile,
      localId: data.localId,
      allowedLocals: data.allowedLocals,
    })

    return {
      message: 'Usuário criado'
    }
  }

  async login(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const allowedLocals = user.allowedLocals.map((item) => item.localId);

    const payload = {
      id: user.id,
      profile: user.profile,
      localId: user.localId,
      allowedLocals,
    };

    const secret = process.env.JWT_SECRET || 'default_secret';
    const token = jwt.sign(payload, secret, { expiresIn: '8h' });

    return {
      token,
      user: {
        id: user.id,
        profile: user.profile,
        localId: user.localId,
        allowedLocals,
      },
    };
  }
}
