import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { ModalStyled, Main } from "./styled";
import { Col, Row, Form, Input, Radio, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import imgSearch from "assets/images/template/icSearch.png";

const ModalDichVuMoi = (props, ref) => {
  const {
    listDichVuKyThuat,
    onSizeChange,
    onChangeInputSearch,
    onSortChange,
    onSearch,
    totalElements,
    page,
    size,
    onChangeService
  } = props;
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

  useEffect(() => {
    onSearch({});
  }, []);

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
    },
  }));
  const onCancel = () => {
    setState({ show: false });
  };

  const onOk = () => {
    setState({ show: false });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    setState({ selectedRowKeys });
    onChangeService(data)
  };

  const rowSelection = {
    columnTitle: <HeaderSearch title="Chọn" />,
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const columns = [
    {
      title: <HeaderSearch title="Tên dịch vụ" />,
      dataIndex: "dichVu",
      key: "dichVu",
      width: "150px",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: <HeaderSearch title="Giá" />,
      dataIndex: "dichVu",
      key: "dichVu",
      width: "100px",
      align: "left",
      render: (item) => {
        return `${item?.giaKhongBaoHiem} | BH: ${item?.giaBaoHiem} | Phụ thu: ${item?.giaPhuThu}`;
      },
    },
  ];

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onSearchService = (key) => (e) => {
    onChangeInputSearch({ [key]: e?.target?.value });
  };

  return (
    <ModalStyled
      width={860}
      visible={state.show}
      closable={false}
      footer={null}
      onCancel={onCancel}
    >
      <Main>
        <Row style={{ background: "#fff", padding: "20px" }}>
          <div className="input-search">
            <img src={imgSearch} alt="imgSearch" />
            <Input
              placeholder="Nhập tên dịch vụ"
              onChange={onSearchService("dichVu.ten")}
            ></Input>
          </div>
          <div style={{ marginTop: "20px" }}>
            <div className="table-service">
              <Row className="header-table">
                <div className="header-table__left">{`Đã chọn`}</div>
              </Row>
              <TableWrapper
                columns={columns}
                dataSource={listDichVuKyThuat}
                rowSelection={{ type: "radio", ...rowSelection }}
                scroll={{ y: 265 }}
                rowKey={(record) => record?.id}
              />
              {!!totalElements ? (
                <Pagination
                  onChange={onChangePage}
                  current={page + 1}
                  pageSize={size}
                  total={totalElements}
                  onShowSizeChange={onSizeChange}
                  stylePagination={{ flex: 1, justifyContent: "flex-start" }}
                />
              ) : null}
            </div>
          </div>
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
  const {
    dichVuKyThuat: { totalElements, page, size },
  } = state;
  return {
    listgioiTinh: state.utils.listgioiTinh,
    listLyDo: state.lyDoDoiTra.listLyDo,
    listDichVuKyThuat: state.dichVuKyThuat.listData,
    totalElements,
    page,
    size,
  };
};
const mapDispatchToProps = ({
  lyDoDoiTra: { getListLyDo },
  dichVuKyThuat: { onSizeChange, onChangeInputSearch, onSortChange, onSearch },
}) => ({
  getListLyDo,
  onChangeInputSearch,
  onSizeChange,
  onChangeInputSearch,
  onSortChange,
  onSearch,
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ModalDichVuMoi));
