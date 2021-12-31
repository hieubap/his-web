import { Button, DatePicker, Input } from "antd";
import IcDown from "assets/images/kho/ic-down-select.png";
import Search from "assets/images/welcome/search.png";
import Select from "components/Select";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { connect } from "react-redux";
import { Main, PopoverStyled } from "./styled";

const { RangePicker } = DatePicker;

const CustomPopover = (props, ref) => {
  const {
    listHinhThucNhapXuat,
    listAllKhoa,
    onChangeInputSearch,
    getListHinhThucNhapXuat,
    getListAllKhoa,
  } = props;

  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListHinhThucNhapXuat({ page: 0, size: 999999, dsHinhThucNhapXuat: 20 });
    getListAllKhoa({ page: 0, size: 999999 });
  }, []);

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  const onCancel = () => {
    setState({ show: false });
  };

  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else value = e;
    setState({ [key]: value });
  };

  const onChangeDate = (key) => (e) => {
    const [value1, value2] = e || [];
    setState({
      [`tuNgay${key}`]: value1?.format("YYYY-MM-DD"),
      [`denNgay${key}`]: value2?.format("YYYY-MM-DD"),
    });
  };

  const onSearchDocument = () => {
    const {
      dsNguonNhapKhoId,
      dsQuyetDinhThauId,
      soPhieu,
      soHoaDon,
      tuNgayTaoPhieu,
      denNgayTaoPhieu,
      tuNgayDuyet,
      denNgayDuyet,
      thangDuTru,
      hinhThucNhapXuatId,
      khoaChiDinhId,
    } = state;
    onChangeInputSearch({
      dsNguonNhapKhoId,
      dsQuyetDinhThauId,
      soPhieu,
      soHoaDon,
      tuNgayTaoPhieu,
      denNgayTaoPhieu,
      tuNgayDuyet,
      denNgayDuyet,
      thangDuTru,
      hinhThucNhapXuatId,
      khoaChiDinhId,
    });
  };
  const content = () => (
    <Main>
      <div className="content-popover">
        <Input
          placeholder="Số phiếu"
          bordered={false}
          onChange={onChange("phieuDoiUng")}
        ></Input>
        <Input
          placeholder="Mã NB"
          bordered={false}
          onChange={onChange("phieuDoiUng")}
        ></Input>
        <Select
          showArrow
          placeholder="Người phát"
          bordered={false}
          data={listHinhThucNhapXuat}
          onChange={onChange("hinhThucNhapXuatId")}
          suffixIcon={<img src={IcDown} alt="IcDown" className="ic-down" />}
        ></Select>
        <div className="date">
          <div>
            <label style={{ fontSize: 12, marginTop: 5 }}>
              Ngày phát
            </label>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              onChange={onChangeDate("Duyet")}
            ></RangePicker>
          </div>
        </div>
        <div className="date">
          <div>
            <label style={{ fontSize: 12, marginTop: 5 }}>Ngày đăng ký</label>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              onChange={onChangeDate("TaoPhieu")}
            ></RangePicker>
          </div>
        </div>
        <div className="btn-search">
          <label></label>
          <Button onClick={() => onSearchDocument()}>
            <span style={{ fontFamily: "Nunito Sans", marginRight: 5 }}>
              Tìm
            </span>
            <img src={Search} alt="..." />
          </Button>
        </div>
      </div>
    </Main>
  );
  return (
    <PopoverStyled
      content={content}
      visible={state.show}
      placement="bottomLeft"
      onVisibleChange={() => onCancel()}
    ></PopoverStyled>
  );
};

const mapStateToProps = (state) => {
  const {
    khoa: { listAllKhoa },
    hinhThucNhapXuat: { listHinhThucNhapXuat },
  } = state;

  return { listHinhThucNhapXuat, listAllKhoa };
};

const mapDispatchToProps = ({
  khoa: { getListAllKhoa },
  hinhThucNhapXuat: { getListHinhThucNhapXuat },
  xuatKho: { onChangeInputSearch },
}) => ({
  getListHinhThucNhapXuat,
  getListAllKhoa,
  onChangeInputSearch,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(CustomPopover));
