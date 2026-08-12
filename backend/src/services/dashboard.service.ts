import axios from 'axios';
import { Profile } from '@prisma/client';
import { TokenPayload } from '../@types/express.js';
import { UserRepository } from '../repositories/user.repository.js';

export interface DashboardQueryParams {
  cultura?: string;
  de?: string;
  ate?: string;
  municipiosRequested?: string;
}

interface DashboardScope {
  perfil: string;
  municipios?: string[];
  coordinates?: string | null;
}

export class DashboardService {
  private readonly dataServiceUrl =
    process.env.DATA_SERVICE_URL ?? 'http://localhost:8000';
  
  constructor(private userRepository: UserRepository){}

  async getDashboardData(
    user: TokenPayload,
    query: DashboardQueryParams,
  ) {
    const {
      cultura = 'milho',
      de = '2015',
      ate = '2022',
      municipiosRequested,
    } = query;

    const scope = await this.resolveScope(user, municipiosRequested);

    const params: Record<string, any> = {
      perfil: scope.perfil,
      cultura,
      de,
      ate,
    };

    if (scope.municipios && scope.municipios.length > 0) {
      params.municipios = scope.municipios.join(',');
    }

    if (scope.coordinates) {
      params.coordinates = scope.coordinates;
    }

    try {
      const { data } = await axios.get(`${this.dataServiceUrl}/grafico`, {
        params,
      });

      return {
        scope,
        ...data,
      };
    } catch (error) {
      throw new Error(
        'Falha ao consultar o serviço de dashboard.',
      );
    }
  }

  private async resolveScope(
    user: TokenPayload,
    municipiosRequested?: string,
  ): Promise<DashboardScope> {
    const perfil = user.profile.toLowerCase();

    switch (user.profile) {
      case Profile.PRODUTOR:
        return {
          perfil,
          municipios: await this.resolveProdutor(user.id),
        };

      case Profile.TECNICO:
        return await this.resolveTecnicoScope(user.id, perfil, municipiosRequested);

      case Profile.GESTOR:
        return {
          perfil,
          municipios: this.parseMunicipios(municipiosRequested),
        };

      default:
        throw new Error('Perfil não suportado');
    }
  }

  private async resolveProdutor(userId: string): Promise<string[]> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const municipalitySet = new Set<number>();

    user.carProperties.forEach((property) => {
      if (property.municipalityId) {
        municipalitySet.add(property.municipalityId);
      }
    });

    if (municipalitySet.size === 0) {
      throw new Error('Produtor não possui nenhum imóvel/município associado.');
    }

    return Array.from(municipalitySet).map(String);
  }

  private async resolveTecnicoScope(
    userId: string,
    perfil: string,
    municipiosRequested?: string,
  ): Promise<DashboardScope> {
    const dbUser = await this.userRepository.findById(userId)

    const requested = this.parseMunicipios(municipiosRequested);

    return {
      perfil,
      coordinates: dbUser?.coordinates || null,
      municipios: requested,
    };
  }

  private parseMunicipios(municipios?: string): string[] {
    if (!municipios) {
      return [];
    }

    return municipios
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);
  }
}