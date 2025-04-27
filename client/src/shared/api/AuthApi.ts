import BaseApi from './BaseApi';

const api = new BaseApi('/auth');

class AuthApi {
  public async signin(username: string, password: string) {
    return api.post('/signin', { username, password });
  }

  public async signup(username: string, email: string, password: string) {
    return api.post('/signup', { username, email, password });
  }

  public async auth() {
    return await api.get('/auth');
  }
}

export const authApi = new AuthApi();
