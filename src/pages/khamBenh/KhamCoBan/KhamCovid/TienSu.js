import React, { useState, useEffect, useRef, useMemo } from "react";
import { Col, Row, Select, Checkbox, Radio } from "antd";
import TextField from "components/TextField";
import IcSave from "assets/images/khamBenh/icSave.svg";
import { Title, Tags, DivInfo, SelectGroup, RowCustom, TitleSub, CheckboxGroup } from "../styled";
import classNames from "classnames";
import { MAX_NUMBER_SICK } from "../../configs";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { formatDecimal } from "../../../../utils";
const { Option } = Select
const TienSu = ({
    handleGroupCheckbox,
    handleGroupRadio,
    handleDataInput,
    stateParent,
    bmi
}) => {
    const { thongTinChiTiet } = useSelector(state => state.khamBenh || {})
    const { listPhanLoaiBmi } = useSelector(state => state.utils || {})
    const { getUtils } = useDispatch().utils
    const { nbCovid } = thongTinChiTiet || {}
    useEffect(() => {
        getUtils({ name: "PhanLoaiBmi" })
    }, [])
    let renderTextBmi = useMemo(() => {
        if (listPhanLoaiBmi) {
            return listPhanLoaiBmi?.find(item => item.id === bmi)?.ten
        }
        return ""
    }, [listPhanLoaiBmi, bmi])
    return (
        <>
            <TitleSub>1. Tiền sử</TitleSub>
            <CheckboxGroup defaultValue={nbCovid?.dsTiepXuc} onChange={handleGroupCheckbox("dsTiepXuc")}>
                <RowCustom>
                    <Col span={8}>
                        <RowCustom align="space-between">
                            <label>
                                Tiếp xúc F0
                                <Checkbox
                                    value={0}
                                    style={{ marginLeft: 5 }}
                                // checked={true}
                                />
                            </label>

                            <label style={{ width: 120 }}>
                                Tiếp xúc F1
                                <Checkbox
                                    value={1}
                                    style={{ marginLeft: 5 }}
                                // checked={true}
                                // onChange={(e) => {
                                //   setState({ ...state, detachLine: e.target.checked });
                                // }}
                                />
                            </label>
                        </RowCustom>
                    </Col>
                    <Col span={16}>
                        <TextField
                            // className="input_custom"
                            marginTop={5}
                            onChange={handleDataInput("tiepXucKhac")}
                            label="Khác"
                            style={{ width: "95%", marginLeft: 50 }}
                            html={nbCovid?.tiepXucKhac}
                            maxLine={1}
                            maxLength={1000}
                            delayTyping={200}
                            spanId="khac"
                            nextInputByTabKey={"benh-nen"}
                        />
                    </Col>
                </RowCustom>
            </CheckboxGroup>
            <Row>
                <Col span={14}>
                    <TextField
                        className="input_custom"
                        marginTop={5}
                        onChange={handleDataInput("benhNen")}
                        label="Bệnh nền"
                        maxLine={1}
                        maxLength={1000}
                        style={{ width: "100%" }}
                        html={nbCovid?.benhNen}
                        delayTyping={200}
                        spanId="benh-nen"
                        nextInputByTabKey={"trieu-chung"}
                    />
                </Col>
                <Col span={10}>
                    <TextField
                        className="input_custom"
                        marginTop={5}
                        onChange={handleDataInput("trieuChung")}
                        html={nbCovid?.trieuChung}
                        label="Triệu chứng"
                        maxLine={1}
                        maxLength={1000}
                        style={{ width: "99%", marginLeft: 30 }}
                        delayTyping={200}
                        spanId="trieu-chung"
                        nextInputByTabKey={"chieu-cao"}
                    />
                </Col>
            </Row>

            <RowCustom>
                <Col span={8}>
                    <Row align="space-between">
                        <DivInfo>
                            <TextField
                                label="Chiều cao"
                                maxLine={1}
                                maxLength={3}
                                style={{ width: 96 }}
                                onChange={handleDataInput("chieuCao")}
                                html={nbCovid?.chieuCao}
                                delayTyping={200}
                                type="number"
                                spanId="chieu-cao"
                                nextInputByTabKey={"can-nang"}
                            />
                            <span>
                                cm
                </span>
                        </DivInfo>
                        <DivInfo>
                            <TextField
                                spanId="can-nang"
                                label="Cân nặng"
                                maxLine={1}
                                maxLength={4}
                                style={{ width: 106 }}
                                html={nbCovid?.canNang}
                                onChange={handleDataInput("canNang")}
                                delayTyping={200}
                                type="number"
                            // onChange={handleChangeChiSoSong("chieuCao")}
                            />
                            <span>
                                kg
                </span>
                        </DivInfo>
                    </Row>
                </Col>
                <Col span={16}>
                    <TextField
                        className="input_custom"
                        marginTop={5}
                        onChange={handleDataInput("bmi")}
                        // html={nbCovid?.bmi}
                        html={renderTextBmi}
                        disabled={true}
                        label="BMI"
                        maxLine={1}
                        maxLength={1000}
                        style={{ width: "95%", marginLeft: 50 }}
                        delayTyping={200}
                    />
                    {/* <SelectGroup >
                        <div className="select-box-chan-doan">
                            <TitleSub
                                width={180}
                            // className={classNames({
                            //   "red-text": !dataSelect.dsCdChinhId?.length,
                            // })}
                            >
                                1. Bmi{" "}
                            </TitleSub>
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                value={bmi}
                                onChange={handleDataInput("bmi")}
                            >
                                {(listPhanLoaiBmi || []).map((item, index) => {
                                    return (
                                        <Option
                                            key={index}
                                            value={item?.id + ""}
                                        >{`${item?.ten}`}</Option>
                                    );
                                })}
                            </Select>
                        </div>
                    </SelectGroup> */}
                </Col>
            </RowCustom>
        </>
    )
}

export default TienSu
