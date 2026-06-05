//ITelefonosUse Case

import { Telefonos } from "../../../dominio/entities/Telefonos";

export interface ITelefonosRepositoryPort {
    save(Telefonos: Telefonos): Promise<Telefonos>;

    findById(id: number): Promise<Telefonos | null>;

    findAll(): Promise<Telefonos[]>;

    deleteById(id: number): Promise<void>;

    existsByEmail(email: string): Promise<boolean>;
}