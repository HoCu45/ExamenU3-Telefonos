import type { ITelefonosRepositoryPort } from "../ports/output/ITelefonosRepositoryPort";

import { TelefonosDTO } from "../dto/TelefonosDTO";

import { CreateTelefonosRequest } from "../dto/CreateTelefonosRequest";
import { ActualizarTelefonosRequest } from "../dto/ActualizarTelefonosRequest";

import { Telefonos} from "../../dominio/entities/Telefonos";
import type { ICrearTelefonosUseCase } from "../ports/input/Telefonos/ICreaTelefonosUseCase";
import type { IActualizarTelefonosUseCase } from "../ports/input/Telefonos/IActualizarTelefonosUseCase";
import type { IEliminarTelefonosUseCase } from "../ports/input/Telefonos/IEliminarTelefonosUseCase";
import type { IObtenerTelefonosUseCase } from "../ports/input/Telefonos/IObtenerTelefonosUseCase";
import type { IListarTelefonosUseCase } from "../ports/input/Telefonos/IListarTelefonosUseCase";

export class TelefonosService {
    constructor(
    private CrearTelefonossUseCase: ICrearTelefonosUseCase,
    private ObtenerTelefonossUseCase: IObtenerTelefonosUseCase,
    private ListarTelefonossUseCase: IListarTelefonosUseCase,
    private ActualizarTelefonossUseCase: IActualizarTelefonosUseCase,
    private EliminarTelefonossUseCase: IEliminarTelefonosUseCase,
  ) {}

  async listarTelefonoss(): Promise<TelefonosDTO[]> {
    const Telefonoss = await this.ListarTelefonossUseCase.execute();

    return Telefonoss.map(
        Telefonos => new TelefonosDTO(
            Telefonos.id!,
            Telefonos.nombre,
            Telefonos.email
        )

    );
      

}

async crearTelefonos(
    request: CreateTelefonosRequest
): Promise<TelefonosDTO> {
    const Telefonos = await this.CrearTelefonossUseCase.execute(request);

    return new TelefonosDTO(
        Telefonos.id!,
        Telefonos.nombre,
        Telefonos.email
    )
}

async obtenerTelefonos(id: number): Promise<TelefonosDTO|null>{

    const Telefonos = await this.ObtenerTelefonossUseCase.execute(id);

    if(!Telefonos){
        return null;
    }
    else{
    return new TelefonosDTO(
    Telefonos.id!,
    Telefonos.nombre,
    Telefonos.email
    )
    }
    
    

}

async actualizarTelefonos(
id: number,
request: ActualizarTelefonosRequest
): Promise<TelefonosDTO>{
    const Telefonos =
await this.ActualizarTelefonossUseCase.execute(
id,
request
)

return new TelefonosDTO(
Telefonos.id!,
Telefonos.nombre,
Telefonos.email
)
}

async eliminarTelefonos(id: number): Promise<void>{
await this.EliminarTelefonossUseCase.execute(id);
}

}
