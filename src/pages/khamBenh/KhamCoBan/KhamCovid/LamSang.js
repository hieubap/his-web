import React, { useState, useEffect, useRef, useMemo } from "react";
import { Col, Row, Select, Checkbox, Radio } from "antd";
import TextField from "components/TextField";
import IcSave from "assets/images/khamBenh/icSave.svg";
import { Title, Tags, DivInfo, SelectGroup, RowCustom, TitleSub, CheckboxGroup, RadioGroup } from "../styled";
import classNames from "classnames";
import { MAX_NUMBER_SICK } from "../../configs";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";

const LamSang = ({
    handleGroupCheckbox,
    handleGroupRadio,
    handleDataInput,
    stateParent
}) => {
    const { thongTinChiTiet } = useSelector(state => state.khamBenh || {})
    const { nbCovid } = thongTinChiTiet || {}
    const [state, _setState] = useState({
    });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    return (
        <>
            <TitleSub>1.1. Lâm sàng</TitleSub>
            <Row>
                <Col span={4}>Sốt</Col>
                <Col span={7} style={{ marginLeft: 10 }}>
                    <RowCustom >
                        <label>
                            Có
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.sot} defaultValue={nbCovid?.sot} onChange={handleGroupRadio("sot")}>
                                <Radio value={true} ></Radio>
                            </RadioGroup>
                        </label>
                        <DivInfo>
                            <TextField
                                label="Nhiệt độ"
                                type="number"
                                maxLine={1}
                                maxLength={4}
                                style={{ width: 96, marginLeft: 5 }}
                                delayTyping={200}
                                html={nbCovid?.nhietDo}
                                onChange={handleDataInput("nhietDo")}
                            />
                            <span>
                                <sup>0</sup>C
                            </span>
                        </DivInfo>
                    </RowCustom>
                </Col>
                <Col span={6}>
                    <RowCustom >
                        <label>
                            Không
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.sot} defaultValue={nbCovid?.sot} onChange={handleGroupRadio("sot")}>
                                <Radio value={false} ></Radio>
                            </RadioGroup>
                        </label>
                        <DivInfo>
                            <TextField
                                label="Nhiệt độ"
                                type="number"
                                maxLine={1}
                                maxLength={4}
                                style={{ width: 96, marginLeft: 5 }}
                                html={nbCovid?.nhietDo}
                                delayTyping={200}
                                onChange={handleDataInput("nhietDo")}
                            />
                            <span>
                                <sup>0</sup>C
                            </span>
                        </DivInfo>
                    </RowCustom>
                </Col>
            </Row>
            {/* </RadioGroup> */}
            {/* </CheckboxGroup> */}
            {/* <CheckboxGroup> */}
            <Row>
                <Col span={4}>Ho</Col>
                <Col span={7} style={{ marginLeft: 10 }}>
                    <RowCustom >
                        <label>
                            Có
                                <Checkbox
                                checked={stateParent?.thongTinChiTiet?.nbCovid?.ho}

                                style={{ marginLeft: 5 }}
                                onChange={handleGroupCheckbox("ho")}
                            />
                            {/* <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.sot} onChange={handleGroupRadio("sot")}>
                                <Radio value={true} ></Radio>
                            </RadioGroup> */}
                        </label>
                    </RowCustom>
                </Col>
                <Col span={4}>
                    <RowCustom >
                        <label>
                            Ho khan
                                {/* <Checkbox
                                value={0} // ho khan
                                style={{ marginLeft: 5 }}
                                onChange={handleGroupCheckbox("loaiHo")} */}
                            <RadioGroup value={!stateParent?.thongTinChiTiet?.nbCovid?.ho ? null : stateParent?.thongTinChiTiet?.nbCovid?.loaiHo} onChange={handleGroupRadio("loaiHo")}>
                                <Radio value={0} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
                <Col span={4}>
                    <RowCustom >
                        <label>
                            Có đờm
                                {/* <Checkbox
                                value={1} // có đờm
                                style={{ marginLeft: 5 }}
                                onChange={handleGroupCheckbox("loaiHo")}
                            /> */}
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.loaiHo} onChange={handleGroupRadio("loaiHo")}>
                                <Radio value={1} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
                <Col span={4}>
                    <DivInfo>
                        <TextField
                            label="SPO2"
                            type="number"
                            maxLine={1}
                            maxLength={4}
                            style={{ width: 96, }}
                            html={nbCovid?.spo2}
                            delayTyping={200}
                            onChange={handleDataInput("spo2")}
                        />
                        <span>
                            %
                            </span>
                    </DivInfo>
                </Col>
            </Row>
            {/* </CheckboxGroup> */}
            <Row>
                <Col span={4}>Khó thở</Col>
                <Col span={7} style={{ marginLeft: 10 }}>
                    <RowCustom >
                        <label>
                            Có
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.khoTho} onChange={handleGroupRadio("khoTho")}>
                                <Radio value={true} ></Radio>
                            </RadioGroup>
                        </label>
                        <DivInfo>
                            <TextField
                                disabled={!stateParent?.thongTinChiTiet?.nbCovid?.khoTho}
                                label="Tần số thở"
                                type="number"
                                maxLine={1}
                                maxLength={3}
                                style={{ width: 106, }}
                                html={(stateParent?.thongTinChiTiet?.nbCovid?.tanSoTho === null || stateParent?.thongTinChiTiet?.nbCovid?.tanSoTho ) ? stateParent?.thongTinChiTiet?.nbCovid?.khoTho && stateParent?.thongTinChiTiet?.nbCovid?.tanSoTho : nbCovid?.tanSoTho}
                                delayTyping={200}
                                onChange={handleDataInput("tanSoTho")}
                            />
                            <span>
                                lần/phút
                            </span>
                        </DivInfo>
                    </RowCustom>
                </Col>
                <Col span={8}>
                    <RowCustom >
                        <label>
                            Không
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.khoTho} onChange={handleGroupRadio("khoTho")}>
                                <Radio value={false} ></Radio>
                            </RadioGroup>
                        </label>
                        <DivInfo>
                            <TextField
                                disabled={stateParent?.thongTinChiTiet?.nbCovid?.khoTho}
                                label="Tần số thở"
                                type="number"
                                maxLine={1}
                                maxLength={3}
                                style={{ width: 106, }}
                                html={(stateParent?.thongTinChiTiet?.nbCovid?.tanSoTho === null || stateParent?.thongTinChiTiet?.nbCovid?.tanSoTho ) ? !stateParent?.thongTinChiTiet?.nbCovid?.khoTho && stateParent?.thongTinChiTiet?.nbCovid?.tanSoTho : nbCovid?.tanSoTho}
                                delayTyping={200}
                                onChange={handleDataInput("tanSoTho")}
                            />
                            <span>
                                lần/phút
                            </span>
                        </DivInfo>
                    </RowCustom>
                </Col>
            </Row>
            <Row>
                <Col span={4}>Đau người</Col>
                <Col span={7} style={{ marginLeft: 10 }}>
                    <RowCustom >
                        <label>
                            Có
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.dauNguoi} onChange={handleGroupRadio("dauNguoi")}>
                                <Radio value={true} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
                <Col span={6}>
                    <RowCustom >
                        <label>
                            Không
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.dauNguoi} onChange={handleGroupRadio("dauNguoi")}>
                                <Radio value={false} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
            </Row>
            <Row>
                <Col span={4}>Đau đầu</Col>
                <Col span={7} style={{ marginLeft: 10 }}>
                    <RowCustom >
                        <label>
                            Có
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.dauDau} onChange={handleGroupRadio("dauDau")}>
                                <Radio value={true} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
                <Col span={6}>
                    <RowCustom >
                        <label>
                            Không
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.dauDau} onChange={handleGroupRadio("dauDau")}>
                                <Radio value={false} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
            </Row>
            <Row>
                <Col span={4}>Ớn lạnh</Col>
                <Col span={7} style={{ marginLeft: 10 }}>
                    <RowCustom >
                        <label>
                            Có
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.onLanh} onChange={handleGroupRadio("onLanh")}>
                                <Radio value={true} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
                <Col span={6}>
                    <RowCustom >
                        <label>
                            Không
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.onLanh} onChange={handleGroupRadio("onLanh")}>
                                <Radio value={false} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
            </Row>
            <Row>
                <Col span={4}>Ỉa chảy</Col>
                <Col span={7} style={{ marginLeft: 10 }}>
                    <RowCustom >
                        <label>
                            Có
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.tieuChay} onChange={handleGroupRadio("tieuChay")}>
                                <Radio value={true} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
                <Col span={6}>
                    <RowCustom >
                        <label>
                            Không
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.tieuChay} onChange={handleGroupRadio("tieuChay")}>
                                <Radio value={false} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
            </Row>
            <Row>
                <Col span={4}>Giảm/mất vị giác</Col>
                <Col span={7} style={{ marginLeft: 10 }}>
                    <RowCustom >
                        <label>
                            Có
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.matViGiac} onChange={handleGroupRadio("matViGiac")}>
                                <Radio value={true} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
                <Col span={6}>
                    <RowCustom >
                        <label>
                            Không
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.matViGiac} onChange={handleGroupRadio("matViGiac")}>
                                <Radio value={false} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
            </Row>
            <Row>
                <Col span={4}>Giảm/mất khứu giác</Col>
                <Col span={7} style={{ marginLeft: 10 }}>
                    <RowCustom >
                        <label>
                            Có
                            <RadioGroup value={stateParent?.thongTinChiTiet?.nbCovid?.matKhuuGiac} onChange={handleGroupRadio("matKhuuGiac")}>
                                <Radio value={true} ></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
                <Col span={6}>
                    <RowCustom >
                        <label>
                            Không
                            <RadioGroup style={{ marginLeft: 5 }} value={stateParent?.thongTinChiTiet?.nbCovid?.matKhuuGiac} onChange={handleGroupRadio("matKhuuGiac")}>
                                <Radio value={false}></Radio>
                            </RadioGroup>
                        </label>
                    </RowCustom>
                </Col>
            </Row>
        </>
    )
}

export default LamSang
