import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withTranslate } from 'react-redux-multilingual';
import '../style.scss';
function index(props) {
    const { translate } = props;
    useEffect(() => {
    }, []);
    // const checkKhuvuc = (data) => {
    //     let status = []
    //     data.map(item => {
    //         let resultfilter = props.dataKhuVuc ? props.dataKhuVuc.length && props.dataKhuVuc.filter(item2 => {
    //             return parseInt(item2.id) === Number(item);
    //         }) : []
    //         return status = status.concat(resultfilter)
    //     })
    //     return status
    // };
    // const dataKhuVucFilter = checkKhuvuc(props.khuVucIds)
    return (
        <div className="header-view">
            {props.boCauHoiId ?
                <div className="title-view">
                    <div className="row detail detail-view">
                        <div className="col-md-2">{translate("macauhoi")}: </div>
                        <div className="col-md-10">{props.ma}</div>
                    </div>
                    <div className="row detail detail-view">
                        <div className="col-md-2">{translate("tencauhoi")}:</div>
                        <div className="col-md-10">{props.ten}</div>
                    </div>
                    <div className="row detail detail-view">
                        <div className="col-md-2">{translate("donvi")}:</div>
                        <div className="col-md-10">{props.donVi && props.donVi.ten}</div>
                    </div>
                    <div className="row detail detail-view">
                        <div className="col-md-2">{translate("khuvuc")}:</div>
                        <div className="col-md-10">
                            {props.khuVuc && props.khuVuc.length ? props.khuVuc.map(item => {
                                return <div key={item.id}>{item.ten}</div>
                            }) : null}
                        </div>
                    </div>
                    <div className="row detail detail-view">
                        <div className="col-md-2">{translate("doituong")}:</div>
                        <div className="col-md-10">
                            {props.doiTuong && props.doiTuong.length ? props.doiTuong.map(item => {
                                return (
                                    <div key={item.id}>{item.ten}</div>
                                )
                            }) : null}
                        </div>
                    </div>
                </div> : <div className="title-defaut">{translate("nhapthongtinbocauhoi")}</div>}
        </div>
    );
}
export default connect(
    state => {
        return {
            intl: (state.Intl || {}).locale,
            auth: state.auth && state.auth.auth,
            goiY: state.post.goiY,
            ma: state.post.ma,
            ten: state.post.ten,
            khuVuc: state.post.khuVuc,
            boCauHoiId: state.post.boCauHoiId,
            donVi: state.post.donVi,
            doiTuong: state.post.doiTuong,
            dataKhuVuc: state.report.dataKhuVuc || [],
        };
    }, {
}
)(withTranslate(index));
