import styled from "styled-components";

const Main = styled("div")`
  & .app-header {
    background-color: #125872;
    height: 60px;
  }

  & .language-contain {
    display: flex;
    align-items: center;
  }

  & .language-title {
    color: rgba(255, 255, 255, 0.85);
    margin-left: 6px;
  }

  & .app-sider {
    background-color: #094359;

    & .ant-layout-sider-trigger {
      background-color: #125872;
    }
  }

  & .inpatient-sider {
    background-color: transparent;
  }

  & .layout-header {
    border-bottom: 3px solid #dedede;
  }
  & .ant-layout-content {
    height: calc(100vh - 60px);
  }
 
`;

export { Main };
