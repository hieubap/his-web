import styled from 'styled-components'

const Main = styled('span')`
  position: relative;
  border: ${props => props.border ? 'solid 1px #000' : 'none'};
  padding: ${props => props.border ? '3px' : 'unset'};
  
  & .tool-box {
    z-index: 15;
    opacity: 1;
  }
  
  & .calc-value {
    opacity: 0;
    position: absolute;
    z-index: 0;
    pointer-events: unset;
  }

  & .mark-span {
    display: inline-block;
    position: absolute;
    cursor: text;
    z-index: 0;
    height: ${props => props.offsetMark + 3 || 21}px;
    border-bottom: ${props => props.disabled || props.border ? 'none' : '1px dotted rgba(0, 0, 0, 0.3)'};
  }
  
  & .edit-available {
    outline: none;
  }

  & .extent-child {
    position: absolute;
    width: 540px;
    margin-left: 120px;
    z-index: 2;
    top: 0;
  }

  & .editing-content {
    z-index: 1;
    position: relative;
    color: #000;
  }
`;

export { Main }

export default Main;
