import { yellow } from "@ant-design/colors";
import { StarFilled } from "@ant-design/icons";
import { Breadcrumb, Typography } from "antd";
import styled from "styled-components";

import { useAppSelector } from "@/store";
import { GITHUB_URL } from "@/utils";

import { Box } from "../../UI/Box";

const Star = styled(StarFilled)({
  color: yellow[5],
  fontSize: "18px",
  padding: "0 1rem",
});

export const Breadcrumbs = () => {
  const { repoInfo } = useAppSelector(state => state.repoInfo);

  return (
    repoInfo && (
      <Box display="flex">
        <Breadcrumb
          separator={repoInfo.owner ? ">" : ""}
          items={[
            {
              title: repoInfo.owner,
              href: GITHUB_URL + repoInfo.owner,
            },
            {
              title: repoInfo.repo,
              href: GITHUB_URL + repoInfo.repo,
            },
          ]}
        />

        <Star />

        <Typography.Text>{`${repoInfo.stars} K stars`}</Typography.Text>
      </Box>
    )
  );
};
