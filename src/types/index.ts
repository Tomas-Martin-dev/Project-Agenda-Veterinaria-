export type Patient = {
    id: string,
    name: string,
    caretaker: string,
    date: Date,
    email: string
    symptoms: string
}

export type DraftPatient = Omit<Patient, "id">

export type PatientState = {
    patients: Patient[],
    activeId: Patient["id"],
    addPatient: (data: DraftPatient) => void,
    deletePatient: (id: Patient["id"]) => void,
    addActiveId: (id: Patient["id"]) => void,
    updatePatient: (data: DraftPatient) => void
}

export type PatientDetailsPromp = { 
    patient: Patient
}

export type PatientItemPromp = { 
    label: string,
    data: string
}