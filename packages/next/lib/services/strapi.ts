import Axios from "axios";

export const strapi = Axios.create({
  baseURL: 'https://portfolio-strapi-95.herokuapp.com/api',
  timeout: 30 * 1000,
});
