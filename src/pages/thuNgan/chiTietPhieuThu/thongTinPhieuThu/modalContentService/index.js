import React, { useState, useEffect, useMemo } from "react";
import ModalCheckout from "components/ModalCheckout";
import { Main } from "./styled";
import { Row, Col, message } from "antd";
import { connect } from "react-redux";
import IconCheckout from "assets/images/thuNgan/icCheckout.svg";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Checkbox, Input } from "antd";
import { firstLetterWordUpperCase } from "utils";

let timer = null;

function ModalContentService(props) {
  const {
    tienThanhToanDv,
    tienDaNhan,
    infoPrice,
    listAllService,
    listtrangThaiHoan,
    thongTinBenhNhan,
    listgioiTinh,
    modalPayServiceRef,
    searchAll,
    onChangeInputSearch,
    getUtils,
    postPhieuThuThanhToan,
    nbDotDieuTriId,
    phieuThuId,
    dsPhuongThucTtList,
    onSizeChange
  } = props;
  const checkNccKhacBv = useMemo(() => {
    return dsPhuongThucTtList.some(item => {
      if (infoPrice[item?.id] && item?.nccKhacBv) {
        console.log(item)
        return true
      }
    })
  }, [infoPrice, dsPhuongThucTtList])

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    searchAll({ nbDotDieuTriId, phieuThuId, dataSortColumn: { tenDichVu: 1 } });
  }, []);

  useEffect(() => {
    setSelectedRowKeys(listAllService);
    setTotalPayment(calculatorTotalPrice(listAllService));
  }, [listAllService]);

  const gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};

  const handleClickBack = () => {
    modalPayServiceRef.current.close();
  };

  const handleClickNext = async () => {
    if (tienDaNhan < totalPayment) {
      return message.error(`Số tiền thanh toán không đúng. Tiền phiếu thu ${totalPayment.formatPrice()}, thực thu ${tienDaNhan.formatPrice()}`)
    };
    const dsDichVu = selectedRowKeys.map((item) => ({ id: item.id }));
    const dsPhuongThucTt = Object.keys(infoPrice).map((key) => {
      let moneyOfMethod = 0;
      moneyOfMethod =
        key === "1"
          ? infoPrice[key] - (tienDaNhan - totalPayment)
          : infoPrice[key];
      return {
        phuongThucTtId: key,
        tongTien: moneyOfMethod,
      };
    });
    await postPhieuThuThanhToan({ id: phieuThuId, dsDichVu, dsPhuongThucTt, nbDotDieuTriId });
    onSizeChange({ size: 10, nbDotDieuTriId, phieuThuId });
    modalPayServiceRef.current.close();
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    // if (requiredNumber && !isNumber(value) && value) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };

  const handleClickCheckbox = (item) => (e) => {
    let selectRowKeysCopy = [...selectedRowKeys];
    const isChecked = e.target.checked;

    if (item === "all") {
      selectRowKeysCopy = isChecked ? listAllService : [];
    } else {
      if (isChecked) {
        selectRowKeysCopy = [...selectRowKeysCopy, item];
      } else {
        const index = selectedRowKeys.findIndex((st) => st.id === item.id);

        if (index !== -1) {
          selectRowKeysCopy.splice(index, 1);
        }
      }
    }
    setSelectedRowKeys(selectRowKeysCopy);
    setTotalPayment(calculatorTotalPrice(selectRowKeysCopy));
  };

  const calculatorTotalPrice = (selectedRowKeys) => {
    let total = 0;
    total =
      selectedRowKeys.length > 0
        ? selectedRowKeys.reduce((reducer, current) => {
          return reducer + current.thanhTien;
        }, 0)
        : 0;
    return total;
  };

  const calculatorPriceReturn = () => {
    const moneyReturn =
      totalPayment < tienDaNhan ? tienDaNhan - totalPayment : 0;
    return moneyReturn;
  };

  const columns = [
    {
      title: (
        <HeaderSearch
          title={
            <Checkbox
              defaultChecked={true}
              onChange={handleClickCheckbox("all")}
            >
              Tất cả
            </Checkbox>
          }
        />
      ),
      width: "100px",
      dataIndex: "thaotac",
      key: "thaotac",
      align: "center",
      render: (item) => (
        <Checkbox
          checked={selectedRowKeys.findIndex((st) => st.id === item.id) !== -1}
          onChange={handleClickCheckbox(item)}
        />
      ),
    },
    {
      title: <HeaderSearch title="STT" />,
      width: "60px",
      dataIndex: "stt",
      key: "stt",
      align: "right",
    },
    {
      title: <HeaderSearch title="Thành tiền" />,
      width: "100px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (item) => item && item.formatPrice(),
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          search={
            <Input
              placeholder="Tìm tên dịch vụ"
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: "180px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      align: "left",
    },
    {
      title: <HeaderSearch title="Số lượng" />,
      width: "80px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
    },
  ];

  return (
    <ModalCheckout
      width={917}
      ref={modalPayServiceRef}
      titleHeader="Dịch vụ thanh toán"
      subTitleHeader={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {thongTinBenhNhan.tuoi && (
            <span className="normal-weight">
              - {thongTinBenhNhan?.tuoi} tuổi
            </span>
          )}
        </>
      }
      onClickBack={handleClickBack}
      onClickNext={handleClickNext}
      disabledBtnBack={checkNccKhacBv}
      titleBtnBack="Quay lại [ESC]"
      titleBtnNext={
        <span className="btn-checkout">
          <span className="btn-checkout__text">Xác nhận [F4]</span>
          <IconCheckout className="btn-checkout__icon" />
        </span>
      }
    >
      <Main>
        <Row>
          <Col span={8}>
            <div className="box-left">
              <div className="box-left__price">
                <div className="box-left__title">Số tiền đã nhận</div>
                <div className="box-left__detail">
                  {tienDaNhan.formatPrice()} đ
                </div>
              </div>
              <div className="box-left__price">
                <div className="box-left__title">Số tiền thanh toán DV</div>
                <div className="box-left__detail">
                  {(totalPayment || 0).formatPrice()} đ
                </div>
              </div>
              <div className="box-left__price">
                <div className="box-left__title">Số tiền trả lại</div>
                <div className="box-left__detail">
                  {calculatorPriceReturn().formatPrice()} đ
                </div>
              </div>
            </div>
          </Col>
          <Col span={15} offset={1}>
            <div className="box-right">
              <div className="box-right__title">Chọn DV để thanh toán</div>
              <div className="box-right__table-wrap">
                <div className="box-right__table-title">
                  Đã chọn {selectedRowKeys.length} dịch vụ
                </div>
                <div className="box-right__table-content">
                  <TableWrapper columns={columns} dataSource={listAllService} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Main>
    </ModalCheckout>
  );
}

const mapStateToProps = (state) => {
  const {
    danhSachDichVu: { listAllService, dataSearch },
    thuNgan: { tienThanhToanDv, tienDaNhan, infoPrice, dsPhuongThucTt: dsPhuongThucTtList },
    utils: { listtrangThaiHoan = [], listgioiTinh = [] },
    nbDotDieuTri: { thongTinBenhNhan },
  } = state;
  return {
    listAllService,
    dataSearch,
    listtrangThaiHoan,
    thongTinBenhNhan,
    listgioiTinh,
    tienThanhToanDv,
    tienDaNhan,
    infoPrice,
    dsPhuongThucTtList
  };
};

const mapDispatchToProps = ({
  danhSachDichVu: { searchAll, onChangeInputSearch, onSizeChange },
  utils: { getUtils },
  thuNgan: { postPhieuThuThanhToan },
}) => ({
  searchAll,
  onChangeInputSearch,
  getUtils,
  postPhieuThuThanhToan,
  onSizeChange
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContentService);
