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
  state: string;
  number: number;
  title: string;
  created_at: string;
  comments: number;
  user: User;
  assignee: Assignee | null;
}
