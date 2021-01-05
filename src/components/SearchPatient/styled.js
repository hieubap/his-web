import styled from "styled-components";

export const Main = styled.div`
  margin-bottom: 12px;
  
  & .search-input {
    width: 100%;
  }
  
  & .search-item {
    width: 100%;
  }
  
  & .select-search-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  & .group-filter {
    display: flex;
  }
`;
