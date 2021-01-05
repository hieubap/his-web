import styled from "styled-components";

const Main = styled("div")`
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize};
  justify-content: ${props => props.align};
  text-align: ${props => props.align};
  text-transform: ${props => props.textTransform };
  display: flex;
  .separator {
    width: 10px;
  }
  .edit-content-item {
    padding: 0 3px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      border-bottom: 2px dotted rgba(0, 0, 0, 0.4);
      bottom: 0;
      left: 0;
    }
  }
`;

export { Main };
