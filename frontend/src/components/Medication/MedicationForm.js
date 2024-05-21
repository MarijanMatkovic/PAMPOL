import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createMedication, updateMedication, getPharmacies } from '../../services/api';
import '../../styles/styles.css';

const MedicationForm = ({ refreshMedications, medication }) => {
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
      id: medication ? medication.id : null,
      name: medication ? medication.name : '',
      manufacturer: medication ? medication.manufacturer : '',
      price: medication ? medication.price : '',
      pharmacyIds: medication ? medication.pharmacyIds : [],  // assuming medication object has pharmacyIds array
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
      pharmacyIds: Yup.array().min(1, 'At least one pharmacy must be selected'),
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

      <select
        name="pharmacyIds"
        value={formik.values.pharmacyIds}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        multiple
        required
      >
        {pharmacies.map((pharmacy) => (
          <option key={pharmacy.id} value={pharmacy.id}>
            {pharmacy.name}
          </option>
        ))}
      </select>
      {formik.touched.pharmacyIds && formik.errors.pharmacyIds ? (
        <div className="error">{formik.errors.pharmacyIds}</div>
      ) : null}

      <button type="submit">Save</button>
    </form>
  );
};

export default MedicationForm;
