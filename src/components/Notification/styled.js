import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  flex-direction: column;
  width: ${(props) => {
    return Math.min(400, props.width);
  }}px;
  & .button-read-all {
    align-self: flex-end;
  }
  & .list-notification {
    max-height: 450px;
    overflow: hidden;
    overflow-y: auto;
    margin-top: 10px;
  }

  & .item {
    display: flex;
    flex-direction: row;
    flex: 1;
    padding: 2px;
    cursor: pointer;
    $ .break-line
    {  
        background-color: #125872;
        height: 0.5px,
        margin: 2px 0,
    }
    & .date-area {
      padding-right: 10px;
      border-right: solid 0.5px #cacaca;
      & .date {
        color: #a6a6a6;
        font-weight: 300;
        margin-top: 2px;
        margin-bottom: 2px;
      }
    }
    & .item-content {
      flex: 1;
      margin-left: 10px;
      justify-content: center;
      display: flex;
      flex-direction: column;
      & .item-content-text {
        font-weight: 700;
      }
    }
  }
`;
export { Main };
