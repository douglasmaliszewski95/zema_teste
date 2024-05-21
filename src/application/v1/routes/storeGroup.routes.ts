import { Router } from 'express';

import StoreGroupControllerFactory from '@infra/factories/controllers/storeGroup.controller.factory';

const storeGroupsRoutes = Router();

(async () => {
  storeGroupsRoutes.post('/list', (await StoreGroupControllerFactory.make()).list);
  storeGroupsRoutes.get('/branchesWithoutGroup', (await StoreGroupControllerFactory.make()).branchesWithoutGroup);
  // storeGroupsRoutes.get('/branchesFromGroup', (await StoreGroupControllerFactory.make()).branchesFromGroup);
  storeGroupsRoutes.get('/branches', (await StoreGroupControllerFactory.make()).branches);
  // storeGroupsRoutes.post('/', (await StoreGroupControllerFactory.make()).save);
  // storeGroupsRoutes.delete('/deleteStoreGroup', (await StoreGroupControllerFactory.make()).deleteStoreGroup);
})();

export default storeGroupsRoutes;
