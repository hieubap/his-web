import styled from 'styled-components';

const Main = styled('div')`
  width: 100%;
  
  & .zoom-tool {
    display: flex;
    align-items: center;
    
    & .slider-tool {
      width: 80px;
      margin: 3px 6px 0 6px;
    }
  }
  
  & .extra-content {
    display: flex;
    justify-content: flex-end;
    
    & .extra-item {
      margin-left: 12px;
    }
    
    & .type-form-tool {
      display: flex;
      align-items: center;
    }
  }
  
  & .ant-card-extra {
    width: 60%;
  }

  & .props-form-item {
    margin-bottom: 0;
  }
  
  & .ant-upload.ant-upload-select {
    display: block;
  }
  
  & .ant-form-item-control {
    line-height: 1;
  }
  
  & .ant-form-item-label {
    line-height: 24px;
  } 
`;

export { Main };
