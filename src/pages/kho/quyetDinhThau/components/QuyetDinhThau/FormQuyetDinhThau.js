import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Checkbox, Input, Form, DatePicker, Button, Row, Col } from "antd";
import { CreatedWrapper, Select } from "components";
import moment from 'moment';
import { connect, useDispatch } from "react-redux"
import { openInNewTab } from "utils";

const FormQuyetDinhThau = ({
  listLoaiDichVuThuocVatTuHoaChat,
  listNguonNhapKho,
  listloaiThau,
  listAllKhoa,
  listtrangThaiThau,
  handleSubmit,
  onCancel,
  onComplete,
  onUndoComplete,
  onVerify,
  onUndoVerify,
  onFieldsChangeForm,
  edited,
  dataSort,
  trangThai,
  layerId,
  ...props }, ref) => {
  const [form] = Form.useForm();
  const formRef = React.useRef();
  const [dataEdit, setDataEdit] = useState(null);
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refClickBtnSave = useRef();
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);

  const dateFormat = 'DD-MM-YYYY';

  const onSave = () => {
    form.submit();
  };
  refClickBtnSave.current = onSave;

  useImperativeHandle(ref, () => ({
    setfields: (data) => {
      if (data?.info?.id) {
        data.info.ngayCongBo = data.info.ngayCongBo && moment(data.info.ngayCongBo);
        data.info.ngayHieuLuc = data.info.ngayHieuLuc && moment(data.info.ngayHieuLuc);
        form.setFieldsValue(data?.info);
        setDataEdit(data?.info);

      } else {
        form.resetFields();
        setDataEdit(null);
      }
    },
    resetFields: (data) => {
      form.resetFields();
      setDataEdit(null);
    },
  }), []
  );

  const setButton = (value) => {
    if ("cancel" === value) {
      if (edited || !dataEdit) return onCancel;
      if (20 === trangThai) return onUndoComplete;
    }
    if ("ok" === value) {
      if (edited || !dataEdit) return onSave;
      if (10 === trangThai) return onComplete;
      if (20 === trangThai) return onVerify;
      if (30 === trangThai) return onUndoVerify;
    }
  }

  const setButtonText = (value) => {
    if ("cancel" === value) {
      if (edited || !dataEdit) return "H???y";
      if (20 === trangThai) return "H???y ho??n th??nh";
    }
    if ("ok" === value) {
      if ((edited || !dataEdit)) return "L??u";
      if (10 === trangThai) return "Ho??n th??nh";
      if (20 === trangThai) return "Duy???t";
      if (30 === trangThai) return "H???y duy???t";
    }
  }

  const setHiddenButton = (value) => {
    if ("cancel" === value) return !edited && 20 !== trangThai && dataEdit;
  }

  const handleSumitForm = (values) => {
    if (values) {
      const body = {
        ...values,
        ngayCongBo: values.ngayCongBo.format("YYYY-MM-DD"),
        ngayHieuLuc: values.ngayHieuLuc.format("YYYY-MM-DD"),
      }
      handleSubmit(body);
    }
  }

  const handleErrors = (errors) => {
    console.log('errors: ', errors);
  }

  return (
    <>
      <CreatedWrapper
        title="Th??ng tin chi ti???t"
        onCancel={setButton("cancel")}
        cancelText={setButtonText("cancel")}
        hiddenCancel={setHiddenButton("cancel")}
        onOk={setButton("ok")}
        okText={setButtonText("ok")}
        hiddenOk={setHiddenButton("ok")}
      >
        <Form
          ref={formRef}
          form={form}
          onFinish={handleSumitForm}
          onError={handleErrors}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
          onFieldsChange={onFieldsChangeForm}
        >
          <Form.Item
            label="N??m"
            name="nam"
            className="item-date"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n n??m!",
              },
            ]}
          >
            <Input
              disabled={10 !== trangThai}
              className="input-option"
              placeholder="Vui l??ng nh???p n??m"
            />
          </Form.Item>
          <Form.Item
            label="Quy???t ?????nh th???u"
            name="quyetDinhThau"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p quy???t ?????nh th???u!",
              },

              {
                whitespace: true,
                message: "Vui l??ng nh???p quy???t ?????nh th???u!",
              },
            ]}
          >
            <Input
              disabled={10 !== trangThai}
              className="input-option"
              placeholder="Vui l??ng nh???p quy???t ?????nh th???u"
            />
          </Form.Item>
          <Form.Item
            label="G??i th???u"
            name="goiThau"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p g??i th???u!",
              },

              {
                whitespace: true,
                message: "Vui l??ng nh???p g??i th???u!",
              },
            ]}
          >
            <Input
              disabled={10 !== trangThai}
              className="input-option"
              placeholder="Vui l??ng nh???p g??i th???u"
            />
          </Form.Item>
          <Form.Item
            label="Lo???i d???ch v???"
            name="loaiDichVu"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n lo???i d???ch v???!",
              },
            ]}
          >
            <Select
              disabled={10 !== trangThai}
              data={listLoaiDichVuThuocVatTuHoaChat}
              placeholder="Vui l??ng ch???n lo???i d???ch v???"
            />
          </Form.Item>
          <Form.Item
            label={(
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nguon-nhap-kho")}
              >
                Ngu???n nh???p kho
              </div>
            )}
            name="nguonNhapKhoId"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n lo???i d???ch v???!",
              },
            ]}
          >
            <Select
              disabled={10 !== trangThai}
              data={listNguonNhapKho}
              placeholder="Vui l??ng ch???n lo???i d???ch v???"
            />
          </Form.Item>
          <Form.Item
            label="Lo???i th???u"
            name="loaiThau"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n lo???i th???u!",
              },
            ]}
          >
            <Select
              disabled={10 !== trangThai}
              data={listloaiThau}
              placeholder="Vui l??ng ch???n lo???i th???u"
            />
          </Form.Item>
          <Form.Item
            label="Ng??y c??ng b???"
            name="ngayCongBo"
            className="item-date"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n ng??y c??ng b???",
              },
            ]}
          >
            <DatePicker
              disabled={10 !== trangThai}
              placeholder="Vui l??ng ch???n ng??y c??ng b???"
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            label="Hi???u l???c th???u"
            name="ngayHieuLuc"
            className="item-date"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n ng??y c??ng b???",
              },
            ]}
          >
            <DatePicker
              disabled={10 !== trangThai}
              placeholder="Vui l??ng ch???n hi???u l???c th???u"
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            label="Khoa"
            name="khoaId"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n khoa!",
              },
            ]}
          >
            <Select
              disabled={10 !== trangThai}
              data={listAllKhoa}
              placeholder="Vui l??ng ch???n khoa"
            />
          </Form.Item>
          <Form.Item
            label="Tr???ng th??i"
            name="trangThai"
          >
            <Select
              data={listtrangThaiThau}
              defaultValue={10}
              disabled
            />
          </Form.Item>
          {dataEdit && (
            <Form.Item name="active" valuePropName="checked" hidden={10 !== trangThai} >
              <Checkbox>C?? hi???u l???c</Checkbox>
            </Form.Item>
          )}
        </Form>
      </CreatedWrapper>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listNguonNhapKho: state.nguonNhapKho.listData,
    listLoaiDichVuThuocVatTuHoaChat: state.utils.listLoaiDichVuThuocVatTuHoaChat,
    listloaiThau: state.utils.listloaiThau,
    listtrangThaiThau: state.utils.listtrangThaiThau,
    listAllKhoa: state.khoa.listAllKhoa,
    dataSort: state.nguonNhapKho.dataSortColumns,
  };
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  forwardRef(FormQuyetDinhThau)
);
