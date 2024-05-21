import { Branch } from "@domain/entities/Branch";
import { StoreGroup } from "@domain/entities/StoreGroup";

export abstract class AbstractStoreGroupService {
  abstract listStoreGroups(description: string, code: number): Promise<StoreGroup[]>;
  abstract listBranches(branchId: string, storeGroupId: string): Promise<Branch[]>;
  abstract listBranchesWithoutGroup(): Promise<Branch[]>;
}
