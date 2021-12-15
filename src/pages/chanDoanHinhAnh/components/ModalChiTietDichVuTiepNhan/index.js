import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Button, Row, Checkbox, Col } from "antd";
import { Main, ModalStyled } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import TextField from "components/TextField";
import Select from "components/Select";
import IcPrint from "assets/images/kho/IcPrint.png";
import IcSave from "assets/images/thuNgan/icSave.png";
import moment from "moment";
import { dataInfoCommon, TRANG_THAI } from "../../configs";
import stringUtils from "mainam-react-native-string-utils";

const ModalChiTietDichVuTiepNhan = (props, ref) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refBtnSave = useRef(null);
  const { nbDotDieuTriId } = useSelector((state) => state.choTiepDonDV);
  const { listtrangThaiDichVu } = useSelector((state) => state.utils);
  const { listDataTongHop } = useSelector((state) => state.maMay);

  const {
    choTiepDonDV: { getTongHopDichVuCLS, updateKetQua },
    maMay: { getDataTongHop = [] },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  const dataInput = useRef(null);
  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );

  const [state, _setState] = useState({
    ketQua: null,
    ketLuan: null,
    cachThucCanThiep: null,
    phuongPhapCanThiep: null,
    maMayId: null,
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    getDataTongHop({ size: 999 });
  }, []);
  const onClose = () => {
    setState({ show: false });
  };
  const FORMAT_DATE = "HH:mm:ss DD/MM/YYYY";
  const onSave = () => {
    const values = {
      ketQua: dataInput.current?.ketQua,
      ketLuan: state.ketLuan,
      cachThucCanThiep: state.cachThucCanThiep,
      phuongPhapCanThiep: state.phuongPhapCanThiep,
      maMayId: state.maMayId,
      nbDotDieuTriId,
      id: state.item?.id,
    };
    updateKetQua(values).then(() =>
      getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck)
    );
    onClose();
  };
  useImperativeHandle(ref, () => ({
    showTiepNhan: (item) => {
      setState({
        show: true,
        item: item,
        maMayId: item?.maMayId,
      });
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setState({
                show: false,
              });
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              refBtnSave.current && refBtnSave.current.click();
            },
          },
        ],
      });
    },
  }));

  const onChange = (key) => (value) => {
    setState({ [key]: value });
  };

  const renderData = (item, type) => {
    if (type === "datetime") {
      return item && moment(item).format(FORMAT_DATE);
    }
    if (type === "status") {
      return (listtrangThaiDichVu || []).find((x) => x.id === item)?.ten;
    }
    if (type === "price") {
      return item && item.formatPrice();
    }
    if (type === "checkbox") {
      return <Checkbox disabled>{item}</Checkbox>;
    }
    return item;
  };
  const disabled = TRANG_THAI.DA_CO_KET_QUA.includes(state?.item?.trangThai);

  return (
    <ModalStyled
      width={1840}
      visible={state.show}
      closable={false}
      footer={null}
    >
      <Main>
        <Row className="header">
          <div className="header__left">
            <span>Chi tiết dịch vụ: </span>
            <span style={{ fontWeight: "bold" }}>{state.item?.tenDichVu}</span>
            <span> | </span>
            <span>Chẩn đoán sơ bộ: </span>
            <span style={{ fontWeight: "bold" }}>{state.item?.cdSoBo}</span>
          </div>
          <div className="header__right">
            <Button ref={refBtnSave} onClick={onSave}>
              <span className="btn-ok">Lưu thay đổi</span>
              <img src={IcSave} alt="..."></img>
            </Button>
            <Button className="btn-back" onClick={onClose}>
              Quay lại
            </Button>
          </div>
        </Row>
        <Row style={{ background: "white", padding: "30px 10px 50px 20px" }}>
          <Col xs={8}>
            <div className="service-info">
              <div className="header">
                <label>Thông tin dịch vụ</label>
              </div>
              <div className="info-content">
                <div className="custom-col">
                  {dataInfoCommon.map((value) => {
                    return (
                      <Row key={value.dataIndex} className={value.className}>
                        <Col span={10}> {value.title}</Col>
                        <Col span={14} style={{ fontWeight: "bold" }}>
                          {renderData(
                            state.item && state.item[value.dataIndex],
                            value.type
                          )}
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={16}
            style={{ background: "white", padding: "0px 0px 0px 20px" }}
          >
            <Row>
              <div className="result">
                <div className="header">
                  <div className="header__left">
                    <span>Kết luận</span>
                    <Select value="Chọn mẫu kết quả" />
                  </div>
                  <div className="header__right">
                    <img src={IcPrint} alt="..."></img>
                  </div>
                </div>
                <div className="result-info">
                  <TextField
                    label="Kết quả"
                    onChange={(e) => {
                      dataInput.current = {
                        ...dataInput.current,
                        ketQua: e,
                      };
                    }}
                    html={state.item?.ketQua}
                    disabled={disabled}
                    style={state.item?.ketQua ? { background: "none" } : {}}
                  />
                  <TextField
                    label="Kết luận"
                    onChange={onChange("ketLuan")}
                    html={state.item?.ketLuan}
                    disabled={disabled}
                    style={state.item?.ketLuan ? { background: "none" } : {}}
                  />
                  <TextField
                    label="Cách thức can thiệp"
                    onChange={onChange("cachThucCanThiep")}
                    html={state.item?.cachThucCanThiep}
                    disabled={disabled}
                    style={
                      state.item?.cachThucCanThiep ? { background: "none" } : {}
                    }
                  />
                  <TextField
                    label="Phương thức can thiệp"
                    onChange={onChange("phuongPhapCanThiep")}
                    html={state.item?.phuongPhapCanThiep}
                    disabled={disabled}
                    style={
                      state.item?.phuongPhapCanThiep
                        ? { background: "none" }
                        : {}
                    }
                  />
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <span> Mã máy: </span>
                    <div className="hanlde-textfield">
                      <Select
                        data={listDataTongHop || []}
                        style={{ width: "350px", marginTop: "4px" }}
                        value={state.maMayId}
                        onChange={onChange("maMayId")}
                        disabled={disabled}
                      ></Select>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
            {/* <Row style={{ padding: "20px 0px 0px 0px" }}>
              <ThongTin></ThongTin>
            </Row> */}
          </Col>
        </Row>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalChiTietDichVuTiepNhan);
