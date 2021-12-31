import styled from "styled-components";
import { Modal } from 'antd';

const Main = styled(Modal)`
    .ant-modal-content {
        border-radius: 64px;
        .ant-modal-close {
            margin-right: 30px;
            margin-top: 15px;
            color: #fff;
            font-weight: bold;
            .ant-modal-close-x {
                font-size: 26px;
            }
        }
        .ant-modal-body {
            padding: 0;
            div {
                margin: 0;
                .content-left {
                    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #0762F7;
                }
            }
        }
        .ant-modal-footer {
            display: none;
        }
    }
`;
export { Main };
