import React from 'react';
import SelectedService from './SelectedService';
import SumMoney from './SumMoney';
import { Main } from './styledMain';

function index() {
    const data = [
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },
        {
            col1: "Khám răng",
            col2: "1",
            col3: "500.000",
        },

    ];

    return (
        <Main>
            <SelectedService
                data={data}
            />
            <SumMoney />
        </Main>
    )
}

export default index
