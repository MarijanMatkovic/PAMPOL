import React, { useState } from 'react';
import { createPharmacy, updatePharmacy } from '../../services/api';
import '../../styles/styles.css';

const PharmacyForm = ({ refreshPharmacies }) => {
  const [form, setForm] = useState({
    id: null,
    name: '',
    address: ''
  });

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

  const handleEdit = (pharmacy) => {
    setForm(pharmacy);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default PharmacyForm;
