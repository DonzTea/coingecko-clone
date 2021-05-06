import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export default instance;
