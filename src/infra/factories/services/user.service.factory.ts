import { AbstractUserService } from '@application/services/user/abstract-user.service';
import { UserService } from '@application/services/user/user.service';

export default class UserServiceFactory {
  private static userServiceFactory: AbstractUserService;

  static async make(): Promise<AbstractUserService> {
    if (this.userServiceFactory) {
      return this.userServiceFactory;
    }

    this.userServiceFactory = new UserService();
    return this.userServiceFactory;
  }
}
