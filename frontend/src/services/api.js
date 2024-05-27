import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Doctor API
export const getDoctors = () => axios.get(`${API_URL}/doctors`);
export const getDoctor = (id) => axios.get(`${API_URL}/doctors/${id}`);
export const createDoctor = (doctor) => axios.post(`${API_URL}/doctors`, doctor);
export const deleteDoctor = (id) => axios.delete(`${API_URL}/doctors/${id}`);

// Pharmacy API
export const getPharmacies = () => axios.get(`${API_URL}/pharmacies`);
export const getPharmacy = (id) => axios.get(`${API_URL}/pharmacies/${id}`);
export const createPharmacy = (pharmacy) => axios.post(`${API_URL}/pharmacies`, pharmacy);
export const updatePharmacy = (id, pharmacy) => axios.put(`${API_URL}/pharmacies/${id}`, pharmacy);
export const deletePharmacy = (id) => axios.delete(`${API_URL}/pharmacies/${id}`);

// Medication API
export const getMedications = () => axios.get(`${API_URL}/medications`);
export const getMedication = (id) => axios.get(`${API_URL}/medications/${id}`);
export const createMedication = (medication) => axios.post(`${API_URL}/medications`, medication);
export const updateMedication = (id, medication) => axios.put(`${API_URL}/medications/${id}`, medication);
export const deleteMedication = (id) => axios.delete(`${API_URL}/medications/${id}`);

// Pharmacist API
export const getPharmacists = () => axios.get(`${API_URL}/pharmacists`);
export const getPharmacist = (id) => axios.get(`${API_URL}/pharmacists/${id}`);
export const createPharmacist = (pharmacist) => axios.post(`${API_URL}/pharmacists`, pharmacist);
export const deletePharmacist = (id) => axios.delete(`${API_URL}/pharmacists/${id}`);
