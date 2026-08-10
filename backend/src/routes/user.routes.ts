import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { authMiddleware, requireGestor } from '../middlewares/auth.middleware.js'

const userRoutes = Router()
const userController = new UserController()

userRoutes.get('/', authMiddleware, requireGestor, (req, res) =>
    userController.listByState(req, res)
);

userRoutes.patch('/:id/Profile', authMiddleware, requireGestor, (req, res) =>
    userController.updateProfile(req, res)
);

userRoutes.delete('/:id', authMiddleware, requireGestor, (req, res) =>
    userController.delete(req, res)
);

export { userRoutes }