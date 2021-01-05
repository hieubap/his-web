import { Modal } from 'antd'
import styled from "styled-components";
import {  button, displayFlex } from "components/mixin";

export const Main = styled(Modal)`
    font-family: "Nunito Sans" !important;
     width: 700px!important;
    .ant-modal-content{
        border-radius: 16px;
    }
    .ant-modal-footer{
        display: none;
     }
    p{
        margin: 0;
    }
    .container{
        padding: 0 21px;
        .header{
            width: 100%;
            display: flex;
            justify-content: center;
            align-item:center;
         h3{
            color: #D1000C;
            font-weight: bold;
            font-size: 28px;
            line-height: 38px;
            text-align: center;
            }
        }
        .note{
            margin-top: 4px;
            h5{
                font-weight: bold;
                font-size: 16px;
                line-height: 22px;
                color: #42526E;
            }
            p{
                margin-top: 5px;
                font-style: italic;
                font-weight: normal;
                font-size: 14px;
                line-height: 19px;
                color: #42526E;
            }
        }
        .info{
            margin-top: 12px;
           h5{
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            color: #42526E;
           }
        }
        .content{
            margin-top: 6px;
            position: relative;
            width:605px;
            height: 285px;
            box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.2);
            z-index:2;
            padding: 24px 0 0 24px;
            &::before{
                position: absolute;
                content:"";
                width:584px;
                top: 10px;
                left: 10px;
                height: 266px;
                border: 2px solid #0291E1;
            }
            h6{
                font-weight: normal;
                font-size: 14px;
                line-height: 18px;
                color: #000000;
                padding: 3px 0;
            }
            p{
                font-size: 14px;
                line-height: 18px;
                color: #000000;
                padding: 3px 0;
            }
            .line{
                width: 92%;
                height: 1px;
                background-color: black;
                position: absolute;
                top: 104px;
                left: 24px;
                opacity: 0.2;
            }
        }
        .button-bottom{
            margin-top: 35px;
            ${displayFlex("space-between", "center")};
            .btn{
                &-left{
                    ${button}
                    padding: 0 10px;
                    span{
                        margin-right: 10px;
                    }
                    border-color:#FC4A5F;
                }
                &-right{
                    ${button}
                    padding: 0 10px;
                    span{
                        margin-right: 10px;
                    }
                }
            }
        }
        .footer{
            margin-top: 15px;
            font-style: italic;
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
            color: #42526E;
        }
    }

`