import Vue from 'vue';

// Lib imports
import axios from 'axios';

Vue.prototype.$http = axios;

axios.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token');
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['x-access-token'] = `${token}`;
      }
  
      return config;
    }, 
  
    (error) => {
      return Promise.reject(error);
    }
);

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://sc.proyectosifilisgestasionaria.com/api' : 'http://localhost:3000/api';