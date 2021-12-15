import React, { useState, useEffect } from "react";
import { Form, Button, Input, Select } from "antd";
import { connect } from "react-redux";
import actionUsers from "@actions/users";
import actionReport from "@actions/report";
import { AdminPage, Panel } from "@admin/components/admin";
import { withTranslate } from 'react-redux-multilingual';
import '../style.scss';
import Authorization from "@admin/components/auth"
const { Option } = Select;
const { TextArea } = Input;
function index(props) {
    const { translate } = props;
    const id = props.match.params.id;
    const rolesLogin = props.auth && props.auth.authorities && props.auth.authorities.length && props.auth.authorities.find((option) => option === "ROLE_admin_ivisitor")
    const [state, _setState] = useState({
        checkValidate: false,
    });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    useEffect(() => {
        if (id)
            props.loadUsersDetail(id).then(s => {
                props.searchKhuVuc(s.donViId)
            }).catch(e => {
                props.history.replace("/user");
            });
        else {
            props.updateData({
                id: null,
                username: "",
                donViId: "",
                khuVucId: "",
                roleIds: [],
                ghiChu: ""
            });
            props.updateDataReport({
                dataKhuVuc: []
            })
        }
        if (rolesLogin !== "ROLE_admin_ivisitor") {
            props.updateData({
                donViId: (props.auth || {}).donViId
            })
            if (!id) {
                props.searchKhuVuc((props.auth || {}).donViId);
            }
            props.searchRoles().then(s => {
                let data = s && s.length && s.filter(item => {
                    return item.ma !== "ROLE_admin_ivisitor"
                })
                props.updateDataReport({
                    dataRoles: data
                })
            }).catch(e => { });
        } else {
            props.searchRoles();
        }
        props.searchDonVi();
    }, []);
    const onClose = () => () => {
        props.history.push("/user");
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (props.khuVucId) {
            setState({
                checkValidate: false
            })
        } else {
            let a
            setState({
                checkValidate: true
            })
        }
        props.form.validateFields((err, values) => {
            if (!err && props.khuVucId) {
                props.createOrEdit().then(s => {
                    props.history.push("/user");
                });
            }
        });
    };
    const { getFieldDecorator } = props.form;
    const checkUsername = (rule, value, callback) => {
        if (!value || !props.username) {
            callback([new Error(translate("vuilongnhaptendangnhap"))]);
        } else {
            let valueCheck = value.trim()
            if (!valueCheck.isUsername()) {
                callback([new Error(translate("checktaikhoan"))]);
            } else {
                callback();
            }
        }
    };
    const authorities = ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"]
    return (
        <Authorization
            arrRole={authorities}
        >
            <AdminPage className="mgr-user">
                <Panel
                    title={id ? translate("capnhattaikhoan") : translate("themmoitaikhoan")}
                    id={"mgr-user"}
                    allowClose={false}
                    allowCollapse={false}
                >
                    <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <Form.Item label={translate("tendangnhap")}>
                                    {getFieldDecorator("username", {
                                        rules: [{ validator: checkUsername }],
                                        initialValue: props.username
                                    })(
                                        <Input
                                            onChange={e => {
                                                props.updateData({ username: e.target.value });
                                            }}
                                            placeholder={translate("nhaptendangnhap")}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-6">
                                <Form.Item label={translate("quyen") + " (*)"}>
                                    {getFieldDecorator("roleIds", {
                                        rules: [
                                            {
                                                required: true,
                                                message: translate("vuilongchonquyen")
                                            }
                                        ],
                                        initialValue: props.roleIds
                                    })(
                                        <Select
                                            onChange={(e) => {
                                                props.updateData({ roleIds: e });
                                            }}
                                            mode="multiple"
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children
                                                    .toLowerCase().unsignText()
                                                    .indexOf(input.toLowerCase().unsignText()) >= 0
                                            }
                                            placeholder={translate("chonquyen")}
                                        >
                                            {props.dataRoles.map((option, index) => {
                                                return (
                                                    <Option key={index} value={option.id}>
                                                        {option.ten}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
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
                                                    khuVucId: ""
                                                });
                                                if (e) {
                                                    props.searchKhuVuc(e)
                                                } else {
                                                    props.updateDataReport({
                                                        dataKhuVuc: [],
                                                    })
                                                }

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
                                <Form.Item label={translate("khuvuc") + " (*)"}>
                                    <Select
                                        className=""
                                        style={{ borderColor: "red" }}
                                        value={props.khuVucId}
                                        onChange={(e) => {
                                            props.updateData({ khuVucId: e });
                                        }}
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
                                    {state.checkValidate && !props.khuVucId ? <label className="error">{translate("vuilongchonkhuvuc")}</label> : null}
                                </Form.Item>
                            </div>
                            <div className="col">
                                <Form.Item label={translate("ghichu")}>
                                    <TextArea
                                        rows={5}
                                        onChange={e => {
                                            props.updateData({ ghiChu: e.target.value });
                                        }}
                                        value={props.ghiChu}
                                        placeholder={translate("nhapghichu")}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">

                            </div>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                borderTop: "1px solid #e9e9e9",
                                padding: "16px 16px 0px",
                                background: "#fff",
                                textAlign: "right"
                            }}
                        >
                            <Button onClick={onClose(false)} style={{ marginRight: 8 }}>
                                {translate("huy")}
                            </Button>
                            <Button type="danger" htmlType="submit" onClick={handleSubmit}>
                                {id ? translate("luuthaydoi") : translate("taomoi")}
                            </Button>
                        </div>
                    </Form>
                </Panel>
            </AdminPage>

        </Authorization>

    );
}

export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            username: state.users.username,
            donViId: state.users.donViId,
            roleIds: state.users.roleIds || [],
            khuVucId: state.users.khuVucId,
            ghiChu: state.users.ghiChu,
            dataDonVi: state.report.dataDonVi || [],
            dataKhuVuc: state.report.dataKhuVuc || [],
            dataRoles: state.report.dataRoles || [],
        };
    }, {
    updateData: actionUsers.updateData,
    createOrEdit: actionUsers.createOrEdit,
    loadUsersDetail: actionUsers.loadUsersDetail,
    searchDonVi: actionReport.searchDonVi,
    searchKhuVuc: actionReport.searchKhuVuc,
    searchRoles: actionReport.searchRoles,
    updateDataReport: actionReport.updateData,
}
)(Form.create()(withTranslate(index)));
