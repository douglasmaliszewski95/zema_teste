import { StoreGroup } from '@domain/entities/StoreGroup';
import { AbstractStoreGroupService } from './abstract-storeGroup.service';
import { StoreGroupRepository } from '@domain/repositories/storeGroup-repository';
import { Branch } from '@domain/entities/Branch';

export class StoreGroupService implements AbstractStoreGroupService {
  constructor(
    private storeGroupRepository: StoreGroupRepository,
  ) { }

  async listStoreGroups(description: string, code: number): Promise<StoreGroup[]> {
    const storeGroups = await this.storeGroupRepository.findStoreGroups(description, code);

    return storeGroups;
  }

  async listBranches(branchId: string, storeGroupId: string): Promise<Branch[]> {
    const branches = await this.storeGroupRepository.findBranches(branchId, storeGroupId);

    return branches;
  }

  async listBranchesWithoutGroup(): Promise<Branch[]> {
    const branches = await this.storeGroupRepository.findBranchesWithoutGroup();

    return branches;
  }
}
