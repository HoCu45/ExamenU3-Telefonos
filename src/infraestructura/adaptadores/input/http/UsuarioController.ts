//ADAPTER IN - CONTROLLER

import { UsuarioService } from "../../../../aplicacion/services/UsuarioService";
import { UsuarioDTO } from "../../../../aplicacion/dto/UsuarioDTO";
import { CreateUsuarioRequest } from "../../../../aplicacion/dto/CreateUsuarioRequest";
import type { ActualizarUsuarioRequest } from "../../../../aplicacion/dto/ActualizarUsuarioRequest";
export class UsuarioController {

    constructor (
        private usuarioService: UsuarioService
    ){}

    crearUsuario = async ( dtoUser:CreateUsuarioRequest) => {

        try {

            const usuario = await this.usuarioService.crearUsuario(dtoUser);

            return (usuario);
        } catch (error: any) {

            return {
                error: error.message
            };
        }
    };

    obtenerUsuario = async (id:number) => {

        const usuario = await this.usuarioService.obtenerUsuario(id);

        if (!usuario) {
            return null;
        }

        return usuario;
    };

    listarUsuarios = async () => {
        const usuarios = await this.usuarioService.listarUsuarios();

        return usuarios;
    };

    actualizarUsuario = async ( dtoActualizarUsuario: ActualizarUsuarioRequest) => {

        try {

            const usuario = await this.usuarioService.actualizarUsuario(dtoActualizarUsuario.id,dtoActualizarUsuario);

            return usuario;
        } catch (error: any) {
            return error
        }
    };

    eliminarUsuario = async (
        id: number
    ) => {
        try{
            await this.usuarioService.eliminarUsuario(id);
        }catch (error: any) {
            return error
        }
    };
}