export const REGEXES = {
  GITHUB_URL_START: /^(https:\/\/)?(github.com)\//,
  GITHUB_REPO:
    /^(https:\/\/)?(github.com)[-A-Za-z0-9+&@#/?=_]+\/[-A-Za-z0-9+&@#/%=~_|]+$/,
};

export const GITHUB_URL = "https://github.com/";

export enum COLUMN_TYPES {
  TO_DO = "todo",
  IN_PROGRESS = "inProgress",
  DONE = "done",
}
