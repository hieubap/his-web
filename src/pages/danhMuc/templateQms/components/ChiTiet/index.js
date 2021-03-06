import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { Main } from "./styled";
import IcSave from "assets/images/kho/save.png";
import { connect } from "react-redux";
import Select from "components/Select";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import CreatedWrapper from "components/CreatedWrapper";
import FormWraper from "components/FormWraper";
const ChiTiet = (props) => {
  const [form] = Form.useForm();
  const { getUtils, listloaiQms, createOrEdit, currentItem, onSearch, layerId, onRegisterHotkey } = props;
  const refClickBtnSave = useRef();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getUtils({ name: "loaiQms" });
  }, []);

  const refAutoFocus = useRef(null);

  useEffect(() => {
    loadCurrentItem(currentItem);
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);
  // register layerId
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


  const loadCurrentItem = (item) => {
    if (item) {
      const { ma, ten, loaiQms, url, id, active } = item || {};
      const data = {
        ma,
        ten,
        loaiQms,
        url,
        id,
        active,
      };

      form.setFieldsValue(data);
      setState({ currentId: id, currentData: data });
    } else {
      form.resetFields();
    }
  };

  const onSave = () => {
    form.submit();
  };
  refClickBtnSave.current = onSave;

  const onHanldeSubmit = (values) => {
    const { ma, ten, loaiQms, url, active } = values;
    const data = {
      ma,
      ten,
      loaiQms,
      url,
      id: state.currentId,
      active,
    };
    createOrEdit(data).then((s) => {
      form.resetFields();
      onSearch({});
    });
  };
  const handleHiddenButtonDependRole = () => {
    let roleSave = [ROLES["DANH_MUC"].MAU_QMS_THEM];
    let roleEdit = [ROLES["DANH_MUC"].MAU_QMS_SUA];
    if (roleEdit || roleSave) {
      if (props.stateParent.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };

  const onReset = () => {
    if (currentItem?.id) {
      loadCurrentItem(state.currentData);
    } else {
      loadCurrentItem();
    }
  };

  return (
    <Main>
      <CreatedWrapper
        title="Th??ng tin chi ti???t"
        onCancel={onReset}
        cancelText="H???y"
        onOk={onSave}
        okText="L??u"
        roleSave={[ROLES["DANH_MUC"].MAU_QMS_THEM]}
        roleEdit={[ROLES["DANH_MUC"].MAU_QMS_SUA]}
        editStatus={props.stateParent.editStatus}
      >
        <div className="info">
          <fieldset
            disabled={
              props.stateParent.editStatus
                ? !checkRole([ROLES["DANH_MUC"].MAU_QMS_SUA])
                : !checkRole([ROLES["DANH_MUC"].MAU_QMS_THEM])
            }
          >
            <div className="content">
              <Form
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
                onFinish={onHanldeSubmit}
              >
                <Form.Item
                  label="M?? m???u QMS"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p m?? m???u QMS",
                    },
                  ]}
                >
                  <Input
                    autoFocus={true}
                    ref={refAutoFocus}
                    placeholder="Vui l??ng nh???p m?? m???u QMS"
                  ></Input>
                </Form.Item>
                <Form.Item
                  label="T??n m???u QMS"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p t??n m???u QMS",
                    },
                  ]}
                >
                  <Input placeholder="Vui l??ng nh???p t??n m???u QMS"></Input>
                </Form.Item>
                <Form.Item
                  label="Lo???i QMS"
                  name="loaiQms"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n lo???i QMS",
                    },
                  ]}
                >
                  <Select data={listloaiQms}></Select>
                </Form.Item>
                <Form.Item
                  label="Link m???u QMS"
                  name="url"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p link m???u QMS",
                    },
                  ]}
                >
                  <Input placeholder="Vui l??ng nh???p link m???u QMS"></Input>
                </Form.Item>
                {state.currentId && (
                  <Form.Item name="active" valuePropName="checked">
                    <Checkbox>C?? hi???u l???c</Checkbox>
                  </Form.Item>
                )}
              </Form>
            </div>
            {/* <div className="footer">
              <div className="left"></div>
              <div className="right">
                {!handleHiddenButtonDependRole() && (
                  <Button className="btn-reset" onClick={onReset}>
                    H???y
                  </Button>
                )}
                {!handleHiddenButtonDependRole() && (
                  <Button className="btn-save" onClick={onSave}>
                    <span>L??u</span>
                    <img src={IcSave} />
                  </Button>
                )}
              </div>
            </div> */}
          </fieldset>
        </div>
      </CreatedWrapper>
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    utils: { listloaiQms = [] },
    template: { currentItem },
  } = state;

  return {
    listloaiQms,
    currentItem,
  };
};
const mapDispatchToProps = ({
  utils: { getUtils },
  template: { createOrEdit, onSearch },
  phimTat: { onRegisterHotkey }
}) => ({
  getUtils,
  createOrEdit,
  onSearch,
  onRegisterHotkey
});
export default connect(mapStateToProps, mapDispatchToProps)(ChiTiet);
