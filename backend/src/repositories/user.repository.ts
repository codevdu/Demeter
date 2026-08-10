import { prisma } from '../prisma/index.js';
import { Profile, User } from '@prisma/client';

export interface CarPropertyItem {
  carReceipt: string;
  municipality: string;
  municipalityId: number;
}

export interface CreateUserData {
  email: string;
  name: string;
  cpfCnpj: string;
  passwordHash: string;
  profile: Profile;
  state?: string | null;
  coordinates?: string | null;
  carPropertiesList?: CarPropertyItem[];
}

export class UserRepository {
  async findByEmail(email: string): Promise<(User & { carProperties: any[] }) | null> {
    return prisma.user.findUnique({
      where: { email },
      include: { carProperties: true },
    });
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { cpfCnpj },
    });
  }

  async findById(id: string): Promise<(User & { carProperties: any[] }) | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { carProperties: true },
    });
  }

  async findByState(state: string): Promise<User[]> {
    return prisma.user.findMany({
      where: { state },
      include: { carProperties: true },
    });
  }

  async create(data: CreateUserData): Promise<User> {
    const isProducer = data.profile === Profile.PRODUTOR;

    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        cpfCnpj: data.cpfCnpj,
        passwordHash: data.passwordHash,
        profile: data.profile,
        state: data.state,
        coordinates: data.coordinates,
        carProperties:
          isProducer && data.carPropertiesList && data.carPropertiesList.length > 0
            ? {
                create: data.carPropertiesList.map((prop) => ({
                  carReceipt: prop.carReceipt,
                  municipality: prop.municipality,
                  municipalityId: prop.municipalityId,
                })),
              }
            : undefined,
      },
      include: { carProperties: true },
    });
  }

  async updateProfile(id: string, profile: Profile, coordinates?: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        profile,
        // Atualiza as coordenadas se foram fornecidas; limpa caso explicitamente null/undefined se necessário
        coordinates: coordinates !== undefined ? coordinates : undefined,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}