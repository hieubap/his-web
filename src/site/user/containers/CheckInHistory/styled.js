import styled from "styled-components";
const Main = styled.div`
    & .top-header
    {
        /* #FFFFFF */

        background: #FFFFFF;
        /* S1 */
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        align-items: center;
        text-align: center;
        margin-bottom: 16px;
        padding: 16px;
        color: #0D2745;

    }
    & .history-item{
        background: #FFFFFF;
        margin-left: 16px;
        margin-right: 16px;

        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        margin-bottom: 16px;
        & .history-header
        {
            padding: 14px;
            border-bottom: 2px solid #cacaca;
            display: flex;
            & .checkin-date{
                font-family: Nunito Sans;
                font-style: normal;
                font-weight: bold;
                font-size: 18px;
                line-height: 25px;
                margin-bottom: 0px;
                flex:1;
                color: #0D2745;
            }
        }
        & .history-body{
            padding: 14px;
            & .history-donvi{
                font-style: normal;
                font-weight: bold;
                font-size: 16px;
                line-height: 22px;
                color: #172B4D;
                margin-bottom: 8px;
            }
            & .history-status
            {
                font-style: normal;
                font-weight: bold;
                font-size: 16px;
                line-height: 22px;
                margin-bottom: 0px;
                &.bat-thuong{
                    color: #FC3B3A;
                }
                &.binh-thuong{
                    color: #27AE60;
                }
            }
        }
    }
`;
export{Main}