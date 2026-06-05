// index.ts

// Arquitectura Hexagonal + Bun + PostgreSQL

import { db } from "./infraestructura/database/postgress";

import { UsuarioRepositoryImpl }
from "./infraestructura/adaptadores/output/postgres_sql/UsuarioRepositoryImpl";

import { UsuarioService }
from "./aplicacion/services/UsuarioService";

import { UsuarioController }
from "./infraestructura/adaptadores/input/http/UsuarioController";
import { EliminarUsuarioUseCase } from "./aplicacion/caso_uso/EliminarUsuarioUseCase"
import { ActualizarUsuarioUseCase } from
"./aplicacion/caso_uso/ActualizarUsuarioUseCase";
import { CrearUsuariosUseCase } from "./aplicacion/caso_uso/CrearUsuarioUseCase";
import { ObtenerUsuariosUseCase } from
"./aplicacion/caso_uso/ObtenerUsuarioUseCase";
import { ListarUsuariosUseCase } from
"./aplicacion/caso_uso/ListarUsuarioUseCase";
import { CreateUsuarioRequest } from "./aplicacion/dto/CreateUsuarioRequest";
import { ActualizarUsuarioRequest } from "./aplicacion/dto/ActualizarUsuarioRequest";

/*

DEPENDENCY INJECTION

*/

const usuarioRepository =
new UsuarioRepositoryImpl (db);

/*

USE CASE INSTANCES

*/

const crearUsuarioUseCase =

new CrearUsuariosUseCase (

usuarioRepository
);

const obtenerUsuarioUseCase =

new ObtenerUsuariosUseCase (

usuarioRepository

);

const listarUsuariosUseCase =

new ListarUsuariosUseCase (

usuarioRepository

);

const actualizarUsuarioUseCase =

new ActualizarUsuarioUseCase (

usuarioRepository

);

const eliminarUsuarioUseCase =

new EliminarUsuarioUseCase (

usuarioRepository

);

/*

SERVICE INSTANCE

*/



const usuarioService =

new UsuarioService (

crearUsuarioUseCase,

obtenerUsuarioUseCase,

listarUsuariosUseCase,

actualizarUsuarioUseCase,

eliminarUsuarioUseCase

);

const usuarioController =

new UsuarioController(

    usuarioService

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

            usuarios

            */

            if (pathname === "/usuarios") {

                /*

                get /usuarios

                */

                if (method === "GET") {
                    const usuarios = 
                        await usuarioController.listarUsuarios();

                    return json(usuarios);
                }

                /*

                POST /usuarios

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

                    CREAR USUARIO

                    */

                    const dtoUser = new CreateUsuarioRequest(nombre, email);
                    const usuario= 
                        await usuarioController.crearUsuario(dtoUser);

                    return json (usuario, 201);
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

            /usuarios/id

            */

            if (pathname.startsWith("/usuarios/")) {

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

                GET /usuarios/id

                */

                if(method==="GET") {
                    
                    const usuario = await usuarioController.obtenerUsuario(id);

                    if (!usuario) {

                        return json(
                        {
                            error: "usuario no encontrado",
                        },
                        400
                    );
                    }

                    return json(usuario);
                }

                /*

                PUT /usuarios/id

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

                    const dtoActualizarUsuario = new ActualizarUsuarioRequest(id, nombre, email);

                    const usuario = await usuarioController.actualizarUsuario(dtoActualizarUsuario);
                
                    return json(usuario);
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

            DELETE /usuarios/:ID

            */

            if (method === "DELETE") {

                try {
                    const usuario = await usuarioController.obtenerUsuario(id );

                if (!usuario) {
                    return json(
                        {
                            error: "usuario no encontrado",
                        },
                        404
                    );
                }

                await usuarioController.eliminarUsuario(id);

                return json ({
                    message: "usuario eliminado",
                    usuario,
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