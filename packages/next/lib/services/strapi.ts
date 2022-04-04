import Axios from "axios";

export const strapi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  timeout: 30 * 1000,
});
