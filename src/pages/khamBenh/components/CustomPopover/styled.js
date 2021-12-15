import styled , {createGlobalStyle} from "styled-components";

export const ContentWrapper = styled("div")`
  width: ${(props) => (props.width ? `${props.width}px` : "600px")};
  position: relative;
  z-index: 1001;
  background: white;
  padding: ${(props) => (props.overlayClassName ? `10px` : "0px")};
  .content-popover {
    z-index: 100;
    .popover-btn-list {
      display: flex;
      justify-content: flex-end;
      button {
        height: auto;
        padding: 6px 32px;
        margin: 0 8px;
        border-radius: 8px;
        border: 1px solid #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        @media (max-width: 1366px) {
          padding: 4px 20px;
        }
      }
      &__cancel {
        margin-left: 18px;
        background: #ffffff;
        @media (max-width: 1366px) {
          margin-right: 0.5em;
        }
      }
      &__ok {
        background: #0762f7;
        color: white !important;
      }
    }
  }
`;
// export const GlobalStyled = createGlobalStyle`
//     .custom-popover {
//       z-index: 100;
//     }
// `;

export const GlobalStyled = createGlobalStyle`
.custom-popover {
  z-index: 50;
}
.popover-custom-all{
  .ant-popover-inner-content{
    padding: 0px !important;
  }
  .ant-popover-arrow{
    z-index: 1001;
  }
  &_res{
      .ant-form{
        padding: 8px 8px 0px 8px;
        .ant-form-item-label{
          padding : 0px ; 
        }
        .ant-form-item{
          margin-bottom : 15px !important;
        }
      }
  }
  label {
      /* margin-bottom: 4px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 600;
      color: #172b4d; */
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
          display: none !important;
        }
      }
    }
  }
  
`;