import { Spin } from "antd";
import styled from "styled-components";

import { Board } from "@/modules/Board";
import { SearchBar } from "@/modules/SearchBar";

import { useAppSelector } from "./store";
import { Box } from "./UI/Box";

const MainContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "80%",
  margin: "0 auto",
});

function App() {
  const { isLoading } = useAppSelector(state => state.issues);

  return (
    <MainContainer>
      <SearchBar />

      {isLoading ? <Spin size="large" /> : <Board />}
    </MainContainer>
  );
}

export default App;
