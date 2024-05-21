import { StoreGroupRepository } from '@domain/repositories/storeGroup-repository';
import { AbstractStoreGroupService } from '@application/services/storeGroup/abstract-storeGroup.service';
import { StoreGroupService } from '@application/services/storeGroup/storeGroup.service';

export default class StoreGroupServiceFactory {
  private static storeGroupServiceFactory: AbstractStoreGroupService;

  static async make(storeGroupRepository: StoreGroupRepository): Promise<AbstractStoreGroupService> {
    if (this.storeGroupServiceFactory) {
      return this.storeGroupServiceFactory;
    }

    this.storeGroupServiceFactory = new StoreGroupService(storeGroupRepository);
    return this.storeGroupServiceFactory;
  }
}
