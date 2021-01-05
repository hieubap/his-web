import { Modal } from 'antd'
import styled from "styled-components";
import { displayFlex, button } from "components/mixin";

export const Main = styled(Modal)`
    font-family: "Nunito Sans" !important;
    width: 700px!important;  
    .ant-modal-footer{
        display: none;
     }
    .ant-modal-content{
        border-radius: 16px;
    }   
    .container{
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
        .main{
            width:100%;
            height:325px;
        }
        .button-bottom{
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