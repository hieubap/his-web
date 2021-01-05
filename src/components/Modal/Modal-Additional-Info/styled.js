import { Modal } from 'antd'
import styled from "styled-components";
import { select, input, itemInfo, button } from "components/mixin";

export const Main = styled(Modal)`
    font-family: "Nunito Sans" !important;
    width: 700px!important;
    .title{
        justify-content: center;
        align-items: center;
        padding-bottom: 15px;
        h3{
            font-weight: bold;
            font-size: 28px;
            line-height: 38px;
            color: #42526E;
        }
    }
    .ant-modal-content {
        border-radius: 16px;
        .ant-modal-body {
            padding: 37px 49px;
        }
        .item {
            ${itemInfo};
            label {
                padding-top: 15px;
                padding-bottom: 5px;
            }
            &-select {
                ${select};
                width: 100%;
            }
            &-input {
                ${input};
            }
        }
    }
    .ant-modal-footer{
       display: none;
    }
    .footer{
        margin-top: 52px;
        margin-bottom: 21px;
        display: flex;
        justify-content: space-between;
        .btn {
            &-cancel {
                ${button};
                padding: 0 10px;
                span {
                    margin-right: 5px;
                }
            }
            &-accept{
                ${button};
                padding: 0 10px;
                span{
                    margin-right: 5px;
                }

            }
        }
    }
`;