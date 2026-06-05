import type { ITelefonosRepositoryPort } from "../ports/output/ITelefonosRepositoryPort";

import { TelefonosDTO } from "../dto/TelefonosDTO";
import type { IObtenerTelefonosUseCase } from "../ports/input/Telefonos/IObtenerTelefonosUseCase";

export class ObtenerTelefonossUseCase implements IObtenerTelefonosUseCase {
    
    constructor (
        private TelefonosRepository: ITelefonosRepositoryPort
    ){}

    async execute (
        id:number
    ): Promise <TelefonosDTO | null> {
        const Telefonos = await this.TelefonosRepository.findById(id);

        if(!Telefonos) {
            return null;
        }

        return new TelefonosDTO(
            Telefonos.id!,
            Telefonos.nombre,
            Telefonos.email
        )
    }
}