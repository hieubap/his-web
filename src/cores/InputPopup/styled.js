import styled from 'styled-components';

const Main = styled('div')`
  & .categories-value-display {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 24px;
    border-bottom: dashed 1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

export { Main };
