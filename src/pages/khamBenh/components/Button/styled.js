import styled from "styled-components";
import { Button } from 'antd'

export const ButtonWrapper = styled(Button)`
  cursor: pointer;
  height: auto;
  padding: 8px 16px;
  margin: 0 8px;
  border-radius: 8px;
  border: 1px solid #0762f7;
  box-shadow: 0px 3px 0px #03317c;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #172b4d;
  &:focus {
    outline: none;
    transform: scale(1.03);
    animation: 0.05;
  }
  @media (max-width: 1366px) {
    padding: 4px 12px;
  }
  &.cancel {
    background: #ffffff;
    @media (max-width: 1366px) {
      margin-right: 0.5em;
    }
  }
  &.ok {
    background: #0762f7;
    color: white !important;
  }
`;
