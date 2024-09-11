import axios from 'axios';

const apiURL = "http://localhost:5001/";

const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;