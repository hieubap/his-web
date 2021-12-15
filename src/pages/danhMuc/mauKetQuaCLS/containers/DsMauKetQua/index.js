import { Button, DatePicker, Dropdown, Input, Menu, Select, Table } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import empty from "assets/images/kho/empty.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useRef, useState } from "react";
// import InputSearch from "../../../components/InputSearch";
// import { trangThaiDV } from "../../constant";
import AddIcon from "assets/svg/chuanDoanHinhAnh/add.svg";
import { Main } from "./styled";
import { checkRole } from "app/Sidebar/constant";
import { searchString } from "utils";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import { ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
const { Option } = Select;

const DsMauKetQua = (props) => {
  const [state, setState] = useState({});
  const handleSort = () => {};
  const refSearch = useRef(null);
  const {
    handleChangeshowTable,
    handleCollapsePane,
    showFullTable,
    collapseStatus,
  } = props;
  const [dataEdit, setDataEdit] = useState({});
  // TODO: data test tính năng search bỏ khi ghép api
  const [dataSearch, setDataSearch] = useState([
    { ten: "Phòng 1", id: 1, checked: true },
    { ten: "Phòng phẫu thuật", id: 2 },
    { ten: "Phòng bảo vệ", id: 3 },
    { ten: "Phòng nghỉ dưỡng", id: 4 },
    { ten: "Phòng hồi sức", id: 5, checked: true },
    { ten: "Phòng cứu thương", id: 6, checked: true },
    { ten: "Phòng cấp cứu", id: 7 },
    { ten: "Phòng 8", id: 8 },
    { ten: "Phòng 9", id: 9 },
  ]);

  // TODO: data test tính năng search bỏ đi khi ghép api
  const maNBTest = [
    { ten: "123456", id: 1 },
    { ten: "456789", id: 2 },
    { ten: "789123", id: 3 },
    { ten: "456123", id: 4 },
  ];

  // TODO: data test bỏ khi ghép api
  const [data, setData] = useState([
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: true,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: false,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: true,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: false,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: true,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: false,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: true,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: false,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: true,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: true,
    },
    {
      ma: "202105280004",
      tenMau: "Mẫu KQ5464654-5461",
      kyThuat: "Kỹ thuật A",
      moTa: "mô tả mẫu",
      ketLuan: "Kết luận về mẫu",
      khuyenNghi: "nội dung khuyến nghị",
      tenDichVuCLS: "Dịch vụ ABCD",
      user: "Ngô Quang Hiếu",
      hieuLuc: true,
    },
  ]);

  const onCheck = (value, index) => {
    const newData = Object.assign([], data);
    newData[index].hieuLuc = value;
    setData(newData);
  };
  const columns = [
    {
      title: (
        <HeaderSearch
          title="STT"
          dataSort={state.sortKey === "stt" ? state.sortValue : 0}
          sort_key="stt"
          onClickSort={handleSort("stt")}
          noSearch={true}
        />
      ),
      key: "stt",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Mã"
          dataSort={state.sortKey === "ma" ? state.sortValue : 0}
          sort_key="ma"
          search={
            <Input
              placeholder="Tìm kiếm"
              // onChange={(e) => {
              //   onSearchInput(e.target.value, "ten");
              // }}
            />
          }
          // onClickSort={handleSort("ma", "ten")}
        />
      ),
      dataIndex: "ma",
      key: "ma",
      width: 150,
      // render: (item) =>
      //   item && (
      //     <div style={{ display: "flex", alignItems: "center" }}>
      //       {trangThaiDV[item - 1].icon}
      //       <span style={{ marginLeft: "5px" }}>
      //         {trangThaiDV[item - 1].ten}
      //       </span>
      //     </div>
      //   ),
    },
    {
      title: (
        <HeaderSearch
          title="Tên mẫu"
          dataSort={state.sortKey === "tenMau" ? state.sortValue : 0}
          sort_key="tenMau"
          onClickSort={handleSort("tenMau", "tenDonViTinh")}
          search={
            <Input
              placeholder="Tìm kiếm"
              // onChange={(e) => {
              //   onSearchInput(e.target.value, "ten");
              // }}
            />
          }
        />
      ),
      dataIndex: "tenMau",
      key: "tenMau",
      width: 200,
    },
    {
      title: (
        <HeaderSearch
          title="Kết quả"
          dataSort={state.sortKey === "kyThuat" ? state.sortValue : 0}
          sort_key="kyThuat"
          onClickSort={handleSort("kyThuat", "hamLuong")}
          search={
            <Input
              placeholder="Tìm kiếm"
              // onChange={(e) => {
              //   onSearchInput(e.target.value, "ten");
              // }}
            />
          }
        />
      ),
      dataIndex: "kyThuat",
      key: "kyThuat",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Kết luận"
          dataSort={state.sortKey === "moTa" ? state.sortValue : 0}
          sort_key="moTa"
          onClickSort={handleSort("moTa")}
          search={
            <Input
              placeholder="Tìm kiếm"
              // onChange={(e) => {
              //   onSearchInput(e.target.value, "ten");
              // }}
            />
          }
        />
      ),
      dataIndex: "moTa",
      key: "moTa",
      width: 250,
    },
    {
      title: (
        <HeaderSearch
          title="Cách thức can thiệp"
          dataSort={state.sortKey === "ketLuan" ? state.sortValue : 0}
          sort_key="ketLuan"
          onClickSort={handleSort("ketLuan")}
          search={
            <Input
              placeholder="Tìm kiếm"
              // onChange={(e) => {
              //   onSearchInput(e.target.value, "ten");
              // }}
            />
          }
        />
      ),
      key: "ketLuan",
      dataIndex: "ketLuan",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Phương thức can thiệp"
          dataSort={state.sortKey === "khuyenNghi" ? state.sortValue : 0}
          sort_key="khuyenNghi"
          onClickSort={handleSort("khuyenNghi", "soLo")}
          search={
            <Input
              placeholder="Tìm kiếm"
              // onChange={(e) => {
              //   onSearchInput(e.target.value, "ten");
              // }}
            />
          }
        />
      ),
      dataIndex: "khuyenNghi",
      key: "khuyenNghi",
      width: 200,
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ CLS"
          dataSort={state.sortKey === "tenDichVuCLS" ? state.sortValue : 0}
          sort_key="tenDichVuCLS"
          search={
            <Input
              placeholder="Tìm kiếm"
              // onChange={(e) => {
              //   onSearchInput(e.target.value, "ten");
              // }}
            />
          }
          // onClickSort={handleSort("loNhap", "tenDichVuCLS")}
        />
      ),
      dataIndex: "tenDichVuCLS",
      key: "tenDichVuCLS",
      align: "right",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="User"
          dataSort={state.sortKey === "user" ? state.sortValue : 0}
          sort_key="user"
          search={
            <Input
              placeholder="Tìm kiếm"
              // onChange={(e) => {
              //   onSearchInput(e.target.value, "ten");
              // }}
            />
          }
          // onClickSort={handleSort("user", "user")}
        />
      ),
      dataIndex: "user",
      key: "user",
      align: "right",
      width: 170,
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          dataSort={state.sortKey === "hieuLuc" ? state.sortValue : 0}
          sort_key="hieuLuc"
          noSearch={true}
          // onClickSort={handleSort("loNhap", "ngayHanSuDung")}
        />
      ),
      dataIndex: "hieuLuc",
      key: "hieuLuc",
      width: 120,
      align: "center",
      render: (item, _, index) => (
        <Checkbox
          checked={item}
          onChange={(e) => onCheck(e.target.checked, index)}
        />
      ),
    },
  ];
  const onRow = (record) => {
    return {
      onClick: (event) => {
        setDataEdit(record);
      },
    };
  };
  const handleClickedBtnAdded = () => {
    // form.resetFields();
    // updateData({ currentItem: null });
    // setStateParent({
    //   editStatus: false,
    // });
  };
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
  return (
    <Main>
      <TableWrapper
        title="Danh mục mẫu kết quả CLS"
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
        dataSource={data}
        onRow={onRow}
        rowKey={(record) => record.id}
        rowClassName={setRowClassName}
      ></TableWrapper>

      <div className="content">
        <Pagination
          current={1}
          listData={data}
          total={200}
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
