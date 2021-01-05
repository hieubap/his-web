import styled from "styled-components";

export const Main = styled.div`
  padding: 12px;
  
  & .search-container {
    display: flex;
    justify-content: space-between;
    
    & .scan-suffix {
      color: #125872;
      font-size: 22px;
      cursor: pointer;
    }
    
    & .btn-scan {}
    
    & .btn-list{
    }
    
    .btn-scan, .btn-list {
      margin-left: 5px;
    }
    
    & .input-search{
      input {}
    }
  }
`;
