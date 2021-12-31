import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import {
  LOAI_KET_QUA,
  CHON_KET_QUA,
  BAT_THUONG,
  SERVICE_STATUS,
} from "../../configs";
import Checkbox from "components/Checkbox";
import { Input, InputNumber } from "antd";
let timer = null;
const { TextArea } = Input;

function NhomChiSoCon(props) {
  const { data, form, listphanLoaiKetQuaXetNghiem } = props;

  const [listData, setListData] = useState([]);
  const [listDataSearch, setListDataSearch] = useState([]);
  const [dataSearch, setDataSearch] = useState({});

  useEffect(() => {
    const { dsChiSoCon = [] } = data;
    const listData = dsChiSoCon.map((item, index) => ({
      stt: index + 1,
      ...item,
    }));
    setListData(listData);
    setListDataSearch(listData);
  }, [data]);

  const isDisabled = data?.trangThai !== SERVICE_STATUS.DA_TIEP_NHAN_MAU;
  // const isDisabled = false;
  const onSearchInput = (key) => (e) => {
    let data = [];
    let value = "";
    let dtSearch = {};

    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;

    dtSearch = { ...dataSearch, [key]: value };

    clearTimeout(timer);

    timer = setTimeout(() => {
      listData.forEach((item) => {
        let flag = true;
        Object.keys(dtSearch).forEach((k) => {
          return (flag =
            typeof item[key] === "string"
              ? item[key].search(dtSearch[k]) !== -1
              : !!item[key] === !!dtSearch[k]);
        });

        if (flag) {
          return data.push(item);
        }
      });

      setDataSearch(dtSearch);
      setListDataSearch(data);
    }, 300);
  };

  const showClassByInput = (item) => {
    let strClass = "";
    if(item == 0) {
      strClass="input-center";
    }
    if(item == 10) {
      strClass="input-left";
    }
    if(item == 20 || item == 30) {
      strClass="input-right";
    }
    return strClass;
  };

  const renderKetQua = (key, value, index) => {
    const { loaiKetQua = null, phanLoaiKetQua = null} = data.dsChiSoCon[index];
    if (loaiKetQua === LOAI_KET_QUA.SO) {
      return (
        <InputNumber
          defaultValue={value}
          className={showClassByInput(phanLoaiKetQua)}
          onChange={handleChangeRow(key, value, index)}
        />
      );
    } else if (loaiKetQua === LOAI_KET_QUA.CHON_GIA_TRI) {
      return (
        <Select
          defaultValue={value}
          className={showClassByInput(phanLoaiKetQua)}
          data={CHON_KET_QUA}
          onChange={handleChangeRow(key, value, index)}
        />
      );
    } else {
      return (
        <TextArea
          defaultValue={value}
          onChange={handleChangeRow(key, value, index)}
          className={showClassByInput(phanLoaiKetQua)}
        />
      );
    }
  };

  const handleChangeRow = (key, item, index) => (e) => {
    const value = e?.target ? e.target.value : e;
    listData[index][key] = String(value);
    form.setFieldsValue({ dsChiSoCon: listData });
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
          title="Mã chỉ số"
          // sort_key="maChiSoCon"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn.maChiSoCon || 0}
          search={
            <Input
              placeholder="Tìm mã"
              onChange={onSearchInput("maChiSoCon")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "maChiSoCon",
      key: "maChiSoCon",
    },
    {
      title: (
        <HeaderSearch
          title="Tên chỉ số"
          // sort_key="tenChiSoCon"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn.tenChiSoCon || 0}
          search={
            <Input
              placeholder="Tìm tên"
              onChange={onSearchInput("tenChiSoCon")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "tenChiSoCon",
      key: "tenChiSoCon",
    },
    {
      title: (
        <HeaderSearch
          title="Kết quả"
          // sort_key="ketQua"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn.ketQua || 0}
          search={
            <Input
              placeholder="Tìm kết quả"
              onChange={onSearchInput("ketQua")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "ketQua",
      key: "ketQua",
      render: (item, record, index) => {
        if (isDisabled) {
          return item;
        }
        return renderKetQua("ketQua", item, index);
      },
    },
    {
      title: (
        <HeaderSearch
          title="Chỉ số cao"
          // sort_key="chiSoCao"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn.chiSoCao || 0}
          search={
            <Input
              placeholder="Tìm chỉ số cao"
              onChange={onSearchInput("chiSoCao")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "chiSoCao",
      key: "chiSoCao",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Chỉ số thấp"
          // sort_key="chiSoThap"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn.chiSoThap || 0}
          search={
            <Input
              placeholder="Tìm chỉ số thấp"
              onChange={onSearchInput("chiSoThap")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "chiSoThap",
      key: "chiSoThap",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Đơn vị"
          // sort_key="donVi"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn.donVi || 0}
          search={
            <Input placeholder="Tìm đơn vị" onChange={onSearchInput("donVi")} />
          }
        />
      ),
      width: 180,
      dataIndex: "donVi",
      key: "donVi",
    },
    {
      title: (
        <HeaderSearch
          title="Đánh giá kết quả"
          // sort_key="batThuong"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn.batThuong || 0}
          searchSelect={
            <Select
              data={listphanLoaiKetQuaXetNghiem}
              defaultValue={null}
              placeholder="Chọn đánh giá kết quả"
              onChange={onSearchInput("phanLoaiKetQua")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "phanLoaiKetQua",
      key: "phanLoaiKetQua",
      render: (item) => {
        return listphanLoaiKetQuaXetNghiem.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="Kết luận" />,
      width: 180,
      dataIndex: "ketLuan",
      key: "ketLuan",
      render: (item, record, index) => {
        if (isDisabled) {
          return item;
        }
        return (
          <TextArea
            defaultValue={item}
            placeholder="Nhập kết luận"
            onChange={handleChangeRow("ketLuan", item, index)}
          />
        );
      },
    },
  ];

  // const rowSelection = {
  //   columnTitle: <HeaderSearch title={<Checkbox />} />,
  //   columnWidth: 50,
  //   onChange: () => {},
  //   selectedRowKeys: [],
  // };

  return (
    <Main>
      <div className="table-title">Chỉ số con</div>
      <TableWrapper
        columns={columns}
        scroll={{ y: 530 }}
        dataSource={listDataSearch}
        // rowSelection={rowSelection}
      />
    </Main>
  );
}

export default NhomChiSoCon;
