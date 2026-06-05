//input port
//actualizar usuario

import { ActualizarUsuarioRequest } from "../../../dto/ActualizarUsuarioRequest";
import { UsuarioDTO } from "../../../dto/UsuarioDTO";
export interface IActualizarUsuarioUseCase {
    execute(
        id: number,
        request: ActualizarUsuarioRequest
    ): Promise<UsuarioDTO>;
}