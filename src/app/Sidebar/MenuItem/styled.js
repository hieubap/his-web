import styled from "styled-components";

const Main = styled("div")`
  & .ant-menu {
    & svg > path {
      fill: currentColor;
    }
  }
  & .app-sidebar.sidebar-shadow {
    background-color: #0b4359;
    & svg {
      color: #fff;
    }

    & .vertical-nav-menu {
      margin: 0;
      padding: 0;
      position: relative;
      list-style: none;
      &::before {
        opacity: 0;
        transition: opacity 300ms;
      }
      &::after {
        content: " ";
        pointer-events: none;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
      & .mm-collapse {
        &:not(.mm-show) {
          display: none;
        }
      }
      & .mm-collapsing {
        position: relative;
        height: 0;
        overflow: hidden;
        transition-timing-function: ease;
        transition-duration: 0.25s;
        transition-property: height, visibility;
      }
      & ul {
        margin: 0;
        padding: 0;
        position: relative;
        list-style: none;
      }
      & li {
        a {
          display: block;
          line-height: 2.4rem;
          height: 2.4rem;
          padding: 0 1.5rem 0 45px;
          position: relative;
          border-radius: 0.25rem;
          color: #fff;
          white-space: nowrap;
          transition: all 0.2s;
          margin: 0.1rem 0;
          &:hover {
            background: #e0f3ff;
            text-decoration: none;
            & i.metismenu-icon {
              opacity: 0.6;
            }
            & i.metismenu-state-icon {
              opacity: 1;
            }
          }
        }
        &.mm-active {
          & > a {
            & i {
              &.metismenu-state-icon {
                transform: rotate(-180deg);
              }
            }
          }
        }
        & ul {
          margin: 0;
          padding: 0;
          position: relative;
          list-style: none;

          transition: padding 300ms;
          padding: 0.5em 0 0 2rem;
          &:before {
            content: "";
            height: 100%;
            opacity: 1;
            position: absolute;
            left: 20px;
            top: 0;
            border-radius: 15px;
            background: #e0f3ff61;
            width: 2px;
          }
          & li a {
            color: #fff;
            height: 2rem;
            line-height: 2rem;
            padding: 0 0px 0 12px;
          }
        }
        &.mm-active {
          & > a {
            font-weight: bold;
          }
        }
      }
    }
  }
`;

export { Main };
