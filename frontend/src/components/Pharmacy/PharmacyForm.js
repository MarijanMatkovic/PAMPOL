import React, { useState, useEffect } from 'react';
import { createPharmacy, updatePharmacy } from '../../services/api';
import '../../styles/styles.css';

const PharmacyForm = ({ refreshPharmacies, pharmacy }) => {
  const [form, setForm] = useState({
    id: null,
    name: '',
    address: ''
  });

  useEffect(() => {
    if (pharmacy) {
      setForm(pharmacy);
    }
  }, [pharmacy]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await updatePharmacy(form.id, form);
    } else {
      await createPharmacy(form);
    }
    setForm({
      id: null,
      name: '',
      address: ''
    });
    refreshPharmacies();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default PharmacyForm;
