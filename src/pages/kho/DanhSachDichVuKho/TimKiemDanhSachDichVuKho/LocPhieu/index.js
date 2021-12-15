import { DatePicker, Input, Button, Row, Col } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Main, PopoverStyled, SelectStyled } from "./styled";
import Search from "assets/images/welcome/search.png";
import Select from "components/Select";
import { connect, useDispatch, useSelector } from "react-redux";

const { RangePicker } = DatePicker;

const CustomPopover = (props, ref) => {
  const {
    listAllQuyetDinhThau,
    listNguonNhapKho,
    getListAllQuyetDinhThau,
    onSearch,
    onChangeInputSearch,
  } = props;
  const cachXem = useSelector(state => state.danhSachDichVuKho.cachXem)
  const dataSearch = useSelector(state => state.danhSachDichVuKho.dataSearch)
  const { listLoaiDichVu } = useSelector(state => state.utils)

  const searchByParams = useDispatch().danhSachDichVuKho.searchByParams;
  const updateData = useDispatch().danhSachDichVuKho.updateData;
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListAllQuyetDinhThau({});
    onSearch({});
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

  const content = () => (
    <Main>
      <div className="content-popover">
        {
          cachXem == 2 && <Input
            placeholder="Số lô"
            bordered={false}
            onChange={onChange("soLo")}
            type="number"
          ></Input>
        }
        <div className="content-popover__select">
          <Select
            mode="multiple"
            showArrow
            placeholder="Loại dịch vụ"
            bordered={false}
            data={[
              {
                ten : "Thuốc",
                id : 90
              },
              {
                ten : "Vật tư",
                id : 100
              },
              {
                ten : "Hóa Chất",
                id : 110
              },
            ]}
            onChange={onChange("dsLoaiDichVu")}
          ></Select>
        </div>
        {/* <div className="date">
          <div>
            <label>Ngày duyệt phiếu</label>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              onChange={onChangeDate("TaoPhieu")}
            ></RangePicker>
          </div>
        </div> */}

        <Row className="row-select-group" style={{ alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
          <Col span={11}>
            <SelectStyled>
              <label>SL tồn thực tế</label>
              <Input
                placeholder="Nhập SL nhỏ nhất"
                bordered={false}
                onChange={onChange("soLuongTu")}
                type="number"
                style={{ borderBottom: 0 }}
                value={state.soLuongTu}
                onBlur={(e) => {
                  if (state.soLuongDen && Number(state.soLuongTu) > Number(state.soLuongDen)) {
                    setState({
                      soLuongTu: ""
                    })
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    return e.preventDefault()
                  }
                }}
              ></Input>
            </SelectStyled>
          </Col>
          <Col span={1}>
            -
          </Col>
          <Col span={11}>
            <SelectStyled>
              <Input
                placeholder="Nhập SL lớn nhất"
                bordered={false}
                onChange={onChange("soLuongDen")}
                type="number"
                style={{ borderBottom: 0 }}
                value={state.soLuongDen}
                onBlur={(e) => {
                  if (state.soLuongTu && Number(state.soLuongTu) > Number(state.soLuongDen)) {
                    setState({
                      soLuongDen: ""
                    })
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    return e.preventDefault()
                  }
                }}
              ></Input>
            </SelectStyled>
          </Col>
        </Row>
        <Row className="row-select-group" style={{ alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
          <Col span={11}>
            <SelectStyled>
              <label>SL tồn khả dụng</label>
              <Input
                placeholder="Nhập SL nhỏ nhất"
                bordered={false}
                onChange={onChange("soLuongKhaDungTu")}
                type="number"
                style={{ borderBottom: 0 }}
                value={state.soLuongKhaDungTu}
                onBlur={(e) => {
                  if (state.soLuongKhaDungDen && Number(state.soLuongKhaDungTu) > Number(state.soLuongKhaDungDen)) {
                    setState({
                      soLuongKhaDungTu: ""
                    })
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    return e.preventDefault()
                  }
                }}
              ></Input>
            </SelectStyled>
          </Col>
          <Col span={1}>
            -
          </Col>
          <Col span={11}>
            <SelectStyled>
              <label>SL tồn khả dụng</label>
              <Input
                placeholder="Nhập SL lớn nhất"
                bordered={false}
                onChange={onChange("soLuongKhaDungDen")}
                type="number"
                style={{ borderBottom: 0 }}
                value={state.soLuongKhaDungDen}
                onBlur={(e) => {
                  if (state.soLuongKhaDungTu && Number(state.soLuongKhaDungTu) > Number(state.soLuongKhaDungDen)) {
                    setState({
                      soLuongKhaDungDen: ""
                    })
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    return e.preventDefault()
                  }
                }}
              ></Input>
            </SelectStyled>
            {/* <SelectStyled>
              <Select
                showArrow
                placeholder="Nhập SL lớn nhất"
                suffixIcon={<div></div>}
                bordered={false}
                data={listAllQuyetDinhThau}
                ten="soLuongKhaDungDen"
                onChange={onChange("soLuongKhaDungDen")}
              ></Select>
            </SelectStyled> */}
          </Col>
        </Row>
        {/* <div className="date">
          <div>
            <label>Ngày tạo phiếu</label>
            <RangePicker
              placeholder={["Từ ngày", "đến ngày"]}
              bordered={false}
              onChange={onChangeDate("ngayTaoPhieu")}
            ></RangePicker>
          </div>
        </div> */}
        <div className="btn-search">
          <label></label>
          <Button
            onClick={() => {
              const { show, ...rest } = state
              if (cachXem != 2) {
                delete rest?.soLo
              } else {
                rest.theoLo = true
              }
              if (rest?.dsLoaiDichVu?.length <= 0) {
                delete rest.dsLoaiDichVu
                delete dataSearch.dsLoaiDichVu
                updateData({
                  dataSearch
                })
              }
              searchByParams(rest)
            }}
          >
            <img src={Search} alt="..." />
            <span>Tìm</span>
          </Button>
        </div>
      </div>
    </Main>
  );
  return (
    <PopoverStyled
      // getPopupContainer={trigger => trigger.parentNode}
      content={content}
      visible={state.show}
      // visible={true}
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
