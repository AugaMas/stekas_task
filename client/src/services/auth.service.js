import axios from 'axios';

function login(userCredentials) {
  const data = axios.post('/api/session/', userCredentials).then((res) => {
    if (res.data && res.data.token) {
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    }
  });
  return data;
}

function logout() {
  localStorage.removeItem('user');
}

function register(user) {
  const data = axios.post('/api/user/', user).then((res) => {
    if (res.data && res.data.email) {
      return res.data;
    }
  });
  return data;
}

function authorization() {
  const { token } = JSON.parse(localStorage.getItem('user'));

  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
}

const authService = { login, logout, register, authorization };

export default authService;
