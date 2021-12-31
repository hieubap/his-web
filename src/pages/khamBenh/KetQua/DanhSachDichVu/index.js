import React, { useState, useEffect, useMemo } from "react";
import { TableWrapper } from "components";
import { GlobalStyle, PhieuChiDinhWrapper, PopoverWrapper } from "./styled";
import IconInfo from "assets/images/khamBenh/icInfo.svg";
import IconDot from "assets/images/khamBenh/icDot.svg";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { LENGTH_ZERO_PREFIX } from "../../../../components/TiepDon/ThongTinTiepDon/configs";
import { addPrefixNumberZero } from "utils";

const DanhSachDichVu = (props) => {
  const {
    dataGroup = [],
    dataSortColumn = {},
    soPhieu,
    tenBacSiChiDinh,
    tenKhoaThucHien,
    nhomDichVuCap1Id,
  } = props;
  const [dataSource, setDataSource] = useState([]);
  const isXetNghiem = +nhomDichVuCap1Id === 2;

  useEffect(() => {
    let data = [];

    if (isXetNghiem) {
      dataGroup.forEach((dv, index) => {
        const { dsChiSoCon = [], ...rest } = dv;
        data.push({
          ...rest,
          stt: index + 1,
          isParent: true,
          rowSpan: dsChiSoCon.length + 1,
        });
        data.push(...dsChiSoCon);
      });
    } else {
      data = dataGroup.map((dv, index) => ({
        ...dv,
        isParent: true,
        stt: index + 1,
      }));
    }

    setDataSource(data);
  }, [dataGroup]);

  const renderStt = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (row.isParent) {
      obj.props.rowSpan = row.rowSpan;
      obj.children = addPrefixNumberZero(value, 3);
    } else {
      obj.props.rowSpan = 0;
    }

    return obj;
  };

  const renderRowTenChiSoCon = (value, row, index) => {
    if (row.isParent) {
      const {
        tenPhongThucHien,
        tenBacSiChiDinh,
        tenKhoaChiDinh,
        benhPham,
        thoiGianCoKetQua,
        tenNguoiThucHien,
        diaDiemPhongThucHien,
      } = row;
      const contentPopover = () => {
        return (
          <div>
            <div>
              Bác sĩ chỉ định: {tenBacSiChiDinh}
              {(tenPhongThucHien || tenKhoaThucHien) && " - "}
              {tenPhongThucHien}
              {(tenPhongThucHien || tenBacSiChiDinh) && " - "}
              {tenKhoaThucHien}
            </div>
            <div>
              Bệnh phẩm: {benhPham}
              {benhPham && thoiGianCoKetQua && " - "}
              Có kết quả vào: {thoiGianCoKetQua ? moment(thoiGianCoKetQua).format("DD/MM/YYYY") : ""}
            </div>

            <div>Người thực hiện: {tenNguoiThucHien}</div>
            <div>Bác sĩ đọc kết quả: {dataGroup && (dataGroup[0].tenNguoiDuyetKetQua || dataGroup[0].tenNguoiThucHien)}</div>

            <div>Thực hiện tại phòng: {diaDiemPhongThucHien}</div>
          </div>
        );
      };

      return (
        <div className="title-wrapper">
          <GlobalStyle />
          <PopoverWrapper content={contentPopover}>
            <IconInfo className="title-wrapper__icon" />
          </PopoverWrapper>
          {row.isParent ? row.tenDichVu : value}
        </div>
      );
    }
    return (
      <div className="child-title">
        <IconDot className="child-title__icon" />
        {value}
      </div>
    );
  };

  const onClickSort = () => { };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "20px",
      dataIndex: "stt",
      key: "stt",
      align: "right",
      className: "stt-column",
      render: renderStt,
    },
    {
      title: (
        <HeaderSearch
          title="Dịch vụ"
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 120,
      dataIndex: "tenChiSoCon",
      key: "tenChiSoCon",
      align: "left",
      render: renderRowTenChiSoCon,
    },
    {
      title: (
        <HeaderSearch
          title={isXetNghiem ? "Kết quả - Kết luận" : "Kết quả"}
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 60,
      dataIndex: "ketQua",
      key: "ketQua",
      align: "left",
      render: (value, row, index) => {
        let ketQua = row.ketQua
        const ketLuan = row.ketLuan
        return isXetNghiem ? `${ketQua ? ketQua : ""}${ketLuan ? `${ketQua ? " - " : ""}${ketLuan}` : ""}` : ketQua;
      },
    },
    {
      title: (
        <HeaderSearch
          title={isXetNghiem ? "Giá trị tham chiếu" : "Kết luận"} //Với nhóm dịch vụ != Xét nghiệm. Hiển thị tên cột = Kết luận. Lấy giá trị từ kết luận của dịch vụ để hiển thị
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 60,
      dataIndex: "ketLuan",
      key: "ketLuan",
      align: "left",
      render: (value, row, index) => {
        const { ketQuaThamChieu, chiSoThap, chiSoCao, ketLuan } = row
        let displayIsXetNghiem = ""
        if (isXetNghiem) {
          displayIsXetNghiem = (ketQuaThamChieu || (!!chiSoThap && !!chiSoCao && `${chiSoThap} - ${chiSoCao}`))
        }
        return isXetNghiem ? displayIsXetNghiem : ketLuan;
      },
    },
  ];

  return (
    <PhieuChiDinhWrapper>
      <div className="info-top">Số phiếu: {soPhieu}</div>
      <div className="info-bottom">
        <div>
          <span>Bác sĩ đọc kết quả: {dataGroup && (dataGroup[0].tenNguoiDuyetKetQua || dataGroup[0].tenNguoiThucHien)}</span>
        </div>
        <div>
          <span>Khoa: {tenKhoaThucHien}</span>
        </div>
      </div>
      <div className="form-detail">
        <TableWrapper
          bordered
          className="table-danh-sach"
          rowClassName="table-row"
          scroll={{ x: false }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </PhieuChiDinhWrapper>
  );
};

export default DanhSachDichVu;
