import styled,{ createGlobalStyle } from "styled-components";
import { Button, Select } from "antd";
export const Main = styled.div`
.ant-tree-node-selected{
  background-color: transparent !important;
}
  background: #ffffff;
  /* shadow-khung */

  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 8px;
  min-height: calc(100vh - 210px) !important;
  .info {
    padding: 10px 0px 10px 0px;
    h1 {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;

      color: #172b4d;
    }
    .header {
      display: flex;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 5px;
      .left {
        font-family: Nunito Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: left;
        padding-left: 10px;
      }
      .right {
        .text {
          font-family: Nunito Sans;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: 0px;
          text-align: left;
          color: #0762F7;
        }
        .title {
          font-family: Nunito Sans;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px;
          letter-spacing: 0px;
          text-align: left;
        }
        margin-left: 308px;
        .ant-btn {
          padding: 0px;
        }
        .btn-reset {
          mix-blend-mode: normal;

          border: 1px solid #7a869a;
          box-sizing: border-box;
          border-radius: 8px;
          width: 53px;
          height: 38px;
          margin-right: 10px;
        }
        .btn-save {
          width: 70px;
          height: 38px;

          background: #0762f7;
          mix-blend-mode: normal;
          border-radius: 8px;
          color: #fff;
          span {
            padding-right: 10px;
          }
        }
      }
    }
    .content {
      margin-top: 20px;
      padding-bottom: 30px;
      table {
        tbody {
          td {
            padding-right: 30px;
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;

            color: #172b4d;
          }
          tr {
            height: 15px;
          }
          .ant-select {
            width: 290px;
          }
        }
      }
    }
    .ant-form-vertical  {
          .ant-form-item{
            flex-direction: none;

          }
}
 
    .form-custom {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-top: 20px;
      &--one-line {
        display: block;
  
      }
     .ant-row {
        width: 100%;
        margin-bottom: 12px;
        padding-right: 0.75rem;
        padding-left: 0.75rem;
        font-weight: 600;
        color: #172b4d;
        .ant-form-item{
          flex-direction: unset;
        }
        .ant-col{
          width: auto;
        }
        .ant-form-item-control-input{
          width: 300px;
        }
        .ant-form-item-label {
          label {
            line-height: 16px;
            font-size: 14px;
            padding: 0 !important;
            width: 370px;
          }
        }
        .ant-select {
          width: 100%;
          background: #fff0;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          .ant-select-selection-placeholder,
          .ant-select-selection-item {
            color: #172b4d87;
            font-size: 16px;
            font-weight: 600;
          }
          .ant-select-selection-search {
            input {
              color: #172b4d;
              font-size: 16px;
              font-weight: 600;
            }
          }
          .ant-select-selection-item {
            color: #172b4d !important;
          }
        }
        textarea {
          font-weight: 600;
          font-size: 16px;
          border: 2px solid rgba(23, 43, 77, 0.1);
          box-sizing: border-box;
          border-radius: 3px;
          color: #172b4d;
          min-height: 120px;
          &::placeholder {
            font-size: 16px;
            color: #172b4d87;
          }
        }
        .input-option {
          width: 100%;
          font-weight: 600;
          font-size: 16px;
          color: #172b4d;
          width: 100%;
          &::placeholder {
            font-size: 16px;
            color: #172b4d87;
          }
        }
        label {
          margin-bottom: 4px;
          line-height: 16px;
          font-size: 14px;
          font-weight: 600;
          color: #172b4d;
          &.ant-form-item-required {
            &:after {
              display: inline-block;
              margin-right: 4px;
              color: red;
              font-size: 16px;
              font-weight: 600;
              font-family: inherit;
              line-height: 1;
              content: "*";
            }
            &:before {
              display: none;
            }
          }
        }
        input {
          ::placeholder {
            line-height: 20px;
            color: #7a869a;
            font-size: 16px;
            font-weight: 600;
          }
        }
        .ant-checkbox-wrapper {
          margin-right: 5pt;
        }
        .select-option {
          width: 100%;
          background: #fff0;
          border: 2px solid rgba(23, 43, 77, 0.1);
          box-sizing: border-box;
          border-radius: 3px;
        }
        .ant-select-selector {
          background: #fff0;
          font-weight: 500;
          color: #2f3035;
          border: none;
        }
        .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
          border: none;
        }
        .ant-input:focus,
        .ant-input-focused {
          border: none;
        }
        .ant-input:hover {
          border: none;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
        .input-option {
          width: 100%;
          font-weight: 600;
          height: 35px;
          background: #fff0;
          border: 2px solid rgba(23, 43, 77, 0.1);
          box-sizing: border-box;
          border-radius: 3px;
        }
        .ant-picker {
          width: 100%;
          font-weight: 600;
          height: 35px;
          background: #fff0;
          border: 2px solid rgba(23, 43, 77, 0.1);
          box-sizing: border-box;
          border-radius: 3px;
          &:hover {
            border: none;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
          }
        }
      }
    }
  }
  .ant-row {
    .main__container {
      margin-top: 0px;
      .ant-table-body {
        min-height: calc(100vh - 660px) !important;
      }
    }
  }
  .footer {
    padding-top: 10px;
    .video {
      display: flex;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #e6e6e6;
      align-items: center;
      .right {
        margin-left: auto;
        .btn-upload {
          border: none;
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 20px;
          color: #0762f7;
          img {
            padding-left: 10px;
          }
        }
      }
    }
  }
  .ant-select-selection-item{
    .ant-select-selection-item-content{
      .ant-checkbox{
        display : none
      }
    }
  }
`;
export const ButtonNext = styled(Button).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  margin-right : 6px;
  height: 36px;
  background: #0762f7;
  mix-blend-mode: normal;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0px 3px 0px #03317c;
  border-radius: 8px;
  border: 0;
  color: #ffffff;
  &:hover,
  &:active,
  &:focus {
    background: #2679ff;
    color: #ffffff;
  }
  .btn-checkout {
    &__text {
      vertical-align: text-bottom;
    }
    &__icon {
      margin-left: 5px;
    }
  }
`;
export const GlobalStyle = createGlobalStyle`
.dropdown-select-mainbox{
  .ant-select-item-option-state{
    padding-top: 5px;
  }
  .ant-select-item{
    padding : 0px ;
    &.table-row-even{
      background-color : white;
    }
    &.table-row-odd{
      background-color: #eaf0fe;
    }
    &.ant-select-item-option-selected{
      background-color : #c1f0db;
    }
    .ant-checkbox-wrapper {
      .ant-checkbox{
        padding-top: 5px;
        padding-left: 8px;
      }
      .title-option-checkbox{
        border-left: 1px solid #ececec;
        padding-top: 5px;
        padding-left: 10px;
        height: 29px;
        display: inline-block;
      }
  }
  }
}
`;