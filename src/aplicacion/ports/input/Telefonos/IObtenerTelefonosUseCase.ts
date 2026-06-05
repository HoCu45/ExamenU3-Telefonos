//INPUT PORT
//OBTENER Telefonos

import { TelefonosDTO } from "../../../dto/TelefonosDTO"

export interface IObtenerTelefonosUseCase {
    execute(
        id: number
    ): Promise<TelefonosDTO | null>;
}