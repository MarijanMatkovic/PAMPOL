import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createMedication, updateMedication } from '../../services/api';
import '../../styles/styles.css';

const MedicationForm = ({ refreshMedications, medication }) => {
  const formik = useFormik({
    initialValues: {
      id: medication ? medication.id : null,
      name: medication ? medication.name : '',
      manufacturer: medication ? medication.manufacturer : '',
      price: medication ? medication.price : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255, 'Name must be 255 characters or less')
        .required('Name is required'),
      manufacturer: Yup.string()
        .max(255, 'Manufacturer must be 255 characters or less')
        .required('Manufacturer is required'),
      price: Yup.number()
        .positive('Price must be a positive number')
        .required('Price is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (values.id) {
        await updateMedication(values.id, values);
      } else {
        await createMedication(values);
      }
      resetForm();
      refreshMedications();
    },
  });

  useEffect(() => {
    if (medication) {
      formik.setValues(medication);
    }
  }, [medication]);

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <input
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Name"
        required
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="error">{formik.errors.name}</div>
      ) : null}

      <input
        name="manufacturer"
        type="text"
        value={formik.values.manufacturer}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Manufacturer"
        required
      />
      {formik.touched.manufacturer && formik.errors.manufacturer ? (
        <div className="error">{formik.errors.manufacturer}</div>
      ) : null}

      <input
        name="price"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Price"
        step="0.01"
        required
      />
      {formik.touched.price && formik.errors.price ? (
        <div className="error">{formik.errors.price}</div>
      ) : null}

      <button type="submit">Save</button>
    </form>
  );
};

export default MedicationForm;
