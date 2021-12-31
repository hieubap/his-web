import React, { useEffect, useState } from "react";
import { Main, SearchPartient, ButtonSearch } from "./styled";
import { Row, Col } from "antd";
import Select from "components/Select";
import { connect } from "react-redux";
import InputBlockString from "components/DanhMuc/inputBlockString";
import { openInNewTab } from "utils";

function TimKiemBN(props) {
  const {
    getPhongChanDoan,
    listPhongChanDoan,
    onChangeInputSearch,
    getDsNguoiBenhCLSQms,
    updateData,
    getListLyDo
  } = props;
  let paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );
  const [state, _setState] = useState({ listPhong: [] });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getPhongChanDoan({ loaiPhong: 20 }, paramCheck);
    props.getKhoaAll({});
    props.getNhomDichVuAll({ tiepDonCls: true, active: true });
    getListLyDo({active : true});
  }, []);

  useEffect(() => {
    let dsPhongThucHienId =
      (listPhongChanDoan.length && listPhongChanDoan[0].id) || null;
    let khoaId =
      (listPhongChanDoan.length && listPhongChanDoan[0].khoaId) || null;
    setState({
      listPhong: listPhongChanDoan,
      dsPhongThucHienId,
    });
    updateData({ dsPhongThucHienId, khoaId });
    if (dsPhongThucHienId && paramCheck)
      getDsNguoiBenhCLSQms(dsPhongThucHienId);
  }, [listPhongChanDoan]);

  useEffect(() => {
    let dsKhoaThucHienId =
      (props.listKhoa.length && props.listKhoa[0].id) || null;
    setState({
      dsKhoaThucHienId,
    });
    updateData({ dsKhoaThucHienId });
  }, [props.listKhoa]);

  useEffect(() => {
    let dsNhomDichVuCap2Id =
      (props.listNhomDichVu.length && props.listNhomDichVu[0].id) || null;
    setState({
      dsNhomDichVuCap2Id,
    });
    updateData({ dsNhomDichVuCap2Id });
  }, [props.listNhomDichVu]);

  const handleSearchBN = () => {};
  const onChange = (key) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (key === "dsPhongThucHienId") {
      setState({
        soLuongHanDoi: item?.lists?.slBanLayBenhPham,
      });
      onChangeInputSearch({
        dsPhongThucHienId: value,
      });
      updateData({ dsPhongThucHienId: value });
      getDsNguoiBenhCLSQms(value);
    }
    if (key === "dsKhoaThucHienId") {
      if (value.length) {
        onChangeInputSearch({
          dsKhoaThucHienId: value,
        });
      } else {
        onChangeInputSearch({ dsKhoaThucHienId: "" });
      }
    }
    if (key === "dsNhomDichVuCap2Id") {
      if (value.length) {
        onChangeInputSearch({
          dsNhomDichVuCap2Id: value,
        });
      } else {
        onChangeInputSearch({ dsNhomDichVuCap2Id: "" });
      }
    }
    setState({
      [key]: value,
    });
  };
  return (
    <Main>
      <Row align="middle">
        <Col xs={(paramCheck && 10) || 12}>
          <SearchPartient>
            <div
              className="title pointer"
              onClick={() => {
                if (paramCheck) openInNewTab("/danh-muc/phong");
                else openInNewTab("/danh-muc/nhom-dich-vu?level=2");
              }}
            >
              {(paramCheck && "Phòng thực hiện") || "Nhóm dịch vụ"}
            </div>
            {(paramCheck && (
              <Select
                data={state.listPhong}
                value={state.dsPhongThucHienId}
                placeholder="Chọn phòng thực hiện"
                style={{ width: "100%" }}
                onChange={onChange("dsPhongThucHienId")}
              />
            )) || (
              <Select
                data={props.listNhomDichVu}
                value={state.dsNhomDichVuCap2Id}
                placeholder="Chọn Nhóm dịch vụ"
                style={{ width: "100%" }}
                mode="multiple"
                showArrow
                onChange={onChange("dsNhomDichVuCap2Id")}
              />
            )}
          </SearchPartient>
        </Col>
        <>
          <Col xs={(paramCheck && 10) || 12}>
            <SearchPartient>
              <div
                className="title pointer"
                onClick={() => openInNewTab("/danh-muc/khoa")}
              >
                {(paramCheck && "Số lượng hàng đợi") || "Khoa"}
              </div>
              {(paramCheck && (
                <InputBlockString
                  placeholder="Nhâp số lượng hàng đợi"
                  style={{ width: "100%" }}
                  // value={state.soLuongHanDoi}
                  onChange={onChange("soLuongHanDoi")}
                  disabled //set value default soLuongHanDoi ( don't Người bệnh tiếp theo  )
                />
              )) || (
                <Select
                  style={{ width: "100%" }}
                  data={props.listKhoa}
                  value={state.dsKhoaThucHienId}
                  mode="multiple"
                  showArrow
                  onChange={onChange("dsKhoaThucHienId")}
                />
              )}
            </SearchPartient>
          </Col>
          {paramCheck && (
            <Col xs={4}>
              <ButtonSearch onClick={() => handleSearchBN()}>OK</ButtonSearch>
            </Col>
          )}
        </>
      </Row>
    </Main>
  );
}

export default connect(
  (state) => {
    const {
      nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
      chanDoanHinhAnh: { listPhongChanDoan, listKhoa, listNhomDichVu },
    } = state;
    return {
      listAllNhomDichVuCap2,
      listPhongChanDoan,
      listKhoa,
      listNhomDichVu,
    };
  },
  ({
    nhomDichVuCap2: { getAllDichVuCap2 },
    chanDoanHinhAnh: { getPhongChanDoan, getKhoaAll, getNhomDichVuAll },
    dsBenhNhan: { onChangeInputSearch, onSizeChange, updateData },
    qms: { getDsNguoiBenhCLSQms },
    lyDoDoiTra: { getListLyDo },
  }) => ({
    getAllDichVuCap2,
    getPhongChanDoan,
    getKhoaAll,
    getNhomDichVuAll,
    onChangeInputSearch,
    onSizeChange,
    getDsNguoiBenhCLSQms,
    updateData,
    getListLyDo
  })
)(TimKiemBN);
