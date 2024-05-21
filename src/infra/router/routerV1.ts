import { Router } from 'express';

import userRoutes from '@application/v1/routes/user.routes';
import paramLinesRoutes from '@application/v1/routes/paramLine.routes';
import paramSituationsRoutes from '@application/v1/routes/paramSituation.routes';
import storeGroupsRoutes from '@application/v1/routes/storeGroup.routes';

const routerV1 = Router();

(async () => {
  routerV1.use('/paramLines', paramLinesRoutes);
  routerV1.use('/paramSituations', paramSituationsRoutes);
  routerV1.use('/users', userRoutes);
  routerV1.use('/storeGroups', storeGroupsRoutes);
})();

export default routerV1;
