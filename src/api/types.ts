import { COLUMN_TYPES } from "@/utils";

export type GetIssuesPayload = {
  owner: string;
  repo: string;
};

export interface User {
  login: string;
}

export interface Assignee {
  login: string;
  avatar_url: string;
}

export interface Issue {
  id: number;
  state: string;
  number: number;
  title: string;
  created_at: string;
  comments: number;
  user: User;
  assignee: Assignee | null;
}

export interface IssueLists {
  [COLUMN_TYPES.TO_DO]: Issue[];
  [COLUMN_TYPES.IN_PROGRESS]: Issue[];
  [COLUMN_TYPES.DONE]: Issue[];
}

export interface RepoInfo {
  owner: string;
  repo: string;
  stars: number;
}

export interface RepoInfoResponse {
  owner: { login: string };
  name: string;
  stargazers_count: number;
}
