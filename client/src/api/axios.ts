import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

api.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      
      switch (status) {
        case 401:
          console.error('Unauthorized: You need to login');
          break;
        case 403:
          console.error('Forbidden: You don\'t have permission to access this resource');
          break;
        case 404:
          console.error('Not Found: The requested resource does not exist');
          break;
        case 500:
          console.error('Server Error: Something went wrong on the server');
          break;
        default:
          console.error(`Request failed with status code ${status}`);
      }
    } else if (error.request) {
      console.error('Network Error: No response received from server');
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
