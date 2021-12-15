import React, { useEffect } from "react";
import { Button, Tooltip, Form } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import actionReport from "@actions/report";
import { AdminPage } from "@admin/components/admin";
import DataContants from '@config/data-contants';
import { withTranslate } from 'react-redux-multilingual';
import '../style.scss';
import EditPost from "./editPost";
import CreateOrEditSetPost from './createOrEditSetPost';
import ViewSetPost from "./viewSetPost";
import ViewPost from "./viewPost";
import CreatePost from './createPost';
import Authorization from "@admin/components/auth"
function index(props) {
    const { translate } = props;
    const id = props.match.params.id;
    const rolesLogin = props.auth && props.auth.authorities && props.auth.authorities.length && props.auth.authorities.find((option) => option === "ROLE_admin_ivisitor");
    useEffect(() => {
        props.searchDonVi();
        props.updateData({
            showInput: false,
            showChoosePost: false,
            boCauHoiId: id ? id : props.boCauHoiId,
            donViId: props.donViId,
            dataShow: {},
            dataShowLanguage: {},
            checkMacDinh: "",
            trlsPost: [],
            cauTraLoi: props.cauTraLoi && props.cauTraLoi.length ? props.cauTraLoi : [
                { noiDung: props.loaiCauHoi === 5 ? translate("cot") + " 1" : translate("tuychon") + " 1" },
                { noiDung: props.loaiCauHoi === 5 ? translate("cot") + " 2" : translate("tuychon") + " 2" }
            ],
            cauHoiChiTiet: props.cauHoiChiTiet && props.cauHoiChiTiet.length ? props.cauHoiChiTiet : [
                { noiDung: translate("hang") + " 1" },
                { noiDung: translate("hang") + " 2" }
            ],
        });
        if (props.boCauHoiId) {
            props.loadSetPostDetail(id ? id : props.boCauHoiId).then(s => {
                if (s && s.data && s.data.trls.length === 0) {
                    props.updateData({
                        trls: DataContants.listLanguage,
                    })
                } else {
                    let data = DataContants.listLanguage.map((item, index) => {
                        let objTen = s.data && s.data.trls && s.data.trls.length && s.data.trls.find(option => {
                            return option.language === item.language
                        })
                        return ({
                            language: item.language,
                            name: item.name,
                            english: item.english,
                            ten: objTen && objTen.ten,
                            translate: item.translate
                        })
                    })
                    props.updateData({
                        trls: data,
                    })
                }
            }).catch(e => {
            })
        } else {
            props.updateData({
                trls: DataContants.listLanguage,
            });
        }
        if (props.donViId) {
            props.searchKhuVuc(props.donViId);
            props.searchDoiTuong(props.donViId);
        } else {
            props.updateData({
                dataDoiTuong: [],
                dataKhuVuc: [],
                khuVucId: "",
                doiTuongId: ""
            })
        }
    }, []);
    const onShowUpdate = (key) => {
        props.updateData({
            dataShow: {},
        })
        let data = {
            [`onShow${key}`]: true,
        }
        props.updateData({
            dataShow: data,
            index: key,
        })
    }
    const onShowChoosePost = () => {
        props.updateData({
            showChoosePost: !props.showChoosePost,
            dataShow: {},
            dataShowLanguage: {},
        })
    }
    const onChooseType = (key) => {
        let stt = Number(props.dataPost && props.dataPost.length) + 1
        props.updateData({
            dataShow: {},
            dataShowLanguage: {},
        })
        let data = {
            [`onShow${key}`]: true,
        }
        let listLanguage = DataContants.listLanguage.map(item => {
            return ({
                language: item.language,
                name: item.name,
                english: item.english,
                translate: item.translate,
                cauTraLoi: [
                    { noiDung: props.loaiCauHoi === 5 ? translate("cot") + " 1" : translate("tuychon") + " 1" },
                    { noiDung: props.loaiCauHoi === 5 ? translate("cot") + " 2" : translate("tuychon") + " 2" }
                ],
                cauHoiChiTiet: [
                    { noiDung: translate("hang") + " 1" },
                    { noiDung: translate("hang") + " 2" }
                ]
            })
        })
        props.updateData({
            trlsPost: listLanguage,
            dataShow: data,
            index: key,
            showChoosePost: !props.showChoosePost,
            showInput: true,
            loaiCauHoi: key,
            soThuTu: stt,
            noiDung: "",
            goiY: "",
            id: "",
            batBuoc: false,
            nhieuDong: false,
            chonNhieu: false,
            cauTraLoi: [],
            cauHoiChiTiet: [],
            batThuong: false,
            macDinh: false
        })
    }
    const onChooseTypeEdit = (key, item) => {
        props.updateData({
            dataShow: {},
            dataShowLanguage: {},
            showInput: false,
            checkMacDinh: "",
            trlsPost: []
        })
        let data = {
            [`onShow${key}`]: true,
        }
        if (item && item.trls && item.trls.length === 0) {
            props.updateData({
                trlsPost: DataContants.listLanguage,
            })
        } else {
            let dataTrls = DataContants.listLanguage.map(option => {
                let objTen = item && item.trls && item.trls.length && item.trls.find(option2 => {
                    return option2.language === option.language
                })
                return ({
                    language: option.language,
                    name: option.name,
                    english: option.english,
                    translate: option.translate,
                    noiDung: objTen && objTen.noiDung,
                    goiY: objTen && objTen.goiY,
                    cauTraLoi: objTen && objTen.cauTraLoi && objTen.cauTraLoi.length ? objTen.cauTraLoi.map(option2 => {
                        return ({
                            noiDungtrls: option2.noiDung,
                            ma: option2.ma,
                        })
                    }) : [],
                    cauHoiChiTiet: objTen && objTen.cauHoiChiTiet && objTen.cauHoiChiTiet.length ? objTen.cauHoiChiTiet.map(option3 => {
                        return ({
                            noiDungtrls: option3.noiDung,
                            ma: option3.ma,
                        })
                    }) : []
                })
            })
            props.updateData({
                trlsPost: dataTrls,
            })
        }
        props.updateData({
            dataShow: data,
            soThuTu: item.soThuTu,
            noiDung: item.noiDung,
            goiY: item.goiY,
            id: item.id,
            loaiCauHoi: item.loaiCauHoi,
            batBuoc: item.batBuoc,
            boCauHoiId: props.boCauHoiId,
            nhieuDong: item.nhieuDong,
            chonNhieu: item.chonNhieu,
            cauTraLoi: item.cauTraLoi,
            cauHoiChiTiet: item.cauHoiChiTiet,
        })
    }
    const onSave = e => {
        props.updateData({
            cauTraLoi: props.cauTraLoi,
            cauHoiChiTiet: props.cauHoiChiTiet
        })
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.createOrEdit().then(s => {
                    props.updateData({
                        boCauHoiId: s.id,
                        showInput: false,
                        dataShow: {},
                        dataShowLanguage: {},
                        showChoosePost: false,
                        cauTraLoi: []
                    })
                    props.loadSetPostDetail(props.boCauHoiId)
                })
            }
        });
    };
    const onRemove = e => {
        props.updateData({
            dataShow: {},
            dataShowLanguage: {},
            index: null,
            showChoosePost: false,
            showInput: false,
            loaiCauHoi: null,
            soThuTu: "",
            noiDung: "",
            goiY: "",
            id: "",
            batBuoc: false,
            nhieuDong: false,
            chonNhieu: false,
            cauTraLoi: [],
            cauHoiChiTiet: [],
            batThuong: false,
            macDinh: false,
            checkMacDinh: "",
            trls: [],
            trlsPost: [],
        })
        props.loadSetPostDetail(props.boCauHoiId)
    }
    const addInputDroplist = (check) => {
        let stt = Number(props.cauTraLoi.length) + 1
        let data = {
            noiDung: "Tùy chọn " + stt
        }
        props.cauTraLoi.push(data)
        props.updateData({
            cauTraLoi: props.cauTraLoi
        })
        if (check) {
            props.loadSetPostDetail(props.boCauHoiId)
        }
    }
    const addMore = () => {
        let data = {
            noiDung: translate("khac"),
            themThongTin: true
        }
        props.cauTraLoi.push(data)
        props.updateData({
            cauTraLoi: props.cauTraLoi
        })
        props.loadSetPostDetail(props.boCauHoiId)
    }
    const deleteOption = (index) => {
        props.cauTraLoi.splice(index, 1);
        props.updateData({
            cauTraLoi: props.cauTraLoi
        })
        props.loadSetPostDetail(props.boCauHoiId)
    }
    const deleteOptionRow = (index) => {
        props.cauHoiChiTiet.splice(index, 1);
        props.updateData({
            cauHoiChiTiet: props.cauHoiChiTiet
        })
        props.loadSetPostDetail(props.boCauHoiId)
    }
    const addRow = (check) => {
        let stt = Number(props.cauHoiChiTiet.length) + 1
        let data = {
            noiDung: translate("hang") + stt
        }
        props.cauHoiChiTiet.push(data)
        props.updateData({
            cauHoiChiTiet: props.cauHoiChiTiet
        })
        if (check) {
            props.loadSetPostDetail(props.boCauHoiId)
        }
    }
    const addCol = (check) => {
        let stt = Number(props.cauTraLoi.length) + 1
        let data = {
            noiDung: translate("cot") + stt
        }
        props.cauTraLoi.push(data)
        props.updateData({
            cauTraLoi: props.cauTraLoi
        })
        if (check) {
            props.loadSetPostDetail(props.boCauHoiId)
        }
    }
    const onclose = () => {
        props.history.push("/post");
    }
    const deleteIndex = (data) => {
        props.onDelete(data, props.boCauHoiId);
        props.updateData({
            showInput: false,
            showChoosePost: false
        })
    }
    const showLanguage = (key) => {
        props.updateData({
            dataShowLanguage: {}
        })
        let data = {
            [`onShowLanguage${key}`]: true,
        }
        props.updateData({
            dataShowLanguage: data,
        })
    }
    const authorities = ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"]
    return (
        <Authorization
            arrRole={authorities}
        >
            <AdminPage
                className="mgr-post-create"
                icon="subheader-icon fal fa-edit"
                header={id ? translate("capnhatbocauhoi") : translate("themmoibocauhoi")}
                subheader=" ">
                <div className="home-post">
                    <div className="ui-sortable sortable-grid create">
                        <div className="header-post hover-index"
                            onClick={() => {
                                onShowUpdate("header")
                            }} >
                            {props.dataShow[`onShow${"header"}`] ?
                                <CreateOrEditSetPost
                                    rolesLogin={rolesLogin}
                                    showLanguage={showLanguage}
                                /> : <ViewSetPost />}
                        </div>
                        {props.dataPost && props.dataPost.length ? props.dataPost.map((item, index) => {
                            return (
                                <div key={index} className="body-post hover-index" >
                                    {
                                        (props.dataShow[`onShowview${item.soThuTu}`] ?
                                            <>
                                                <div className="detail-edit">
                                                    <div className="stt">{props.soThuTu}</div>
                                                    <div className="post">
                                                        <EditPost
                                                            data={item}
                                                            showLanguage={showLanguage}
                                                            deleteOption={deleteOption}
                                                            addInputDroplist={addInputDroplist}
                                                            addMore={addMore}
                                                            deleteOptionRow={deleteOptionRow}
                                                            addRow={addRow}
                                                            addCol={addCol}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="button-create button-save">
                                                    <Button className="button-post" onClick={onRemove}><i className="fal fa-times"></i>{translate("huy")}</Button>
                                                    <Button className="button-post" onClick={onSave}>{translate("capnhat")}</Button>
                                                </div>
                                            </> :
                                            <div className="view-check">
                                                <ViewPost
                                                    dataViewPost={item}
                                                    onChooseTypeEdit={onChooseTypeEdit}
                                                />
                                                {index === (props.dataPost.length - 1) ?
                                                    <div className="button-delete">
                                                        <Tooltip placement="topLeft" title={"Xóa"}>
                                                            <i className="fal fa-trash-alt" onClick={() => deleteIndex(item)}></i>
                                                        </Tooltip>
                                                    </div> : null}
                                            </div>
                                        )}
                                </div>
                            )
                        }) : null}
                        {props.boCauHoiId &&
                            <CreatePost
                                onShowChoosePost={onShowChoosePost}
                                onSave={onSave}
                                onRemove={onRemove}
                                addMore={addMore}
                                deleteOptionRow={deleteOptionRow}
                                addRow={addRow}
                                addCol={addCol}
                                deleteOption={deleteOption}
                                addInputDroplist={addInputDroplist}
                                onChooseType={onChooseType}
                                showLanguage={showLanguage}
                            />}
                    </div>
                </div >
                <div className="footer-button">
                    <Button className="button-close" onClick={() => onclose()}>{translate("quaylai")}</Button>
                </div>
            </AdminPage >
        </Authorization>
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
            soThuTu: state.post.soThuTu ? state.post.soThuTu : (state.post.dataPost && state.post.dataPost.length ? state.post.dataPost.length + 1 : 1),
            noiDung: state.post.noiDung,
            goiY: state.post.goiY,
            ma: state.post.ma,
            ten: state.post.ten,
            donViId: state.post.donViId ? state.post.donViId : state.auth && state.auth.auth && state.auth.auth.donViId,
            khuVucId: state.post.khuVucId,
            boCauHoiId: state.post.boCauHoiId,
            doiTuongId: state.post.doiTuongId,
            donVi: state.post.donVi,
            doiTuong: state.post.doiTuong,
            loaiCauHoi: state.post.loaiCauHoi,
            cauTraLoi: state.post.cauTraLoi,
            cauHoiChiTiet: state.post.cauHoiChiTiet,
            batThuong: state.post.batThuong,
            macDinh: state.post.macDinh,
            trls: state.post.trls || [],
            trlsPost: state.post.trlsPost || [],

            index: state.post.index,
            dataDonVi: state.report.dataDonVi || [],
            dataKhuVuc: state.report.dataKhuVuc || [],
            dataDoiTuong: state.report.dataDoiTuong || [],
            dataPost: state.post.dataPost || [],

            showInput: state.post.showInput,
            showChoosePost: state.post.showChoosePost,
            dataShow: state.post.dataShow || {},
            dataShowLanguage: state.post.dataShowLanguage || {}
        };
    }, {
    updateData: actionPost.updateData,
    createOrEdit: actionPost.createOrEdit,
    searchDonVi: actionReport.searchDonVi,
    searchKhuVuc: actionReport.searchKhuVuc,
    searchDoiTuong: actionReport.searchDoiTuong,
    loadSetPostDetail: actionPost.loadSetPostDetail,
    onDelete: actionPost.onDelete
}
)(Form.create()(withTranslate(index)));
