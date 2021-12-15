import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
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
  const [dataEdit, setdataEdit] = useState({});
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
        setdataEdit({});
      },
    }),
    []
  );

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        props
          .createOrEdit({ ...values, id: dataEdit?.id, loaiNhomBenh: 20 })
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
    });
  };
  const onUpdate = (key) => (e) => {
    if (key === "chuongBenhId") {
      props.getAllNhomBenh({ loaiNhomBenh: 10, [key]: e });
    }
    form.setFieldsValue({ [key]: e });
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
            label="Mã nhóm bệnh phụ I"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã nhóm bệnh phụ I!",
              },
              {
                max: 20,
                message: "Vui lòng nhập mã nhóm bệnh phụ I không quá 20 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập mã nhóm bệnh phụ I!",
              },
            ]}
          >
            <Input
              ref={refAutoFocus}
              className="input-option"
              placeholder="Vui lòng nhập mã nhóm bệnh phụ I"
            />
          </Form.Item>
          <Form.Item
            label="Tên nhóm bệnh phụ I"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên nhóm bệnh phụ I!",
              },
              {
                max: 1000,
                message:
                  "Vui lòng nhập tên nhóm bệnh phụ I không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên nhóm bệnh phụ I!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên nhóm bệnh phụ I"
            />
          </Form.Item>
          <Form.Item
            label="Chương bệnh"
            name="chuongBenhId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn chương bệnh!",
              },
            ]}
          >
            <Select
              data={props.listAllChuongBenh}
              placeholder="Chọn chương bệnh"
              onChange={onUpdate("chuongBenhId")}
            />
          </Form.Item>
          <Form.Item
            label="Nhóm bệnh chính"
            name="nhomBenhChinhId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm bệnh chính!",
              },
            ]}
          >
            <Select
              data={props.listAllNhomBenhChinh}
              placeholder="Chọn nhóm bệnh chính"
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

const mapDispatchToProps = ({
  nhomBenh: { createOrEdit, getAllNhomBenh },
}) => ({
  createOrEdit,
  getAllNhomBenh,
});

export default connect(
  (state) => {
    const {
      chuongBenh: { listAllData: listAllChuongBenh },
      nhomBenh: { dataSearch, listAllNhomBenhChinh },
    } = state;
    return { listAllChuongBenh, dataSearch, listAllNhomBenhChinh };
  },
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(forwardRef(Index));
