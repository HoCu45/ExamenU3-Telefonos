//INPUT PORT 
//ELIMINAR Telefonos

export interface IEliminarTelefonosUseCase {

    execute(
        id:number
    ): Promise<void>;
}