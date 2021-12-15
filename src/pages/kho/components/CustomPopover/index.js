import { DatePicker, Input, Button } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Main, PopoverStyled } from "./styled";
import Search from "assets/images/welcome/search.png";
import Select from "components/Select";
import { connect } from "react-redux";

const { RangePicker } = DatePicker;

const CustomPopover = (props, ref) => {
  const {
    listAllQuyetDinhThau,
    listNguonNhapKho,
    getListAllQuyetDinhThau,
    onSearch,
    onChangeInputSearch,
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
    getListAllQuyetDinhThau({ size: 99999 });
    onSearch({ size: 99999 });
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
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    setState({ [`tuThoiGian${key}`]: value, [`denThoiGian${key}`]: value1 });
  };

  const onSearchDocument = () => {
    const {
      dsNguonNhapKhoId,
      dsQuyetDinhThauId,
      soPhieu,
      soHoaDon,
      tuThoiGianTaoPhieu,
      denThoiGianTaoPhieu,
      tuThoiGianDuyet,
      denThoiGianDuyet,
    } = state;
    onChangeInputSearch({
      dsNguonNhapKhoId: dsNguonNhapKhoId?.length > 0 ? dsNguonNhapKhoId : "",
      dsQuyetDinhThauId: dsQuyetDinhThauId?.length > 0 ? dsQuyetDinhThauId : "",
      soPhieu,
      soHoaDon,
      tuThoiGianTaoPhieu,
      denThoiGianTaoPhieu,
      tuThoiGianDuyet,
      denThoiGianDuyet,
    });
  };
  const content = () => (
    <Main>
      <div className="content-popover">
        <Select
          mode="multiple"
          showArrow
          placeholder="Nguồn nhập kho"
          bordered={false}
          data={listNguonNhapKho}
          onChange={onChange("dsNguonNhapKhoId")}
        ></Select>
        <Select
          mode="multiple"
          showArrow
          placeholder="Quyết định thầu"
          bordered={false}
          data={listAllQuyetDinhThau}
          ten="quyetDinhThau"
          onChange={onChange("dsQuyetDinhThauId")}
        ></Select>
        <Input
          placeholder="Số phiếu"
          bordered={false}
          onChange={onChange("soPhieu")}
        ></Input>
        <Input
          placeholder="Số hóa đơn"
          bordered={false}
          onChange={onChange("soHoaDon")}
        ></Input>
        <div className="date">
          <div>
            <label>Ngày tạo phiếu</label>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              onChange={onChangeDate("TaoPhieu")}
            ></RangePicker>
          </div>
        </div>
        <div className="date">
          <div>
            <label>Ngày duyệt phiếu</label>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              onChange={onChangeDate("Duyet")}
            ></RangePicker>
          </div>
        </div>
        <div className="btn-search">
          <label></label>
          <Button onClick={() => onSearchDocument()}>
            <img src={Search} alt="..." />
            <span>Tìm</span>
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
    nguonNhapKho: { listData: listNguonNhapKho },
    quyetDinhThau: { listAllQuyetDinhThau },
  } = state;

  return { listNguonNhapKho, listAllQuyetDinhThau };
};

const mapDispatchToProps = ({
  nguonNhapKho: { onSearch },
  quyetDinhThau: { getListAllQuyetDinhThau },
  nhapKho: { onChangeInputSearch },
}) => ({
  getListAllQuyetDinhThau,
  onSearch,
  onChangeInputSearch,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(CustomPopover));
