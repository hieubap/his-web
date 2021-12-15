import styled from "styled-components";

const Nodes = styled.div`
  display: flex;
  position: relative;

  .card {
    border: 1px solid #c5cad3;
    border-radius: 50px;
    font-size: 13px;
    color: #172b4d;
    padding: 0px 20px;
    margin-left: 20px;
    text-align: center;
    background-color: white;
    z-index: 1;
    &.active {
      border-color: #049254;
      color: #7a869a;
    }
    &.in-active {
      background-color: #e8eaed;
      color: #7a869a;
    }
    .time-bottom {
      left: 5px;
      position: absolute;
      top: 25px;
    }
  }
  span {
    margin-left: 5px;
  }
  div:first-child {
    margin-left: 0;
  }
`;
const Chain = styled.div`
  position: absolute;
  height: 1px;
  top: 12px;
  background-color: #7a869a;
  width: 100%;
  z-index: 0;
`;

export { Nodes, Chain };