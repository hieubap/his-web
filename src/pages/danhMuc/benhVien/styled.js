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
          height: auto;
          width: 70px;
        }
      }
    }
  }
  .row-actived {
    background: #c1f0db !important;
  }
`;
