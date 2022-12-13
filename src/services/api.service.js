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
  createOne = async (requestBody) => {
    return this.api.post('/api/examples', requestBody);
  }

  // GET /api/examples
  getAll = async () => {
    return this.api.get('/api/examples');
  }

  // GET /api/examples/:id
  getOne = async (id) => {
    return this.api.get(`/api/examples/${id}`);
  }

  // PUT /api/examples/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/examples/${id}`, requestBody);
  }

  // DELETE /api/examples/:id
  deleteProject = async (id) => {
    return this.api.delete(`/api/examples/${id}`);
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