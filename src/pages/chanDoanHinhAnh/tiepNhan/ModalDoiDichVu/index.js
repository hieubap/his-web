import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { ModalStyled, Main } from "./styled";
import { Row, Form, Input, Radio, Button } from "antd";
import Select from "components/Select";
import ModalDichVuMoi from "../ModalDichVuMoi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const ModalDoiDichVu = (props, ref) => {
  const {
    utils: { listgioiTinh },
    lyDoDoiTra: { listLyDo },
    chiDinhDichVuVatTu: { listDvVatTu },
    chiDinhDichVuTuTruc: { listDvThuoc },
    dsBenhNhan: { khoaId },
    phongThucHien: { listDanhSachPhong },
    auth: { auth },
  } = useSelector((state) => state);
  const {
    dichVuKyThuat: { onChangeInputSearch },
    nbDvHoan: { doiDichVu },
    phongThucHien: { getListPhongTheoDichVu },
    chiDinhDichVuVatTu: { getListDichVuVatTu },
    chiDinhDichVuTuTruc: { getListDichVuThuoc },
  } = useDispatch();

  const serviceRef = useRef(null);
  const [state, _setState] = useState({
    show: false,
    hoanThuoc: 1,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    onChangeInputSearch({});
  }, []);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({ show: true, currentItem: data });
    },
  }));
  useEffect(() => {
    if (state.currentItem) {
      getListDichVuVatTu({
        nbDotDieuTriId: state.currentItem?.nbDotDieuTriId,
      });
      getListDichVuThuoc({
        nbDotDieuTriId: state.currentItem?.nbDotDieuTriId,
      });
    }
  }, [state?.currentItem]);

  const onCancel = () => {
    setState({ show: false, dichVuMoiId: null });
    form.resetFields();
  };

  const onOk = () => {
    form.submit();
  };

  const onChangeRadio = (e) => {
    setState({ hoanThuoc: e.target.value });
  };

  const onHandleSubmit = (values) => {
    const { lyDoDoiTraId, phongId } = values;
    let dsDichVu = [
      {
        nbDichVuCuId: state?.currentItem?.id,
        dichVuMoiId: state?.dichVuMoiId,
        phongThucHienId: phongId,
      },
    ];
    let data = {
      hoanThuocVatTu: state?.hoanThuoc === 1 ? true : false,
      dsDichVu,
      lyDoDoiTraId,
      nguoiYeuCauId: auth?.id,
    };
    doiDichVu(data);
  };
  const onShowModalService = (data, dichVuMoiId) => {
    const values = { dichVuMoiId,...data};
    serviceRef.current && serviceRef.current.show(values);
  };
  const onChangeService = (data) => {
    setState({ dichVuMoiId: data[0]?.id });
    getListPhongTheoDichVu({ dsDichVuId: data[0]?.id, khoaChiDinhId: khoaId });
    form.setFieldsValue({ tenDichVuMoi: data[0]?.dichVu?.ten });
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
              listgioiTinh?.find((x) => x.id === state?.currentItem?.gioiTinh)
                ?.ten
            } - ${state?.currentItem?.tuoi} tuổi`}</span>
          </div>
        </Row>
        <Row style={{ background: "#fff", padding: "20px" }}>
          {(listDvVatTu?.length > 0 || listDvThuoc?.length > 0) && (
            <span style={{ color: "#FC3B3A", fontWeight: "bold" }}>
              Cảnh báo tồn tại thuốc / vật tư kèm theo
            </span>
          )}
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            style={{ width: "100%" }}
            onFinish={onHandleSubmit}
          >
            {(listDvVatTu?.length > 0 || listDvThuoc?.length > 0) && (
              <Form.Item>
                <Radio.Group
                  onChange={onChangeRadio}
                  defaultValue={state?.hoanThuoc}
                >
                  <Radio value={1}>Hoàn thuốc / vật tư kèm theo</Radio>
                  <Radio value={2}>Không hoàn thuốc / vật tư kèm theo</Radio>
                </Radio.Group>
              </Form.Item>
            )}
            <Form.Item label="Dịch vụ cũ">
              <Input value={state?.currentItem?.tenDichVu} disabled></Input>
            </Form.Item>
            <Form.Item
              label="Dịch vụ mới"
              name="tenDichVuMoi"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn dịch vụ mới",
                },
              ]}
            >
              <Input
                onClick={() => onShowModalService(state?.currentItem, state?.dichVuMoiId)}
              ></Input>
            </Form.Item>
            <Form.Item
              label="Phòng thực hiện"
              name="phongId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phòng",
                },
              ]}
            >
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

export default forwardRef(ModalDoiDichVu);
