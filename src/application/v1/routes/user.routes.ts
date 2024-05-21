import { Router } from 'express';

import UserControllerFactory from '@infra/factories/controllers/user.controller.factory';
import { authValidator } from '@application/middleware/validators/user/auth-validator';

const userRoutes = Router();

(async () => {
  userRoutes.post('/auth', authValidator, (await UserControllerFactory.make()).login);
})();

export default userRoutes;
