import styled from 'styled-components';

export const Main = styled('div')`

  & .table-container {
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
    display: inline-block;
  }
  
  & .in-side-col {
    position: relative;
    
    & .mark-waiting {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    
    & .plus-btn {
      display: none;
      position: absolute;
      z-index: 1;
      left: -12px;
      bottom: -12px;
    }
  }
  
  & .in-side-col:hover {
    & .plus-btn {
      display: block;
    }
  }
`;
