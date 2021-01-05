import styled from 'styled-components';

export const Main = styled.div`
    width: 100%;
    position: relative;
    & .form-control {
        background: #F8FAFB;
        border: 1px solid rgba(151, 151, 151, 0.15);
        box-sizing: border-box;
        border-radius: 5px;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #34335B;
        padding: 8px 10px 8px 14px;
        height: auto;
        &::placeholder {
            color: #34335bad;
        }
    }
`;