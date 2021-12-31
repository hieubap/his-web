import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Input, message } from "antd";
import { Main, TableTitle } from "./styled";
import Select from "components/Select";
import { TRANG_THAI_FILTER } from "pages/xetNghiem/configs";

let timer = null;

const DanhSachDichVu = ({ layerId }) => {
  const refInputMaDv = useRef(null);
  const {
    xnGiaiPhauBenhViSinh: { listServices, nbDotDieuTriId },
    utils: { listtrangThaiDichVu = [] },
    nbXetNghiem: { listData: listNb },
  } = useSelector((state) => state);
  const {
    xnGiaiPhauBenhViSinh: { getTongHopDichVuXN, updateData },
    utils: { getUtils },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  useEffect(() => {
    updateData({ dsTrangThai: [66] });
    getUtils({ name: "trangThaiDichVu" });
  }, []);

  useEffect(() => {
    updateData({ nbDotDieuTriId: null });
  }, [listNb]);
  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refInputMaDv.current && refInputMaDv.current.focus();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (nbDotDieuTriId)
      getTongHopDichVuXN({
        page: 0,
        size: 1000,
        nbDotDieuTriId,
        dataSortColumnDSDV: { maDichVu: 1 },
      }).then((s) => {
        if (s.length <= 0) {
          message.error(`Không tồn tại dịch vụ người bệnh`);
        }
      });
  }, [nbDotDieuTriId]);

  const [dataSortColumn, setDataSortColumn] = useState({});
  const [dataSearch, setDataSearch] = useState({});

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };

    getTongHopDichVuXN({
      page: 0,
      size: 1000,
      dataSortColumnDSDV: sort,
      dataSearchDSDV: dataSearch,
    });
    setDataSortColumn(sort);
  };
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const search = { ...dataSearch, [key]: value };
      getTongHopDichVuXN({
        page: 0,
        size: 1000,
        dataSortColumnDSDV: dataSortColumn,
        dataSearchDSDV: search,
        nbDotDieuTriId,
      });
      setDataSearch(search);
    }, 300);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 50,
      dataIndex: "stt",
      key: "stt",
      render: (item, row, index) => {
        return index + 1;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã DV"
          sort_key="maDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maDichVu || 0}
          search={
            <Input
              ref={refInputMaDv}
              placeholder="Tìm mã DV"
              onChange={onSearchInput("maDichVu")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "maDichVu",
      key: "maDichVu",
    },
    {
      title: (
        <HeaderSearch
          title="Tên DV"
          sort_key="tenDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenDichVu || 0}
          search={
            <Input
              placeholder="Tìm tên DV"
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.trangThai || 0}
          searchSelect={
            <Select
              data={[
                { id: "", ten: "Tất cả" },
                ...listtrangThaiDichVu.filter((x) =>
                  TRANG_THAI_FILTER.includes(x.id)
                ),
              ]}
              defaultValue=""
              placeholder="Chọn trạng thái"
              onChange={onSearchInput("trangThai")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        const index = listtrangThaiDichVu.findIndex((tt) => tt.id === item);
        if (index === -1) return;

        return listtrangThaiDichVu[index].ten;
      },
    },
  ];

  const handleDoubleClick = (record) => (e) => {
    updateData({ infoDichVu: record });
  };

  const onRow = (record) => {
    return {
      onClick: handleDoubleClick(record),
    };
  };

  return (
    <Main>
      <TableTitle>Danh sách dịch vụ</TableTitle>
      <TableWrapper onRow={onRow} columns={columns} dataSource={listServices} />
    </Main>
  );
};

export default DanhSachDichVu;
