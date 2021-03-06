import { Button, Checkbox } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import IcCreate from "assets/images/kho/IcCreate.png";
import { Pagination } from "components";
import { connect, useDispatch } from "react-redux";
import IconDelete from "assets/images/khamBenh/delete.png";
import Select from "components/Select";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
const DanhSach = (props) => {
  const {
    onSearch,
    listData,
    onSizeChange,
    onSortChange,
    totalElements,
    page,
    size,
    updateData,
    getUtils,
    listLoaiPhongHangDoi,
    deleteData,
    onChangeInputSearch,
    handleChangeshowTable,
    handleCollapsePane,
    showFullTable,
    collapseStatus,

    layerId,
  } = props;
  const [dataEdit, setDataEdit] = useState({});
  // const refClickBtnAdd = useRef();
  // const refSelectRow = useRef();
  // const refAutoFocus = useRef(null);
  // const { onRegisterHotkey } = useDispatch().phimTat;

  // // register layerId
  // useEffect(() => {
  //   onRegisterHotkey({
  //     layerId,
  //     hotKeys: [
  //       {
  //         keyCode: 112, //F1
  //         onEvent: () => {
  //           refClickBtnAdd.current && refClickBtnAdd.current();
  //         },
  //       },
  //       {
  //         keyCode: 38, //up
  //         onEvent: (e) => {
  //           refSelectRow.current && refSelectRow.current(-1);
  //         },
  //       },
  //       {
  //         keyCode: 40, //down
  //         onEvent: (e) => {
  //           refSelectRow.current && refSelectRow.current(1);
  //         },
  //       },
  //     ],
  //   });
  // }, []);

  // refSelectRow.current = (index) => {
  //   const indexNextItem =
  //     (listData?.findIndex((item) => item.id === dataEdit?.id) || 0) +
  //     index;
  //   if (-1 < indexNextItem && indexNextItem < listData.length) {
  //     updateData({ currentItem: listData[indexNextItem] });
  //     setDataEdit(listData[indexNextItem]);
  //     document
  //       .getElementsByClassName("row-id-" + listData[indexNextItem]?.id)[0]
  //       .scrollIntoView({ block: "end", behavior: "smooth" });
  //   }
  // };

  useEffect(() => {
    onSizeChange(10);
  }, []);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onDelete = (e) => {
    deleteData(e).then(() => {
      onSearch({});
    });
  };

  const onSearchInput = (key) => (value) => {
    onChangeInputSearch({ [key]: value });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 30,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i ph??ng"
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listLoaiPhongHangDoi]}
              placeholder="Ch???n lo???i ph??ng"
              onChange={onSearchInput("loaiPhong")}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "loaiPhong",
      key: "loaiPhong",
      align: "left",
      render: (item) => {
        return listLoaiPhongHangDoi.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL NB t???i ??a ??
      ??ang kh??m/th???c hi???n"
        />
      ),
      width: 70,
      dataIndex: "slDangThucHien",
      key: "slDangThucHien",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="SL NB t???i ??a
      ?? ti???p theo"
        />
      ),
      width: 70,
      dataIndex: "slTiepTheo",
      key: "slTiepTheo",
      align: "right",
    },
    {
      title: <HeaderSearch title="Ti???n ??ch" />,
      width: 70,
      dataIndex: "",
      key: "",
      align: "center",
      render: (item, data) => {
        return (
          <img src={IconDelete} alt="..." onClick={() => onDelete(data.id)} />
        );
      },
    },
  ];

  const onRow = (record = {}) => {
    return {
      onClick: (event) => {
        updateData({ currentItem: record });
        setDataEdit(record);
      },
    };
  };

  const onClickedBtnAdded = () => {
    updateData({
      currentItem: {},
    });
  };
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
  return (
    <Main>
      {/* <div className="header">
        <span className="title">
          Thi???t l???p th??ng s??? h??ng ch??? theo lo???i ph??ng
        </span>
        <Button className="btn-new" onClick={onClickedBtnAdded}>
          <span>Th??m m???i</span>
          <img src={IcCreate} />
        </Button>
      </div> */}
      <TableWrapper
        title=" Thi???t l???p th??ng s??? h??ng ch??? theo lo???i ph??ng"
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
            type: "create",
            title: "Th??m m???i [F1]",
            onClick: onClickedBtnAdded,
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
        dataSource={listData}
        onRow={onRow}
        rowKey={(record) => record.id}
        layerId={layerId}
        dataEditDefault={dataEdit}
        // rowClassName={setRowClassName}
      ></TableWrapper>
      {totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listData}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    thietLapHangDoi: {
      listData,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
  } = state;

  return {
    listData,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  thietLapHangDoi: {
    onSearch,
    createOrEdit,
    onDelete,
    updateData,
    onSizeChange,
    deleteData,
    onChangeInputSearch,
  },
}) => ({
  onSearch,
  createOrEdit,
  onDelete,
  updateData,
  onSizeChange,
  deleteData,
  onChangeInputSearch,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
