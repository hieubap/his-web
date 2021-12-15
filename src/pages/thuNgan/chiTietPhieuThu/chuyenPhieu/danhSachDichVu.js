import React, { useState, useEffect } from "react";
import { Checkbox, Input } from "antd";
import { connect } from "react-redux";
import { ContentTranfer } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
function ModalContent(props) {
  const { listAllService, updateListServices, thongTinPhieuThu } = props;
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  useEffect(() => {
    setState({
      data: listAllService,
    });
  }, [listAllService]);
  const onSearchInput = (value) => {
    let valueText = value?.trim().toLowerCase().unsignText();
    let dataSearch = state.data?.filter(
      (option) =>
        option?.tenDichVu?.toLowerCase().unsignText().indexOf(valueText) >= 0
    );
    if (valueText) {
      setState({ data: dataSearch || [] });
    } else {
      setState({ data: listAllService });
    }
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" className="text-center" />,
      width: "30px",
      dataIndex: "stt",
      key: "stt",
      align: "right",
    },
    {
      title: <HeaderSearch title="Thành tiền" className="text-center" />,
      width: "60px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (item) => item?.formatPrice(),
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          search={
            <Input
              placeholder="Tìm tên dịch vụ"
              onChange={(e) => onSearchInput(e.target.value)}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      align: "left",
    },
    {
      title: <HeaderSearch title="Số lượng" className="text-center" />,
      width: "60px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    const listIndex = listAllService.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
    setState({ selectedRowKeys });
    updateListServices(listIndex);
  };
  const onSelectAll = (e) => {
    const { data } = state;
    let res = e.target?.checked ? data : [];
    setState({
      selectedRowKeys: e.target?.checked ? data.map((item) => item.key) : [],
    });
    updateListServices(res);
  };
  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            onChange={onSelectAll}
            disabled={thongTinPhieuThu?.thanhToan}
          >
            Tất cả
          </Checkbox>
        }
      />
    ),
    columnWidth: 50,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
    getCheckboxProps: () => ({
      disabled: thongTinPhieuThu?.thanhToan,
    }),
  };
  let hasSelected = state.selectedRowKeys?.length > 0;
  return (
    <ContentTranfer>
      <div className="title">
        Đã chọn {(hasSelected && state.selectedRowKeys?.length) || 0} dịch vụ
      </div>
      <TableWrapper
        columns={columns}
        dataSource={state.data}
        rowSelection={rowSelection}
        style={{
          marginTop: 0,
        }}
        scroll={{
          y: 100,
        }}
      />
    </ContentTranfer>
  );
}

export default connect(
  (state) => {
    const {
      danhSachDichVu: { listAllService },
      thuNgan: { thongTinPhieuThu },
    } = state;
    return {
      listAllService,
      thongTinPhieuThu,
    };
  },
  ({}) => ({})
)(ModalContent);
