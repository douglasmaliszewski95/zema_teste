import { CreateSessionRequestDTO, CreateSessionResponseDTO } from "@domain/dto/user/create-session-dto"; 

export abstract class AbstractUserService {
  abstract login({ cpf, senha }: CreateSessionRequestDTO): Promise<CreateSessionResponseDTO>;
}
