import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Checkbox, Input, Form, Col, Row } from "antd";
import { CreatedWrapper } from "components";
import { ROLES } from "constants/index";
import { checkRole } from "app/Sidebar/constant";
import { useDispatch } from "react-redux";
const CreateOrUpdate = (
  { handleSubmit, onCancel, editStatus, layerId },
  ref
) => {
  const [form] = Form.useForm();
  const formRef = React.useRef();
  const [dataEdit, setDataEdit] = useState(null);
  const refClickBtnAdd = useRef();
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

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit(values);
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAddNew;
  refClickBtnAdd.current = () => {
    form.resetFields();
    setDataEdit(null);
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      setfields: (data) => {
        if (data?.info?.id) {
          form.setFieldsValue(data?.info);
          setDataEdit(data?.info?.id);
        } else {
          form.resetFields();
          setDataEdit(null);
        }
      },
      resetFields: (data) => {
        form.resetFields();
        setDataEdit(null);
        if (refAutoFocus.current) {
          setTimeout(() => {
            refAutoFocus.current.focus();
          }, 50);
        }
      },
    }),
    []
  );
  // useEffect(() => {
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [dataEdit]);
  return (
    <>
      <CreatedWrapper
        title="Th??ng tin chi ti???t"
        onCancel={onCancel}
        cancelText="H???y"
        onOk={handleAddNew}
        okText="L??u [F4]"
        roleSave={[ROLES["DANH_MUC"].NGUON_NGUOI_BENH_THEM]}
        roleEdit={[ROLES["DANH_MUC"].NGUON_NGUOI_BENH_SUA]}
        editStatus={editStatus}
      >
        <fieldset
          disabled={
            !checkRole([ROLES["DANH_MUC"].NGUON_NGUOI_BENH_THEM]) && !editStatus
          }
        >
          <Form
            ref={formRef}
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Row gutter={[8, 8]} style={{ width: "100%" }}>
              <Col span={12}>
                <Form.Item
                  label="M?? ngu???n ng?????i b???nh"
                  name="ma"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p m?? ngu???n ng?????i b???nh!",
                    },
                    {
                      max: 20,
                      message:
                        "Vui l??ng nh???p m?? ngu???n ng?????i b???nh kh??ng qu?? 20 k?? t???!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p m?? ngu???n ng?????i b???nh!",
                    },
                  ]}
                >
                  <Input
                    ref={refAutoFocus}
                    className="input-option"
                    placeholder="Vui l??ng nh???p m?? ngu???n ng?????i b???nh"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="T??n ngu???n ng?????i b???nh"
                  name="ten"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p t??n ngu???n ng?????i b???nh!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p t??n ngu???n ng?????i b???nh!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui l??ng nh???p t??n ngu???n ng?????i b???nh"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: "100%" }}
                  valuePropName="checked"
                  name="nguoiGioiThieu"
                >
                  <Checkbox>Ng?????i gi???i thi???u</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                {dataEdit && (
                  <Form.Item
                    style={{ width: "100%" }}
                    name="active"
                    valuePropName="checked"
                  >
                    <Checkbox>C?? hi???u l???c</Checkbox>
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Form>
        </fieldset>
      </CreatedWrapper>
    </>
  );
};

export default forwardRef(CreateOrUpdate);
