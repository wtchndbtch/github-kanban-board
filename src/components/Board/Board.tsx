import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import styled from "styled-components";

import { Issue, IssueLists } from "@/api";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  moveIssue,
  removeIssue,
  updateIssueLists,
} from "@/store/issueLists-slice";
import { COLUMN_TYPES } from "@/utils";

import { Box } from "../Box";
import IssueCard from "../IssueCard/IssueCard";
import { IssueColumn } from "../IssueColumn";

type BoardProps = {};

const BoardBox = styled(Box)({
  height: "100%",
  justifyContent: "center",
  textAlign: "center",
  gap: "1rem",
  //padding: "3rem 2rem",
});

interface ActiveIssue {
  issue: Issue;
  status: Status;
}

export type Status =
  | COLUMN_TYPES.TO_DO
  | COLUMN_TYPES.IN_PROGRESS
  | COLUMN_TYPES.DONE;

export const Board = (props: BoardProps) => {
  const { issuesLists } = useAppSelector(state => state.issues);

  const [activeIssue, setActiveIssue] = useState<ActiveIssue | null>(null);

  const dispatch = useAppDispatch();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (!active.data.current || !issuesLists) return;
    const status = active.data.current.status as Status;
    const activeIndex = active.data.current.sortable.index;
    const activeIssue = { issue: issuesLists[status][activeIndex], status };

    setActiveIssue(activeIssue);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log("🚀 ~ file: Board.tsx:67 ~ over:", over);

    if (!over || !active.data.current || !over.data.current || !issuesLists)
      return;

    const fromStatus = active.data.current.status as Status;
    const toStatus = over.data.current.status as Status;
    const activeIndex = active.data.current?.sortable.index as number;
    const overIndex = (over.data.current?.sortable?.index as number) || 0;

    if (fromStatus === toStatus) {
      const list: Issue[] = issuesLists[fromStatus];
      const updatedList = arrayMove(list, activeIndex, overIndex);

      dispatch(updateIssueLists({ updatedList, status: fromStatus }));

      return;
    }

    const issueToMove = issuesLists[fromStatus][activeIndex];
    const updatedIssue = {
      ...issueToMove,
      state: toStatus === COLUMN_TYPES.DONE ? "closed" : "open",
    };

    console.log("🚀 ~ file: Board.tsx:80 ~ overIndex:", overIndex);
    dispatch(moveIssue({ issue: updatedIssue, status: toStatus, overIndex }));
    dispatch(removeIssue({ id: active.id, status: fromStatus }));
  };

  return (
    issuesLists && (
      <BoardBox display="flex">
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          collisionDetection={closestCenter}
        >
          <IssueColumn
            title="To Do"
            status={COLUMN_TYPES.TO_DO}
            issues={issuesLists[COLUMN_TYPES.TO_DO]}
          />
          <IssueColumn
            title="In Progress"
            status={COLUMN_TYPES.IN_PROGRESS}
            issues={issuesLists[COLUMN_TYPES.IN_PROGRESS]}
          />
          <IssueColumn
            title="Done"
            status={COLUMN_TYPES.DONE}
            issues={issuesLists[COLUMN_TYPES.DONE]}
          />
          <DragOverlay zIndex={30}>
            {activeIssue ? (
              <IssueCard
                issue={activeIssue.issue}
                status={activeIssue.status}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </BoardBox>
    )
  );
};
