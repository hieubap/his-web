import { Modal } from 'antd'
import styled from "styled-components";
import { displayFlex, button } from "components/mixin";

export const Main = styled(Modal)`
    font-family: "Nunito Sans" !important;
    width: 700px!important;  
    .ant-modal-content{
        border-radius: 16px;
    }
    .ant-modal-footer{
        display: none;
     }
     .container{
        padding: 0px 36px;
        h3{
            text-align: center;
            font-weight: bold;
            font-size: 28px;
            line-height: 38px;
            color: #42526E;   
        }
        p{
            margin-top: 20px;
            font-size: 16px;
            line-height: 22px;
            color: #42526E;
        }
     }
    .button-bottom{
        padding:0 20px;
        width:100%;
        margin-top:50px;
        margin-bottom: 23px;
        ${displayFlex("space-between","center")}
        .btn{
            &-cancel{
                ${button}
                span{
                    margin-right:10px
                }
                padding: 0 15px;
            }
            &-accept{
                ${button}
                span{
                    margin-right:15px
                }
                padding: 0 15px;
            }
            }
    }
`