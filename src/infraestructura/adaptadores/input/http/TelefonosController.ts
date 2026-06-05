//ADAPTER IN - CONTROLLER

import { TelefonosService } from "../../../../aplicacion/services/TelefonosService";
import { TelefonosDTO } from "../../../../aplicacion/dto/TelefonosDTO";
import { CreateTelefonosRequest } from "../../../../aplicacion/dto/CreateTelefonosRequest";
import type { ActualizarTelefonosRequest } from "../../../../aplicacion/dto/ActualizarTelefonosRequest";
export class TelefonosController {

    constructor (
        private TelefonosService: TelefonosService
    ){}

    crearTelefonos = async ( dtoUser:CreateTelefonosRequest) => {

        try {

            const Telefonos = await this.TelefonosService.crearTelefonos(dtoUser);

            return (Telefonos);
        } catch (error: any) {

            return {
                error: error.message
            };
        }
    };

    obtenerTelefonos = async (id:number) => {

        const Telefonos = await this.TelefonosService.obtenerTelefonos(id);

        if (!Telefonos) {
            return null;
        }

        return Telefonos;
    };

    listarTelefonos = async () => {
        const Telefonos = await this.TelefonosService.listarTelefonoss();

        return Telefonos;
    };

    actualizarTelefonos = async ( dtoActualizarTelefonos: ActualizarTelefonosRequest) => {

        try {

            const Telefonos = await this.TelefonosService.actualizarTelefonos(dtoActualizarTelefonos.id,dtoActualizarTelefonos);

            return Telefonos;
        } catch (error: any) {
            return error
        }
    };

    eliminarTelefonos = async (
        id: number
    ) => {
        try{
            await this.TelefonosService.eliminarTelefonos(id);
        }catch (error: any) {
            return error
        }
    };
}