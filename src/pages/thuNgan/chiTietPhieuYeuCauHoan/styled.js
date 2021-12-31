import styled from "styled-components";
export const Main = styled.div`
  background: #f4f5f7;
  height: calc(100vh - 60px);
  & .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      color: #172b4d;
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      margin-bottom: 0px;
      margin-right: 10px;
    }
    .action {
      .icon-search {
        margin-right: 10px;
      }
    }
  }
  & .thong-tin-so-tien {
    background: #f3f7ff;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
  }
  & .thong-tin-phieu {
    background: #fff;
    padding: 10px;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  }
  .btn-ok {
    background: #0762f7;
    padding: 6px 20px;
    border-radius: 8px;
    float: right;
    color: #fff;
    height: 45px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: flex-end;
    margin-right: 15px;
    :hover {
      background: #054ab9;
    }
    .anticon-check {
      padding: 5px;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #fff;
      svg {
        width: 15px;
        height: 15px;
      }
    }
  }
  .icon-list {
    margin-left: 5px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
export const InputSearch = styled("div")`
  box-sizing: border-box;
  margin-right: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 3px 8px;
  width: 400px;
  position: relative;
  background: #fff;
  box-shadow: ${(props) =>
    props.focus ? "0 0 0 3px #0062ff47 !important" : null};
  border: ${(props) =>
    !props.focus ? "2px solid #dfe1e6;" : "1px solid #0762f7 !important"};
  :hover {
    border: 1px solid #0762f7 !important;
    box-shadow: 0 0 0 3px #0062ff47;
  }
  .anticon-search {
    margin: 0 10px;
  }
  img {
    margin: 0 10px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    border: none !important;
    box-shadow: none !important;
    :hover {
      border: none !important;
      box-shadow: none !important;
    }
    :focus {
      border: none !important;
      box-shadow: none !important;
    }
  }
`;
