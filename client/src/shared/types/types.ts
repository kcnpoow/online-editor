export type EditorField = 'html' | 'css' | 'js';

export type PagedResponse<T> = {
  content: T[];
  last: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export enum DraftSortValues {
  CommentsCount = 'commentsCount',
  LikesCount = 'likesCount',
  ViewsCount = 'viewsCount',
  CreatedDate = 'createdDate',
}
