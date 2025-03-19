import { useForm } from "react-hook-form"
import ErrosForm from "./ErrosForm"
import { DraftPatient } from "../types"
import { usePatientStore } from "../store/store"
import { useEffect } from "react"
import { toast } from 'react-toastify';

export default function PatientForm() {
  
    const {register, handleSubmit, setValue, formState: {errors}, reset} = useForm<DraftPatient>()
    const {addPatient, activeId, patients, updatePatient} = usePatientStore()
    // const addPatient  = usePatientStore(state => state.addPatient) otra forma de extrer la funcion con zustand

    const registerPatient = (data : DraftPatient)=>{
        if (activeId) {
            updatePatient(data)     
            toast.info(`Paciente "${data.name}" Actualizado`)    
        }else{
            addPatient(data);
            toast.success("Paciente Guardado")    
        }
        reset()    
    }

    useEffect(()=>{
        if (activeId) {
            const patientActive = patients.filter( pat => pat.id === activeId)[0];
            setValue("name",patientActive.name);
            setValue("caretaker",patientActive.caretaker);
            setValue("email",patientActive.email);
            setValue("date",patientActive.date);
            setValue("symptoms",patientActive.symptoms);
        }
    },[activeId])

    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register("name",{
                            required:"Campo Obligatorio",
                            maxLength: {
                                value: 20,
                                message: "Maximo 8 Caracteres"
                            },
                            minLength:{
                                value: 3,
                                message: "Minimo 3 Caracteres"
                            }
                        })}
                    />
                    {errors.name && (
                        <ErrosForm>
                            {errors.name?.message?.toString()}
                        </ErrosForm>
                    )}
                </div>
  
                <div className="mb-5">
                  <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                      Propietario 
                  </label>
                  <input  
                      id="caretaker"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Propietario" 
                      {...register("caretaker",{
                        required:"Campo Obligatorio",
                        maxLength: {
                            value: 20,
                            message: "Maximo 8 Caracteres"
                        },
                        minLength:{
                            value: 3,
                            message: "Minimo 3 Caracteres"
                        }
                    })}
                  />
                    {errors.caretaker && (
                        <ErrosForm>
                            {errors.caretaker?.message?.toString()}
                        </ErrosForm>
                    )}
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email de Registro"
                    {...register("email", {
                        required: "Email Obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email No Válido'
                        }
                    })} 
                />
                {errors.email && (
                    <ErrosForm>
                        {errors.email?.message?.toString()}
                    </ErrosForm>
                )}
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha Alta 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date"
                      {...register("date",{
                        required:"Fecha Obligatoria"
                    })}  
                  />
                {errors.date && (
                    <ErrosForm>
                        {errors.date?.message?.toString()}
                    </ErrosForm>
                )}
              </div>
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                  Síntomas 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente" 
                      {...register("symptoms",{
                        required:"Sintomas Obligatorio"
                    })} 
                  ></textarea>
                {errors.symptoms && (
                    <ErrosForm>
                        {errors.symptoms?.message?.toString()}
                    </ErrosForm>
                )}
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value={activeId ? "Actualizar Paciente" : "Guardar Paciente"}
              />
          </form> 
      </div>
    )
  }