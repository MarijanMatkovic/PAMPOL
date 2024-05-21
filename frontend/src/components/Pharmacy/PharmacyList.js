import React, { useState, useEffect } from 'react';
import { getPharmacies, deletePharmacy } from '../../services/api';
import PharmacyForm from './PharmacyForm';
import '../../styles/styles.css'; // Ensure this import is correct based on your project structure

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    loadPharmacies();
  }, []);

  const loadPharmacies = async () => {
    const result = await getPharmacies();
    setPharmacies(result.data);
  };

  const handleDelete = async (id) => {
    await deletePharmacy(id);
    loadPharmacies();
  };

  return (
    <div className="container">
      <h2>Pharmacies</h2>
      <PharmacyForm refreshPharmacies={loadPharmacies} />
      <ul>
        {pharmacies.map(pharmacy => (
          <li key={pharmacy.id} className="list-item">
            {pharmacy.name} - {pharmacy.address}
            <button onClick={() => handleDelete(pharmacy.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacyList;
