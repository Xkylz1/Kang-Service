// src/api/config.js

const baseURL = import.meta.env.VITE_API_URL;

const apiEndpoints = {
  user: `${baseURL}/api/v1/users`,
  serviceRequest: `${baseURL}/api/v1/serviceRequests`,
  technician: `${baseURL}/api/v1/technicians`,
};

export default apiEndpoints;
