import { CreateSessionRequestDTO, CreateSessionResponseDTO } from '@domain/dto/user/create-session-dto';
import { AbstractUserService } from './abstract-user.service';
import { UNAUTHORIZED } from 'http-status';
import { UnauthorizedException } from '@domain/exceptions';
import axios, { AxiosError, AxiosResponse } from 'axios';

export class UserService implements AbstractUserService {

  async login({ cpf, senha }: CreateSessionRequestDTO): Promise<CreateSessionResponseDTO> {
    const user = await axios.post(`${process.env.API_LOGIN}/v1/login`, {
      cpf,
      senha
    })
      .then((res: AxiosResponse) => {
        return res.data;
      }, (err: AxiosError) => {
        if (err.response?.status  === UNAUTHORIZED)
          throw new UnauthorizedException({ errorCode: 'USR002' });
      });

    return user;
  }
}
