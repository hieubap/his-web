import React, { useEffect } from "react";
import { Form, Button, Modal, Input, Select, Switch } from "antd";
import { connect } from "react-redux";
import actionArea from "@actions/area";
import actionReport from "@actions/report";
import { withTranslate } from 'react-redux-multilingual';
const { Option } = Select;
const { TextArea } = Input;
function index(props) {
    const { translate } = props;
    const rolesLogin = props.auth && props.auth.authorities && props.auth.authorities.length && props.auth.authorities.find((option) => option === "ROLE_admin_ivisitor");
    useEffect(() => {
        props.updateData({
            donViId: rolesLogin === "ROLE_admin_ivisitor" ? props.donViId : (props.auth || {}).donViId
        })
    }, []);
    const onClose = () => {
        props.updateData({
            showCreateOrEdit: false,
            ma: "",
            ten: "",
            donViId: "",
            ghiChu: "",
            id: ""
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.createOrEdit();
            }
        });
    };
    const { getFieldDecorator } = props.form;
    return (
        <>
            <Modal
                className="change-status"
                width={650}
                title={props.id ? translate("capnhatkhuvuc") : translate("themmoikhuvuc")}
                visible={true}
                cancelText={"Đóng"}
                onCancel={onClose}
                footer={[
                    <>
                        <Button type="danger" key="back" onClick={onClose}>{translate("huy")}</Button>
                        <Button key="submit" type="primary" onClick={handleSubmit}>{translate("luu")} </Button>
                    </>
                ]} >
                <div>
                    <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
                        <Form.Item name="owner" label={translate("makhuvuc")} >
                            {getFieldDecorator("ma", {
                                rules: [
                                    {
                                        required: true,
                                        message: translate("vuilongnhapmakhuvuc"),
                                    },
                                ],
                                initialValue: props.ma,
                            })(
                                <Input placeholder={translate("nhapmakhuvuc")}
                                    onChange={(e) => {
                                        props.updateData({
                                            ma: e.target.value,
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item name="owner" label={translate("tenkhuvuc")} >
                            {getFieldDecorator("ten", {
                                rules: [
                                    {
                                        required: true,
                                        message: translate("vuilongnhaptenkhuvuc"),
                                    },
                                ],
                                initialValue: props.ten,
                            })(
                                <Input placeholder={translate("nhaptenkhuvuc")}
                                    onChange={(e) => {
                                        props.updateData({
                                            ten: e.target.value,
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label={translate("donvi") + " (*)"}>
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
                                    onChange={(e) => {
                                        props.updateData({
                                            donViId: e,
                                        });
                                    }}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase().unsignText()
                                            .indexOf(input.toLowerCase().unsignText()) >= 0
                                    }
                                    placeholder={translate("chondonvi")}
                                >
                                    <Option value="">{translate("chondonvi")}</Option>
                                    {
                                        props.dataDonVi.map((option, index) => {
                                            return (
                                                <Option key={index} value={option.id}>
                                                    {option.ten}
                                                </Option>
                                            );
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item name="owner" label={translate("ghichu")} >
                            {getFieldDecorator("ghiChu", {
                                initialValue: props.ghiChu,
                            })(
                                <TextArea placeholder={translate("nhapghichu")}
                                    onChange={(e) => {
                                        props.updateData({
                                            ghiChu: e.target.value,
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Switch
                                checked={props.active ? true : false}
                                onChange={e => {
                                    props.updateData({
                                        active: e
                                    });
                                }}
                            /> <span style={{ paddingLeft: 8, paddingRight: 30 }}>{translate("hieuluc")}</span>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            ten: state.area.ten,
            id: state.area.id,
            ma: state.area.ma || [],
            logo: state.area.logo,
            ghiChu: state.area.ghiChu,
            dataDonVi: state.report.dataDonVi || [],
            donViId: state.area.donViId,
            active: state.area.active
        };
    }, {
    updateData: actionArea.updateData,
    createOrEdit: actionArea.createOrEdit,
    searchDonVi: actionReport.searchDonVi,
}
)(Form.create()(withTranslate(index)));
