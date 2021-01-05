import styled from 'styled-components';
import { button } from "components/mixin";

export const Main = styled.div`
    &.container-fluid {
        font-family: Nunito Sans !important;
        margin-top: 10px;
        padding: 0 22px;
        .header {
            width: 100% !important;
            margin-top: 30px;
        }
        .button-bottom {
            ${button};
            margin-top: 543px;
            margin-bottom: 17px;
            width: 117px;
            span {
                margin-right: 10px;
            }
        }
    }
`;