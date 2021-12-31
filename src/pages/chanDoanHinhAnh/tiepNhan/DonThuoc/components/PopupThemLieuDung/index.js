import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import {
  Button,
  DatePicker,
  Input,
  message,
  Row,
  Form,
  Col,
  Popover,
} from "antd";
import { GlobalStyle, ContentWrapper } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import stringUtils from "mainam-react-native-string-utils";

const PopupThemLieuDung = (props, ref) => {
  const [form] = Form.useForm();
  const refOk = useRef(null);
  const refCancel = useRef(null);
  const refFuncOk = useRef(null);
  const inputRef = React.useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());

  const listDuongDung = useSelector((state) => state.duongDung.listDuongDung);
  const { getListAllLieuDung } = useDispatch().lieuDung;
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  useEffect(() => {
    getListAllLieuDung({});
  }, []);
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, [state.data]);
  useImperativeHandle(ref, () => ({
    show: (options = {}, onOk, onCancel) => {
      const { visible, data } = options;
      setState({ visible, data });
      refOk.current = onOk;
      refCancel.current = onCancel;
      // inputRef.current.focus();
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
              if (refCancel.current) refCancel.current();
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              refFuncOk.current && refFuncOk.current();
            },
          },
        ],
      });
    },
  }));
  useEffect(() => {
    if (!state.visible) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
  }, [state.visible]);
  useEffect(() => {
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const onOk = () => {
    form.validateFields().then((values) => {
      const expressionSymbol = /[,.a-zA-Z]/g;
      if (!values.slSang && !values.slChieu && !values.slToi && !values.slDem) {
        message.error("Bắt buộc nhập SL dùng theo từng buổi");
        return null;
      }
      if (!values.ten) {
        message.error("Thiếu tên danh mục");
        return null;
      }
      if (
        (values["slSang"] && expressionSymbol.test(values["slSang"])) ||
        (values["slChieu"] && expressionSymbol.test(values["slChieu"])) ||
        (values["slToi"] && expressionSymbol.test(values["slToi"])) ||
        (values["slDem"] && expressionSymbol.test(values["slDem"]))
      ) {
        message.error(
          "Chỉ được phép nhập số nguyên hoặc phân số (Số nguyên / Số nguyên)"
        );
        return null;
      }
      if (!values.duongDungId) {
        message.error("Thiếu thông tin đường dùng");
        return null;
      }
      setState({ visible: false });
      form.resetFields();
      if (refOk.current) refOk.current({ values });
    });
  };
  refFuncOk.current = onOk;
  const blockInvalidChar = (e) => {
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105) || // các số trên bàn phím
      e.keyCode === 9 || // tab
      e.which === 8 || // dấu -
      e.keyCode === 37 || // mũi tên trái
      e.keyCode === 39 || // mũi tên phải
      e.keyCode === 191 || // dấu /
      e.keyCode === 188 || // dấu ,
      e.keyCode === 190 // dấu .
    ) {
    } else {
      return e.preventDefault();
    }
  };
  // ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const onBlur = (key) => (e) => {
    if (!!e.target.value && e.target.value <= 0) {
      form.setFieldsValue({ [key]: null });
    }
  };

  const contentPopoverLieuDung = () => {
    return (
      <>
        <div
          className={"mask"}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1000,
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
          }}
        ></div>
        <ContentWrapper>
          <div className="content-popover">
            <div
              className="title-popup"
              style={{
                background:
                  "linear-gradient(0deg, rgba(23, 43, 77, 0.1), rgba(23, 43, 77, 0.1)),linear-gradient(0deg, #FFFFFF, #FFFFFF)",
                fontFamily: "Nunito Sans",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 700,
                letterSpacing: 0,
                textAlign: "left",
                padding: "8px 16px",
              }}
            >
              Thêm nhanh liều dùng bác sĩ
            </div>
            <Form
              form={form}
              layout="vertical"
              className="form-custom form-custom--one-line"
            >
              <Row gutter={[16, 0]}>
                <Col span={24}>
                  <Form.Item
                    label="Tên liều dùng"
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên liều dùng!",
                      },
                      {
                        whitespace: true,
                        message: "Vui lòng nhập tên liều dùng!",
                      },
                    ]}
                  >
                    <Input
                      ref={inputRef}
                      className="input-option"
                      placeholder="Vui lòng nhập tên liều dùng"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="SL dùng sáng" name="slSang">
                    <Input
                      className="input-option"
                      placeholder="Nhập số lượng"
                      // type="number"
                      onKeyDown={blockInvalidChar}
                      onBlur={onBlur("slSang")}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="SL dùng chiều" name="slChieu">
                    <Input
                      className="input-option"
                      placeholder="Nhập số lượng"
                      // type="number"
                      onKeyDown={blockInvalidChar}
                      onBlur={onBlur("slChieu")}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="SL dùng tối" name="slToi">
                    <Input
                      className="input-option"
                      placeholder="Nhập số lượng"
                      // type="number"
                      onKeyDown={blockInvalidChar}
                      onBlur={onBlur("slToi")}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="SL dùng đêm" name="slDem">
                    <Input
                      className="input-option"
                      placeholder="Nhập số lượng"
                      // type="number"
                      onKeyDown={blockInvalidChar}
                      onBlur={onBlur("slDem")}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Thời điểm dùng" name="thoiDiem">
                    <Input
                      className="input-option"
                      placeholder="Vui lòng nhập thời điểm dùng"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Đường dùng"
                    name="duongDungId"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập đường dùng!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Vui lòng chọn đường dùng"
                      data={listDuongDung}
                      showArrow={true}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div className="popover-btn-list">
              <Button
                className="popover-btn-list__cancel"
                //  onClick={onCancel}
                onClick={() => {
                  setState({ visible: false });
                  if (refCancel.current) refCancel.current();
                }}
              >
                Hủy
              </Button>
              <Button className="popover-btn-list__ok" onClick={onOk}>
                {"Lưu"}
                <img
                  style={{ marginLeft: 6 }}
                  src={require("assets/images/kho/save.png")}
                  alt=""
                ></img>
              </Button>
            </div>
          </div>
        </ContentWrapper>
      </>
    );
  };
  return (
    <>
      <GlobalStyle />
      <Popover
        overlayClassName="popover-table-thuoc-ke-ngoai popover-table-thuoc-ke-ngoai_lieu-dung"
        overlayInnerStyle={{
          width: 640,
          height: "fit-content",
          padding: "0px !important",
        }}
        content={contentPopoverLieuDung()}
        visible={state?.visible}
        placement="left"
      ></Popover>
    </>
  );
};

export default forwardRef(PopupThemLieuDung);
