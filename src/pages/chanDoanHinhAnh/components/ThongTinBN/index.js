import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Row, Checkbox, Input, message } from "antd";
import IconExclam from "assets/images/xetNghiem/icExclam.png";
import ModalThongTinBN from "components/ThongTinBenhNhan";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IconQR from "assets/images/xetNghiem/icQR.png";
import { Main, InputSearch } from "./styled";
import IconArrowTop from "assets/images/xetNghiem/icArrowTop.png";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";

const ThongTinBN = ({ layerId }) => {
  const { nbDotDieuTriId: nbDotDieuTriIdChoTiepDon } = useSelector(
    (state) => state.choTiepDonDV
  );
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { listgioiTinh = [] } = useSelector((state) => state.utils);
  const { listPhongChanDoan } = useSelector((state) => state.chanDoanHinhAnh);

  const {
    nbDotDieuTri: { getThongTinNBDotDieuTri },
    utils: { getUtils },
    nbDotDieuTri: { searchNBDotDieuTri },
    choTiepDonDV: { updateData: updateDataNb, getTongHopDichVu },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const location = useLocation();

  const [state, _setState] = useState({ show: false, focusInput: false });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refInput = useRef(null);
  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );

  useEffect(() => {
    if (nbDotDieuTriIdChoTiepDon) {
      getThongTinNBDotDieuTri(nbDotDieuTriIdChoTiepDon);
    }
  }, [location.pathname, nbDotDieuTriIdChoTiepDon]);

  useEffect(() => {
    getUtils({ name: "gioiTinh" });
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refInput.current && refInput.current.focus();
          },
        },
        {
          keyCode: 112, //F1
          onEvent: () => {
            if (thongTinBenhNhan?.id) setState({ show: true });
          },
        },
      ],
    });
  }, [thongTinBenhNhan]);

  const onToggleModal = (key) => () => {
    if (key === "hidden") {
      if (state.show) {
        setState({
          show: false,
        });
      }
    } else {
      setState({
        show: !state.show,
      });
    }
  };

  const handleSearchBN = (value) => {
    const { qrBN = "", timKiemTheoPhieu } = state;
    let str = qrBN.trim() || value || "";
    let param = {};
    if (/^[0-9]+$/.test(str)) {
      if (timKiemTheoPhieu) {
        param = { soPhieu: Number(str) };
      } else param = { maHoSo: Number(str) };
    } else {
      let arr = (str && str.split(",")) || [];
      let children = [];
      if (timKiemTheoPhieu) {
        children = arr.filter((el) => {
          let convertEl = el.includes("”") ? el.split("”") : el.split('"');
          return convertEl.some((et) => et === "soPhieuId");
        });
      } else {
        children = arr.filter((el) => {
          let convertEl = el.includes("”") ? el.split("”") : el.split('"');
          return convertEl.some((et) => et === "maHoSo");
        });
      }
      children = (children.length && children[0]) || "";
      let paramRes = [];
      if (timKiemTheoPhieu) {
        paramRes = children
          ? children.includes("”")
            ? children.split("”")
            : children.split('"')
          : [];
      } else {
        paramRes = children
          ? children.includes("”")
            ? children.split("”")
            : children.split('"')
          : [];
      }
      paramRes = paramRes.filter((et) => /^[0-9]+$/.test(et.replace(":", "")));
      if (paramRes.length) {
        let el = paramRes[0];
        if (el.length >= 10) {
          param = { maHoSo: Number(paramRes[0]) };
        } else if (timKiemTheoPhieu) {
          param = { soPhieuId: Number(el.replace(":", "")) };
        }
      }
    }
    if (param?.maHoSo) {
      searchNBDotDieuTri(param)
        .then((s) => {
          const { data = [] } = s;
          if (data.length) {
            updateDataNb({
              nbDotDieuTriId: data[0].id,
              checkSearchQR: str,
            });
          } else notifiNotSearch();
        })
        .catch((e) => notifiNotSearch());
    }
    if (param?.soPhieu || param?.soPhieuId) {
      getTongHopDichVu(param, paramCheck)
        .then((s) => {
          updateDataNb({
            nbDotDieuTriId: s,
            checkSearchQR: str,
          });
        })
        .catch((e) => notifiNotSearch());
    }
  };

  const notifiNotSearch = () => {
    let res = listPhongChanDoan.filter((e) => e.id === state.phongThucHienId);
    message.error(
      `Không tồn tại dịch vụ người bệnh ${
        (!!res.length && `tại ${res[0].ten}`) || ""
      }!`
    );
  };
  const onChange = (key) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    setState({
      [key]: value,
    });
    if (key === "qrBN") {
      if (!/^[0-9]+$/.test(value)) {
        handleSearchBN(value);
      }
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchBN();
    }
  };
  const gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};
  const age = thongTinBenhNhan.tuoi ? `${thongTinBenhNhan?.tuoi} tuổi` : "";
  console.log(state.focusInput);
  const onBlur = () => {
    console.log("huhu");
    setState({
      focusInput: false,
    });
  };

  return (
    <Main onClick={onToggleModal("hidden")}>
      <Row align="middle">
        <InputSearch focusInput={state.focusInput}>
          <img src={IconSearch} alt="IconSearch" className="icon-search" />
          <Input
            ref={refInput}
            placeholder="Quét mã QR người bệnh"
            autoFocus
            onChange={onChange("qrBN")}
            onKeyDown={onKeyDown}
            onFocus={() =>
              setState({
                focusInput: true,
              })
            }
            onBlur={onBlur}
          />
          <img src={IconQR} alt="IconQrCode" className="qr-search" />
        </InputSearch>
        <Checkbox
          style={{ fontWeight: "600" }}
          onChange={onChange("timKiemTheoPhieu")}
        >
          Tìm kiếm theo số phiếu
        </Checkbox>
      </Row>
      <Row className="info-partinent">
        <div className="info-partinent__name">
          <span>{thongTinBenhNhan?.tenNb}</span>
          {gioiTinh.ten &&
            age &&
            ` (${gioiTinh.ten && `${gioiTinh.ten} - `} ${age})`}
        </div>
        {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].THONG_TIN_NGUOI_BENH]) &&
          thongTinBenhNhan?.id && (
            <div className="info-partinent__detail" onClick={onToggleModal()}>
              Xem thông tin đầy đủ
              <img src={IconExclam} alt="IconExclam" />
              {state.show && (
                <img
                  src={IconArrowTop}
                  alt="IconArrowTop"
                  className="icon-info"
                />
              )}
            </div>
          )}

        {thongTinBenhNhan?.id && location.pathname.includes("/tiep-nhan") && (
          <div className="info-partinent__history">
            Lịch sử khám
            <img src={IconExclam} alt="IconExclam" />
            {state.show && (
              <img
                src={IconArrowTop}
                alt="IconArrowTop"
                className="icon-info"
              />
            )}
          </div>
        )}
      </Row>
      {state.show && (
        <ModalThongTinBN
          onToggleModal={onToggleModal}
          thongTinBenhNhan={thongTinBenhNhan}
          gioiTinh={gioiTinh}
          age={age}
          className="modalThongTinBN"
        />
      )}
    </Main>
  );
};

export default ThongTinBN;
