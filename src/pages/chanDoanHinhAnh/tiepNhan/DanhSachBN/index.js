import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Checkbox, Popover, Row } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { TRANG_THAI_CDHA } from "constants/index";
import IconDropDown from "assets/images/xetNghiem/icDropDown.png";
import "./style.css";
import { Main, ContentTable } from "./styled";

let timer = null;

const DanhSachBN = ({ layerId }) => {
  const refMaHoSo = useRef(null);
  const { listData, totalElements, page, size, dataSortColumn } = useSelector(
    (state) => state.dsBenhNhan
  );
  const { nbDotDieuTriId } = useSelector((state) => state.choTiepDonDV);
  const {
    dsBenhNhan: { onSizeChange, onChangeInputSearch, onSortChange, onSearch },
    choTiepDonDV: {
      updateData: updateDataChoTiepDon,
      onChangeInputSearch: onChangeInputSearchDv,
    },
    phimTat: { onRegisterHotkey },
  } = useDispatch();
  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 113, //F2
          onEvent: () => {
            refMaHoSo.current && refMaHoSo.current.focus();
          },
        },
      ],
    });
  }, []);
  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );

  const content = () => (
    <Checkbox.Group
      options={TRANG_THAI_CDHA}
      defaultValue={[25]}
      onChange={onSearchInput("dsTrangThai")}
    />
  );
  useEffect(() => {
    onSizeChange(10);
  }, []);

  // useEffect(() => {
  //   setState({
  //     data: listData,
  //   });
  // }, [listData, page, size]);

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;

    if (key === "dsTrangThai") {
      if (!value.length) {
        value = paramCheck
          ? TRANG_THAI_CDHA.reduce((arr, cur) => [...arr, cur.value], [])
          : 15;
      }
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);

    if (key === "dsTrangThai") {
      if (value.includes(25)) {
        value = [...value, 35, 43];
      }
      if (nbDotDieuTriId) {
        onChangeInputSearchDv({ dsTrangThai: value }, paramCheck);
      } else {
        updateDataChoTiepDon({ dsTrangThai: value });
      }
    }
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const renderHeaderRight = () => {
    if (paramCheck) {
      return (
        <Popover content={content} placement="bottomRight">
          <img src={IconDropDown} alt="IconDropDown" />
        </Popover>
      );
    }
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã HS"
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              ref={refMaHoSo}
              placeholder="Nhập mã hồ sơ"
              onChange={onSearchInput("maHoSo")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title="Tên người bệnh"
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập tên người bệnh"
              onChange={onSearchInput("tenNb")}
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
  ];

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        updateDataChoTiepDon({
          nbDotDieuTriId: id,
        });
      },
    };
  };

  const setRowClassName = (record) => {
    let idDiff;
    idDiff = nbDotDieuTriId;
    return record.id === idDiff ? "row-actived" : "";
  };

  return (
    <Main>
      <Row className="header-table">
        <div className="header-table__left">Danh sách người bệnh</div>
        <div className="header-table__right">{renderHeaderRight()}</div>
      </Row>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={listData}
          onRow={onRow}
          rowKey={(record) => `${record.id}-${record.tenNb}`}
          rowClassName={setRowClassName}
        />
        {!!totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={listData}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            stylePagination={{ flex: 1, justifyContent: "flex-start" }}
          />
        ) : null}
      </ContentTable>
    </Main>
  );
};

export default DanhSachBN;
