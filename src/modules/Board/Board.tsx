import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import styled from "styled-components";

import { Issue, Status } from "@/api";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  moveIssue,
  removeIssue,
  updateIssueLists,
} from "@/store/issueLists-slice";
import { COLUMN_TYPES } from "@/utils";

import { IssueCard } from "../../components/IssueCard";
import { IssueColumn } from "../../components/IssueColumn";
import { Box } from "../../UI/Box";

const BoardBox = styled(Box)({
  height: "100%",
  justifyContent: "center",
  textAlign: "center",
  gap: "1rem",
  padding: " 0 2rem 3rem 2rem",
});

interface ActiveIssue {
  issue: Issue;
  status: Status;
}

export const Board = () => {
  const dispatch = useAppDispatch();

  const { issuesLists } = useAppSelector(state => state.issues);

  const [activeIssue, setActiveIssue] = useState<ActiveIssue | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (!active.data.current || !issuesLists) return;

    const status = active.data.current.status as Status;

    const activeIndex = active.data.current.sortable.index;
    const activeIssue = { issue: issuesLists[status]![activeIndex], status };

    setActiveIssue(activeIssue);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !active.data.current || !over.data.current) return;

    const fromStatus = active.data.current.status as Status;
    const toStatus = over.data.current.status as Status;

    const activeIndex = active.data.current.sortable.index as number;
    const overIndex = over.data.current.sortable?.index || 0;

    if (fromStatus === toStatus) {
      if (activeIndex === overIndex) return;

      const updatedList = arrayMove(
        issuesLists![fromStatus],
        activeIndex,
        overIndex
      );

      dispatch(updateIssueLists({ updatedList, status: fromStatus }));

      return;
    }

    if (fromStatus === toStatus) return;

    const issueToMove = issuesLists![fromStatus][activeIndex];
    const updatedIssue = {
      ...issueToMove,
      state: toStatus === COLUMN_TYPES.DONE ? "closed" : "open",
    };

    dispatch(removeIssue({ id: active.id, status: fromStatus }));
    dispatch(moveIssue({ issue: updatedIssue, status: toStatus, overIndex }));
  };

  const handleDragEnd = (event: DragEndEvent) => setActiveIssue(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensor = useSensors(mouseSensor);

  return (
    issuesLists && (
      <BoardBox display="flex">
        <DndContext
          sensors={sensor}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <IssueColumn
            status={COLUMN_TYPES.TO_DO}
            title="To Do"
            issues={issuesLists.todo}
          />

          <IssueColumn
            status={COLUMN_TYPES.IN_PROGRESS}
            title="In Progress"
            issues={issuesLists.inProgress}
          />

          <IssueColumn
            status={COLUMN_TYPES.DONE}
            title="Done"
            issues={issuesLists.done}
          />

          <DragOverlay zIndex={30}>
            {activeIssue ? <IssueCard issue={activeIssue.issue} /> : null}
          </DragOverlay>
        </DndContext>
      </BoardBox>
    )
  );
};
