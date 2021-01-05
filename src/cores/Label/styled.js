import styled from 'styled-components';

const Main = styled('div')`
  width: 100%;
  
  & .edit-contain {
    outline: none;
  }
  
  & .resize-contain {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export { Main };
