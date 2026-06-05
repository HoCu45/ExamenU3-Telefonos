//Eliminar Telefonos Use Case

import type { IEliminarTelefonosUseCase } from "../ports/input/Telefonos/IEliminarTelefonosUseCase";
import type { ITelefonosRepositoryPort } from "../ports/output/ITelefonosRepositoryPort";

export class EliminarTelefonosUseCase implements IEliminarTelefonosUseCase {

    constructor (
        private TelefonosRepository: ITelefonosRepositoryPort
    ) {}

    async execute (id: number): Promise<void> {
        

        //Verificar existencia

        const Telefonos = await this.TelefonosRepository.findById(id);

        if(!Telefonos) {
            throw new Error(
                "Telefonos no encontrado"
            );
        }

        //ELIMINAR

        await this.TelefonosRepository.deleteById(id);
    }
}