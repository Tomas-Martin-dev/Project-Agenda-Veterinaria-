import { form } from "../selectores.js";


export default class UI {
    constructor() { };

    mostarAlerta(mensaje, tipo) {
        // creo div de la alerta
        let div = document.createElement("div");
        div.innerHTML = `${mensaje}`;
        div.classList.add("text-center", "alert", "w-full", "font-bold", "text-sm", "uppercase", "my-5", "p-3");

        // si es de tipo error agrego class red, sino defino el tipo error agrego green
        tipo == "error" ? div.classList.add("bg-red-500", "text-white") : div.classList.add("bg-green-500", "text-black-500")

        // elimino alerta previas en caso de haber
        const alertaPrevia = document.querySelector(".alert");
        alertaPrevia?.remove(); /* si sacara el optional cheaneg "?" daria error cuando no haya una alerta previa */

        // agrego la alerta el html, se elimina depsues de 2s
        form.parentElement.insertBefore(div, form)
        setTimeout(() => {
            div.remove()
        }, 2000);
    }
}