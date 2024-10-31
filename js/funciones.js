import { sumbitInput, form } from "./selectores.js";
import { editar, objPaciente, DB } from "./variables.js";
import UI from "./class/UI.js";
import AdminCitas from "./class/AdminCitas.js";

const uii = new UI();
const cita = new AdminCitas();
var transComplete;

export function tomarValor(e) {
    objPaciente[e.target.name] = e.target.value;
}

export function validaFormulario(e) {
    console.log(editar.value);
    e.preventDefault();

    // valido si alguno indice de objPaciente esta vacio
    if (Object.values(objPaciente).some(valor => valor.trim() === "")) {
        uii.mostarAlerta("incompleto el form", "error");
        return
    }

    // si estoy editando una cita le cambio los datos sino agrego una cita nueva
    if (editar.value) {
        editarDB();
    }
    else {
        guardarClienteDB(objPaciente); /* agrego el html si la transacction se cumple */
    }
}

export function reiniciar() {

    // elimino los valores del obj y agrego un id nuevo para la siguiente cita
    Object.assign(objPaciente, {
        id: agregarID(),
        paciente: "",
        propietario: "",
        telefono: "",
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

export function crearDB() {
    const creardb = window.indexedDB.open("citasV", 1);

    creardb.onerror = function () {
        console.log("hubo un error al crear la base");
    }

    creardb.onsuccess = function () {
        console.log("se crea la datebase");
        DB.value = creardb.result;
    }

    creardb.onupgradeneeded = function (e) {
        const db = e.target.result;
        const objStore = db.createObjectStore("citasV", { keyPath: "id", autoIncrement: true });
        objStore.createIndex("id", "id", { unique: true });
        objStore.createIndex("paciente", "paciente", { unique: false });
        objStore.createIndex("propietario", "propietario", { unique: false });
        objStore.createIndex("telefono", "telefono", { unique: false });
        objStore.createIndex("email", "email", { unique: true });
        objStore.createIndex("fecha", "fecha", { unique: false });
        objStore.createIndex("sintomas", "sintomas", { unique: false });
    }
}

export function iterarDB() {
    const abrirConexion = window.indexedDB.open("citasV", 1)

    abrirConexion.onerror = () => {
        console.log("error al abrir la dateBase");
    }

    abrirConexion.onsuccess = () => {
        DB.value = abrirConexion.result;

        // creo objStore para iterarlo y guardar la info 
        const objStore = DB.value.transaction("citasV").objectStore("citasV");
        objStore.openCursor().onsuccess = (e) => {
            const cursor = e.target.result; /* constante que en su propiedad value estan los datos del pacientes alamcenado  */
            if (cursor) {
                cita.agregarCita(cursor.value); /* le paso el obj y crea el html con los datos */
                cursor.continue(); /* openCursos itera los datos de DB y continue() indica que vaya al siguiente elemento */
            }
        }
    }
}

export function borrarCitaDB(idElement){
    const transaction = DB.value.transaction(["citasV"], "readwrite");
    const objStore = transaction.objectStore("citasV");
    const id = Number(idElement);
    
    objStore.delete(idElement);
    transaction.onerror = function(e) {
        console.log("error al borrar de database", e);
    }
    transaction.oncomplete = function() {
        console.log("se borro el registro");
    }

    
}

function guardarClienteDB(cliente) {

    const transaction = DB.value.transaction(["citasV"], "readwrite");
    const objStore = transaction.objectStore("citasV");
    objStore.add(cliente);

    transaction.onerror = (e) => {
        console.log("hubo en error al agregar el paciente");
        uii.mostarAlerta("Existe un registro con un mismo correo registrado", "error");
    }
    transaction.oncomplete = (e) => {
        console.log("se agrego el paciente");
        cita.agregarCita({ ...objPaciente })
        reiniciar();
        uii.mostarAlerta("Se agrego el paciente");
    }
}

function editarDB() {
    const transaction = DB.value.transaction(["citasV"], "readwrite");
    const objStore = transaction.objectStore("citasV");
    objStore.put(objPaciente);

    transaction.onerror = function (e) {
        console.log("error al editar.. posible campos identicos", e);
        uii.mostarAlerta("¡Error! El email concide con un paciente ya registrado", "error");
    }

    transaction.oncomplete = function () {
        console.log("se completo la edicion");
        cita.MostrarCitaEditada({ ...objPaciente });
        uii.mostarAlerta("CITA EDITDA");
        reiniciar();
        editar.value = false;
    }
}
