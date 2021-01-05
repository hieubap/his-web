import styled from "styled-components";
import { Row } from "antd";

export const Main = styled(Row)`
    .line {
        width: 100%;
        border: #56ccf2 solid 1px;
        position: absolute;
        z-index: 3;
        top: 59px;
    }
    .body {
        background: white;
        font-family: "Nunito Sans" !important;
        position: relative;
        .background {
            position: absolute;
            img {
                width: 100%;
                height: 247px;
                @media screen and (max-width:1200px) {
                    height: 374px;
                }
            }
        }
    }
`;