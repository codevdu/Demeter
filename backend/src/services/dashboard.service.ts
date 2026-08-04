import axios from 'axios';
import { Profile } from '@prisma/client';
import { TokenPayload } from '../@types/express.js';

export interface DashboardQueryParams {
  cultura?: string;
  de?: string;
  ate?: string;
  municipiosRequested?: string;
}

interface DashboardScope {
  perfil: string;
  municipios: string[];
}

export class DashboardService {
  private readonly dataServiceUrl =
    process.env.DATA_SERVICE_URL ?? 'http://localhost:8000';

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

    const scope = this.resolveScope(user, municipiosRequested);

    const params = {
      perfil: scope.perfil,
      cultura,
      de,
      ate,
      municipios: scope.municipios.join(','),
    };

    try {
      const { data } = await axios.get(`${this.dataServiceUrl}/grafico`, { // integrar a análise de dados
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

  private resolveScope(
    user: TokenPayload,
    municipiosRequested?: string,
  ): DashboardScope {
    const perfil = user.profile.toLowerCase();

    switch (user.profile) {
      case Profile.PRODUTOR:
        return {
          perfil,
          municipios: this.resolveProdutor(user),
        };

      case Profile.TECNICO:
        return {
          perfil,
          municipios: this.resolveTecnico(user, municipiosRequested),
        };

      case Profile.GESTOR:
        return {
          perfil,
          municipios: this.parseMunicipios(municipiosRequested),
        };

      default:
        throw new Error('Perfil não suportado');
    }
  }

  private resolveProdutor(user: TokenPayload): string[] {
    if (!user.localId) {
      throw new Error('Produtor não possui município associado');
    }

    return [user.localId];
  }

  private resolveTecnico(
    user: TokenPayload,
    municipiosRequested?: string,
  ): string[] {
    const allowedLocals = user.allowedLocals ?? [];

    if (allowedLocals.length === 0) {
      throw new Error('Técnico sem municípios autorizados');
    }

    if (!municipiosRequested) {
      return allowedLocals;
    }

    const requested = this.parseMunicipios(municipiosRequested);

    const filtered = requested.filter((municipio) =>
      allowedLocals.includes(municipio),
    );

    return filtered.length > 0 ? filtered : allowedLocals;
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