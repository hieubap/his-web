import React, { useEffect } from "react";
import { Form, Switch } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import { withTranslate } from 'react-redux-multilingual';
import SwitchBatBuoc from './components/switch';
import '../style.scss';
import NoiDung from './components/noiDung';
import GoiY from './components/goiY';
import TrlsPost from './components/trlsPost';
import Loai4 from './components/loai4';
import Loai5 from './components/loai5';
function index(props) {
    const { translate } = props;
    useEffect(() => {
        props.updateData({
            cauTraLoi: props.cauTraLoi && props.cauTraLoi.length ? props.cauTraLoi : [
                { noiDung: props.loaiCauHoi === 5 ? translate("cot") + " 1" : translate("tuychon") + " 1" },
                { noiDung: props.loaiCauHoi === 5 ? translate("cot") + " 2" : translate("tuychon") + " 2" }
            ],
            cauHoiChiTiet: props.cauHoiChiTiet && props.cauHoiChiTiet.length ? props.cauHoiChiTiet : [
                { noiDung: translate("hang") + " 1" },
                { noiDung: translate("hang") + " 2" }
            ],
        })
    }, []);
    return (
        <>
            <div className="row">
                <div className={`col-md-${props.dataShowLanguage[`onShowLanguage${props.soThuTu}noidung`] ? "6" : "12"}`}
                    onClick={() => props.showLanguage(`${props.soThuTu}noidung`)} >
                    <NoiDung />
                </div>
                {props.dataShowLanguage[`onShowLanguage${props.soThuTu}noidung`] ?
                    <TrlsPost keyTrls={"noiDung"} /> : null}
            </div>
            <div className="row">
                <div className={`col-md-${props.dataShowLanguage[`onShowLanguage${props.soThuTu}goiy`] ? "6" : "12"}`}
                    onClick={() => props.showLanguage(`${props.soThuTu}goiy`)} >
                    <GoiY />
                </div>
                {props.dataShowLanguage[`onShowLanguage${props.soThuTu}goiy`] ?
                    <TrlsPost keyTrls={"goiY"} /> : null}
            </div>
            {props.loaiCauHoi === 4 ?
                <Loai4
                    addInputDroplist={props.addInputDroplist}
                    deleteOption={props.deleteOption}
                    addMore={props.addMore}
                    showLanguage={props.showLanguage}
                /> : props.loaiCauHoi === 5 ?
                    <Loai5
                        addCol={props.addCol}
                        deleteOption={props.deleteOption}
                        addRow={props.addRow}
                        deleteOptionRow={props.deleteOptionRow}
                        showLanguage={props.showLanguage}
                    /> : null}
            {props.loaiCauHoi === 3 ?
                <div className="switch">
                    <Switch
                        checked={props.nhieuDong ? true : false}
                        onChange={e => {
                            props.updateData({
                                nhieuDong: e
                            });
                        }}
                    /> <span style={{ paddingLeft: 8, paddingRight: 30 }}>{translate("cautraloidai")}</span>
                    <SwitchBatBuoc />
                </div> : props.loaiCauHoi === 4 ? null :
                    <Form.Item>
                        <SwitchBatBuoc />
                    </Form.Item>}
        </>
    );
}
export default connect(
    state => {
        return {
            intl: (state.Intl || {}).locale,
            auth: state.auth && state.auth.auth,
            batBuoc: state.post.batBuoc || false,
            nhieuDong: state.post.nhieuDong || false,
            checkMacDinh: state.post.checkMacDinh || "",
            soThuTu: state.post.soThuTu ? state.post.soThuTu : (state.post.dataPost && state.post.dataPost.length ? state.post.dataPost.length + 1 : 1),
            noiDung: state.post.noiDung,
            goiY: state.post.goiY,
            loaiCauHoi: state.post.loaiCauHoi,
            cauTraLoi: state.post.cauTraLoi,
            cauHoiChiTiet: state.post.cauHoiChiTiet,
            batThuong: state.post.batThuong,
            macDinh: state.post.macDinh,
            trlsPost: state.post.trlsPost || [],

            index: state.post.index,
            dataPost: state.post.dataPost || [],

            showInput: state.post.showInput,
            dataShowLanguage: state.post.dataShowLanguage || {}
        };
    }, {
    updateData: actionPost.updateData,
}
)(withTranslate(index));
