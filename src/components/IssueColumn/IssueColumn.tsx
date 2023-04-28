import { blue } from "@ant-design/colors";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Typography } from "antd";
import styled from "styled-components";

import { Issue } from "@/api";

import { Status } from "../Board/Board";
import { Box } from "../Box";
import IssueCard from "../IssueCard/IssueCard";
import SortableIssueCard from "../SortableIssueCard/SortableIssueCard";

type Props = {
  issues: Issue[];
  title: string;
  status: Status;
};

const Column = styled(Box)({
  height: "100%",
  flex: 1,
  width: "24rem",
  margin: "0 auto",
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: blue[0],
  boxShadow: "2px 4px rgba(0, 0, 0, 0.06)",
});

const Title = styled(Typography.Title)({
  position: "sticky",
  top: "10px",
  zIndex: 100,

  backgroundColor: blue[0],
});

export const IssueColumn = (props: Props) => {
  const { issues, title, status } = props;

  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      status: status,
    },
  });

  return (
    <SortableContext items={issues}>
      <Box>
        <Column ref={setNodeRef}>
          <Title level={4}>{title}</Title>
          {issues.map(issue => (
            <SortableIssueCard id={issue.id} key={issue.id} status={status}>
              <IssueCard issue={issue} status={status} />
            </SortableIssueCard>
          ))}
        </Column>
      </Box>
    </SortableContext>
  );
};
