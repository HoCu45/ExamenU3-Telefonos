//input port
//actualizar Telefonos

import { ActualizarTelefonosRequest } from "../../../dto/ActualizarTelefonosRequest";
import { TelefonosDTO } from "../../../dto/TelefonosDTO";
export interface IActualizarTelefonosUseCase {
    execute(
        id: number,
        request: ActualizarTelefonosRequest
    ): Promise<TelefonosDTO>;
}