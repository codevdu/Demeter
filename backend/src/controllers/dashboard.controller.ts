import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  async getDashboardData(req: Request, res: Response) {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const { cultura, de, ate, municipios } = req.query;

      const result = await this.dashboardService.getDashboardData(user, {
        cultura: cultura ? String(cultura) : undefined,
        de: de ? String(de) : undefined,
        ate: ate ? String(ate) : undefined,
        municipiosRequested: municipios ? String(municipios) : undefined,
      });

      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Erro ao carregar dados do dashboard' });
    }
  }
}
