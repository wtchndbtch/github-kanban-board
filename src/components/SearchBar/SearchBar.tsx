import { yellow } from "@ant-design/colors";
import { FrownFilled, StarFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Space, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  getIssuesData,
  getRepoInfo,
  setIsError,
} from "@/store/issueLists-slice";
import { GITHUB_URL, isValidRepoUrl } from "@/utils";
import { getIssuesPayload } from "@/utils";

import { Box } from "../Box";

const INPUT_PLACEHOLDER = "Enter your repository URL";

const SearchBarContainer = styled(Space.Compact)({
  width: "100%",
  marginBottom: "1rem",
});

const SearchButton = styled(Button)({
  "&.ant-btn-dangerous:disabled": {
    color: "#ffffff",
    backgroundColor: "#da3760",
    borderColor: "transparent",
  },
});

const Container = styled(Box)({
  width: "100%",
  flexDirection: "column",
  padding: "1rem",
});

const Star = styled(StarFilled)({
  color: yellow[5],
  fontSize: "18px",
  padding: "0 1rem",
});

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, repoInfo } = useAppSelector(
    state => state.issues
  );
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;

    setInputValue(url);
    dispatch(setIsError(!isValidRepoUrl(url)));
  };

  const handleClick = () => {
    // setError => true | show notificaiton "Please enter repository url"
    if (!inputValue) return;

    const payload = getIssuesPayload(inputValue);

    dispatch(getRepoInfo(payload));

    dispatch(getIssuesData(payload));

    setInputValue("");
  };

  return (
    <Container display="flex" justifyContent="center">
      <SearchBarContainer>
        <Input
          disabled={isLoading}
          onChange={handleChange}
          status={isError ? "error" : ""}
          placeholder={INPUT_PLACEHOLDER}
          value={inputValue}
        />

        <SearchButton
          type="primary"
          danger={isError}
          disabled={isError}
          loading={isLoading}
          onClick={handleClick}
          icon={isError && <FrownFilled />}
        >
          Load Issues
        </SearchButton>
      </SearchBarContainer>
      {repoInfo && (
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
      )}
    </Container>
  );
};
