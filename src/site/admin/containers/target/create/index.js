import React, { useEffect } from "react";
import { Form, Input, Select, Switch, Button } from "antd";
import { Panel } from "@admin/components/admin";
import { connect } from "react-redux";
import actionTarget from "@actions/target";
import actionReport from "@actions/report";
import { withTranslate } from 'react-redux-multilingual';
import Trls from "./trls";
import '../style.scss'
import DataContants from '@config/data-contants';
const { Option } = Select;
const { TextArea } = Input;
function index(props) {
    const { translate } = props;
    let id = props.match.params.id
    useEffect(() => {
        props.searchDonVi();
        if (props.donViIds && props.donViIds.length) props.updateData({ khoaID: true })
        else props.updateData({ khoaID: false })
        if (props.donViIds) {
            props.searchKhuVuc(props.donViIds);
            props.searchKhoa(props.donViIds);
        } else {
            props.updateDataReport({ dataKhuVucTarget: [] });
        }
        if (id) {
            // xét trường hợp truyền id và lấy dữ liệu từ api
            //Truyền dữ liệu từ màn hình chính
            //Hoặc lấy dữ liệu từ api khi load lại trang 
            if (props.id) {
                let listLagnuage = DataContants.listLanguage.map((item, index) => {
                    let data = props.trls && props.trls.length ? props.trls.find(option => option.language === item.language) : {}
                    return ({
                        language: item.language,
                        name: item.name,
                        english: item.english,
                        translate: item.translate,
                        ten: data && data.ten,
                        thongTienLienQuan: data && data.thongTienLienQuan
                    });
                });
                props.updateData({ trlsTarget: listLagnuage });
            } else {
                props.getDetail(id).then(s => {
                    checkSearchKhuVuc(s.donViIds)
                    let listLagnuage = DataContants.listLanguage.map((item, index) => {
                        let data = s.trls && s.trls.length ? s.trls.find(option => option.language === item.language) : {}
                        return ({
                            language: item.language,
                            name: item.name,
                            english: item.english,
                            translate: item.translate,
                            ten: data && data.ten,
                            thongTienLienQuan: data && data.thongTienLienQuan
                        });
                    })
                    props.updateData({ trlsTarget: listLagnuage });
                })
            }
        } else {
            props.updateData({
                trlsTarget: DataContants.listLanguage.map((item) => {
                    return ({
                        language: item.language,
                        name: item.name,
                        english: item.english,
                        translate: item.translate,
                    })
                }),
                active: false
            });
        }
    }, []);
    const onClose = () => {
        props.updateData({
            ma: "",
            ten: "",
            donViIds: [],
            khuVucIds: [],
            ghiChu: "",
            trlsTarget: [],
            id: "",
        });
        props.history.replace("/target");
    };
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.createOrEdit().then(() => {
                    props.history.replace("/target");
                });
                props.updateDataReport({ dataKhuVucTarget: [] });
            }
        });
    };
    const showLanguage = (key) => {
        props.updateData({ dataShowLanguage: {} });
        let data = { [`onShowLanguage${key}`]: true };
        props.updateData({ dataShowLanguage: data });
    }
    const checkMaDoiTuong = (rule, value, callback,) => {
        if ((value || []).length == 0 || !value.trim()) {
            callback([new Error(translate("vuilongnhapmadoituong"))]);
        } else {
            callback()
        }
    }
    const checkTenDoiTuong = (rule, value, callback,) => {
        if ((value || []).length == 0 || !value.trim()) {
            callback([new Error(translate("vuilongnhaptendoituong"))]);
        } else {
            callback()
        }
    }
    const checkSearchKhuVuc = (e) => {
        props.searchKhuVuc(e);
    }
    const checkSearchKhoa = (e) => {
        if (e.length >0) {props.updateData({ khoaID: true })}
        else {props.updateData({ khoaID: false })}
        props.searchKhoa(e);
    }
    const { getFieldDecorator } = props.form;
    return (
        <>
            <Panel
                title={id ? "Cập nhật Danh sách Xuất kho" : "Thêm mới Danh sách Xuất kho"}
                id={"environmenttal-tests"}
                allowClose={false}
                allowCollapse={false}>
                <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
                    <Form.Item name="owner" label={translate("madoituong") + " (*):"} onClick={() => showLanguage(null)} >
                        {getFieldDecorator("ma", {
                            rules: [{ validator: checkMaDoiTuong }],
                            initialValue: props.ma,
                        })(
                            <Input
                                autoComplete="off"
                                placeholder={translate("nhapmadoituong")}
                                onChange={(e) => {
                                    props.updateData({ ma: e.target.value });
                                }}
                            />
                        )}
                    </Form.Item>
                    <div className="row">
                        <div className={`col-md-${props.dataShowLanguage["onShowLanguageName"] ? "5" : "12"}`}
                            onClick={() => showLanguage("Name")} >
                            <Form.Item name="owner" label={translate("tendoituong") + " (*):"} >
                                {getFieldDecorator("ten", {
                                    rules: [{ validator: checkTenDoiTuong }],
                                    initialValue: props.ten,
                                    name: "tendoituong"
                                })(
                                    <Input
                                        autoComplete="off"
                                        placeholder={translate("nhaptendoituong")}
                                        onChange={(e) => {
                                            props.intl === "vi" ? props.trlsTarget[0].ten = e.target.value : props.trlsTarget[1].ten = e.target.value
                                            props.updateData({
                                                ten: e.target.value,
                                                trlsTarget: [...props.trlsTarget]
                                            });
                                        }}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            {props.dataShowLanguage['onShowLanguageName']}
                        </div>
                        {props.dataShowLanguage['onShowLanguageName'] ? <Trls keyTrls={"ten"} /> : null}
                    </div>
                    <div className="row">
                        <div className={`col-md-${props.dataShowLanguage["onShowLanguagethongTienLienQuan"] ? "5" : "12"}`}
                            onClick={() => showLanguage("thongTienLienQuan")} >
                            <Form.Item name="owner" label={translate("goiythongtinlienhe")} >
                                {getFieldDecorator("thongTienLienQuan", {
                                    initialValue: props.thongTienLienQuan,
                                })(
                                    <Input
                                        autoComplete="off"
                                        placeholder={translate("nhapgoiythongtinlienhe")}
                                        onChange={(e) => {
                                            props.intl === "vi" ? props.trlsTarget[0].thongTienLienQuan = e.target.value : props.trlsTarget[1].thongTienLienQuan = e.target.value
                                            props.updateData({
                                                thongTienLienQuan: e.target.value,
                                                trlsTarget: [...props.trlsTarget]
                                            });
                                        }}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            {props.dataShowLanguage['onShowLanguagethongTienLienQuan']}
                        </div>
                        {props.dataShowLanguage['onShowLanguagethongTienLienQuan'] ? <Trls keyTrls={"thongTienLienQuan"} /> : null}
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <Form.Item label={translate("donvi")} onClick={() => showLanguage(null)}>
                                <Select
                                    mode="multiple"
                                    onChange={(e) => {
                                        props.updateData({
                                            donViIds: e,
                                            dataKhuVucTarget: []
                                        });
                                        checkSearchKhuVuc(e);
                                        checkSearchKhoa(e);
                                    }}
                                    value={props.donViIds}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.children && option.props.children
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
                            </Form.Item>
                        </div>
                        <div className="col-md-7">
                            <Form.Item label={translate("khuvuc")} onClick={() => showLanguage(null)}>
                                <Select
                                    mode="multiple"
                                    onChange={(e) => props.updateData({ khuVucIds: e })}
                                    value={props.khuVucIds}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.children && option.props.children
                                            .toLowerCase().unsignText()
                                            .indexOf(input.toLowerCase().unsignText()) >= 0
                                    }
                                    placeholder={translate("chonkhuvuc")} >
                                    <Option value="">{translate("chonkhuvuc")}</Option>
                                    {props.dataKhuVucTarget.map((option, index) => {
                                        return (
                                            <Option key={index} value={option.id}>
                                                {option.ten}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item name="owner" label={translate("ghichu")} onClick={() => showLanguage(null)}>
                        {getFieldDecorator("ghiChu", {
                            initialValue: props.ghiChu,
                        })(
                            <TextArea
                                placeholder={translate("nhapghichu")}
                                onChange={(e) => props.updateData({ ghiChu: e.target.value, })}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Switch
                            checked={props.khoaID }
                            onChange={e => props.updateData({ khoaID: e })}
                        /> <span style={{ paddingLeft: 8, paddingRight: 30 }}>Liên hệ theo khoa</span>

                        {props.khoaID ?( 
                            <Select
                                mode="multiple"
                                onChange={(e) => props.updateData({ khoaIds: e })}
                                value={props.khoaIds}
                                showSearch
                                filterOption={(input, option) =>
                                    option.props.children && option.props.children
                                        .toLowerCase().unsignText()
                                        .indexOf(input.toLowerCase().unsignText()) >= 0
                                }
                                placeholder="Chọn khoa ">
                                {props.dataKhoaTarget.map((option, index) => {
                                    return (
                                        <Option key={index} value={option.id}>
                                            {option.ten}
                                        </Option>
                                    );
                                })}
                            </Select>):(
                            
                            <Input
                            onChange={(e) => props.updateData({ khoaIds: e.target.value })}
                            placeholder="Điền tên khoa"
                            >

                            </Input>
                            )
                        }

                    </Form.Item>
                    <Switch
                        onClick={() => showLanguage(null)}
                        checked={props.active ? true : false}
                        onChange={e => props.updateData({ active: e })}
                    /> <span style={{ paddingLeft: 8, paddingRight: 30 }}>{translate("hieuluc")}</span>
                </Form>
                <div className="row mt-3 mr-3 d-flex justify-content-end">
                    <Button onClick={() => onClose()} style={{ fontSize: 16, fontWeight: "bold", marginRight: 8 }}>{translate("huy")}</Button>
                    <Button className="btn-create waves-effect" style={{ fontSize: 16, fontWeight: "bold" }} type="primary" htmlType="submit" onClick={handleSubmit}>
                        {id ? translate("luuthaydoi") : translate("taomoi")}
                    </Button>
                </div>
            </Panel>
        </>
    );
}
export default connect(
    state => {
        return {
            intl: (state.Intl || {}).locale,
            ten: state.target.ten,
            id: state.target.id,
            ma: state.target.ma || [],
            logo: state.target.logo,
            ghiChu: state.target.ghiChu,
            dataDonVi: state.report.dataDonVi || [],
            donViIds: state.target.donViIds,
            active: state.target.active,
            khoaID: state.target.khoaID,
            thongTienLienQuan: state.target.thongTienLienQuan,
            khuVucIds: state.target.khuVucIds || [],
            khoaIds:state.target.khoaIds || [],
            dataKhuVucTarget: state.report.dataKhuVucTarget || [],
            dataKhoaTarget:state.report.dataKhoaTarget || [],
            dataShowLanguage: state.target.dataShowLanguage || {},
            trls: state.target.trls || [],
            trlsTarget: state.target.trlsTarget || []
        };
    }, {
    updateDataReport: actionReport.updateData,
    updateData: actionTarget.updateData,
    createOrEdit: actionTarget.createOrEdit,
    searchDonVi: actionReport.searchDonVi,
    searchKhuVuc: actionReport.searchKhuVucTarget,
    searchKhoa: actionReport.searchKhoaTarget,
    getDetail: actionTarget.getDetail
}
)(Form.create()(withTranslate(index)));
