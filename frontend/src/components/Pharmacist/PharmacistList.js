import React, { useState, useEffect } from 'react';
import { getPharmacists, deletePharmacist } from '../../services/api';
import PharmacistForm from './PharmacistForm';
import '../../styles/styles.css';

const PharmacistList = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [filteredPharmacists, setFilteredPharmacists] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);

  useEffect(() => {
    loadPharmacists();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredPharmacists(
        pharmacists.filter(pharmacist =>
          `${pharmacist.FirstName} ${pharmacist.LastName}`.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredPharmacists(pharmacists);
    }
  }, [filter, pharmacists]);

  const loadPharmacists = async () => {
    const result = await getPharmacists();
    setPharmacists(result.data);
    setFilteredPharmacists(result.data);
  };

  const handleDelete = async (id) => {
    await deletePharmacist(id);
    loadPharmacists();
  };

  return (
    <div className="container">
      <h2>Pharmacists</h2>
      <PharmacistForm refreshPharmacists={loadPharmacists} pharmacist={selectedPharmacist} />
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredPharmacists.map(pharmacist => (
          <li key={pharmacist.id} className="list-item">
            {pharmacist.FirstName} {pharmacist.LastName}
            <div>
              <button onClick={() => handleDelete(pharmacist.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacistList;
