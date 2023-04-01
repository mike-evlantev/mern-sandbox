import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_DOMAIN}/api/users`;

const register = async ({ email, password, first, last }: { email: string, password: string, first: string, last: string }) => {
  const config = {
    headers: {
        "Content-Type": "application/json",
    },
  };
  const { data } = await axios.post(`${API_URL}/register`, { email, password, first, last }, config);

  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  return data;
}

const login = async ({ email, password }: { email: string, password: string }) => {
  const config = {
    headers: {
        "Content-Type": "application/json",
    },
  };
  const { data } = await axios.post(`${API_URL}/login`, { email, password }, config);

  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  return data;
}

const logout = () => {
  localStorage.removeItem("user");
}

export const authService = { register, login, logout };