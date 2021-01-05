import styled from 'styled-components';

const Main = styled('div')`
  & input {
    height: 0;
    border: none;
    padding: 0;
  }

  & span {
    line-height: 24;
  }
  
  & .react-codes-input__component {
    position: relative;
  }
  
  & .react-codes-input__component input {
    top: -8px;
  }
  
  & .react-codes-input__component {
    height: 20px;
  }
  
  & .react-codes-input__entered-value {
    line-height: 20px;
  }
  
  & .react-codes-input__active {
    line-height: 20px;
  }
  div[class*="react-codes-input__component"] {
    height: 20px;
  }
`;

export { Main };
