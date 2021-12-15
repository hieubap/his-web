import styled, {css} from "styled-components";

export const Main = styled.div`
  line-height: 25px;
  ${props => props.displayDot && css`
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
    20px;
  background-position-y: 7px;
  background-size: 5px 25px;`}
  .label {
    padding-right: 5px;
    background: #ffffff;
  }
  .content-editable {
    outline: 0;
  }
  &.input_custom{
    line-height: ${(props) => (props.lineHeight ? props.lineHeight + "px" : "25px")};
    background-position-y: ${(props) => (props.backgroundPositionY ? props.backgroundPositionY + "px" : "7px")};
    margin-top: ${(props) => (props.marginTop && props.marginTop + "px" )};
  }
`;
