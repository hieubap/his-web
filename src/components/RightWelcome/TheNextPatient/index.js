import React, { useEffect } from 'react';
import { Main } from './styled';

const Index = props => {
    const { searchQms, quayTiepDonId } = props;
    useEffect(() => {
        // if (quayTiepDonId) searchQms(0, 1, 20, quayTiepDonId).then((s) => {
        // });
    }, []);
    return (
        <Main md={24} xl={24} xxl={12} className="pr-3 fix">
            <div className="person">
                <div className="title">Người bệnh tiếp theo</div>
                <div className="code">
                    <img src={require("assets/images/welcome/code.png")}></img>
                    <span>KCB0004</span>
                </div>
                <div className="name">Lương thị ngọc yến- 24T</div>
            </div>
        </Main>
    )
}

export default Index;