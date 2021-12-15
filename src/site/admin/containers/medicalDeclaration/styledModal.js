import styled from "styled-components";
import { Modal } from "antd";

const Main = styled(Modal)`
  & .ant-modal-content {
    .ant-modal-header {
      .ant-modal-title {
        text-align: center;
        color: #125873;
        font-weight: bold;
      }
    }
    .ant-modal-body {
      max-height: 450px;
      overflow: scroll;
      .body-department {
        .name {
          padding: 8px 2px;
          border-bottom: 1px solid #e8e8e8;
          color: #000;
        }
        .name:active,
        .name:focus,
        .name:hover {
          background: #63c2de;
          cursor: pointer;
        }
      }
    }
    .ant-modal-footer {
      div {
        text-align: center;
        font-weight: bold;
        color: #dc2424;
        cursor: pointer;
      }
    }
  }
`;
const MainAvatar = styled.div`
  text-align: center;
  .avatar-body {
    pading: 0 1em;
    img {
      text-align: center;
      width: 190px;
      padding-top: 17px;
      max-width: 204.83px;
      max-height: 204.83px;
      @media (max-width: 1326px) {
        width: 85%;
      }
      @media (max-width: 992px) {
        width: 190px;
      }
    }
    .title {
      font-weight: 900;
      font-size: 16px;
      line-height: inherit;
      color: #165974;
      padding-top: 26px;
      border-bottom: 1px solid #165974;
      width: 75%;
      margin: auto;
      padding-bottom: 6px;
    }
  }
  .button-avatar {
    padding: 12px 0;
    width: 100%;
    margin: 18px 0 20px;
    background: linear-gradient(41.51deg, #fe8803 -0.1%, #fed603 101.9%);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    display: flex;
    justify-content: center;
    height: auto !important;
    align-items: center;
    img {
      padding-right: 16px;
    }
  }
`;

const MainSearch = styled.div`
  padding-bottom: 30px;
  .page-heigth-checkin {
    @media (max-width: 1280px) and (min-width: 768px) {
      min-height: 128px;
    }
  }
  .medical-declaration-2 {
    @media (max-width: 1280px) {
      -webkit-box-flex: 0 !important;
      -ms-flex: 0 0 100% !important;
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
    .box-search {
      @media (max-width: 1280px) {
        margin-bottom: 1em;
      }
      @media (max-width: 1280px) {
        width: 100%;
      }
    }
  }
  .box-search {
    position: relative;
    input {
      background: linear-gradient(41.51deg, #fe8803 -0.1%, #fed603 101.9%);
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding-left: 45px;
      &:focus {
        outline: none;
        box-shadow: none;
      }
      &::placeholder {
        font-size: 14px !important;
        color: #333333;
        font-weight: bold;
      }
    }
    .action-search {
      font-size: 14px !important;
      color: #333333;
      font-weight: bold;
      width: 100%;
      box-sizing: border-box;
      height: 50px !important;
    }
    .search-qr {
      display: flex;
      padding: 13px 0;
      border: 1px solid #0d2745;
      box-sizing: border-box;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      align-items: center;
      justify-content: center;
      span {
        &:last-child {
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 69%;
        }
      }
      img {
        padding-right: 10px;
      }
    }
    .icSearch {
      position: absolute;
      left: 20px;
      top: 0;
      z-index: 1;
      bottom: 0;
      display: flex;
      align-items: center;
      img {
        max-width: 20px;
        max-height: 20px;
      }
    }
  }
`;

const MainPrint = styled.div`
  width: 450px;
  height: 300px;
  border: 2px solid #bdbcbe;
  border-radius: 14px;
  display: flex;
  align-items: center;
  margin: auto;
  .warp-card {
    width: 100%;
    img {
      width: 145px;
      height: 52px;
      margin: auto;
      display: block;
      margin-top: 10px;
    }
    .title {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      color: black;
      font-size: 18px;
    }
    .title-card {
      font-size: 23px;
      span {
        border-bottom: 1px solid gray;
      }
    }
    .barcode {
      text-align: center;
      text {
        display: none;
      }
    }
    .form-infor {
      padding-left: 20px;
      padding-bottom: 10px;
      font-size: 16px;
      color: black;
      font-weight: bold;
      .criteria {
        display: flex;
        .criteria-name {
          width: 28%;
        }
        .criteria-value {
          width: 72%;
        }
      }
    }
  }
`;

const MainTheKhach = styled(Modal)`
  & .ant-modal-header {
    .ant-modal-title {
      color: #125873;
      font-weight: bold;
      text-align: center;
      font-size: 24px;
    }
  }
  & .ant-modal-footer {
    text-align: center;
    border: none;
    padding-bottom: 25px;
    button.ant-btn {
      background: #fe5955;
      border-radius: 6px;
      border: none;
      font-size: 16px;
      line-height: 30px;
      color: #ffffff;
      padding: 5px 50px;
      height: auto;
      cursor: pointer;
    }
  }
`;
const MainDoiTuongKhach = styled.div`
  .body-target {
    margin-bottom: 15px;
    cursor: pointer;
    padding: 0 20px;
    .option-who_are-you {
      display: flex;
      align-items: flex-end;
      .name {
        font-size: 15px;
        line-height: 16px;
        letter-spacing: 0.1px;
        color: #333333;
        font-weight: 500;
        padding-bottom: 10px;
      }
    }

    .ant-radio-wrapper {
      margin-bottom: 8px;
    }
    .info-target {
      width: 100%;
      .name {
        font-weight: bold;
        color: #000000cc;
      }
      .note {
        color: #000000;
        padding: 2px 0px 6px;
      }
    }
  }
`;
const MainLichSuDangKy = styled.div`
  #mgr-history {
    .ant-table-thead {
      display: none !important;
    }
  }
`;

const MainChupHinh = styled.div`
  .mgr-camera {
    .row {
      .button-camera {
        margin: -40px 20px 0 auto;
        button {
          padding: 12px 62px;
          font-weight: bold;
          height: auto;
          background: linear-gradient(41.51deg, #fe8803 -0.1%, #fed603 101.9%);
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          font-size: 15px;
          line-height: 18px;
          color: #333333;
        }
      }
    }
  }
`;
const MainData = styled(Modal)`
  & .ant-modal-content {
    .ant-modal-header {
      .ant-modal-title {
        text-align: center;
        color: #125873;
        font-weight: bold;
        font-size: 22px;
      }
    }
    & .ant-modal-body {
      padding: 0px;
      .body-data {
        table {
          width: 100%;
          tr {
            border-bottom: 1.5px solid #dfe0eb;
            color: #000;
            text-align: center;
            td {
              padding: 10px;
              cursor: pointer;
            }
          }
          thead {
            tr {
              background: #e9f3fc;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  & .ant-modal-footer {
    text-align: center;
    border: none;
    font-weight: bold;
    color: red;
    cursor: pointer;
    font-size: 18px;
  }
`;
const MainBCH = styled.div`
  #form-BCH-medical {
    .chooseBCH {
      width: 4vw;
      text-align: center;
      font-size: 16px;
      margin: 0 3px;
      @media (max-width: 767px) {
        width: 6vw;
      }
      @media (max-width: 600px) {
        width: 10vw;
      }
    }
  }
`;
const MainModal = styled(Modal)`
& .ant-modal{
  width:84vw;
}
& .ant-modal-content {
  border-radius: 10px !important;
    .ant-modal-close{
      color:white;
    }
    .ant-modal-header {
      background: #0D2745;
      border-radius: 10px 10px 0px 0px;
      .ant-modal-title {
        text-align: center;
        color: white;
        font-family: Muli;
        font-size: 18px;
        line-height: 21px;
        align-items: center;
      }
    }

  & .ant-modal-body {
    width:100%;
    padding:0px;
    .table-body{
      & table{
        background:white;
        border-radius: 10px;;
        width: 100%;
        text-align: left;
        p{
          margin-bottom:0px;
          font-family: Nunito Sans !important;
          font-style: normal;
          font-size: 18px;
          line-height: 25px;
          display: flex;
          align-items: center;
          color:#172B4D;
        }
        .name-bold{
          font-weight: bold;
        }
        .Modal-checkIn{
          color:blue;
          text-decoration:underline blue solid ;
        }
        tr {
          border-bottom: 1.5px solid #dfe0eb;
          color: #000;
          text-align: left;
          td {
            
            padding: 10px;
            cursor: pointer;
          }
        }
        tr:nth-child(even){
          background: linear-gradient(0deg, rgba(23, 43, 77, 0.05), rgba(23, 43, 77, 0.05)), #FFFFFF;
        }
        tr:last-child{
          border:0px;
        }
        tr:hover{
          background:rgba(86, 204, 242, 0.2);
          }
        }
          thead {
            tr {
              font-family: Nunito Sans;
              font-style: normal;
              font-weight: bold;
              font-size: 18px;
              line-height: 25px;                
              color: black;
              td{
                align-item:start;
              }
            }
          }
        }


    }
  }

  & .ant-modal-footer {
    text-align: center;
    border: none;
    font-weight: bold;
    color: red;
    cursor: pointer;
    font-size: 18px;
  }
  @media (max-width:1100px){
    p{
      margin-bottom:0px;
      font-size: 16px !important;
    }
}
`;
export {
  MainBCH,
  Main,
  MainAvatar,
  MainSearch,
  MainPrint,
  MainTheKhach,
  MainDoiTuongKhach,
  MainLichSuDangKy,
  MainChupHinh,
  MainData,
  MainModal
};
