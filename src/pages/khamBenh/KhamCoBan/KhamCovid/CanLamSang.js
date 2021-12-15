import React, { useState, useEffect, useRef, useMemo } from "react";
import { Col, Row, Select, Checkbox, Radio } from "antd";
import TextField from "components/TextField";
import IcSave from "assets/images/khamBenh/icSave.svg";
import { Title, Tags, DivInfo, SelectGroup, RowCustom, TitleSub, CheckboxGroup, RadioGroup } from "../styled";
import classNames from "classnames";
import { MAX_NUMBER_SICK } from "../../configs";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";

const CanLamSang = ({
    handleGroupCheckbox,
    handleGroupRadio,
    handleDataInput,
    stateParent
}) => {
    const { thongTinChiTiet } = useSelector(state => state.khamBenh || {})
    const { nbCovid } = thongTinChiTiet || {}
    return (
        <>
            <TitleSub>1.2. Cận lâm sàng</TitleSub>
            <div style={{ paddingLeft: 15 }}>
                {/* ---------------------------------------------------------------- 1.2.1. Kết quả xét nghiệm SARS - CoV2 ------------------------------------------*/}
                <TitleSub>1.2.1. Kết quả xét nghiệm SARS - CoV2</TitleSub>
                <Row>
                    <Col span={4}>Test nhanh</Col>
                    <Col span={6} style={{ marginLeft: 10 }}>
                        <RowCustom >
                            <label>
                                Dương tính
                                <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.testNhanh} defaultValue={nbCovid?.testNhanh} onChange={handleGroupRadio("testNhanh")}>
                                    <Radio value={-1} ></Radio>
                                </RadioGroup>
                            </label>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <label>
                                Âm tính
                                <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.testNhanh} defaultValue={nbCovid?.testNhanh} onChange={handleGroupRadio("testNhanh")}>
                                    <Radio value={1} ></Radio>
                                </RadioGroup>
                            </label>
                        </RowCustom>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>PCR</Col>
                    <Col span={6} style={{ marginLeft: 10 }}>
                        <RowCustom >
                            <label>
                                Dương tính
                                <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.pcr} defaultValue={nbCovid?.pcr} onChange={handleGroupRadio("pcr")}>
                                    <Radio value={-1} ></Radio>
                                </RadioGroup>
                            </label>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <label>
                                Âm tính
                                <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.pcr} defaultValue={nbCovid?.pcr} onChange={handleGroupRadio("pcr")}>
                                    <Radio value={1} ></Radio>
                                </RadioGroup>
                            </label>
                        </RowCustom>
                    </Col>
                </Row>
                {/* ---------------------------------------------------------------- 1.2.2. Xét nghiệm máu ------------------------------------------*/}
                <TitleSub>1.2.2. Xét nghiệm máu</TitleSub>
                <Row>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="HGB"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.hgb}
                                    onChange={handleDataInput("hgb")}
                                    spanId="hgb"
                                    nextInputByTabKey={"bc"}
                                />
                                <span>
                                    g/l
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="BC"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.bc}
                                    spanId="bc"
                                    nextInputByTabKey={"bctt"}
                                    onChange={handleDataInput("bc")}
                                />
                                <span>
                                    G/l
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="BCTT"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.bctt}
                                    spanId="bctt"
                                    nextInputByTabKey={"tc"}
                                    onChange={handleDataInput("bctt")}
                                />
                                <span>
                                    G/L
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="TC"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.tc}
                                    spanId="tc"
                                    nextInputByTabKey={"prothrombin"}
                                    onChange={handleDataInput("tc")}
                                />
                                <span>
                                    G/l
                    </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                </Row>

                <Row>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="Prothrombin"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.prothrombin}
                                    spanId="prothrombin"
                                    nextInputByTabKey={"aptt"}
                                    onChange={handleDataInput("prothrombin")}
                                />
                                <span>
                                    %
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="APTT"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 100 }}
                                    delayTyping={200}
                                    html={nbCovid?.aptt}
                                    spanId="aptt"
                                    nextInputByTabKey={"fibrinogen"}
                                    onChange={handleDataInput("aptt")}
                                />
                                <span>
                                    bệnh/chứng
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="Fibrinogen"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.fibrinogen}
                                    spanId="fibrinogen"
                                    nextInputByTabKey={"ddimer"}
                                    onChange={handleDataInput("fibrinogen")}
                                />
                                <span>
                                    g/l
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="Ddimer"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.ddimer}
                                    spanId="ddimer"
                                    nextInputByTabKey={"ure"}
                                    onChange={handleDataInput("ddimer")}
                                />
                                <span>
                                    mg/dl
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                </Row>

                <Row>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="Ure"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.ure}
                                    spanId="ure"
                                    nextInputByTabKey={"creatinin"}
                                    onChange={handleDataInput("ure")}
                                />
                                <span>
                                    mmol/l
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="Creatinin"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.creatinin}
                                    spanId="creatinin"
                                    nextInputByTabKey={"ast"}
                                    onChange={handleDataInput("creatinin")}
                                />
                                <span>
                                    mmol/l
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                </Row>

                <Row>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="AST"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.ast}
                                    spanId="ast"
                                    nextInputByTabKey={"alt"}
                                    onChange={handleDataInput("ast")}
                                />
                                <span>
                                    U/l
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="ALT"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.alt}
                                    spanId="alt"
                                    nextInputByTabKey={"ggt"}
                                    onChange={handleDataInput("alt")}
                                />
                                <span>
                                    U/l
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                    <Col span={6}>
                        <RowCustom >
                            <DivInfo>
                                <TextField
                                    type="number"
                                    label="GGT"
                                    maxLine={1}
                                    maxLength={4}
                                    style={{ width: 130 }}
                                    delayTyping={200}
                                    html={nbCovid?.ggt}
                                    spanId="ggt"
                                    onChange={handleDataInput("ggt")}
                                />
                                <span>
                                    U/l
                                </span>
                            </DivInfo>
                        </RowCustom>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CanLamSang
