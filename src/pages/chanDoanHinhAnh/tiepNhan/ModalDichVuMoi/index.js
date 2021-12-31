import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { ModalStyled, Main } from "./styled";
import { Row, Input, Button } from "antd";
import { connect } from "react-redux";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import imgSearch from "assets/images/template/icSearch.png";
import { useDispatch } from "react-redux";

const ModalDichVuMoi = (props, ref) => {
  const {
    listDichVuKyThuat,
    onSizeChange,
    onChangeInputSearch,
    onSearch,
    totalElements,
    page,
    size,
    onChangeService,
  } = props;
  const [state, _setState] = useState({
    show: false,
    hoanThuoc: 1,
  });

  const {
    chiDinhDichVuCls: { tamTinhTien },
  } = useDispatch();
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (state.nhomDichVuCap2Id)
      onChangeInputSearch({ nhomDichVuCap2Id: state?.nhomDichVuCap2Id });
  }, [state.nhomDichVuCap2Id]);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        parentService: data,
        nhomDichVuCap2Id: data?.nhomDichVuCap2Id,
        thanhTien: 0,
        selectedRowKeys : data.dichVuMoiId ? Array(data.dichVuMoiId)  : undefined,
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
    onChangeService(data);
    onTamTinhTien(data, selectedRowKeys);
  };

  const rowSelection = {
    columnTitle: <HeaderSearch title="Chọn" />,
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state?.selectedRowKeys,
  };

  const onTamTinhTien = (data, selectedRowKeys) => {
    const payload = data.map((item) => ({
      nbDotDieuTriId: state?.parentService?.nbDotDieuTriId,
      nbDichVu: {
        dichVu: {
          ten: item?.dichVu.ten,
          ma: item?.dichVu.ma,
        },
        dichVuId: item?.dichVu.id,
        soLuong: 1,
        loaiDichVu: item?.dichVu.loaiDichVu,
      },
      chiDinhTuDichVuId: state?.parentService?.id,
      chiDinhTuLoaiDichVu: state?.parentService?.loaiDichVu,
    }));
    tamTinhTien(payload).then((s) => {
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );

      setState({
        thanhTien: thanhTien,
        selectedRowKeys,
      });
    });
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

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
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
                <div className="header-table__right">
                  Tổng tiền: {(state?.thanhTien || 0).formatPrice()} đ
                </div>
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
                  onShowSizeChange={handleSizeChange}
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
    listDichVuKyThuat: state.dichVuKyThuat.listData,
    totalElements,
    page,
    size,
  };
};
const mapDispatchToProps = ({
  dichVuKyThuat: { onSizeChange, onChangeInputSearch, onSortChange, onSearch },
}) => ({
  onChangeInputSearch,
  onSizeChange,
  onSortChange,
  onSearch,
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ModalDichVuMoi));
