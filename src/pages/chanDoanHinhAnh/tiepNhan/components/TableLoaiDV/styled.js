import styled from "styled-components";

const Main = styled.div`
  position: relative;
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  background: #03317c;
  @media (max-width: 1400px) {
    margin-top: 1.5em;
  }
  .section-header {
    background: #03317c;
    border-radius: 16px 16px 0 0;
    height: min-content;
    width: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
    .create-title {
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      flex-basis: 15%;
      font-weight: bold;
      color: #ffffff;
      white-space: nowrap;
      @media (max-width: 1400px) {
        flex-basis: 20%;
      }
    }
    .btn-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      flex: 1;
      &__left {
        margin: 0 10px;
        .list-item {
          display: flex;
          align-items: center;
          .ant-select {
            width: 170px;
            .ant-select-selector {
              height: 40px;
              display: flex;
              align-items: center;
            }
            @media (max-width: 1400px) {
              width: unset;
            }
          }
        }

        .addition-box {
          display: flex;
          align-items: center;
          padding: 0 5px;
          margin: 3px 0;
          min-height: 33px;
          .input-box {
            width: 170px;
            border: 2px solid #dfe1e6;
            border-radius: 17px;
            position: relative;
            height: 34px;
            > img {
              position: absolute;
              top: 29%;
              left: 0;
              z-index: 1;
              padding: 0 8px;
            }
            input {
              border: none;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 17px;
              padding-left: 24px;
              font-weight: 600;
              color: #172b4d;
              font-size: 14px;
              &:placeholder-shown {
                font-weight: 600;
                font-size: 14px;
                color: #7a869a;
              }
            }
            @media (max-width: 1400px) {
              width: unset;
            }
          }
        }
      }
      &__right {
        display: flex;
        align-items: center;
        margin-left: auto;
        text-align: right;
        > img {
          margin: 15px;
          cursor: pointer;
        }
        .button-cancel {
          margin-right: 18px;
          background: #ffffff;
          @media (max-width: 1400px) {
            margin-right: 0.5em;
          }
        }
        .button-ok {
          background: #0762f7;
          color: white;
        }
        button {
          img {
            margin: 0 10px;
          }
        }
      }
    }
  }
  .element-page {
    margin: 8px auto;
    &:last-child {
      padding-bottom: 25px;
    }
  }

  .section-body {
    padding: 0 10px;
    border-top: 2px solid #ef4066;
    overflow: auto;
    border-radius: 20px 10px 10px 10px;
    background: #8e8888;
    > div {
      background: #ffffff;
      border-radius: 20px 0px 0px 0px;
    }
    .ant-table-body {
      overflow: hidden !important;
      max-height: unset !important;
      min-height: unset !important;
    }
    .collapse-content {
      overflow: auto;
    }
  }

  button {
    height: auto;
    padding: 8px 15px;
    border-radius: 8px;
    border: 1px solid #0762f7;
    box-shadow: 0px 3px 0px #03317c;
    font-weight: 600;
    font-size: 16px;
    color: #172b4d;
    @media (max-width: 1400px) {
      padding: 4px 10px;
    }
  }
  .nav-bottom {
    position: absolute;
    display: flex;
    bottom: 0;
    justify-content: center;
    width: 100%;
    z-index: 10;
    button {
      margin: 5px 10px;
      background: transparent;
    }
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  .content-equal-w {
    overflow-x: hidden;
    margin: 2px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .name-item {
      border: 1px solid #ff8d75;
      color: black;
      padding: 10px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      margin: 1px auto;
      .arrow-icon {
        color: #ffffff;
      }
      &:hover {
        background-color: #ff5733;
        color: #ffffff;
      }
    }
    .active-item {
      background-color: #ff5733;
      color: #ffffff;
    }
    .checkall {
      display: flex;
      align-items: center;
      padding: 5px;
      .text {
        margin-left: 4px;
      }
    }
    .custom-list {
      border: 1px solid #f0f0f0;
      .item-even {
        background-color: #e7f0fe;
      }

      .row-item {
        display: flex;
        align-items: center;
        .left-box {
          width: 25px;
          display: flex;
          justify-content: center;
        }
        .right-box {
          padding: 4px 10px;
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            flex: 5;
          }
          .desc {
            flex: 3;
            display: flex;
          }
        }
      }
    }
    .title-table {
      padding: 10px;
      height: 40px;
      display: flex;
      align-items: center;
      background-color: #054ab9;
      color: #ffffff;
    }
    .content-body {
      border: 1px dashed #049254;
      border-top: none;
      height: 100%;
      max-height: 430px;
      overflow: hidden;
      overflow-y: auto;
      .custom-tag {
        font-size: 14px;
        line-height: 20px;
        margin: 2px;
      }
    }
  }
  .content-left {
    margin-right: 8px;
    flex: 2;
  }
  .content-right {
    flex: 3;
    margin-left: 8px;
  }
  .title {
    background: #049254;
    color: #ffffff;
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__left {
      img {
        margin-right: 8px;
      }
    }
    &__right {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .main__container {
    margin-top: 0;
    .table-right {
      .ant-table-body {
        min-height: unset;
      }
    }
  }
  .group-service{
    overflow-x: hidden;
    flex-wrap: nowrap;
    display: flex;
    position: "relative";
    /* width: 725px; */
    .button-group-service {
      width: fit-content;
      border-radius: 20px;
      margin-bottom: 10px;
      border: 1px solid #99a2b1;
      color: #99a2b1;
      margin-right: 8px;
      &.active{
        background: #0762f7;
        color: white;
      }
    }
  }

  .navigation-right {
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    max-width: 20px;
  }
  .navigation-left{
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    max-width: 20px;
    img{
      transform: scaleX(-1)
    }
  }
`;
const StickyWrapper = styled.div`
  position: sticky;
  z-index: 2;
  top: 0;
  width: 100%;
  background-color: #ffff;
  .info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    line-height: 19px;
    &__left {
      span {
        font-weight: bold;
      }
    }
    &__right {
      span {
        font-weight: bold;
      }
    }
  }
`;

const BlankContentWrapper = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;

export { Main, BoxWrapper, StickyWrapper, BlankContentWrapper };
