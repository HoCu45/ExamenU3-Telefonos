//INPUT PORTS
//LISTAR USUARIOS

import { UsuarioDTO } from "../../../dto/UsuarioDTO";

export interface IListarUsuariosUseCase {
    execute(): Promise<UsuarioDTO[]>;
}