import styled from "styled-components";
import { Button } from "antd";

export const ButtonMain = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: 1px solid #7a869a;
  border-radius: 8px;
  height: 38px;
  margin: 2px;
  & .button-content {
    flex: 1;
    margin: 0 5px;
    color: #172b4d;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
  &.primary {
    background: #0762f7;
    border: 1px solid #0762f7;
    & .button-content {
      color: #fff;
    }
  }
`;
