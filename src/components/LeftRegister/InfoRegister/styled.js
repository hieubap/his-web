import styled from 'styled-components';
import { Row } from 'antd';
import { displayFlex, button } from "components/mixin";

export const Main = styled(Row)`
    &.info {
        margin-top: 30px;
        .avatar {
            width: 100%;
            ${displayFlex("center", "center")};
            img {
                width: 125px;
                height: 125px;
                border-radius: 6px;
            }
            .content {
                margin: 10px 0 0 35px;
                &-text {
                    font-family: Nunito Sans;
                    font-weight: normal;
                    font-size: 20px;
                    line-height: 25px;
                    color: #ffffff;
                }
                .number {
                    text-align: center;
                    font-weight: 900;
                    font-size: 24px;
                    line-height: 35px;
                    color: #ffffff;
                    margin: 15px 0 0 0;
                    border: dashed 1px white;
                }
                @media screen  and (max-width:1023px){
                    margin: 10px 0 0 10px;
                    &-text{
                        font-size: 16px
                    }
                    
                }
            }
        }
        .info-personal {
            ${displayFlex("center", "center")};
            width: 100%;
            .person {
                .name {
                    font-weight: bold;
                    font-size: 18px;
                    line-height: 25px;
                    text-transform: uppercase;
                    color: #ffffff;
                    @media screen  and (max-width:1023px){
                    font-size: 15px;
                    }
                }
                .title {
                    margin-top: 7px;
                    display: flex;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 25px;
                    color: #ffffff;
                    @media screen  and (max-width:1023px){
                        font-size: 12px;
                    }
                    .date {
                        margin-right: 29px;
                    }
                    .male {
                        margin-right: 40px;
                    }
                    .code {
                        margin-right: 39px;
                    }
                    span {
                        font-weight: bold;
                        font-size: 14px;
                        line-height: 25px;
                        color: #ffffff;
                        @media screen  and (max-width:1023px){
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        .info-city {
            ${displayFlex("center", "center")};
            width: 100%;
            @media ( max-width:1200px) {
                margin-top: 15px;          
            }
            .person {
                .title {
                    margin-top: 7px;
                    display: flex;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 25px;
                    color: #ffffff;
                    @media (max-width:1023px) {
                        font-size: 12px;
                    }
                    .address {
                        margin-right: 44px;
                        @media (min-width:1200px) and ( max-width:1600px) {
                            margin-right: 34px;            
                    }
                    }
                    .phone {
                        margin-right: 60px;
                        @media (min-width:1200px) and ( max-width:1600px) {
                            margin-right: 50px;            
                    }
                    }
                    .bhyt {
                        margin-right: 30px;
                        @media (min-width:1200px) and ( max-width:1600px) {
                            margin-right: 20px;            
                    }
                    }
                    .code-bn {
                        margin-right: 43px;
                        @media (min-width:1200px) and ( max-width:1600px) {
                            margin-right: 33px;            
                        }
                    }
                    span {
                        font-weight: bold;
                        font-size: 14px;
                        line-height: 25px;
                        color: #ffffff;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        @media (min-width:1200px) and ( max-width:1600px) {
                            font-size: 13px;              
                    }
                    @media (max-width:1023px) {
                        font-size: 12px;
                        }
                    }
                }
            }
        }
        .check-info {
            ${displayFlex("flex-end", "flex-end")};
            margin-top: 127px;
            @media ( max-width:1600px) {
                margin-top: 0;              
            }
            @media ( max-width:1200px) {
                justify-content: center;             
                align-items: center;   
            }
            .button {
                ${button};
                width: 183px;
                img {
                    margin-left: 5px;
                }
                @media ( max-width:1023px) {
                    font-size: 13px;
                    width: 160px;
                }
            }
        }
    }
`;