import axios from 'axios';

const productUrl = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productUrl,
});
