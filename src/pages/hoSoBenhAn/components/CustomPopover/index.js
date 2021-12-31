import { DatePicker, Input, Button, InputNumber } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Main, PopoverStyled } from "./styled";
import Search from "assets/images/welcome/search.png";
import { connect } from "react-redux";
import moment from "moment";

const { RangePicker } = DatePicker;

const CustomPopover = ({
  onSearch,
  onChangeInputSearch,
  ...props
}, ref) => {

  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {

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
    if ("" == value || null == value) {
      onSearch({ page: 0, size: 10, dataSearch: {} });
    }
    setState({ [key]: value });
  };

  const onChangeDate = (key) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    if ("" == value) {
      onSearch({ page: 0, size: 10, dataSearch: {} });
    }
    setState({ [`tu${key}`]: value, [`den${key}`]: value1 });
  };

  const onKeyDown = (type) => (e) => {
    if (e?.key == "Enter") {
      const value = e.target ? e.target?.value : e;
      onChangeInputSearch({ [type]: `${value}`.trim() });
    }
  }

  const onSearchDocument = () => {
    const {
      maTheBhyt,
      tuoi,
      tuNgaySinh,
      denNgaySinh,
      tuThoiGianVaoVien,
      denThoiGianVaoVien,
    } = state;
    onChangeInputSearch({
      maTheBhyt,
      tuoi,
      tuNgaySinh,
      denNgaySinh,
      tuThoiGianVaoVien,
      denThoiGianVaoVien,
    });
  };

  const defaultDate = () => {
    return [undefined, moment(new Date, "DD/MM/YYYY")];
  }

  const content = () => (
    <Main>
      <div className="content-popover">
        {/* <Select
          mode="multiple"
          showArrow
          placeholder="Nguồn nhâp kho"
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
        ></Select> */}
        <Input
          placeholder="Số BHYT"
          bordered={false}
          onChange={onChange("maTheBhyt")}
          onKeyDown={onKeyDown("maTheBhyt")}
        ></Input>
        <InputNumber
          className="input-number"
          placeholder="Nhập giá trị nhỏ tuổi nhất cần tìm"
          bordered={false}
          onChange={onChange("tuoi")}
        ></InputNumber>
        <div className="date">
          <div>
            <label>Ngày sinh</label>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              defaultValue={defaultDate()}
              format="DD / MM / YYYY"
              onChange={onChangeDate("NgaySinh")}
            ></RangePicker>
          </div>
        </div>
        <div className="date">
          <div>
            <label>Ngày đăng ký</label>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              defaultValue={defaultDate()}
              format="DD / MM / YYYY"
              onChange={onChangeDate("ThoiGianVaoVien")}
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

export default connect(
  (state) => ({}),
  ({
    information: {
      onChangeInputSearch,
      onSearch,
    }
  }) => ({
    onSearch,
    onChangeInputSearch,
  })
  , null, {
  forwardRef: true,
})(forwardRef(CustomPopover));
