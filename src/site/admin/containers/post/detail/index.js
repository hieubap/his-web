import React, { useEffect } from "react";
import { Form, Button, Radio, Input, Select, DatePicker } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import { AdminPage } from "@admin/components/admin";
import { withTranslate } from 'react-redux-multilingual';
import Authorization from "@admin/components/auth"
import '../style.scss';
const { Option } = Select;
const { TextArea } = Input;

function index(props) {
    const { translate } = props;
    const id = props.match.params.id;
    useEffect(() => {
        if (id) {
            props.loadSetPostDetail(id).then(s => {
            }).catch(e => {
                props.updateData({
                    boCauHoiId: "",
                    ma: "",
                    ten: "",
                    donViId: "",
                    khuVucIds: [],
                    doiTuong: [],
                    dataPost: []
                })
                props.history.push("/post");
            })
        }
    }, []);
    const onclose = () => {
        props.updateData({
            ma: "",
            ten: "",
            donViId: "",
            khuVucIds: [],
            doiTuong: [],
            boCauHoiId: "",
            dataDonVi: "",
            dataKhuVuc: "",
            dataDoiTuong: "",
            dataPost: "",
        })
        props.history.push("/post");
    }
    const checkDonvi = (data) => {
        let status = props.dataDonVi ? props.dataDonVi.length && props.dataDonVi.filter((item) => {
            return parseInt(item.id) === Number(data);
        }) : [];
        if (status.length > 0) return status[0];
        return {};
    };
    const checkKhuvuc = (data) => {
        let status = []
        if (data && data.length) {
            data.map(item => {
                let resultfilter = props.dataKhuVuc && props.dataKhuVuc.length ? props.dataKhuVuc.filter(item2 => {
                    return parseInt(item2.id) === Number(item);
                }) : []
                return status = status.concat(resultfilter)
            })
        } else {
        }
        return status
    };
    const dataKhuVucFilter = checkKhuvuc(props.khuVucIds)
    const authorities = ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"]
    return (
        <Authorization
            arrRole={authorities}
        >
            <AdminPage
                className="mgr-post-create"
                icon="subheader-icon fal fa-edit"
                header={translate("chitiet")}
                subheader=" ">
                <div className="row home-post">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-10 ui-sortable sortable-grid create">
                        <div className="header-post hover-index" >
                            <div className="header-view">
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
                                        <div className="col-md-10">{checkDonvi(props.donViId) ? checkDonvi(props.donViId).ten : null}</div>
                                    </div>
                                    <div className="row detail detail-view">
                                        <div className="col-md-2">{translate("khuvuc")}:</div>
                                        <div className="col-md-10">
                                            {props.khuVuc && props.khuVuc.length ? props.khuVuc.map(item => {
                                                return <div>{item.ten}</div>
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
                                </div>
                            </div>
                        </div>
                        {
                            props.dataPost && props.dataPost.length ? props.dataPost.map((item, index) => {
                                return (
                                    <div key={index} className="body-post hover-index" >
                                        <div className="view-check">
                                            <div className="post-detail-view">
                                                <div className="stt">{item.soThuTu}</div>
                                                <div className="detail-post">
                                                    {item.loaiCauHoi === 5 ? null : <div className="title">{item.noiDung + (item.batBuoc ? " (*)" : "")}</div>}
                                                    {
                                                        item.loaiCauHoi === 1 ?
                                                            < DatePicker
                                                                className="placeholder-view"
                                                                placeholder={item.goiY}
                                                                disabled
                                                            /> : item.loaiCauHoi === 2 ?
                                                                <Input
                                                                    className="placeholder-view"
                                                                    placeholder={item.goiY}
                                                                    disabled
                                                                /> : item.loaiCauHoi === 3 ?
                                                                    (<>
                                                                        {
                                                                            item.nhieuDong ?
                                                                                <TextArea
                                                                                    className="placeholder-view"
                                                                                    placeholder={item.goiY}
                                                                                    disabled
                                                                                />
                                                                                : <Input
                                                                                    className="placeholder-view"
                                                                                    placeholder={item.goiY}
                                                                                    disabled
                                                                                />
                                                                        }
                                                                    </>) : item.loaiCauHoi === 4 ?
                                                                        <Select
                                                                            showSearch
                                                                            filterOption={(input, option) =>
                                                                                option.props.children
                                                                                    .toLowerCase().unsignText()
                                                                                    .indexOf(input.toLowerCase().unsignText()) >= 0
                                                                            }
                                                                            mode={item.chonNhieu ? "multiple" : ""}
                                                                            placeholder={item.goiY}
                                                                        >
                                                                            {item.cauTraLoi && item.cauTraLoi.length && item.cauTraLoi.map((option, index) => {
                                                                                return (
                                                                                    <Option key={index} value={option.id}>
                                                                                        {option.noiDung}
                                                                                    </Option>
                                                                                );
                                                                            })}
                                                                        </Select> : item.loaiCauHoi === 5 ?
                                                                            <table>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <td><div className="title">{item.noiDung + (item.batBuoc ? " (*)" : "")}</div></td>
                                                                                        {item.cauTraLoi && item.cauTraLoi.length && item.cauTraLoi.map((option, index) => {
                                                                                            return (
                                                                                                <td key={index} style={{ textAlign: "center" }}>{option.noiDung}</td>
                                                                                            )
                                                                                        })}
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        item.cauHoiChiTiet && item.cauHoiChiTiet.length && item.cauHoiChiTiet.map((option2, index2) => {
                                                                                            return (
                                                                                                <tr key={index2}>
                                                                                                    <td>{option2.noiDung}</td>
                                                                                                    {item.cauTraLoi && item.cauTraLoi.length && item.cauTraLoi.map((option3, index3) => {
                                                                                                        return (
                                                                                                            <td key={index3} style={{ textAlign: "center" }}><Radio></Radio> </td>
                                                                                                        )
                                                                                                    })}
                                                                                                </tr>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                    <tr></tr>
                                                                                </tbody>
                                                                            </table> : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-10 footer-button">
                        <Button className="button-close" onClick={() => onclose()}>{translate("quaylai")}</Button>
                    </div>
                </div>
            </AdminPage >
        </Authorization>
    );
}

export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            ma: state.post.ma,
            ten: state.post.ten,
            donViId: state.post.donViId ? state.post.donViId : state.auth && state.auth.auth && state.auth.auth.donViId,
            khuVucIds: state.post.khuVucIds,
            doiTuongId: state.post.doiTuongId,
            boCauHoiId: state.post.boCauHoiId,
            dataDonVi: state.report.dataDonVi || [],
            dataKhuVuc: state.report.dataKhuVuc || [],
            dataDoiTuong: state.report.dataDoiTuong || [],
            dataPost: state.post.dataPost || [],
            doiTuong: state.post.doiTuong || [],
            khuVuc: state.post.khuVuc || [],
        };
    }, {
    updateData: actionPost.updateData,
    loadSetPostDetail: actionPost.loadSetPostDetail
}
)(Form.create()(withTranslate(index)));
