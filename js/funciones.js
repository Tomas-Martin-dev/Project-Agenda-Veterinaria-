import { sumbitInput, form } from "./selectores.js";
import { editar, objPaciente } from "./variables.js";
import  UI  from "./class/UI.js";
import  AdminCitas  from "./class/AdminCitas.js";

const uii =  new UI();
const cita =  new AdminCitas();


export function tomarValor(e) {
    objPaciente[e.target.name] = e.target.value;
}

export function validaFormulario(e) {
    e.preventDefault();
    
    // valido si alguno indice de objPaciente esta vacio
    if (Object.values(objPaciente).some(valor => valor.trim() === "")) {
        uii.mostarAlerta("incompleto el form", "error");
        return
    }

    // si estoy editando una cita le cambio los datos sino agrego una cita nueva
    if (editar.value) {
        cita.MostrarCitaEditada({ ...objPaciente });
        
        // se guardan cambios en el session
        let arraySessionS = JSON.parse(sessionStorage.getItem("arrayCitas"));
        arraySessionS = cita.citas;
        sessionStorage.setItem("arrayCitas", JSON.stringify(arraySessionS));

        uii.mostarAlerta("CITA EDITDA");
    }
    else {
        cita.agregarCita({ ...objPaciente })
        sessionStorage.setItem("arrayCitas", JSON.stringify(cita.citas)); /* cuando se agrega una cita agrego el array de objetos */
        uii.mostarAlerta("¡paciente Agregado!");
    }

    // reinicio el obj y el formulario
    reiniciar();
    editar.value = false;
}

export function reiniciar() {

    // elimino los valores del obj y agrego un id nuevo para la siguiente cita
    Object.assign(objPaciente, {
        id: agregarID(),
        paciente: "",
        propietario: "",
        telefono:"",
        email: "",
        fecha: "",
        sintomas: ""
    })

    // reinicio el formulario
    form.reset();

    // vuelve el value original de el button submit
    sumbitInput.value = "Registrar paciente";
}

export function agregarID() {
    return Math.random().toString(36).substring(2) + Date.now()
}

export function actualizarCitas(){
    let arrayS = sessionStorage.getItem("arrayCitas");
    arrayS = JSON.parse(arrayS);
    
    if (arrayS !== null) {
        for (let index = 0; index < arrayS.length; index++) {
            cita.agregarCita(arrayS[index]);
        }
    }
    else{
        console.log("no hay datos en el session");
    }
}