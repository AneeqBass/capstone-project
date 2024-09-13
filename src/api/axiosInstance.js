import axios from 'axios';

const apiURL = "https://fitquip-capstone.onrender.com/";

const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;