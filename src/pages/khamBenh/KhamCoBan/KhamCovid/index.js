import React, { useState, useEffect, useRef, useMemo } from "react";
import { Col, Row, Select, Checkbox, Radio, Button } from "antd";
import TextField from "components/TextField";
import IcSave from "assets/images/khamBenh/icSave.svg";
import { Title, Tags, DivInfo, SelectGroup, RowCustom, TitleSub, CheckboxGroup, ButtonCovid } from "./styled";
import classNames from "classnames";
import { MAX_NUMBER_SICK } from "../../configs";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import LamSang from "./LamSang";
import CanLamSang from "./CanLamSang";
import TienSu from "./TienSu";
import ChanDoanCovid from "./ChanDoanCovid";

const { Option } = Select;

function KhamCovid(props) {
  const { updateData } = useDispatch().khamBenh
  const { data } = useSelector(state => state.khamBenh.khamCovid || {})
  const listAllMaBenhChinh = useSelector(
    (state) => state.maBenh.listAllMaBenhChinh || []
  );
  const infoNb = useSelector((state) => state.khamBenh.infoNb || {});
  const { nbChanDoan, nbChiSoSong, nbCovid } = useSelector(
    (state) => state.khamBenh.thongTinChiTiet || {}
    );
  const { getAllMaBenh } = useDispatch().maBenh;
  const { getUtils } = useDispatch().utils;
  const { handleSetData } = props;

  const { cdSoBo, dsCdChinhId, dsCdKemTheoId, moTa } = nbChanDoan || {};

  useEffect(() => {
    getAllMaBenh({ nhomBenhPhu: false });
    getAllMaBenh({ nhomBenhPhu: true });
    getUtils({ name: "KetQuaXetNghiem" });
    getUtils({ name: "NghiNgoCovid" });
    // getAllNhomBenh({ loaiNhomBenh: 10 });
    // getAllNhomBenh({ loaiNhomBenh: 20 });
  }, []);
  const [state, _setState] = useState(() => {
    if (nbCovid) {
      return {
        thongTinChiTiet: {
          nbCovid: nbCovid
        }
      }
    }
    return {}
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    updateData({ // update data lên redux
      nbCovid: state?.thongTinChiTiet?.nbCovid
    })
  }, [state?.thongTinChiTiet?.nbCovid])

  //
  useEffect(() => {
    setState({
      thongTinChiTiet: {
        nbCovid : nbCovid
      }
    })
  }, [nbCovid])
  //
  const handleGroupCheckbox = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;

    let obj = {
      thongTinChiTiet: {
        ...state?.thongTinChiTiet,
        nbCovid: {
          ...state?.thongTinChiTiet?.nbCovid,
          [key]: value
        }
      }
    }
    if (key === "ho") {
      if (!value) {
        obj.thongTinChiTiet.nbCovid.loaiHo = null
      }
    }

    setState(obj)
  }
  const handleGroupRadio = (key) => (e) => {
    let obj = {
      thongTinChiTiet: {
        ...state?.thongTinChiTiet,
        nbCovid: {
          ...state?.thongTinChiTiet?.nbCovid,
          [key]: e.target.value
        }
      }
    }
    if (key === "loaiHo") {
      obj.thongTinChiTiet.nbCovid.ho = true
    }
    if (key === "khoTho") {
      obj.thongTinChiTiet.nbCovid.tanSoTho = null
    }
    // updateData({
    //   thongTinChiTiet: {
    //     nbCovid: {
    //       ...nbCovid,
    //       [key]: e.target.value
    //     }
    //   }
    // })
    setState(obj)
  }
  const handleDataInput = (key) => (e) => {
    let value = e?.target?.value || e
    setState({
      thongTinChiTiet: {
        ...state?.thongTinChiTiet,
        nbCovid: {
          ...state?.thongTinChiTiet?.nbCovid,
          [key]: value
        }
      }
    })
  }
  const bmi = useMemo(() => {
    let valueChieuCao = String(state?.thongTinChiTiet?.nbCovid?.chieuCao || nbCovid?.chieuCao)
    let valueCanNang = String(state?.thongTinChiTiet?.nbCovid?.canNang || nbCovid?.canNang)
    let decimalChieuCao = valueChieuCao?.replace(/\B(?=(\d{2})+(?!\d))/g, ".");
    let bmiValue = ""
    let value = null
    if (decimalChieuCao && valueCanNang) {
      let chieuCaoX2 = decimalChieuCao * decimalChieuCao
      bmiValue = Number((valueCanNang / chieuCaoX2).toFixed(1))
    }
    // (Math.round(27225 * 100) / 100).toLocaleString() // thêm dấu , decimal
    if (bmiValue) {
      switch (true) {
        case bmiValue < 16: {
          value = -3 // "Gầy độ 3"
          break;
        }
        case bmiValue >= 16 && bmiValue < 17 : {
          value = -2 // "Gầy độ 2"
          break;
        }
        case bmiValue >= 17 && bmiValue < 18.5 : {
          value = -1 // "Gầy độ 1"
          break;
        }
        case bmiValue >= 18.5 &&  bmiValue < 25: {
          value = 0 // "Bình thường"
          break;
        }

        case bmiValue >= 25 && bmiValue < 30: {
          value = 1 //"Tiền béo phì"
          break;
        }
        case bmiValue >= 30 && bmiValue < 35: {
          value = 2 //"Béo phì độ 1"
          break;
        }
        case bmiValue >= 35 && bmiValue < 40: {
          value = 3 //"Béo phì độ 2"
          break;
        }
        case bmiValue >= 40: {
          value = 4 //"Béo phì độ 3"
          break;
        }
        default:
          value = null
          break;
      }
    }
    handleDataInput("bmi")(value)
    return value
  }, [
    state?.thongTinChiTiet?.nbCovid?.chieuCao,
    state?.thongTinChiTiet?.nbCovid?.canNang,
  ])

  return (
    <Row>
      <Col md={24} className="paddingRight">
        <Title>II. CHUYÊN MÔN</Title>
        {/* ---------------------------------------------------------------- 1. Tiền sử ------------------------------------------*/}
        <TienSu handleGroupCheckbox={handleGroupCheckbox} handleGroupRadio={handleGroupRadio} handleDataInput={handleDataInput} stateParent={state} bmi={bmi} />
        <div style={{ paddingLeft: 15 }}>
          {/* ---------------------------------------------------------------- 1.1 Lâm sàng ------------------------------------------*/}
          <LamSang handleGroupCheckbox={handleGroupCheckbox} handleGroupRadio={handleGroupRadio} handleDataInput={handleDataInput} stateParent={state} />
          {/* ---------------------------------------------------------------- 1.2. Cận lâm sàng ------------------------------------------*/}
          <CanLamSang handleGroupCheckbox={handleGroupCheckbox} handleGroupRadio={handleGroupRadio} handleDataInput={handleDataInput} stateParent={state} />
        </div>
        <ChanDoanCovid
          handleGroupCheckbox={handleGroupCheckbox}
          handleGroupRadio={handleGroupRadio}
          handleDataInput={handleDataInput}
          stateParent={state}
        />
      </Col>
    </Row>
  );
}

export default KhamCovid;
