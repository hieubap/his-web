import { Form } from "antd";
import { checkRole } from "app/Sidebar/constant";
import { CreatedWrapper } from "components";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import { combineSort } from "utils";

const FormRight = ({
  renderForm = () => {},
  onCancel,
  editStatus,
  layerId,
  roleSave,
  roleEdit,
  dataEdit,
  updateData = () => {},
  updateDataEdit,
  getData = () => {},
  sortData,
  dataSearch,
  onSubmit = () => {},
  refClickBtnAdd,
}) => {
  const [form] = Form.useForm();
  const formRef = React.useRef();
  // const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef(null);
  const { onRegisterHotkey } = useDispatch().phimTat;
  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: refClickBtnAdd.current && refClickBtnAdd.current(false),
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
  const editDataForm = (dataEdit) => {
    if (updateDataEdit) {
      updateDataEdit(dataEdit);
    } else {
      updateData({ dataEdit });
    }
  };

  const handleSubmit = (values) => {
    onSubmit({ ...values, id: dataEdit?.id })
      .then((res) => {
        getData({
          ...dataSearch,
          sort: combineSort(sortData),
        });
      })
      .catch((e) => console.log(e));
  };

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit(values);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  refClickBtnSave.current = handleAddNew;
  refClickBtnAdd.current = (callOutComponent) => () => {
    form.resetFields();
    editDataForm(null);
    if (refAutoFocus.current) {
      if (!callOutComponent) {
        refAutoFocus.current.focus();
      } else {
        setTimeout(() => {
          refAutoFocus.current.focus();
        }, 50);
      }
    }
  };
  useEffect(() => {
    if (dataEdit?.id) form.setFieldsValue(dataEdit);
  }, [dataEdit]);

  return (
    <>
      <CreatedWrapper
        title="Thông tin chi tiết"
        onCancel={onCancel}
        cancelText="Hủy"
        onOk={handleAddNew}
        okText="Lưu [F4]"
        roleSave={[roleSave]}
        roleEdit={[roleEdit]}
        editStatus={editStatus}
      >
        <fieldset disabled={!checkRole([roleSave]) && !editStatus}>
          <Form
            ref={formRef}
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            {renderForm({ form, refAutoFocus, dataEdit })}
          </Form>
        </fieldset>
      </CreatedWrapper>
    </>
  );
};

export default FormRight;
