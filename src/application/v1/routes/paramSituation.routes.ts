import { Router } from 'express';

import ParamSituationControllerFactory from '@infra/factories/controllers/paramSituation.controller.factory';

const paramSituationRoutes = Router();

(async () => {
  paramSituationRoutes.get('/list', (await ParamSituationControllerFactory.make()).listSituations);
  paramSituationRoutes.get('/listExcluded', (await ParamSituationControllerFactory.make()).listExcludedSituations);
  paramSituationRoutes.post('/', (await ParamSituationControllerFactory.make()).save);
})();

export default paramSituationRoutes;
