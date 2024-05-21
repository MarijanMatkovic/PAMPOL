import React, { useState, useEffect } from 'react';
import { getDoctors, deleteDoctor } from '../../services/api';
import DoctorForm from './DoctorForm';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const result = await getDoctors();
    setDoctors(result.data);
  };

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    loadDoctors();
  };

  return (
    <div>
      <h2>Doctors</h2>
      <DoctorForm refreshDoctors={loadDoctors} />
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>
            {doctor.FirstName} {doctor.LastName} - {doctor.specialty}
            <button onClick={() => handleDelete(doctor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
