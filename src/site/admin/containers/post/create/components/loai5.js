import React, { useEffect } from "react";
import { Form, Input, Checkbox } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import { withTranslate } from 'react-redux-multilingual';
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
        <div className="droplist-create">
            {/* <div className="row">
                <div className="col-md-5">
                    <div className="row-create">{translate("hang")}</div>
                </div>
                <div className="col-md-5">
                    <div className="row-create">{translate("cot")}</div>
                </div>
                <div className="col-md-2"></div>
            </div> */}
            <div className="row">
                <div className="col-md-12">
                    <div className="row-create">{translate("hang")}</div>
                </div>
                <div className="col-md-12">
                    {props.cauHoiChiTiet && props.cauHoiChiTiet.length ? props.cauHoiChiTiet.map((option1, index1) => {
                        return (
                            <div className="more-option" key={index1}>
                                <div className="row">
                                    <div className={`col-md-${props.dataShowLanguage[`onShowLanguage${index1}cauHoiChiTiet`] ? "4" : "8"}`}
                                        style={{ display: "flex" }}
                                        onClick={() => props.showLanguage(`${index1}cauHoiChiTiet`)}>
                                        <Input
                                            className="input-droplist"
                                            placeholder={translate("vuilongnhapnoidungchohang")}
                                            onChange={(e) => {
                                                option1.noiDung = e.target.value;
                                                option1.noiDungtrls = e.target.value;
                                                props.intl === "vi" ?
                                                    props.trlsPost[0].cauHoiChiTiet = [...props.cauHoiChiTiet] :
                                                    props.trlsPost[1].cauHoiChiTiet = [...props.cauHoiChiTiet]
                                                props.updateData({
                                                    cauHoiChiTiet: [...props.cauHoiChiTiet],
                                                    trlsPost: [...props.trlsPost]
                                                })
                                            }}
                                            value={option1.noiDung}
                                        />
                                        <i className="fal fa-trash-alt"
                                            style={{ paddingLeft: 15, marginTop: 10, marginRight: 20 }}
                                            onClick={() => { props.deleteOptionRow(index1) }}
                                        ></i>
                                    </div>
                                    {props.dataShowLanguage[`onShowLanguage${index1}cauHoiChiTiet`] ?
                                        <div className="col-md-4 language-detail">
                                            {props.trlsPost.map((option, index) => {
                                                return (
                                                    <div className="row language-item" style={{ marginBottom: 15 }} key={index}>
                                                        <div className="col-md-3" style={{ padding: 0 }}>{translate(option.translate)}</div>
                                                        <div className="col-md-9">
                                                            <Input
                                                                onChange={(e) => {
                                                                    // option.cauHoiChiTiet[index1] ? option.cauHoiChiTiet[index1] : {}
                                                                    option.cauHoiChiTiet[index1] = {
                                                                        noiDungtrls: e.target.value
                                                                    };
                                                                    props.updateData({
                                                                        cauHoiChiTiet: [...props.cauHoiChiTiet],
                                                                        trlsPost: [...props.trlsPost]
                                                                    });
                                                                }}
                                                                value={option.cauHoiChiTiet[index1] && option.cauHoiChiTiet[index1].noiDungtrls}
                                                            />
                                                        </div>

                                                    </div>
                                                )
                                            })}
                                        </div> : null}
                                    <div className="col-md-4">
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
                            </div>
                        )
                    }) : null}
                    <div className="droplist">
                        <div className="add" style={{ marginBottom: 20 }} onClick={() => props.addRow(true)}><i className="fal fa-plus" ></i><div>{translate("themhang")}</div></div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row-create">{translate("cot")}</div>
                </div>
                <div className="col-md-12">
                    {props.cauTraLoi && props.cauTraLoi.length ? props.cauTraLoi.map((option2, index2) => {
                        return (
                            <div className="more-option" key={index2}>
                                <div className="row" >
                                    <div className={`col-md-${props.dataShowLanguage[`onShowLanguage${index2}cautraloi`] ? "4" : "8"}`}
                                        style={{ display: "flex" }}
                                        onClick={() => props.showLanguage(`${index2}cautraloi`)}>
                                        <Input
                                            className="input-droplist"
                                            placeholder={translate("vuilongnhaptenchotuychon")}
                                            onChange={(e) => {
                                                option2.noiDung = e.target.value;
                                                option2.noiDungtrls = e.target.value;
                                                props.intl === "vi" ?
                                                    props.trlsPost[0].cauTraLoi = [...props.cauTraLoi] :
                                                    props.trlsPost[1].cauTraLoi = [...props.cauTraLoi]
                                                props.updateData({
                                                    cauTraLoi: [...props.cauTraLoi],
                                                    trlsPost: [...props.trlsPost]
                                                })
                                            }}
                                            value={option2.noiDung}
                                        />
                                        <i className="fal fa-trash-alt"
                                            style={{ paddingLeft: 15, marginTop: 10, marginRight: 20 }}
                                            onClick={() => { props.deleteOption(index2) }}
                                        ></i>
                                    </div>
                                    {props.dataShowLanguage[`onShowLanguage${index2}cautraloi`] ?
                                        <div className="col-md-4 language-detail">
                                            {props.trlsPost.map((option, index) => {
                                                return (
                                                    <div className="row language-item" style={{ marginBottom: 15 }} key={index}>
                                                        <div className="col-md-3" style={{ padding: 0 }}>{translate(option.translate)}</div>
                                                        <div className="col-md-9">
                                                            <Input
                                                                onChange={(e) => {
                                                                    // option.cauTraLoi[index2].noiDungtrls = e.target.value;
                                                                    option.cauTraLoi[index2] = {
                                                                        noiDungtrls: e.target.value
                                                                    };
                                                                    props.updateData({
                                                                        cauTraLoi: [...props.cauTraLoi],
                                                                        trlsPost: [...props.trlsPost]
                                                                    });
                                                                }}
                                                                value={option.cauTraLoi[index2] && option.cauTraLoi[index2].noiDungtrls}
                                                            />
                                                        </div>

                                                    </div>
                                                )
                                            })}
                                        </div> : null}
                                    <div className="col-md-2">
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
                                    <div className="col-md-2">
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
                            </div>
                        )
                    }) : null}
                    <div className="droplist">
                        <div className="add" onClick={() => props.addCol(true)}><i className="fal fa-plus" ></i><div>{translate("themcot")}</div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            batBuoc: state.post.batBuoc || false,
            noiDung: state.post.noiDung,
            trlsPost: state.post.trlsPost || [],
            intl: (state.Intl || {}).locale,
            cauTraLoi: state.post.cauTraLoi,
            cauHoiChiTiet: state.post.cauHoiChiTiet,
            dataShowLanguage: state.post.dataShowLanguage || {}
        };
    }, {
    updateData: actionPost.updateData,
}
)(withTranslate(index));
