import styled from 'styled-components';

const name = () => `
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
`;
export const Main = styled.div`
    position: relative;
    width: 100%;
    .header {
        padding: 0 30px 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(47, 128, 237, 1) ;
        box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        width: 100%;
        height: 75px;
        .content {
            margin-top: -20px;
            ${name}
            &-note{
                margin-top: -20px;
                font-size: 14px;
                line-height: 24px;
                color: white;
                span{
                    font-weight: 900;
                }
            }
            @media screen and (min-width: 1200px) and (max-width: 1600px) {
                font-size: 15px !important;
                &-note {
                        font-size: 11px;
                    }
            }
            
        }
    }
`;