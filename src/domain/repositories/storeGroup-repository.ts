import { Branch } from "@domain/entities/Branch";
import { StoreGroup } from "@domain/entities/StoreGroup";

export interface StoreGroupRepository {
  findStoreGroups(description: string, code: number): Promise<StoreGroup[]>;
  findBranches(branchId: string, storeGroupId: string): Promise<Branch[]>;
  findBranchesWithoutGroup(): Promise<Branch[]>;
}
