import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled(Modal)`
  @media (max-width: 991px) {
    width: 80vw !important;
    min-width: auto !important;
  }
  @media (max-width: 767px) {
    top: 1.5em !important;
    width: 70vw !important;
  }
  @media (max-width: 500px) {
    width: 100vw !important;
  }
  .ant-modal-content {
    border-radius: 10px 10px 10px 10px;
    .ant-modal-close {
      margin-right: 16px;
      :focus {
        outline: 0 !important;
      }
      .ant-modal-close-x{
        display: flex;
        align-items: center;
        width: auto;
      }
    }
    .ant-modal-header {
      background: #E9F3FC;
      border-radius: 10px 10px 0px 0px;
      div{
        display: flex;
        align-items: center;
      }
      span{
        margin-left: 17px;
        text-transform: uppercase;
        color: #333333;
        font-size: 18px;
        line-height: 21px;
        font-weight: bold;
      }
    }
  }
  & .ant-modal-body {
    padding: 8px;
    height: calc(100vh - 300px);
    @media (max-width: 767px) {
      height: calc(100vh - 200px);
    }
    & button.take-photo {
      background: none;
      border: 3px solid #46ace0;
      width: 62px;
      height: 62px;
      color: #46ace0;
      border-radius: 100%;
      font-size: 27px;
    }

    .take-photo .btn-upload-file img {
      width: auto;
      margin-right: 10px;
    }
    .display-error {
      display: none;
    }
    .take-photo .image-preview img {
      position: absolute;
      top: 50%;
      max-width: 40%;
      height: 57%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px dashed;
    }
    & .ant-spin-nested-loading {
      width: 100%;
      height: 100%;
      @media (max-width: 991px) {
        overflow: hidden;
      }
      & .ant-spin-container {
        width: 100%;
        height: 100%;
        .image-preview {
          overflow: auto;
          display: flex;
          justify-content: center;
          justify-items: center;
          background-color: #000;
          width: 100%;
          height: 100%;
          & .ReactCrop {
            align-self: center;
            & div {
            }
          }
          img {
            max-width: 100%;
            max-height: 100%;
            align-self: center;
          }
          & .camera {
            max-width: 100%;
            max-height: 100%;
            display: flex;
            justify-content: center;
            justify-items: center;
            position: relative;
            & video {
              max-width: 100%;
              max-height: 100%;
              @media (max-width: 991px) {
                height: 100%;
                width: auto;
                max-width: initial;
                max-height: 100%;
              }
            }
            & .btn-take {
              width: 50px;
              height: 50px;
              border-radius: 25px;
              background-color: red;
              position: absolute;
              bottom: 20px;
              left: calc(50% - 25px);
              z-index: 10000;
              cursor: pointer;
            }
          }
        }
      }
    }
    #display-error {
      display: none;
    }
  }
  .ant-modal-footer {
    div{
      align-items: center;
    }
    .action {
      @media (max-width: 991px) {
        display: flex;
      }
      .ant-btn {
        width: 120px;
        @media (max-width: 767px) {
          height: 36px;
          padding: 0 14px;
          font-size: 13px;
          width: auto;
        }
      }
      .ant-btn-danger{
        background: linear-gradient(41.51deg, #FE8803 -0.1%, #FED603 101.9%)  !important;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border-color: #FED603;
      }
      .ant-btn-primary{
        background: linear-gradient(90deg, #109D83 0%, #01B45E 100%)  !important;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border-color: #01B45E;
      }
    }
    .selectImage{
      width: calc(100% - 276px);
      height: 40px;
      padding-top: 4px;
      @media (max-width: 767px) {
        width: calc(100% - 180px);
      }
      .ant-upload{
        width: -webkit-fill-available;
      }
      .ant-btn-dashed{
        height: 35px;
        width: -webkit-fill-available;
        text-align: left;
        border-radius: 0px;
        display: flex;
        align-items: center;
        img{
          margin-right: 14px;
        }
      }
    }
  }
`;

// import styled from 'styled-components';
// import { Modal } from 'antd';

// export const MainScreen = styled.div`
//   height: 80%;
//   background-color: #011620;
//   position: relative;
//   & .react-html5-camera-photo  {
//     position: relative;
//     text-align: center;
//     & img {
//       width: 60%;
//       display: none !important;
//     }
//     & . normal {
//       display: none !important;
//     }
//   }
//   & #white-flash.normal {
//     position: absolute;
//     height: 100%;
//     width: 100%;
//     opacity: 1;
//     transition: opacity .9s ease-out;
//   }
//   & video {
//     height: 100%;
//     object-fit: initial;
//     width: 59%;
//     min-height: 450px;
//     @media (max-width: 1600px) {
//       min-height: 350px;
//     }
//   }
//   #container-circles {
//     position: absolute;
//     left: 50%;
//     bottom: 0px;
//   }
//   & button.take-photo {
//     background: none;
//     border: 3px solid #46ace0;
//     width: 62px;
//     height: 62px;
//     color: #46ace0;
//     border-radius: 100%;
//     font-size: 27px;
//   }
//   & .btn-upload-file {
//     position: relative;
//   }
//   & .btn-upload-file input[type='file'] {
//     display: inline-block;
//     width: 97px;
//     opacity: 0;
//     position: absolute;
//     width: 100%;
//     left: 0;
//     top: 0;
//     z-index: 999;
//     height: 100%;
//     visibility: hidden;
//   }
//   & .take-photo .btn-upload-file img {
//     width: auto;
//     margin-right: 10px;
//   }
//   & .take-photo .image-preview img {
//     position: absolute;
//     top: 50%;
//     max-width: 40%;
//     height: 56%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     border: 1px dashed;
//   }
//   & .webcam-inner {
//     width: 60%;
//     position: relative;
//     z-index: 999;
//     text-align: center;
//     z-index: 999;
//     background-color: #314047;
//     margin: auto;
//     padding-top: 17px;
//     border-radius: 10px;
//     border: 1px solid rgba(255, 255, 255, 0.1);
//   }
//   & .image-preview {
//     background-position: center;
//     background-repeat: no-repeat;
//     background-size: contain;
//     background-color: #000000;
//     position: absolute;
//     top: 0;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 60%;
//     height: 100%;
//   }
//   & .icon-avatar button {
//     background: none;
//     border: none;
//   }
//   & #container-circles {
//     bottom: 0;
//     #outer-circle {
//       background-color: transparent;
//       #inner-circle {
//         background: transparent;
//         top: 45px;
//       }
//     }
//   }
//   & #display-error {
//     display: none;
//   }
// `;

// export const Main = styled(Modal)`
//   & .ant-modal-content {
//     position: fixed;
//     z-index: 1100;
//     width: 75%;
//     border-radius: 8px;
//     background-color: #314047;
//     & button {
//       &:focus {
//         outline: 0;
//       }
//       & .ant-modal-close-x {
//         width: 40px;
//         height: 40px;
//         line-height: 40px;
//         & .ant-modal-close-icon {
//           color: #ffff;
//         }
//       }
//     }
    
//     & .ant-modal-body {
//       position: relative;
//       border-top-left-radius: 10px;
//       border-top-right-radius: 10px;
//       border: 1px solid #FFFFFF;
//       & .webcam-inner {
//         width: 60%;
//         position: relative;
//         z-index: 999;
//         text-align: center;
//         z-index: 999;
//         background-color: #314047;
//         margin: auto;
//         padding-top: 17px;
//         border-radius: 10px;
//         border: 1px solid rgba(255,255,255,0.1);
//         & .text-uppercase {
//           text-transform: uppercase!important;
//         }
//         & .title-popup {
//           padding-bottom: 6px;
//           color: #ffff;
//         }
//         & .video-screen {
//           height: 80%;
//           min-height: 450px;
//           @media (max-width: 1600px) {
//             min-height: 350px;
//           }
//         }
//       }
//     }
//     & .ant-modal-footer {
//       padding: 24px;
//       border-top: solid 1px #dedede;
//       @media (max-width: 1600px) {
//         padding: 6px 24px;
//       }
//       & .text-right {
//         text-align: right!important;
//         & .action-capture {
//           padding: 9px;
//           & .text-left {
//             margin: auto;
//             text-align: left!important;
//             & .btn-upload-file {
//               position: relative;
//             }
//             .btn-print {
//               background-color: #46ace0;
//               & .service-input {
//                 display: none;
//               }
//               & .icon-button {
//                 color: #ffffffcc;
//                 font-weight: 500;
//                 & .fal fa-upload {
//                   margin-right: 10px;
//                   font-size: 18px;
//                 }
//               }
//             }
//             & button {
//               border-radius: 4px;
//               border: none;
//               padding: 8px 20px;
//               line-height: 1;
//               background: #538200;
//               color: rgba(255,255,255,0.8);
//             }
//           }
//           & .text-center {
//             text-align: center!important;
//           }
//           & .text-right {
//             text-align: right!important;
//             margin: auto;
//             & .btn-save {
//               background-color: #538200;
//               border-color: #538200;
//             }
//             & .btn-print {
//               background-color: #46ace0;
//               border-color: #46ace0;
//             }
//             & span {
//               color: #ffff;
//               font-weight: 500;
//             }
//           }
//         }
//       }
//     }
//   }
//   & button.take-photo {
//     background: none;
//     border: 3px solid #46ace0;
//     width: 62px;
//     height: 62px;
//     color: #46ace0;
//     border-radius: 100%;
//     font-size: 27px;
//   }
// `;