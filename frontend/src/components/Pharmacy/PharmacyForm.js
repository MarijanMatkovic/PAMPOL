import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPharmacy, updatePharmacy } from '../../services/api';
import '../../styles/styles.css';

const PharmacyForm = ({ refreshPharmacies, pharmacy }) => {
  const formik = useFormik({
    initialValues: {
      id: pharmacy ? pharmacy.id : null,
      name: pharmacy ? pharmacy.name : '',
      address: pharmacy ? pharmacy.address : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255, 'Name must be 255 characters or less')
        .required('Name is required'),
      address: Yup.string()
        .required('Address is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (values.id) {
        await updatePharmacy(values.id, values);
      } else {
        await createPharmacy(values);
      }
      resetForm();
      refreshPharmacies();
    },
  });

  useEffect(() => {
    if (pharmacy) {
      formik.setValues(pharmacy);
    }
  }, [pharmacy]);

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <input
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Name"
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="error">{formik.errors.name}</div>
      ) : null}
      
      <input
        name="address"
        type="text"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Address"
      />
      {formik.touched.address && formik.errors.address ? (
        <div className="error">{formik.errors.address}</div>
      ) : null}
      
      <button type="submit">Save</button>
    </form>
  );
};

export default PharmacyForm;
