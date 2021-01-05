import styled from "styled-components";

export const Main = styled('div')`
  padding: 0 12px;
  & .list-medical-code{
    display: block;
    .ant-select-selection-selected-value{
      float: none;
      p {
          margin-bottom: 0;
      }
        
    }
    .ant-select-selection--single {
        height: auto;
    }
    .ant-select-selection__rendered{
      line-height: initial;
      padding: 10px 0;
      min-height: 35px;
      &:after {
          display: none;
      }
    }
    .ant-select-dropdown-menu-item{
      margin-bottom: 1px solid #dedede;
      p {
          margin-bottom: 0;
      }
    } 
    .medical-name {
        font-weight: bold;
    }
  }
  & .radio-group {
    display: flex;
    border-radius: 0;
    .ant-radio-button-wrapper{
        width: 50%;
        text-align: center;
    }
  }
`