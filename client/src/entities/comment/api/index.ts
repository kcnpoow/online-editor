import { Comment as CommentModel } from '../model';
import BaseApi from '@shared/api/BaseApi';

const api = new BaseApi('/api/comments');

class CommentApi {
  async getComments(draftId: string): Promise<CommentModel[]> {
    return api.get('/' + draftId);
  }

  async createComment(draftId: string, userId: string, content: string) {
    return api.post(`/${draftId}/add?userId=${userId}`, { content });
  }
}

export const commentApi = new CommentApi();
