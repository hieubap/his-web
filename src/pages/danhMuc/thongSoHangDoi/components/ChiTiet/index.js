import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Checkbox, InputNumber } from "antd";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import IcSave from "assets/images/kho/save.png";
import IcCreate from "assets/images/kho/IcCreate2.png";
import Select from "components/Select";
import { connect, useDispatch } from "react-redux";
import { MUC_DO_UU_TIEN } from "constants/index";
import { cloneDeep } from "lodash";
import CreatedWrapper from "components/CreatedWrapper";
import { ROLES } from "constants/index";
const ChiTiet = (props) => {
  const [form] = Form.useForm();
  const {
    listLoaiPhongHangDoi,
    listDoiTuongHangDoi,
    createOrEdit,
    currentItem,
    getById,
    currentData,
    collapseStatus,
    layerId,
  } = props;
  const [state, _setState] = useState({
    dataTable: [],
    currentIndex: -1,
    tableCurrent: [],
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    let data = listDoiTuongHangDoi.map((item) => {
      return { doiTuong: item?.id, uuTien: item?.id, hieuLuc: true };
    });
    setState({ dataTable: data });
  }, [listDoiTuongHangDoi]);

  useEffect(() => {
    loadCurrentItem(currentItem);
    if (currentItem?.id) {
      getById(currentItem?.id);
    }
  }, [currentItem]);

  const loadCurrentItem = (item) => {
    if (item) {
      const cloneItem = cloneDeep(item);
      let listHangDoi = listDoiTuongHangDoi.map((item) => {
        return { doiTuong: item?.id, uuTien: item?.id, hieuLuc: true };
      });
      const {
        dsDoiTuong = listHangDoi,
        loaiPhong,
        slDangThucHien = 1,
        slTiepTheo = 1,
        id,
      } = cloneItem || {};
      const data = { loaiPhong, slDangThucHien, slTiepTheo, id };
      form.setFieldsValue(data);
      setState({ dataTable: dsDoiTuong, currentId: id, currentIndex: -1 });
    } else {
      form.resetFields();
      form.setFieldsValue({ slTiepTheo: 1, slDangThucHien: 1 });
    }
  };
  const onChangeInputData = (key, index) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.checked) {
        value = true;
      } else {
        value = false;
      }
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    state.dataTable[index][key] = value;
  };

  const onRow = (record = {}, index) => {
    return {
      onClick: (event) => {
        setState({ currentIndex: index });
      },
    };
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 30,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => {
        return index + 1;
      },
    },
    {
      title: <HeaderSearch title="Lo???i ?????i t?????ng" />,
      width: 200,
      dataIndex: "doiTuong",
      key: "doiTuong",
      align: "left",
      render: (item) => {
        return listDoiTuongHangDoi.find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="M???c ????? ??u ti??n" />,
      width: 60,
      dataIndex: "uuTien",
      key: "uuTien",
      align: "center",
      render: (item, data, index) => {
        if (state.currentIndex === index) {
          return (
            <Select
              onChange={onChangeInputData("uuTien", index)}
              defaultValue={item}
              data={MUC_DO_UU_TIEN}
            ></Select>
          );
        } else {
          return MUC_DO_UU_TIEN.find((x) => x.id == item)?.ten;
        }
      },
    },
    {
      title: <HeaderSearch title="S???p x???p v??o QMS" />,
      width: 70,
      dataIndex: "hieuLuc",
      key: "hieuLuc",
      align: "center",
      render: (item, data, index) => {
        if (state.currentIndex === index) {
          return (
            <Checkbox
              onChange={onChangeInputData("hieuLuc", index)}
              defaultValue={item}
            ></Checkbox>
          );
        } else {
          return <Checkbox checked={item}></Checkbox>;
        }
      },
    },
  ];
  const onSave = (e) => {
    form.submit();
  };

  const onReset = () => {
    if (currentItem?.id) {
      loadCurrentItem(currentData);
    } else {
      loadCurrentItem();
      let data = listDoiTuongHangDoi.map((item) => {
        return { doiTuong: item?.id, uuTien: item?.id, hieuLuc: true };
      });
      setState({ dataTable: data, currentIndex: -1 });
    }
  };

  const handleSumitForm = (values) => {
    const { loaiPhong, slDangThucHien = 1, slTiepTheo = 1 } = values;
    const data = {
      loaiPhong,
      slDangThucHien,
      slTiepTheo,
      dsDoiTuong: state.dataTable,
      id: state.currentId,
    };
    createOrEdit(data).then((s) => {
      form.resetFields();
      let data = listDoiTuongHangDoi.map((item) => {
        return { doiTuong: item?.id, uuTien: item?.id, hieuLuc: true };
      });
      setState({ dataTable: data });
    });
  };

  const validator = (rule, value, callback) => {
    if (value) {
      if (Number(value) > 100) {
        callback(
          new Error("SL c???n nh???p ph???i l?? s??? nguy??n c?? gi?? tr??? t??? 1 - 100")
        );
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  const refAutofocus = useRef(null);
  useEffect(() => {
    console.log(refAutofocus.current);
    if (refAutofocus.current && !currentItem?.id) {
      refAutofocus.current.focus();
    }
  }, [currentItem]);
  return (
    <Main collapseStatus={collapseStatus}>
      <CreatedWrapper
        title="Th??ng tin chi ti???t"
        onCancel={onReset}
        cancelText="H???y"
        onOk={onSave}
        okText="L??u [F4]"
        // roleSave={[ROLES["DANH_MUC"].MAU_QMS_THEM]}
        // roleEdit={[ROLES["DANH_MUC"].MAU_QMS_SUA]}
        editStatus={props.stateParent.editStatus}
        layerId={layerId}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
          onFinish={handleSumitForm}
        >
          <Row style={{ width: "100%" }}>
            <Form.Item
              label="Lo???i ph??ng:"
              name="loaiPhong"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n lo???i ph??ng",
                },
              ]}
            >
              <Select
                autoFocus={true}
                data={listLoaiPhongHangDoi}
                placeholder="Ch???n lo???i ph??ng"
                refSelect={refAutofocus}
              ></Select>
            </Form.Item>
            <Form.Item
              label="S??? l?????ng NB t???i ??a hi???n th??? ??? ?? ??ang kh??m/ th???c hi???n:"
              name="slDangThucHien"
              rules={[
                {
                  required: true,
                  message:
                    "Vui l??ng nh???p s??? l?????ng NB t???i ??a hi???n th??? ??? ?? ??ang kh??m/ th???c hi???n!",
                },
                {
                  pattern: new RegExp(/^[1-9][0-9]*$/),
                  message:
                    "SL c???n nh???p ph???i l?? s??? nguy??n c?? gi?? tr??? t??? 1 - 100",
                },
                {
                  validator: validator,
                },
              ]}
            >
              <InputNumber
                type="number"
                style={{ width: "100%" }}
                defaultValue={1}
                className="input-option"
              />
            </Form.Item>
            <Form.Item
              label="S??? l?????ng NB t???i ??a hi???n th??? ??? ?? ti???p theo:"
              name="slTiepTheo"
              rules={[
                {
                  required: true,
                  message:
                    "Vui l??ng nh???p s??? l?????ng NB t???i ??a hi???n th??? ??? ?? ti???p theo!",
                },
                {
                  pattern: new RegExp(/^[1-9][0-9]*$/),
                  message:
                    "SL c???n nh???p ph???i l?? s??? nguy??n c?? gi?? tr??? t??? 1 - 100",
                },
                {
                  validator: validator,
                },
              ]}
            >
              <InputNumber
                type="number"
                style={{ width: "100%" }}
                defaultValue={1}
                className="input-option"
              />
            </Form.Item>
          </Row>
        </Form>
        <h1>Thi???t l???p g???i lo???i ?????i t?????ng v??o h??ng ch???</h1>
        <div>
          <TableWrapper
            columns={columns}
            dataSource={state.dataTable}
            rowKey={(record) => record.doiTuong}
            onRow={onRow}
          ></TableWrapper>
        </div>
      </CreatedWrapper>
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    thietLapHangDoi: { currentItem, currentData },
  } = state;

  return {
    currentItem,
    currentData,
  };
};
const mapDispatchToProps = ({
  thietLapHangDoi: { createOrEdit, getById },
}) => ({
  createOrEdit,
  getById,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChiTiet);
