import { ParamLinesDTO } from "@domain/dto/paramLine/update-paramLine-dto";
import { ParamLine } from "@domain/entities/ParamLine";

export abstract class AbstractParamLineService {
  abstract listLines(): Promise<ParamLine[]>;
  abstract listExcludedLines(): Promise<ParamLine[]>;
  abstract saveLines({ linesLeft, linesRight }: ParamLinesDTO): Promise<string>;
}
