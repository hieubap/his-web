import styled from "styled-components";
export const HeaderSearch = styled.div`
  padding: 20px 40px;
  font-family: Nunito Sans, sans-serif;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  .input-search {
    background: #ffffff;
    border: 2px solid #049254;
    box-sizing: border-box;
    border-radius: 50px;
    display: flex;
    align-items: center;
    padding: 8px 14px 8px 12px;
    margin-right: 40px;
    box-shadow: ${(props) =>
      props.focusInput ? "0px 0px 0px 3px #01955447" : null};
    input {
      padding: 0 1em 0 0 !important;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      padding-right: 1em;

      &:hover {
        border: none !important;
        box-shadow: none !important;
      }
      &:focus {
        border: none !important;
        box-shadow: none !important;
      }
      &::placeholder {
        color: #7a869a;
      }
    }
    img {
      height: 18px;
    }
  }
  .button-gopage {
    button {
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      color: #054ab9;
      background: #ffffff;
      padding: 10px 16px;
      height: auto;
      background: #ffffff;
      border: 1px solid #0762f7;
      box-shadow: 0px 3px 0px #03317c;
      border-radius: 8px;
      margin-left: 10px;
      @media (max-width: 767px) {
        margin-top: 0.5em;
      }
      @media (max-width: 575px) {
        width: 100%;
        margin-left: 0px;
      }
      img {
        padding-left: 9px;
      }
    }
  }
  .next-partient {
    text-align: right;
    @media (max-width: 575px) {
      width: 100%;
    }
    button {
      padding: 6px 16px;
      background: #049254;
      box-shadow: 0px 3px 0px #026138;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #ffffff;
      border: none;
      height: auto;
      @media (max-width: 767px) {
        margin-top: 0.5em;
      }
      @media (max-width: 575px) {
        width: 100%;
      }
      img {
        padding-left: 21px;
      }
    }
  }
`;
export const TitleSearch = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #172b4d;
  padding-bottom: 4px;
`;
