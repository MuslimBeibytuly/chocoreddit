import axios from 'axios';

const api = axios.create({
  // TODO: Add vue.config.js with vue proxy to docker network
  baseURL: 'http://0.0.0.0:8000/api/',
  timeout: 10 * 1000,
  headers: {
    'content-type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (localStorage.getItem('token') !== null) {
    // eslint-disable-next-line no-param-reassign
    config.headers.common.Authorization = localStorage.getItem('token');
  }
  return config;
});

export default api;
