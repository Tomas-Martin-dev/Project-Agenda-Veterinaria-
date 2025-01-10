import Notificacion from './classes/Notificacion';
import AdminCitas from './classes/AdminCitas';
import { citaObj, editando } from './variables'
import { formulario, formularioInput, pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput } from './selectores'
import { Cita } from './types';

const citas = new AdminCitas()
export function datosCita(e: Event) {
    const target = e.target as HTMLInputElement /* aclaramos que el target viene a ser el input que viene por el evento llamado, eso aclara que existe el valor "value" */
    citaObj[target.name] = target.value
}

export function submitCita(e: SubmitEvent) {
    e.preventDefault();
    
    if( Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        return
    }

    if(editando.value) {
        citas.editar({...citaObj})
        new Notificacion({
            texto: 'Guardado Correctamente',
            tipo: 'exito'
        })
    } else {
        citas.agregar({...citaObj})
        new Notificacion({
            texto: 'Paciente Registrado',
            tipo: 'exito'
        })
    }    
    formulario.reset()
    reiniciarObjetoCita()
    formularioInput ? formularioInput.value = 'Registrar Paciente' : null  //SI formularioInput existe hace le da value, en caso contrario nada. 
    editando.value = false
}


export function reiniciarObjetoCita() {

    Object.assign(citaObj, {
        id: generarId(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    })
}

export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now()
}

export function cargarEdicion(cita: Cita) {
    Object.assign(citaObj, cita)

   pacienteInput ? pacienteInput.value = cita.paciente : null
   propietarioInput ? propietarioInput.value = cita.propietario : null
   emailInput ? emailInput.value = cita.email : null
   fechaInput ? fechaInput.value = cita.fecha : null
   sintomasInput ? sintomasInput.value = cita.sintomas : null

    editando.value = true

    formularioInput? formularioInput.value = 'Guardar Cambios' : null //este tipo de errores se pueden solucionar en "selectores con un 'as' "
}