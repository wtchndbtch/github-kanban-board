import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Card, Divider, Typography } from "antd";
import { memo } from "react";
import styled from "styled-components";

import { Issue } from "@/api";
import { getIssueDays, GITHUB_URL } from "@/utils";

import { Status } from "../Board/Board";
import { Box } from "../Box";

const IssueContainer = styled(Card)({
  margin: "8px",
});

type Props = {
  issue: Issue;
  status: Status;
};

const IssueCard = (props: Props) => {
  const { title, number, created_at, id, assignee, comments, user } =
    props.issue;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      status: props.status,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const issueDaysOld = getIssueDays(created_at);

  return (
    <IssueContainer
      size="small"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Typography.Title level={5}>{title}</Typography.Title>

      <Typography.Paragraph>{`#${number} opened ${issueDaysOld}`}</Typography.Paragraph>

      {assignee && (
        <Box display="flex" justifyContent="flex-end">
          <Avatar src={assignee.avatar_url} alt="Avatar" />
        </Box>
      )}

      <Box display="flex" justifyContent="space-between">
        <Typography.Link href={`${GITHUB_URL}${user.login}`}>
          {user.login}
        </Typography.Link>

        <Divider type="vertical" />

        <Typography.Text>{`Comments: ${comments}`}</Typography.Text>
      </Box>
    </IssueContainer>
  );
};

export default IssueCard;
