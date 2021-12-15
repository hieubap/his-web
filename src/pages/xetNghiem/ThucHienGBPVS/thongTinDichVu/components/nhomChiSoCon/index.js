import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { BAT_THUONG, CHON_KET_QUA } from "../../../../configs";
import Checkbox from "components/Checkbox";
import { Input } from "antd";
import { TRANG_THAI, LOAI_KET_QUA } from "pages/xetNghiem/configs";
import { connect } from "react-redux";

let timer = null;
// const { TextArea } = Input;

function NhomChiSoCon(props) {
  const {
    infoDichVu: { dsChiSoCon, trangThai },
    getUtils,
    listKetQuaXetNghiem,
    showInfo,
    listphanLoaiKetQuaXetNghiem,
  } = props;
  const [listData, setListData] = useState([]);
  const [listDataSearch, setListDataSearch] = useState([]);
  const [dataSearch, setDataSearch] = useState({});
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  useEffect(() => {
    const data = (dsChiSoCon || []).map((item, index) => ({
      stt: index + 1,
      ...item,
    }));
    setListData(data);
    setListDataSearch(data);
  }, [dsChiSoCon]);

  useEffect(() => {
    getUtils({ name: "KetQuaXetNghiem" });
  }, []);

  const onSearchInput = (key) => (e) => {
    let data = [];
    let value = "";
    let dtSearch = {};

    if (e?.target) value = e.target.value;
    else value = e;

    dtSearch = { ...dataSearch, [key]: value };

    clearTimeout(timer);

    timer = setTimeout(() => {
      listData.forEach((item) => {
        let flag = true;
        Object.keys(dtSearch).forEach((k) => {
          return (flag = e?.target
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

  const onChangeInput = (type, index) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else {
      value = e ? String(e) : "";
    }
    if (listDataSearch) listDataSearch[index][type] = value;
    showInfo(listDataSearch);
  };

  const renderContent = (type) => (value, record, index) => {
    const isEdittable = TRANG_THAI["XAC_NHAN_KET_QUA"].includes(trangThai);
    switch (record.loaiKetQua) {
      case LOAI_KET_QUA.SO:
        return isEdittable ? (
          <Input
            defaultValue={value}
            type="number"
            onChange={onChangeInput(type, index)}
            className={showClassByInput(record?.phanLoaiKetQua)}
          />
        ) : (
          value
        );
      case LOAI_KET_QUA.CHON_GIA_TRI:
        return isEdittable ? (
          <Select
            defaultValue={value ? parseInt(value) : ""}
            onChange={onChangeInput(type, index)}
            className={showClassByInput(record?.phanLoaiKetQua)}
            placeholder={"Chọn kết quả"}
            data={listKetQuaXetNghiem}
            allowClear={false}
          />
        ) : (
          listKetQuaXetNghiem.find((d) => d.id === parseInt(value))?.ten
        );
      default:
        return isEdittable ? (
          <Input
            defaultValue={value}
            onChange={onChangeInput(type, index)}
            className={showClassByInput(record?.phanLoaiKetQua)}
          />
        ) : (
          value
        );
    }
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
      render: renderContent("ketQua"),
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
              placeholder="Chọn dánh giá kết quả"
              onChange={onSearchInput("phanLoaiKetQua")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "phanLoaiKetQua",
      key: "phanLoaiKetQua",
      render: (item, data) => {
        return listphanLoaiKetQuaXetNghiem.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="Kết luận" />,
      width: 180,
      dataIndex: "ketLuan",
      key: "ketLuan",
      render: (item, value, index) => {
        return (
          <Input
            defaultValue={item}
            onChange={onChangeInput("ketLuan", index)}
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
      <TableWrapper
        columns={columns}
        scroll={{ y: 530 }}
        dataSource={listDataSearch}
        // rowSelection={rowSelection}
      />
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    utils: { listKetQuaXetNghiem = [] },
  } = state;
  return {
    listKetQuaXetNghiem,
  };
};

const mapDispatchToProps = ({ utils: { getUtils } }) => ({
  getUtils,
});

export default connect(mapStateToProps, mapDispatchToProps)(NhomChiSoCon);
