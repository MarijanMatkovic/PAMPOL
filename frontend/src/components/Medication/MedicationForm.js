import React, { useState } from 'react';
import { createMedication, updateMedication } from '../../services/api';
import '../../styles/styles.css';

const MedicationForm = ({ refreshMedications, medication }) => {
  const [form, setForm] = useState(medication || {
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
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="manufacturer"
        value={form.manufacturer}
        onChange={handleChange}
        placeholder="Manufacturer"
        required
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        step="0.01"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default MedicationForm;
