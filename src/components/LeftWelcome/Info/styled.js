import styled from 'styled-components';
import { Row } from 'antd';

export const Main = styled(Row)`
    display: flex;
    position: relative;
    margin-top: 60px;
    & .info-right {
        padding-left: 15px;
        position: relative;
        @media (max-width: 1200px) {
            padding-left: 0;
            margin-top: 30px;
        }        
    }
`;