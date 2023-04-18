import { Issue, IssueLists } from "@/interfaces";

import { GetIssuesPayload } from "./types";

//@ts-ignore
const buildIssue = issue => ({
  state: issue.state,
  number: issue.number,
  title: issue.title,
  date: issue.created_at,
  comments: issue.comments,
  author: issue.user.login,
  assignee: issue?.assignee?.login || null,
  assigneeImg: issue?.assignee?.avatar_url || null,
});

export const getUrl = (inputUrl: string) => {
  const value = inputUrl.split("/");
  const reqInfo = { owner: value[1], repo: value[2] };

  getIssues(reqInfo);
};

const getIssueState = (issue: Issue) => {
  switch (true) {
    case issue.state === "closed":
      return "done";
    case Boolean(issue.assignee):
      return "inProgress";
    default:
      return "todo";
  }
};

export const getIssues = async (payload: GetIssuesPayload) => {
  const { owner, repo } = payload;

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const data: Issue[] = await response.json();

  const issueData = data.reduce<IssueLists>(
    (acc, issue) => {
      const newIssue = buildIssue(issue);
      const issueState = getIssueState(issue);

      acc[issueState].push(newIssue);

      return acc;
    },
    { todo: [], inProgress: [], done: [] }
  );

  console.log("🚀 ~ file: getIssues.ts:74 ~ issueData:", issueData);

  return issueData;
};
