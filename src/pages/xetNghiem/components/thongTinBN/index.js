import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function ThongTinBN({ layerId }) {
  const refInputSearch = useRef(null);
  const location = useLocation();
  const {
    layMauXN: { nbDotDieuTriId: nbDotDieuTriIdTiepNhanMau },
    xnHuyetHocSinhHoa: { nbDotDieuTriId: nbDotDieuTriIdHHSH },
    xnGiaiPhauBenhViSinh: { nbDotDieuTriId: nbDotDieuTriIdGPB },
    nbDotDieuTri: { thongTinBenhNhan },
    utils: { listgioiTinh = [] },
    xetNghiem: { listNoiLayBenhPham },
  } = useSelector((state) => state);
  const {
    nbDotDieuTri: { getThongTinNBDotDieuTri },
    utils: { getUtils },
    nbDotDieuTri: { searchNBDotDieuTri },
    layMauXN: { updateData: updateDataTiepNhanXN },
    xnHuyetHocSinhHoa: { getTongHopDichVu, updateData: updateDataHHSH },
    xnGiaiPhauBenhViSinh: { updateData: updateDataGPB },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const [state, _setState] = useState({ show: false });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refInputSearch.current.focus();
          },
        },
        {
          keyCode: 112, //F1
          onEvent: () => {
            onToggleModal()();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes("/lay-mau") && nbDotDieuTriIdTiepNhanMau) {
      getThongTinNBDotDieuTri(nbDotDieuTriIdTiepNhanMau);
    }
    if (pathname.includes("/huyet-hoc-sinh-hoa") && nbDotDieuTriIdHHSH) {
      getThongTinNBDotDieuTri(nbDotDieuTriIdHHSH);
    }
    if (pathname.includes("/giai-phau-benh-vi-ky-sinh") && nbDotDieuTriIdGPB) {
      getThongTinNBDotDieuTri(nbDotDieuTriIdGPB);
    }
  }, [
    location.pathname,
    nbDotDieuTriIdTiepNhanMau,
    nbDotDieuTriIdHHSH,
    nbDotDieuTriIdGPB,
  ]);

  const updateNbDieuTriId = (data, str) => {
    const { pathname } = location;
    if (pathname.includes("/lay-mau")) {
      updateDataTiepNhanXN({
        nbDotDieuTriId: data,
        checkSearchQR: str,
      });
    }
    if (pathname.includes("/huyet-hoc-sinh-hoa")) {
      updateDataHHSH({
        nbDotDieuTriId: data,
        checkSearchQR: str,
      });
    }
    if (pathname.includes("/giai-phau-benh-vi-ky-sinh")) {
      updateDataGPB({
        nbDotDieuTriId: data,
        checkSearchQR: str,
      });
    }
  };

  useEffect(() => {
    getUtils({ name: "gioiTinh" });
  }, []);
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
            updateNbDieuTriId(data[0].id, str);
          } else notifiNotSearch();
        })
        .catch((e) => notifiNotSearch());
    }
    if (param?.soPhieu || param?.soPhieuId) {
      getTongHopDichVu(param)
        .then((s) => {
          updateNbDieuTriId(s, str);
        })
        .catch((e) => notifiNotSearch());
    }
  };

  const notifiNotSearch = () => {
    let res = listNoiLayBenhPham.filter((e) => e.id === state.phongLayMauId);
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
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchBN();
    }
  };

  const gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};
  const age = thongTinBenhNhan.tuoi ? `${thongTinBenhNhan?.tuoi} tuổi` : "";
  const onBlur = () => {
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
            ref={refInputSearch}
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
        <div className="info-partinent__index">BNS-0004</div>
        <div className="info-partinent__name">
          <span>{thongTinBenhNhan?.tenNb}</span>
          {gioiTinh.ten &&
            age &&
            ` (${gioiTinh.ten && `${gioiTinh.ten} - `} ${age})`}
        </div>
        {checkRole([ROLES["XET_NGHIEM"].THONG_TIN_NB]) && thongTinBenhNhan?.id && (
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
}

export default ThongTinBN;
