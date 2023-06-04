import { Avatar, Card, Divider, Typography } from "antd";
import { memo } from "react";
import styled from "styled-components";

import { Issue } from "@/api";
import { getIssueDays, GITHUB_URL } from "@/utils";

import { Box } from "../../UI/Box";

const IssueContainer = styled(Card)({
  margin: "8px",
});

type IssueCardProps = {
  issue: Issue | null;
};

export const IssueCard = memo((props: IssueCardProps) => {
  const { issue } = props;

  console.log("card");

  const issueDaysOld = issue ? getIssueDays(issue.created_at) : "";

  return issue ? (
    <IssueContainer size="small">
      <Typography.Title level={5}>{issue.title}</Typography.Title>

      <Typography.Paragraph>
        {`#${issue.number} opened ${issueDaysOld}`}
      </Typography.Paragraph>

      {issue.assignee && (
        <Box display="flex" justifyContent="flex-end">
          <Avatar src={issue.assignee.avatar_url} alt="Avatar" />
        </Box>
      )}

      <Box display="flex" justifyContent="space-between">
        <Typography.Link href={`${GITHUB_URL}${issue?.user.login}`}>
          {issue.user.login}
        </Typography.Link>

        <Divider type="vertical" />

        <Typography.Text>{`Comments: ${issue.comments}`}</Typography.Text>
      </Box>
    </IssueContainer>
  ) : (
    <Box style={{ height: "100%" }} />
  );
});
