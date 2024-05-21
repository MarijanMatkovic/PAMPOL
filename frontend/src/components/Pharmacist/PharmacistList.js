import React, { useState, useEffect } from 'react';
import { getPharmacists, deletePharmacist } from '../../services/api';
import PharmacistForm from './PharmacistForm';
import '../../styles/styles.css';

const PharmacistList = () => {
  const [pharmacists, setPharmacists] = useState([]);

  useEffect(() => {
    loadPharmacists();
  }, []);

  const loadPharmacists = async () => {
    const result = await getPharmacists();
    setPharmacists(result.data);
  };

  const handleDelete = async (id) => {
    await deletePharmacist(id);
    loadPharmacists();
  };

  return (
    <div className="container">
      <h2>Pharmacists</h2>
      <PharmacistForm refreshPharmacists={loadPharmacists} />
      <ul>
        {pharmacists.map(pharmacist => (
          <li key={pharmacist.id} className="list-item">
            {pharmacist.FirstName} {pharmacist.LastName}
            <button onClick={() => handleDelete(pharmacist.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacistList;
