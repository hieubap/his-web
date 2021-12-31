import { Input } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import { checkRole } from "app/Sidebar/constant";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import { ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import { HIEU_LUC } from "constants/index";

let timer = null;

const DsMauKetQua = (props) => {
  const {
    handleChangeshowTable,
    handleCollapsePane,
    showFullTable,
    collapseStatus,
  } = props;

  const {
    mauKetQuaCDHA: { totalElements, page, size, listData, dataSortColumn, currentItem },
  } = useSelector((state) => state);
  const {
    mauKetQuaCDHA: {
      onSizeChange,
      onSearch,
      onSortChange,
      onChangeInputSearch,
      updateData,
    },
  } = useDispatch();

  useEffect(() => {
    onSizeChange(10);
  }, []);

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
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      key: "index",
      width: 60,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã"
          dataSort={dataSortColumn["ma"] || 0}
          sort_key="ma"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      dataIndex: "ma",
      key: "ma",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Tên mẫu"
          dataSort={dataSortColumn["ten"] || 0}
          sort_key="ten"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: 200,
    },
    {
      title: (
        <HeaderSearch
          title="Kết quả"
          dataSort={dataSortColumn["ketQua"] || 0}
          sort_key="ketQua"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("ketQua")}
            />
          }
        />
      ),
      dataIndex: "ketQua",
      key: "ketQua",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Kết luận"
          dataSort={dataSortColumn["ketLuan"] || 0}
          sort_key="ketLuan"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("ketLuan")}
            />
          }
        />
      ),
      dataIndex: "ketLuan",
      key: "ketLuan",
      width: 250,
    },
    {
      title: (
        <HeaderSearch
          title="Cách thức can thiệp"
          dataSort={dataSortColumn["cachThucCanThiep"] || 0}
          sort_key="cachThucCanThiep"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("cachThucCanThiep")}
            />
          }
        />
      ),
      key: "cachThucCanThiep",
      dataIndex: "cachThucCanThiep",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Phương thức can thiệp"
          dataSort={dataSortColumn["phuongThucCanThiep"] || 0}
          sort_key="phuongThucCanThiep"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("phuongThucCanThiep")}
            />
          }
        />
      ),
      dataIndex: "phuongThucCanThiep",
      key: "phuongThucCanThiep",
      width: 200,
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      dataIndex: "dsDichVu",
      key: "dsDichVu",
      align: "left",
      width: 150,
      render: (item) => {
        let list = item?.map((x) => x.ten);
        return list.join(",");
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
  const onRow = (record) => {
    return {
      onClick: () => {
        updateData({ currentItem: record });
      },
    };
  };
  const handleClickedBtnAdded = () => {
    updateData({ currentItem: null });
  };
  const setRowClassName = (record) => {
    let idDiff = currentItem?.id;
    return record.id === idDiff ? "row-actived" : "";
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  return (
    <Main>
      <TableWrapper
        title="Danh mục mẫu kết quả CĐHA - TDCN"
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
        buttonHeader={
          checkRole([ROLES["THIET_LAP"].KIOSK_THEM])
            ? [
                {
                  title: "Thêm mới",
                  onClick: handleClickedBtnAdded,
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
                    <Icon
                      component={collapseStatus ? extendTable : extendChiTiet}
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
            : [
                {
                  className: "btn-change-full-table",
                  title: <Icon component={showFullTable ? thuNho : showFull} />,
                  onClick: handleChangeshowTable,
                },
                {
                  className: "btn-collapse",
                  title: (
                    <Icon
                      component={collapseStatus ? extendTable : extendChiTiet}
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
        }
        columns={columns}
        dataSource={listData}
        onRow={onRow}
        rowKey={(record) => record.id}
        rowClassName={setRowClassName}
      ></TableWrapper>

      <div className="content">
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listData}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{
            flex: 1,
            paddingBottom: "5px",
            marginTop: "5px",
            justifyContent: "flex-start",
          }}
        />
      </div>
    </Main>
  );
};

export default DsMauKetQua;
