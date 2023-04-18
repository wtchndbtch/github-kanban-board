export interface Issue {
  state: string;
  number: number;
  title: string;
  date: string;
  comments: number;
  author: string;
  assignee: string | null;
  assigneeImg: string | null;
}

export interface IssueLists {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
}
