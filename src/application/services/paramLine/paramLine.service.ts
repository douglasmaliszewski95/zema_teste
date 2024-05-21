import { ParamLine } from '@domain/entities/ParamLine';
import { AbstractParamLineService } from './abstract-paramLine.service';
import { ParamLineRepository } from '@domain/repositories/paramLine-repository';
import { ParamLinesDTO } from '@domain/dto/paramLine/update-paramLine-dto';

export class ParamLineService implements AbstractParamLineService {
  constructor(
    private paramLineRepository: ParamLineRepository,
  ) {}

  async listLines(): Promise<ParamLine[]> {
    const lines = await this.paramLineRepository.findLines();

    return lines;
  }

  async listExcludedLines(): Promise<ParamLine[]> {
    const lines = await this.paramLineRepository.findExcludedLines();

    return lines;
  }

  async saveLines({ linesLeft, linesRight }: ParamLinesDTO): Promise<string> {
    let message = '';

    if (linesRight.length === 0) {
      message = await this.paramLineRepository.updateERNLines();
    }

    const updated = await this.updateLines(linesRight);
    const inserted = await this.insertLines(linesRight);
    const deleted = await this.deleteLines(linesRight);

    message = (updated || inserted || deleted) ? 'Gravado com sucesso' : 'Erro ao gravar os dados';

    return message;
  }

  private async updateLines(linesRight: ParamLine[]) {
    const data = await this.paramLineRepository.selectToUpdate();
    let isUpdate = false;
    let query = `
      UPDATE 
        ERN_T_EMD_CAD_LINHA 
      SET 
        STATUS = 1 
      WHERE 
        1=1 
      AND 
        CODLINHA 
      IN ( SELECT CODLINHA FROM CAD_LINHA WHERE CODLINHA IN (
    `;

    data.forEach((item, index) => {
      if (linesRight.find(x => x.ID === item.ID)) {
        query += ` ${data[index].ID},`;
        isUpdate = true;
      }
    });
    if (isUpdate) {
      query += '))';
      const result = await this.paramLineRepository.executeQuery(query);
      return result === 'OK' ? true : false;
    }
  }

  private async insertLines(linesRight: ParamLine[]) {
    const data = await this.paramLineRepository.selectToInsert();
    let isInsert = false;
    let query = `INSERT INTO ERN_T_EMD_CAD_LINHA(CODLINHA) VALUES `;

    data.forEach((item, index) => {
      if (linesRight.find(x => x.ID === item.ID)) {
        query += ` (${data[index].ID}),`;
        isInsert = false;
      } else
        isInsert = true;
    });

    if (isInsert) {
      const result = await this.paramLineRepository.executeQuery(query);
      return result === 'OK' ? true : false;
    }
  }

  private async deleteLines(linesRight: ParamLine[]) {
    const data = await this.paramLineRepository.selectToInsert();
    let isDelete = false;
    let query = `UPDATE ERN_T_EMD_CAD_LINHA SET STATUS = 9 WHERE 1=1 AND (`;

    data.forEach((item, index) => {
      if (linesRight.find(x => x.ID === item.ID)) {
        query += ` CODLINHA = ${data[index].ID} OR,`;
        isDelete = false;
      } else
        isDelete = true;
    });

    if (isDelete) {
      const result = await this.paramLineRepository.executeQuery(query);
      return result === 'OK' ? true : false;
    }
  }
}
