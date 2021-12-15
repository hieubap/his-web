import React, { useEffect } from "react";
import { Input, Form } from "antd";
import { connect } from "react-redux";
import actionTarget from "@actions/target";
import { withTranslate } from 'react-redux-multilingual';
function index(props) {
    const { translate } = props;
    useEffect(() => {
    }, []);
    return (
        <div className="col-md-6 language-detail">
            <Form.Item label={translate("ngonngu")}>
                {props.trlsTarget.map((option, index) => {
                    return (
                        <div className="row language-item" style={{ marginBottom: 15 }} key={index}>
                            <div className="col-md-3" style={{ paddingRight: 0 }}>{translate(option.translate)}</div>
                            <div className="col-md-9">
                                <Input
                                    onChange={(e) => {
                                        option[`${props.keyTrls}`] = e.target.value
                                        props.updateData({ trlsTarget: [...props.trlsTarget] })
                                    }}
                                    value={props.keyTrls === "ten" ? option.ten : props.keyTrls === "thongTienLienQuan" ? option.thongTienLienQuan : null}
                                />
                            </div>

                        </div>
                    )
                })}
            </Form.Item>
        </div>
    );
}
export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            batBuoc: state.target.batBuoc || false,
            noiDung: state.target.noiDung,
            trlsTarget: state.target.trlsTarget || [],
            intl: (state.Intl || {}).locale,
        };
    }, {
    updateData: actionTarget.updateData,
}
)(Form.create()(withTranslate(index)));
