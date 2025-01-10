export interface Cita {
    [key: string] : string /* <= "index signature": en TypeScript permite definir un tipo o interfaz donde las propiedades son dinámicas, con claves de un tipo específico (como string o number) y valores de un tipo determinado*/
    id: string;
    paciente: string;
    propietario: string;
    email: string;
    fecha: string;
    sintomas: string
}


// Crear un archivo de types para los types o interfaces que se ocupen en  mas de un archivo, 
// en los casos donde se ocupe en uno solo archivo: declarlos donde lo ocupemos