import React, { useState, useEffect } from 'react';
import { Main } from './styled';

const Index = props => {
    const { searchQms, quayTiepDonId } = props;
    const [state, _setState] = useState({
        data: {}
    });
    const setState = (_state) => {
        _setState((state) => ({
            ...state, ...(_state || {}),
        }));
    };
    const { data } = state;
    useEffect(() => {
        if (quayTiepDonId) onSearch();
    }, [quayTiepDonId]);

    useEffect(() => {
        let timer = setInterval(() => {
            onSearch();
        }, 5000);
        return () => {
            clearInterval(timer);
        };
    }, [data]);

    const onSearch = () => {
        searchQms({ page: 0, size: 1, trangThai: 10, sort: "createdAt" }).then((s) => {
            let data = s && s[0]
            setState({ data: data || {} })
        });
    }
    return (
        <Main md={12} xl={18} xxl={12} className="pr-3 fix">
            <div className="person">
                <div className="title">Người bệnh tiếp theo</div>
                <div className="code">
                    <img src={require("assets/images/welcome/code.png")}></img>
                    <span>{data.soThuTu}</span>
                </div>
                <div className="name">{data.tenNb}- {data.tuoi}T</div>
            </div>
        </Main>
    )
}

export default Index;