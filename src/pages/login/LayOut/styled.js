import styled from "styled-components";
import bgPage from "assets/images/login/bg_login_sakura.png";
const Main = styled.div`
  font-family: Nunito Sans, sans-serif;
  margin: 30px;
  @media (max-width: 1414px) {
    margin: 1.5em;
  }
  .content-left {
    height: 873px;
    margin: 0 15px 0 10px;
    padding: 140px 30px 20px;
    border-radius: 64px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${bgPage});
    @media (max-width: 1610px) {
      padding: 32px ​24px 20p;
    }
    @media (max-width: 1414px) {
      padding: 30px 25px 15px;
    }
    .title {
      font-size: 44px;
      line-height: 60px;
      color: #ffffff;
      padding: 0 30px;
      @media (max-width: 1610px) {
        padding: 0 15px;
      }
      @media (max-width: 1414px) {
        padding: 0 15px;
        font-size: 40px;
      }
      @media (max-width: 1200px) {
        font-size: 35px;
      }
    }
    .content-title {
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      color: #ffffff;
      padding-bottom: 29px;
    }
    .list-category {
      margin-bottom: 40px;
      @media (max-width: 1414px) {
        margin-bottom: 35px;
      }
      .box-list-module {
        max-height: 535px;
        overflow-y: scroll;
        @media (max-width: 1414px) {
          max-height: 465px;
        }
        > div {
          &:nth-child(1),
          &:nth-child(2) {
            .item {
              margin-top: 0;
            }
          }
          &:nth-child(2) {
            .item {
              @media (max-width: 767px) {
                margin-top: 35px;
              }
            }
          }
        }
      }
      .item {
        margin: 40px 30px 0;
        background: #ffffff;
        box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
        border-radius: 16px;
        @media (max-width: 1414px) {
          margin: 35px 15px 0;
        }
        &:hover {
          transform: scale(1.11);
          transition: 0.5s all;
          cursor: pointer;
        }
        &--bg {
          border-bottom: 4px solid #ef4066;
          border-radius: 16px 16px 16px 0;
          height: 183px;
          text-align: center;
          background: #56ccf2;
          @media (max-width: 1414px) {
            height: 150px;
          }
          img {
            object-fit: cover;
            max-width: 100%;
            height: calc(100% + 1px);
            border-radius: 16px 16px 16px 0;
          }
        }
        &--content {
          display: flex;
          font-weight: bold;
          font-size: 24px;
          line-height: 33px;
          color: #172b4d;
          padding: 17px 20px 13px;
          @media (max-width: 1200px) {
            font-size: 22px;
          }
        }
        &--icon {
          margin-left: auto;
          img {
            max-width: 30px;
          }
        }
      }
    }
  }
`;

export { Main };
