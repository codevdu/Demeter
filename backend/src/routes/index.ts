import { Router } from 'express';
import { authRoutes } from './auth.routes.js';
import { dashboardRoutes } from './dashboard.routes.js';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/api', dashboardRoutes);

export { routes };
