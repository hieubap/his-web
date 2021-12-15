import React, { useEffect } from "react";
import { Radio, Input, Select, DatePicker } from "antd";
import { connect } from "react-redux";
import { withTranslate } from 'react-redux-multilingual';
import '../style.scss';
const { Option } = Select;
const { TextArea } = Input;
function index(props) {
    const { translate } = props;
    useEffect(() => {
    }, []);
    const item = props.dataViewPost || {};
    return (
        <div className="post-detail-view" onClick={() => props.onChooseTypeEdit(`view${item.soThuTu}`, item)}>
            <div className="stt">{item.soThuTu}</div>
            <div className="detail-post">
                {item.loaiCauHoi === 5 ? null : <div className="title">{item.noiDung + (item.batBuoc ? " (*)" : "")}</div>}
                {item.loaiCauHoi === 1 ?
                    < DatePicker
                        className="placeholder-view"
                        placeholder={item.goiY}
                        disabled
                    /> : item.loaiCauHoi === 2 ?
                        <Input
                            className="placeholder-view"
                            placeholder={item.goiY}
                            disabled
                        /> : item.loaiCauHoi === 3 ?
                            (<>
                                {item.nhieuDong ?
                                    <TextArea
                                        className="placeholder-view"
                                        placeholder={item.goiY}
                                        disabled
                                    />
                                    : <Input
                                        className="placeholder-view"
                                        placeholder={item.goiY}
                                        disabled
                                    />}
                            </>) : item.loaiCauHoi === 4 ?
                                <Select
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase().unsignText()
                                            .indexOf(input.toLowerCase().unsignText()) >= 0
                                    }
                                    mode={item.chonNhieu ? "multiple" : ""}
                                    placeholder={item.goiY} >
                                    {item.cauTraLoi && item.cauTraLoi.length && item.cauTraLoi.map((option, index) => {
                                        return (
                                            <Option key={index} value={option.id}>
                                                {option.noiDung}
                                            </Option>
                                        );
                                    })}
                                </Select> : item.loaiCauHoi === 5 ?
                                    <table>
                                        <thead>
                                            <tr>
                                                <td><div className="title">{item.noiDung + (item.batBuoc ? " (*)" : "")}</div></td>
                                                {item.cauTraLoi && item.cauTraLoi.length && item.cauTraLoi.map((option, index) => {
                                                    return (
                                                        <td key={index} style={{ textAlign: "center" }}>{option.noiDung}</td>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.cauHoiChiTiet && item.cauHoiChiTiet.length && item.cauHoiChiTiet.map((option2, index2) => {
                                                return (
                                                    <tr key={index2}>
                                                        <td>{option2.noiDung}</td>
                                                        {item.cauTraLoi && item.cauTraLoi.length && item.cauTraLoi.map((option3, index3) => {
                                                            return (
                                                                <td key={index3} style={{ textAlign: "center" }}><Radio></Radio> </td>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                            <tr></tr>
                                        </tbody>
                                    </table> : null}
            </div>
        </div>
    );
}
export default connect(
    state => {
        return {
            intl: (state.Intl || {}).locale,
            auth: state.auth && state.auth.auth,
        };
    }
)(withTranslate(index));
