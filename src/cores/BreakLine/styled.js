import styled from "styled-components";

const Main = styled("div")`
  & hr {
    margin: 0px;
    border-top: ${(props) =>
      (props.itemProps.weight || 1) +
      "px " +
      (props.itemProps.type || "solid")};
    border-top-color: ${(props) => props.itemProps.color || "#000"};
    margin-top: ${(props) => (props.itemProps.marginTop || 0) + "px"};
    margin-bottom: ${(props) => (props.itemProps.marginBottom || 0) + "px"};
    margin-left: ${(props) => (props.itemProps.marginLeft || 0) + "px"};
    margin-right: ${(props) => (props.itemProps.marginRight || 0) + "px"};
  }
  @media print {
    & .ant-btn {
      display: none;
    }
  }
`;

export { Main };
