import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorList from './components/Doctor/DoctorList';
import PharmacistList from './components/Pharmacist/PharmacistList';
import PharmacyList from './components/Pharmacy/PharmacyList';
import MedicationList from './components/Medication/MedicationList';
import HomePage from './components/Home';
import './styles/styles.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/pharmacists" element={<PharmacistList />} />
        <Route path="/pharmacies" element={<PharmacyList />} />
        <Route path="/medications" element={<MedicationList />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
