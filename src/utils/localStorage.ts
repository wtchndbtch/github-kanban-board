import { IssueLists, RepoInfo } from "@/api";

export const loadStoredData = (key: string) => {
  const storedState = localStorage.getItem(key);
  if (!storedState) {
    return null;
  }
  return JSON.parse(storedState);
};

export const saveRepoInfoToStorage = (key: string, data: RepoInfo) => {
  const dataToStore = JSON.stringify(data);
  localStorage.setItem(key, dataToStore);
};

export const saveIssuesDataToStorage = (key: string, data: IssueLists) => {
  const dataToStore = JSON.stringify(data);
  localStorage.setItem(`${key}/issues`, dataToStore);
};
