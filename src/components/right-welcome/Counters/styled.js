import styled from 'styled-components';
import { Row } from 'antd';
import { displayFlex, itemInfo, select, button } from "components/mixin";

export const Main = styled(Row)`
    ${displayFlex("space-between", "center")};
    margin-top: 30px;
    .item {
        ${itemInfo};
        .select {
            ${select};
        }
    }
    .button-close {
        margin-top: 21px;
        margin-left: 46px;
        ${button};
        color: rgba(66, 82, 110, 1);
        border-color: rgb(230, 2, 2);
        span {
            margin-right: 10px;
        }
        @media (min-width:1200px) and (max-width:1600px) {
            font-size: 11px;
        }
    }
`;