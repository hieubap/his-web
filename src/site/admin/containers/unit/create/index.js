import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Modal, Input, Switch, Upload } from "antd";
import { connect } from "react-redux";
import actionUnit from "@actions/unit";
import { withTranslate } from 'react-redux-multilingual';
import fileProvider from "@data-access/file-provider";
import '../style.scss';
const { TextArea } = Input;
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
function index(props) {
    const files = useRef([]);
    const { translate } = props;
    useEffect(() => {
    }, []);
    const onClose = () => {
        props.updateData({
            showCreateOrEdit: false,
            ma: "",
            ten: "",
            logo: "",
            ghiChu: "",
            id: ""
        });
    };
    const [state, _setState] = useState({
        data: {},
        fileList: props.logo ? [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: props.logo.absoluteFileUrl(),
            }
        ] : [],
        showChangePass: false
    });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
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
    const handleCancel = () => setState({ previewVisible: false });
    const { previewVisible, previewImage, fileList } = state;
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    const handleChange = ({ fileList }) => { };

    const { getFieldDecorator } = props.form;
    return (
        <>
            <Modal
                className="change-status"
                width={650}
                title={props.id ? translate("capnhatdonvi") : translate("themmoidonvi")}
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
                        <Form.Item name="owner" label={translate("madonvi")} >
                            {getFieldDecorator("ma", {
                                rules: [
                                    {
                                        required: true,
                                        message: translate("vuilongnhapmadonvi"),
                                    },
                                ],
                                initialValue: props.ma,
                            })(
                                <Input placeholder={translate("nhapmadonvi")}
                                    onChange={(e) => {
                                        props.updateData({
                                            ma: e.target.value,
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item name="owner" label={translate("tendonvi")} >
                            {getFieldDecorator("ten", {
                                rules: [
                                    {
                                        required: true,
                                        message: translate("vuilongnhaptendonvi"),
                                    },
                                ],
                                initialValue: props.ten,
                            })(
                                <Input placeholder={translate("nhaptendonvi")}
                                    onChange={(e) => {
                                        props.updateData({
                                            ten: e.target.value,
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item name="owner" label={translate("logodonvi")} style={{ display: "flex" }} >
                            {getFieldDecorator("logo", {
                                initialValue: props.logo,
                            })(
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList.map((item) => {
                                        let item2 = JSON.parse(JSON.stringify(item));
                                        if (item2.url) item2.url = item2.url.absoluteFileUrl();
                                        return item2;
                                    })}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    onRemove={(file) => {
                                        files.current = files.current.filter((item) => item.uid != file.uid);
                                        setState({
                                            fileList: files.current,
                                            hasChange: true,
                                        });
                                        props.updateData({
                                            logo: ""
                                        })
                                    }}
                                    customRequest={({ onSuccess, onError, file }) => {
                                        file.status = "uploading";
                                        files.current.push(file);
                                        setState({
                                            fileList: files.current,
                                        });
                                        fileProvider
                                            .uploadFile(file)
                                            .then((s) => {
                                                var x = files.current.find((item) => item.uid == file.uid);
                                                if (x) {
                                                    if (s && s.code == 0 && s.data.length) {
                                                        props.updateData({
                                                            logo: s.data
                                                        })
                                                        let url = s.data;
                                                        x.status = "done";
                                                        x.url = url;
                                                    } else {
                                                        x.status = "error";
                                                    }
                                                    setState({
                                                        fileList: files.current,
                                                        hasChange: true,
                                                    });
                                                }
                                            })
                                            .catch((e) => {
                                                var x = files.current.find((item) => item.uid == file.uid);
                                                if (x) {
                                                    x.status = "error";
                                                    setState({
                                                        fileList: files.current,
                                                    });
                                                }
                                            });
                                    }}
                                    accept=".png,.gif,.jpg"
                                >
                                    {fileList.length >= 1 ? null : <div className="ant-upload-text">Upload</div>}
                                </Upload>
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
            <Modal className="view-image" visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    );
}

export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            ten: state.unit.ten,
            id: state.unit.id,
            ma: state.unit.ma || [],
            logo: state.unit.logo,
            ghiChu: state.unit.ghiChu,
            active: state.unit.active
        };
    }, {
    updateData: actionUnit.updateData,
    createOrEdit: actionUnit.createOrEdit,
}
)(Form.create()(withTranslate(index)));
