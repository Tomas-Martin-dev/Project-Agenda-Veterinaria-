// Selectores
export const pacienteInput = document.querySelector<HTMLInputElement>('#paciente')
export const propietarioInput = document.querySelector<HTMLInputElement>('#propietario')
export const emailInput = document.querySelector<HTMLInputElement>('#email')
export const fechaInput = document.querySelector<HTMLInputElement>('#fecha')
export const sintomasInput = document.querySelector<HTMLTextAreaElement>('#sintomas')

export const formulario = document.querySelector('#formulario-cita') as HTMLFormElement
export const formularioInput = document.querySelector<HTMLInputElement>('#formulario-cita input[type="submit"]')
export const contenedorCitas = document.querySelector('#citas') as HTMLDivElement


/*
    En este codigo con las 'as' o con el formato de 'Generics <HTML...> solucionamos la "inferencia". 
    La inferencia es la posibilidad de que el valor sea null o el elemento HTML que idiquemos'

    -- 'as' le asegura a TS que el tipo de elemento html que indicamos.

    -- 'Generics' solo le informa el tipo elemento html que podria ser, pero continua con la posibilidad de un null,
        por ende cuando ocupemos la variable tendremos que usar "?" (opcional change).

*/