import axios from 'axios';
import { Profile } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository.js';

export interface DashboardQueryParams {
  cultura?: string;
  de?: string;
  ate?: string;
  municipiosRequested?: string;
  requestedProfile?: string;
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
    userId: string,
    query: DashboardQueryParams,
  ) {
    const {
      cultura = 'milho',
      de = '2015',
      ate = '2022',
      municipiosRequested,
      requestedProfile,
    } = query;

    const dbUser = await this.userRepository.findById(userId);

    if (!dbUser) {
      throw new Error('Usuário não encontrado.');
    }

    const scope = await this.resolveScope(dbUser, municipiosRequested, requestedProfile);

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
      throw new Error('Falha ao consultar o serviço de dashboard.');
    }
  }

  private async resolveScope(
    user: any,
    municipiosRequested?: string,
    requestedProfile?: string,
  ): Promise<DashboardScope> {
    
    const targetProfile = requestedProfile?.toUpperCase() || user.profile;

    const isAllowedTecnico =
      targetProfile === Profile.TECNICO &&
      (user.profile === Profile.TECNICO || user.profile === Profile.GESTOR || user.isTechnician);

    
    if (isAllowedTecnico) {
      return {
        perfil: 'tecnico',
        coordinates: user.coordinates || null,
        municipios: this.parseMunicipios(municipiosRequested),
      };
    }

    if (user.profile === Profile.GESTOR && targetProfile === Profile.GESTOR) {
      return {
        perfil: 'gestor',
        municipios: this.parseMunicipios(municipiosRequested),
      };
    }

    return {
      perfil: 'produtor',
      municipios: this.extractProdutorMunicipios(user),
    };
  }

  private extractProdutorMunicipios(user: any): string[] {
    if (!user.carProperties || user.carProperties.length === 0) {
      throw new Error('Produtor não possui nenhum imóvel/município associado.');
    }

    const municipalitySet = new Set<number>();

    user.carProperties.forEach((property: any) => {
      if (property.municipalityId) {
        municipalitySet.add(property.municipalityId);
      }
    });

    if (municipalitySet.size === 0) {
      throw new Error('Produtor não possui imóveis com municípios válidos.');
    }

    return Array.from(municipalitySet).map(String);
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