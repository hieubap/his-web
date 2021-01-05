import styled from 'styled-components';

const Main = styled('div')`
  padding: 24px;
  
  & .form-item:hover {
    background-color: #dafaf9;
  }
  
  & .header-action {
    margin-bottom: 12px;
  }
  
  & .scroll-container {
    height: 540px;
    transition: all 0.3s;
    overflow-y: auto;
    
    &:hover {
      overflow-y: auto;
    }
    
    &::-webkit-scrollbar{
      width: 10px;
      height: 10px;
      background: #eee;
    }
    
    &::-webkit-scrollbar-thumb{
      background: rgba(0, 0, 0, 0.15);
      border-radius: 20px;
      position: absolute;
      left: 0;
    }
    
    .ant-menu-item > a {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ant-menu-vertical {
      border-right: 0;
    }
  }
  
  & .footer-action {
    margin-top: 12px;
  }
`;

export { Main };
