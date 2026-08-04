import { prisma } from '../prisma/index.js';
import { Profile, User } from '@prisma/client';

export interface CreateUserData {
  email: string;
  name: string;
  passwordHash: string;
  profile: Profile;
  localId?: string | null;
  allowedLocals?: string[];
}

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        allowedLocals: {
          select: {
            localId: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        allowedLocals: {
          select: {
            localId: true,
          },
        },
      },
    });
  }

  async create(data: CreateUserData) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash: data.passwordHash,
        profile: data.profile,
        localId: data.profile === Profile.PRODUTOR ? data.localId : null,
        allowedLocals:
          data.profile === Profile.TECNICO && data.allowedLocals && data.allowedLocals.length > 0
            ? {
                create: data.allowedLocals.map((localId) => ({
                  local: { connect: { id: localId } },
                })),
              }
            : undefined,
      },
      include: {
        allowedLocals: true,
      },
    });
  }
}
