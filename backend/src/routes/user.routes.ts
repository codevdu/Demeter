import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { authorizeRoles } from '../middlewares/role.middleware.js'

const userRoutes = Router()
const userController = new UserController()

userRoutes.get('/',
    authMiddleware,
    authorizeRoles('GESTOR'),
    (req, res) =>
        userController.listByState(req, res)
);

userRoutes.patch('/:id/Profile',
    authMiddleware,
    authorizeRoles('GESTOR'),
    (req, res) =>
        userController.updateProfile(req, res)
);

userRoutes.delete('/:id',
    authMiddleware,
    authorizeRoles('GESTOR'),
    (req, res) =>
        userController.delete(req, res)
);

export { userRoutes }