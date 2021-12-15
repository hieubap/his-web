import styled from "styled-components";
import { Row } from "antd"
export const PopoverWrapper = styled.div`
  margin-bottom: 26px;
  .ant-select {
    width: 100%;
  }
`;

export const ButtonCovid = styled(Row)`
    background: #f3f7ff; 
    width: 100%;
    align-items: center ;
    padding: 10px 20px;
    button{
      background: "#0762f7";
      color: "white";
      height: 36;
      width: 171;
      font-size: 15px;
      padding: 5px 20px;
    }
`;