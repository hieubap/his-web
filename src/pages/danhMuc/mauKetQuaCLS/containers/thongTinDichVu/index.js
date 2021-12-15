import { Form, Col, Input, Row, Select, Button } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React from "react";
import SubmitIcon from "assets/svg/kho/save.svg";
import { Main } from "./styled";
import CreatedWrapper from "components/CreatedWrapper";

const { Item } = Form;

const ThongTinDichVu = (props) => {
  const [form] = Form.useForm();
  const onReset = () => {};
  const onSave = () => {};
  return (
    <Main>
      <CreatedWrapper
        title="Thông tin chi tiết"
        onCancel={onReset}
        cancelText="Hủy"
        onOk={onSave}
        okText="Lưu"
        // roleSave={[ROLES["DANH_MUC"].MAU_QMS_THEM]}
        // roleEdit={[ROLES["DANH_MUC"].MAU_QMS_SUA]}
        editStatus={props?.stateParent?.editStatus}
      >
        <div className="content">
          <Form>
            <Row>
              <Col span={12}>
                <Item
                  label="Mã"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Nhập mã",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Tên mẫu"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Nhập tên",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={24}>
                <div className="group-input">
                  <Item name="">
                    <span>Kết quả: </span>
                    <Input></Input>
                  </Item>
                  <Item name="">
                    <span>Kết luận: </span>
                    <Input></Input>
                  </Item>
                  <Item name="">
                    <span>Cách thức can thiệp: </span>
                    <Input></Input>
                  </Item>
                  <Item name="">
                    <span>Phương thức can thiệp: </span>
                    <Input></Input>
                  </Item>
                </div>
              </Col>
              <Col span={24}>
                <Item
                  label="Tên dịch vụ CLS"
                  name="tenDichVu"
                  rules={[
                    {
                      required: true,
                      message: "Nhập tên dịch vụ",
                    },
                  ]}
                >
                  <Select mode="tags" />
                </Item>
              </Col>

              <Col span={24}>
                <Item name="hieuLuc">
                  <Checkbox>Hiệu lực</Checkbox>
                </Item>
              </Col>
            </Row>
            {/* <div className="footer">
              <Button className="left-btn">Hủy</Button>
              <Button className="right-btn" htmlType="submit">
                <span>Lưu</span>
                <SubmitIcon
                  style={{ width: "15px", height: "15px", marginLeft: "7px" }}
                />
              </Button>
            </div> */}
          </Form>
        </div>
      </CreatedWrapper>
    </Main>
  );
};

export default ThongTinDichVu;
