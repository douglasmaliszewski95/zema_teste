import { ParamSituationsDTO } from "@domain/dto/paramSituation/update-paramSituation-dto";
import { ParamSituation } from "@domain/entities/ParamSituation";

export abstract class AbstractParamSituationService {
  abstract listSituations(): Promise<ParamSituation[]>;
  abstract listExcludedSituations(): Promise<ParamSituation[]>;
  abstract saveSituations({ situationsLeft, situationsRight }: ParamSituationsDTO): Promise<string>;
}
