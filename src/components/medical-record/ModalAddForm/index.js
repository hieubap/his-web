import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
} from "react";
import { Main } from "./styled";
import { Button, Input, Row, Col, Checkbox, Spin, Icon } from "antd";
import { connect } from "react-redux";
import ListForm from "../Form";
import FormCatalog from "../FormCatalog";
import PageHeader from "components/common/PageHeader";

const ModalAddForm = (props, ref) => {
  const refFormCatalog = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, readOnly) => {
      setState({
        show: true,
        active: true,
        macDinh: true,
        taoNhieuMau: false,
        hsdd: false,
        timKiem: "",
      });
      if (refFormCatalog.current) refFormCatalog.current.onSearch("");
    },
  }));

  const onUpdate = () => {
    props.onSave().then((s) => {
      onFinish();
    });
  };
  const onFinish = () => {
    setState({
      show: false,
    });
  };

  const onCheckChange = (type) => (e) => {
    setState({ [type]: e.target.checked });
  };
  const onSearch = () => {
    refFormCatalog.current.onSearch(state.timKiem);
  };
  return (
    <Main
      visible={state.show}
      closable={false}
      centered
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <PageHeader
        leftArea={`THÊM MỚI BIỂU MẪU - ${props.recordType?.ten}`}
        rightArea={
          <>
            <Button icon={"save"} type={"primary"} onClick={onUpdate}>
              Lưu thay đổi
            </Button>
            <Button
              icon={"close-circle-o"}
              type={"danger"}
              onClick={onFinish}
              style={{ marginLeft: 5 }}
            >
              Huỷ bỏ
            </Button>
          </>
        }
      />
      <div>
        <Row gutter={10}>
          <Col span={11}>
            <Input
              onChange={(e) => {
                setState({
                  timKiem: e.target.value,
                });
              }}
              type="text"
              value={state.timKiem}
              placeholder="Tìm kiếm Mã / Tên Biểu mẫu"
              prefix={
                <Icon
                  type="search"
                  style={{ color: "#125872" }}
                  onClick={onSearch}
                />
              }
              onPressEnter={onSearch}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 10, marginBottom: 10 }}>
          <Col span={13}>
            <Row gutter={10}>
              <Col span={5}>Thiết lập BM</Col>
              <Col span={5}>
                <Checkbox
                  checked={state.macDinh}
                  onChange={onCheckChange("macDinh")}
                >
                  Mặc định
                </Checkbox>
              </Col>
              <Col span={5}>
                <Checkbox
                  checked={state.taoNhieuMau}
                  onChange={onCheckChange("taoNhieuMau")}
                >
                  Tạo nhiều mẫu
                </Checkbox>
              </Col>
              {/* <Col span={3}>
                <Checkbox checked={state.hsdd} onChange={onCheckChange("hsdd")}>
                  HSĐD
                </Checkbox>
              </Col> */}
              <Col span={5}>
                <Checkbox
                  checked={state.active}
                  onChange={onCheckChange("active")}
                >
                  Có hiệu lực
                </Checkbox>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Spin spinning={props.isLoadingCreate}>
        <Row gutter={10} offset={12}>
          <Col span={11}>
            <FormCatalog
              taoNhieuMau={state.taoNhieuMau}
              active={state.active}
              hsdd={state.hsdd}
              macDinh={state.macDinh}
              ref={refFormCatalog}
            />
          </Col>
          <Col span={13}>
            <ListForm
              marginBottom={140}
              showPage={false}
              editMode={true}
              showHeader={false}
              sortable={true}
              submitAfter={true}
            />
          </Col>
        </Row>
      </Spin>
    </Main>
  );
};

export default connect(
  (state) => ({
    isLoadingCreate: state.form.isLoadingCreate || false,
    recordType: state.medicalRecord.recordType,
  }),
  ({ form: { onCreate }, medicalRecord: { onSave } }) => ({
    onCreate,
    onSave,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ModalAddForm));
