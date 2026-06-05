import type { ITelefonosRepositoryPort } from "../ports/output/ITelefonosRepositoryPort";

import { TelefonosDTO } from "../dto/TelefonosDTO";
import type { IListarTelefonosUseCase } from "../ports/input/Telefonos/IListarTelefonosUseCase";

export class ListarTelefonossUseCase implements IListarTelefonosUseCase {

    constructor (
        private TelefonosRepository: ITelefonosRepositoryPort
    ){}

    async execute(): Promise<TelefonosDTO[]> {
        const Telefonoss = await this.TelefonosRepository.findAll();

        return Telefonoss.map(
            Telefonos =>
                new TelefonosDTO(
                    Telefonos.id!,
                    Telefonos.nombre,
                    Telefonos.email
                )
        );
    }
}