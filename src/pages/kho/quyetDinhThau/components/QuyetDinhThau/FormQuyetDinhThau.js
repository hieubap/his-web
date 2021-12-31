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
      if (edited || !dataEdit) return "Hủy";
      if (20 === trangThai) return "Hủy hoàn thành";
    }
    if ("ok" === value) {
      if ((edited || !dataEdit)) return "Lưu";
      if (10 === trangThai) return "Hoàn thành";
      if (20 === trangThai) return "Duyệt";
      if (30 === trangThai) return "Hủy duyệt";
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
        title="Thông tin chi tiết"
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
            label="Năm"
            name="nam"
            className="item-date"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn năm!",
              },
            ]}
          >
            <Input
              disabled={10 !== trangThai}
              className="input-option"
              placeholder="Vui lòng nhập năm"
            />
          </Form.Item>
          <Form.Item
            label="Quyết định thầu"
            name="quyetDinhThau"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập quyết định thầu!",
              },

              {
                whitespace: true,
                message: "Vui lòng nhập quyết định thầu!",
              },
            ]}
          >
            <Input
              disabled={10 !== trangThai}
              className="input-option"
              placeholder="Vui lòng nhập quyết định thầu"
            />
          </Form.Item>
          <Form.Item
            label="Gói thầu"
            name="goiThau"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập gói thầu!",
              },

              {
                whitespace: true,
                message: "Vui lòng nhập gói thầu!",
              },
            ]}
          >
            <Input
              disabled={10 !== trangThai}
              className="input-option"
              placeholder="Vui lòng nhập gói thầu"
            />
          </Form.Item>
          <Form.Item
            label="Loại dịch vụ"
            name="loaiDichVu"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại dịch vụ!",
              },
            ]}
          >
            <Select
              disabled={10 !== trangThai}
              data={listLoaiDichVuThuocVatTuHoaChat}
              placeholder="Vui lòng chọn loại dịch vụ"
            />
          </Form.Item>
          <Form.Item
            label={(
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nguon-nhap-kho")}
              >
                Nguồn nhập kho
              </div>
            )}
            name="nguonNhapKhoId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại dịch vụ!",
              },
            ]}
          >
            <Select
              disabled={10 !== trangThai}
              data={listNguonNhapKho}
              placeholder="Vui lòng chọn loại dịch vụ"
            />
          </Form.Item>
          <Form.Item
            label="Loại thầu"
            name="loaiThau"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại thầu!",
              },
            ]}
          >
            <Select
              disabled={10 !== trangThai}
              data={listloaiThau}
              placeholder="Vui lòng chọn loại thầu"
            />
          </Form.Item>
          <Form.Item
            label="Ngày công bố"
            name="ngayCongBo"
            className="item-date"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày công bố",
              },
            ]}
          >
            <DatePicker
              disabled={10 !== trangThai}
              placeholder="Vui lòng chọn ngày công bố"
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            label="Hiệu lực thầu"
            name="ngayHieuLuc"
            className="item-date"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày công bố",
              },
            ]}
          >
            <DatePicker
              disabled={10 !== trangThai}
              placeholder="Vui lòng chọn hiệu lực thầu"
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            label="Khoa"
            name="khoaId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khoa!",
              },
            ]}
          >
            <Select
              disabled={10 !== trangThai}
              data={listAllKhoa}
              placeholder="Vui lòng chọn khoa"
            />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
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
              <Checkbox>Có hiệu lực</Checkbox>
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
