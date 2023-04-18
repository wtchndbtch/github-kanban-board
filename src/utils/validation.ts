import { GetIssuesPayload } from "@/api";

import { REGEXES } from "./constants";

export const isValidRepoUrl = (url: string) => REGEXES.GITHUB_REPO.test(url);

export const getIssuesPayload = (url: string): GetIssuesPayload => {
  const [owner, repo] = url.replace(REGEXES.GITHUB_URL_START, "").split("/");

  return { owner, repo };
};
