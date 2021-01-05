import styled from 'styled-components'

const Main = styled('div')`
  background-color: #001529;
  width: 100%;
  height: calc(100vh - 148px);
  padding-top: 12px;
  font-family: "Times New Roman", sans-serif;
  font-size: ${props => props.fontSize}pt;

  & .creation-contain {
    margin-right: auto;
    margin-left: auto;
    overflow-y: auto;
    overflow-x: ${({ layoutType }) => layoutType === 'default' ? 'hidden' : 'auto'};
    height: calc(100vh - 230px);
    background-color: #fff;
    width: 828px;
    padding: 12px;
  }
`;

const Content = styled('div')`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  transform: scale(${({ zoomValue }) => zoomValue});
  transform-origin: top left;
`;

export { Main, Content }
