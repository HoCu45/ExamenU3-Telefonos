// DOMAIN

//DOMAIN - ENTIDAD RICA BLINDADA

export class Usuario {
    //1. CONSTRUCTOR PRIVADO: nadie desde fuera puede hacer 'new Usuario(...)'
private constructor(
    public readonly id: number| null,
    private _nombre: string,
    private _email: string
)   {}

// getters públicos de solo lectura

get nombre(): string { return this._nombre; }
get email(): string { return this._email; }

//2. Metodo de fábrica: para crear usuarios NUEVOS (Sin ID aún)

static crear(nombre: string, email: string): Usuario {
    // Validaciones estrictas en el nacimiento
    if (!email || !email.includes("@")) {
        throw new Error("El formato del email es invalido para el nuevo usuario");
    }
    if (!nombre || nombre.trim().length < 2) {
        throw new Error("El nombre debe tener al menos 2 caracteres");
    }

    //Si todo está bien, la propia clase puede invocar a su constructor privado
    return new Usuario(null, nombre.trim(), email.trim());
}

//3. Metodo de fabrica: para reconstruir usuarios que ya existen en postgreSQL
static reconstruir(id: number, nombre: string, email: string): Usuario {
    //Aqui no validamos las reglas de creación porque el dato ya es confiable ( viene de la DB)
    return new Usuario(id, nombre, email);
}

//4. comportamiento: el único punto para modificar el estado
actualizar(nombre: string, email: string): void {
    if(!email || !email.includes("@")) {
        throw new Error("Email invalido para actualización");
    }
    this._nombre = nombre.trim();
    this._email = email.trim();
}
}