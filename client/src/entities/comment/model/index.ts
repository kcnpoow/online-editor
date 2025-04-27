import { Draft } from '@entities/draft';
import { User } from '@entities/user';

export type Comment = {
  id: string;
  content: string;
  user: User;
  project: Draft;
  createdAt: number;
};
