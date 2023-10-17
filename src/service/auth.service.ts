import axios, { AxiosResponse } from "axios";

const URL: string = import.meta.env.VITE_BASE_URL as string;
const API_URL = `${URL}/api/auth/`;
const Username: string = import.meta.env.VITE_BASE_USERNAME as string;
const Password: string = import.meta.env.VITE_BASE_PASSWORD as string;

interface AuthServiceConfig {
  auth: {
    username: string;
    password: string;
  };
}

const config: AuthServiceConfig = {
  auth: {
    username: Username,
    password: Password,
  },
};

const login = async (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  const res = await axios.post(
    `${API_URL}singin`,
    { username, password },
    config
  );
  if (res.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", JSON.stringify(res.data.accessToken));
  }
  return res;
};

const register = async (username: string, email: string, password: string) => {
  return await axios.post(
    `${API_URL}singup`,
    { username, email, password },
    config
  );
};

const registerAdmin = async (username: string, email: string, password: string , roles: string[] ) => {
  return await axios.post(
    `${API_URL}singup`,
    { username, email, password , roles },
    config
  );
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

const authservice = {
  login,
  register,
  registerAdmin,
  getUser,
};

export default authservice;
