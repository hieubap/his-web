import React, { useEffect, useState } from "react";
import { Input, Checkbox, message } from "antd";
import cloneDeep from "lodash/cloneDeep";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { Select } from "components";
import { formatDecimal } from "utils";
import { MA_GIAM_GIA } from "./constants";
import { openInNewTab } from "../../../../utils";
let timer = null;

const DiscountByVoucher = ({
  listVouchers,
  listAllServices,
  onUpdateVoucherServices,
  thongTinPhieuThu,
  setDisabledButton,
}) => {
  const [state, _setState] = useState({
    data: [],
    selectedRowKeys: [],
    moTa: "",
    checkAll: false,
    indeterminate: false,
    showData: true,
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
      setState({ data: dataSearch });
      onUpdateVoucherServices(dataSearch);
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
      align: "center",
    },
    // {
    //   title: <HeaderSearch title="Voucher" className="text-center" />,
    //   width: "60px",
    //   dataIndex: "maGiamGia",
    //   key: "phanTramMienGiamDichVu",
    //   align: "center",
    // },
  ];

  const onSelectChange = (selectedRowKeys) => {
    const { data, maGiamGiaId, chonLaiDichVu } = state;
    setState({
      selectedRowKeys,
      checkAll:
        !!state.data.length && selectedRowKeys.length === state.data.length,
      indeterminate:
        !!state.data.length &&
        !!selectedRowKeys.length &&
        selectedRowKeys.length < state.data.length,
    });

    if (chonLaiDichVu && (!selectedRowKeys || selectedRowKeys.length === 0)) {
      message.warning("Bắt buộc phải chọn ít nhất 1 DV");
      setDisabledButton(true);
    } else {
      const dsDichVuId = data
        .filter((item) => selectedRowKeys.includes(item.key))
        .map((service) => service.id);
      setDisabledButton(false);
      onUpdateVoucherServices(maGiamGiaId, dsDichVuId);
    }
  };

  const onSelectAll = (e) => {
    const { data } = state;
    setState({
      selectedRowKeys: e.target?.checked ? data.map((item) => item.key) : [],
      checkAll: !state.checkAll,
      indeterminate: false,
    });

    setDisabledButton(!e.target?.checked);
    if (!e.target?.checked) {
      message.warning("Bắt buộc phải chọn ít nhất 1 DV");
    }
  };

  const onChangeVoucher = (value, option) => {
    setDisabledButton(false);
    let formattedData = [];
    let dsDichVuId = [];
    let voucherId = 0;
    const voucher = option?.lists;
    if (value && option.lists) {
      if (
        voucher.hinhThucGiamGia === MA_GIAM_GIA.HINH_THUC_GIAM_GIA.THEO_DICH_VU
      ) {
        if (
          voucher.loaiApDungGiamGia ===
          MA_GIAM_GIA.LOAI_AP_DUNG_GIAM_GIA.THEO_DICH_VU
        ) {
          formattedData = listAllServices.filter((item) => {
            return voucher.dsDichVuId.indexOf(item.id) !== -1;
          });
        }
        if (
          voucher.loaiApDungGiamGia ===
          MA_GIAM_GIA.LOAI_AP_DUNG_GIAM_GIA.THEO_NHOM_DICH_VU
        ) {
          formattedData = listAllServices.filter((item) => {
            return (
              voucher.dsNhomDichVuCap1Id.indexOf(item.nhomDichVuCap1Id) !== -1
            );
          });
        }
        if (voucher.chonLaiDichVu) {
          dsDichVuId = formattedData.map((item, index) => item.id);
        }
        setState({ showData: true });
      }

      if (
        voucher.hinhThucGiamGia ===
        MA_GIAM_GIA.HINH_THUC_GIAM_GIA.THEO_PHIEU_THU
      ) {
        setState({ showData: false });
      }
      voucherId = voucher.id;
      setState({
        selectedRowKeys: formattedData.map((item) => item.key) || [],
        checkAll: formattedData && formattedData.length === state.data.length,
        indeterminate:
          !!state.data.length &&
          !!formattedData.length &&
          formattedData.length < state.data.length,
        chonLaiDichVu: voucher.chonLaiDichVu || false,
        maGiamGiaId: voucher.id,
      });
    } else {
      dsDichVuId = [];
      setState({ maGiamGiaId: 0 });
    }

    setState({ moTa: option?.lists.moTa });
    onUpdateVoucherServices(voucherId, dsDichVuId);
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            onChange={onSelectAll}
            disabled={thongTinPhieuThu.thanhToan || !state.chonLaiDichVu}
            checked={state.checkAll}
            indeterminate={state.indeterminate}
          />
        }
      />
    ),
    columnWidth: 20,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
    getCheckboxProps: () => ({
      disabled: thongTinPhieuThu.thanhToan || !state.chonLaiDichVu,
    }),
  };

  return (
    <div className="receipt">
      <div
        onClick={() => openInNewTab("/danh-muc/chuong-trinh-giam-gia")}
        className="item-row-voucher text-bold pointer">Voucher áp dụng</div>
      <div className="item-row-select">
        <Select
          style={{ width: "50%" }}
          data={listVouchers}
          placeholder="Chọn mã voucher áp dụng"
          onChange={onChangeVoucher}
          disabled={thongTinPhieuThu.thanhToan}
          ten="maVoucher"
        />
      </div>
      <div className="describe">{state.moTa}</div>
      {state.showData && (
        <>
          <span className="text-bold subtitle">
            Chọn dịch vụ để áp dụng voucher
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
        </>
      )}
    </div>
  );
};

export default DiscountByVoucher;
