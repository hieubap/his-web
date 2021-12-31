import React, { memo, useState, useEffect, useMemo, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { Input, Checkbox, Row } from "antd";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { ROLES } from "constants";
// import Header from "components/Header";
import Table from "components/Table";
import { Main, InputSearch, Header, SelectStyled } from "./styled";
import Select from "components/Select";
import { checkRole } from "app/Sidebar/constant";
import useWindowSize from "hook/useWindowSize";
import { ModalNotification2 } from "components/ModalConfirm";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import moment from "moment";
const DanhSach = (props) => {
  const {
    getListPhieuNhapXuatChiTiet,
    listPhieuNhapChiTiet
  } = props

  const cachXem = useSelector((state) => state.danhSachDichVuKhoChiTiet.cachXem);
  const page = useSelector((state) => state.danhSachDichVuKhoChiTiet.page);
  const size = useSelector((state) => state.danhSachDichVuKhoChiTiet.size);
  const totalElements = useSelector((state) => state.danhSachDichVuKhoChiTiet.totalElements);
  const listDanhSachDichVuKhoChiTiet = useSelector((state) => state.danhSachDichVuKhoChiTiet.listDanhSachDichVuKhoChiTiet);
  const { dataSortColumn } = useSelector(state => state.danhSachDichVuKhoChiTiet)

  const onSizeChange = useDispatch().danhSachDichVuKhoChiTiet.onSizeChange;
  const getListDanhSachDichVuKhoChiTiet = useDispatch().danhSachDichVuKhoChiTiet.getListDanhSachDichVuKhoChiTiet;
  const updateData = useDispatch().danhSachDichVuKhoChiTiet.updateData;
  const { onSortChange } = useDispatch().danhSachDichVuKhoChiTiet
  const { getUtils } = useDispatch().utils

  useEffect(() => {
    getListPhieuNhapXuatChiTiet({ khoId: props?.match?.params?.khoId, dichVuId: props?.match?.params?.dichVuId, nhapKho: true, trangThai: 30 })
  }, [])
  const sizeWinDow = useWindowSize();
  const onRow = (record, index) => {
    return {
     onClick: (event) => {
        // onShowAndHandleUpdate(record);
      },
    };
  };
  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  return (
    <Main className="main">
      <Header >
        <div className="header">
          <Row className="header-row">
            <Row>
              <div className="content">Lịch sử nhập xuất</div>
              <div className="content-note">
                <SelectStyled>
                  <Select
                    // onChange={onChangeGroupService}
                    // value={state.loaiDichVu}
                    placeholder={"Danh sách nhập"}
                  // data={dataloaiDichVu}
                  />
                </SelectStyled>
              </div>
            </Row>
            {/* {isThemMoi && <div>
              <Checkbox
              // checked={state.detachLine}
              // onChange={(e) => {
              //   setState({ ...state, detachLine: e.target.checked });
              // }}
              >
                Tách dòng
              </Checkbox>
              <img style={{ marginLeft: 6 }} src={require("assets/images/kho/info.png")} alt=""></img>
            </div>} */}
          </Row>
        </div>
      </Header>
      <Table
        className="table"
        scroll={{ y: 453 }}
        rowKey={"key"}
        onRow={onRow}
        rowClassName={(record) => (record?.checked ? "background-checked" : "")}
        columns={[
          {
            title: (
              <HeaderSearch
                title="STT"
              />
            ),
            width: "5%",
            dataIndex: "index",
            key: "index",
            hideSearch: true,
            align: "center",
          },
          {
            title: (
              <HeaderSearch
                title="Số lượng"
                sort_key="soLuong"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["soLuong"] || ""}
              />
            ),
            width: "7%",
            dataIndex: "soLuong",
            key: "soLuong",
            type: true,
            hideSearch: true,
            align: "right"
            // render: (item) => {
            //   return (
            //     <>
            //       <div style={{ color: "#0762F7", fontWeight: "bold" }}>{item}</div>
            //       <div>Ghi chú</div>
            //     </>
            //   );
            // },
          },
          {
            title: (
              <HeaderSearch
                title="ĐVT"
                sort_key="tenDonViTinh"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["tenDonViTinh"] || ""}
              />
            ),
            width: "7%",
            dataIndex: "tenDonViTinh",
            key: "tenDonViTinh",
            hideSearch: true,
          },
          {
            title: (
              <HeaderSearch
                title="Hạn sử dụng"
                sort_key="ngayHanSuDung"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["ngayHanSuDung"] || ""}
              />
            ),
            render: (item) => {
              return item?.toDateObject()?.format("dd/MM/YYYY")
            },
            width: "7%",
            dataIndex: "ngayHanSuDung",
            key: "ngayHanSuDung",
            hideSearch: true,
          },
          {
            title: (
              <HeaderSearch
                title="Số lô"
                sort_key="soLo"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["soLo"] || ""}
              />
            ),
            width: "15%",
            dataIndex: "soLo",
            hideSearch: true,
            key: "soLo",
            // render: (item) => {
            //   return (
            //     <>
            //       <div>{item.formatPrice()}</div>
            //     </>
            //   );
            // },
          },
          {
            title: (
              <HeaderSearch
                title="Số phiếu"
                sort_key="soPhieu"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["soPhieu"] || ""}
              />
            ),
            align: "right",
            width: "7%",
            dataIndex: "soPhieu",
            hideSearch: true,
            key: "soPhieu",
            // render: (item) => {
            //   return (
            //     <>
            //       <div>{item.formatPrice()}</div>
            //     </>
            //   );
            // },
          },
          {
            title: (
              <HeaderSearch
                title="Hình thức nhập"
                sort_key="tenHinhThucNhapXuat"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["tenHinhThucNhapXuat"] || ""}
              />
            ),
            width: "15%",
            dataIndex: "tenHinhThucNhapXuat",
            hideSearch: true,
            key: "tenHinhThucNhapXuat",
            // render: (item) => {
            //   return (
            //     <>
            //       <div>{item.formatPrice()}</div>
            //     </>
            //   );
            // },
          },
          {
            title: (
              <HeaderSearch
                title="Quyết định thầu"
                sort_key="quyetDinhThau"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["quyetDinhThau"] || ""}
              />
            ),
            width: "15%",
            dataIndex: "quyetDinhThau",
            hideSearch: true,
            key: "quyetDinhThau",
            // render: (item) => {
            //   return (
            //     <>
            //       <div>{item.formatPrice()}</div>
            //     </>
            //   );
            // },
          },
          {
            title: (
              <HeaderSearch
                title="Ngày duyệt"
                sort_key="thoiGianDuyet"
                onClickSort={onClickSort}
                dataSort={dataSortColumn["thoiGianDuyet"] || ""}
              />
            ),
            width: "15%",
            dataIndex: "thoiGianDuyet",
            hideSearch: true,
            key: "thoiGianDuyet",
            render: (item) => {
              return (
                <>
                  <div>{item && moment(item).format("DD/MM/YYYY")}</div>
                </>
              );
            },
          },
        ]}
        dataSource={listPhieuNhapChiTiet}
      // dataSource={[
      //   {
      //     key: '1',
      //     stt: "123",
      //     soLuong: 123,
      //     dvt: "hộp",
      //     hanSuDung: 200,
      //     soLo: 11,
      //   },
      // ]}
      ></Table>
      {/* <ModalNotification2 ref={refModalNotification} /> */}
    </Main>
  );
};
const mapStateToProps = ({
  danhSachDichVuKhoChiTiet: { listPhieuNhapChiTiet }
}) => ({
  listPhieuNhapChiTiet
});

const mapDispatchToProps = (
  {
    danhSachDichVuKhoChiTiet: { getListPhieuNhapXuatChiTiet }
  }
) => ({
  getListPhieuNhapXuatChiTiet
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(compose(withConnect, memo)(DanhSach));
