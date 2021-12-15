import React, { forwardRef, useEffect, useImperativeHandle, useState, useMemo } from "react";
import { connect } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { Select } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import TrangThaiPhieuNhap from "./component/TrangThaiPhieuNhap";
import moment from "moment";
import { openInNewTab } from "utils";

const { Option } = Select;

const TieuDePhieu = ({
  //state
  // ticket,
  listNhaSanXuat,
  thongTinPhieuNhap,
  thongTinHangHoa,
  // pnNhaCungCap,
  //dispatch
  updateData,
  getListNhaSanXuat,
  ...props
}, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  useImperativeHandle(ref, () => ({
    setNhaCungCapId: (value) => {
      if (value) {
        onChange("nhaCungCapId")(value);
      }
    },
    getNhaCungCapId: () => thongTinPhieuNhap?.nhaCungCapId,
  }))
  const onChange = (type) => (e) => {
    const value = e?.target ? e?.target?.value : e;
    setState({ [type]: value });
    updateData({
      thongTinPhieuNhap: {
        ...thongTinPhieuNhap,
        [type]: value,
      }
    })
  };
  const onClearData = (type) => (e) => {
    setState({ [type]: null });
    if (type == "nhaCungCapId") {
      updateData({
        thongTinPhieuNhap: {
          ...thongTinPhieuNhap,
          [type]: undefined,
        }
      });
    }
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };
  useEffect(() => {
    // khi nhà cung cấp null và quyết định thầu null
    // search nha cung cap theo dm nha cung cap
    if (!thongTinPhieuNhap?.nhaCungCapId && !thongTinPhieuNhap?.quyetDinhThauId) {
      getListNhaSanXuat({ loaiNhaSanXuat: 20, active: true });
    }
    // khi quyet dinh thau duoc chon va nha cung cap null
    // fill nha cung cap theo quyet dinh thau
    else if (thongTinPhieuNhap?.quyetDinhThauId) {
      // updateData({ pnNhaCungCap: null });
      // setState({ nhaCungCapId: null });
      getListNhaSanXuat({
        loaiNhaSanXuat: 20, active: true,
        quyetDinhThauId: thongTinPhieuNhap?.quyetDinhThauId,
      });
    }
    // khi hàng hóa được chọn và nhà cung cấp null
    // fill nhà cung cấp theo nhà cung cấp trong hàng hóa
    // else if (thongTinHangHoa?.dsHangHoa) {

    // }
  }, [thongTinPhieuNhap?.quyetDinhThauId]);
  useEffect(() => {
    getListNhaSanXuat({ loaiNhaSanXuat: 20, active: true });
  }, []);
  const getStatus = () => {
    return [
      {
        name: "Tạo phiếu nhập",
        active: !!thongTinPhieuNhap?.thoiGianTaoPhieu,
        time:
          thongTinPhieuNhap?.thoiGianTaoPhieu &&
          moment(thongTinPhieuNhap?.thoiGianTaoPhieu).format("HH:mm:ss - DD/MM/YYYY"),
      },
      {
        name: "Chờ duyệt",
        inActive: !thongTinPhieuNhap?.thoiGianTaoPhieu,
        active: !!thongTinPhieuNhap?.thoiGianHoanThanh,
        time:
          thongTinPhieuNhap?.thoiGianHoanThanh &&
          moment(thongTinPhieuNhap?.thoiGianHoanThanh).format("HH:mm:ss - DD/MM/YYYY"),
      },
      {
        name: "Hoàn thành",
        inActive: !thongTinPhieuNhap?.thoiGianHoanThanh,
        active: !!thongTinPhieuNhap?.thoiGianDuyet,
        time:
          thongTinPhieuNhap?.thoiGianDuyet &&
          moment(thongTinPhieuNhap?.thoiGianDuyet).format("HH:mm:ss - DD/MM/YYYY"),
      },
    ];
  };

  const nhaCungCap = useMemo(() => {
    if (thongTinPhieuNhap?.id) return thongTinPhieuNhap.nhaCungCap;
    const ncc = listNhaSanXuat?.find((item) => item?.id == thongTinPhieuNhap?.nhaCungCapId);
    return ncc;
  }, [thongTinPhieuNhap.nhaCungCapId]);

  return (
    <div className="title">
      <div className="row-title">
        <div>
          <h2>
            <b>Thêm mới phiếu nhập</b>
          </h2>
        </div>
        <div>
          <TrangThaiPhieuNhap status={getStatus()} />
        </div>
      </div>
      <div className="row-title">
        {thongTinPhieuNhap.nhaCungCapId ? (
          <>
            <div>
              <b
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nha-san-xuat")}
              >
                Nhà cung cấp&nbsp;
              </b>
              <span>{nhaCungCap?.ten}</span>
              {!thongTinPhieuNhap?.id && (
                <CloseOutlined
                  className="close-icon"
                  onClick={onClearData("nhaCungCapId")}
                />
              )}
            </div>
            <div>
              <b>Địa chỉ: </b>
              <span>{nhaCungCap?.diaChi} - </span>
              <b>MST: </b>
              <span>{nhaCungCap?.maSoThue} - </span>
              <b>STK: </b>
              <span>{nhaCungCap?.soTaiKhoan}</span>
            </div>
          </>
        ) : (
          <div className="d-flex">
            <span className="pr-2" style={{ paddingTop: "3px" }}>
              <b
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nha-san-xuat")}
              >
                Nhà cung cấp&nbsp;
              </b>
            </span>
            <span style={{ marginLeft: "40px" }}>
              <div className="search-select">
                <img
                  src={IconSearch}
                  alt="IconSearch"
                  className="icon-search"
                />
                <Select
                  style={{ width: "300px" }}
                  showSearch
                  filterOption={filterOption}
                  placeholder="Nhập thông tin nhà cung cấp"
                  onSelect={onChange("nhaCungCapId")}
                  value={thongTinPhieuNhap?.nhaCungCapId}
                >
                  {listNhaSanXuat?.map((item, index) => (
                    <Option key={index} value={item?.id}>
                      {item?.ten}
                    </Option>
                  ))}
                </Select>
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    listNhaSanXuat: state.nhaSanXuat.listNhaSanXuat || [],
    thongTinHangHoa: state.nhapKho.thongTinHangHoa,
    thongTinPhieuNhap: state.phieuNhap.thongTinPhieuNhap,
    // pnNhaCungCap: state.nhapKho.pnNhaCungCap,
  }),
  ({
    nhaSanXuat: { getListNhaSanXuat },
    phieuNhap: { updateData }
  }) => ({
    updateData,
    getListNhaSanXuat,
  }),
  null,
  { forwardRef: true }
)(forwardRef(TieuDePhieu));
