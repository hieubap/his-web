import React, { useEffect, useState } from "react";
import { Main, SearchPartient, ButtonSearch } from "./styled";
import { Row, Col } from "antd";
import Select from "components/Select";
import { useSelector, useDispatch } from "react-redux";
import InputBlockString from "components/DanhMuc/inputBlockString";
import { openInNewTab } from "utils";
import {  TRANG_THAI_LAY_MAU_BN } from "constants/index";

const TimKiemBN = (props) => {
  const { listNoiLayBenhPham } = useSelector((state) => state.xetNghiem);
  const {
    thietLap: {
      dataNHOM_HUYET_HOC,
      dataNHOM_SINH_HOA,
      dataNHOM_SINH_HOA_TIM_MACH,
      dataNHOM_MIEN_DICH,
      dataNHOM_GIAI_PHAU_BENH,
      dataNHOM_VI_SINH,
    },
    nhomDichVuCap2: { listGroupService2 },
    xnHuyetHocSinhHoa: { dsNhomDichVuCap2Id: dsNhomDichVuCap2IdSHHH },
    xnGiaiPhauBenhViSinh: { dsNhomDichVuCap2Id: dsNhomDichVuCap2IdGPB },
  } = useSelector((state) => state);
  const {
    xetNghiem: { getPhongLayMau, getDsNguoiBenhQms },
    nbXetNghiem: { onChangeInputSearch, updateData: updateDataNBXetNghiem },
    nhomDichVuCap2: { searchTongHopDichVuCap2 },
    xnHuyetHocSinhHoa: { updateData: updateDataSHHH },
    xnGiaiPhauBenhViSinh: { updateData: updateDataGPB },
    nbXetNghiem: { onSizeChange },
  } = useDispatch();
  let paramCheck = ["/xet-nghiem/lay-mau"].includes(window.location.pathname);
  const [state, _setState] = useState({ listPhong: [] });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    searchTongHopDichVuCap2();
    getPhongLayMau({ loaiPhong: 40 }, paramCheck);
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes("/giai-phau-benh-vi-ky-sinh")) {
      let dichVuCap2 = listGroupService2.filter(
        (x) =>
          x.ma == dataNHOM_GIAI_PHAU_BENH ||
          x.ma == dataNHOM_VI_SINH
      );
      if (dichVuCap2.length) {
        let id = dichVuCap2.map((item) => item?.id);
        updateDataGPB({ dsNhomDichVuCap2Id: id });
      }
    }
  }, [dataNHOM_GIAI_PHAU_BENH, dataNHOM_VI_SINH, listGroupService2]);
  useEffect(() => {
    if (window.location.pathname.includes("/huyet-hoc-sinh-hoa")) {
      let dichVuCap2 = listGroupService2.filter(
        (x) =>
          x.ma == dataNHOM_HUYET_HOC ||
          x.ma == dataNHOM_SINH_HOA ||
          x.ma == dataNHOM_SINH_HOA_TIM_MACH ||
          x.ma == dataNHOM_MIEN_DICH
      );
      if (dichVuCap2.length) {
        let id = dichVuCap2.map((item) => item?.id);
        updateDataSHHH({ dsNhomDichVuCap2Id: id });
      }
    }
  }, [
    listGroupService2,
    dataNHOM_HUYET_HOC,
    dataNHOM_SINH_HOA,
    dataNHOM_SINH_HOA_TIM_MACH,
    dataNHOM_MIEN_DICH
    ,
  ]);

  useEffect(() => {
    let phongLayMauId =
      (listNoiLayBenhPham.length && listNoiLayBenhPham[0].id) || null;
    let soLuongHanDoi =
      (listNoiLayBenhPham.length && listNoiLayBenhPham[0].slBanLayBenhPham) ||
      "";
    setState({
      listPhong: listNoiLayBenhPham,
      phongLayMauId,
      soLuongHanDoi,
    });
    if (phongLayMauId && paramCheck) {
      getDsNguoiBenhQms(phongLayMauId);
      updateDataNBXetNghiem({ phongLayMauId });
    }
  }, [listNoiLayBenhPham]);

  useEffect(() => {
    onSizeChange({
      phongLayMauId: state?.phongLayMauId,
      size: 10,
      dataSearch: {
        dsTrangThai: paramCheck
          ? TRANG_THAI_LAY_MAU_BN.reduce((arr, cur) => [...arr, cur.value], [])
          : 66,
      },
    });
  }, [state?.phongLayMauId, dsNhomDichVuCap2IdSHHH, dsNhomDichVuCap2IdGPB]);
  const handleSearchBN = () => {};
  const onChange = (key) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (key === "phongLayMauId") {
      setState({
        soLuongHanDoi: item?.lists?.slBanLayBenhPham,
      }); //set value default soLuongHanDoi ( don't Người bệnh tiếp theo  )
      updateDataNBXetNghiem({
        page: 0,
        size: 10,
      });
      onChangeInputSearch({
        phongLayMauId: value,
      });
      if (paramCheck) {
        getDsNguoiBenhQms(value);
        updateDataNBXetNghiem({ phongLayMauId: value });
      }
    }
    setState({
      [key]: value,
    });
  };
  return (
    <Main>
      <Row align="middle">
        <Col xs={(paramCheck && 12) || 24}>
          <SearchPartient>
            <div
              onClick={() => openInNewTab("/danh-muc/phong")}
              className="title pointer"
            >
              {(paramCheck && "Phòng lấy mẫu") || "Phòng thực hiện"}
            </div>
            <Select
              data={state.listPhong}
              value={state.phongLayMauId}
              placeholder={`Chọn ${
                (paramCheck && "phòng lấy mẫu") || "phòng thực hiện"
              }`}
              style={{ width: "100%" }}
              onChange={onChange("phongLayMauId")}
            />
          </SearchPartient>
        </Col>
        {!!paramCheck && (
          <>
            <Col xs={8}>
              <SearchPartient>
                <div className="title">Số lượng hàng đợi</div>
                <InputBlockString
                  placeholder="Nhâp số lượng hàng đợi"
                  style={{ width: "100%" }}
                  value={state.soLuongHanDoi}
                  onChange={onChange("soLuongHanDoi")}
                  disabled //set value default soLuongHanDoi ( don't Người bệnh tiếp theo  )
                />
              </SearchPartient>
            </Col>
            <Col xs={4}>
              <ButtonSearch onClick={() => handleSearchBN()}>OK</ButtonSearch>
            </Col>
          </>
        )}
      </Row>
    </Main>
  );
};

export default TimKiemBN;
