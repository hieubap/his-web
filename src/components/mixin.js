const fontSizeTitle = "28px";
const fontSizeLabel = "14px";
const fontSizeText = "16px";
const displayFlex = (justifyContent, alignItem) => `
    display: flex;
    justify-content: ${justifyContent};
    align-items: ${alignItem};
`;
const item = () => `
    margin-top: 14px;
    font-weight: 600;
    font-size: ${fontSizeLabel};
    line-height: 16px;
    color: white;
    width: 100%;
`;
const input = () => `
    margin-top: 5px;
    font-weight: 600;
    font-size: ${fontSizeText};
    line-height: 20px;
    border: 2px solid #e0e0e0;
    border-radius: 3px;
    height: 37px;
    width: 100%;
    &::placeholder {
        color: #757575;
    }
`;
const date = () => `
    margin-top: 5px;
    font-size: ${fontSizeText};
    line-height: 20px;
    border: 2px solid #e0e0e0;
    border-radius: 3px;
    height: 37px;
    width: 100%;
    &::placeholder {
        color: #757575;
    }
    .ant-picker-input {
        input {
            font-weight: 600;
            font-size: ${fontSizeText};
            line-height: 20px;
            color: rgba(51, 51, 51, 1);
        }
        .ant-picker-suffix {
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
        }
    }
`;
const select = () => `
    margin-top: 5px;
    font-weight: 600;
    font-size: ${fontSizeText};
    line-height: 20px;
    color: black;
    background-color: white;
    border-radius: 3px;
    height: 37px;
    width: 100%;
    .ant-select-selector {
        border-radius: 3px;
        border: 2px solid #e0e0e0;
        color: black;
        height: 100%;
        .ant-select-selection-item {
            padding-top: 2px;
            ${displayFlex("flex-start", "center")};
        }
    }
    .ant-select-selection-search, .ant-select-selection-item, .ant-select-selection-placeholder {
        font-family: "Nunito Sans" !important;
    }
    .ant-select-selection-placeholder {
        line-height: 35px !important;
    }
    .ant-select-selection-item {
        padding-top: 0px;
    }
    @media screen and (max-width:1199px) {
        .ant-select-arrow {
            color: #2f588873 !important;
            font-size: 18px !important;
            right: 12px !important;
        }
    }
`;
const button = () => `
    background: #f5f6f7;
    mix-blend-mode: normal;
    border-radius: 3px;
    font-weight: 600;
    font-size: ${fontSizeText};
    line-height: 20px;
    height: 37px;
    border-bottom: rgba(86, 204, 242, 1) 3px solid;
    ${displayFlex("center", "center")};
    &:hover {
        cursor: pointer;
        transition: 0.3s;
        background-color: #9e9e9e;
        color: white;
    }
    &:active {
        background-color: #d4d4d4;
        transition: 0.3s;
        -webkit-box-shadow: 0px 3px 6px 1px rgba(209, 207, 209, 1);
        -moz-box-shadow: 0px 3px 6px 1px rgba(209, 207, 209, 1);
        box-shadow: 0px 3px 6px 1px rgba(209, 207, 209, 1);
    }
`;
const itemInfo = () => `
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #828282;
    width: 100%;
`;
const time = () => `
    margin-top: 5px;
    border: 2px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 3px;
    height: 37px;
    width: 100%;
`;
const checkbox = () => `
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #333333;
    margin-left: 0px;
`;

const panel = () => `
    height: 243px;
    background: #f2f2f2;
    box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
    border-radius: 16px 16px 0 0;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #42526e;
`;
export {
    fontSizeTitle,
    fontSizeLabel,
    fontSizeText,
    displayFlex,
    item,
    input,
    date,
    select,
    button,
    itemInfo,
    time,
    checkbox,
    panel
}