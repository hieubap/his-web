import styled from 'styled-components';

const Main = styled('div')`
  display: flex;
  min-width: 30px;
  flex-wrap: wrap;
  
  & .check-item {}
  
  & .check-item:first-child {
    margin-left: unset;
  }
  
  & .check-item-focused {}
`;

export { Main };
