import { listaCitas, pacienteInput, propietarioInput, fechaInput, emailInput, sintomasInput, sumbitInput } from "../selectores.js";
import { editar, objPaciente } from "../variables.js";
import UI from "./UI.js";

const uii = new UI();
export default class AdminCitas {
    constructor() {
        this.citas = []
    }

    agregarCita(infoCita) {
        this.citas = [...this.citas, infoCita]
        this.mostrarNuevaCita()
        return this.citas
    }

    mostrarNuevaCita() {

        // borro todo lo que este en el container 
        while (listaCitas.firstChild) {
            listaCitas.removeChild(listaCitas.firstChild);
        }
        /*nuevaCita viene como array asi q lo itero */
        this.citas.forEach(e => {
            // creao html y lo escribo
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
                fechaInput.value = e.fecha;
                sintomasInput.value = e.sintomas;
                document.querySelector("#telefono").value = e.telefono;

                const copiaCita = {...e};
                console.log(copiaCita);
                Object.assign(objPaciente, copiaCita); /* objPaciente esta vacio cuando toquemos el boton editar, por ende le agremamos los datos de la cita que estamso iterando */
                editar.value = true; 
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
                this.citas = this.citas.filter(obj => obj.id !== e.id);

                // Actualizo el array del sessionS
                let arraySessionS = JSON.parse(sessionStorage.getItem("arrayCitas"));
                arraySessionS = this.citas;
                sessionStorage.setItem("arrayCitas", JSON.stringify(arraySessionS));

                // alerta de cita eliminada
                uii.mostarAlerta("cita eliminada!!!")

                // Verifico si borre todas las citas para mostrar mensaje de  que no hay citas...
                if (this.citas.length === 0) {
                    listaCitas.innerHTML = `<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`
                }
                console.log(this.citas);
                
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

    MostrarCitaEditada(objActualizado) {
        this.citas = this.citas.map(c => c.id == objActualizado.id ? objActualizado : c);
        this.mostrarNuevaCita();
    }
}