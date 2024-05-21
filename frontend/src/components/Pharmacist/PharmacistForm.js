import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPharmacist, updatePharmacist, getPharmacies } from '../../services/api';
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
      FirstName: pharmacist ? pharmacist.FirstName : '',
      LastName: pharmacist ? pharmacist.LastName : '',
      pharmacyId: pharmacist ? pharmacist.pharmacyId : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      FirstName: Yup.string()
        .max(50, 'First Name must be 50 characters or less')
        .required('First Name is required'),
      LastName: Yup.string()
        .max(50, 'Last Name must be 50 characters or less')
        .required('Last Name is required'),
      pharmacyId: Yup.string().required('Pharmacy is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (values.id) {
        await updatePharmacist(values.id, values);
      } else {
        await createPharmacist(values);
      }
      resetForm();
      refreshPharmacists();
    },
  });

  useEffect(() => {
    if (pharmacist) {
      formik.setValues(pharmacist);
    }
  }, [pharmacist]);

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
