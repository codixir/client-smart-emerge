import React from 'react';
import './Patient.css';

const Patient = ({patient, onEdit, onDelete}) => {
    return (
        <tr className="patient-row" key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td>{patient.email}</td>
            <td className="phone-cell">
                <span>{patient.phone} </span>
                <button className="btn btn-primary">
                    <i class="fas fa-sms"></i>
                </button>
            </td>
            <td className="actions-cell">
                <button type="button" className="btn btn-warning" onClick={() => onEdit(patient)}>
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button type="button" className="btn btn-danger" onClick={() => onDelete(patient)}>
                    <i class="far fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    )
}

export default Patient;