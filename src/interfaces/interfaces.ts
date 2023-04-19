import { Issue } from "@/api";

export interface IssueLists {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
}
