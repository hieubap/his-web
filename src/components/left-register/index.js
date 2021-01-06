import React from 'react';
import HeaderReception from "components/HeaderReception";
import InfoRegister from './InfoRegister';
import SearchService from './SearchService';
import { Main } from './styledMain';
function index() {
    const data = [
        {
            col1: "KB01",
            col2: "Lê Khám răng Huy",
            col3: "500.000",
            col4: "500.000",
            col5: "P131 - Phòng khám răng",
        },
        {
            col1: "KB01",
            col2: "Lê Khám răng Huy",
            col3: "500.000",
            col4: "500.000",
            col5: "P131 - Phòng khám răng",
        },
        {
            col1: "KB01",
            col2: "Lê Khám răng Huy",
            col3: "500.000",
            col4: "500.000",
            col5: "P131 - Phòng khám răng",
        },
        {
            col1: "KB01",
            col2: "Lê Khám răng Huy",
            col3: "500.000",
            col4: "500.000",
            col5: "P131 - Phòng khám răng",
        },
        {
            col1: "KB01",
            col2: "Lê Khám răng Huy",
            col3: "500.000",
            col4: "500.000",
            col5: "P131 - Phòng khám răng",
        },
        {
            col1: "KB01",
            col2: "Lê Khám răng Huy",
            col3: "500.000",
            col4: "500.000",
            col5: "P131 - Phòng khám răng",
        },
        {
            col1: "KB01",
            col2: "Lê Khám răng Huy",
            col3: "500.000",
            col4: "500.000",
            col5: "P131 - Phòng khám răng",
        },
        {
            col1: "KB01",
            col2: "Lê Khám răng Huy",
            col3: "500.000",
            col4: "500.000",
            col5: "P131 - Phòng khám răng",
        },

    ];
    return (
        <Main className="container-fluid">
            <HeaderReception
                title={"Đăng kí dịch vụ"}
            />
            <InfoRegister />
            <SearchService
                data={data}
            />
            <div className="button-bottom">
                <span>Quay lại</span>
                <img src={require("assets/images/welcome/back.png")}></img>
            </div>
        </Main>
    )
}

export default index
