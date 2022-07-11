import axios from 'axios';

export const BASE_URI = "https://localhost:7095/api";

const api = axios.create({
    baseURL: `${BASE_URI}`,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'X-Platform': 'web',
        "Accept": "application/json"
      },
});

api.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem('access_token');
    if (token) {
        if(config.headers) {
            config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;