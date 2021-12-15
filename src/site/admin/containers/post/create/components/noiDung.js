import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import { withTranslate } from 'react-redux-multilingual';
function index(props) {
    const { translate } = props;
    useEffect(() => {
    }, []);
    const { getFieldDecorator } = props.form;
    return (
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
                    autoComplete="off"
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
        };
    }, {
    updateData: actionPost.updateData,
}
)(Form.create()(withTranslate(index)));
