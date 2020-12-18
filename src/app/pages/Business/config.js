import {API_URL} from "../../Constants";

export const API_URL = process.env.NODE_ENV === 'production'
  ? API_URL + 'server/'
  : 'http://localhost:3000'