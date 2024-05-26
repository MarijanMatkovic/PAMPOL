import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPharmacy, updatePharmacy, getDoctors, getPharmacists, getMedications } from '../../services/api';
import '../../styles/styles.css';

const PharmacyForm = ({ refreshPharmacies, pharmacy }) => {
  const [doctors, setDoctors] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [doctorsData, pharmacistsData, medicationsData] = await Promise.all([
        getDoctors(),
        getPharmacists(),
        getMedications()
      ]);
      setDoctors(doctorsData.data);
      setPharmacists(pharmacistsData.data);
      setMedications(medicationsData.data);
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: pharmacy ? pharmacy.id : null,
      name: pharmacy ? pharmacy.name : '',
      address: pharmacy ? pharmacy.address : '',
      doctorIds: pharmacy ? pharmacy.doctorIds : [],
      pharmacistIds: pharmacy ? pharmacy.pharmacistIds : [],
      medications: pharmacy ? pharmacy.medications : [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255, 'Name must be 255 characters or less')
        .required('Name is required'),
      address: Yup.string()
        .required('Address is required'),
      doctorIds: Yup.array().min(1, 'At least one doctor is required'),
      pharmacistIds: Yup.array().min(1, 'At least one pharmacist is required'),
      medications: Yup.array().min(1, 'At least one medication is required')
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

  const handleDoctorChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    formik.setFieldValue('doctorIds', value);
  };

  const handlePharmacistChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    formik.setFieldValue('pharmacistIds', value);
  };

  const handleMedicationChange = (e, index, field) => {
    const value = e.target.value;
    const updatedMedications = [...formik.values.medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    formik.setFieldValue('medications', updatedMedications);
  };

  const addMedication = () => {
    formik.setFieldValue('medications', [...formik.values.medications, { name: '', manufacturer: '', price: 0 }]);
  };

  const removeMedication = (index) => {
    const updatedMedications = formik.values.medications.filter((_, i) => i !== index);
    formik.setFieldValue('medications', updatedMedications);
  };

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
        name="address"
        type="text"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Address"
        required
      />
      {formik.touched.address && formik.errors.address ? (
        <div className="error">{formik.errors.address}</div>
      ) : null}

      <select
        name="doctorIds"
        multiple
        value={formik.values.doctorIds}
        onChange={handleDoctorChange}
        onBlur={formik.handleBlur}
        required
      >
        {doctors.map(doctor => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.firstName} {doctor.lastName}
          </option>
        ))}
      </select>
      {formik.touched.doctorIds && formik.errors.doctorIds ? (
        <div className="error">{formik.errors.doctorIds}</div>
      ) : null}

      <select
        name="pharmacistIds"
        multiple
        value={formik.values.pharmacistIds}
        onChange={handlePharmacistChange}
        onBlur={formik.handleBlur}
        required
      >
        {pharmacists.map(pharmacist => (
          <option key={pharmacist.id} value={pharmacist.id}>
            {pharmacist.firstName} {pharmacist.lastName}
          </option>
        ))}
      </select>
      {formik.touched.pharmacistIds && formik.errors.pharmacistIds ? (
        <div className="error">{formik.errors.pharmacistIds}</div>
      ) : null}

      <div>
        <h4>Medications</h4>
        {formik.values.medications.map((medication, index) => (
          <div key={index}>
            <input
              name={`medications[${index}].name`}
              type="text"
              value={medication.name}
              onChange={(e) => handleMedicationChange(e, index, 'name')}
              placeholder="Medication Name"
              required
            />
            <input
              name={`medications[${index}].manufacturer`}
              type="text"
              value={medication.manufacturer}
              onChange={(e) => handleMedicationChange(e, index, 'manufacturer')}
              placeholder="Manufacturer"
              required
            />
            <input
              name={`medications[${index}].price`}
              type="number"
              value={medication.price}
              onChange={(e) => handleMedicationChange(e, index, 'price')}
              placeholder="Price"
              step="0.01"
              required
            />
            <button type="button" onClick={() => removeMedication(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addMedication}>Add Medication</button>
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default PharmacyForm;
