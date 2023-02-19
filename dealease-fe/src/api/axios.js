import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

axiosClient.interceptors.request.use((response) => {
  return response;
}),
  (error) => {
    //  unauthorized user attempt to login
    if (error.response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');
    }

    throw error;
  };

export default axiosClient;
