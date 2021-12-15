import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import { withTranslate } from 'react-redux-multilingual';
import './style.scss';
import { MainBCH } from './styledModal'
const { TextArea } = Input;
function index(props) {
    // loaiCauHoi: 
    // 1: Date
    // 2: Số
    // 3: Văn bản
    // 4: Lựa chọn
    // 5: Multiple choice grid
    const { translate, dataQuestions, updateData, readOnly, checkDate } = props;
    const [state, _setState] = useState({
        checkNumber: false,
    });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    const { checkNumber } = state;
    useEffect(() => {
        updateData({ checkDate: false });
    }, []);
    const getAnswer = (item, index, value, moreInfo) => {
        try {
            let answer = props.answer || [];
            let x = answer.find((item2) => item2.cauHoiId == item.id);
            if (x) {
                if (item.loaiCauHoi == 5) {
                    let y = JSON.parse(x.traLoi);
                    return y[index];
                } else if (item.loaiCauHoi == 4) {
                    if (moreInfo) {
                        return x.thongTinThem;
                    }
                    if (item.chonNhieu) {
                        let y = JSON.parse(x.traLoi);
                        return y.find((t) => t == value);
                    } else {
                        let y = JSON.parse(x.traLoi);
                        return y[0];
                    }
                }
                return x.traLoi;
            }
        } catch (error) { }
    };
    const updateDapAn = (index1, item, index2, value, moreInfo) => {
        if (readOnly) return;
        updateData({ checkButtonSubmit: false });
        let traLoi = {
            cauHoiId: item.id,
        }
        let answer = props.answer || [];
        let index = answer.findIndex((item2) => item2.cauHoiId == item.id);
        if (index != -1) {
            traLoi = answer[index];
        }
        if (item.loaiCauHoi == 5) {
            let x;
            try {
                if (index2 !== undefined) {
                    if (!traLoi.traLoi) traLoi.traLoi = "[]";
                    try {
                        x = JSON.parse(traLoi.traLoi);
                    } catch (error) {
                        x = [];
                    }
                    x[index2] = value;
                    traLoi.traLoi = JSON.stringify(x);
                    let data = item.cauTraLoi && item.cauTraLoi.find(s => s.ma === value);
                    if (data && data.batThuong) {
                        updateData({ phanLoai: "10" });
                    }
                }
            } catch (error) { }
        } else {
            if (item.loaiCauHoi == 4) {
                if (!traLoi.traLoi) traLoi.traLoi = "[]";
                let x = null;
                try {
                    x = JSON.parse(traLoi.traLoi);
                    let a = x[0];
                    let data = item.cauTraLoi && item.cauTraLoi.find(e => e.ma === a);
                    if (data && data.batThuong) {
                        updateData({ phanLoai: "10" });
                    }
                } catch (error) {
                    x = [];
                }
                if (moreInfo) {
                    traLoi.thongTinThem = value;
                } else {
                    let _index = x.indexOf(value);
                    if (_index != -1) {
                        x.splice(_index, 1);
                    } else {
                        if (item.chonNhieu) {
                            x.push(value);
                        } else {
                            x = [value];
                        }
                    }
                }
                traLoi.traLoi = JSON.stringify(x);
            } else {
                traLoi.traLoi = value;
            }
        }
        if (index == -1) {
            answer.push(traLoi);
        } else {
            answer[index] = traLoi;
        }
        updateData({ answer: [...answer] });
    };
    const renderQuestion = (item, index) => {
        switch (item.loaiCauHoi) {
            case 1: //date
                return (
                    <div
                        style={{ borderRadius: 2, borderWidth: 1, padding: 5, marginVertical: 5, borderColor: "#cacaca", }}  >
                        <Input
                            placeholder={item.goiY}
                            style={{ paddingLeft: 10, fontSize: 16 }}
                            value={getAnswer(item)}
                            onChange={(s) => updateDapAn(index, item, undefined, s.target.value)}
                            onBlur={(e) => {
                                try {
                                    if (getAnswer(item)) {
                                        getAnswer(item)
                                            .completeDate(null, null)
                                            .then((date) => {
                                                updateDapAn(
                                                    index,
                                                    item,
                                                    undefined,
                                                    date.format("dd/MM/yyyy")
                                                );
                                                updateData({ checkDate: false });
                                            })
                                            .catch((e) => {
                                                updateDapAn(index, item, undefined, "");
                                                updateData({ checkDate: true });
                                            });
                                    } else {
                                        updateDapAn(index, item, undefined, "");
                                    }
                                } catch (error) { }
                            }}
                        />
                        {checkDate ? <div className="error">{translate("dungdinhdangngay")}</div> : null}
                    </div>
                );
            case 2: //so
                return (
                    <div style={{ borderRadius: 2, borderWidth: 1, padding: 5, marginVertical: 5, borderColor: "#cacaca" }}
                    >
                        <Input
                            placeholder="36.5"
                            placeholder={item.goiY}
                            value={getAnswer(item)}
                            style={{ fontSize: 16 }}
                            onChange={(temperature) => {
                                if (!readOnly) {
                                    let validate = temperature.target.value.checkNumber();
                                    if (!validate) {
                                        updateDapAn(
                                            index,
                                            item,
                                            undefined,
                                            temperature.target.value.replace(/[^0-9\.]/g, "")
                                        );
                                        setState({ checkNumber: false });
                                    } else {
                                        setState({ checkNumber: true });
                                    }
                                }
                            }}
                        />
                        {checkNumber ? <div className="error">{translate("nhapso")}</div> : null}
                    </div>
                );
                break;
            case 3:
                return (
                    <div style={{ borderRadius: 2, borderWidth: 1, padding: 5, marginVertical: 5, borderColor: "#cacaca" }} >
                        {item.nhieuDong ?
                            <TextArea
                                rows={3}
                                placeholder={item.goiY}
                                style={{ paddingLeft: 10, fontSize: 16 }}
                                value={getAnswer(item)}
                                onChange={(s) => updateDapAn(index, item, undefined, s.target.value)}
                            /> :
                            <Input
                                placeholder={item.goiY}
                                style={{ paddingLeft: 10, fontSize: 16 }}
                                value={getAnswer(item)}
                                onChange={(s) => updateDapAn(index, item, undefined, s.target.value)}
                            />}
                    </div >
                );
            case 4:
                return (
                    <>
                        {item.chonNhieu || item.cauTraLoi.length <= 10 ? (
                            <div>
                                {item.cauTraLoi.map((item2, index2) => {
                                    return (
                                        <div key={index2}>
                                            <div style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, padding: "5px 0" }}
                                                onClick={() => updateDapAn(index, item, undefined, item2.ma)}
                                            >
                                                {getAnswer(item, undefined, item2.ma) == item2.ma ? (
                                                    <img src={item.chonNhieu
                                                        ? require("@images/icon_checked.png")
                                                        : require("@images/icon_radio_checked.png")}
                                                        style={{ width: 18, height: 18 }}
                                                        alt=""
                                                    />
                                                ) : (
                                                        <img src={item.chonNhieu
                                                            ? require("@images/icon_check_none.png")
                                                            : require("@images/icon_radio_none.png")}
                                                            style={{ width: 18, height: 18 }}
                                                        />
                                                    )}
                                                <span style={{ marginLeft: 20, fontSize: 16, flex: 1 }}>
                                                    {item2.noiDung}
                                                </span>
                                            </div>
                                            {getAnswer(item, undefined, item2.ma) == item2.ma &&
                                                item2.themThongTin && (
                                                    <div style={{ borderRadius: 2, borderWidth: 1, padding: 5, marginVertical: 5, borderColor: "#cacaca" }}
                                                    >
                                                        <Input
                                                            multiline
                                                            style={{ paddingLeft: 10, fontSize: 16 }}
                                                            value={getAnswer(
                                                                item,
                                                                undefined,
                                                                item2.noiDung,
                                                                true
                                                            )}
                                                            onChange={(s) => updateDapAn(index, item, undefined, s.target.value, true)}
                                                        />
                                                    </div>
                                                )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                                <>
                                    <div style={{
                                        borderRadius: 2,
                                        borderWidth: 1,
                                        padding: 5,
                                        marginVertical: 5,
                                        flexDirection: "row",
                                        borderColor: "#cacaca",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <span placeholder={item.goiY} style={{ padding: 0, flex: 1, fontSize: 16 }} >
                                            {getAnswer(item)}
                                        </span>
                                        <img src={require("@images/icon_down.png")} width={15} alt="" />
                                    </div>
                                    {(item.cauTraLoi.find((t) => t.noiDung == getAnswer(item)) || {}).themThongTin && (
                                        <div style={{ borderRadius: 2, borderWidth: 1, padding: 5, marginVertical: 5, borderColor: "#cacaca" }}  >
                                            <Input
                                                multiline
                                                style={{ padding: 0, fontSize: 16 }}
                                                value={getAnswer(item, undefined, undefined, true)}
                                                onChange={(s) => updateDapAn(index, item, undefined, s.target.value, true)}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                    </>
                );
            case 5:
                return (
                    <>
                        <div style={{ flexDirection: "row", display: "flex" }}>
                            <div style={{ flex: 1 }} ></div>
                            {(item.cauTraLoi || []).map((item1, index1) => {
                                return (
                                    <div className="chooseBCH" key={index1}  >
                                        {item1.noiDung ? item1.noiDung : ""}
                                    </div>
                                );
                            })}
                        </div>
                        {(item.cauHoiChiTiet || []).map((item2, index2) => {
                            return (
                                <div style={{ flexDirection: "row", marginBottom: 10, display: "flex" }} key={index2}  >
                                    <div style={{ flex: 1, paddingTop: 10, fontSize: 16 }}>
                                        {item2.noiDung}
                                    </div>
                                    {(item.cauTraLoi || []).map((item3, index3) => {
                                        return (
                                            <div className="chooseBCH" key={index3} onClick={() => updateDapAn(index, item, index2, item3.ma)}  >
                                                {(getAnswer(item, index2) === undefined &&
                                                    item3.macDinh) ||
                                                    getAnswer(item, index2) == item3.ma ? (
                                                        <img src={require("@images/icon_radio_checked.png")} style={{ width: 18, height: 18 }} />
                                                    ) : (
                                                        <img src={require("@images/icon_radio_none.png")} style={{ width: 18, height: 18 }} />
                                                    )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </>
                );
        }
    }
    return (
        <>
            <p><img src={require("@images/report.png")} />{translate("khaibaoytetunguyen")}</p>
            <MainBCH>
                <Form layout="vertical" hideRequiredMark id="form-BCH-medical">
                    {dataQuestions.cauHoi && dataQuestions.cauHoi.length ? dataQuestions.cauHoi.map((item, index) => {
                        return (
                            <div key={index}>
                                <div style={{ fontWeight: "bold", fontSize: 16, marginTop: 15 }}>
                                    {index + 1}. {item.noiDung}
                                    {item.batBuoc && <span style={{ color: "red" }}> *</span>}
                                </div>
                                <div>{renderQuestion(item, index)}</div>
                            </div>
                        )
                    }) : null}
                </Form>
            </MainBCH>
        </>
    );
};
const mapStateToProps = state => {
    return {
        khuVucId: state.ttHanhChinh.khuVucId,
        doiTuongId: state.ttHanhChinh.doiTuongId,
        dataQuestions: state.post.dataQuestions || {},
        answer: state.ttHanhChinh.answer || [],
        questions: state.post.questions || [],
        checkDate: state.ttHanhChinh.checkDate,
    };
};
export default connect(mapStateToProps, null)(Form.create()(withTranslate(index)));