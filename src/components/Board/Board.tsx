import styled from "styled-components";

import { IssueLists } from "@/interfaces";
import { useAppSelector } from "@/store";

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

export const Board = (props: BoardProps) => {
  // const { todo, inProgress, done } = DUMMY_DATA;
  const { issuesLists } = useAppSelector(state => state.issues);

  return issuesLists ? (
    <BoardBox display="flex">
      <IssueColumn title="To Do" issues={issuesLists.todo} />
      <IssueColumn title="In Progress" issues={issuesLists.inProgress} />
      <IssueColumn title="Done" issues={issuesLists.done} />
    </BoardBox>
  ) : (
    <Box>NIMA NICHO</Box>
  );
};
