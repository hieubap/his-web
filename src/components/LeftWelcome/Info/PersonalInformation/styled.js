import styled from 'styled-components';
import { Col } from 'antd';
import { displayFlex, input, checkbox, select, date, time, itemInfo } from "components/mixin";

export const Main = styled(Col)`
    padding-right: 15px;
    @media (max-width: 1200px) {
        padding-right: 0;
    }
    .frames {
        border-radius: 20px 20px 20px 20px;
        box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
        .row-name{
            padding: 0 30px;
            .item{
                ${itemInfo};
                &-input{
                    ${input}
                }
            }
            .checkbox{
                ${checkbox};
                margin-top: 29px;
                @media screen and (min-width: 1200px) and (max-width: 1600px){
                    margin-top:15px;
                  }
            }
        }
        .row-date{
            padding: 0 30px;
            .item{
                margin-top:15px;
                ${itemInfo};
               &-born{
                ${date};
                .anticon-calendar{
                    svg{
                        width: 13px;
                    }
                }
               }
               &-time{
                ${time};
                .anticon-clock-circle{
                    svg{
                        width: 10px;
                    }
                }
               }
               &-age{
                ${input};
               }
               &-male{
                ${select};
               }

            }
        }
        @media screen and (min-width: 1200px) and (max-width: 1600px){
            .pl-option{
              padding-left: 0!important;
            }
            .pr-option{
                padding-right: 0!important;
            }
          }
        .row-number{
            padding: 0 30px;
            .item {
                ${itemInfo};
                &-input {
                    ${input};
                }
                &-select {
                    margin-top: 15px;
                    .select {
                        ${select};
                    }
                }
            }
        }
        .left {
            position: relative;
            z-index: 0;
            &::before {
                position: absolute;
                content: "";
                width: 100%;
                height: 100px;
                top: 54px;
                background-color: white;
                z-index: 4;
                border-radius: 20px 0 0 0;
                border-top: solid 3px #56ccf2;
            }
            &-content {
                padding: 0 30px;
                position: relative;
                display: flex;
                flex-direction: column;
                width: 100%;
                background: #ffffff;
                border-radius: 0px 0px 20px 20px;
                .first-row {
                    &-left {
                        
                    }
                    &-right {
                        .item {
                            ${itemInfo};
                            &-input {
                                ${input};
                            }

                            &-checkbox {
                                ${checkbox};
                                margin-top: 29px;
                            }
                            &-age {
                                margin-top: 23px;
                                display: flex;
                                justify-content: space-between;
                                width: 100%;
                                .input {
                                    ${input};
                                    background-color: #dfe1e6;
                                }
                                .select {
                                    ${select};
                                }
                            }
                        }
                        @media (max-width:1600px) {
                            padding-left: 0 !important;
                        }
                    }
                }
                .second-row {
                    .item {
                        position: relative;
                        margin-top: 15px;
                        ${itemInfo};
                        &-input {
                            position: relative;
                            z-index: 1;
                            ${input};
                            &-position {
                                border-right-width: 1px !important;
                                outline: 0;
                                -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                                box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                            }
                        }
                        h5{
                            width:100%;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;	
                        }
                    }
                    .input-content{
                        .form-control{
                            ${input};
                            padding-left: 12px;
                            &:focus{
                                border-right-width: 1px !important;
                                outline: 0;
                                box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                            }
                        }
                        .bxwXcI{
                            background-color:white;
                            border-radius: 4px;
                            max-height: 288px;
                            li{
                                padding: 10px 10px!important;
                                &:hover{
                                    background-color: #e2e4de8c;
                                }
                            }
                        }
                        .active-item{
                            background-color:#dfe1e6;
                        }
                    }
                }
                .third-row {
                    &-left {
                        .item {
                            margin-top: 15px;
                            ${itemInfo};
                            .input {
                                ${input};
                            }
                            .select {
                                ${select};
                            }
                        }
                        @media (min-width: 1200px) and (max-width:1600px) {
                            padding-right: 0 !important;
                        }
                    }
                    &-right {
                        .item {
                            margin-top: 15px;
                            ${itemInfo};
                            .input {
                                ${input};
                            }
                            .select {
                                ${select};
                            }
                        }
                        @media (min-width: 1200px) and (max-width:1600px) {
                            padding-left: 0 !important;
                        }
                    }
                }
                .camera {
                    justify-content: space-around;
                    cursor: pointer;
                    position: relative;
                    margin-top: 30px;
                    img {
                        width: 100%;
                        height: 154.41px;
                    }

                    .text {
                        margin-top: 8px;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 22px;
                        text-align: center;
                        color: #42526e;
                    }
                    &-before {
                         ${displayFlex("center", "center")}
                        padding-right: 15px;
                        .optimize{
                            position:relative;
                            .icon {
                                position: absolute;
                                right: -5px;
                                bottom: 49px;
                                width: 44px;
                                height: 44px;
                            }
                            @media (max-width: 1600px) {
                                img{
                                    width:252px;
                                }
                            }
                        }
                        @media (min-width:1200px) and (max-width: 1600px) {
                            padding-right: 0;
                            .icon {
                                position: absolute;
                                right: -11px;
                                bottom: 49px;
                                width: 44px;
                                height: 44px;
                            }
                        }
                    }
                    &-after {
                        ${displayFlex("center", "center")}
                        padding-left: 15px;
                        .icon {
                            position: absolute;
                            right: -8px;
                            bottom: 49px;
                            width: 44px;
                            height: 44px;
                        }
                        .optimize{
                            position:relative;
                            .icon {
                                position: absolute;
                                right: -5px;
                                bottom: 49px;
                                width: 44px;
                                height: 44px;
                            }
                            @media (max-width: 1600px) {
                                img{
                                    width:252px;
                                }
                            }
                        }
                        @media (min-width:1200px) and (max-width: 1600px) {
                            margin-top: 15px;
                            padding-left: 0;
                        }
                    }
                }
                .button-clear {
                    cursor: pointer;
                    width: 100%;
                    ${displayFlex("center", "center")};
                    margin-top: 59px;
                    font-weight:600;
                    margin-bottom: 10px;
                    letter-spacing: 0.75px;
                    color: #2f80ed;
                    @media (max-width:1600px) {
                        margin-top: 10px!important;
                    }
                    .icon {
                        width: 12px;
                        height: 7.5px;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
    .hidden-form {
        display: none;
    }
`;