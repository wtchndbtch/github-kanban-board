import { GetIssuesPayload } from "./types";

export const getIssuesAPI = async (payload: GetIssuesPayload) => {
  const { owner, repo } = payload;
  let response;
  try {
    response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
  } catch (error) {
    throw new Error("Something went wrong");
  }
  if (!response.ok) return;

  return response;
};

export const getRepoInfoAPI = async (payload: GetIssuesPayload) => {
  const { owner, repo } = payload;

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) return;

  return response;
};
