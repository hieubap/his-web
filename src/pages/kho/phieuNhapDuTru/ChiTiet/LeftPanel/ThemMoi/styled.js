import styled from 'styled-components';
import { select, input } from "components/mixin";

export const Main = styled.div`
    &.them-moi {
      .body-info {
        padding: 10px 10px 10px 14px;
        /* margin-top: 30px; */
        /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), #0762F7; */
        box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
        border-radius: 8px;
        display: flex;
        background: white;
        /* padding: 30px; */
        margin-left: 15px;
        .title {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .item-select {
          ${select}
          margin-bottom: 22px;
        }
        .item-input {
          ${input}
          margin-bottom: 22px;
          input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #c1cde3 !important;
            opacity: 1; /* Firefox */
          }
        }
      }
    }
`;