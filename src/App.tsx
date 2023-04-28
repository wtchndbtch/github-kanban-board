import { Board } from "@components/Board";
import { SearchBar } from "@components/SearchBar";
import styled from "styled-components";

import { Box } from "./components/Box";

const MainContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "80%",
  margin: "0 auto",
});

function App() {
  return (
    <MainContainer>
      <SearchBar />

      <Board />
    </MainContainer>
  );
}

export default App;
