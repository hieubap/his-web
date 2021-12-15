import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import { Checkbox, Input, Form } from "antd";
import CreatedWrapper from "components/CreatedWrapper";
import Select from "components/Select";
import { connect, useDispatch } from "react-redux";
import { ROLES } from "constants/index";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
const Index = (props, ref) => {
  const { layerId } = props;
  const [form] = Form.useForm();
  const [dataEdit, setdataEdit] = useState(null);
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef(null);
  const { onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      chuongBenhId: props.dataSearch["chuongBenhId"],
      nhomBenhChinhId: props.dataSearch["nhomBenhChinhId"],
      nhomBenhPhu1Id: props.dataSearch["nhomBenhPhu1Id"],
      nhomBenhPhu2Id: props.dataSearch["nhomBenhPhu2Id"],
      loaiBenhId: props.dataSearch["loaiBenhId"],
    });
  }, [props.dataSearch]);
  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        form.setFieldsValue(data);
        setdataEdit(data);
      },
      resetFields: () => {
        onResetDataSearch();
        setdataEdit(null);
      },
    }),
    []
  );

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        props
          .createOrEdit({ ...values, id: dataEdit?.id })
          .then(() => {
            if (!dataEdit?.id) {
              onResetDataSearch();
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAddNew;
  refClickBtnAdd.current = () => {
    form.resetFields();
    setdataEdit({});
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  };
  const onCancel = () => {
    if (dataEdit?.id) {
      form.setFieldsValue(dataEdit);
    } else {
      onResetDataSearch();
    }
  };
  const onResetDataSearch = () => {
    form.resetFields();
    form.setFieldsValue({
      chuongBenhId: props.dataSearch["chuongBenhId"] || null,
      nhomBenhChinhId: props.dataSearch["nhomBenhChinhId"] || null,
      nhomBenhPhu1Id: props.dataSearch["nhomBenhPhu1Id"] || null,
      nhomBenhPhu2Id: props.dataSearch["nhomBenhPhu2Id"] || null,
      loaiBenhId: props.dataSearch["loaiBenhId"] || null,
    });
  };
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [dataEdit]);
  return (
    <>
      <CreatedWrapper
        title="Thông tin chi tiết"
        onCancel={onCancel}
        cancelText="Hủy"
        onOk={handleAddNew}
        okText="Lưu [F4]"
        roleSave={[ROLES["DANH_MUC"].BENH_TAT_THEM]}
        roleEdit={[ROLES["DANH_MUC"].BENH_TAT_SUA]}
        editStatus={dataEdit?.id}
      >
        <FormWraper
          disabled={
            dataEdit?.id
              ? !checkRole([ROLES["DANH_MUC"].BENH_TAT_SUA])
              : !checkRole([ROLES["DANH_MUC"].BENH_TAT_THEM])
          }
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label="Mã tên bệnh"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã tên bệnh!",
              },
              {
                max: 20,
                message: "Vui lòng nhập mã tên bệnh không quá 20 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập mã tên bệnh!",
              },
            ]}
          >
            <Input
              ref={refAutoFocus}
              className="input-option"
              placeholder="Vui lòng nhập mã tên bệnh"
            />
          </Form.Item>
          <Form.Item
            label="Tên tên bệnh"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên tên bệnh!",
              },
              {
                max: 1000,
                message: "Vui lòng nhập tên tên bệnh không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên tên bệnh!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên tên bệnh"
            />
          </Form.Item>
          <Form.Item label="Nhóm bệnh chính" name="nhomBenhChinhId">
            <Select
              data={props.listAllNhomBenhChinh}
              placeholder="Chọn nhóm bệnh chính"
            />
          </Form.Item>
          <Form.Item label="Chương bệnh" name="chuongBenhId">
            <Select
              data={props.listAllChuongBenh}
              placeholder="Chọn chương bệnh"
            />
          </Form.Item>
          <Form.Item label="Nhóm bệnh phụ I" name="nhomBenhPhu1Id">
            <Select
              data={props.listAllNhomBenhPhu1}
              placeholder="Chọn nhóm bệnh phụ I"
            />
          </Form.Item>
          <Form.Item label="Nhóm bệnh phụ II" name="nhomBenhPhu2Id">
            <Select
              data={props.listAllNhomBenhPhu2}
              placeholder="Chọn nhóm bệnh phụ II"
            />
          </Form.Item>
          <Form.Item label="Loại bệnh" name="loaiBenhId">
            <Select data={props.listAllLoaiBenh} placeholder="Chọn loại bệnh" />
          </Form.Item>
          <Form.Item label="Mã nhóm BC BYT" name="maNhomByt">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã nhóm BC BYT"
            />
          </Form.Item>
          <Form.Item label="Mã nhóm chi tiết" name="maNhomChiTiet">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã nhóm chi tiết"
            />
          </Form.Item>
          {dataEdit?.id && (
            <Form.Item name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
          )}
        </FormWraper>
      </CreatedWrapper>
    </>
  );
};

const mapDispatchToProps = ({ maBenh: { createOrEdit } }) => ({
  createOrEdit,
});

export default connect(
  (state) => {
    const {
      chuongBenh: { listAllData: listAllChuongBenh },
      nhomBenh: {
        listAllNhomBenhChinh,
        listAllNhomBenhPhu1,
        listAllNhomBenhPhu2,
      },
      loaiBenh: { listAllData: listAllLoaiBenh },
      maBenh: { dataSearch },
    } = state;
    return {
      listAllChuongBenh,
      dataSearch,
      listAllNhomBenhChinh,
      listAllNhomBenhPhu1,
      listAllNhomBenhPhu2,
      listAllLoaiBenh,
    };
  },
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(forwardRef(Index));
