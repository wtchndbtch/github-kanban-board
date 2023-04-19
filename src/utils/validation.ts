import { REGEXES } from "./constants";

export const isValidRepoUrl = (url: string) => REGEXES.GITHUB_REPO.test(url);
