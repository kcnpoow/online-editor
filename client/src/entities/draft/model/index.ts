import { User } from '@entities/user';

export type Draft = {
  id?: string;
  user: User;
  projectName: string;
  privateFlag: boolean;
  html: string;
  css: string;
  js: string;
  key: string | null;
  screenshotUrl: string;
};

export type ViewProps = {
  draft: Draft;
  deletable?: boolean;
  onDelete?: () => void;
};
