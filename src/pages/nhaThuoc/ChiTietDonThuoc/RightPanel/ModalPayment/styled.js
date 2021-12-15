import styled from "styled-components";

export const ButtonWrapper = styled.div`
 
`;

export const Main = styled.div`
  font-family: Nunito Sans;
  .input-option {
    width: 150px; 
  }
  .row-item{
    margin-top: 20px;
    height: 30px;
    align-items: center;
    &.first {
      margin-top: 0px;
    }
    &.right {
      border-bottom: 1px solid #cecece;
    }
  }
  .container-right{
    background-color: #D5F1E5;
    border-radius: 4px;
    padding-bottom: 10px;
    height: fit-content;
  }
`;
