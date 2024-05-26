import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPharmacist, getPharmacies } from '../../services/api';
import '../../styles/styles.css';

const PharmacistForm = ({ refreshPharmacists, pharmacist }) => {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    const fetchPharmacies = async () => {
      const result = await getPharmacies();
      setPharmacies(result.data);
    };
    fetchPharmacies();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: pharmacist ? pharmacist.id : null,
      firstName: pharmacist ? pharmacist.firstName : '',
      lastName: pharmacist ? pharmacist.lastName : '',
      pharmacyId: pharmacist ? pharmacist.pharmacyId : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(50, 'First Name must be 50 characters or less')
        .required('First Name is required'),
      lastName: Yup.string()
        .max(50, 'Last Name must be 50 characters or less')
        .required('Last Name is required'),
      pharmacyId: Yup.string().required('Pharmacy is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      await createPharmacist(values);
      resetForm();
      refreshPharmacists();
    },
  });

  useEffect(() => {
    if (pharmacist) {
      formik.setValues(pharmacist);
    }
  }, [pharmacist, formik]);

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <input
        name="firstName"
        type="text"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="First Name"
        required
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className="error">{formik.errors.firstName}</div>
      ) : null}

      <input
        name="lastName"
        type="text"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Last Name"
        required
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className="error">{formik.errors.lastName}</div>
      ) : null}

      <select
        name="pharmacyId"
        value={formik.values.pharmacyId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
      >
        <option value="" label="Select pharmacy" />
        {pharmacies.map((pharmacy) => (
          <option key={pharmacy.id} value={pharmacy.id}>
            {pharmacy.name}
          </option>
        ))}
      </select>
      {formik.touched.pharmacyId && formik.errors.pharmacyId ? (
        <div className="error">{formik.errors.pharmacyId}</div>
      ) : null}

      <button type="submit">Save</button>
    </form>
  );
};

export default PharmacistForm;
