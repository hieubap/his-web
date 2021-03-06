import React, { useEffect, useState, useMemo } from "react";
import { Checkbox, Input, DatePicker } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { HIEU_LUC } from "constants/index";
import { connect } from "react-redux";
import { combineSort } from "utils";
import moment from "moment";
const dateFormat = "DD-MM-YYYY";

const DanhSach = (props) => {
  const data = useMemo(() => {
    return props.listQuyetDinhThauChiTiet.map((item, index) => {
      return {
        ...item,
        action: item,
        stt: props.page * props.size + index + 1,
      };
    });
  }, [props.listQuyetDinhThauChiTiet]);

  const dataDichVu = useMemo(() => {
    return props.listDichVuKho.map((item, index) => item.dichVu);
  }, [props.listDichVuKho]);

  const onClickSort = (key, value) => {
    props.onChangeSort({
      [key]: value,
    });
  };
  useEffect(() => {
    const res = combineSort(props.dataSortColumn);
    props.getListQuyetDinhThauChiTiet({ sort: res });
  }, []);

  useEffect(() => {
    props.getListAllQuyetDinhThau({});
    props.getListNhaSanXuat({ loaiNhaSanXuat: 10 });
    props.getListNhaSanXuat({ loaiNhaSanXuat: 20 });
    // props.getListAllQuocGia({});
    props.getListXuatXu({ page: 0, size: 1000, active: true });
    props.getListDichVuKho({ size: 9999999 });
    props.searchDuongDung({});
    props.searchHoatChat({});
    props.getListDonViTinh({});
    props.getListNguonNhapKho({ thau: true, active: true, size: 9999999 });
    props.getListAllKhoa({});
    props.getUtils({ name: "GoiThau" });
    props.getUtils({ name: "NhomThau" });
    props.getUtils({ name: "NhomChiPhiBh" });
    props.getUtils({ name: "LoaiDichVuThuocVatTuHoaChat" });
    props.getUtils({ name: "loaiThau" });
    props.getUtils({ name: "trangThaiThau" });
    props.getUtils({ name: "LoaiThuocThau" });
  }, {});

  const onSearchInput = (value, key) => {
    props.onChangeInputSearch({
      [key]: value,
    });
  };
  const onChangePage = (page) => {
    props.getListQuyetDinhThauChiTiet({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    props.onChangeSize({ size });
  };

  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Quy???t ?????nh th???u"
          sort_key="quyetDinhThauId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.quyetDinhThauId || 0}
          searchSelect={
            <Select
              placeholder="T??m quy???t ?????nh th???u"
              data={props.listAllQuyetDinhThau}
              onChange={(e) => {
                onSearchInput(e, "quyetDinhThauId");
              }}
              ten={"quyetDinhThau"}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      fixed: "left",
      render: (item) => {
        return item && item?.quyetDinhThau;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Dich v???"
          sort_key="dichVuId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.dichVuId || 0}
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
      fixed: "left",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL th???u"
          sort_key="soLuongThau"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.soLuongThau || 0}
          search={
            <Input
              placeholder="T??m s??? l?????ng th???u"
              onChange={(e) => {
                onSearchInput(e, "soLuongThau");
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
          dataSort={props.dataSortColumn.soLuongDuocPhepMua || 0}
          search={
            <Input
              placeholder="T??m SL ???????c ph??p mua"
              onChange={(e) => {
                onSearchInput(e, "soLuongDuocPhepMua");
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
          dataSort={props.dataSortColumn.giaNhapSauVat || 0}
          search={
            <Input
              placeholder="T??m lo???i d???ch v???"
              onChange={(e) => {
                onSearchInput(e, "giaNhapSauVat");
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
          dataSort={props.dataSortColumn.giaKhongBaoHiem || 0}
          search={
            <Input
              placeholder="T??m ????n gi?? kh??ng BH"
              onChange={(e) => {
                onSearchInput(e, "giaKhongBaoHiem");
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
          dataSort={props.dataSortColumn.giaBaoHiem || 0}
          search={
            <Input
              placeholder="T??m ????n gi?? BH"
              onChange={(e) => {
                onSearchInput(e, "giaBaoHiem");
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
          dataSort={props.dataSortColumn.giaPhuThu || 0}
          search={
            <Input
              placeholder="T??m ????n gi?? ph??? thu"
              onChange={(e) => {
                onSearchInput(e, "giaPhuThu");
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
          dataSort={props.dataSortColumn.quyCach || 0}
          search={
            <Input
              placeholder="T??m quy c??ch"
              onChange={(e) => {
                onSearchInput(e, "quyCach");
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
          dataSort={props.dataSortColumn.nhaCungCapId || 0}
          searchSelect={
            <Select
              placeholder="T??m nh?? cung c???p"
              data={props.listNCC}
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
        return (
          props.listNCC && (props.listNCC.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="M?? g??i th???u"
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.goiThau || 0}
          searchSelect={
            <Select
              placeholder="T??m m?? g??i th???u"
              data={props.listGoiThau}
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
          props.listGoiThau &&
          (props.listGoiThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="S??? visa"
          sort_key="soVisa"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.soVisa || 0}
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
          dataSort={props.dataSortColumn.nhomThau || 0}
          searchSelect={
            <Select
              placeholder="T??m nh??m th???u"
              data={props.listNhomThau}
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
          props.listNhomThau &&
          (props.listNhomThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m chi ph??"
          sort_key="nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.nhomChiPhiBh || 0}
          searchSelect={
            <Select
              placeholder="T??m nh??m th???u"
              data={props.listNhomChiPhiBh}
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
          props.listNhomChiPhiBh &&
          (props.listNhomChiPhiBh.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??? l??? thanh to??n BH"
          sort_key="tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.tyLeBhTt || 0}
          search={
            <Input
              placeholder="T??m t??? l??? TTBH"
              onChange={(e) => {
                onSearchInput(e, "tyLeBhTt");
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
          dataSort={props.dataSortColumn.nguongThau || 0}
          search={
            <Input
              placeholder="T??m ng?????ng th???u"
              onChange={(e) => {
                onSearchInput(e, "nguongThau");
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
          dataSort={props.dataSortColumn.loaiThuoc || 0}
          searchSelect={
            <Select
              placeholder="T??m lo???i thu???c"
              data={props.listLoaiThuocThau}
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
          props.listLoaiThuocThau &&
          (props.listLoaiThuocThau.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="N?????c s???n xu???t"
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["xuatXu.ten"] || 0}
          searchSelect={
            <Select
              placeholder="T??m nh?? s???n xu???t"
              data={props.listXuatXu}
              onChange={(e) => {
                onSearchInput(e, "xuatXuId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "xuatXu",
      key: "xuatXu",
      render: (item) => {
        return (item && item?.ten) || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh?? s???n xu???t"
          sort_key="nhaSanXuatId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.nhaSanXuatId || 0}
          searchSelect={
            <Select
              placeholder="T??m nh?? s???n xu???t"
              data={props.listNSX}
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
          props.listNSX && (props.listNSX.find((e) => e.id === item) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tr???n b???o hi???m"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.tranBh || 0}
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
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Gi?? tr???n"
          sort_key="nguongThau"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.giaTran || 0}
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
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="???????ng d??ng"
          sort_key="duongDung"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.duongDung || 0}
          searchSelect={
            <Select
              placeholder="T??m ???????ng d??ng"
              data={props.listDuongDung}
              onChange={(e) => {
                onSearchInput(e, "duongDung");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVuId",
      key: "duongDung",
      render: (item) => {
        "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="M?? ???????ng d??ng"
          sort_key="maDuongDung"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.maDuongDung || 0}
          searchSelect={
            <Select
              placeholder="T??m ???????ng d??ng"
              data={props.listDuongDung}
              onChange={(e) => {
                onSearchInput(e, "maDuongDung");
              }}
              ten="ma"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "maDuongDung",
      key: "maDuongDung",
    },
    {
      title: (
        <HeaderSearch
          title="M?? ho???t ch???t"
          sort_key="maHoatChat"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.maHoatChat || 0}
          searchSelect={
            <Select
              placeholder="T??m m?? ho???t ch???t"
              data={props.listHoatChat}
              onChange={(e) => {
                onSearchInput(e, "maHoatChat");
              }}
              ten="ma"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hoatChatId",
      key: "maHoatChat",
      render: (item) => {
        return (
          props.listHoatChat &&
          (props.listHoatChat.find((e) => e.id === item) || [])?.ma
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="H??m l?????ng"
          sort_key="hamLuong"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.hamLuong || 0}
          search={
            <Input
              placeholder="T??m h??m l?????ng"
              onChange={(e) => {
                onSearchInput(e.target.value, "hamLuong");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hamLuong",
      key: "hamLuong",
    },
    {
      title: (
        <HeaderSearch
          title="M?? DV"
          sort_key="maDV"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.maDV || 0}
          searchSelect={
            <Select
              placeholder="T??m m?? DV"
              onChange={(e) => {
                onSearchInput(e, "maDV");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "maDV",
      render: (item) => {
        return item && item.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="N??m"
          sort_key="quyetDinhThau.nam"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["quyetDinhThau.nam"] || 0}
          search={
            <Input
              placeholder="T??m n??m"
              onChange={(e) => {
                onSearchInput(e.target.value, "quyetDinhThau.nam");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "center",
      dataIndex: "quyetDinhThau",
      key: "nam",
      render: (item) => {
        return item && item?.nam;
      },
    },
    {
      title: (
        <HeaderSearch
          title="????n v??? t??nh"
          sort_key="donViTinh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.donViTinh || 0}
          searchSelect={
            <Select
              placeholder="T??m ????n v??? t??nh"
              data={props.listAllDonViTinh}
              onChange={(e) => {
                onSearchInput(e, "donViTinh");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "donViTinh",
      key: "donViTinh",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL ???? nh???p"
          sort_key="soLuongDaNhap"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.soLuongDaNhap || 0}
          search={
            <Input
              placeholder="T??m SL ???? nh???p"
              onChange={(e) => {
                onSearchInput(e, "soLuongDaNhap");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soLuongDaNhap",
      key: "soLuongDaNhap",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL tr??? l???i"
          sort_key="soLuongDaTra"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.soLuongDaTra || 0}
          search={
            <Input
              placeholder="T??m SL ???? tr???"
              onChange={(e) => {
                onSearchInput(e, "soLuongDaTra");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soLuongDaTra",
      key: "soLuongDaTra",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL c??n l???i"
          sort_key="soLuongConLai"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.soLuongConLai || 0}
          search={
            <Input
              placeholder="T??m SL c??n l???i"
              onChange={(e) => {
                onSearchInput(e, "soLuongConLai");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "soLuongConLai",
      key: "soLuongConLai",
    },
    {
      title: (
        <HeaderSearch
          title="SL c?? th??? nh???p"
          sort_key="soLuongCoTheNhap"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.soLuongCoTheNhap || 0}
          search={
            <Input
              placeholder="T??m SL c?? th??? nh???p"
              onChange={(e) => {
                onSearchInput(e, "soLuongCoTheNhap");
              }}
            />
          }
        />
      ),
      width: 150,
      align: "right",
      dataIndex: "soLuongCoTheNhap",
      key: "soLuongCoTheNhap",
      render: (item) => {
        return item && item.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="G??i th???u"
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.goiThau || 0}
          search={
            <Input
              placeholder="T??m g??i th???u"
              onChange={(e) => {
                onSearchInput(e, "goiThau");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "goiThau",
      render: (item) => {
        return item && item?.goiThau;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i DV"
          sort_key="loaiDichVu"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.loaiDichVu || 0}
          searchSelect={
            <Select
              placeholder="T??m lo???i d???ch v???"
              data={props.listLoaiDichVuThuocVatTuHoaChat}
              onChange={(e) => {
                onSearchInput(e, "loaiDichVu");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "loaiDichVu",
      render: (item) => {
        return (
          item &&
          props.listLoaiDichVuThuocVatTuHoaChat &&
          (
            props.listLoaiDichVuThuocVatTuHoaChat.find(
              (e) => e.id === item.loaiDichVu
            ) || []
          )?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngu???n nh???p kho"
          sort_key="nguonNhapKhoId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.nguonNhapKhoId || 0}
          searchSelect={
            <Select
              placeholder="T??m ngu???n nh???p kho"
              data={props.listNguonNhapKho}
              onChange={(e) => {
                onSearchInput(e, "nguonNhapKhoId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThauId",
      key: "nguonNhapKho",
      render: (item) => {
        return (
          props.listAllQuyetDinhThau &&
          (props.listAllQuyetDinhThau?.find((e) => e.id === item) || [])
            ?.nguonNhapKho?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i th???u"
          sort_key="loaiThau"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.loaiThau || 0}
          searchSelect={
            <Select
              placeholder="T??m lo???i th???u"
              data={props.listloaiThau}
              onChange={(e) => {
                onSearchInput(e, "loaiThau");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThauId",
      key: "loaiThau",
      render: (item) => {
        const res =
          props.listAllQuyetDinhThau &&
          (props.listAllQuyetDinhThau?.find((e) => e.id === item) || [])
            ?.loaiThau;
        return (
          res &&
          props.listloaiThau &&
          (props.listloaiThau?.find((e) => e.id === res) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ng??y c??ng b???"
          sort_key="ngayCongBo"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.ngayCongBo || 0}
          searchSelect={
            <DatePicker
              format={dateFormat}
              placeholder="T??m ng??y c??ng b???"
              onChange={(e) => {
                onSearchInput(moment(e).format(dateFormat), "ngayCongBo");
              }}
            />
          }
        />
      ),
      width: 120,
      align: "center",
      dataIndex: "quyetDinhThauId",
      key: "ngayCongBo",
      render: (item) => {
        return (
          props.listAllQuyetDinhThau &&
          (props.listAllQuyetDinhThau?.find((e) => e.id === item) || [])
            ?.ngayCongBo
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hi???u l???c th???u"
          sort_key="ngayHieuLuc"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.ngayHieuLuc || 0}
          searchSelect={
            <DatePicker
              placeholder="T??m hi???u l???c th???u"
              onChange={(e) => {
                onSearchInput(moment(e).format(dateFormat), "ngayHieuLuc");
              }}
            />
          }
        />
      ),
      width: 120,
      align: "center",
      dataIndex: "quyetDinhThauId",
      key: "ngayHieuLuc",
      render: (item) => {
        return (
          props.listAllQuyetDinhThau &&
          (props.listAllQuyetDinhThau?.find((e) => e.id === item) || [])
            ?.ngayHieuLuc
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="khoaId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.khoaId || 0}
          searchSelect={
            <Select
              placeholder="T??m khoa"
              data={props.listAllKhoa}
              onChange={(e) => {
                onSearchInput(e, "khoaId");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "quyetDinhThauId",
      key: "khoa",
      render: (item) => {
        const res =
          props.listAllQuyetDinhThau &&
          (props.listAllQuyetDinhThau?.find((e) => e.id === item) || [])
            ?.khoaId;
        return (
          res &&
          props.listAllKhoa &&
          (props.listAllKhoa?.find((e) => e.id === res) || [])?.ten
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tr???ng th??i"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.trangThai || 0}
          searchSelect={
            <Select
              placeholder="T??m tr???ng th??i"
              data={props.listtrangThaiThau}
              onChange={(e) => {
                onSearchInput(e, "trangThai");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThauId",
      key: "trangThai",
      render: (item) => {
        const res =
          props.listAllQuyetDinhThau &&
          (props.listAllQuyetDinhThau?.find((e) => e.id === item) || [])
            ?.trangThai;
        return (
          res &&
          props.listtrangThaiThau &&
          (props.listtrangThaiThau?.find((e) => e.id === res) || [])?.ten
        );
      },
    },

    {
      title: (
        <HeaderSearch
          title="C?? hi???u l???c"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Ch???n hi???u l???c"
              onChange={(e) => onSearchInput(e, "active")}
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
    <div>
      <TableWrapper columns={columnsGroup} dataSource={data} />
      {props.totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={props.page + 1}
          pageSize={props.size}
          listData={data}
          total={props.totalElements}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    quyetDinhThauChiTiet: {
      listQuyetDinhThauChiTiet,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSortColumn,
      dataSearch,
    },
    quyetDinhThau: { listAllQuyetDinhThau },
    nhaSanXuat: { listNSX, listNCC },
    // ttHanhChinh: { listAllQuocGia },
    xuatXu: { listXuatXu },
    dichVuKho: { listDichVuKho },
    khoa: { listAllKhoa },
    duongDung: { listDuongDung },
    hoatChat: { listHoatChat },
    donViTinh: { listAllDonViTinh },
    nguonNhapKho: { listData: listNguonNhapKho },
    utils: {
      listGoiThau,
      listNhomThau,
      listNhomChiPhiBh,
      listLoaiDichVuThuocVatTuHoaChat,
      listloaiThau,
      listtrangThaiThau,
      listLoaiThuocThau,
    },
  } = state;

  return {
    listQuyetDinhThauChiTiet: listQuyetDinhThauChiTiet || [],
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSortColumn: dataSortColumn || [],
    dataSearch,
    listAllQuyetDinhThau: listAllQuyetDinhThau || [],
    listNSX,
    listNCC,
    // listAllQuocGia,
    listXuatXu,
    listDichVuKho,
    listAllKhoa,
    listGoiThau,
    listNhomThau,
    listNhomChiPhiBh,
    listDuongDung,
    listHoatChat,
    listAllDonViTinh,
    listNguonNhapKho,
    listloaiThau,
    listLoaiDichVuThuocVatTuHoaChat,
    listtrangThaiThau,
    listLoaiThuocThau,
  };
};
const mapDispatchToProps = ({
  quyetDinhThau: { getListAllQuyetDinhThau },
  quyetDinhThauChiTiet: {
    getListQuyetDinhThauChiTiet,
    onChangeSort,
    onChangeSize,
    onChangeInputSearch,
  },
  nhaSanXuat: { getListNhaSanXuat },
  // ttHanhChinh: { getListAllQuocGia },
  xuatXu: { getListXuatXu },
  dichVuKho: { onSearch: getListDichVuKho },
  duongDung: { searchDuongDung },
  hoatChat: { searchHoatChat },
  donViTinh: { getListDonViTinh },
  nguonNhapKho: { onSearch: getListNguonNhapKho },
  khoa: { getListAllKhoa },
  utils: { getUtils },
}) => ({
  getListAllQuyetDinhThau,
  getListNhaSanXuat,
  getListQuyetDinhThauChiTiet,
  onChangeSort,
  onChangeSize,
  onChangeInputSearch,
  // getListAllQuocGia,
  getListXuatXu,
  getListDichVuKho,
  getUtils,
  searchDuongDung,
  searchHoatChat,
  getListDonViTinh,
  getListNguonNhapKho,
  getListAllKhoa,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
