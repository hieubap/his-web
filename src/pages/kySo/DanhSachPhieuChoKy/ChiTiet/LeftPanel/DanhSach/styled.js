import styled from "styled-components";
import { Row , Input , Button, Popover } from "antd";
import bgPageBottom from "assets/images/kho/calendar.png";
export const Main = styled(Row)`

  .ant-modal {
    .ant-modal-confirm {
      .ant-modal-confirm-confirm {
        .notification {
          .ant-modal-content {
            width: 100px !important;
            .ant-modal-body {
              .ant-col {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
  .notification {
    width: 100px !important;
  }

  &.main {
    position: relative;
    margin-left: 15px;
    .box {
      &-item {
        .ant-checkbox-inner {
          border-color: #b9b9b9;
        }
      }
    }
    .header {
      .content-note {
        display: flex;
        .ant-select {
          margin-right: 10px;
          .ant-select-selector {
            border-radius: 20px;
            width: 250px;
            display: block;
            @media (max-width: 768px) {
              width: 180px;
            }
            .ant-select-selection-item {
              font-weight: 600;
              line-height: 30px;
              color: #172b4d;
            }
            .ant-select-selection-placeholder {
              color: #7a869a;
              font-weight: 600;
            }
          }
        }
        .input-text {
          img {
            position: absolute;
            z-index: 6;
            bottom: 30px;
            margin-left: 10px;
          }
          .ant-input {
            background: #ffffff;
            border-radius: 17px;
            font-size: 14px;
            line-height: 24px;
            color: #172b4d;
            font-weight: 600;
            padding-left: 36px;
            width: 254px;
            @media (max-width: 768px) {
              width: 200px;
            }
            &::placeholder {
              color: #7a869a;
            }
          }
        }
        .icon-option {
          padding: 5px 0 0 14px;
          & img {
            cursor: pointer;
          }
          & img:first-child {
            padding-right: 16px;
          }
        }
      }
    }
    .ant-table-body {
      height: ${props => (props.isThemMoi ? 375 + "px" : `430px`)};
      max-height: unset !important;
      tr {
        td:first-child {
          padding-left: 12px !important;
        }
      }
      .box-item {
        .ant-checkbox {
          input:focus + span {
            border: 1px solid #1890ff;
            border-color: #1890ff;
          }
        }
      }
    }
    .ant-table-tbody {
      .ant-table-cell {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        padding: 10px !important;
        &:first-child {
          .title-box {
            padding-left: 12px !important;
          }
        }
        .ant-checkbox-wrapper {
          margin-left: 5px;
        }
      }
      .background-checked {
        background: #1c8aea47;
      }
    }
    .ant-table-tbody > tr.ant-table-row:hover > td {
      background: #c1f0db !important;
      cursor: pointer;
    }
    .ant-table-header {
      /* border-top: 4px solid #56ccf2; */
      border-radius: 20px 0px 0px 0px;
    }
    .table {
      margin-top: -12px;
      .ant-table {
        .ant-table-container {
          .ant-table-header {
            .ant-table-cell{
              background : white;
            }
            table::before {
              /* border-top: solid 4px #ef4066; */
              /* border-top: none; */
              border-radius : unset;
            }
          }
        }
      }
    }
    .ant-pagination {
      margin-left: auto;
    }
  }
`;

export const InputSearch = styled.div`
  background: #ffffff;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px 8.5px;
  width: 459px;
  &:focus-within {
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    /* border: 0; */
  }
  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    &:focus {
      border: none;
      box-shadow: none;
    }
    &::placeholder {
      color: #7a869a;
    }
  }
  .icon-search {
    height: 15px;
  }
  .qr-search {
    height: 20px;
  }
`;

export const Header = styled.div`
    position: relative;
    width: 100%;
    .header {
        padding: 0 30px 0 30px;
        display: flex;
        align-items: center;
        background-color: white;
        box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        width: 100%;
        height: 60px;
        padding-left: 16px;
        &-row {
          width: 100% ;
          height: 100% ;
          align-items: center; 
          padding-bottom: 10px;
          justify-content:space-between;
        }
        .content {
            /* margin-top: -17px; */
            /* padding-top: 10px; */
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            /* line-height: 24px; */
            &-note{
                /* margin-top: -17px; */
                font-size: 14px;
                margin-left: 14px;
                height: 30px;
                /* line-height: 24px; */
                color: white;
                span{
                    font-weight: 900;
                }
            }
            @media screen and (min-width: 1200px) and (max-width: 1599px) {
                font-size: 15px !important;
                &-note {
                        font-size: 11px;
                    }
            }
            
        }
    }
`;

export const InputText = styled(Input)`
    border: 0px;
    padding: 0px;
    width: 100%;
    background: transparent;
    pointer-events: ${props => props.isAdvised ? "unset" : "none"};
    text-align: ${props => props.align ? props.align : "unset"};
`;
export const PopoverCash = styled.div`
    .input-discount{
      border: 0px;
      border-bottom: 1px solid grey;
      padding: 0;
      text-align: right;
      width: 100px
    }
    
   .button-choose{
    .percent{
      width : 44px;
      height : 22px;
      text-align : center;
      cursor: pointer;
      border-top : 1px solid gray;
      border-left : 1px solid gray;
      border-bottom : 1px solid gray;
    }
    .cash {
      width : 44px;
      height : 22px;
      text-align : center;
      cursor: pointer;
      border-top : 1px solid gray;
      border-right : 1px solid gray;
      border-bottom : 1px solid gray;
    }
    .action { 
      background : #0762F7;
      color : white;
    }
  }
  .range-picker{
    border: 0px;
    border-bottom: 1px solid grey;
  }
`;


export const ButtonBack = styled(Button)`
  height: 36px;
  color: #172b4d;
  font-style: normal;
  /* font-weight: 600; */
  font-size: 16px;
  background: #ffffff;
  mix-blend-mode: normal;
  border: ${props => (props.borderButtonBack ? props.borderButtonBack : "1px solid #0762f7" )} ;
  /* box-shadow: 0px 3px 0px #03317c; */
  border-radius: 8px;
  height: auto;
  &:hover,
  &:active,
  &:focus {
    background: #ffffff;
    color: #172b4d;
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

export const PopoverCustom = styled(Popover)`
  .ant-popover-inner-content{
    width: 484px
  }
`;
export const RangePickerCustom = styled.div`
  background: white;
  .ant-picker{
    border: 0px ;
    padding: 0px;
    .ant-picker-input{
      border: 1px solid #d9d9d9;
      .icon-suffix{
        width: 30px;
        height: 20px;
        background-image: url(${bgPageBottom});
        background-repeat: no-repeat;
      }
    }
  }
  .title-1{
    padding: 0px 10px; 
  }
  .ant-picker-active-bar{
    opacity: 0 !important;
  }
`;

export const ButtonNext = styled(Button).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  height: 36px;
  background: #0762f7;
  mix-blend-mode: normal;
  /* font-weight: 600; */
  font-size: 16px;
  /* box-shadow: 0px 3px 0px #03317c; */
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