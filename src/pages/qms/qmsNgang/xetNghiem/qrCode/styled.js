import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 87px;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding: 0 30.39px;
  @media (max-width: 750px) {
    width: 100%;
    height: 84.67px;
    margin: 0 -20px;
  }
  .qr-box__flat {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 93px;
    height: 87px;
    border-right: 2px solid #ffffff;
    @media (max-width: 750px) {
      width: auto;
      height: 100%;
    }
    .flat-image {
      width: 63px;
      height: 63px;
      @media (max-width: 750px) {
        width: 48px;
        height: 48px;
        margin-right: 18.67px;
      }
    }
  }

  .qr-box__content {
    @media (max-width: 750px) {
      font-size: 16.6667px;
      line-height: 27px;
      margin-left: 29px;
    }
    span {
      display: inline-block;
      font-size: 28px;
      line-height: 38px;
      @media (max-width: 750px) {
        width: auto;
      }
    }
  }

  .qr-box__button {
    margin-left: 44px;
    background: #FFFFFF;
/* #7A869A (Màu chữ phụ) */

border: 1px solid #7A869A;
box-sizing: border-box;
border-radius: 40px;
    @media (max-width: 750px) {
      margin-left: 40px;
    }
    .ant-btn-text {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 63px;
      width: 447px;
      box-sizing: border-box;
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
      border-radius: 90px;
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      background: #fff;
      @media (max-width: 750px) {
        width: 204px;
        height: 42px;
        font-size: 14.6667px;
        line-height: 27px;
      }
      .sufix-btn {
        width: 50px;
        height: 50px;
        margin-left: 11px;
        order: 1;
        object-fit: contain;
        @media (max-width: 750px) {
          width: 30.67px;
          height: 30.67px;
          margin-left: 7px;
        }
      }
      .sufix-input {
        border: none;
        width: 0px;
        height: 30px;
        opacity: 1;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 40px;
        ::placeholder {
          opacity: 1;
        }
        :focus {
          box-shadow: none;
        }
      }
      .activeFocus {
        z-index: 1000;
        width: 440px;
      }
      .closeFocus {
        z-index: 10;
        width: 0px;
        padding: 0;
      }
    }
  }
`;
