import styled from "styled-components";

export const Main = styled.div`
  /* #FFFFFF */

  background: #ffffff;
  /* shadow-khung */

  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 8px;
  padding: ${(props) => (props.noPadding ? "0px" : "10px 16px")};
  margin-bottom: ${(props) => props.bottom || 16}px;
  margin-top: ${(props) => props.top || 0}px;
  overflow: hidden;
`;
