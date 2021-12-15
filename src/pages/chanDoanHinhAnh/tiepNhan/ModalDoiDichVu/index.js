import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { ModalStyled, Main } from "./styled";
import { Col, Row, Form, Input, Radio, Button } from "antd";
import Select from "components/Select";
import { connect } from "react-redux";
import ModalDichVuMoi from "../ModalDichVuMoi";
const ModalDoiDichVu = (props, ref) => {
  const {
    listgioiTinh,
    getListLyDo,
    listLyDo,
    onChangeInputSearch,
    doiDichVu,
    listDanhSachPhong,
    getListPhongTheoDichVu,
    khoaId
  } = props;
  const serviceRef = useRef(null);
  const [state, _setState] = useState({
    show: false,
    hoanThuoc: 1
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    getListLyDo({});
    onChangeInputSearch({});
    
  }, []);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({ show: true, currentItem: data });
    },
  }));

  const onCancel = () => {
    setState({ show: false });
  };

  const onOk = () => {
    form.submit();
  };

  const onChangeRadio = (e) => {
    setState({ hoanThuoc: e.target.value });

  };

  const onHandleSubmit = (values) => {
    const { lyDoDoiTraId, phongId  } = values;
    let dsDichVu = [{
      nbDichVuCuId : state?.currentItem?.id,
      dichVuMoiId: state?.dichVuMoiId,
      phongThucHienId: phongId
    }]
    let data = {
      hoanThuocVatTu: state?.hoanThuoc == 1 ? true : false,
      dsDichVu,
      lyDoDoiTraId,
    };
    doiDichVu(data);
  };
  const onShowModalService = () => {
    serviceRef.current && serviceRef.current.show();
  };
  const onChangeService = (data) => {
    setState({ dichVuMoiId: data[0]?.id, tenDichVuMoi: data[0]?.dichVu?.ten });
    getListPhongTheoDichVu({dsDichVuId : data[0]?.id, khoaChiDinhId: khoaId});

  };
  const disabled = state?.dichVuMoiId ? false : true;
  return (
    <ModalStyled
      width={640}
      height={428}
      visible={state.show}
      closable={false}
      footer={null}
      onCancel={onCancel}
    >
      <Main>
        <Row className="header">
          <div className="header__left">
            <span style={{ fontWeight: "bold" }}>Yêu cầu đổi dịch vụ </span>
          </div>
          <div className="header__right">
            <span style={{ color: "#7A869A", fontWeight: "bold" }}>{`${
              state?.currentItem?.tenNb
            } - ${
              listgioiTinh?.find((x) => x.id == state?.currentItem?.gioiTinh)
                ?.ten
            } - ${state?.currentItem?.tuoi} tuổi`}</span>
          </div>
        </Row>
        <Row style={{ background: "#fff", padding: "20px" }}>
          <span style={{ color: "#FC3B3A", fontWeight: "bold" }}>
            {" "}
            Cảnh báo tồn tại thuốc / vật tư kèm theo
          </span>
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            style={{ width: "100%" }}
            onFinish={onHandleSubmit}
          >
            <Form.Item>
            <Radio.Group onChange={onChangeRadio} defaultValue={state?.hoanThuoc}>
                <Radio value={1}>Hoàn thuốc / vật tư kèm theo</Radio>
                <Radio value={2}>Không hoàn thuốc / vật tư kèm theo</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Dịch vụ cũ">
              <Input value={state?.currentItem?.tenDichVu} disabled></Input>
            </Form.Item>
            <Form.Item label="Dịch vụ mới" >
              <Input onClick={onShowModalService} value={state?.tenDichVuMoi}></Input>
            </Form.Item>
            <Form.Item label="Phòng thực hiện" name="phongId">
              <Select disabled={disabled} data={listDanhSachPhong}></Select>
            </Form.Item>
            <Form.Item
              label="Lý do"
              name="lyDoDoiTraId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn lý do",
                },
              ]}
            >
              <Select data={listLyDo}></Select>
            </Form.Item>
          </Form>
          <Row className="footer">
            <Button className="btn-cancel" onClick={onCancel}>
              Hủy
            </Button>
            <Button className="btn-save" onClick={onOk}>
              Đồng ý
            </Button>
          </Row>
        </Row>
      </Main>
      <ModalDichVuMoi ref={serviceRef} onChangeService={onChangeService} />
    </ModalStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    listgioiTinh: state.utils.listgioiTinh,
    listLyDo: state.lyDoDoiTra.listLyDo,
    listDichVuKyThuat: state.dichVuKyThuat.listData,
    listDanhSachPhong: state.nbDvHoan.listDanhSachPhong,
    khoaId : state.dsBenhNhan.khoaId
  };
};
const mapDispatchToProps = ({
  lyDoDoiTra: { getListLyDo },
  dichVuKyThuat: { onChangeInputSearch },
  nbDvHoan: { doiDichVu },
  phongThucHien: { getListPhongTheoDichVu }
}) => ({
  getListLyDo,
  onChangeInputSearch,
  doiDichVu,
  getListPhongTheoDichVu
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ModalDoiDichVu));
