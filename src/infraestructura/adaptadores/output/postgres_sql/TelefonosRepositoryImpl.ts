//ADAPTER OUT - REPOSITORY

import { Pool } from "pg";

import type { ITelefonosRepositoryPort } from "../../../../aplicacion/ports/output/ITelefonosRepositoryPort";
import { Telefonos } from "../../../../dominio/entities/Telefonos";

export class TelefonosRepositoryImpl implements ITelefonosRepositoryPort {
    constructor(
        private db:Pool
    ){}

    private reconstruirTelefonos(row:any): Telefonos{

        return Telefonos.reconstruir(
            row.id,
            row.nombre,
            row.email
        );
    }
    async save (Telefonos: Telefonos): Promise<Telefonos> {
        if (Telefonos.id === null) {
           const result = await this.db.query(
             `
            INSERT INTO Telefonos(nombre, email)
            VALUES($1, $2)
            RETURNING *
             `,
            [Telefonos.nombre, Telefonos.email]
            );

            const row = result.rows[0];

            return this.reconstruirTelefonos(row);
        }

        const result = await this.db.query(
            `
            UPDATE Telefonos
            SET nombre = $1,
                email = $2
            WHERE id = $3
            RETURNING *
            `,
            [
                Telefonos.nombre,
                Telefonos.email,
                Telefonos.id
            ]
        );

        const row = result.rows[0];

        return this.reconstruirTelefonos(row);
    }

    async findById(id: number): Promise<Telefonos | null> {
         const result = await this.db.query(
            `
            SELECT *
            FROM Telefonos
            WHERE id = $1
            `,
            [id]
         );

         if (result.rows.length === 0) {
            return null;
         }

         const row = result.rows[0];

         return this.reconstruirTelefonos(row);
    }

    async findAll(): Promise<Telefonos[]> {
        const result = await this.db.query(
            `
            SELECT *
            FROM Telefonos
            `
        );

        return result.rows.map(
            row => this.reconstruirTelefonos(row)
        );
    }

    async deleteById(id: number): Promise<void> {
        await this.db.query(
            `
            DELETE FROM Telefonos
            WHERE id = $1
            `,
            [id]
        );
    }

    async existsByEmail(email: string): Promise<boolean> {
        const result = await this.db.query(
            `
            SELECT EXISTs (
                SELECT 1
                FROM Telefonos
                WHERE email = $1
            )
            `,
            [email]
        );

        return result.rows[0].exists;
    }
}