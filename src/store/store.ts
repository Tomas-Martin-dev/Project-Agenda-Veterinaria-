import { create } from "zustand"
import { DraftPatient, Patient, PatientState } from "../types"
import { v4 as uuid } from "uuid";
import { devtools, persist } from "zustand/middleware";


const createPatient = (patient: DraftPatient) : Patient => {
    return { ...patient, id: uuid()}
}

export const usePatientStore = create<PatientState>()
    (devtools(
        persist((set) => ({
        patients: [],

        activeId: "",

        addPatient: (data) => {
            const newPat = createPatient(data)
            set((state)=> ({
                patients: [...state.patients, newPat ]
            }))
        },

        deletePatient: (id) => {  
            set((state)=>({
                patients: state.patients.filter(pat => pat.id !== id)
            }))
        },

        addActiveId: (id) => {
            set(()=>({
                activeId: id 
            }))
        },

        updatePatient: (data)=>{ 
            set((state)=> ({
                patients: state.patients.map( pat => pat.id === state.activeId ? {id: pat.id, ...data} : pat),
                activeId: ""
            }))
        }
    }), {
        name: "patient-storage"
    })
))