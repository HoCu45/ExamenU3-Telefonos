//INPUT PORTS
//LISTAR TelefonosS

import { TelefonosDTO } from "../../../dto/TelefonosDTO";

export interface IListarTelefonosUseCase {
    execute(): Promise<TelefonosDTO[]>;
}