import { AbstractStoreGroupService } from '@application/services/storeGroup/abstract-storeGroup.service';
import StoreGroupServiceFactory from '../services/storeGroup.service.factory';
import StoreGroupController from '@application/v1/controllers/storeGroup/storeGroup.controller';
import { StoreGroupPrismaRepository } from '@infra/repositories/storeGroup-prisma-repository';
import MSSQLFactory from '../mssql';
import { sqlConfig } from '@config/mssql';

export default class StoreGroupControllerFactory {
  private static storeGroupControllerFactory: StoreGroupController;
  static async make(storeGroupService?: AbstractStoreGroupService): Promise<StoreGroupController> {
    if (this.storeGroupControllerFactory) {
      return this.storeGroupControllerFactory;
    }

    const storeGroupRepository = new StoreGroupPrismaRepository(MSSQLFactory.make(sqlConfig));

    this.storeGroupControllerFactory = new StoreGroupController(storeGroupService || (await StoreGroupServiceFactory.make(storeGroupRepository)));
    return this.storeGroupControllerFactory;
  }
}
