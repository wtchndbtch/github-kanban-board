import { Board } from "@components/Board";
import { SearchBar } from "@components/SearchBar";
import { Layout } from "antd";
import styled from "styled-components";

const Header = styled(Layout.Header)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function App() {
  return (
    <Layout>
      <Header>
        <SearchBar />
      </Header>
      <Board />
    </Layout>
  );
}

export default App;
