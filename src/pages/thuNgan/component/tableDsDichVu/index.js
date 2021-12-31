import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Main } from "./styled";
import { groupBy, size } from "lodash";
import Pagination from "components/Pagination";
import Icon from "@ant-design/icons";
import IconCreate from "assets/svg/thuNgan/iconCreate.svg";
import IconDelete from "assets/svg/kho/delete.svg";
import ModalAddDichVu from "../modalAddDv";
const TableDsDichVu = (props) => {
  const {
    dsDichVu,
    totalElements = 10,
    setStateParent = () => {},
    isChiTiet,
  } = props;
  const [state, _setState] = useState({
    listData: [],
    size: 10,
    page: 0,
    dsDichVu: [],
  });
  const refModalAllDichVu = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    const groupPhieu = groupBy(dsDichVu, "soPhieuThu");
    setState({
      dsDichVu,
      groupPhieu,
    });
  }, [dsDichVu]);
  useEffect(() => {
    if (state.dsDichVu?.length) {
      const newData = state.dsDichVu
        .map((item) => ({
          ...item,
          countSophieuThu: state?.groupPhieu[item.soPhieuThu]?.length,
        }))
        .sort((a, b) => a - b);
      setState({
        AllListData: newData,
      });
    }
  }, [state.dsDichVu, state.groupPhieu]);
  useEffect(() => {
    if (state?.AllListData?.length) {
      const dataDefault = [...state.AllListData].slice(0, 10);
      setState({
        listData: dataDefault,
      });
    }
  }, [state.AllListData]);
  const handleSizeChange = (size) => {
    const newData = [...state.AllListData].slice(0, size);
    setState({
      page: 0,
      listData: newData,
      size,
    });
  };
  const handleChangePage = (page) => {
    const newData = [...state.AllListData].slice(
      (page - 1) * state.size,
      (page - 1) * state.size + state.size
    );

    setState({
      page: page - 1,
      listData: newData,
    });
  };
  const handleShowModal = () => {
    if (refModalAllDichVu.current) {
      refModalAllDichVu.current.show({}, ({ newDv }) => {
        const dsDichVu = [...state.dsDichVu, ...newDv];
        const groupPhieu = groupBy(dsDichVu, "soPhieuThu");
        setState({
          dsDichVu: [...state.dsDichVu, ...newDv],
          groupPhieu,
        });
      });
    }
  };
  const handleRemove = (soPhieu) => {
    const newData = state.dsDichVu.filter((item) => item.soPhieuThu != soPhieu);
    const groupPhieu = groupBy(newData, "soPhieuThu");
    setState({
      dsDichVu: newData,
      groupPhieu,
    });
  };
  return (
    <Main>
      <div className="title">
        <span> Danh sách dịch vụ </span>
        {!isChiTiet && (
          <Icon component={IconCreate} onClick={handleShowModal}></Icon>
        )}
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>STT</th>
              <th style={{ width: "400px" }}>Tên dịch vụ</th>
              <th>ĐVT</th>
              <th>SL</th>
              <th>Trạng thái</th>
              <th>Thành tiền</th>
              <th>Số phiếu thu</th>
              {!isChiTiet && <th>Tiện ích</th>}
            </tr>
          </thead>
          <tbody>
            {state.listData.map((item, index, data) => {
              let check = false;
              // check : check xem co gop hang k nếu = true thì gộp
              const itemNext = data[index + 1];
              if (item?.soPhieuThu == itemNext?.soPhieuThu) {
                check = true;
              }
              let check2 = false;
              // check2 : check xem item trc đã gộp chưa nếu gộp rồi thì k hiện số phiếu thu và tiện ích
              const itemPrev = data[index - 1];
              if (item?.soPhieuThu == itemPrev?.soPhieuThu) {
                check2 = true;
              }
              return (
                <tr key={item.id} className={index % 2 !== 0 ? "odd" : ""}>
                  <td className="center">
                    {state.page * state.size + index + 1}
                  </td>
                  <td className="left">{item?.tenDichVu}</td>
                  <td className="right">{item?.tenDonViTinh}</td>
                  <td className="right">{item?.soLuong}</td>
                  <td className="center">{item?.trangThai}</td>
                  <td className="right">{item?.thanhTien?.formatPrice()}</td>
                  {!check2 ? (
                    <>
                      <td
                        className="left noBg"
                        rowSpan={check ? item.countSophieuThu : 1}
                      >
                        {item?.soPhieuThu}
                      </td>
                      {!isChiTiet && (
                        <td
                          className="center noBg"
                          rowSpan={check ? item.countSophieuThu : 1}
                        >
                          <Icon
                            className="icon-delete"
                            component={IconDelete}
                            onClick={() => handleRemove(item.soPhieuThu)}
                          ></Icon>
                        </td>
                      )}
                    </>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalElements ? (
        <Pagination
          listData={state.listData}
          onChange={handleChangePage}
          current={state.page + 1}
          pageSize={state.size}
          total={state?.AllListData?.length || 15}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
      <ModalAddDichVu ref={refModalAllDichVu}></ModalAddDichVu>
    </Main>
  );
};

export default TableDsDichVu;
