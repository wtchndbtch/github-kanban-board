import { blue } from "@ant-design/colors";
import { SortableContext } from "@dnd-kit/sortable";
import { Typography } from "antd";
import { memo } from "react";
import styled from "styled-components";

import { Issue } from "@/api";
import { Status } from "@/api";

import { Box } from "../../UI/Box";
import { DroppableContainer } from "../DragDropWrappers/DroppableContainer";
import SortableIssueCard from "../DragDropWrappers/SortableIssueCard/SortableIssueCard";
import { IssueCard } from "../IssueCard";

type IssueColumnProps = {
  issues: Issue[];
  title: string;
  status: Status;
};

const Column = styled(Box)({
  flex: 1,
  height: "80vh",
  width: "24rem",
  margin: "0 auto",
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: blue[0],
  boxShadow: "2px 4px rgba(0, 0, 0, 0.06)",
});

export const IssueColumn = memo((props: IssueColumnProps) => {
  const { title, status, issues } = props;
  console.log("🚀 ~ file: IssueColumn.tsx:34 ~ Column status:", status);

  return (
    issues && (
      <Column>
        <Typography.Title level={4}>{title}</Typography.Title>

        <SortableContext id={status} items={issues}>
          <DroppableContainer status={status}>
            {issues.length ? (
              issues.map(issue => (
                <SortableIssueCard id={issue.id} key={issue.id} status={status}>
                  <IssueCard issue={issue} />
                </SortableIssueCard>
              ))
            ) : (
              <SortableIssueCard id={0} status={status}>
                <IssueCard issue={null} />
              </SortableIssueCard>
            )}
          </DroppableContainer>
        </SortableContext>
      </Column>
    )
  );
});
