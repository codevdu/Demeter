import { Request, Response } from 'express';
import { DashboardService, DashboardType } from '../services/dashboard.service.js';
import { UserRepository } from '../repositories/user.repository.js';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    const userRepository = new UserRepository();
    this.dashboardService = new DashboardService(userRepository);
  }

  async getDashboardData(req: Request, res: Response) {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }
      const { tipo } = req.params;
      
      const { cultura, de, ate, municipios, perfil } = req.query;

      const result = await this.dashboardService.getDashboardData(user.id, {
        tipo: tipo as DashboardType,
        cultura: cultura ? String(cultura) : undefined,
        de: de ? String(de) : undefined,
        ate: ate ? String(ate) : undefined,
        municipiosRequested: municipios ? String(municipios) : undefined,
        requestedProfile: perfil ? String(perfil) : undefined,
      });

      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Erro ao carregar dados do dashboard' });
    }
  }
}
