import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoctorList from './components/Doctor/DoctorList';
import PharmacyList from './components/Pharmacy/PharmacyList';
import MedicationList from './components/Medication/MedicationList';
import PharmacistList from './components/Pharmacist/PharmacistList';

const App = () => {
  return (
    <div>
      <h1>Healthcare Management System</h1>
      <Switch>
        <Route path="/doctors" component={DoctorList} />
        <Route path="/pharmacies" component={PharmacyList} />
        <Route path="/medications" component={MedicationList} />
        <Route path="/pharmacists" component={PharmacistList} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
};

const Home = () => <h2>Welcome to the Healthcare Management System</h2>;

export default App;
