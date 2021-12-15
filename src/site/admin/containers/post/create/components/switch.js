import React, { useEffect } from "react";
import { Switch } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import { withTranslate } from 'react-redux-multilingual';
function index(props) {
    const { translate } = props;
    useEffect(() => {
    }, []);
    return (
        <>
            <Switch
                checked={props.batBuoc ? true : false}
                onChange={e => {
                    props.updateData({
                        batBuoc: e
                    });
                }}
                value={props.batBuoc}
            /> <span style={{ paddingLeft: 8 }}>{translate("batbuoc")}</span>
        </>
    );
}
export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            batBuoc: state.post.batBuoc || false
        };
    }, {
    updateData: actionPost.updateData,
}
)(withTranslate(index));
