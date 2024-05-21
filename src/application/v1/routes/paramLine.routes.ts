import { Router } from 'express';

import ParamLineControllerFactory from '@infra/factories/controllers/paramLine.controller.factory';

const paramLineRoutes = Router();

(async () => {
  paramLineRoutes.get('/list', (await ParamLineControllerFactory.make()).listLines);
  paramLineRoutes.get('/listExcluded', (await ParamLineControllerFactory.make()).listExcludedLines);
  paramLineRoutes.post('/', (await ParamLineControllerFactory.make()).save);
})();

export default paramLineRoutes;
