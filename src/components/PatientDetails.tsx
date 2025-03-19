import { usePatientStore } from "../store/store";
import { PatientDetailsPromp } from "../types";
import PatientItem from "./PatientItem";
import { toast } from 'react-toastify';

export default function PatientDetails({patient} : PatientDetailsPromp) {
    const { deletePatient, addActiveId } = usePatientStore()
    const handleDelete = ()=>{
        deletePatient(patient.id) 
        toast.error("Paciente Eliminado")
    }

    return (
    <>
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientItem label="ID" data={patient.id} />
            <PatientItem label="Nombre" data={patient.name} />
            <PatientItem label="Dueño" data={patient.caretaker} />
            <PatientItem label="email" data={patient.email} />
            <PatientItem label="alta" data={patient.date.toString()} />
            <PatientItem label="sintomas" data={patient.symptoms} />
            
            <div className="flex justify-between gap-1 mt-10">
                <button 
                    className="py-2 w-full max-w-5/12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg transition-colors cursor-pointer"
                    onClick={()=> addActiveId(patient.id)}
                >Editar
                </button>
                
                <button 
                    className="py-2 w-full max-w-5/12 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg transition-colors cursor-pointer"
                    onClick={handleDelete}
                >Eliminar
                </button>
            </div>
        </div>
    </>
)
}
