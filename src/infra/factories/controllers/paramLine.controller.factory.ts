import { AbstractParamLineService } from '@application/services/paramLine/abstract-paramLine.service';
import ParamLineServiceFactory from '../services/paramLine.service.factory';
import ParamLineController from '@application/v1/controllers/paramLine/paramLine.controller';
import { ParamLinePrismaRepository } from '@infra/repositories/paramLine-prisma-repository';
import MSSQLFactory from '../mssql';
import { sqlConfig } from '@config/mssql';

export default class ParamLineControllerFactory {
  private static paramLineControllerFactory: ParamLineController;
  static async make(paramLineService?: AbstractParamLineService): Promise<ParamLineController> {
    if (this.paramLineControllerFactory) {
      return this.paramLineControllerFactory;
    }

    const paramLineRepository = new ParamLinePrismaRepository(MSSQLFactory.make(sqlConfig));

    this.paramLineControllerFactory = new ParamLineController(paramLineService || (await ParamLineServiceFactory.make(paramLineRepository)));
    return this.paramLineControllerFactory;
  }
}
