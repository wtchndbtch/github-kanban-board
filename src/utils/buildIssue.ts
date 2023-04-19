import { Issue } from "../api/types";

// select only used data from issue returned by api
export const buildIssue = (issue: Issue): Issue => ({
  state: issue.state,
  number: issue.number,
  title: issue.title,
  created_at: issue.created_at,
  comments: issue.comments,
  user: issue.user,
  assignee: issue.assignee,
});
