import { Card, Typography } from "antd";

import { Issue } from "@/api";
import { getIssueDays } from "@/utils";

type Props = {
  issue: Issue;
};

export const IssueCard = (props: Props) => {
  const { title, number, created_at } = props.issue;

  const issueDaysOld = getIssueDays(created_at);

  return (
    <Card size="small">
      <Typography.Title level={5}>{title}</Typography.Title>
      <Typography.Paragraph>{`#${number} opened ${issueDaysOld}`}</Typography.Paragraph>
    </Card>
  );
};
