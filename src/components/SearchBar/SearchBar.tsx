import { FrownFilled } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useState } from "react";
import styled from "styled-components";

import { getUrl } from "@/api";
import { isValidRepoUrl } from "@/utils";

const INPUT_PLACEHOLDER = "https://github.com/facebook/react";

const SearchBarContainer = styled(Space.Compact)({
  width: "50%",
});

const SearchButton = styled(Button)({
  "&.ant-btn-dangerous:disabled": {
    color: "#ffffff",
    backgroundColor: "#ff4d4f",
    borderColor: "transparent",
  },
});

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;

    setInputValue(url);
    setError(isValidRepoUrl(url));
  };

  const handleClick = () => {
    // setError => true | show notificaiton "Please enter repository url"
    if (!inputValue) return;

    // TODO: dispatch action to make api request

    // const validValue = getValidUrl(inputValue);
    // console.log("🚀 ~ file: SearchBar.tsx:45 ~ validValue:", validValue);

    // if (validValue) {
    //   getUrl(validValue);
    //   setError(false);
    // } else {
    //   setError(true);
    // }
  };

  return (
    <SearchBarContainer>
      <Input
        onChange={handleChange}
        status={error ? "error" : ""}
        placeholder={INPUT_PLACEHOLDER}
      />

      <SearchButton
        type="primary"
        danger={error}
        disabled={error}
        // TODO pass loading state from store
        // loading
        onClick={handleClick}
        icon={error && <FrownFilled />}
      >
        Load Issues
      </SearchButton>
    </SearchBarContainer>
  );
};
