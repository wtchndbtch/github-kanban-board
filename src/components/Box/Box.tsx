import styled from "styled-components";

interface BoxStyleProps {
  display?: "flex" | "block";
  color?: string;
}

export const Box = styled.div<BoxStyleProps>(props => ({
  display: props.display || "block",
}));
