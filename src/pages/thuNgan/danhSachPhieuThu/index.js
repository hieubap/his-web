import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROLES } from "constants/index";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
import { checkRole } from "app/Sidebar/constant";
import { Input } from "antd";
import moment from "moment";
import { TRANG_THAI_PHIEU_THU, SO_TIEN, TIME_FORMAT } from "./configs";
import PhieuThuHeader from "./phieuThuHeader";
import MainHeaderSearchThuNgan from "../timKiemBenhNhan/HeaderSearch";
import IconArrowRight from "assets/images/thuNgan/arrowRight.png";
import { formatDecimal } from "./configs";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

let timer = null;

function DanhSachPhieuThu(props) {
  const [state, _setState] = useState({
    currentIndex: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    listData,
    listdoiTuong,
    listDoiTuongKcb,
    listAllKhoa,
    totalElements,
    page,
    size,
    dataSortColumn,
    dataSearch,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    getUtils,
    getListAllKhoa,
    auth,
  } = props;
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const roles = auth?.authorities || [];
  const history = useHistory();

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onSizeChange({
      size: 20,
      dataSearch: {
        thanhToan: false,
      },
      dataSortColumn: {},
    });
    getAllServices();
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  useEffect(() => {
    if (state.currentIndex > listData.length - 1) {
      setState({ currentIndex: 0 });
    }
  }, [listData]);
  const scrollToRow = (id) => {
    document
      .getElementsByClassName("row-id-" + id)[0]
      .scrollIntoView({ block: "center", behavior: "smooth" });
  };
  useEffect(() => {
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 38, //Mũi tên lên
          onEvent: (e) => {
            console.log(e, "e");
            if (e.target.id !== "nh-select-tim-kiem-ten-man-hinh")
              e.target.blur();
            if (
              state.currentIndex > 0 &&
              e.target.id !== "nh-select-tim-kiem-ten-man-hinh"
            ) {
              setState({
                currentIndex: state.currentIndex - 1,
              });
              scrollToRow(listData[state.currentIndex - 1]?.id);
            }
          },
        },

        {
          keyCode: 40, //Mũi tên xuống
          onEvent: (e) => {
            console.log(e, "e");
            if (e.target.id !== "nh-select-tim-kiem-ten-man-hinh")
              e.target.blur();
            if (
              state.currentIndex < listData.length - 1 &&
              e.target.id !== "nh-select-tim-kiem-ten-man-hinh"
            ) {
              setState({
                currentIndex: state.currentIndex + 1,
              });
              scrollToRow(listData[state.currentIndex + 1]?.id);
            }
          },
        },
        {
          keyCode: 13, //Enter
          onEvent: (e) => {
            const record = listData[state.currentIndex];
            if (record && e.target.nodeName !== "INPUT") {
              onRow(record).onClick();
            }
          },
        },
      ],
    });
  }, [listData, state.currentIndex]);

  const getAllServices = () => {
    getUtils({ name: "doiTuong" });
    getUtils({ name: "DoiTuongKcb" });
    getListAllKhoa();
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(
      () =>
        onChangeInputSearch({
          [key]: value,
        }),
      300
    );
  };

  const onSearchPrice = (value) => {
    value = value || ",";
    const [tongTienTu, tongTienDen] = value.split(",");
    onChangeInputSearch({ tongTienTu, tongTienDen });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 50,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: (
        <HeaderSearch
          title="Mã HS"
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maHoSo || 0}
          search={
            <Input placeholder="Tìm mã HS" onChange={onSearchInput("maHoSo")} />
          }
        />
      ),
      width: 110,
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title="Mã NB"
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maNb || 0}
          search={
            <Input placeholder="Tìm mã Nb" onChange={onSearchInput("maNb")} />
          }
        />
      ),
      width: 110,
      dataIndex: "maNb",
      key: "maNb",
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên"
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenNb || 0}
          search={
            <Input placeholder="Tìm họ tên" onChange={onSearchInput("tenNb")} />
          }
        />
      ),
      width: 180,
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title="Số tiền"
          sort_key="tongTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tongTien || 0}
          searchSelect={
            <Select
              data={SO_TIEN}
              defaultValue=""
              placeholder="Chọn số tiền"
              onChange={onSearchPrice}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (item) => {
        return item && formatDecimal(String(item));
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="thanhToan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thanhToan || 0}
          searchSelect={
            <Select
              defaultValue={"false"}
              data={TRANG_THAI_PHIEU_THU}
              placeholder="Chọn TT phiếu thu"
              onChange={onSearchInput("thanhToan")}
            />
          }
          title="Trạng thái PT"
        />
      ),
      width: 110,
      dataIndex: "thanhToan",
      key: "thanhToan",
      align: "center",
      render: (thanhToan) => {
        return thanhToan ? "Đã thanh toán" : "Chưa thanh toán";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngày thanh toán"
          sort_key="thoiGianThanhToan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thoiGianThanhToan || 0}
        />
      ),
      width: 130,
      dataIndex: "thoiGianThanhToan",
      key: "thoiGianThanhToan",
      render: (item) => {
        return item && <span>{moment(item).format(TIME_FORMAT)}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên thu ngân"
          sort_key="tenThuNgan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenThuNgan || 0}
          search={
            <Input
              placeholder="Tìm tên thu ngân"
              onChange={onSearchInput("tenThuNgan")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "tenThuNgan",
      key: "tenThuNgan",
    },
    {
      title: (
        <HeaderSearch
          title="Đối tượng NB"
          sort_key="doiTuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.doiTuong || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listdoiTuong]}
              defaultValue=""
              placeholder="Chọn đối tượng"
              onChange={onSearchInput("doiTuong")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "doiTuong",
      key: "doiTuong",
      render: (item) => {
        const index = listdoiTuong.findIndex((dt) => dt.id === item);
        if (index === -1) return;
        return listdoiTuong[index].ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đối tượng KCB"
          sort_key="doiTuongKcb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tongTien || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listDoiTuongKcb]}
              defaultValue=""
              placeholder="Chọn đối tượng KCB"
              onChange={onSearchInput("doiTuongKcb")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "doiTuongKcb",
      key: "doiTuongKcb",
      render: (item) => {
        const index = listDoiTuongKcb.findIndex((dt) => dt.id === item);
        if (index === -1) return;
        return listDoiTuongKcb[index].ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="khoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaId || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...listAllKhoa]}
              placeholder="Chọn khoa"
              onChange={onSearchInput("khoaId")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "khoaId",
      key: "khoaId",
      render: (item) => {
        const index = listAllKhoa.findIndex((khoa) => khoa.id === item);
        if (index === -1) return;
        return listAllKhoa[index].ten;
      },
    },
  ];

  const handleChangePage = (page) => {
    console.log("p", page);
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size, dataSortColumn, dataSearch });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        if (!checkRole([ROLES["THU_NGAN"].CHI_TIET_PHIEU_THU], roles)) return;
        const { maHoSo, id, nbDotDieuTriId } = record;
        history.push(
          `/thu-ngan/chi-tiet-phieu-thu/${maHoSo}/${id}/${nbDotDieuTriId}`
        );
      },
    };
  };

  return (
    <Main>
      <MainHeaderSearchThuNgan
        titleBack="Quay lại [ESC]"
        backLink="/thu-ngan"
        icon={IconArrowRight}
        layerId={refLayerHotKey.current}
      />
      <div className="content">
        <div className="title">Danh sách phiếu thu</div>
        <PhieuThuHeader layerId={refLayerHotKey.current} />
        <TableWrapper
          style={{ background: "#f4f5f7" }}
          rowClassName={(record, index) => {
            return index == state.currentIndex
              ? "row-selected row-id-" + record.id
              : "row-id-" + record.id;
          }}
          scroll={{ y: 500, x: 1500 }}
          columns={columns}
          dataSource={listData}
          onRow={onRow}
        ></TableWrapper>
        {totalElements && (
          <Pagination
            onChange={handleChangePage}
            current={page + 1}
            pageSize={size}
            listData={listData}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        )}
      </div>
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    danhSachPhieuThu: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSortColumn,
    },
    utils: { listdoiTuong = [], listDoiTuongKcb = [] },
    khoa: { listAllKhoa = [] },
    auth: { auth },
  } = state;
  return {
    listData,
    listdoiTuong,
    listDoiTuongKcb,
    listAllKhoa,
    totalElements,
    page,
    size,
    dataSearch,
    dataSortColumn,
    auth,
  };
};

const mapDispatchToProps = ({
  danhSachPhieuThu: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  khoa: { getListAllKhoa },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  getUtils,
  getListAllKhoa,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachPhieuThu);
