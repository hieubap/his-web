import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled(Modal)`
  & .ant-modal-body {
    padding: 8px;
    height: calc(100vh - 300px);
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
      & .ant-spin-container {
        width: 100%;
        height: 100%;
        .image-preview {
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
    .name-image {
      margin-left: 12px;
    }
  }
`;
