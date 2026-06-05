//CREAR Telefonos USE CASE

import type { ITelefonosRepositoryPort } from "../ports/output/ITelefonosRepositoryPort";
import { Telefonos} from "../../dominio/entities/Telefonos";
import { TelefonosDTO } from "../dto/TelefonosDTO";
import { CreateTelefonosRequest } from "../dto/CreateTelefonosRequest";
import type {ICrearTelefonosUseCase} from "../ports/input/Telefonos/ICreaTelefonosUseCase";

export class CrearTelefonossUseCase implements ICrearTelefonosUseCase {

    constructor(
        private TelefonosRepository: ITelefonosRepositoryPort
    ){}

    async execute (
        request: CreateTelefonosRequest
    ): Promise<TelefonosDTO> {

        //VALIDAR EMAIL DUPLICADO

        const exists = await this.TelefonosRepository.existsByEmail(request.email);

        if(exists){
            throw new Error(
                "El Email ya Existe"
            );
        }

        //CREAR ENTIDAD

        const Telefonoss = Telefonos.crear(
            request.nombre,
            request.email
        );

        //guardar

        const saved = await this.TelefonosRepository.save(Telefonoss);

        //respuesta

        return new TelefonosDTO (
            saved.id!,
            saved.nombre,
            saved.email
        );
    }
}