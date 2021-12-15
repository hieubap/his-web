import React, { useEffect } from "react";
import { Input } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import { withTranslate } from 'react-redux-multilingual';
function index(props) {
    const { translate } = props;
    useEffect(() => {
    }, []);
    return (
        <div className="col-md-6 language-detail">
            {props.trlsPost.map((option, index) => {
                return (
                    <div className="row language-item" style={{ marginBottom: 15 }} key={index}>
                        <div className="col-md-3">{translate(option.translate)}</div>
                        <div className="col-md-9">
                            <Input
                                onChange={(e) => {
                                    option[`${props.keyTrls}`] = e.target.value
                                    props.updateData({
                                        trlsPost: [...props.trlsPost]
                                    })
                                }}
                                value={props.keyTrls === "noiDung" ? option.noiDung : props.keyTrls === "goiY" ? option.goiY : null}
                            />
                        </div>

                    </div>
                )
            })}
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
        };
    }, {
    updateData: actionPost.updateData,
}
)(withTranslate(index));
