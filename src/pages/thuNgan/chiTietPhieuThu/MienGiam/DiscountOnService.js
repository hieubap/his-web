import React, { useEffect, useState } from "react";
import { InputNumber, Input, Checkbox } from "antd";
import cloneDeep from "lodash/cloneDeep";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { formatDecimal } from "utils";
let timer = null;

const DiscountOnService = ({
  listAllServices,
  updateListServices,
  thongTinPhieuThu,
}) => {
  const [state, _setState] = useState({
    data: [],
    selectedRowKeys: [],
    discount: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    setState({ data: cloneDeep(listAllServices) });
  }, [listAllServices]);

  const onSearchInput = (e) => {
    e.persist();
    clearTimeout(timer);
    timer = setTimeout(() => {
      const searchValue = e.target.value;
      const valueText = searchValue?.trim().toLowerCase().unsignText();
      const dataSearch = !!valueText
        ? state.data?.filter(
          (option) =>
            option?.tenDichVu
              ?.toLowerCase()
              .unsignText()
              .indexOf(valueText) >= 0
        )
        : listAllServices;
      const { discount } = state;
      dataSearch.map((item) => {
        item.phanTramMienGiamDichVu = discount;
        return item;
      });
      setState({ data: dataSearch });
      updateListServices(dataSearch);
    }, 300);
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
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          search={
            <Input placeholder="Tìm tên dịch vụ" onChange={onSearchInput} />
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
    {
      title: <HeaderSearch title="% Miễn giảm" className="text-center" />,
      width: "60px",
      dataIndex: "phanTramMienGiamDichVu",
      key: "phanTramMienGiamDichVu",
      align: "right",
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    const { data, discount } = state;
    const formattedData = data.map((item) => {
      if (selectedRowKeys.includes(item.key) && discount >= 0) {
        item.phanTramMienGiamDichVu = discount;
        return item;
      }
      return null;
    }).filter(item1 => item1);
    setState({ selectedRowKeys });
    updateListServices(formattedData);
  };

  const onSelectAll = (e) => {
    const { data, discount } = state;
    const formattedData = data.map((item) => {
      item.phanTramMienGiamDichVu = discount;
      return item;
    });
    setState({
      selectedRowKeys: e.target?.checked ? data.map((item) => item.key) : [],
    });
    updateListServices(formattedData);
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            onChange={onSelectAll}
            disabled={thongTinPhieuThu.thanhToan}
          />
        }
      />
    ),
    columnWidth: 20,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
    getCheckboxProps: () => ({
      disabled: thongTinPhieuThu.thanhToan,
    }),
  };

  const onChangeInput = (value) => {
    let check = false;
    const { data, selectedRowKeys } = state;
    const formattedData = data.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        check = true;
        item.phanTramMienGiamDichVu = value;
      }
      return item;
    });
    let newState = { discount: value };
    if (check) {
      newState.data = formattedData;
      setState({ ...newState });
      updateListServices(formattedData);
    }
  };

  return (
    <div className="receipt">
      <div className="item-row text-bold">% miễn giảm</div>
      <div className="item-row">
        <div className="title">Điền % miễn giảm áp dụng</div>{" "}
        <div className="num">
          <InputNumber
            type="number"
            placeholder="Nhập số %"
            onChange={onChangeInput}
            disabled={thongTinPhieuThu.thanhToan}
            min={0}
            max={100}
          />{" "}
          %
        </div>
      </div>
      <span className="text-bold subtitle">
        Chọn dịch vụ để áp dụng miễn giảm
      </span>
      <div className="miengiam-noidung">
        <div className="title-2 text-bolder">
          Đã chọn {state.selectedRowKeys.length} dịch vụ
        </div>
        <TableWrapper
          columns={columns}
          dataSource={state.data}
          rowSelection={rowSelection}
          style={{
            marginTop: 0,
          }}
          scroll={{
            y: 200,
          }}
        />
      </div>
    </div>
  );
};

export default DiscountOnService;
