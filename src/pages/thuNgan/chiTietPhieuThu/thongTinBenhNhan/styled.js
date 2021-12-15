import styled from "styled-components";
import { Row } from "antd";

export const Main = styled(Row)``;

export const PatientInfoWrapper = styled("div")`
  display: flex;
  .img-avatar {
    flex-basis: 10%;
    display: flex;
    margin: auto;
    justify-content: center;
    padding-right: 15px;
  }
  .patient-information {
    flex: 1;
    font-size: 14px;
    line-height: 25px;
    font-family: Nunito Sans;
    padding: 10px 0 10px 15px;
    height: 100%;
    color: #172b4d;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.9)
      ),
      #0762f7;
    border-radius: 16px;
    .head {
      display: flex;
      margin: 0 10px 10px 10px;
      font-size: 18px;
      .name {
        flex: 6;
        font-weight: 900;
        line-height: 25px;
        color: #172b4d;
      }
    }
    .info-content {
      display: flex;
      .custom-col {
        flex: 4;
        table {
          tr {
            td {
              padding-right: 10px;
            }
            .info {
              font-weight: bold;
              color: #172b4d;
              max-width: 240px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &__highlight {
                background: #c1f0db;
              }
            }
          }
        }
      }
      .col-2 {
        flex: 2;
      }
    }
  }
`;
