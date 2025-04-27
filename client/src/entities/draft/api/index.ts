import { Draft } from '../model';
import { User } from '@entities/user';
import BaseApi from '@shared/api/BaseApi';
import { PagedResponse } from '@shared/types/types';

interface CreateDraftRequest {
  user: User;
  js: string;
  css: string;
  html: string;
  privateFlag: boolean;
  projectName: string;
}

const api = new BaseApi('/projects');

class DraftApi {
  async getAllDrafts(): Promise<PagedResponse<Draft>> {
    return api.get();
  }

  async getDraftsByUserId(userId: string) {
    return api.get('/user/' + userId);
  }

  async getDraft(draftId: string, key?: string | null): Promise<Draft> {
    let url = `/${draftId}`;

    if (key) {
      url += `?key=${key}`;
    }

    return api.get(url);
  }

  async createDraft(draft: CreateDraftRequest): Promise<Draft> {
    return api.post(draft);
  }

  async updateDraft(draftId: string, draft: Partial<Draft>): Promise<Draft> {
    return api.put('/' + draftId, draft);
  }

  async deleteDraft(draftId: string) {
    return api.delete('/' + draftId);
  }

  async searchDrafts(
    query: string,
    page: number,
    size: number,
    sortBy: string
  ): Promise<PagedResponse<Draft>> {
    return api.get(
      `/search?query=${query}&page=${page}&size=${size}&sortBy=${sortBy}`
    );
  }
}

export const draftApi = new DraftApi();
