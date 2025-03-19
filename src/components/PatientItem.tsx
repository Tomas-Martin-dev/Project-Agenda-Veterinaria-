import { PatientItemPromp } from "../types";

export default function PatientItem({label, data} : PatientItemPromp) {
  return (
    <p className="font-bold mb-3 text-gray-700 uppercase">{label}: {""}
        <span className="font-normal normal-case">{data}</span>
    </p>
  )
}
