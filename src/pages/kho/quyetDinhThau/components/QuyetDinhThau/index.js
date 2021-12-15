import React, { useEffect, useMemo, useState } from "react";
import { Checkbox, DatePicker, Input, Form, Button } from "antd";
import {
  Pagination,
  HeaderSearch,
  TableWrapper,
  Select,
  CreatedWrapper,
} from "components";
import { PAGE_DEFAULT, HIEU_LUC } from "constants/index";
import { combineSort } from "utils";
import { connect } from "react-redux";
import moment from "moment";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
let timer = null;
const dateFormat = "DD-MM-YYYY";

const QuyetDinhThau = ({
  listQuyetDinhThau,
  searchQuyetDinhThau,
  listNguonNhapKho,
  listLoaiDichVuThuocVatTuHoaChat,
  listloaiThau,
  listAllKhoa,
  listtrangThaiThau,
  dataEditDefault,
  page,
  size,
  total,
  onPageChange,
  onSizeChange,
  onReset,
  updateData,
  dataSearch,
  onEdit,
  dataSort,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,
}) => {
  const onClickSort = (key, value) => {
    const sort = { ...dataSort, [key]: value };
    updateData({ dataSort: sort });
    const res = combineSort(sort);
    searchQuyetDinhThau({
      page: PAGE_DEFAULT,
      size: size,
      sort: res,
      ...dataSearch,
    });
  };

  useEffect(() => {
    const res = combineSort(dataSort);
    searchQuyetDinhThau({ pageThau: page, sizeThau: size, sort: res });
  }, []);

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      searchQuyetDinhThau({
        ...dataSearch,
        page: 0,
        size: size,
        [name]: value,
        sort: combineSort(dataSort),
      });
    }, 300);
  };

  const onRow = (record, index) => ({
    onClick: (event) => {
      onEdit(record.action);
    },
  });

  const data = useMemo(() => {
    return listQuyetDinhThau.map((item, index) => {
      return {
        ...item,
        action: item,
        stt: page * size + index + 1,
      };
    });
  }, [listQuyetDinhThau]);

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Năm"
          sort_key="nam"
          onClickSort={onClickSort}
          dataSort={dataSort.nam || 0}
          search={
            <Input
              placeholder="Tìm năm"
              onChange={(e) => {
                onSearchInput(e.target.value, "nam");
              }}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "nam",
      key: "nam",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSort.quyetDinhThau || 0}
          search={
            <Input
              placeholder="Tìm quyết định thầu"
              onChange={(e) => {
                onSearchInput(e.target.value, "quyetDinhThau");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Gói thầu"
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSort.goiThau || 0}
          search={
            <Input
              placeholder="Tìm gói thầu"
              onChange={(e) => {
                onSearchInput(e.target.value, "goiThau");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "goiThau",
      key: "goiThau",
    },
    {
      title: (
        <HeaderSearch
          title="Loại DV"
          sort_key="loaiDichVu"
          onClickSort={onClickSort}
          dataSort={dataSort.loaiDichVu || 0}
          searchSelect={
            <Select
              placeholder="Tìm loại dịch vụ"
              data={listLoaiDichVuThuocVatTuHoaChat}
              onChange={(e) => {
                onSearchInput(e, "loaiDichVu");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "loaiDichVu",
      key: "loaiDichVu",
      render: (item) => {
        if (item && listLoaiDichVuThuocVatTuHoaChat) {
          const index = listLoaiDichVuThuocVatTuHoaChat.findIndex(
            (e) => e.id === item
          );
          return listLoaiDichVuThuocVatTuHoaChat[index].ten;
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nguồn nhập kho"
          sort_key="nguonNhapKhoId"
          onClickSort={onClickSort}
          dataSort={dataSort.nguonNhapKhoId || 0}
          searchSelect={
            <Select
              placeholder="Tìm nguồn nhập kho"
              data={listNguonNhapKho}
              onChange={(e) => {
                onSearchInput(e, "nguonNhapKhoId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nguonNhapKho",
      key: "nguonNhapKho",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại thầu"
          sort_key="loaiThau"
          onClickSort={onClickSort}
          dataSort={dataSort.loaiThau || 0}
          searchSelect={
            <Select
              placeholder="Tìm loại thầu"
              data={listloaiThau}
              onChange={(e) => {
                onSearchInput(e, "loaiThau");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiThau",
      key: "loaiThau",
      render: (item) => {
        if (item && listloaiThau) {
          const index = listloaiThau.findIndex((e) => e.id === item);
          return listloaiThau[index].ten;
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngày công bố"
          sort_key="ngayCongBo"
          onClickSort={onClickSort}
          dataSort={dataSort.ngayCongBo || 0}
          searchSelect={
            <DatePicker
              format={dateFormat}
              placeholder="Tìm ngày công bố"
              onChange={(e) => {
                onSearchInput(moment(e).format(dateFormat), "ngayCongBo");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ngayCongBo",
      key: "ngayCongBo",
    },
    {
      title: (
        <HeaderSearch
          title="Hiệu lực thầu"
          sort_key="ngayHieuLuc"
          onClickSort={onClickSort}
          dataSort={dataSort.ngayHieuLuc || 0}
          searchSelect={
            <DatePicker
              placeholder="Tìm hiệu lực thầu"
              onChange={(e) => {
                onSearchInput(moment(e).format(dateFormat), "ngayHieuLuc");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ngayHieuLuc",
      key: "ngayHieuLuc",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="khoaId"
          onClickSort={onClickSort}
          dataSort={dataSort.khoaId || 0}
          searchSelect={
            <Select
              placeholder="Tìm khoa"
              data={listAllKhoa}
              onChange={(e) => {
                onSearchInput(e, "khoaId");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "khoa",
      key: "khoa",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSort.trangThai || 0}
          searchSelect={
            <Select
              placeholder="Tìm trạng thái"
              data={listtrangThaiThau}
              onChange={(e) => {
                onSearchInput(e, "trangThai");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        if (item && listtrangThaiThau) {
          const index = listtrangThaiThau.findIndex((e) => e.id === item);
          return listtrangThaiThau[index].ten;
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSort.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={(e) => {
                onSearchInput(e, "active");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  return (
    <div>
      <TableWrapper
        scroll={{ x: 1000 }}
        classNameRow={"custom-header"}
        styleMain={{ marginTop: 0 }}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={[
          {
            title: "Thêm mới",
            onClick: onReset,
            buttonHeaderIcon: (
              <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
            ),
          },
          {
            className: "btn-change-full-table",
            title: <Icon component={showFullTable ? thuNho : showFull} />,
            onClick: handleChangeshowTable,
          },

          {
            className: "btn-collapse",
            title: (
              <Icon component={collapseStatus ? extendTable : extendChiTiet} />
            ),
            onClick: handleCollapsePane,
          },
        ]}
        columns={columns}
        dataSource={data}
        onRow={onRow}
        rowClassName={(record, index) =>
          dataEditDefault?.id === record.id ? "row-edit" : ""
        }
      />
      {total && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          total={total}
          listData={data}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    quyetDinhThau: { listQuyetDinhThau },
    khoa: { listAllKhoa },
    nguonNhapKho: { listData: listNguonNhapKho },
    utils: { listLoaiDichVuThuocVatTuHoaChat, listloaiThau, listtrangThaiThau },
  } = state;

  return {
    listQuyetDinhThau: listQuyetDinhThau || [],
    listAllKhoa,
    listLoaiDichVuThuocVatTuHoaChat,
    listloaiThau,
    listtrangThaiThau,
    listNguonNhapKho,
  };
};
const mapDispatchToProps = ({ quyetDinhThau: { searchQuyetDinhThau } }) => ({
  searchQuyetDinhThau,
});
export default connect(mapStateToProps, mapDispatchToProps)(QuyetDinhThau);
