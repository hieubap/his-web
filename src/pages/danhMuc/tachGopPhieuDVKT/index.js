import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import cacheUtils from "utils/cache-utils";

import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  HIEU_LUC,
  TABLE_LAYOUT,
  ADD_LAYOUT,
} from "constants/index";
import { Main } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { set } from "lodash";
let timer = null;

const TachGopPhieuDVKT = ({
  listData,
  getTachGopPhieuDVKT,
  tachGopPhieuDVKT,
  updateData,
  dataEditDefault,
}) => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    listData,
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
    dataRows: [],
  });

  const configs = [
    {
      key: "maPhieuChiDinh",
      text: "Giống mã phiếu chỉ định",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "phongThucHien",
      text: "Chung nơi thực hiện",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "mauBaoCao",
      text: "Giống mã biểu mẫu",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "dichVuTachPhieu",
      text: "Dịch vụ tách phiếu",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "chiDinhTuDichVu",
      text: "Chung nơi chỉ định (Khoa - phòng cho chỉ định)",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "bacSiChiDinh",
      text: "Chung Bác sĩ chỉ định ",
      soPhieu: false,
      phieuChiDinh: false,
    },
    {
      key: "thoiGianThucHien",
      text: "Chung thời điểm thực hiện & lấy mẫu",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "trangThai",
      text: "Cùng chưa được tiếp nhận",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "thanhToan",
      text: "Đều chưa thanh toán",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "capCuu",
      text:
        "Giống yêu cầu thực hiện cấp cứu (Cùng cấp cứu hoặc cùng không cấp cứu)",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "tuTra",
      text:
        "Giống điều kiện BN BHYT tự chi trả (BN tự chi trả hoặc được hưởng BHYT)",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
    {
      key: "thucHienTaiKhoa",
      text: "Thực hiện tại khoa",
      soPhieu: false,
      phieuChiDinh: false,
      ghiChu: "",
    },
  ];

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const phieuXetNghiem = [
    {
      id: true,
      ten: "Tách phiếu",
    },
    {
      id: false,
      ten: "Gộp phiếu",
    },
  ];
  const toChiDinh = [
    {
      id: true,
      ten: "Tách phiếu",
    },
    {
      id: false,
      ten: "Gộp phiếu",
    },
  ];

  const onChange = (key, type) => (value) => {
    const dataRows = state.dataRows.map((item) => {
      if (item.key === key && type === "ghiChu") {
        item[type] = value.target.value;
      }
      if (item.key === key && type !== "ghiChu") {
        item[type] = value;
      }
      return item;
    });
    state.editStatus = true;
    setState({ dataRows, editStatus: true });
  };

  const onChange2 = (key, type) => (value) => {
    const dataRows = state.dataRows.map((item) => {
      if (item.key === key && type === "ghiChu") {
        item[type] = value.target.value;
      }
      if (item.key === key && type !== "ghiChu") {
        item[type] = value;
      }
      return item;
    });
    state.dataRows = dataRows;
  };
  const onBlur = () => {
    setState({
      editStatus: true,
    });
  };

  useEffect(() => {
    getTachGopPhieuDVKT({});

    if (Object.keys(listData).length) {
      setState({
        dataRows: listData,
      });
    } else {
      setState({
        dataRows: configs,
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(listData).length) {
      state.dataRows.forEach((item) => {
        switch (item.key) {
          case "maPhieuChiDinh":
            item.soPhieu = listData?.soPhieu?.maPhieuChiDinh;
            item.phieuChiDinh = listData?.phieuChiDinh?.maPhieuChiDinh;
            item.ghiChu = listData?.ghiChu?.maPhieuChiDinh;
            break;
          case "phongThucHien":
            item.soPhieu = listData?.soPhieu?.phongThucHien;
            item.phieuChiDinh = listData?.phieuChiDinh?.phongThucHien;
            item.ghiChu = listData?.ghiChu?.phongThucHien;
            break;
          case "thanhToan":
            item.soPhieu = listData?.soPhieu?.thanhToan;
            item.phieuChiDinh = listData?.phieuChiDinh?.thanhToan;
            item.ghiChu = listData?.ghiChu?.thanhToan;
            break;
          case "mauBaoCao":
            item.soPhieu = listData?.soPhieu?.mauBaoCao;
            item.phieuChiDinh = listData?.phieuChiDinh?.mauBaoCao;
            item.ghiChu = listData?.ghiChu?.mauBaoCao;
            break;
          case "dichVuTachPhieu":
            item.soPhieu = listData?.soPhieu?.dichVuTachPhieu;
            item.phieuChiDinh = listData?.phieuChiDinh?.dichVuTachPhieu;
            item.ghiChu = listData?.ghiChu?.dichVuTachPhieu;
            break;
          case "capCuu":
            item.soPhieu = listData?.soPhieu?.capCuu;
            item.phieuChiDinh = listData?.phieuChiDinh?.capCuu;
            item.ghiChu = listData?.ghiChu?.capCuu;
            break;
          case "tuTra":
            item.soPhieu = listData?.soPhieu?.tuTra;
            item.phieuChiDinh = listData?.phieuChiDinh?.tuTra;
            item.ghiChu = listData?.ghiChu?.tuTra;
            break;
          case "benhPham":
            item.soPhieu = listData?.soPhieu?.benhPham;
            item.phieuChiDinh = listData?.phieuChiDinh?.benhPham;
            item.ghiChu = listData?.ghiChu?.benhPham;
            break;
          case "thoiGianThucHien":
            item.soPhieu = listData?.soPhieu?.thoiGianThucHien;
            item.phieuChiDinh = listData?.phieuChiDinh?.thoiGianThucHien;
            item.ghiChu = listData?.ghiChu?.thoiGianThucHien;
            break;
          case "chiDinhTuDichVu":
            item.soPhieu = listData?.soPhieu?.chiDinhTuDichVu;
            item.phieuChiDinh = listData?.phieuChiDinh?.chiDinhTuDichVu;
            item.ghiChu = listData?.ghiChu?.chiDinhTuDichVu;
            break;
          case "bacSiChiDinh":
            item.soPhieu = listData?.soPhieu?.bacSiChiDinh;
            item.phieuChiDinh = listData?.phieuChiDinh?.bacSiChiDinh;
            item.ghiChu = listData?.ghiChu?.bacSiChiDinh;
            break;
          case "thucHienTaiKhoa":
            item.soPhieu = listData?.soPhieu?.thucHienTaiKhoa;
            item.phieuChiDinh = listData?.phieuChiDinh?.thucHienTaiKhoa;
            item.ghiChu = listData?.ghiChu?.thucHienTaiKhoa;
            break;
          case "trangThai":
            item.soPhieu = listData?.soPhieu?.trangThai;
            item.phieuChiDinh = listData?.phieuChiDinh?.trangThai;
            item.ghiChu = listData?.ghiChu?.trangThai;
            break;
          default:
            break;
        }
      });

      setState({ dataRows: state.dataRows });
    }
  }, [listData]);

  const handleClickedBtnSave = () => {
    setState({
      editStatus: false,
    });

    let obj = {
      soPhieu: {},
      phieuChiDinh: {},
      ghiChu: {},
    };

    state.dataRows.forEach((item) => {
      obj.soPhieu[item.key] = item.soPhieu;
      obj.phieuChiDinh[item.key] = item.phieuChiDinh;
      obj.ghiChu[item.key] = item.ghiChu;
    });

    tachGopPhieuDVKT(obj);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "40px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: <HeaderSearch title="So sánh các dịch vụ xét nghiệm" />,
      align: "left",
      width: "120px",
      dataIndex: "text",
      key: "1",
    },
    {
      title: <HeaderSearch title="Gộp phiếu xét nghiệm" />,
      width: "120px",
      align: "left",
      dataIndex: "soPhieu",
      key: "2",
      render: (value, row, index) => {
        return (
          <Select
            value={value}
            data={phieuXetNghiem}
            onChange={onChange(row.key, "soPhieu")}
          />
        );
      },
    },
    {
      title: <HeaderSearch title="Chung tờ chỉ định" />,
      width: "120px",
      align: "left",
      dataIndex: "phieuChiDinh",
      key: "3",
      render: (value, row, index) => {
        return (
          <Select
            value={value}
            data={toChiDinh}
            onChange={onChange(row.key, "phieuChiDinh")}
          />
        );
      },
    },
    {
      title: <HeaderSearch title="Ghi chú" />,
      width: "200px",
      dataIndex: "ghiChu",
      key: "4",
      align: "center",
      render: (value, row, index) => {
        return (
          <input
            id="ghiChu"
            defaultValue={value}
            onBlur={onBlur}
            onChange={onChange2(row.key, "ghiChu")}
          />
        );
      },
    },
  ];

  return (
    <Main>
      <HomeWrapper title="Thiết lập">
        <TableWrapper
          title="Thiết lập tách - gộp phiếu chỉ định DVKT"
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={state.dataRows}
          // onRow={onRow}
          buttonHeader={
            state.editStatus
              ? [
                  {
                    title: "Lưu",
                    onClick: handleClickedBtnSave,
                  },
                ]
              : ""
          }
        />
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = ({
  tachGopPhieuDVKT: { listData, updateData, dataEditDefault },
}) => {
  console.log(listData);
  return {
    listData,
    updateData,
    dataEditDefault,
  };
};
const mapDispatchToProps = ({
  tachGopPhieuDVKT: {
    getTachGopPhieuDVKT,
    tachGopPhieuDVKT,
    updateData,
    dataEditDefault,
  },
}) => ({
  getTachGopPhieuDVKT,
  tachGopPhieuDVKT,
  updateData,
  dataEditDefault,
});
export default connect(mapStateToProps, mapDispatchToProps)(TachGopPhieuDVKT);
