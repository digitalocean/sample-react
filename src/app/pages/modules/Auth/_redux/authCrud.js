import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, password) {
  return axios.post(REGISTER_URL, { email, fullname, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

export async function getWorldCounties() {
  try {
      const response = await fetch("https://reqres.in/api/users?page=2");  
      const data = await response.json()

      console.log(data)
      return data;
    } catch (error) {
    console.log(error)
  }
}
