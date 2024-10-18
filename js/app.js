// Variables
const pacienteInput = document.querySelector("#paciente")
const propietarioInput = document.querySelector("#propietario")
const emailInput = document.querySelector("#email")
const fachaInput = document.querySelector("#fecha")
const sintomasInput = document.querySelector("#sintomas")
const form = document.querySelector("#formulario-cita")
const listaCitas = document.querySelector("#citas")
const sumbitInput = document.querySelector(`input[type="submit"]`)
let editar = false;
const objPaciente = {
    id: agregarID(),
    paciente: "",
    propietario: "",
    telefono:"",
    email: "",
    fecha: "",
    sintomas: ""
};

// Clases
class AdminCitas {
    constructor() {
        this.citas = []
    }

    agregarCita(infoCita) {
        this.citas = [...this.citas, infoCita]
        uii.mostarAlerta("Paciente Agregado con Exito")
        return this.citas
    }
}
const cita = new AdminCitas();

class UI {
    constructor() { };

    mostarAlerta(mensaje, tipo) {
        // creo div de la alerta
        let div = document.createElement("div");
        div.innerHTML = `${mensaje}`;
        div.classList.add("text-center", "alert", "w-full", "font-bold", "text-sm", "uppercase", "my-5", "p-3");

        // si es de tipo error agrego class red, sino defino el tipo error agrego green
        tipo == "error" ? div.classList.add("bg-red-500", "text-white") : div.classList.add("bg-green-500", "text-black-500")

        // elimino alerta previas en caso de haber

        /* if(form.previousElementSibling.classList.contains("alert")){
             let alertPrevia = form.previousElementSibling;
             alertPrevia.remove();   ESTA ES UNA FORMA DE HACERLO
         }
        */

        const alertaPrevia = document.querySelector(".alert");
        alertaPrevia?.remove(); /* si sacara el optional cheaneg "?" daria error cuando no haya una alerta previa */

        // agrego la alerta el html, se elimina depsues de 2s
        form.parentElement.insertBefore(div, form)
        setTimeout(() => {
            div.remove()
        }, 2000);
    }

    mostrarNuevaCita(nuevaCita) {

        // borro todo lo que este en el container 
        while (listaCitas.firstChild) {
            listaCitas.removeChild(listaCitas.firstChild);
        }

        // creao html y lo escribo
        nuevaCita.forEach(e => {

            const div = document.createElement('div');
            div.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl', 'p-3');

            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${e.paciente}`;

            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${e.propietario}`;

            const telefono = document.createElement('p');
            telefono.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            telefono.innerHTML = `<span class="font-bold uppercase">contacto: </span> ${e.telefono}`;

            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${e.email}`;

            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${e.fecha}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${e.sintomas}`;

            const btnE = document.createElement('button');
            btnE.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', "btn-editar");
            btnE.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            btnE.onclick = () => {  /* event handlers, esta funcion agrega los valores de la cita actual al form para editarlos */
                pacienteInput.value = e.paciente;
                propietarioInput.value = e.propietario;
                emailInput.value = e.email;
                fachaInput.value = e.fecha;
                sintomasInput.value = e.sintomas;
                document.querySelector("#telefono").value = e.telefono;
        
                Object.assign(objPaciente, e); /* objPaciente esta vacio cuando toquemos el boton editar, por ende le agremamos los datos de la cita que estamso iterando */
                editar = true; 
                sumbitInput.value = "guardar cambios";
                uii.mostarAlerta("EDITA LA CITA, LUEGO ENVIALA",);
            }
            const btnB = document.createElement('button');
            btnB.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', "btn-borrar");
            btnB.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnB.onclick = () => {
                // Elimino el html
                btnB.parentElement.parentElement.remove();

                // Elimino la cita del array cita.citas...
                cita.citas = cita.citas.filter(obj => obj.id !== e.id);

                // Actualizo el array del sessionS
                let arraySessionS = JSON.parse(localStorage.getItem("arrayCitas"));
                arraySessionS = cita.citas;
                localStorage.setItem("arrayCitas", JSON.stringify(arraySessionS));

                // alerta de cita eliminada
                uii.mostarAlerta("cita eliminada!!!")

                // Verifico si borre todas las citas para mostrar mensaje de  que no hay citas...
                if (cita.citas.length === 0) {
                    listaCitas.innerHTML = `<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`
                }
            }

            const contenedorBtns = document.createElement("div");
            contenedorBtns.classList.add('flex', 'justify-between', 'my-10');
            contenedorBtns.appendChild(btnE);
            contenedorBtns.appendChild(btnB);

            // escribo la cita
            div.appendChild(paciente);
            div.appendChild(propietario);
            div.appendChild(telefono);
            div.appendChild(email);
            div.appendChild(fecha);
            div.appendChild(sintomas);
            div.appendChild(contenedorBtns);
            listaCitas.appendChild(div);
        });

    }

    editarCita(objActualizado) {
        uii.mostarAlerta("CITA EDITDA");
        cita.citas = cita.citas.map(c => c.id == objActualizado.id ? objActualizado : c);
        this.mostrarNuevaCita(cita.citas)
    }
}
const uii = new UI();

// Funciones
function tomarValor(e) {
    objPaciente[e.target.name] = e.target.value;
}

function validaFormulario(e) {
    e.preventDefault();

    // valido si alguno indice de objPaciente esta vacio
    if (Object.values(objPaciente).some(valor => valor.trim() === "")) {
        uii.mostarAlerta("incompleto el form", "error");
        return
    }

    // si estoy editando una cita le cambio los datos sino agrego una cita nueva
    if (editar) {
        uii.editarCita({ ...objPaciente });
        
        // se guardan cambios en el session
        let arraySessionS = JSON.parse(localStorage.getItem("arrayCitas"));
        arraySessionS = cita.citas;
        localStorage.setItem("arrayCitas", JSON.stringify(arraySessionS));

        uii.mostarAlerta("CITA EDITDA");
        editar = false;
    }
    else {
        uii.mostrarNuevaCita(cita.agregarCita({ ...objPaciente })) // agregarCita devuelve el obj con los datos tomados del form, entonces mostarCita lo añade al html
        localStorage.setItem("arrayCitas", JSON.stringify(cita.citas)); /* cuando se agrega una cita agrego el array de objetos */
    }

    // reinicio el obj y el formulario
    reiniciar();
}

function reiniciar() {

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

function agregarID() {
    return Math.random().toString(36).substring(2) + Date.now()
}

// Eventos
document.addEventListener("DOMContentLoaded", ()=>{
    // Actualizo el sessionS
    let arrayS = localStorage.getItem("arrayCitas");
    arrayS = JSON.parse(arrayS);
    if (arrayS !== null) {
        uii.mostrarNuevaCita(arrayS);
        for (let i = 0; i < arrayS.length; i++) {
            cita.agregarCita(arrayS[i]);
        }
    }
    else{
        console.log("no hay datos en el session");
    }

    // Creo nuevo Input
    let div = document.createElement("div");
    div.classList.add("mb-5");
    
    let label = document.createElement("label");
    label.classList.add("block", "text-gray-700", "uppercase", "font-bold", "text-sm");
    label.innerHTML = "telefono Contacto"

    let input = document.createElement("input");
    input.classList.add("border-2", "w-full", "p-2", "mt-2", "placeholder-gray-400", "rounded-md");
    input.setAttribute("id", "telefono");
    input.setAttribute("id", "telefono");
    input.setAttribute("type", "number");
    input.setAttribute("placeholder", "3624-889900");
    input.setAttribute("name", "telefono");

    div.appendChild(label)
    div.appendChild(input)
    form.insertBefore(div, form.children[3]);

    input.addEventListener("change", tomarValor);
})
pacienteInput.addEventListener("change", tomarValor);
propietarioInput.addEventListener("change", tomarValor);
emailInput.addEventListener("change", tomarValor);
fachaInput.addEventListener("change", tomarValor);
sintomasInput.addEventListener("change", tomarValor);
form.addEventListener("submit", validaFormulario);




