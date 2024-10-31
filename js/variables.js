import { agregarID } from "./funciones.js";

export let editar = {
    value: false
};

export let objPaciente = {
    id: agregarID(),
    paciente: "",
    propietario: "",
    telefono:"",
    email: "",
    fecha: "",
    sintomas: ""
}

export let DB = {
    value: ""
};