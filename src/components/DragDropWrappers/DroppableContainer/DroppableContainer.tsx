import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";
import styled from "styled-components";

import { Status } from "@/api";

import { Box } from "../../../UI/Box";

type DroppableProps = {
  status: Status;
  children: ReactNode;
};

const IssueContainer = styled(Box)`
  height: 90%;
  overflow: auto;

  &::-webkit-scrollbar {
    background-color: #d3e4fed4;
    width: 10px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #679fcb32;
    width: 10px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #3889c732;
  }
`;

export const DroppableContainer = ({ status, children }: DroppableProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      status,
    },
    disabled: true,
  });

  return <IssueContainer ref={setNodeRef}>{children}</IssueContainer>;
};
