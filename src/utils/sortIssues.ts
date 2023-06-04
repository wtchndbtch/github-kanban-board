import { IssueLists } from "@/api";

export const sortIssuesById = (object: IssueLists) => {
  const newObj = { ...object };

  return {
    todo: newObj.todo.sort((a, b) => a.id - b.id),
    inProgress: newObj.inProgress.sort((a, b) => a.id - b.id),
    done: newObj.done.sort((a, b) => a.id - b.id),
  };
};

// export const getIssuesIdArrays = (obj: IssueLists) => {
//   return {
//     todo: obj.todo.map(issue => issue.id),
//     inProgress: obj.inProgress.map(issue => issue.id),
//     done: obj.done.map(issue => issue.id),
//   };
// };
