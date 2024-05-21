import React, { useState, useEffect } from 'react';
import { getPharmacies, deletePharmacy } from '../../services/api';
import PharmacyForm from './PharmacyForm';
import '../../styles/styles.css';

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

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

  const handleEdit = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  return (
    <div className="container">
      <h2>Pharmacies</h2>
      <PharmacyForm refreshPharmacies={loadPharmacies} pharmacy={selectedPharmacy} />
      <ul>
        {pharmacies.map(pharmacy => (
          <li key={pharmacy.id} className="list-item">
            {pharmacy.name} - {pharmacy.address}
            <div>
              <button onClick={() => handleEdit(pharmacy)}>Edit</button>
              <button onClick={() => handleDelete(pharmacy.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacyList;
