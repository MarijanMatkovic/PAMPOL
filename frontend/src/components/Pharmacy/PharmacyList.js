import React, { useState, useEffect } from 'react';
import { getPharmacies, deletePharmacy, getDoctors, getPharmacists, getMedications } from '../../services/api';
import PharmacyForm from './PharmacyForm';
import '../../styles/styles.css';

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [relatedData, setRelatedData] = useState({
    doctors: [],
    pharmacists: [],
    medications: []
  });

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
    loadRelatedData(pharmacy.id);
  };

  const loadRelatedData = async (pharmacyId) => {
    const [doctors, pharmacists, medications] = await Promise.all([
      getDoctors(),
      getPharmacists(),
      getMedications()
    ]);

    setRelatedData({
      doctors: doctors.data.filter(doctor => doctor.pharmacyIds.includes(pharmacyId)),
      pharmacists: pharmacists.data.filter(pharmacist => pharmacist.pharmacyId === pharmacyId),
      medications: medications.data.filter(medication => medication.pharmacyIds.includes(pharmacyId))
    });
  };

  return (
    <div className="container">
      <h2>Pharmacies</h2>
      <PharmacyForm refreshPharmacies={loadPharmacies} pharmacy={selectedPharmacy} />
      <ul>
        {pharmacies.map(pharmacy => (
          <li key={pharmacy.id} className="list-item">
            <div>
              <strong>{pharmacy.name}</strong> - {pharmacy.address}
              <button onClick={() => handleEdit(pharmacy)}>Details</button>
              <button onClick={() => handleDelete(pharmacy.id)}>Delete</button>
            </div>
            {selectedPharmacy && selectedPharmacy.id === pharmacy.id && (
              <div className="details">
                <h3>Details for {pharmacy.name}</h3>
                <p><strong>Address:</strong> {pharmacy.address}</p>
                <h4>Doctors</h4>
                <ul>
                  {relatedData.doctors.map(doctor => (
                    <li key={doctor.id}>
                      {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                    </li>
                  ))}
                </ul>
                <h4>Pharmacists</h4>
                <ul>
                  {relatedData.pharmacists.map(pharmacist => (
                    <li key={pharmacist.id}>
                      {pharmacist.firstName} {pharmacist.lastName}
                    </li>
                  ))}
                </ul>
                <h4>Medications</h4>
                <ul>
                  {relatedData.medications.map(medication => (
                    <li key={medication.id}>
                      {medication.name} - {medication.manufacturer} - ${medication.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacyList;
