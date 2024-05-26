import React, { useState, useEffect } from 'react';
import { getDoctors, deleteDoctor } from '../../services/api';
import DoctorForm from './DoctorForm';
import '../../styles/styles.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
    <div className="container">
      <h2>Doctors</h2>
      <DoctorForm refreshDoctors={loadDoctors} doctor={selectedDoctor} />
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id} className="list-item">
            {doctor.firstName} {doctor.lastName} - {doctor.specialty}
            <div>
              <button onClick={() => handleDelete(doctor.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
