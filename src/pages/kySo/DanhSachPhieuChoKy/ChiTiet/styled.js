import styled from "styled-components";
import { Row } from "antd";

export const Main = styled.div`
    .top-level-category{
        background-color:#f3f4f7;
        padding: 0px 30px;
        padding-top: 10px;
        .container {
            padding: 0px;
        }
    }
    .title-category{
        font-size: 20px;
        font-weight: bold;
        padding-left: 30px;
        background-color:#f3f4f7;
    }
    .body {
        /* background: #F4F5F7; */
        font-family: "Nunito Sans" !important;
        position: relative;
    }
    .bg-color{
        background: #F4F5F7;
    }
    .checkout-broken {
    text-align: center;
}
.checkout-broken .brokencheckout-title {
    /* color: #999; */
    font-size: 13px
}
.checkout-broken .step {
    float: left;
    padding: 0 10px;
    position: relative
}
.checkout-broken .timeline {
    height: 0;
    width: 50%;
    position: absolute;
    top: 25%;
    z-index: 1;
    border: 1px solid gray
}
.checkout-broken .timeline-r {
    right: 0
}
.checkout-broken .timeline-l {
    left: 0
}
.checkout-broken .step-text {
    border-radius: 16px;
    background-color: #e8eaed;
    width: 130px;
    padding: 0px 15px;
    font-size: 13px;
    z-index: 2;
    position: relative;
    /* height: 45px;
    width: 45px; */
    display: inline-block;
    border: 1px solid gray
}
.checkout-broken .step-desc {
    color: gray;
    font-size: 12px;
    opacity: .5
}
.checkout-broken .current .step-text {
    background-color: white;
}
.checkout-broken .current .step-desc {
    opacity: 1
}
.checkout-broken .completed .step-text {
    /* color: #fff;
    background: #1bbc9b; */
    cursor: pointer;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    border: 1px solid gray
}
@media screen and (max-width: 680px) {
    .step-desc {
        display: none
    }
    .checkout-broken .step {
        padding: 0 25px
    }
    .checkout-broken .timeline {
        top: 50%
    }
}
`;