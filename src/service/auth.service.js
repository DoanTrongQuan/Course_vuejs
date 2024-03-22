import axios from 'axios';

const API_URL = 'http://localhost:8088/api/v1/users/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      userName: user.fullName,
      email: user.email,
      password: user.password,
      retypePassword: user.confirmPassword
    });
  }
}

export default new AuthService();