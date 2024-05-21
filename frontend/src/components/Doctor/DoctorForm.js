import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createDoctor } from '../../services/api';
import '../../styles/styles.css';

const DoctorForm = ({ refreshDoctors, doctor }) => {
  const formik = useFormik({
    initialValues: {
      id: doctor ? doctor.id : null,
      FirstName: doctor ? doctor.FirstName : '',
      LastName: doctor ? doctor.LastName : '',
      specialty: doctor ? doctor.specialty : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      FirstName: Yup.string()
        .max(50, 'First Name must be 50 characters or less')
        .required('First Name is required'),
      LastName: Yup.string()
        .max(50, 'Last Name must be 50 characters or less')
        .required('Last Name is required'),
      specialty: Yup.string()
        .max(255, 'Specialty must be 255 characters or less')
        .required('Specialty is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      await createDoctor(values);
      resetForm();
      refreshDoctors();
    },
  });

  useEffect(() => {
    if (doctor) {
      formik.setValues(doctor);
    }
  }, [doctor, formik]);

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <input
        name="FirstName"
        type="text"
        value={formik.values.FirstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="First Name"
        required
      />
      {formik.touched.FirstName && formik.errors.FirstName ? (
        <div className="error">{formik.errors.FirstName}</div>
      ) : null}

      <input
        name="LastName"
        type="text"
        value={formik.values.LastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Last Name"
        required
      />
      {formik.touched.LastName && formik.errors.LastName ? (
        <div className="error">{formik.errors.LastName}</div>
      ) : null}

      <input
        name="specialty"
        type="text"
        value={formik.values.specialty}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Specialty"
        required
      />
      {formik.touched.specialty && formik.errors.specialty ? (
        <div className="error">{formik.errors.specialty}</div>
      ) : null}

      <button type="submit">Save</button>
    </form>
  );
};

export default DoctorForm;
