import { Card, Typography } from "antd";

import { Issue } from "@/interfaces";
import { getIssueDays } from "@/utils";

type Props = {
  issue: Issue;
};

export const IssueCard = (props: Props) => {
  const { title, number, date } = props.issue;

  const issueDaysOld = getIssueDays(date);

  return (
    <Card size="small">
      <Typography.Title level={5}>{title}</Typography.Title>
      <Typography.Paragraph>{`#${number} opened ${issueDaysOld}`}</Typography.Paragraph>
    </Card>
  );
};
