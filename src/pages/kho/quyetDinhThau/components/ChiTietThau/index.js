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
    return [{ id: "", ten: "T???t c??? Quy???t ?????nh th???u" }, ...listAllQuyetDinhThau];
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
          title="Dich v???"
          sort_key="dichVuId"
          onClickSort={onClickSort}
          dataSort={dataSort.dichVuId || 0}
          searchSelect={
            <Select
              placeholder="T??m d???ch v???"
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
          title="Quy???t ?????nh th???u"
          sort_key="quyetDinhThauId"
          onClickSort={onClickSort}
          dataSort={dataSort.quyetDinhThauId || 0}
          searchSelect={
            <Select
              placeholder="T??m quy???t ?????nh th???u"
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
          title="SL th???u"
          sort_key="soLuongThau"
          onClickSort={onClickSort}
          dataSort={dataSort.soLuongThau || 0}
          search={
            <Input
              placeholder="T??m s??? l?????ng th???u"
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
          title="SL ???????c ph??p mua"
          sort_key="soLuongDuocPhepMua"
          onClickSort={onClickSort}
          dataSort={dataSort.soLuongDuocPhepMua || 0}
          search={
            <Input
              placeholder="T??m SL ???????c ph??p mua"
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
          title="Gi?? nh???p sau VAT"
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSort.giaNhapSauVat || 0}
          search={
            <Input
              placeholder="T??m gi?? nh???p sau VAT"
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
          title="????n gi?? kh??ng BH"
          sort_key="giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSort.giaKhongBaoHiem || 0}
          search={
            <Input
              placeholder="T??m ????n gi?? kh??ng BH"
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
          title="????n gi?? BH"
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSort.giaBaoHiem || 0}
          search={
            <Input
              placeholder="T??m ????n gi?? BH"
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
          title="Ph??? thu"
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSort.giaPhuThu || 0}
          search={
            <Input
              placeholder="T??m ????n gi?? ph??? thu"
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
          title="Quy c??ch"
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSort.quyCach || 0}
          search={
            <Input
              placeholder="T??m quy c??ch"
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
          title="Nh?? cung c???p"
          sort_key="nhaCungCapId"
          onClickSort={onClickSort}
          dataSort={dataSort.nhaCungCapId || 0}
          searchSelect={
            <Select
              placeholder="T??m nh?? cung c???p"
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
          title="M?? g??i th???u"
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSort.goiThau || 0}
          searchSelect={
            <Select
              placeholder="T??m m?? g??i th???u"
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
          title="S??? visa"
          sort_key="soVisa"
          onClickSort={onClickSort}
          dataSort={dataSort.soVisa || 0}
          search={
            <Input
              placeholder="T??m s??? visa"
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
          title="Nh??m th???u"
          sort_key="nhomThau"
          onClickSort={onClickSort}
          dataSort={dataSort.nhomThau || 0}
          searchSelect={
            <Select
              placeholder="T??m nh??m th???u"
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
          title="Nh??m chi ph??"
          sort_key="nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSort.nhomChiPhiBh || 0}
          searchSelect={
            <Select
              placeholder="T??m nh??m th???u"
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
          title="T??? l??? thanh to??n BH"
          sort_key="tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSort.tyLeBhTt || 0}
          search={
            <Input
              placeholder="T??m t??? l??? TTBH"
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
          title="Ng?????ng th???u"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSort.nguongThau || 0}
          search={
            <Input
              placeholder="T??m ng?????ng th???u"
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
          title="Lo???i thu???c"
          sort_key="loaiThuoc"
          onClickSort={onClickSort}
          dataSort={dataSort.loaiThuoc || 0}
          searchSelect={
            <Select
              placeholder="T??m lo???i thu???c"
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
          title="N?????c s???n xu???t"
          sort_key="xuatXuId"
          onClickSort={onClickSort}
          dataSort={dataSort.xuatXuId || 0}
          searchSelect={
            <Select
              placeholder="T??m n?????c s???n xu???t"
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
          title="Nh?? s???n xu???t"
          sort_key="nhaSanXuatId"
          onClickSort={onClickSort}
          dataSort={dataSort.nhaSanXuatId || 0}
          searchSelect={
            <Select
              placeholder="T??m nh?? s???n xu???t"
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
          title="Tr???n b???o hi???m"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSort.tranBh || 0}
          search={
            <Input
              placeholder="T??m tr???n b???o hi???m"
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
          title="Gi?? tr???n"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={dataSort.giaTran || 0}
          search={
            <Input
              placeholder="T??m ng?????ng th???u"
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
          title="C?? hi???u l???c"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSort.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Ch???n hi???u l???c"
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
                  placeholder="Ch???n quy???t ?????nh th???u"
                  onChange={(value) => {
                    onSearchInput(value, "quyetDinhThauId");
                  }}
                  ten="quyetDinhThau"
                />
              </>
            ),
          },
          {
            title: "Th??m m???i",
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
