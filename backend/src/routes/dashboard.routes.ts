import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

dashboardRoutes.get('/dashboard/:tipo', authMiddleware, (req, res) =>
  dashboardController.getDashboardData(req, res)
);

dashboardRoutes.get('/grafico', authMiddleware, (req, res) =>
  dashboardController.getDashboardData(req, res)
); // integrar a análise de dados

export { dashboardRoutes };
