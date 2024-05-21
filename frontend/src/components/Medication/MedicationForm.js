import React, { useState } from 'react';
import { createMedication, updateMedication } from '../../services/api';
import '../../styles/styles.css';

const MedicationForm = ({ refreshMedications }) => {
  const [form, setForm] = useState({
    id: null,
    name: '',
    manufacturer: '',
    price: ''
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
      await updateMedication(form.id, form);
    } else {
      await createMedication(form);
    }
    setForm({
      id: null,
      name: '',
      manufacturer: '',
      price: ''
    });
    refreshMedications();
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
        name="manufacturer"
        value={form.manufacturer}
        onChange={handleChange}
        placeholder="Manufacturer"
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        step="0.01"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default MedicationForm;
