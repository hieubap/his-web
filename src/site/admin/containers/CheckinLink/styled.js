import style from "styled-components"

const Main = style.div`
.mgr-createlink {
  .col-md-4 {
    @media (max-width: 767px) {
      margin-bottom: 1em;
    }
  }
  .search-createlink {
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
    padding: 10pt 10pt 60pt 10pt;
    // height: calc(100% - 40px);
    height: 100%;
    position: relative;
    > .title {
      font-weight: bold;
      font-size: 18px;
      text-transform: uppercase;
      background: #0d2745;
      border-radius: 10px 10px 0px 0px;
      margin: -13px -13px 0px -13px;
      display: flex;
      height: 50px;
      color: #ffffff;
      padding-left: 30px;
      align-items: center;
    }
    .item-title {
      padding: 10px 0 7px;
      font-weight: bold;
      color: #333333;
      font-size: 15px;
    }
    .ant-select {
      width: 100%;
    }
    textarea.ant-input {
      height: calc(100% - 56pt);
      @media (max-width: 767px) {
        height: 120px;
      }
    }
    .ant-btn {
      position: absolute;
      bottom: 10pt;
      left: 10pt;
      right: 10pt;
      width: calc(100% - 20pt);
      height: 40px;
      font-weight: bold;
      color: #ffffff;
      float: right;
      background: linear-gradient(41.51deg, #fe8803 -0.1%, #fed603 101.9%);
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      text-transform: uppercase;
      font-size: 15px;
      > span {
        padding-left: 18px;
      }
    }
    .qr-code {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      canvas {
        width: 50% !important;
        @media (max-width: 1300px){
          width: 58% !important;
        }
        @media (max-width: 1150px){
          width: 65% !important;
        }
        @media (max-width: 768px){
          width: 29% !important;
        }
        @media (max-width: 600px){
          width: 38% !important;
        }
        @media (max-width: 450px){
          width: 48% !important;
        }
        @media (max-width: 375px){
          width: 56% !important;
        }
        height: auto !important;
      }
      @media (max-width: 767px){
        padding: 30px 0px;
      }
    }
  }
  .red-text {
    color: red;
    padding-left: 5pt;
    font-size: 13px;
  }
}

`

export { Main }