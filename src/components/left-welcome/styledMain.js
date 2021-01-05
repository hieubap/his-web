import styled from 'styled-components';
import { displayFlex, button } from "components/mixin";

export const Main = styled.div`
    .container-fluid {
        margin-top: 10px;
        padding: 0 22px;
        .button-bottom {
            margin-bottom: 20px;
            margin-top: 22px;
            &-right {
                ${displayFlex("space-between", "center")};
                padding-left: 100px;
            }
            .button {
                ${button};
                font-weight: 600;
                font-size: 16px;
                line-height: 20px;
                ${displayFlex("center", "center")};
                height: 37px;
                span {
                    margin-right: 5px;
                }
                &-back {
                    width: 117px;
                }
                &-danger {
                    width: 152px;
                    border-color: rgb(255, 41, 41);
                }
                &-sucess {
                    width: 191px;
                    border-color: rgb(2, 163, 10);
                }
                &-save {
                    width: 155px;
                }
            }
        }
    }
`;