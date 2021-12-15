import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { ModalStyled, Main } from "./styled";
import { Col, Row, Form, Input, Radio, Button, Checkbox } from "antd";
import Select from "components/Select";
import { connect } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
const ModalHoanDichVu = (props, ref) => {
  const { listgioiTinh, getListLyDo, listLyDo, traDichVu } = props;
  const [state, _setState] = useState({
    show: false,
    hoanThuoc: 1
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    getListLyDo({});
  }, []);
  useImperativeHandle(ref, () => ({
    show: (data = {}, selectedRowKeys) => {
      let checkedAll;
      if (data?.length === selectedRowKeys?.length) checkedAll = true;
      else checkedAll = false;
      let listKeys = data?.map((item) => {
        return item?.id;
      });
      setState({
        show: true,
        currentItem: data,
        selectedRowKeys,
        isCheckedAll: checkedAll,
        listKeys,
      });
    },
  }));
  const onCancel = () => {
    setState({ show: false });
  };

  const onOk = () => {
    form.submit();
  };
  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    if (state?.currentItem.length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
      });
    }
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            style={{ color: "#03317c" }}
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          ></Checkbox>
        }
      />
    ),
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const columns = [
    {
      title: <HeaderSearch title="Tên dịch vụ" />,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      width: "200px",
    },
    {
      title: <HeaderSearch title="Thành tiền" />,
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="Đơn giá không BH" />,
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="Đơn giá BH" />,
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="Phụ thu" />,
      dataIndex: "phuThu",
      key: "phuThu",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
  ];

  const onChangeRadio = (e) => {
    setState({ hoanThuoc: e.target.value });
  };

  const onHandleSubmit = (values) => {
    let dsDichVu = state.selectedRowKeys.map((item) => {
      return { nbDichVuCuId: item };
    });
    const { lyDo } = values;
    let data = {
      hoanThuocVatTu: state?.hoanThuoc == 1 ? true : false,
      dsDichVu,
      lyDoDoiTraId: lyDo,
      nbDotDieuTriId: state?.currentItem[0]?.nbDotDieuTriId,
    };
    traDichVu(data);
  };
  return (
    <ModalStyled
      width={960}
      visible={state.show}
      closable={false}
      footer={null}
      onCancel={onCancel}
    >
      <Main>
        <Row className="header">
          <div className="header__left">
            <span style={{ fontWeight: "bold" }}>Yêu cầu hoàn dịch vụ </span>
          </div>
          <div className="header__right">
            <span style={{ color: "#7A869A", fontWeight: "bold" }}>{`${
              state?.currentItem && state?.currentItem[0]?.tenNb
            } - ${
              listgioiTinh?.find(
                (x) =>
                  x.id ==
                  (state?.currentItem && state?.currentItem[0]?.gioiTinh)
              )?.ten
            } - ${
              state?.currentItem && state?.currentItem[0]?.tuoi
            } tuổi`}</span>
          </div>
        </Row>
        <Row style={{ background: "#fff", padding: "20px" }}>
          <span style={{ color: "#FC3B3A", fontWeight: "bold" }}>
            {" "}
            Cảnh báo tồn tại thuốc / vật tư kèm theo
          </span>
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            style={{ width: "100%" }}
            onFinish={onHandleSubmit}
          >
            <Form.Item>
              <Radio.Group onChange={onChangeRadio} defaultValue={state?.hoanThuoc}>
                <Radio value={1}>Hoàn thuốc / vật tư kèm theo</Radio>
                <Radio value={2}>Không hoàn thuốc / vật tư kèm theo</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <div>
                <span style={{ color: "#FC3B3A", fontWeight: "blod" }}>
                  Chọn dịch vụ muốn hoàn
                </span>
                <div className="table-service">
                  <Row className="header-table">
                    <div className="header-table__left">{`Đã chọn ${state?.selectedRowKeys?.length} dịch vụ`}</div>
                  </Row>
                  <TableWrapper
                    columns={columns}
                    dataSource={state?.currentItem}
                    rowSelection={rowSelection}
                    // onRow={onRow}
                    scroll={{ y: 265 }}
                    rowKey={(record) => record?.id}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item
              label="Lý do"
              name="lyDo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn lý do",
                },
              ]}
            >
              <Select data={listLyDo}></Select>
            </Form.Item>
          </Form>
          <Row className="footer">
            <Button className="btn-cancel" onClick={onCancel}>
              Hủy
            </Button>
            <Button className="btn-save" onClick={onOk}>
              Đồng ý
            </Button>
          </Row>
        </Row>
      </Main>
    </ModalStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    listgioiTinh: state.utils.listgioiTinh,
    listLyDo: state.lyDoDoiTra.listLyDo,
  };
};
const mapDispatchToProps = ({
  lyDoDoiTra: { getListLyDo },
  nbDvHoan: { traDichVu },
}) => ({
  getListLyDo,
  traDichVu,
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ModalHoanDichVu));
