import { tomarValor, validaFormulario, actualizarCitas } from "./funciones.js";
import { pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput, form } from "./selectores.js";
import AdminCitas from "./class/AdminCitas.js";

const cita = new AdminCitas();
// Eventos
document.addEventListener("DOMContentLoaded", ()=>{

    actualizarCitas(); /* tuve que moverl el codigo a una funcion porque en este archivo cita.citas se actualizaba pero en el archivo funciones.js no aparecian las citas agregas desde aca  */
    
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
fechaInput.addEventListener("change", tomarValor);
sintomasInput.addEventListener("change", tomarValor);
form.addEventListener("submit", validaFormulario);




