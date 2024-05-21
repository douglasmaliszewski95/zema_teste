import { ParamLineRepository } from '@domain/repositories/paramLine-repository';
import { AbstractParamLineService } from '@application/services/paramLine/abstract-paramLine.service';
import { ParamLineService } from '@application/services/paramLine/paramLine.service';

export default class ParamLineServiceFactory {
  private static paramLineServiceFactory: AbstractParamLineService;

  static async make(paramLineRepository: ParamLineRepository): Promise<AbstractParamLineService> {
    if (this.paramLineServiceFactory) {
      return this.paramLineServiceFactory;
    }

    this.paramLineServiceFactory = new ParamLineService(paramLineRepository);
    return this.paramLineServiceFactory;
  }
}
