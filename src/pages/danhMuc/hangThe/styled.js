import styled from "styled-components";

export const Main = styled.div`
  .ant-table-tbody {
    .ant-table-cell {
      > div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }
      }
    }
  }
  .row-actived {
    background: #c1f0db !important;
  }
`;
