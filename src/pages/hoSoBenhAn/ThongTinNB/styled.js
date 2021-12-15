import { Modal as MD } from "antd";
import { button } from "components/mixin";
import styled from "styled-components";
export const Modal = styled(MD)`
  .ant-modal-content {
    height: 1105px;
  }

  .title-header{
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .button {
    ${button};
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    height: 37px;
    padding: 8px 16px;
    min-width: 110px;
    span {
      margin-right: 5px;
    }
    &-back {
      background: #ffffff;
      color: #172b4d;
      padding: 8px 30px;
      width: fit-content;
      border: 1px solid #0762f7;
      margin-left: 30px;
    }
    &-danger {
      background: #fc3b3a;
      mix-blend-mode: normal;
      width: fit-content;
      box-shadow: 0px 3px 0px #7e1d1d;
      border-radius: 8px;
    }
    &-sucess {
      background: #049254;
      mix-blend-mode: normal;
      box-shadow: 0px 3px 0px #026138;
      border-radius: 8px;
    }
    &-save {
      width: 200px;
    }
    &-emergency {
      width: 281px;
      height: 36px;
      left: 976px;
      bottom: 30px;

      /* #08CFDE */

      background: #08cfde;
      mix-blend-mode: normal;
      box-shadow: 0px 3px 0px #08b3c0;
      border-radius: 8px;
    }
  }
`;
