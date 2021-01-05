import styled from 'styled-components';
import { Row } from 'antd';
import { displayFlex, fontSizeTitle } from "components/mixin";

export const Main = styled(Row)`
    .logo {
        img {
            width: 107px;
            height: 40px;
        }
    }
    .text {
        ${displayFlex("center", "center")}
        font-size: ${fontSizeTitle};
        font-weight: bold;
        line-height: 38px;
        color: white;
        @media screen and (max-width: 1769px) {
            margin-top: 10px;
            font-size: 18px;
            line-height: 20px;
        }
    }
    .user {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .name {
            font-weight: 800;
            font-size: 18px;
            line-height: px;
            color: white;
            margin-right: 10px;
            margin-top: -5px;
        }
        img {
            width: 40px;
            height: 40px;
            border-radius: 3px;
        }
    }
`;