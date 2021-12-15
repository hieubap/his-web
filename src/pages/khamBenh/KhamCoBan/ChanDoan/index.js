import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Select } from "antd";
import TextField from "components/TextField";
import IcSave from "assets/images/khamBenh/icSave.svg";
import { Title, DivInfo, SelectGroup } from "../styled";
import classNames from "classnames";
import { MAX_NUMBER_SICK } from "../../configs";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
const { Option } = Select;

const ChanDoan = ({ handleSetData, layerId }) => {
  const refFuncSaveCSS = useRef(null);
  const listAllMaBenhChinh = useSelector(
    (state) => state.maBenh.listAllMaBenhChinh || []
  );
  const listAllMaBenhPhu = useSelector(
    (state) => state.maBenh.listAllMaBenhPhu || []
  );
  const infoNb = useSelector((state) => state.khamBenh.infoNb || {});
  const { nbChanDoan, nbChiSoSong } = useSelector(
    (state) => state.khamBenh.thongTinChiTiet || {}
  );
  const { onRegisterHotkey } = useDispatch().phimTat;

  const dataChiSoSongRef = useRef({ ...nbChiSoSong });
  // const listAllNhomBenhChinh = useSelector(
  //   (state) => state.nhomBenh.listAllNhomBenhChinh || []
  // );
  // const listAllNhomBenhPhu1 = useSelector(
  //   (state) => state.nhomBenh.listAllNhomBenhPhu1 || []
  // );

  // const { getAllNhomBenh } = useDispatch().nhomBenh;
  const { getAllMaBenh } = useDispatch().maBenh;
  const { updateChiSoSong } = useDispatch().khamBenh;

  const { cdSoBo, dsCdChinhId, dsCdKemTheoId, moTa } = nbChanDoan || {};

  const [dataSelect, setDataSelect] = useState({
    dsCdChinhId: [],
    dsCdKemTheoId: [],
  });
  const [heightSelect, setHeightSelect] = useState({
    firstHeight: "auto",
    secondHeight: "auto",
  });
  const [isEditButtonChiSoSong, setIsEditButtonChiSoSong] = useState({
    type: "capNhat",
  });
  const selectFirstRef = useRef();
  const selectSecondRef = useRef();

  useEffect(() => {
    getAllMaBenh({ nhomBenhPhu: false });
    getAllMaBenh({ nhomBenhPhu: true });
    // getAllNhomBenh({ loaiNhomBenh: 10 });
    // getAllNhomBenh({ loaiNhomBenh: 20 });
  }, []);
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 113, //F2
          onEvent: () => {
            if (isEditButtonChiSoSong.type == "capNhat") {
              refFuncSaveCSS.current && refFuncSaveCSS.current();
            }
          },
        },
        {
          keyCode: 115, //F
          onEvent: () => {
            if (isEditButtonChiSoSong.type == "luu") {
              refFuncSaveCSS.current && refFuncSaveCSS.current();
            }
          },
        },
      ],
    });
  }, [isEditButtonChiSoSong]);

  // useEffect(() => {
  //   setChiSoSong(nbChiSoSong);
  // }, [nbChiSoSong]);

  useEffect(() => {
    setHeightSelect({
      firstHeight: selectFirstRef.current.offsetHeight,
      secondHeight: selectSecondRef.current.offsetHeight,
    });
  }, [dataSelect]);

  useEffect(() => {
    setDataSelect({ ...dataSelect, dsCdChinhId, dsCdKemTheoId, moTa, cdSoBo });
  }, [dsCdChinhId, dsCdKemTheoId, infoNb]);

  const handleClickSave = debounce(() => {
    const { id } = infoNb;

    if (!id) return;

    updateChiSoSong({ id, ...dataChiSoSongRef.current });
  }, 500);

  const handleChangeChiSoSong = (key) => (value) => {
    dataChiSoSongRef.current = {
      ...dataChiSoSongRef.current,
      [key]: value,
    };
  };

  const handleChangeData = (key) => (values) => {
    if (
      (key === "dsCdChinhId" || key === "dsCdKemTheoId") &&
      values.length > MAX_NUMBER_SICK
    )
      return;

    setDataSelect({ ...dataSelect, [key]: values });
    handleSetData(["nbChanDoan", [key]])(values);
  };

  const childrenCdBenh = listAllMaBenhChinh.map((item, index) => {
    return (
      <Option
        key={index}
        value={item?.id + ""}
      >{`${item?.ma} - ${item?.ten}`}</Option>
    );
  });

  const childrenCdKemTheo = listAllMaBenhPhu.map((item, index) => {
    return (
      <Option
        key={index}
        value={item?.id + ""}
      >{`${item?.ma} - ${item?.ten}`}</Option>
    );
  });

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
  const onSaveCSS = debounce(() => {
    if (isEditButtonChiSoSong.type === "luu") {
      handleClickSave();
      setIsEditButtonChiSoSong({
        ...isEditButtonChiSoSong,
        type: "capNhat",
      });
    } else {
      setIsEditButtonChiSoSong({
        ...isEditButtonChiSoSong,
        type: "luu",
      });
    }
  }, 500);
  refFuncSaveCSS.current = onSaveCSS;

  return (
    <Row>
      <Col md={16} className="paddingRight">
        <Title>II. CHẨN ĐOÁN</Title>
        <TextField
          className="input_custom"
          marginTop={5}
          onChange={handleChangeData("cdSoBo")}
          label="1. Chẩn đoán sơ bộ"
          html={cdSoBo}
          maxLine={1}
          spanId="chan-doan-so-bo"
          maxLength={1000}
        />
        {/* {dataSelect?.cdSoBo?.length > 1000 && <div style={{color: "red"}}>Vui lòng nhập trường Chuẩn đoán sơ bộ không quá 1000 ký tự!</div>} */}
        <SelectGroup dataHeight={heightSelect.firstHeight}>
          <span
            className={classNames({
              "red-text": !dataSelect.dsCdChinhId?.length,
            })}
          >
            2. Chẩn đoán bệnh:{" "}
          </span>
          <div className="select-box-chan-doan" ref={selectFirstRef}>
            <Select
              mode="multiple"
              showSearch
              style={{ width: "100%" }}
              value={(dataSelect.dsCdChinhId || []).map((item) => item + "")}
              onChange={handleChangeData("dsCdChinhId")}
              onDropdownVisibleChange={handleDropdownVisibleChange}
              filterOption={filterOption}
            >
              {childrenCdBenh}
            </Select>
          </div>
        </SelectGroup>
        <SelectGroup dataHeight={heightSelect.secondHeight}>
          <span>3. Chẩn đoán kèm theo: </span>
          <div className="select-box-chan-doan" ref={selectSecondRef}>
            <Select
              mode="multiple"
              showSearch
              // className="select-box"
              style={{ width: "100%" }}
              value={(dataSelect.dsCdKemTheoId || []).map((item) => item + "")}
              onChange={handleChangeData("dsCdKemTheoId")}
              onDropdownVisibleChange={handleDropdownVisibleChange}
              filterOption={filterOption}
            >
              {childrenCdKemTheo}
            </Select>
          </div>
        </SelectGroup>
        <TextField
          label="4. Mô tả chi tiết"
          onChange={(e) => {
            handleSetData(["nbChanDoan", "moTa"])(e);
            handleChangeData("moTa")(e);
          }}
          html={moTa}
          className="input_custom"
          marginTop={10}
          maxLength={2000}
        />
        {/* {dataSelect?.moTa?.length > 2000 && <div style={{color: "red"}}>Vui lòng nhập trường Mô tả chi tiết không quá 2000 ký tự!</div>} */}
      </Col>
      <Col md={8} className="paddingLeft">
        <div className="save-info" onClick={onSaveCSS}>
          {isEditButtonChiSoSong.type == "luu" ? "Lưu" : "Cập nhật"} <IcSave />
        </div>
        <DivInfo>
          <TextField
            label="Mạch"
            spanId="mach-chan-doan"
            nextInputByTabKey={"nhiet-do-chan-doan"}
            html={nbChiSoSong?.mach}
            maxLine={1}
            maxLength={4}
            style={{ width: 78 }}
            disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("mach")}
          />
          <span>lần/phút</span>
        </DivInfo>
        <DivInfo>
          <TextField
            label="Nhiệt độ"
            spanId="nhiet-do-chan-doan"
            nextInputByTabKey={"huyet-ap-chan-doan"}
            maxLine={1}
            maxLength={4}
            html={nbChiSoSong?.nhietDo}
            style={{ width: 106 }}
            disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("nhietDo")}
          />
          <span>
            <sup>0</sup>C
          </span>
        </DivInfo>
        <DivInfo>
          <TextField
            label="Huyết áp"
            spanId="huyet-ap-chan-doan"
            nextInputByTabKey="sub-huyet-ap-chan-doan"
            maxLine={1}
            maxLength={4}
            html={nbChiSoSong?.huyetApTamTruong}
            style={{ width: 106 }}
            disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("huyetApTamTruong")}
          />
          <TextField
            label="/"
            spanId="sub-huyet-ap-chan-doan"
            nextInputByTabKey="nhip-tho-chan-doan"
            maxLine={1}
            maxLength={4}
            style={{ width: 52 }}
            html={nbChiSoSong?.huyetApTamThu}
            disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("huyetApTamThu")}
          />
          <span> mmHg</span>
        </DivInfo>
        <DivInfo maxWidth={177}>
          <TextField
            label="Nhịp thở"
            spanId="nhip-tho-chan-doan"
            maxLine={1}
            maxLength={4}
            html={nbChiSoSong?.nhipTho}
            style={{ width: 96 }}
            disabled={isEditButtonChiSoSong.type == "luu" ? false : true}
            onChange={handleChangeChiSoSong("nhipTho")}
          />
          <span>lần/phút</span>
        </DivInfo>
      </Col>
    </Row>
  );
};

export default ChanDoan;
