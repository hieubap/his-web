import styled from "styled-components";
export const Main = styled.div`
  width: 100%;
  border-radius: 5px;
  height: 100%;
  display: flex;
  background-color: #f8f9f9;

  .left-content {
    width: 80%;
    padding: 5px 10px;
    .right-content-body {
      border-radius: 10px;
      background-color: white;
      .left-title_top {
        padding: 10px 12px;
        border-bottom: 1px solid #dbdde4;
        font-weight: bold;
        font-size: 16px;
      }
      .left-title_bottom {
        height: 95%;
        width: 100%;
      }
    }
  }
  .right-content {
    width: 20%;
    background-color: white;
    .right-title {
      /* height: 44px; */
      font-size: 16px;
      font-weight: bold;

      .right-title_top {
        padding: 10px;
        border-bottom: 1px solid #dbdde4;
      }
      .right-title_bottom {
        padding: 5px;
        color: #42649d;
        font-size: 14px;
        border-bottom: 1px solid #dbdde4;
      }
    }
    .right-li {
      ul {
        li {
          padding: 5px 10px;
          display: flex;
          font-weight: bold;
          justify-content: space-between;
          /* .li-name {
            width: 80%;
          }
          .li-check {
            width: 20%;
          } */
        }
        li:nth-child(odd) {
          background-color: #e8eaed;
        }
        li:hover {
          background-color: #c1f0db;
        }
      }
    }

    .right-print {
      display: flex;
      justify-content: flex-end;

      .btn-print {
        margin-right: 10px;
        padding: 10px;
        border-radius: 8px;
        height: 38px;
        background-color: #0762f7;
        color: white;
        display: flex;
        align-items: center;
      }
    }
  }
`;
