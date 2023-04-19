import { GetIssuesPayload } from "@/api";

import { REGEXES } from "./constants";

export const getIssuesPayload = (url: string): GetIssuesPayload => {
  const result = url.replace(REGEXES.GITHUB_URL_START, "").split("/");

  const [owner, repo] = result;

  return { owner, repo };
};
