import styled from "styled-components";

export const Main = styled("div")`
  & .user-info {
    height: 60px;
    display: flex;
    align-items: center;

    & .user-name {
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
      margin: 0 10px;
      color: #fff;
    }
  }
  & .header-user-info {
    color: #fff;
  }

  & .dropdown-menu-header {
    margin-bottom: 0;
  }

  & .dropdown-menu {
    padding: 0;
  }

  & .ant-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
