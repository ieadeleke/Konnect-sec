import axios from 'axios';

const axiosCall = axios.create({
  baseURL:
    import.meta.env.VITE_STAGING === 'prod'
      ? import.meta.env.VITE_BASE_URL || 'https://prod-api.konnectbd.com/api/v1'
      : import.meta.env.VITE_BASE_URL_TEST || 'https://test-api.konnectbd.com/api/v1',
});

export default axiosCall;
