import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { ModalStyled, Main } from "./styled";
import { Row, Form, Radio, Button, Checkbox } from "antd";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
const ModalHoanDichVu = (props, ref) => {
  const {
    utils: { listgioiTinh },
    lyDoDoiTra: { listLyDo },
    chiDinhDichVuVatTu: { listDvVatTu },
    chiDinhDichVuTuTruc: { listDvThuoc },
    auth: { auth }
  } = useSelector((state) => state);
  const {
    nbDvHoan: { traDichVu },
    chiDinhDichVuVatTu: { getListDichVuVatTu },
    chiDinhDichVuTuTruc: { getListDichVuThuoc },
  } = useDispatch();
  const [state, _setState] = useState({
    show: false,
    hoanThuoc: 1,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [form] = Form.useForm();

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

  useEffect(() => {
    if (state.currentItem) {
      getListDichVuVatTu({
        nbDotDieuTriId: state.currentItem[0]?.nbDotDieuTriId,
      });
      getListDichVuThuoc({
        nbDotDieuTriId: state.currentItem[0]?.nbDotDieuTriId,
      });
    }
  }, [state?.currentItem]);

  const onCancel = () => {
    setState({ show: false });
    form.resetFields();
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
      title: <HeaderSearch title="T??n d???ch v???" />,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      width: "200px",
    },
    {
      title: <HeaderSearch title="Th??nh ti???n" />,
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="????n gi?? kh??ng BH" />,
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="????n gi?? BH" />,
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      width: "80px",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="Ph??? thu" />,
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
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
      hoanThuocVatTu: state?.hoanThuoc === 1 ? true : false,
      dsDichVu,
      lyDoDoiTraId: lyDo,
      nbDotDieuTriId: state?.currentItem[0]?.nbDotDieuTriId,
      nguoiYeuCauId: auth?.id
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
            <span style={{ fontWeight: "bold" }}>Y??u c???u ho??n d???ch v??? </span>
          </div>
          <div className="header__right">
            <span style={{ color: "#7A869A", fontWeight: "bold" }}>{`${
              state?.currentItem && state?.currentItem[0]?.tenNb
            } - ${
              listgioiTinh?.find(
                (x) =>
                  x.id ===
                  (state?.currentItem && state?.currentItem[0]?.gioiTinh)
              )?.ten
            } - ${
              state?.currentItem && state?.currentItem[0]?.tuoi
            } tu???i`}</span>
          </div>
        </Row>
        <Row style={{ background: "#fff", padding: "20px" }}>
          {(listDvVatTu?.length > 0 || listDvThuoc?.length > 0) && (
            <span style={{ color: "#FC3B3A", fontWeight: "bold" }}>
              C???nh b??o t???n t???i thu???c / v???t t?? k??m theo
            </span>
          )}
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            style={{ width: "100%" }}
            onFinish={onHandleSubmit}
          >
            {(listDvVatTu?.length > 0 || listDvThuoc?.length > 0) && (
              <Form.Item>
                <Radio.Group
                  onChange={onChangeRadio}
                  defaultValue={state?.hoanThuoc}
                >
                  <Radio value={1}>Ho??n thu???c / v???t t?? k??m theo</Radio>
                  <Radio value={2}>Kh??ng ho??n thu???c / v???t t?? k??m theo</Radio>
                </Radio.Group>
              </Form.Item>
            )}
            <Form.Item>
              <div>
                <span style={{ color: "#FC3B3A", fontWeight: "blod" }}>
                  Ch???n d???ch v??? mu???n ho??n
                </span>
                <div className="table-service">
                  <Row className="header-table">
                    <div className="header-table__left">{`???? ch???n ${state?.selectedRowKeys?.length} d???ch v???`}</div>
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
              label="L?? do"
              name="lyDo"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n l?? do",
                },
              ]}
            >
              <Select data={listLyDo}></Select>
            </Form.Item>
          </Form>
          <Row className="footer">
            <Button className="btn-cancel" onClick={onCancel}>
              H???y
            </Button>
            <Button className="btn-save" onClick={onOk}>
              ?????ng ??
            </Button>
          </Row>
        </Row>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalHoanDichVu);
