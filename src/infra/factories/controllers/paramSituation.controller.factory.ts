import { AbstractParamSituationService } from '@application/services/paramSituation/abstract-paramSituation.service';
import ParamSituationServiceFactory from '../services/paramSituation.service.factory';
import ParamSituationController from '@application/v1/controllers/paramSituation/paramSituation.controller';
import { ParamSituationPrismaRepository } from '@infra/repositories/paramSituation-prisma-repository';
import MSSQLFactory from '../mssql';
import { sqlConfig } from '@config/mssql';

export default class ParamSituationControllerFactory {
  private static paramSituationControllerFactory: ParamSituationController;
  static async make(paramSituationService?: AbstractParamSituationService): Promise<ParamSituationController> {
    if (this.paramSituationControllerFactory) {
      return this.paramSituationControllerFactory;
    }

    const paramSituationRepository = new ParamSituationPrismaRepository(MSSQLFactory.make(sqlConfig));

    this.paramSituationControllerFactory = new ParamSituationController(paramSituationService || (await ParamSituationServiceFactory.make(paramSituationRepository)));
    return this.paramSituationControllerFactory;
  }
}
