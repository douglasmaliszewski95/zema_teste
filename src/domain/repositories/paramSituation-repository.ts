import { ParamSituation } from "@domain/entities/ParamSituation";

export interface ParamSituationRepository {
  findSituations(): Promise<ParamSituation[]>;
  findExcludedSituations(): Promise<ParamSituation[]>;
  selectToUpdate(): Promise<ParamSituation[]>;
  selectToInsert(): Promise<ParamSituation[]>;
  executeQuery(query: string): Promise<string>;
}
