import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/examples
  createJob = async (userId, requestBody) => {
    return this.api.post(`${userId}/job/create`, requestBody);
  }

  // GET /api/examples
  getAll = async () => {
    return this.api.get('/api/examples');
  }

  // GET /api/examples/:id
  getJob = async (id) => {
    return this.api.get(`/api/jobs/${id}`);
  }

  // PUT /api/examples/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/examples/${id}`, requestBody);
  }

  // DELETE /api/examples/:id
  deleteJob = async (id) => {
    return this.api.delete(`/api/jobs/${id}/delete`);
  } 

  uploadImage = async (file) => {
    return this.api.post("/api/upload", file);
  }

  contactUs = async (requestBody) => {
    return this.api.post("/api/contact", requestBody);
  }

}

// Create one instance of the service
const service = new ApiService();

export default service;