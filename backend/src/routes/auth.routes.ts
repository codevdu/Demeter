import { Request, Router, Response } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { MeController } from '../controllers/me.controller.js';

const authRoutes = Router();
const authController = new AuthController();
const meController = new MeController();

authRoutes.post('/register', (req, res) => authController.register(req, res));
authRoutes.post('/login', (req, res) => authController.login(req, res));
authRoutes.get('/me', authMiddleware, (req: Request, res: Response) => {
    meController.me(req, res);
});

export { authRoutes };
