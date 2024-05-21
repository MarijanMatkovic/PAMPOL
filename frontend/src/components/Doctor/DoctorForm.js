import React, { useState } from 'react';
import { createDoctor, updateDoctor } from '../../services/api';

const DoctorForm = ({ refreshDoctors }) => {
  const [form, setForm] = useState({
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
      FirstName: '',
      LastName: '',
      specialty: ''
    });
    refreshDoctors();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="FirstName"
        value={form.FirstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="LastName"
        value={form.LastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="specialty"
        value={form.specialty}
        onChange={handleChange}
        placeholder="Specialty"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default DoctorForm;
