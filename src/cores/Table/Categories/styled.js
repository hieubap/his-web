import styled from 'styled-components';
import { A4 } from 'components/constanst';

const width = A4.width - 48;
export const inputColWidth = width*0.05;

const Main = styled('div')`
  & table {
    border: solid 1px;
  }

  & .total-col {
    width: ${width*0.07}px;
    text-align: center;
  }

  & .number-col {
    width: ${width*0.05}px;
  }  
  
  & .name-col {
    width: ${width*0.18}px; 
  }
  
  & .num-col {
    width: ${width*0.05}px;
  }
  
  & .date-col {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    & .date-render {
      position: absolute;
      z-index: 1;
      pointer-events: none;
    }
  }
`;

export { Main };
