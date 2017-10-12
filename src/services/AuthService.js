import axios from 'axios';

class AuthService {

  signIn(username, password) {
    const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
      return axios.post('/api/signin', data);
  }

  signOut() {
    return axios.post('/api/signout');
  }

}

export default AuthService;
