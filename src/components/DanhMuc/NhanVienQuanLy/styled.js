import styled from "styled-components";
import { input } from "components/mixin";

export const ThongTinDichVuStyle = styled.div`
  .ant-table-body {
    max-height: calc(100vh - 500px) !important;
    min-height: calc(100vh - 500px) !important;
  }
  .action-header {
    margin-bottom: 0px !important;
  }
  .table-info {
    position: relative;
    .home-table-warrper {
      .button-left {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .item {
          box-shadow: none !important;
        }
        .button-header {
          img {
            display: none !important;
          }

          button {
            height: auto;
            padding: 5px 5px;
            border-radius: 8px;
            border: 1px solid #0762f7;
            box-shadow: none !important;
            font-weight: 600;
            font-size: 16px;
            color: #172b4d;
            @media (max-width: 1366px) {
              font-size: 14px;
              padding: 4px 20px;
            }
            img {
              display: none;
            }
          }
          &:first-of-type {
            margin-right: 18px;
            background: #ffffff;
            width: 100px;
            border: 1px solid #7a869a;
            color: #7a869a;
            display: flex;
            justify-content: center;
            &:hover {
              background: #7a869a;

              color: #fff;
            }
          }
          &:last-of-type {
            background: #0762f7;
            color: white;
            width: 100px;
            display: flex;
            justify-content: center;
            &:hover {
              background: #054ab9;
            }
          }
        }
      }
    }
  }
  .home-title {
    width: 400px !important;
  }
  .custom-header {
    border: none !important;
  }
`;
