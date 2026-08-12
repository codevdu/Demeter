import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Profile } from '@prisma/client';
import { UserRepository, CreateUserData } from '../repositories/user.repository.js';

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  cpfCnpj: string;
  municipality?: string | null;
  coordinates?: string | null;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  private apiBaseUrl: string;
  private apiToken: string | undefined;

  constructor(private userRepository: UserRepository) {
    this.apiBaseUrl = process.env.API_SICAR || 'http://localhost:4000/api';
    this.apiToken = process.env.TOKEN_SICAR;
  }

  async register(data: RegisterDTO) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('E-mail já cadastrado.');
    }

    const existingCpfCnpj = await this.userRepository.findByCpfCnpj(data.cpfCnpj);
    if (existingCpfCnpj) {
      throw new Error('CPF ou CNPJ já cadastrado no sistema.');
    }

    if (!this.apiToken) {
      console.error("❌ [AuthService] API_TOKEN não configurado nas variáveis de ambiente.");
      throw new Error("Erro interno no servidor: configuração ausente.");
    }

    const configHeaders = {
      headers: { Authorization: `Bearer ${this.apiToken}` },
    };

    let imoveisResumo: any[] = [];
    let primeiroDetalhamento: any = null;

    try {
      const propRes = await axios.get(
        `${this.apiBaseUrl}/api-sicar-cpfcnpj/v1/${data.cpfCnpj}`,
        configHeaders
      );

      imoveisResumo = propRes.data?.dados?.imoveis || propRes.data?.imoveis || [];

      if (!imoveisResumo.length) {
        throw new Error(`Nenhum imóvel vinculado ao CPF/CNPJ informado.`);
      }

      const primeiroCodigo = imoveisResumo[0].codigoimovel;
      const primeiroImovelRes = await axios.get(
        `${this.apiBaseUrl}/api-sicar-demonstrativo/v1/${primeiroCodigo}`,
        configHeaders
      );
      
      const resultData = primeiroImovelRes.data?.result?.[0] || primeiroImovelRes.data?.dados || primeiroImovelRes.data;
      primeiroDetalhamento = resultData;

    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error(`Dados do CAR não encontrados para o CPF/CNPJ informado.`);
      }
      throw new Error(error.message || 'Falha na comunicação com a API externa do CAR.');
    }

    const estadoExtraido = primeiroDetalhamento?.unidadeFederativa || null;

    const carPropertiesList = await Promise.all(
      imoveisResumo.map(async (item: any) => {
        const codigoImovel = item.codigoimovel;

        let detalhes = primeiroDetalhamento;
        if (codigoImovel !== imoveisResumo[0].codigoimovel) {
          try {
            const imovelRes = await axios.get(
              `${this.apiBaseUrl}/api-sicar-demonstrativo/v1/${codigoImovel}`,
              configHeaders
            );
            detalhes = imovelRes.data?.result?.[0] || imovelRes.data?.dados || imovelRes.data;
          } catch {
            detalhes = null;
          }
        }

        const codigoMunicipioPropriedade = detalhes?.codigoMunicipio
          ? Number(detalhes.codigoMunicipio)
          : 0;

        const nomeMunicipioPropriedade = detalhes?.municipio
          ? detalhes.municipio
          : (data.municipality || 'Não Informado');

        return {
          carReceipt: codigoImovel,
          municipality: nomeMunicipioPropriedade,
          municipalityId: codigoMunicipioPropriedade,
        };
      })
    );

    const passwordHash = await bcrypt.hash(data.password, 10);

    // 5. Monta DTO e grava o usuário no banco
    const userData: CreateUserData = {
      email: data.email,
      name: data.name,
      cpfCnpj: data.cpfCnpj,
      passwordHash,
      profile: Profile.PRODUTOR,
      state: estadoExtraido,
      coordinates: data.coordinates || null,
      carPropertiesList,
    };

    const user = await this.userRepository.create(userData);

    return {
      message: 'Usuário cadastrado com sucesso!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        state: user.state,
      },
    };
  }

  async login(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas.');
    }

    // Payload JWT mantido enxuto por boas práticas
    const payload = {
      id: user.id,
      profile: user.profile,
    };

    const secret = process.env.JWT_SECRET || 'default_secret';
    const token = jwt.sign(payload, secret, { expiresIn: '8h' });

    return {
      token,
      user: {
        id: user.id,
        profile: user.profile,
        state: user.state,
        coordinates: user.coordinates,
        carProperties: user.carProperties || [],
      },
    };
  }
}