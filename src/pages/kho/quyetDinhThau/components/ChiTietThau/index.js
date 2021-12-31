import React, { useEffect, useMemo, useRef } from "react";
import { Checkbox, Input } from "antd";
import { Main } from "./styled";
import {
  Pagination,
  HeaderSearch,
  TableWrapper,
  Select,
  CreatedWrapper,
} from "components";
import { PAGE_DEFAULT, HIEU_LUC } from "constants/index";
import { combineSort } from "utils";
import { connect, useDispatch } from "react-redux";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
let timer = null;
const dateFormat = "DD-MM-YYYY";

const ChiTietThau = ({
  listAllQuyetDinhThau,
  listQuyetDinhThauChiTiet,
  getListQuyetDinhThauChiTiet,
  listNCC,
  listNSX,
  listDichVuKho,
  listGoiThau,
  listNhomThau,
  listNhomChiPhiBh,
  // listAllQuocGia,
  listXuatXu,
  listLoaiThuocThau,
  dataEditDefault,
  page,
  size,
  total,
  onPageChange,
  onSizeChange,
  onReset,
  updateData,
  dataSearch,
  onEdit,
  dataSort,
  getUtils,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,

  layerId,
}) => {
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refClickBtnAdd = useRef();
  const refSelectRow = useRef();
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: (e) => {
            refClickBtnAdd.current && refClickBtnAdd.current(e);
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
  }, []);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (data?.findIndex((item) => item.id === dataEditDefault?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      onEdit(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  refClickBtnAdd.current = onReset;

  const onClickSort = (key, value) => {
    const sort = { ...dataSort, [key]: value };
    updateData({ dataSortChiTietThau: sort });
    const res = combineSort(sort);
    getListQuyetDinhThauChiTiet({
      page: PAGE_DEFAULT,
      size: size,
      sort: res,
      ...dataSearch,
    });
  };

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListQuyetDinhThauChiTiet({
        ...dataSearch,
        page: 0,
        size: size,
        [name]: value,
        sort: combineSort(dataSort),
      });
    }, 300);
  };

  const onRow = (record, index) => ({
    onClick: (event) => {
      onEdit(record.action);
    },
  });

  const data = useMemo(() => {
    return listQuyetDinhThauChiTiet.map((item, index) => {
      return {
        ...item,
        action: item,
        stt: page * size + index + 1,
      };
    });
  }, [listQuyetDinhThauChiTiet]);

  const dataDichVu = useMemo(() => {
    return listDichVuKho.map((item, index) => item.dichVu);
  }, [listDichVuKho]);

  const quyetDinhThau = useMemo(() => {
    return [{ id: "", ten: "Tất cả Quyết định thầu" }, ...listAllQuyetDinhThau];
  }, [listAllQuyetDinhThau]);

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Dich vụ"
          sort_key="dichVuId"
          onClickSort={onClickSort}
          dataSort={dataSort.dichVuId || 0}
          searchSelect={
            <Select
              placeholder="Tìm dịch vụ"
              data={dataDichVu}
              onChange={(e) => {
                onSearchInput(e, "dichVuId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          sort_key="quyetDinhThauId"
          onClickSort={onClickSort}
          dataSort={dataSort.quyetDinhThauId || 0}
          searchSelect={
            <Select
              placeholder="Tìm quyết định thầu"
              data={listAllQuyetDinhThau}
              onChange={(e) => {
                onSearchInput(e, "quyetDinhThauId");
              }}
              ten="quyetDinhThau"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      render: (item) => {
        return item && item?.quyetDinhThau;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL thầu"
          sort_key="soLuongThau"
          onClickSort={onClickSort}
          dataSort={dataSort.soLuongThau || 0}
          search={
            <Input
              placeholder="Tìm số lượng thầu"
              onChange={(e) => {
                onSearchInput(e.target.value, "soLuongThau");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "soLuongThau",
      key: "soLuongThau",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL được phép mua"
          sort_key="soLuongDuocPhepMua"
          onClickSort={onClickSort}
          dataSort={dataSort.soLuongDuocPhepMua || 0}
          search={
            <Input
              placeholder="Tìm SL được phép mua"
              onChange={(e) => {
                onSearchInput(e.target.value, "soLuongDuocPhepMua");
              }}
            />
          }
        />
      ),
      width: 120,
      align: "right",
      dataIndex: "soLuongDuocPhepMua",
      key: "soLuongDuocPhepMua",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giá nhập sau VAT"
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSort.giaNhapSauVat || 0}
          search={
            <Input
              placeholder="Tìm giá nhập sau VAT"
              onChange={(e) => {
                onSearchInput(e.target.value, "giaNhapSauVat");
              }}
            />
          }
        />
      ),
      width: 120,
      align: "right",
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá không BH"
          sort_key="giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSort.giaKhongBaoHiem || 0}
          search={
            <Input
              placeholder="Tìm đơn giá không BH"
              onChange={(e) => {
                onSearchInput(e.target.value, "giaKhongBaoHiem");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá BH"
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSort.giaBaoHiem || 0}
          search={
            <Input
              placeholder="Tìm đơn giá BH"
              onChange={(e) => {
                onSearchInput(e.target.value, "giaBaoHiem");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phụ thu"
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSort.giaPhuThu || 0}
          search={
            <Input
              placeholder="Tìm đơn giá phụ thu"
              onChange={(e) => {
                onSearchInput(e.target.value, "giaPhuThu");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Quy cách"
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSort.quyCach || 0}
          search={
            <Input
              placeholder="Tìm quy cách"
              onChange={(e) => {
                onSearchInput(e.target.value, "quyCach");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyCach",
      key: "quyCach",
    },
    {
      title: (
        <HeaderSearch
          title="Nhà cung cấp"
          sort_key="nhaCungCapId"
          onClickSort={onClickSort}
          dataSort={dataSort.nhaCungCapId || 0}
          searchSelect={
            <Select
              placeholder="Tìm nhà cung cấp"
              data={listNCC}
              onChange={(e) => {
                onSearchInput(e, "nhaCungCapId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaCungCapId",
      key: "nhaCungCapId",
      render: (item) => {
        return listNCC && (listNCC.find((e) => e.id === item) || [])?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã gói thầu"
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSort.goiThau || 0}
          searchSelect={
            <Select
              placeholder="Tìm mã gói thầu"
              data={listGoiThau}
              onChange={(e) => {
                onSearchInput(e, "goiThau");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "goiThau",
      key: "goiThau",
      render: (item) => {
        return (
          listGoiThau && (listGoiThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số visa"
          sort_key="soVisa"
          onClickSort={onClickSort}
          dataSort={dataSort.soVisa || 0}
          search={
            <Input
              placeholder="Tìm số visa"
              onChange={(e) => {
                onSearchInput(e.target.value, "soVisa");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soVisa",
      key: "soVisa",
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm thầu"
          sort_key="nhomThau"
          onClickSort={onClickSort}
          dataSort={dataSort.nhomThau || 0}
          searchSelect={
            <Select
              placeholder="Tìm nhóm thầu"
              data={listNhomThau}
              onChange={(e) => {
                onSearchInput(e, "nhomThau");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomThau",
      key: "nhomThau",
      render: (item) => {
        return (
          listNhomThau && (listNhomThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm chi phí"
          sort_key="nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSort.nhomChiPhiBh || 0}
          searchSelect={
            <Select
              placeholder="Tìm nhóm thầu"
              data={listNhomChiPhiBh}
              onChange={(e) => {
                onSearchInput(e, "nhomChiPhiBh");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomChiPhiBh",
      key: "nhomChiPhiBh",
      render: (item) => {
        return (
          listNhomChiPhiBh &&
          (listNhomChiPhiBh.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỷ lệ thanh toán BH"
          sort_key="tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSort.tyLeBhTt || 0}
          search={
            <Input
              placeholder="Tìm tỷ lệ TTBH"
              onChange={(e) => {
                onSearchInput(e.target.value, "tyLeBhTt");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "tyLeBhTt",
      key: "tyLeBhTt",
    },
    {
      title: (
        <HeaderSearch
          title="Ngưỡng thầu"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSort.nguongThau || 0}
          search={
            <Input
              placeholder="Tìm ngưỡng thầu"
              onChange={(e) => {
                onSearchInput(e.target.value, "nguongThau");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "nguongThau",
      key: "nguongThau",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại thuốc"
          sort_key="loaiThuoc"
          onClickSort={onClickSort}
          dataSort={dataSort.loaiThuoc || 0}
          searchSelect={
            <Select
              placeholder="Tìm loại thuốc"
              data={listLoaiThuocThau}
              onChange={(e) => {
                onSearchInput(e, "loaiThuoc");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiThuoc",
      key: "loaiThuoc",
      render: (item) => {
        return (
          listLoaiThuocThau &&
          (listLoaiThuocThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nước sản xuất"
          sort_key="xuatXuId"
          onClickSort={onClickSort}
          dataSort={dataSort.xuatXuId || 0}
          searchSelect={
            <Select
              placeholder="Tìm nước sản xuất"
              data={listXuatXu}
              onChange={(e) => {
                onSearchInput(e, "xuatXuId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "xuatXu",
      key: "nuocSanXuatId",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhà sản xuất"
          sort_key="nhaSanXuatId"
          onClickSort={onClickSort}
          dataSort={dataSort.nhaSanXuatId || 0}
          searchSelect={
            <Select
              placeholder="Tìm nhà sản xuất"
              data={listNSX}
              onChange={(e) => {
                onSearchInput(e, "nhaSanXuatId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaSanXuatId",
      key: "nhaSanXuatId",
      render: (item) => {
        return (
          item && listNSX && (listNSX.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trần bảo hiểm"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSort.tranBh || 0}
          search={
            <Input
              placeholder="Tìm trần bảo hiểm"
              onChange={(e) => {
                onSearchInput(e.target.value, "tranBh");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "tranBh",
      key: "tranBh",
    },
    {
      title: (
        <HeaderSearch
          title="Giá trần"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSort.giaTran || 0}
          search={
            <Input
              placeholder="Tìm ngưỡng thầu"
              onChange={(e) => {
                onSearchInput(e.target.value, "giaTran");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "giaTran",
      key: "giaTran",
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSort.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={(e) => {
                onSearchInput(e, "active");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  return (
    <Main>
      <TableWrapper
        scroll={{ x: 1000 }}
        classNameRow={"custom-header"}
        styleMain={{ marginTop: 0 }}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={[
          {
            content: (
              <>
                <Select
                  defaultValue={""}
                  data={quyetDinhThau}
                  placeholder="Chọn quyết định thầu"
                  onChange={(value) => {
                    onSearchInput(value, "quyetDinhThauId");
                  }}
                  ten="quyetDinhThau"
                />
              </>
            ),
          },
          {
            title: "Thêm mới",
            onClick: onReset,
            buttonHeaderIcon: (
              <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
            ),
          },
          {
            className: "btn-change-full-table",
            title: <Icon component={showFullTable ? thuNho : showFull} />,
            onClick: handleChangeshowTable,
          },

          {
            className: "btn-collapse",
            title: (
              <Icon component={collapseStatus ? extendTable : extendChiTiet} />
            ),
            onClick: handleCollapsePane,
          },
        ]}
        columns={columns}
        dataSource={data}
        onRow={onRow}
        rowClassName={(record, index) =>
          dataEditDefault?.id === record.id
            ? "row-actived row-id-" + record.id
            : "row-id-" + record.id
        }
      />
      {total && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          listData={data}
          total={total}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    quyetDinhThauChiTiet: { listQuyetDinhThauChiTiet },
    quyetDinhThau: { listAllQuyetDinhThau },
    nhaSanXuat: { listNSX, listNCC },
    // ttHanhChinh: {listAllQuocGia},
    xuatXu: { listXuatXu },
    dichVuKho: { listDichVuKho },
    khoa: { listAllKhoa },
    utils: { listGoiThau, listNhomThau, listNhomChiPhiBh, listLoaiThuocThau },
  } = state;

  return {
    listQuyetDinhThauChiTiet: listQuyetDinhThauChiTiet || [],
    listAllQuyetDinhThau,
    listNSX,
    listNCC,
    // listAllQuocGia,
    listXuatXu,
    listDichVuKho,
    listAllKhoa,
    listGoiThau,
    listNhomThau,
    listNhomChiPhiBh,
    listLoaiThuocThau,
  };
};
const mapDispatchToProps = ({
  quyetDinhThau: { getListAllQuyetDinhThau },
  quyetDinhThauChiTiet: { getListQuyetDinhThauChiTiet },
  nhaSanXuat: { getListNhaSanXuat },
  // ttHanhChinh: {getListAllQuocGia},
  xuatXu: { getListXuatXu },
  dichVuKho: { onSearch: getListDichVuKho },
  utils: { getUtils },
}) => ({
  getListAllQuyetDinhThau,
  getListNhaSanXuat,
  getListQuyetDinhThauChiTiet,
  // getListAllQuocGia,
  getListXuatXu,
  getListDichVuKho,
  getUtils,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChiTietThau);
