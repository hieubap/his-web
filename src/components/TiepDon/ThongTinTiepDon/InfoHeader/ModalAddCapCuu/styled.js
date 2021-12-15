import { Row } from 'antd'
import styled from "styled-components";
import { select } from "components/mixin";

export const Main = styled(Row)`
    .item-select {
        ${select};
        margin-top: 18px;
    }
`;