import { Modal } from 'antd'
import styled from "styled-components";
import { displayFlex, button } from "components/mixin";

export const Main = styled(Modal)`
    font-family: "Nunito Sans" !important;
    width: 700px!important;
    p{
        margin: 0;
    }  
    .ant-modal-footer{
        display: none;
     }
    .ant-modal-content{
        border-radius: 16px;
    }   
    .container{
        width:100%;
        padding:0 21px;
        h3{
            margin-top:6px;
            font-weight: bold;
            font-size: 28px;
            line-height: 38px;
            text-align: center;
            color: #01B45E;
        }
        h4{
            margin-top: 20px;
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            color: #42526E;
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
                margin-bottom:0;
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
            margin-top: 32px;
            margin-bottom:10px;
            ${displayFlex("space-between","center")}
            .btn{
                &-back{
                    ${button}
                    span{
                        margin-right:10px
                    }
                    padding: 0 15px;
                }
                &-use{
                    ${button}
                    span{
                        margin-right:15px
                    }
                    padding: 0 15px;
                }
                }
        }
    }
}

`