import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import { withTranslate } from 'react-redux-multilingual';
const { TextArea } = Input;
function index(props) {
    const { translate } = props;
    useEffect(() => {
    }, []);
    const { getFieldDecorator } = props.form;
    return (
        <>
            {props.nhieuDong ?
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
                            autoComplete="off"
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
                                autoComplete="off"
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
                    </Form.Item> : null}
        </>
    );
}
export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            batBuoc: state.post.batBuoc || false,
            goiY: state.post.goiY,
            trlsPost: state.post.trlsPost || [],
            intl: (state.Intl || {}).locale,
            nhieuDong: state.post.nhieuDong || false,
            loaiCauHoi: state.post.loaiCauHoi,
        };
    }, {
    updateData: actionPost.updateData,
}
)(Form.create()(withTranslate(index)));
