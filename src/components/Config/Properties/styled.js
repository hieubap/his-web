import styled from 'styled-components';

const Main = styled('div')`
  position: relative;
  
  & .c-name-label {
    text-align: right;
    line-height: 24px;
    color: #0D0D0D;
  }
  
  & .component-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  & .properties-contain {
    height: calc(100vh - 322px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  & .props-form-item {
    margin-bottom: 0;
  }
  
  & .delete-btn {
   min-width: 30px;
  }

`;

export { Main };
