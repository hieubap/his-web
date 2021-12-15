import React, { useEffect } from "react";
import { Button, Switch } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import { withTranslate } from 'react-redux-multilingual';
import DataContants from '@config/data-contants';
import '../style.scss';
import SwitchBatBuoc from './components/switch';
import Loai4 from './components/loai4';
import Loai5 from './components/loai5';
import NoiDung from './components/noiDung';
import GoiY from './components/goiY';
import TrlsPost from './components/trlsPost';
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
        <div className="body-post hover-index" >
            {
                props.showInput ? <div className="body-index">
                    <div className="stt">{props.soThuTu}</div>
                    <div className="post">
                        <div className="row">
                            <div className={`col-md-${props.dataShowLanguage[`onShowLanguage${props.soThuTu}noidungcreate`] ? "6" : "12"}`}
                                onClick={() => props.showLanguage(`${props.soThuTu}noidungcreate`)} >
                                <NoiDung />
                            </div>
                            {
                                props.dataShowLanguage[`onShowLanguage${props.soThuTu}noidungcreate`] ?
                                    <TrlsPost keyTrls={"noiDung"} /> : null
                            }
                        </div>
                        <div className="row">
                            <div className={`col-md-${props.dataShowLanguage[`onShowLanguage${props.soThuTu}goiycreate`] ? "6" : "12"}`}
                                onClick={() => props.showLanguage(`${props.soThuTu}goiycreate`)} >
                                <GoiY />
                            </div>
                            {
                                props.dataShowLanguage[`onShowLanguage${props.soThuTu}goiycreate`] ?
                                    <TrlsPost keyTrls={"goiY"} /> : null
                            }
                        </div>
                        {
                            props.loaiCauHoi === 5 ?
                                <Loai5
                                    addCol={props.addCol}
                                    deleteOption={props.deleteOption}
                                    addRow={props.addRow}
                                    deleteOptionRow={props.deleteOptionRow}
                                    showLanguage={props.showLanguage}
                                /> : null
                        }
                        {
                            props.loaiCauHoi === 4 ?
                                <Loai4
                                    addInputDroplist={props.addInputDroplist}
                                    deleteOption={props.deleteOption}
                                    addMore={props.addMore}
                                    showLanguage={props.showLanguage}
                                />
                                : <div className="switch">
                                    {props.loaiCauHoi === 3 ?
                                        <>
                                            <Switch
                                                checked={props.nhieuDong ? true : false}
                                                onChange={e => {
                                                    props.updateData({
                                                        nhieuDong: e
                                                    });
                                                }}
                                            /> <span style={{ paddingLeft: 8, paddingRight: 30 }}>{translate("cautraloidai")}</span>
                                        </> : null}
                                    <SwitchBatBuoc />
                                </div>
                        }
                    </div>
                </div> : null
            }
            <div className="button-create">
                {!props.showInput && !props.showChoosePost && <Button className="button-post" onClick={() => props.onShowChoosePost()}><i className="fal fa-plus" ></i>{translate("taocauhoi")}</Button>}
            </div>
            <div className="button-create button-save">
                {props.showInput && <Button className="button-post" onClick={props.onRemove}><i className="fal fa-times"></i>{translate("huy")}</Button>}
                {props.showInput && <Button className="button-post" onClick={props.onSave}><i className="fal fa-plus" ></i>{translate("luu")}</Button>}
            </div>
            {
                props.showChoosePost &&
                <div className="list-button">
                    <i className="fal fa-plus" onClick={() => props.onShowChoosePost()}></i>
                    <div>
                        {
                            DataContants.listPostType && DataContants.listPostType.length && DataContants.listPostType.map((item, index) => {
                                return (
                                    <Button key={index} onClick={() => props.onChooseType(item.id)}>{props.intl === "vi" ? item.name : item.english}</Button>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
}
export default connect(
    state => {
        return {
            intl: (state.Intl || {}).locale,
            auth: state.auth && state.auth.auth,
            batBuoc: state.post.batBuoc || false,
            nhieuDong: state.post.nhieuDong || false,
            chonNhieu: state.post.chonNhieu || false,
            checkMacDinh: state.post.checkMacDinh || "",
            active: state.post.active,
            soThuTu: state.post.soThuTu ? state.post.soThuTu : (state.post.dataPost && state.post.dataPost.length ? state.post.dataPost.length + 1 : 1),
            noiDung: state.post.noiDung,
            goiY: state.post.goiY,
            boCauHoiId: state.post.boCauHoiId,
            doiTuongId: state.post.doiTuongId,
            doiTuong: state.post.doiTuong,
            loaiCauHoi: state.post.loaiCauHoi,
            cauTraLoi: state.post.cauTraLoi,
            cauHoiChiTiet: state.post.cauHoiChiTiet,
            batThuong: state.post.batThuong,
            macDinh: state.post.macDinh,

            index: state.post.index,
            dataPost: state.post.dataPost || [],

            showInput: state.post.showInput,
            showChoosePost: state.post.showChoosePost,
            dataShow: state.post.dataShow || {},
            dataShowLanguage: state.post.dataShowLanguage || {}
        };
    }, {
    updateData: actionPost.updateData,
}
)(withTranslate(index));