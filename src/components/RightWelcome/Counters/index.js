import React, { useState } from 'react';
import { Main } from './styled';
import { Col } from 'antd';
import Select from 'components/Select';
import cacheUtils from "utils/cache-utils";

const Index = props => {
    const { listCounters, quayTiepDonId } = props;
    const [quayId, setQuayId] = useState(quayTiepDonId);

    const onSave = (data) => {
        setQuayId(data);
        cacheUtils.save("COUNTERS_ID", "", data, false);
    }
    return (
        <Main>
            <Col md={13}>
                <div className="item">
                    <div>Chọn quầy</div>
                    <Select
                        onChange={(e) => onSave(e)}
                        value={quayId}
                        className="select"
                        placeholder={"Quầy tự chọn"}
                        data={listCounters}
                    >
                    </Select>
                </div>
            </Col >
            <Col md={11}>
                <div className="button-close" onClick={() => onSave(null)}>
                    <span>Đóng quầy</span>
                    <img src={require("assets/images/welcome/close.png")}></img>
                </div>
            </Col >
        </Main>
    )
}

export default Index;