import styled from "styled-components";

const Main = styled("div")`
  position: relative;
  padding-top: ${(props) => (props.mode === "config" ? "30px" : "0px")}
  
  & .table-tool {
    position: absolute;
    right: 0;
    top: -24px;
    z-index: 99;
  }
  
  & .td-contain {
    position: relative;
    height: 100%;
  }
  
  & .in-side-col {
    height: 100%;
    min-height: 24px;
    
    & .resize-col {
      height: 100%;
      background-color: ${({ theme }) => theme.primary};
      width: 3px;
      position: absolute;
      right: -3px;
      z-index: 1;
      display: none;
      cursor: col-resize;
    }
  }
  
  & .in-side-col:hover {
    & .resize-col {
      display: block;
    }
  }
  
  & .table-bar {
    display: ${(props) => (props.mode === "config" ? "block" : "none")}
    position: absolute;
    z-index: 1;
    height: 4px;
    width: 100%;
    cursor: pointer;
    top: -2px;
  }
  
  & .table-bar:hover {
    background-color: ${({ theme }) => theme.primary};
  }

  & table {
    
    border: solid 1px;
  
    & .col-selected {
      background-color: #E6F7FF;
    }
    
    & td {
      vertical-align: top;
      border-right: 1px solid #000;
      position: relative;
      padding: ${(props) => (props.mode === "config" ? "0" : "")};
      
      &:first-child {
        border-left: 1px solid #000;
      }
    }
    
    & tr {
      border-top: 1px solid #000;
      &:first-child{
        border-top: 0;
      }
    }

    & p {
      margin-bottom: 0;
    }
  }
 
  }
`;

export { Main };
