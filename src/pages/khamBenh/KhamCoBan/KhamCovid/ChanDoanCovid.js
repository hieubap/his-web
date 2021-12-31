import React, { useState, useEffect, useRef, useMemo } from "react";
import { Col, Row, Select, Checkbox, Radio, Button } from "antd";
import TextField from "components/TextField";
import IcSave from "assets/images/khamBenh/icSave.svg";
import { Title, Tags, DivInfo, SelectGroup, RowCustom, TitleSub, CheckboxGroup, RadioGroup } from "../styled";
import classNames from "classnames";
import { MAX_NUMBER_SICK } from "../../configs";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
const { Option } = Select;

const ChanDoanCovid = ({
    handleGroupCheckbox,
    handleGroupRadio,
    handleDataInput,
    stateParent,
}) => {
    const refChanDoanBenh = useRef(null)
    const listAllMaBenhChinh = useSelector(
        (state) => state.maBenh.listAllMaBenhChinh || []
    );
    const listNghiNgoCovid = useSelector(
        (state) => state.utils.listNghiNgoCovid || []
    );
    
    const { thongTinChiTiet } = useSelector(state => state.khamBenh || {})
    const { nbCovid } = thongTinChiTiet || {}

    const handleDropdownVisibleChange = (open) => {
        document.querySelector("#containerElement").style.overflowY = open
            ? "hidden"
            : "auto";
    };

    const filterOption = (input = "", option) => {
        input = input?.toLowerCase().createUniqueText() || "";
        return (
            option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
        );
    };

    const childrenCdBenh = listAllMaBenhChinh.map((item, index) => {
        return (
            <Option
                key={index}
                value={item?.id + ""}
            >{`${item?.ma} - ${item?.ten}`}</Option>
        );
    });

    return (
        <>
            <Title>III. CHẨN ĐOÁN</Title>
            <div>
                {/* <TitleSub>1. Chẩn đoán bệnh:</TitleSub> */}
                <span>
                    <SelectGroup >
                        <TitleSub
                            width={180}
                            hightlight={stateParent?.thongTinChiTiet?.nbCovid?.dsCdChinhId?.length === 0 || !stateParent?.thongTinChiTiet?.nbCovid?.dsCdChinhId}
                        // className={classNames({
                        //   "red-text": !dataSelect.dsCdChinhId?.length,
                        // })}
                        >
                            1. Chẩn đoán bệnh:{" "}
                        </TitleSub>
                        <div className="select-box-chan-doan" id="select-covid">
                            <Select
                                ref={refChanDoanBenh}
                                mode="multiple"
                                showSearch
                                style={{ width: "100%" }}
                                value={((stateParent?.thongTinChiTiet?.nbCovid?.dsCdChinhId) || []).map((item) => item + "")}
                                onChange={handleDataInput("dsCdChinhId")}
                                onDropdownVisibleChange={handleDropdownVisibleChange}
                                filterOption={filterOption}
                            >
                                {childrenCdBenh}
                            </Select>
                        </div>
                    </SelectGroup>
                </span>
            </div>
            <TitleSub>2. Trường hợp nghi ngờ</TitleSub>
            <CheckboxGroup defaultValue={nbCovid?.dsNghiNgo} onChange={handleGroupCheckbox("dsNghiNgo")}>
                {listNghiNgoCovid.map((item, index) => {
                    return (
                        <div key={item?.id}>
                            <Checkbox value={item.id}>
                                {item?.ten}
                            </Checkbox>
                        </div>
                    )
                })}
            </CheckboxGroup>
        </>
    )
}

export default ChanDoanCovid
