//ACTUALIZAR Telefonos USE CASE

import type {ITelefonosRepositoryPort} from "../ports/output/ITelefonosRepositoryPort";

import { TelefonosDTO } from "../dto/TelefonosDTO";

import { ActualizarTelefonosRequest } from "../dto/ActualizarTelefonosRequest";
import type { IActualizarTelefonosUseCase } from "../ports/input/Telefonos/IActualizarTelefonosUseCase";

export class ActualizarTelefonosUseCase implements IActualizarTelefonosUseCase {

constructor (
private TelefonosRepository: ITelefonosRepositoryPort
){}

async execute (
id: number,
request: ActualizarTelefonosRequest
): Promise<TelefonosDTO> {

    //Buscar Telefonos

    const Telefonos =

await this. TelefonosRepository
.findById (id) ;

if (!Telefonos) {
throw new Error (
"Telefonos no encontrado"
);
}


//actualizar entidad

Telefonos. actualizar (

request . nombre,
request . email
);

/*

GUARDAR CAMBIOS

*/

const updated =
await this.TelefonosRepository

. save (Telefonos) ;

/*

RESPUESTA
*/
return new TelefonosDTO (
updated. id!,
updated. nombre,
updated. email
);
}
}