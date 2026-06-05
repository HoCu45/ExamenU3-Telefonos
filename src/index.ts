// index.ts

// Arquitectura Hexagonal + Bun + PostgreSQL

import { db } from "./infraestructura/database/postgress";

import { TelefonosRepositoryImpl }
from "./infraestructura/adaptadores/output/postgres_sql/TelefonosRepositoryImpl";

import { TelefonosService }
from "./aplicacion/services/TelefonosService";

import { TelefonosController }
from "./infraestructura/adaptadores/input/http/TelefonosController";
import { EliminarTelefonosUseCase } from "./aplicacion/caso_uso/EliminarTelefonosUseCase"
import { ActualizarTelefonosUseCase } from
"./aplicacion/caso_uso/ActualizarTelefonosUseCase";
import { CrearTelefonossUseCase } from "./aplicacion/caso_uso/CrearTelefonosUseCase";
import { ObtenerTelefonossUseCase } from
"./aplicacion/caso_uso/ObtenerTelefonosUseCase";
import { ListarTelefonossUseCase } from
"./aplicacion/caso_uso/ListarTelefonosUseCase";
import { CreateTelefonosRequest } from "./aplicacion/dto/CreateTelefonosRequest";
import { ActualizarTelefonosRequest } from "./aplicacion/dto/ActualizarTelefonosRequest";

/*

DEPENDENCY INJECTION

*/

const TelefonosRepository =
new TelefonosRepositoryImpl (db);

/*

USE CASE INSTANCES

*/

const crearTelefonosUseCase =

new CrearTelefonossUseCase (

TelefonosRepository
);

const obtenerTelefonosUseCase =

new ObtenerTelefonossUseCase (

TelefonosRepository

);

const listarTelefonossUseCase =

new ListarTelefonossUseCase (

TelefonosRepository

);

const actualizarTelefonosUseCase =

new ActualizarTelefonosUseCase (

TelefonosRepository

);

const eliminarTelefonosUseCase =

new EliminarTelefonosUseCase (

TelefonosRepository

);

/*

SERVICE INSTANCE

*/



const TelefonossService =

new TelefonosService (

crearTelefonosUseCase,

obtenerTelefonosUseCase,

listarTelefonossUseCase,

actualizarTelefonosUseCase,

eliminarTelefonosUseCase

);

const TelefonossController =

new TelefonosController(

    TelefonossService

);

/*

HELPER JSON RESPONSE

*/

function json (data: unknown, status = 200) : Response {

return new Response (

JSON. stringify (data, null, 2),

{

status,

headers: {

"Content-Type": "application/json",
        },
    }
)
};


/*

SERVIDOR

*/

const server = Bun.serve({

    port:3000,
    
    async fetch(req) {

        try {

            /*
            REQUEST INFO
            */

            const url = new URL(req.url);

            const pathname = url.pathname;

            const method = req.method;

            console.log (`\n${method} ${pathname}`);

            /*

            Telefonoss

            */

            if (pathname === "/Telefonoss") {

                /*

                get /Telefonoss

                */

                if (method === "GET") {
                    const Telefonoss = 
                        await TelefonossController.listarTelefonos();

                    return json(Telefonoss);
                }

                /*

                POST /Telefonoss

                */

                if (method === "POST") {

                    const body = await req.json() as {
                           nombre?: string;
                           email?: string;
                        };

                    const nombre = body.nombre?.trim();

                    const email = body.email?.trim();

                    /*

                    VALIDACIONES

                    */

                    if (!nombre || !email) {
                        return json(
                            {
                                error: "nombre y email son obligatorios",
                            },
                            400

                        );
                    }

                    /*

                    CREAR Telefonos

                    */

                    const dtoUser = new CreateTelefonosRequest(nombre, email);
                    const Telefonos= 
                        await TelefonossController.crearTelefonos(dtoUser);

                    return json (Telefonos, 201);
                }

                /*

                método no permitido

                */

                return json(
                    {
                        error: "method not allowed",
                    },
                    405
                );
            }

            /*

            /Telefonoss/id

            */

            if (pathname.startsWith("/Telefonoss/")) {

                /*

                obtener ID

                */

                const idStr = pathname.split("/")[2];

                const id = Number(idStr);

                /*Validad ID

                */

                if (!Number.isInteger(id) || id<= 0) {

                    return json (
                        {
                            error: "ID inválida",
                        },
                        400
                    );
                }
                /*

                GET /Telefonoss/id

                */

                if(method==="GET") {
                    
                    const Telefonos = await TelefonossController.obtenerTelefonos(id);

                    if (!Telefonos) {

                        return json(
                        {
                            error: "Telefonos no encontrado",
                        },
                        400
                    );
                    }

                    return json(Telefonos);
                }

                /*

                PUT /Telefonoss/id

                */

            if (method == "PUT") {

                const body = await req.json() as {

                    nombre?: string;
                    email?: string;
                    };

                const nombre = body.nombre?.trim();

                const email = body.email?.trim();

                /*

                VALIDACIONES

                */

                if (!nombre || !email) {

                    return json (
                        {
                            error: "nombre y email son obligatorios",
                        },
                        400
                    );
                }

                try {

                    const dtoActualizarTelefonos = new ActualizarTelefonosRequest(id, nombre, email);

                    const Telefonos = await TelefonossController.actualizarTelefonos(dtoActualizarTelefonos);
                
                    return json(Telefonos);
                } catch (error: any) {

                    return json (
                        {
                            error: error.message,
                        },
                        404
                    );
                }
            }

            /*

            DELETE /Telefonoss/:ID

            */

            if (method === "DELETE") {

                try {
                    const Telefonos = await TelefonossController.obtenerTelefonos(id );

                if (!Telefonos) {
                    return json(
                        {
                            error: "Telefonos no encontrado",
                        },
                        404
                    );
                }

                await TelefonossController.eliminarTelefonos(id);

                return json ({
                    message: "Telefonos eliminado",
                    Telefonos,
                });

                } catch (error: any) {

                    return json(
                        {
                            error: error.message,
                        },
                        500
                    );
                }
            }

            /*

            METODO NO PERMITIDO

            */

            return json (
                {
                    error: "method not allowed",
                },
                405
            );
            }
            /*

            RUTA NO ENCONTRADA

            */

            return json (
                {
                    error: "Ruta no encontrada",
                },
                404
            );

        } catch (error) {

            /*

            error interno

            */

            console.error("\n ERROR INTERNO");

            console.error(error);

            return json (
                {
                    error: "internal server error",
                },
                500
            );
        }


    },



});