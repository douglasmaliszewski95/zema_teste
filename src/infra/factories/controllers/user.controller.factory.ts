import { AbstractUserService } from '@application/services/user/abstract-user.service';
import UserServiceFactory from '../services/user.service.factory';
import UserController from '@application/v1/controllers/user/user.controller';

export default class UserControllerFactory {
  private static userControllerFactory: UserController;
  static async make(userService?: AbstractUserService): Promise<UserController> {
    if (this.userControllerFactory) {
      return this.userControllerFactory;
    }

    this.userControllerFactory = new UserController(userService || (await UserServiceFactory.make()));
    return this.userControllerFactory;
  }
}
