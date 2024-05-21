import { ParamSituation } from '@domain/entities/ParamSituation';
import { AbstractParamSituationService } from './abstract-paramSituation.service';
import { ParamSituationRepository } from '@domain/repositories/paramSituation-repository';
import { ParamSituationsDTO } from '@domain/dto/paramSituation/update-paramSituation-dto';

export class ParamSituationService implements AbstractParamSituationService {
  constructor(
    private paramSituationRepository: ParamSituationRepository,
  ) { }

  async listSituations(): Promise<ParamSituation[]> {
    const situations = await this.paramSituationRepository.findSituations();

    return situations;
  }

  async listExcludedSituations(): Promise<ParamSituation[]> {
    const situations = await this.paramSituationRepository.findExcludedSituations();

    return situations;
  }

  async saveSituations({ situationsLeft, situationsRight }: ParamSituationsDTO): Promise<string> {
    let message = '';

    const updated = await this.updateSituations(situationsRight);
    const inserted = await this.insertSituations(situationsRight);
    const deleted = await this.deleteSituations(situationsRight);

    message = (updated || inserted || deleted) ? 'Gravado com sucesso' : 'Erro ao gravar os dados';

    return message;
  }

  private async updateSituations(situationsRight: ParamSituation[]) {
    const data = await this.paramSituationRepository.selectToUpdate();
    let isUpdate = false;
    let query = `
       UPDATE 
         ERN_T_EMD_CAD_SITUACAO 
       SET 
         STATUS = 1
       WHERE 
         1=1 
       AND 
         CODSITPROD 
       IN ( SELECT CODSITPROD FROM CAD_SITPRO WHERE DESCRICAO IN (
    `;

    data.forEach((item, index) => {
      if (situationsRight.find(x => x.ID === item.ID)) {
        query += ` ${data[index].ID},`;
        isUpdate = true;
      }
    });
    if (isUpdate) {
      query += '))';
      const result = await this.paramSituationRepository.executeQuery(query);
      return result === 'OK' ? true : false;
    }
  }

  private async insertSituations(situationsRight: ParamSituation[]) {
    const data = await this.paramSituationRepository.selectToInsert();
    let isInsert = false;
    let query = `
      INSERT INTO 
        ERN_T_EMD_CAD_SITUACAO(CODSITPROD) 
      SELECT 
        CODSITPROD 
      FROM 
        CAD_SITPRO 
      WHERE 
        DESCRICAO IN ( `;

    data.forEach((item, index) => {
      if (situationsRight.find(x => x.ID === item.ID)) {
        query += ` ${data[index].ID},`;
        isInsert = false;
      } else
        isInsert = true;
    });

    if (isInsert) {
      query += ')';
      const result = await this.paramSituationRepository.executeQuery(query);
      return result === 'OK' ? true : false;
    }
  }

  private async deleteSituations(situationsRight: ParamSituation[]) {
    const data = await this.paramSituationRepository.selectToInsert();
    let isDelete = false;
    let query = `
      UPDATE 
        ERN_T_EMD_CAD_SITUACAO 
      SET 
        STATUS = 9 
      WHERE 
        1=1 
      AND CODSITPROD IN ( SELECT CODSITPROD FROM CAD_SITPRO WHERE DESCRICAO IN (`;

    data.forEach((item, index) => {
      if (situationsRight.find(x => x.ID === item.ID)) {
        query += ` ${data[index].ID},`;
        isDelete = false;
      } else
        isDelete = true;
    });

    if (isDelete) {
      query += '))';
      const result = await this.paramSituationRepository.executeQuery(query);
      return result === 'OK' ? true : false;
    }
  }
}
