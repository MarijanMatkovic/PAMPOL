import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Welcome to the Medical Management System</h1>
    <p>Please select a section to manage:</p>
    <ul>
      <li><Link to="/doctors">Doctors</Link></li>
      <li><Link to="/pharmacists">Pharmacists</Link></li>
      <li><Link to="/pharmacies">Pharmacies</Link></li>
      <li><Link to="/medications">Medications</Link></li>
    </ul>
  </div>
);

export default HomePage;
