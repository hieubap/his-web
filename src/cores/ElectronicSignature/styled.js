import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;
  background-color: ${(props) => (props.focusing ? "#E6F7FF" : "")};
  min-height: 24px;

  & .text-field-label {
    display: flex;
  }

  & .text-field-label:after {
    content: "";
    margin-right: 6px;
    display: ${(props) => (props.hideLabelDots ? "none" : "block")};
  }
  & .image-sign-area {
    & img {
      max-width: 100%;
      object-fit: contain;
      max-height: 100%;
    }
  }
  @media print {
    & .btn-reset-signature {
      display: none;
    }
    & .ant-btn {
      display: none;
    }
  }
`;

export { Main };
