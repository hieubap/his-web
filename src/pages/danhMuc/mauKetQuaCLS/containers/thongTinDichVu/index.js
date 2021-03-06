import { Form, Col, Input, Row } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import CreatedWrapper from "components/CreatedWrapper";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import TextField from "components/TextField";

const { Item } = Form;

const ThongTinDichVu = (props) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const [form] = Form.useForm();
  const {
    mauKetQuaCDHA: { currentItem },
    dichVuKyThuat: { listAll },
  } = useSelector((state) => state);
  const {
    mauKetQuaCDHA: { createOrEdit },
    dichVuKyThuat: { getAll },
  } = useDispatch();

  useEffect(() => {
    getAll({ "dichVu.loaiDichVu": 30, size: 9999 });
  }, []);

  useEffect(() => {
    loadCurrentItem(currentItem);
  }, [currentItem]);

  const loadCurrentItem = (item) => {
    if (item) {
      const {
        ma,
        ten,
        dsDichVuId,
        active,
        ketLuan,
        ketQua,
        phuongThucCanThiep,
        cachThucCanThiep,
        id,
      } = item || {};
      const data = {
        ma,
        ten,
        dsDichVuId,
        active,
        ketLuan,
        ketQua,
        phuongThucCanThiep,
        cachThucCanThiep,
        id,
      };
      form.setFieldsValue(data);
      setState({ data });
    } else {
      form.resetFields();
      setState({ data : null });
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  const onSave = () => {
    form.submit();
  };
  const onHandleSubmit = (values) => {
    const {
      ma,
      ten,
      dsDichVuId,
      active,
      ketLuan,
      ketQua,
      phuongThucCanThiep,
      cachThucCanThiep,
    } = values;
    values = {
      ma,
      ten,
      dsDichVuId,
      active,
      id: state?.data?.id,
      ketLuan,
      ketQua,
      phuongThucCanThiep,
      cachThucCanThiep,
    };
    createOrEdit(values).then((s) => {
      form.resetFields();
      setState({ data : null });
    });
  };
  return (
    <Main>
      <CreatedWrapper
        title="Th??ng tin chi ti???t"
        onCancel={onReset}
        cancelText="H???y"
        onOk={onSave}
        okText="L??u"
        // roleSave={[ROLES["DANH_MUC"].MAU_QMS_THEM]}
        // roleEdit={[ROLES["DANH_MUC"].MAU_QMS_SUA]}
        editStatus={props?.stateParent?.editStatus}
      >
        <div className="content">
          <Form form={form} onFinish={onHandleSubmit}>
            <Row>
              <Col span={12}>
                <Item
                  label="M??"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Nh???p m??",
                    },
                  ]}
                >
                  <Input autoFocus />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="T??n m???u"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Nh???p t??n",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={24}>
                <div className="group-input">
                  <Item name="ketQua">
                    <TextField label="K???t qu???" html={state?.data?.ketQua}/>
                  </Item>
                  <Item name="ketLuan">
                    <TextField label="K???t lu???n" html={state?.data?.ketLuan} />
                  </Item>
                  <Item name="cachThucCanThiep" >
                    <TextField label="C??ch th???c can thi???p" html={state?.data?.cachThucCanThiep} />
                  </Item>
                  <Item name="phuongThucCanThiep">
                    <TextField label="Ph????ng th???c can thi???p" html={state?.data?.phuongThucCanThiep}/>
                  </Item>
                </div>
              </Col>
              <Col span={24}>
                <Item
                  label="T??n d???ch v???"
                  name="dsDichVuId"
                  rules={[
                    {
                      required: true,
                      message: "Nh???p t??n d???ch v???",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    data={listAll}
                    placeholder="Vui l??ng ch???n d???ch v???"
                  />
                </Item>
              </Col>

              <Col span={24}>
                <Item name="active" valuePropName="checked">
                  <Checkbox>Hi???u l???c</Checkbox>
                </Item>
              </Col>
            </Row>
          </Form>
        </div>
      </CreatedWrapper>
    </Main>
  );
};

export default ThongTinDichVu;
