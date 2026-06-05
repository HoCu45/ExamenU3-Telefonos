//iNPUT PORT
//CREAR Telefonos

import { CreateTelefonosRequest } from "../../../dto/CreateTelefonosRequest";
import { TelefonosDTO } from "../../../dto/TelefonosDTO";

export interface ICrearTelefonosUseCase {
    execute(
        request: CreateTelefonosRequest
    ): Promise<TelefonosDTO>;
}