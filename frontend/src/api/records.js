import api from './axios';

export const recordsAPI = {
  getRecords: (patientId) => api.get(`/records/${patientId}`),
  updateStatus: (patientId, status) => api.patch(`/records/${patientId}/status`, { status }),
  addPrescription: (patientId, prescription) => api.post(`/records/${patientId}/prescriptions`, prescription),
};