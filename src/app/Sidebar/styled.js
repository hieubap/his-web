import styled from "styled-components";

const Main = styled("div")`
  & .ant-menu {
    & svg > path {
      fill: currentColor;
    }
  }
  &.app-sidebar.sidebar-shadow {
    background-color: #0b4359;
    & svg {
      color: #fff;
    }
  }
  .vertical-nav-menu {
    margin: 0;
    padding: 0;
    position: relative;
    list-style: none;
    &::after {
      content: " ";
      pointer-events: none;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    & .mm-collapse:not(.mm-show) {
      display: none;
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
      transition: padding 300ms;
      padding: 0.5em 0 0 2rem;
      & > li {
        & > a {
          color: rgba(255, 255, 255, 0.65);
          height: 2rem;
          line-height: 2rem;
          padding: 0 0px 0 15px;
          &:hover {
            color: #000;
          }
          & .metismenu-icon {
            display: none;
          }
          &.mm-active {
            color: #000;
            background: #e0f3ff;
            font-weight: bold;
          }
        }
      }
      &:before {
        content: "";
        height: 100%;
        opacity: 1;
        width: 1.5px;
        background: #e0f3ff;
        position: absolute;
        left: 15px;
        top: 0;
        border-radius: 15px;
      }
    }
    &:before {
      opacity: 0;
      transition: opacity 300ms;
    }
    & li {
      & a {
        display: block;
        line-height: 2.4rem;
        height: 2.4rem;
        padding: 0 1.5rem 0 45px;
        position: relative;
        border-radius: 0.25rem;
        color: rgba(255, 255, 255, 0.65);
        white-space: nowrap;
        transition: all 0.2s;
        margin: 0.1rem 0;
        margin-left: -5px;
        & span {
          margin-left: -5px;
        }
        &:hover {
          background: #e0f3ff;
          text-decoration: none;
          & i {
            &.metismenu-icon {
              opacity: 0.6;
            }
            &.metismenu-state-icon {
              opacity: 1;
            }
            & svg {
              color: #000;
            }
          }
          color: #000;

          overflow: hidden;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &.mm-active {
          color: #3f6ad8;
          background: #e0f3ff;
          font-weight: bold;
        }
      }
      &.mm-active {
        & > a {
          font-weight: bold;
          color: #16aaff;
          & i.metismenu-state-icon {
            transform: rotate(-180deg);
          }
        }
      }
    }
    & i {
      &.metismenu-state-icon,
      &.metismenu-icon {
        text-align: center;
        width: 34px;
        height: 34px;
        line-height: 34px;
        position: absolute;
        left: 5px;
        top: 50%;
        margin-top: -20px;
        font-size: 1.5rem;
        opacity: 0.3;
        transition: color 300ms;
      }
      &.metismenu-state-icon {
        transition: transform 300ms;
        left: auto;
        right: 0;
      }
    }
  }

  .app-sidebar {
    &.sidebar-text-light {
      border-right: 0 !important;
      & .app-sidebar__heading {
        color: rgba(255, 255, 255, 0.6);
        &&::before {
          background: rgba(255, 255, 255, 0.5) !important;
        }
      }
      & .vertical-nav-menu {
        & li {
          & a {
            color: rgba(255, 255, 255, 0.7);
            & i {
              &.metismenu-icon {
                opacity: 0.5;
              }
              &.metismenu-state-icon {
                opacity: 0.5;
              }
            }
            &:hover {
              background: rgba(255, 255, 255, 0.15);
              color: #fff;
              & i {
                &.metismenu-icon {
                  opacity: 0.8;
                }
                &.metismenu-state-icon {
                  opacity: 1;
                }
              }
            }
            &.mm-active {
              color: rgba(255, 255, 255, 0.7);
              background: rgba(255, 255, 255, 0.15);
            }
          }
        }
        & ul {
          &:before {
            background: rgba(255, 255, 255, 0.1);
          }
          & > li {
            & > a {
              color: rgba(255, 255, 255, 0.6);
              &:hover {
                color: #fff;
              }
              &.mm-active {
                color: #fff;
                background: rgba(255, 255, 255, 0.15);
              }
            }
          }
        }
      }
    }
  }
`;

export { Main };
