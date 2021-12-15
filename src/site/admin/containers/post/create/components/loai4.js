import React, { useEffect } from "react";
import { Radio, Input, Checkbox, Switch } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import { withTranslate } from 'react-redux-multilingual';
import SwitchBatBuoc from './switch';
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
            {props.cauTraLoi && props.cauTraLoi.length ? props.cauTraLoi.map((item2, index2) => {
                return (
                    <div className="more-option" key={index2}>
                        <div className="row">
                            <div className={`col-md-${props.dataShowLanguage[`onShowLanguage${index2}cautraloi`] ? "4" : "8"}`}
                                style={{ display: "flex" }}
                                onClick={() => props.showLanguage(`${index2}cautraloi`)}>
                                <Input
                                    className="input-droplist"
                                    placeholder={translate("vuilongnhaptenchotuychon")}
                                    onChange={(e) => {
                                        item2.noiDung = e.target.value;
                                        item2.noiDungtrls = e.target.value;
                                        props.intl === "vi" ?
                                            props.trlsPost[0].cauTraLoi = [...props.cauTraLoi] :
                                            props.trlsPost[1].cauTraLoi = [...props.cauTraLoi]
                                        props.updateData({
                                            cauTraLoi: [...props.cauTraLoi],
                                            trlsPost: [...props.trlsPost]
                                        })
                                    }}
                                    disabled={item2.themThongTin ? true : false}
                                    value={item2.noiDung}
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
                                                            // props.intl === option.language ? item2.noiDung = e.target.value : item2.noiDungtrls = e.target.value;
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
                            <div className="col-md-4">
                                {item2.themThongTin ? null :
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
                                    </>}
                            </div>
                        </div>
                    </div>
                )
            }) : null}
            <div className="droplist">
                <div className="add" onClick={() => props.addInputDroplist()}><i className="fal fa-plus" ></i><div>Thêm tùy chọn</div></div>
                {props.cauTraLoi && props.cauTraLoi.length && props.cauTraLoi.find(item => {
                    return item.noiDung === "Khác"
                }) && props.cauTraLoi.find(item => {
                    return item.noiDung === "Khác"
                }).noiDung ? null : <div className="more" onClick={() => props.addMore(true)}>{translate("themtuychonkhac")}</div>}
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
                <SwitchBatBuoc />
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
            chonNhieu: state.post.chonNhieu || false,
            dataShowLanguage: state.post.dataShowLanguage || {}
        };
    }, {
    updateData: actionPost.updateData,
}
)(withTranslate(index));
