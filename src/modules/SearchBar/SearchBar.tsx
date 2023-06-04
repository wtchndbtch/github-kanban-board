import { FrownFilled } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "@/store";
import { getInitialIssueLists, getIssuesData } from "@/store/issueLists-slice";
import { getInitialRepoInfo, getRepoInfo } from "@/store/repoInfo-slice";
import { isValidRepoUrl } from "@/utils";
import { getIssuesPayload } from "@/utils";
import { loadStoredData } from "@/utils/localStorage";

import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Box } from "../../UI/Box";

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

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.issues);

  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  const [payloadValue, setPayloadValue] = useState("");
  const [isStored, setIsStored] = useState(false);

  useEffect(() => {
    if (!payloadValue) return;

    const storedRepoInfo = loadStoredData(payloadValue);
    const storedIssues = loadStoredData(`${payloadValue}/issues`);

    if (storedRepoInfo && storedIssues) {
      setIsStored(true);

      dispatch(getInitialRepoInfo(storedRepoInfo));
      dispatch(getInitialIssueLists(storedIssues));

      return;
    }
  }, [payloadValue, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;

    if (!isValidRepoUrl(url)) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    setInputValue(url);
  };

  const handleClick = () => {
    // setError => true | show notificaiton "Please enter repository url"
    if (!inputValue) return;

    const payload = getIssuesPayload(inputValue);

    setPayloadValue(`${payload.owner}${payload.repo}`);

    if (!isStored && payloadValue) {
      dispatch(getRepoInfo(payload));

      dispatch(getIssuesData(payload));
    }

    // dispatch(getRepoInfo(payload));

    // dispatch(getIssuesData(payload));

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

      <Breadcrumbs />
    </Container>
  );
};
