import { Card, Typography } from "antd";
import styled from "styled-components";

import { Issue } from "@/api";

import { Box } from "../Box";
import { IssueCard } from "../IssueCard";

type Props = {
  issues: Issue[];
  title: string;
};

const Column = styled(Card)({
  width: "24rem",
  margin: "0 auto",
  overflow: "auto",
});

export const IssueColumn = (props: Props) => {
  const { issues, title } = props;

  return (
    <Box>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Column>
        {issues.map(issue => (
          <IssueCard key={issue.number} issue={issue} />
        ))}
      </Column>
    </Box>
  );
};
