import { ParamSituationRepository } from '@domain/repositories/paramSituation-repository';
import { AbstractParamSituationService } from '@application/services/paramSituation/abstract-paramSituation.service';
import { ParamSituationService } from '@application/services/paramSituation/paramSituation.service';

export default class ParamSituationServiceFactory {
  private static paramSituationServiceFactory: AbstractParamSituationService;

  static async make(paramSituationRepository: ParamSituationRepository): Promise<AbstractParamSituationService> {
    if (this.paramSituationServiceFactory) {
      return this.paramSituationServiceFactory;
    }

    this.paramSituationServiceFactory = new ParamSituationService(paramSituationRepository);
    return this.paramSituationServiceFactory;
  }
}
