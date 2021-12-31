import styled, { createGlobalStyle } from "styled-components";
import { Modal, Popover } from "antd";
export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    background: #03317c;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px 16px 0 0;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
  & .action-group {
    display: flex;
    justify-content: center;
    & .btn-action {
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 5px;
      outline: none;
      color: #0762F7;
      cursor: pointer;
      :hover {
        text-decoration: underline;
        color: #004ac3;
      }
      :active {
        color: #0762F7;
      }
    }
  }
`;
export const Main = styled.div`
  .main__container {
    margin: 0 !important;
  }
  .header-table {
    padding: 8px 17px 8px 30px;
    flex-flow: initial;
    align-items: center;
    &__left {
      white-space: nowrap;
      font-weight: bold;
      font-size: 18px;
      color: #ffffff;
    }
    &__right {
      margin-left: auto;
      img {
        cursor: pointer;
      }
    }
  }
  .ant-table-body {
    .ant-table-row {
      &.active {
        .ant-table-cell {
          background: #c1f0db;
        }
      }
    }
  }
`;
export const ContentTable = styled.div`
  overflow: hidden;
  border-top: 2px solid #ef4066;
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
`;
export const PopoverStyled = styled(Popover)``;
export const SearchDate = styled.div`
  display: inline-block;
  position: relative;
  input {
    color: #7A869A;
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    width: 205px;
  }
`;

export const GlobalStyles = createGlobalStyle`
  .popover-modal-date-custom{
    top: 133px !important;
    width: ${props => props.width + "px"};
    height: ${props => props.height === "auto" ? props.height : props.height + "px"};
    .footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      justify-content: flex-end;
      margin-bottom: 16px;
      padding-right : 20px;
      div:nth-child(1){
        border: 1px solid #0762F7;
        border-radius: 8px;
        padding : 6px;
        margin-right : 10px;
        cursor: pointer;
        &:hover{
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #0762F7;
        }
        &:active {
          background: white;
          box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.5);
        }
      }
      div:nth-child(2){
        background: #0762F7;
        border-radius: 8px;
        color: white;
        padding : 8px;
        cursor: pointer;
        &:hover{
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #0762F7;
        }
        &:active {
          background: #0762F7;
        }
      }
    }
    .date-name-first{
      width: 280px
    }
    .date-name-seccond{
      width: 280px
    }
    .ant-picker-dropdown{
      top: 75px !important;
      .ant-picker-panel-container{
        box-shadow: none;
        border: 1px solid #0000000d
      }
    }
    .title-dropdow{
      font-family: Nunito Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      padding: 8px 16px;
      background: linear-gradient(0deg, rgba(23, 43, 77, 0.1), rgba(23, 43, 77, 0.1)), #FFFFFF;
    }
    .ant-popover-inner-content{
      height: ${props => props.height === "auto" ? props.height : props.height + "px"};
      padding : 6px ;
    }
    .ant-popover-arrow{
      display: none;
    }
    .content-popover{
      &_button {
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #0762F7; border-radius: 4px;
        margin-bottom: 6px;
        padding: 6px;
        cursor: pointer;
        font-family: Nunito Sans;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
        letter-spacing: 0px;
        text-align: left;
        &.active{
          background: #0762F7;
          color: white;
          &:hover{
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #0762F7;
          }
          &:active {
            background: #0762F7;
          }
        }
      }
    }
  }
`;
