import React, { useState, useEffect } from 'react';
import { createPharmacist, updatePharmacist } from '../../services/api';
import '../../styles/styles.css';

const PharmacistForm = ({ refreshPharmacists, pharmacist }) => {
  const [form, setForm] = useState({
    id: null,
    FirstName: '',
    LastName: ''
  });

  useEffect(() => {
    if (pharmacist) {
      setForm(pharmacist);
    }
  }, [pharmacist]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await updatePharmacist(form.id, form);
    } else {
      await createPharmacist(form);
    }
    setForm({
      id: null,
      FirstName: '',
      LastName: ''
    });
    refreshPharmacists();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="FirstName"
        value={form.FirstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="LastName"
        value={form.LastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default PharmacistForm;
