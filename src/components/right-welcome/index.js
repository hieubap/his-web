import React from 'react';
import { Row } from 'antd';
import Counters from './Counters';
import TheNextPatient from './TheNextPatient';
import NumberOfPatients from './NumberOfPatients';
import ListMissed from './ListMissed';
import PatientsWelcomed from './PatientsWelcomed';
import { Main } from './styled';
const data = [
    {
        col1: "001",
        col2: "Lê Quang Huy - 24"
    },
    {
        col1: "002",
        col2: "Nguyễn Hoàng Nam - 24"
    },
    {
        col1: "003",
        col2: "Lê Quang Huy - 24"
    },
    {
        col1: "003",
        col2: "Lê Quang Huy - 24"
    },
    {
        col1: "003",
        col2: "Lê Quang Huy - 24"
    },
    {
        col1: "003",
        col2: "Lê Quang Huy - 24"
    },
];
const dataTwo = [
    {
        col1: "P122",
        col2: "Khám nội",
        col3: "10",
        col4: "7",
        col5: "2",
        col6: "1",
    },
    {
        col1: "P122",
        col2: "Khám nội",
        col3: "10",
        col4: "7",
        col5: "2",
        col6: "1",
    },
    {
        col1: "P122",
        col2: "Khám nội",
        col3: "10",
        col4: "7",
        col5: "2",
        col6: "1",
    },
    {
        col1: "P122",
        col2: "Khám nội",
        col3: "10",
        col4: "7",
        col5: "2",
        col6: "1",
    },
]
function index(props) {
    const { updateData, listCounters, searchQms, quayTiepDonId } = props;
    return (
        <Main className="container">
            <div className="header">Danh sách chờ tiếp đón</div>
            <Counters
                listCounters={listCounters}
                quayTiepDonId={quayTiepDonId}
            />
            <Row className="second-row">
                <TheNextPatient
                    searchQms={searchQms}
                    quayTiepDonId={quayTiepDonId}
                />
                <ListMissed
                    data={data}
                />
            </Row>
            <NumberOfPatients
                dataTwo={dataTwo}
            />
            <PatientsWelcomed
                dataTwo={dataTwo}
            />
        </Main>
    )
}

export default index
