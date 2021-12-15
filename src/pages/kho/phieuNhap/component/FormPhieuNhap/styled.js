import styled from "styled-components";

export const Main = styled.div`
  padding: 10px 20px;
  border-left: 1px solid #ccd1d8;
  & .ant-form-item {
    /* margin-bottom: 15px; */
    & .ant-form-item-label {
      padding-bottom: 2px;
      font-size: .5rem;
      font-weight: 650;
      > label {
        color: #172b4d;
      }
    }
    & .ant-form-item-control {
      
    }
  }

  & .action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .button-cancel {
        margin-right: 18px;
        background: #ffffff;
        @media (max-width: 1366px) {
          margin-right: 0.5em;
        }
      }
      .button-ok {
        background: #08cfde;
        color: white;
      }
      button {
        cursor: pointer;
        height: auto;
        padding: 6px 32px;
        border-radius: 8px;
        border: 1px solid #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        @media (max-width: 1366px) {
          // font-size: 14px;
          padding: 4px 20px;
        }
      }
  }
`;