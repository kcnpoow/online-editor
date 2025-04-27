import BaseApi from '@shared/api/BaseApi';

const api = new BaseApi('/users');

class UserApi {
  async getUser(userId: string) {
    return await api.get('/' + userId);
  }
}

export const userApi = new UserApi();
