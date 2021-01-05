import styled from 'styled-components'

const Main = styled('div')`
  background-color: #fff;
  height: calc(100vh - 60px);
  overflow: hidden;


  & .layout-body {
    display: flex;
    width: 100%;
    position: relative;

    & .layout-middle {
      height: 100%;
      flex: 1;
    }
    
    & .layout-right-side {
      width: 25%;
      border-left: solid 2px #dedede;
      height: 100%;
    }
  }
`;

export { Main }
