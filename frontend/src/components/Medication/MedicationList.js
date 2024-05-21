import React, { useState, useEffect } from 'react';
import { getMedications, deleteMedication } from '../../services/api';
import MedicationForm from './MedicationForm';
import '../../styles/styles.css';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    const result = await getMedications();
    setMedications(result.data);
  };

  const handleDelete = async (id) => {
    await deleteMedication(id);
    loadMedications();
  };

  return (
    <div className="container">
      <h2>Medications</h2>
      <MedicationForm refreshMedications={loadMedications} />
      <ul>
        {medications.map(medication => (
          <li key={medication.id} className="list-item">
            {medication.name} - {medication.manufacturer} - ${medication.price.toFixed(2)}
            <button onClick={() => handleDelete(medication.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationList;
