import styled from "styled-components";

interface BoxStyleProps {
  display?: "flex" | "block";
  color?: string;
  justifyContent?: "center" | "space-around" | "space-between" | "flex-end";
}

export const Box = styled.div<BoxStyleProps>(props => ({
  display: props.display || "block",
  justifyContent: props.justifyContent,
}));
