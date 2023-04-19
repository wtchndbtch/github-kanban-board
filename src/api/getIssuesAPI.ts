import { IssueLists } from "@/interfaces";

import { GetIssuesPayload, Issue } from "./types";

export const getIssuesAPI = async (payload: GetIssuesPayload) => {
  const { owner, repo } = payload;

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  return response;
};
