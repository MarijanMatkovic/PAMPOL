import React, { useState } from 'react';
import { createDoctor, updateDoctor } from '../../services/api';
import '../../styles/styles.css';

const DoctorForm = ({ refreshDoctors }) => {
  const [form, setForm] = useState({
    id: null,
    FirstName: '',
    LastName: '',
    specialty: ''
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
      await updateDoctor(form.id, form);
    } else {
      await createDoctor(form);
    }
    setForm({
      id: null,
      FirstName: '',
      LastName: '',
      specialty: ''
    });
    refreshDoctors();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="FirstName"
        value={form.FirstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="LastName"
        value={form.LastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="text"
        name="specialty"
        value={form.specialty}
        onChange={handleChange}
        placeholder="Specialty"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default DoctorForm;
