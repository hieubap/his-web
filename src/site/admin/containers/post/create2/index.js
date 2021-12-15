import React, { useEffect } from "react";
import { Form, Button, Radio, Input, Select, Switch, DatePicker, Checkbox, Tooltip } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import actionReport from "@actions/report";
import { AdminPage } from "@admin/components/admin";
import DataContants from '@config/data-contants';
import { withTranslate } from 'react-redux-multilingual';
import '../style.scss';
const { Option } = Select;
const { TextArea } = Input;
function index(props) {
    const { translate } = props;
    const id = props.match.params.id;
    const rolesLogin = props.auth && props.auth.authorities && props.auth.authorities.length && props.auth.authorities.find((option) => option === "ROLE_admin_ivisitor");
    useEffect(() => {
        props.searchDonVi();
        props.updateData({
            showInput: false,
            showChoosePost: false,
            cauTraLoi: [],
            boCauHoiId: id ? id : props.boCauHoiId,
            donViId: props.donViId,
            dataShow: {},
            dataShowLanguage: {},
            checkMacDinh: ""
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
            dataShowLanguage: {},
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
        props.updateData({
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
            checkMacDinh: ""
        })
        let data = {
            [`onShow${key}`]: true,
        }
        if (item && item.trls && item.trls.length === 0) {
            props.updateData({
                trlsPost: DataContants.listLanguage,
            })
        } else {
            let data = DataContants.listLanguage.map((item, index) => {
                let objTen = item && item.trls && item.trls.length && item.trls.find(option => {
                    return option.language === item.language
                })
                return ({
                    language: item.language,
                    name: item.name,
                    english: item.english,
                    translate: item.translate,
                    noiDung: objTen && objTen.noiDung,
                })
            })
            props.updateData({
                trlsPost: data,
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
    const createOrEditSetPost = e => {
        props.updateData({
            dataShowLanguage: {}
        })
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.createOrEditSetPost().then(s => {
                    props.updateData({
                        boCauHoiId: s.id,
                        showInput: false,
                        dataShow: {},
                        dataShowLanguage: {},
                        showChoosePost: false,
                        checkMacDinh: ""
                    })
                }).catch(e => {

                })
            }
        });
    };
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
            checkMacDinh: ""
        })
    }
    const checkKhuvuc = (data) => {
        let status = props.dataKhuVuc ? props.dataKhuVuc.length && props.dataKhuVuc.filter((item) => {
            return parseInt(item.id) === Number(data);
        }) : [];
        if (status.length > 0) return status[0];
        return {};
    };
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
    const detailOption = (index) => {
        props.cauTraLoi.splice(index, 1);
        props.updateData({
            cauTraLoi: props.cauTraLoi
        })
        props.loadSetPostDetail(props.boCauHoiId)
    }
    const detailOptionRow = (index) => {
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
    const { getFieldDecorator } = props.form;
    return (
        <AdminPage
            className="mgr-post-create"
            icon="subheader-icon fal fa-edit"
            header={id ? translate("capnhatbocauhoi") : translate("themmoibocauhoi")}
            subheader=" ">
            <div className="row home-post">
                <div className="col-lg-1"></div>
                <div className="col-lg-10 ui-sortable sortable-grid create">
                    <div className="header-post hover-index"
                        onClick={() => {
                            onShowUpdate("header")
                        }} >
                        {
                            props.dataShow[`onShow${"header"}`] ?
                                <div className="change-input">
                                    <div className="input-item">
                                        <Form.Item label={translate("macauhoi") + " (*)"} onClick={() => showLanguage("null")}>
                                            {getFieldDecorator("ma", {
                                                rules: [{
                                                    required: true,
                                                    message: translate("vuilongnhapmacauhoi")
                                                }],
                                                initialValue: props.ma
                                            })(
                                                <Input
                                                    autoComplete="off"
                                                    placeholder={translate("nhapmacauhoi")}
                                                    onChange={(e) => {
                                                        props.updateData({
                                                            ma: e.target.value
                                                        })
                                                    }}
                                                />
                                            )}
                                        </Form.Item>
                                        <div className="row">
                                            <div
                                                className={`col-md-${props.dataShowLanguage[`onShowLanguage${"tenbocauhoi"}`] ? "6" : "12"}`}
                                                onClick={() => showLanguage("tenbocauhoi")}
                                            >
                                                <Form.Item label={translate("tencauhoi")}>
                                                    {getFieldDecorator("ten", {
                                                        rules: [{
                                                            required: true,
                                                            message: translate("vuilongnhaptencauhoi")
                                                        }],
                                                        initialValue: props.ten
                                                    })(
                                                        <Input
                                                            autoComplete="off"
                                                            placeholder={translate("vuilongnhapcauhoi")}
                                                            onChange={(e) => {
                                                                props.intl === "vi" ? props.trls[0].ten = e.target.value : props.trls[1].ten = e.target.value
                                                                props.updateData({
                                                                    ten: e.target.value,
                                                                    trls: [...props.trls]
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                </Form.Item>
                                            </div>
                                            {
                                                props.dataShowLanguage[`onShowLanguage${"tenbocauhoi"}`] ?
                                                    <div className="col-md-6 language-detail">
                                                        <Form.Item label={translate("ngonngu")}>
                                                            {
                                                                props.trls.map((option, index) => {
                                                                    return (
                                                                        <div className="row language-item" key={index}>
                                                                            <div className="col-md-3">{translate(option.translate)}</div>
                                                                            <div className="col-md-9">
                                                                                <Input
                                                                                    onChange={(e) => {
                                                                                        option.ten = e.target.value
                                                                                        props.updateData({
                                                                                            trls: [...props.trls]
                                                                                        })
                                                                                    }}
                                                                                    value={option.ten}
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Item>
                                                    </div> : null
                                            }
                                        </div>
                                        <Form.Item label={translate("donvi") + " (*)"} onClick={() => showLanguage("null")}>
                                            {getFieldDecorator("donViId", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: translate("vuilongchondonvi")
                                                    }
                                                ],
                                                initialValue: props.donViId
                                            })(
                                                <Select
                                                    disabled={rolesLogin === "ROLE_admin_ivisitor" ? false : true}
                                                    className="select-post"
                                                    onChange={(e) => {
                                                        props.updateData({
                                                            donViId: e,
                                                            khuVucId: "",
                                                            doiTuongId: ""
                                                        });
                                                        props.searchKhuVuc(e);
                                                        props.searchDoiTuong(e);
                                                    }}
                                                    showSearch
                                                    filterOption={(input, option) =>
                                                        option.props.children
                                                            .toLowerCase().unsignText()
                                                            .indexOf(input.toLowerCase().unsignText()) >= 0
                                                    }
                                                    placeholder={translate("chondonvi")}
                                                >
                                                    {props.dataDonVi.map((option, index) => {
                                                        return (
                                                            <Option key={index} value={option.id}>
                                                                {option.ten}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                        <Form.Item label={translate("khuvuc")} onClick={() => showLanguage("null")}>
                                            <Select
                                                className="select-post"
                                                onChange={(e) => {
                                                    props.updateData({ khuVucId: e });
                                                }}
                                                value={props.khuVucId}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.props.children
                                                        .toLowerCase().unsignText()
                                                        .indexOf(input.toLowerCase().unsignText()) >= 0
                                                }
                                                placeholder={translate("chonkhuvuc")}
                                            >
                                                <Option value="">{translate("chonkhuvuc")}</Option>
                                                {props.dataKhuVuc.map((option, index) => {
                                                    return (
                                                        <Option key={index} value={option.id}>
                                                            {option.ten}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label={translate("doituong")} onClick={() => showLanguage("null")}>
                                            <Select
                                                className="select-post"
                                                onChange={(e) => {
                                                    props.updateData({ doiTuongId: e });
                                                }}
                                                value={props.doiTuongId}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.props.children
                                                        .toLowerCase().unsignText()
                                                        .indexOf(input.toLowerCase().unsignText()) >= 0
                                                }
                                                placeholder={translate("chondoituong")}
                                            >
                                                <Option value={""}>{translate("chondoituong")}</Option>
                                                {props.dataDoiTuong.map((option, index) => {
                                                    return (
                                                        <Option key={index} value={option.id}>
                                                            {option.ten}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item onClick={() => showLanguage("null")}>
                                            <Switch
                                                checked={props.active ? true : false}
                                                onChange={e => {
                                                    props.updateData({
                                                        active: e
                                                    });
                                                }}
                                            /> <span style={{ paddingLeft: 8, paddingRight: 30 }}>{translate("hieuluc")}</span>
                                        </Form.Item>
                                        {props.boCauHoiId ?
                                            <Button className="button-post" onClick={createOrEditSetPost}><i className="fal fa-plus" ></i>{translate("capnhapbocauhoi")}</Button>
                                            : <Button className="button-post" onClick={createOrEditSetPost}><i className="fal fa-plus" ></i>{translate("themmoibocauhoi")}</Button>}
                                        {/* <Button className="button-post" onClick={onRemoveSetPost} style={{ marginLeft: 15 }}><i className="fal fa-times"></i>{translate("huy")}</Button> */}
                                    </div>
                                </div> :
                                <div className="header-view">
                                    {props.boCauHoiId ?
                                        <div className="title-view">
                                            <div className="row detail">
                                                <div className="col-md-2">{translate("macauhoi")}: </div>
                                                <div className="col-md-10">{props.ma}</div>
                                            </div>
                                            <div className="row detail">
                                                <div className="col-md-2">{translate("tencauhoi")}:</div>
                                                <div className="col-md-10">{props.ten}</div>
                                            </div>
                                            <div className="row detail">
                                                <div className="col-md-2">{translate("donvi")}:</div>
                                                <div className="col-md-10">{props.donVi && props.donVi.ten}</div>
                                            </div>
                                            <div className="row detail">
                                                <div className="col-md-2">{translate("khuvuc")}:</div>
                                                <div className="col-md-10">{checkKhuvuc(props.khuVucId) ? checkKhuvuc(props.khuVucId).ten : null}</div>
                                            </div>
                                            <div className="row detail">
                                                <div className="col-md-2">{translate("doituong")}:</div>
                                                <div className="col-md-10">{props.doiTuong && props.doiTuong.ten}</div>
                                            </div>
                                        </div> : <div className="title-defaut">{translate("nhapthongtinbocauhoi")}</div>}
                                </div>
                        }
                    </div>
                    {
                        props.dataPost && props.dataPost.length ? props.dataPost.map((item, index) => {
                            return (
                                <div key={index} className="body-post hover-index" >
                                    {
                                        (props.dataShow[`onShowview${item.soThuTu}`] ?
                                            <>
                                                <div className="detail-edit">
                                                    <div className="stt">{props.soThuTu}</div>
                                                    <div className="post">
                                                        <div className="row">
                                                            <div
                                                                className={`col-md-${props.dataShowLanguage[`onShowLanguage${props.soThuTu}noidung`] ? "6" : "12"}`}
                                                                onClick={() => showLanguage(`${props.soThuTu}noidung`)}
                                                            >
                                                                <Form.Item>
                                                                    {getFieldDecorator("noiDung", {
                                                                        rules: [
                                                                            {
                                                                                required: true,
                                                                                message: translate("vuilongnhapnoidungcauhoi")
                                                                            }
                                                                        ],
                                                                        initialValue: props.noiDung
                                                                    })(
                                                                        <Input
                                                                            placeholder={translate("tencauhoi")}
                                                                            onChange={(e) => {
                                                                                props.intl === "vi" ? props.trlsPost[0].noiDung = e.target.value : props.trlsPost[1].noiDung = e.target.value
                                                                                props.updateData({
                                                                                    noiDung: e.target.value,
                                                                                    trlsPost: [...props.trlsPost]
                                                                                });
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Form.Item>
                                                            </div>
                                                            {
                                                                props.dataShowLanguage[`onShowLanguage${props.soThuTu}noidung`] ?
                                                                    <div className="col-md-6 language-detail">
                                                                        {/* <Form.Item label={translate("ngonngu")}> */}
                                                                        {
                                                                            props.trlsPost.map((option, index) => {
                                                                                return (
                                                                                    <div className="row language-item" style={{ marginBottom: 15 }} key={index}>
                                                                                        <div className="col-md-3">{translate(option.translate)}</div>
                                                                                        <div className="col-md-9">
                                                                                            <Input
                                                                                                onChange={(e) => {
                                                                                                    option.noiDung = e.target.value
                                                                                                    props.updateData({
                                                                                                        trlsPost: [...props.trlsPost]
                                                                                                    })
                                                                                                }}
                                                                                                value={option.noiDung}
                                                                                            />
                                                                                        </div>

                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                        {/* </Form.Item> */}
                                                                    </div> : null
                                                            }
                                                        </div>
                                                        <div className="row">
                                                            <div
                                                                className={`col-md-${props.dataShowLanguage[`onShowLanguage${props.soThuTu}goiy`] ? "6" : "12"}`}
                                                                onClick={() => showLanguage(`${props.soThuTu}goiy`)}
                                                            >
                                                                {
                                                                    props.nhieuDong ?
                                                                        <Form.Item>
                                                                            {getFieldDecorator("goiY", {
                                                                                rules: [
                                                                                    {
                                                                                        required: true,
                                                                                        message: translate("vuilongnhapnoidungoiy")
                                                                                    }
                                                                                ],
                                                                                initialValue: props.goiY
                                                                            })(
                                                                                <TextArea
                                                                                    placeholder={translate("goiy")}
                                                                                    onChange={(e) => {
                                                                                        props.intl === "vi" ? props.trlsPost[0].goiY = e.target.value : props.trlsPost[1].goiY = e.target.value
                                                                                        props.updateData({
                                                                                            goiY: e.target.value,
                                                                                            trlsPost: [...props.trlsPost]
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </Form.Item> :
                                                                        props.loaiCauHoi !== 5 ?
                                                                            <Form.Item>
                                                                                {getFieldDecorator("goiY", {
                                                                                    rules: [
                                                                                        {
                                                                                            required: true,
                                                                                            message: translate("vuilongnhapnoidungoiy")
                                                                                        }
                                                                                    ],
                                                                                    initialValue: props.goiY
                                                                                })(
                                                                                    <Input
                                                                                        placeholder={translate("goiy")}
                                                                                        onChange={(e) => {
                                                                                            props.intl === "vi" ? props.trlsPost[0].goiY = e.target.value : props.trlsPost[1].goiY = e.target.value
                                                                                            props.updateData({
                                                                                                goiY: e.target.value,
                                                                                                trlsPost: [...props.trlsPost]
                                                                                            });
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </Form.Item> : null
                                                                }
                                                            </div>
                                                            {
                                                                props.dataShowLanguage[`onShowLanguage${props.soThuTu}goiy`] ?
                                                                    <div className="col-md-6 language-detail">
                                                                        {/* <Form.Item label={translate("ngonngu")}> */}
                                                                        {
                                                                            props.trlsPost.map((option, index) => {
                                                                                return (
                                                                                    <div className="row language-item" style={{ marginBottom: 15 }} key={index}>
                                                                                        <div className="col-md-3">{translate(option.translate)}</div>
                                                                                        <div className="col-md-9">
                                                                                            <Input
                                                                                                onChange={(e) => {
                                                                                                    option.goiY = e.target.value
                                                                                                    props.updateData({
                                                                                                        trlsPost: [...props.trlsPost]
                                                                                                    })
                                                                                                }}
                                                                                                value={option.goiY}
                                                                                            />
                                                                                        </div>

                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                        {/* </Form.Item> */}
                                                                    </div> : null
                                                            }
                                                        </div>

                                                        {
                                                            props.loaiCauHoi === 4 ?
                                                                <div className="droplist-create">
                                                                    {
                                                                        props.cauTraLoi && props.cauTraLoi.length ? props.cauTraLoi.map((item2, index2) => {
                                                                            return (
                                                                                <div className="more-option" key={index2}>
                                                                                    <div className="row">
                                                                                        <div className="col-md-7" style={{ display: "flex" }}>
                                                                                            <Input
                                                                                                placeholder={translate("vuilongnhaptenchotuychon")}
                                                                                                onChange={(e) => {
                                                                                                    item2.noiDung = e.target.value
                                                                                                    props.updateData({
                                                                                                        cauTraLoi: [...props.cauTraLoi]
                                                                                                    })
                                                                                                }}
                                                                                                disabled={item2.themThongTin ? true : false}
                                                                                                value={item2.noiDung}
                                                                                            />
                                                                                            <i className="fal fa-trash-alt"
                                                                                                style={{ paddingLeft: 15, marginTop: 10 }}
                                                                                                onClick={() => { detailOption(index2) }}
                                                                                            ></i>
                                                                                        </div>
                                                                                        <div className="col-md-5">
                                                                                            {
                                                                                                item2.themThongTin ? null :
                                                                                                    <>
                                                                                                        <Checkbox
                                                                                                            className="more-radio"
                                                                                                            checked={item2.batThuong}
                                                                                                            value={index2.toString()}
                                                                                                            onChange={(event) => {
                                                                                                                item2.batThuong = !item2.batThuong;
                                                                                                                props.updateData({
                                                                                                                    cauTraLoi: [...props.cauTraLoi]
                                                                                                                })
                                                                                                            }}>{translate("batthuong")}</Checkbox>
                                                                                                        {props.chonNhieu ?
                                                                                                            <Checkbox
                                                                                                                className="more-radio"
                                                                                                                checked={item2.macDinh}
                                                                                                                value={index2.toString()}
                                                                                                                onChange={(event) => {
                                                                                                                    item2.macDinh = !item2.macDinh;
                                                                                                                    props.updateData({
                                                                                                                        cauTraLoi: [...props.cauTraLoi]
                                                                                                                    })
                                                                                                                }}>{translate("macdinh")}</Checkbox> :
                                                                                                            <Radio
                                                                                                                className="more-radio"
                                                                                                                checked={item2.macDinh ? true : false}
                                                                                                                value={index2.toString()}
                                                                                                                onChange={(event) => {
                                                                                                                    let data = props.cauTraLoi.map((a, b) => {
                                                                                                                        return ({
                                                                                                                            noiDung: a.noiDung,
                                                                                                                            batThuong: a.batThuong,
                                                                                                                            ma: a.ma,
                                                                                                                            macDinh: b === index2 ? true : false,
                                                                                                                            themThongTin: a.themThongTin
                                                                                                                        })
                                                                                                                    })
                                                                                                                    props.updateData({
                                                                                                                        cauTraLoi: data,
                                                                                                                        checkMacDinh: event.target.value
                                                                                                                    })
                                                                                                                }}>{translate("macdinh")}</Radio>}
                                                                                                    </>
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }) : null
                                                                    }
                                                                    <div className="droplist">
                                                                        <div className="add" onClick={() => addInputDroplist()}><i className="fal fa-plus" ></i><div>Thêm tùy chọn</div></div>
                                                                        {/* <div className="more" onClick={() => addMore()}>{translate("themtuychonkhac")}</div> */}
                                                                        {props.cauTraLoi && props.cauTraLoi.length && props.cauTraLoi.find(item => {
                                                                            return item.noiDung === "Khác"
                                                                        }) && props.cauTraLoi.find(item => {
                                                                            return item.noiDung === "Khác"
                                                                        }).noiDung ? null : <div className="more" onClick={() => addMore(true)}>{translate("themtuychonkhac")}</div>}
                                                                    </div>
                                                                    <div className="switch" style={{ paddingTop: 20 }}>
                                                                        <Switch
                                                                            checked={props.chonNhieu ? true : false}
                                                                            onChange={e => {
                                                                                let data = props.cauTraLoi.map((a, b) => {
                                                                                    return ({
                                                                                        noiDung: a.noiDung,
                                                                                        batThuong: a.batThuong,
                                                                                        ma: a.ma,
                                                                                        macDinh: false,
                                                                                        themThongTin: a.themThongTin
                                                                                    })
                                                                                })
                                                                                props.updateData({
                                                                                    chonNhieu: e,
                                                                                    cauTraLoi: e ? props.cauTraLoi : data
                                                                                });
                                                                            }}
                                                                        /> <span style={{ paddingLeft: 8, paddingRight: 30 }}>{translate("nhieucautraloi")}</span>
                                                                        <Switch
                                                                            checked={props.batBuoc ? true : false}
                                                                            onChange={e => {
                                                                                props.updateData({
                                                                                    batBuoc: e
                                                                                });
                                                                            }}
                                                                        /> <span style={{ paddingLeft: 8 }}>{translate("batbuoc")}</span>
                                                                    </div>
                                                                </div> : props.loaiCauHoi === 5 ?
                                                                    <div className="droplist-create">
                                                                        <div className="row">
                                                                            <div className="col-md-5">
                                                                                <div className="row-create">{translate("hang")}</div>
                                                                            </div>
                                                                            <div className="col-md-5">
                                                                                <div className="row-create">{translate("cot")}</div>
                                                                            </div>
                                                                            <div className="col-md-2"></div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-5">
                                                                                {
                                                                                    props.cauHoiChiTiet && props.cauHoiChiTiet.length ? props.cauHoiChiTiet.map((option1, index1) => {
                                                                                        return (
                                                                                            <div className="row">
                                                                                                <div className="col-md-7">
                                                                                                    <div className="more-option full-option" key={index1}>
                                                                                                        <Input
                                                                                                            placeholder={translate("vuilongnhapnoidungchohang")}
                                                                                                            onChange={(e) => {
                                                                                                                option1.noiDung = e.target.value;
                                                                                                                props.updateData({
                                                                                                                    cauHoiChiTiet: [...props.cauHoiChiTiet]
                                                                                                                })
                                                                                                            }}
                                                                                                            value={option1.noiDung}
                                                                                                        />
                                                                                                        <i className="fal fa-trash-alt"
                                                                                                            style={{ paddingLeft: 15 }}
                                                                                                            onClick={() => { detailOptionRow(index1) }}
                                                                                                        ></i>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-md-5">
                                                                                                    <div className="more-option">
                                                                                                        <Checkbox
                                                                                                            checked={option1.batThuong}
                                                                                                            value={index1.toString()}
                                                                                                            onChange={(event) => {
                                                                                                                option1.batThuong = !option1.batThuong;
                                                                                                                props.updateData({
                                                                                                                    cauHoiChiTiet: [...props.cauHoiChiTiet]
                                                                                                                })
                                                                                                            }}>{translate("batthuong")}</Checkbox>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }) : null
                                                                                }
                                                                                <div className="droplist">
                                                                                    <div className="add" onClick={() => addRow(true)}><i className="fal fa-plus" ></i><div>{translate("themhang")}</div></div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-7">
                                                                                {
                                                                                    props.cauTraLoi && props.cauTraLoi.length ? props.cauTraLoi.map((option2, index2) => {
                                                                                        return (
                                                                                            <div className="row" key={index2}>
                                                                                                <div className="col-md-6">
                                                                                                    <div className="more-option full-option" >
                                                                                                        <Input
                                                                                                            placeholder={translate("vuilongnhapnoidungchocotnay")}
                                                                                                            onChange={(e) => {
                                                                                                                option2.noiDung = e.target.value
                                                                                                                props.updateData({
                                                                                                                    cauTraLoi: [...props.cauTraLoi]
                                                                                                                })
                                                                                                            }}
                                                                                                            value={option2.noiDung}
                                                                                                        />
                                                                                                        <i className="fal fa-trash-alt"
                                                                                                            style={{ paddingLeft: 15 }}
                                                                                                            onClick={() => { detailOption(index2) }}
                                                                                                        ></i>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-md-3">
                                                                                                    <div className="more-option">
                                                                                                        <Checkbox
                                                                                                            checked={option2.batThuong}
                                                                                                            value={index2.toString()}
                                                                                                            onChange={(event) => {
                                                                                                                option2.batThuong = !option2.batThuong;
                                                                                                                props.updateData({
                                                                                                                    cauTraLoi: [...props.cauTraLoi]
                                                                                                                })
                                                                                                            }}>{translate("batthuong")}</Checkbox>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-md-3">
                                                                                                    <div className="more-option">
                                                                                                        <Checkbox
                                                                                                            checked={option2.macDinh}
                                                                                                            value={index2.toString()}
                                                                                                            onChange={(event) => {
                                                                                                                option2.macDinh = !option2.macDinh;
                                                                                                                props.updateData({
                                                                                                                    cauTraLoi: [...props.cauTraLoi]
                                                                                                                })
                                                                                                            }}>{translate('macdinh')}</Checkbox>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }) : null
                                                                                }
                                                                                <div className="droplist">
                                                                                    <div className="add" onClick={() => addCol(true)}><i className="fal fa-plus" ></i><div>{translate("themcot")}</div></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> : null
                                                        }
                                                        {
                                                            props.loaiCauHoi === 3 ?
                                                                <div className="switch">
                                                                    <Switch
                                                                        checked={props.nhieuDong ? true : false}
                                                                        onChange={e => {
                                                                            props.updateData({
                                                                                nhieuDong: e
                                                                            });
                                                                        }}
                                                                    /> <span style={{ paddingLeft: 8, paddingRight: 30 }}>{translate("cautraloidai")}</span>
                                                                    <Switch
                                                                        checked={props.batBuoc ? true : false}
                                                                        onChange={e => {
                                                                            props.updateData({
                                                                                batBuoc: e
                                                                            });
                                                                        }}
                                                                    /> <span style={{ paddingLeft: 8 }}>{translate("batbuoc")}</span>
                                                                </div> : props.loaiCauHoi === 4 ? null :
                                                                    <Form.Item>
                                                                        <Switch
                                                                            checked={props.batBuoc ? true : false}
                                                                            onChange={e => {
                                                                                item.batBuoc = e
                                                                                props.updateData({
                                                                                    batBuoc: e
                                                                                });
                                                                            }}
                                                                            value={props.batBuoc}
                                                                        /> <span style={{ paddingLeft: 8 }}>{translate("batbuoc")}</span>
                                                                    </Form.Item>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="button-create button-save">
                                                    <Button className="button-post" onClick={onRemove}><i className="fal fa-times"></i>{translate("huy")}</Button>
                                                    <Button className="button-post" onClick={onSave}>{translate("capnhat")}</Button>
                                                </div>
                                            </>
                                            : <div className="view-check">
                                                <div className="post-detail-view" onClick={() => onChooseTypeEdit(`view${item.soThuTu}`, item)}>
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
                        }) : null
                    }
                    {
                        props.boCauHoiId &&
                        <div className="body-post hover-index" >
                            {
                                props.showInput ? <div className="body-index">
                                    <div className="stt">{props.soThuTu}</div>
                                    <div className="post">
                                        <Form.Item>
                                            {getFieldDecorator("noiDung", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: translate("vuilongnhapnoidungcauhoi")
                                                    }
                                                ],
                                                initialValue: props.noiDung
                                            })(
                                                <Input
                                                    placeholder={translate("tencauhoi")}
                                                    onChange={(e) => {
                                                        props.updateData({
                                                            noiDung: e.target.value
                                                        })
                                                    }}
                                                />
                                            )}
                                        </Form.Item>
                                        {
                                            props.nhieuDong ?
                                                <Form.Item>
                                                    {getFieldDecorator("goiY", {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: translate("vuilongnhapnoidungoiy")
                                                            }
                                                        ],
                                                        initialValue: props.goiY
                                                    })(
                                                        <TextArea
                                                            placeholder={translate("goiy")}
                                                            onChange={(e) => {
                                                                props.updateData({
                                                                    goiY: e.target.value
                                                                })
                                                            }}
                                                        />
                                                    )}
                                                </Form.Item> :
                                                props.loaiCauHoi !== 5 ?
                                                    <Form.Item>
                                                        {getFieldDecorator("goiY", {
                                                            rules: [
                                                                {
                                                                    required: true,
                                                                    message: translate("vuilongnhapnoidungoiy")
                                                                }
                                                            ],
                                                            initialValue: props.goiY
                                                        })(
                                                            <Input
                                                                placeholder={translate("goiy")}
                                                                onChange={(e) => {
                                                                    props.updateData({
                                                                        goiY: e.target.value
                                                                    })
                                                                }}
                                                            />
                                                        )}
                                                    </Form.Item> : null
                                        }
                                        {
                                            props.loaiCauHoi === 5 ?
                                                <div className="droplist-create">
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="row-create">{translate("hang")}</div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="row-create">{translate("cot")}</div>
                                                        </div>
                                                        <div className="col-md-2"></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            {
                                                                props.cauHoiChiTiet && props.cauHoiChiTiet.length ? props.cauHoiChiTiet.map((option1, index1) => {
                                                                    return (
                                                                        <div className="row">
                                                                            <div className="col-md-7">
                                                                                <div className="more-option full-option" key={index1}>
                                                                                    <Input
                                                                                        placeholder={translate("vuilongnhapnoidungchohang")}
                                                                                        onChange={(e) => {
                                                                                            // props.cauHoiChiTiet[index1] = e.target.value
                                                                                            // props.updateData({
                                                                                            //     cauHoiChiTiet: [...props.cauHoiChiTiet]
                                                                                            // })
                                                                                            option1.noiDung = e.target.value;
                                                                                            props.updateData({
                                                                                                cauHoiChiTiet: [...props.cauHoiChiTiet]
                                                                                            })
                                                                                        }}
                                                                                        value={option1.noiDung}
                                                                                    />
                                                                                    <i className="fal fa-trash-alt"
                                                                                        style={{ paddingLeft: 15 }}
                                                                                        onClick={() => { detailOptionRow(index1) }}
                                                                                    ></i>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-5">
                                                                                <div className="more-option">
                                                                                    <Checkbox
                                                                                        checked={option1.batThuong}
                                                                                        value={index1.toString()}
                                                                                        onChange={(event) => {
                                                                                            option1.batThuong = !option1.batThuong;
                                                                                            props.updateData({
                                                                                                cauHoiChiTiet: [...props.cauHoiChiTiet]
                                                                                            })
                                                                                        }}>{translate("batthuong")}</Checkbox>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }) : null
                                                            }
                                                            <div className="droplist">
                                                                <div className="add" onClick={() => addRow(true)}><i className="fal fa-plus" ></i><div>{translate("themhang")}</div></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7">
                                                            {
                                                                props.cauTraLoi && props.cauTraLoi.length ? props.cauTraLoi.map((option2, index2) => {
                                                                    return (
                                                                        <div className="row" key={index2}>
                                                                            <div className="col-md-6">
                                                                                <div className="more-option full-option" >
                                                                                    <Input
                                                                                        placeholder={translate("vuilongnhapnoidungchocotnay")}
                                                                                        onChange={(e) => {
                                                                                            option2.noiDung = e.target.value
                                                                                            props.updateData({
                                                                                                cauTraLoi: [...props.cauTraLoi]
                                                                                            })
                                                                                        }}
                                                                                        value={option2.noiDung}
                                                                                    />
                                                                                    <i className="fal fa-trash-alt"
                                                                                        style={{ paddingLeft: 15 }}
                                                                                        onClick={() => { detailOption(index2) }}
                                                                                    ></i>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="more-option">
                                                                                    <Checkbox
                                                                                        checked={option2.batThuong}
                                                                                        value={index2.toString()}
                                                                                        onChange={(event) => {
                                                                                            option2.batThuong = !option2.batThuong;
                                                                                            props.updateData({
                                                                                                cauTraLoi: [...props.cauTraLoi]
                                                                                            })
                                                                                        }}>{translate("batthuong")}</Checkbox>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="more-option">
                                                                                    <Checkbox
                                                                                        checked={option2.macDinh}
                                                                                        value={index2.toString()}
                                                                                        onChange={(event) => {
                                                                                            option2.macDinh = !option2.macDinh;
                                                                                            props.updateData({
                                                                                                cauTraLoi: [...props.cauTraLoi]
                                                                                            })
                                                                                        }}>{translate('macdinh')}</Checkbox>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }) : null
                                                            }
                                                            <div className="droplist">
                                                                <div className="add" onClick={() => addCol(true)}><i className="fal fa-plus" ></i><div>{translate("themcot")}</div></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : null
                                        }
                                        {
                                            props.loaiCauHoi === 4 ?
                                                <div className="droplist-create">
                                                    {
                                                        props.cauTraLoi && props.cauTraLoi.length ? props.cauTraLoi.map((item2, index2) => {
                                                            return (
                                                                <div className="more-option" key={index2}>
                                                                    <div className="row">
                                                                        <div className="col-md-7" style={{ display: "flex" }}>
                                                                            <Input
                                                                                placeholder={translate("vuilongnhaptenchotuychon")}
                                                                                onChange={(e) => {
                                                                                    item2.noiDung = e.target.value
                                                                                    props.updateData({
                                                                                        cauTraLoi: [...props.cauTraLoi]
                                                                                    })
                                                                                }}
                                                                                disabled={item2.themThongTin ? true : false}
                                                                                value={item2.noiDung}
                                                                            />
                                                                            <i className="fal fa-trash-alt"
                                                                                style={{ paddingLeft: 15, marginTop: 10 }}
                                                                                onClick={() => { detailOption(index2) }}
                                                                            ></i>
                                                                        </div>
                                                                        <div className="col-md-5">
                                                                            {
                                                                                item2.themThongTin ? null :
                                                                                    <>
                                                                                        <Checkbox
                                                                                            className="more-radio"
                                                                                            checked={item2.batThuong}
                                                                                            value={index2.toString()}
                                                                                            onChange={(event) => {
                                                                                                item2.batThuong = !item2.batThuong;
                                                                                                props.updateData({
                                                                                                    cauTraLoi: [...props.cauTraLoi]
                                                                                                })
                                                                                            }}>{translate("batthuong")}</Checkbox>
                                                                                        {props.chonNhieu ?
                                                                                            <Checkbox
                                                                                                className="more-radio"
                                                                                                checked={item2.macDinh}
                                                                                                value={index2.toString()}
                                                                                                onChange={(event) => {
                                                                                                    item2.macDinh = !item2.macDinh;
                                                                                                    props.updateData({
                                                                                                        cauTraLoi: [...props.cauTraLoi]
                                                                                                    })
                                                                                                }}>{translate("macdinh")}</Checkbox> :
                                                                                            <Radio
                                                                                                className="more-radio"
                                                                                                checked={item2.macDinh ? true : false}
                                                                                                value={index2.toString()}
                                                                                                onChange={(event) => {
                                                                                                    let data = props.cauTraLoi.map((a, b) => {
                                                                                                        return ({
                                                                                                            noiDung: a.noiDung,
                                                                                                            batThuong: a.batThuong,
                                                                                                            ma: a.ma,
                                                                                                            macDinh: b === index2 ? true : false,
                                                                                                            themThongTin: a.themThongTin
                                                                                                        })
                                                                                                    })
                                                                                                    props.updateData({
                                                                                                        cauTraLoi: data,
                                                                                                        checkMacDinh: event.target.value
                                                                                                    })
                                                                                                }}>{translate("macdinh")}</Radio>}
                                                                                    </>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }) : null
                                                    }
                                                    <div className="droplist">
                                                        <div className="add" onClick={() => addInputDroplist(true)}><i className="fal fa-plus" ></i><div>{translate("themtuychon")}</div></div>
                                                        {props.cauTraLoi && props.cauTraLoi.length && props.cauTraLoi.find(item => {
                                                            return item.noiDung === "Khác"
                                                        }) && props.cauTraLoi.find(item => {
                                                            return item.noiDung === "Khác"
                                                        }).noiDung ? null : <div className="more" onClick={() => addMore(true)}>{translate("themtuychonkhac")}</div>}
                                                    </div>
                                                </div>
                                                : null
                                        }
                                        <div className="switch">
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
                                            {props.loaiCauHoi === 4 ?
                                                <>
                                                    <Switch
                                                        checked={props.chonNhieu ? true : false}
                                                        onChange={e => {
                                                            let data = props.cauTraLoi.map((a, b) => {
                                                                return ({
                                                                    noiDung: a.noiDung,
                                                                    batThuong: a.batThuong,
                                                                    ma: a.ma,
                                                                    macDinh: false,
                                                                    themThongTin: a.themThongTin
                                                                })
                                                            })
                                                            props.updateData({
                                                                chonNhieu: e,
                                                                cauTraLoi: e ? props.cauTraLoi : data
                                                            });
                                                        }}
                                                    /> <span style={{ paddingLeft: 8, paddingRight: 30 }}>{translate("nhieucautraloi")}</span>
                                                </> : null}
                                            <Switch
                                                checked={props.batBuoc ? true : false}
                                                onChange={e => {
                                                    props.updateData({
                                                        batBuoc: e
                                                    });
                                                }}
                                            /> <span style={{ paddingLeft: 8 }}>{translate("batbuoc")}</span>
                                        </div>
                                    </div>
                                </div> : null
                            }
                            <div className="button-create">
                                {!props.showInput && !props.showChoosePost && <Button className="button-post" onClick={() => onShowChoosePost()}><i className="fal fa-plus" ></i>{translate("taocauhoi")}</Button>}
                            </div>
                            <div className="button-create button-save">
                                {props.showInput && <Button className="button-post" onClick={onRemove}><i className="fal fa-times"></i>{translate("huy")}</Button>}
                                {props.showInput && <Button className="button-post" onClick={onSave}><i className="fal fa-plus" ></i>{translate("luu")}</Button>}
                            </div>
                            {
                                props.showChoosePost &&
                                <div className="list-button">
                                    <i className="fal fa-plus" onClick={() => onShowChoosePost()}></i>
                                    <div>
                                        {
                                            DataContants.listPostType && DataContants.listPostType.length && DataContants.listPostType.map((item, index) => {
                                                return (
                                                    <Button key={index} onClick={() => onChooseType(item.id)}>{props.intl === "vi" ? item.name : item.english}</Button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    }

                </div>
            </div >
            <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-10 footer-button">
                    <Button className="button-close" onClick={() => onclose()}>{translate("quaylai")}</Button>
                </div>
            </div>
        </AdminPage >
    );
}
export default connect(
    state => {
        return {
            intl: (state.Intl || {}).locale,
            auth: state.auth && state.auth.auth,
            tieude: state.post.tieude,
            batBuoc: state.post.batBuoc || false,
            nhieuDong: state.post.nhieuDong || false,
            chonNhieu: state.post.chonNhieu || false,
            checkMacDinh: state.post.checkMacDinh || "",
            active: state.post.active,
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
            cauTraLoi: state.post.cauTraLoi && state.post.cauTraLoi.length ? state.post.cauTraLoi : [
                {
                    noiDung: state.post.loaiCauHoi === 5 ? "Cột 1" : "Tùy chọn 1"
                },
                {
                    noiDung: state.post.loaiCauHoi === 5 ? "Cột 2" : "Tùy chọn 2"
                }
            ],
            cauHoiChiTiet: state.post.cauHoiChiTiet && state.post.cauHoiChiTiet.length ? state.post.cauHoiChiTiet : [
                {
                    noiDung: "Hàng 1"
                },
                {
                    noiDung: "Hàng 2"
                }
            ],
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
    createOrEditSetPost: actionPost.createOrEditSetPost,
    searchDonVi: actionReport.searchDonVi,
    searchKhuVuc: actionReport.searchKhuVuc,
    searchDoiTuong: actionReport.searchDoiTuong,
    loadSetPostDetail: actionPost.loadSetPostDetail,
    onDelete: actionPost.onDelete
}
)(Form.create()(withTranslate(index)));
