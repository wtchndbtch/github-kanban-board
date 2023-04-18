import styled from "styled-components";

import { Box } from "../Box";
import { IssueColumn } from "../IssueColumn";

type BoardProps = {};

const BoardBox = styled(Box)({
  height: "100vh",
  justifyContent: "center",
  textAlign: "center",
  gap: "1rem",
  padding: "2rem",
});

const DUMMY_DATA = {
  todo: [
    {
      state: "open",
      number: 26636,
      title:
        "Bug: Incorrect behaviour when using React.lazy along with throwing a data promise in lazy loaded component for Server Side Rendered output",
      date: "2023-04-17T14:36:08Z",
      comments: 0,
      author: "tirthbodawala",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "open",
      number: 26635,
      title:
        "cleanup[devtools]: remove named hooks & profiler changed hook indices feature flags",
      date: "2023-04-17T14:29:45Z",
      comments: 0,
      author: "hoxyq",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "open",
      number: 26631,
      title: "Remove zoom from special cases list",
      date: "2023-04-15T02:12:53Z",
      comments: 1,
      author: "sebmarkbage",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "open",
      number: 26630,
      title: "Fix escaping in ReactDOMInput code",
      date: "2023-04-15T00:42:39Z",
      comments: 2,
      author: "sophiebits",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "open",
      number: 26627,
      title: "Fix input tracking bug",
      date: "2023-04-14T05:03:55Z",
      comments: 4,
      author: "sophiebits",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "open",
      number: 26626,
      title: "Add assertions about <input> value dirty state",
      date: "2023-04-14T03:59:33Z",
      comments: 4,
      author: "sophiebits",
      assignee: null,
      assigneeImg: null,
    },
  ],
  inProgress: [
    {
      state: "open",
      number: 26612,
      title: "Bug: Suspense should hide Portals deeper in the tree",
      date: "2023-04-12T17:25:07Z",
      comments: 0,
      author: "gaearon",
      assignee: "tyao1",
      assigneeImg: "https://avatars.githubusercontent.com/u/5868353?v=4",
    },
  ],
  done: [
    {
      state: "closed",
      number: 26637,
      title: "React DevTools 4.27.4 -> 4.27.5",
      date: "2023-04-17T15:01:07Z",
      comments: 1,
      author: "hoxyq",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "closed",
      number: 26632,
      title: "Add a way to create Server Reference Proxies on the client",
      date: "2023-04-15T03:00:13Z",
      comments: 2,
      author: "sebmarkbage",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "closed",
      number: 26629,
      title: "[Flight] Fix style nit from #26623",
      date: "2023-04-14T16:36:37Z",
      comments: 1,
      author: "sophiebits",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "closed",
      number: 26628,
      title: "Bug: old JSX from previous rendering visible in strict mode",
      date: "2023-04-14T08:38:02Z",
      comments: 6,
      author: "MartinGeisse",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "closed",
      number: 26624,
      title:
        "[Flight] Fallback to importing the whole module instead of encoding every name",
      date: "2023-04-14T02:12:03Z",
      comments: 1,
      author: "sebmarkbage",
      assignee: null,
      assigneeImg: null,
    },
    {
      state: "closed",
      number: 26623,
      title: "[Flight] Serialize weird numbers",
      date: "2023-04-14T01:57:23Z",
      comments: 1,
      author: "sophiebits",
      assignee: null,
      assigneeImg: null,
    },
  ],
};

export const Board = (props: BoardProps) => {
  const { todo, inProgress, done } = DUMMY_DATA;

  return (
    <BoardBox display="flex">
      <IssueColumn title="To Do" issues={todo} />
      <IssueColumn title="In Progress" issues={inProgress} />
      <IssueColumn title="Done" issues={done} />
    </BoardBox>
  );
};
