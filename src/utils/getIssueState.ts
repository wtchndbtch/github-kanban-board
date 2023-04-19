import { Issue } from "../api/types";

export const getIssueState = (issue: Issue) => {
  switch (true) {
    case issue.state === "closed":
      return "done";
    case Boolean(issue.assignee):
      return "inProgress";
    default:
      return "todo";
  }
};
