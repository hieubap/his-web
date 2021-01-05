import styled from 'styled-components';
import { Col } from 'antd';
import { displayFlex } from "components/mixin";

export const Main = styled(Col)`
    .person {
        height: 235px;
        background: #ffffff;
        mix-blend-mode: normal;
        border-radius: 16px;
        border-bottom: 7px solid rgba(86, 204, 242, 1);
        ${displayFlex("center", "center")};
        flex-direction: column;
        box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
        .title {
            font-weight: bold;
            font-size: 20px;
            line-height: 24px;
            text-align: center;
            color: #42526e;
        }
        .code {
            margin-top: 28px;
            padding: 3px 10px;
            ${displayFlex("center", "center")};
            border: 2px dashed #2d9cdb;
            img {
                width: 28px;
                height: 33px;
            }
            span {
                font-weight: bold;
                font-size: 31.3239px;
                line-height: 43px;
                color: #2f80ed;
            }
        }
        .name {
            margin-top: 75px;
            text-transform: uppercase;
            font-style: normal;
            font-weight: 900;
            font-size: 16px;
            line-height: 24px;
            color: #333333;
        }
    }
    @media (max-width:1600px)  {
        &.fix {
            padding-right: 0!important;
        }
    }
`;