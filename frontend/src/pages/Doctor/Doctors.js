import React from 'react';
import './Doctors.css';

const Doctor = ({ doctor, onUpdate, onDelete }) => {
  const { _id, doctorName, doctorPhone, doctorEmail, specialization, experienceYears, available } = doctor;

  return (
    <tr>
      <td>{doctorName}</td>
      <td>{doctorPhone}</td>
      <td>{doctorEmail}</td>
      <td>{specialization}</td>
      <td>{experienceYears}</td>
      <td>{available ? "Yes" : "No"}</td>
      <td>
        <div className="button-container">
          <div className="btnStf">
            <button className="updatebtn" onClick={onUpdate}>Update</button>
          </div>
          <div className="btnStf">
            <button className="deletebtn" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Doctor;



