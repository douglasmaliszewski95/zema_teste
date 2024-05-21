import { ParamLine } from "@domain/entities/ParamLine";

export interface ParamLineRepository {
  findLines(): Promise<ParamLine[]>;
  findExcludedLines(): Promise<ParamLine[]>;
  updateERNLines(): Promise<string>;
  selectToUpdate(): Promise<ParamLine[]>;
  selectToInsert(): Promise<ParamLine[]>;
  executeQuery(query: string): Promise<string>;
}
