import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Main } from "./styled";
import { formatNumberInput, openInNewTab, formatNumber } from "utils";
import {
  Pagination,
  HeaderSearch,
  CreatedWrapper,
  TableWrapper,
  HomeWrapper,
  Select,
} from "components";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  KHONG_TINH_TIEN,
} from "constants/index";
import { Checkbox, Col, Input, Form, InputNumber } from "antd";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
const HoaChat = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();
  const {
    listnguonKhacChiTra,
    listData,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    onSearch,
    createOrEdit,
    listAllDonViTinh,
    listNSX,
    listNCC,
    listAllNhomDichVuCap1,
    listAllNhomDichVuCap2,
    listAllNhomDichVuCap3,
    //utils
    listnhomChiPhiBh,
    getUtils,
    //
    listSuppliesGroup,
    getListSuppliesGroupTongHop,
    // getListAllQuocGia,
    // listAllQuocGia,
    listXuatXu,
    getAllTongHopDichVuCap1,
    getAllTongHopDichVuCap2,
    getAllTongHopDichVuCap3,
    getListTongHopNhaSanXuat,
    getListXuatXuTongHop,
    getListDonViTinhTongHop,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  // const [dataSortColumn, setDataSortColumn] = useState({
  //   active: 2,
  //   "dichVu.ma": 1,
  //   // updatedOn: 2,
  // });
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    // const sort = combineSort(dataSortColumn);
    const params = {
      page,
      size,
      sort: props.dataSortColumn,
      ...dataSearch,
      loaiDichVu: 110,
    };
    onSearch(params);
    getListSuppliesGroupTongHop({
      page: 0,
      size: 9999,
      active: true,
      loaiDichVu: 110,
    });
    getListDonViTinhTongHop({ page: 0, size: 99999, active: true });
    // getAllDichVuCap1({});
    // getAllDichVuCap2({});
    // getAllDichVuCap3({});
    getAllTongHopDichVuCap1({});
    getAllTongHopDichVuCap2({});
    getAllTongHopDichVuCap3({});
    getListTongHopNhaSanXuat({
      page,
      size: 500,
      active: true,
      loaiNhaSanXuat: 10,
    });
    getListTongHopNhaSanXuat({
      page,
      size: 500,
      active: true,
      loaiNhaSanXuat: 20,
    });
    // getListNhaSanXuat({ page, size: 500, active: true, loaiNhaSanXuat: 10 });
    // getListNhaSanXuat({ page, size: 500, active: true, loaiNhaSanXuat: 20 });
    getUtils({ name: "nhomChiPhiBh" });
    getUtils({ name: "nguonKhacChiTra" });
    // getListAllQuocGia();
    getListXuatXuTongHop({ size: 1000, active: true });
  }, []);

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            if (refSelectRow.current && e.target.nodeName != "INPUT")
              refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            if (refSelectRow.current && e.target.nodeName != "INPUT")
              refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (listData?.findIndex((item) => item.id === dataEditDefault?.id) || 0) +
      index;
    const record = listData[indexNextItem];
    const data = {
      ...record,
      ma: record?.dichVu?.ma,
      ten: record?.dichVu?.ten,
      donViTinhId: record?.dichVu?.donViTinhId,
      khongTinhTien: record?.dichVu?.khongTinhTien,
      maTuongDuong: record?.dichVu?.maTuongDuong,
      nhomChiPhiBh: record?.dichVu?.nhomChiPhiBh,
      nhomDichVuCap1Id: record?.dichVu?.nhomDichVuCap1Id,
      nhomDichVuCap2Id: record?.dichVu?.nhomDichVuCap2Id,
      nhomDichVuCap3Id: record?.dichVu?.nhomDichVuCap3Id,
      tenTuongDuong: record?.dichVu?.tenTuongDuong,
      tyLeBhTt: record?.dichVu?.tyLeBhTt,
      tyLeTtDv: record?.dichVu?.tyLeTtDv,
      nhomDvKhoCap1Id: record?.nhomDvKhoCap1Id,
      dsNguonKhacChiTra: record?.dichVu.dsNguonKhacChiTra || [],
    };
    if (-1 < indexNextItem && indexNextItem < listData.length) {
      setEditStatus(true);
      updateData({ dataEditDefault: data });
      form.setFieldsValue(data);
      document
        .getElementsByClassName("row-id-" + data?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    props.onSortChange(
      {
        [key]: value,
      },
      110
    );
  };

  const getNhomChiPhi = (item) => {
    let res = listnhomChiPhiBh.filter((el) => el.id === item);
    return (res.length && res[0]) || {};
  };
  // const onSearchInput = (key) => (e) => {
  //   let value = "";
  //   if (e?.target) {
  //     if (e.target.hasOwnProperty("checked")) value = e.target.checked;
  //     else value = e.target.value;
  //   } else value = e;
  //   props.onChangeInputSearch(
  //     {
  //       [key]: value,
  //     },
  //     110
  //   );
  // };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        props.onChangeInputSearch(
          {
            [key]: value,
          },
          110
        );
      },
      500,
      key,
      e?.target
    );
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 45,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? h??a ch???t"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="T??m m?? h??a ch???t"
              onChange={onSearchInput("dichVu.ma")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??n h??a ch???t"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="T??m t??n h??a ch???t"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m h??a ch???t"
          sort_key="nhomDvKhoCap1.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nhomDvKhoCap1.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh??m h??a ch???t"
              onChange={onSearchInput("tenHoatChat")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhomDvKhoCap1",
      key: "nhomDvKhoCap1",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="N?????c s???n xu???t"
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["xuatXu.ten"] || 0}
          search={
            <Input
              placeholder="T??m n?????c s???n xu???t"
              onChange={onSearchInput("tenXuatXu")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "xuatXu",
      key: "xuatXu",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh?? s???n xu???t"
          sort_key="nhaSanXuat.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nhaSanXuat.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh?? s???n xu???t"
              onChange={onSearchInput("nuocSanXuat.ten")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaSanXuat",
      key: "nhaSanXuat",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh?? cung c???p"
          sort_key="nhaCungCap.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nhaCungCap.ten"] || 0}
          search={
            <InputNumber
              placeholder="T??m nh?? cung c???p"
              onChange={onSearchInput("nhaCungCap.ten")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaCungCap",
      key: "nhaCungCap",
      render: (item) => {
        return item?.ten;
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
              onChange={onSearchInput("quyCach")}
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
          title="Gi?? nh???p"
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.giaNhapSauVat || 0}
          search={
            <InputNumber
              placeholder="T??m gi?? nh???p"
              onChange={onSearchInput("giaNhapSauVat")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      align: "right",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          title="Gi?? tr???n"
          sort_key="giaTran"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.giaTran || 0}
          search={
            <InputNumber
              placeholder="T??m gi?? tr???n"
              onChange={onSearchInput("giaTran")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "giaTran",
      align: "right",
      key: "giaTran",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          title="Tr???n b???o hi???m"
          sort_key="tranBaoHiem"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.tranBaoHiem || 0}
          search={
            <Input
              placeholder="T??m tr???n b???o hi???m"
              onChange={onSearchInput("tranBaoHiem")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tranBaoHiem",
      key: "tranBaoHiem",
      align: "right",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m chi ph??"
          sort_key="dichVu.nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.nhomChiPhiBh"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "T???t c???" }, ...listnhomChiPhiBh]}
              onChange={onSearchInput("dichVu.nhomChiPhiBh")}
              placeholder="Ch???n nh??m chi ph??"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return getNhomChiPhi(item?.nhomChiPhiBh).ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??? l??? BH thanh to??n"
          sort_key="dichVu.tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.tyLeBhTt"] || 0}
          search={
            <Input
              placeholder="T??m t??? l??? BH thanh to??n"
              onChange={onSearchInput("dichVu.tyLeBhTt")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "right",
      render: (item) => {
        return item?.tyLeBhTt;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??? l??? thanh to??n DV"
          sort_key="dichVu.tyLeTtDv"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.tyLeTtDv"] || 0}
          search={
            <Input
              placeholder="T??m t??? l??? thanh to??n DV"
              onChange={onSearchInput("dichVu.tyLeTtDv")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "right",
      render: (item) => {
        return item?.tyLeTtDv;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m dv c???p 1"
          sort_key="dichVu.nhomDichVuCap1.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.nhomDichVuCap1.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh??m dv c???p 1"
              onChange={onSearchInput("tenNhomDichVuCap1")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.nhomDichVuCap1?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m dv c???p 2"
          sort_key="dichVu.nhomDichVuCap2.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.nhomDichVuCap2.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh??m dv c???p 2"
              onChange={onSearchInput("tenNhomDichVuCap2")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.nhomDichVuCap2?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m dv c???p 3"
          sort_key="dichVu.nhomDichVuCap3.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.nhomDichVuCap3.ten"] || 0}
          search={
            <Input
              placeholder="T??m nh??m dv c???p 3"
              onChange={onSearchInput("tenNhomDichVuCap3")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.nhomDichVuCap3?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="M?? t????ng ??????ng"
          sort_key="dichVu.maTuongDuong"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.maTuongDuong"] || 0}
          search={
            <Input
              placeholder="T??m m?? t????ng ??????ng"
              onChange={onSearchInput("maTuongDuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.maTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??n t????ng ??????ng"
          sort_key="dichVu.tenTuongDuong"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.tenTuongDuong"] || 0}
          search={
            <Input
              placeholder="T??m t??n t????ng ??????ng"
              onChange={onSearchInput("tenTuongDuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.tenTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngu???n chi tr??? kh??c"
          sort_key="dichVu.dsNguonKhacChiTra"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.dsNguonKhacChiTra"] || 0}
          searchSelect={
            <Select
              data={listnguonKhacChiTra}
              placeholder="Ch???n ngu???n chi tr??? kh??c"
              onChange={onSearchInput("dichVu.dsNguonKhacChiTra")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        if ((listnguonKhacChiTra || [])?.length) {
          let list =
            (item?.dsNguonKhacChiTra || [])
              ?.map((el, index) => {
                let x = (listnguonKhacChiTra || []).find((dv) => dv.id === el);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];

          return list.join(", ");
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={KHONG_TINH_TIEN}
              placeholder="Ch???n kh??ng t??nh ti???n"
              defaultValue=""
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.khongTinhTien"] || 0}
          title="Kh??ng t??nh ti???n"
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item?.khongTinhTien} />;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n hi???u l???c"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          title="C?? hi???u l???c"
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, loaiDichVu: 110 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size, loaiDichVu: 110 });
  };

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let params = {
          dichVu: {
            donViTinhId: values.donViTinhId,
            khongTinhTien: values.khongTinhTien,
            ma: values.ma,
            maTuongDuong: values.maTuongDuong,
            nhomChiPhiBh: values.nhomChiPhiBh,
            nhomDichVuCap1Id: values.nhomDichVuCap1Id,
            nhomDichVuCap2Id: values.nhomDichVuCap2Id,
            nhomDichVuCap3Id: values.nhomDichVuCap3Id,
            ten: values.ten,
            tenTuongDuong: values.tenTuongDuong,
            tyLeBhTt: values.tyLeBhTt,
            tyLeTtDv: values.tyLeTtDv,
            loaiDichVu: 110,
            dsNguonKhacChiTra: values.dsNguonKhacChiTra,
          },
          giaNhapSauVat: values.giaNhapSauVat,
          giaTran: values.giaTran,
          nhomDvKhoCap1Id: values.nhomDvKhoCap1Id,
          nhaCungCapId: values.nhaCungCapId,
          nhaSanXuatId: values.nhaSanXuatId,
          // nuocSanXuatId: values.nuocSanXuatId,
          xuatXuId: values.xuatXuId,
          quyCach: values.quyCach,
          tenHoatChat: values.ten,
          tranBaoHiem: values.tranBaoHiem,
        };
        if (editStatus) {
          params = {
            ...params,
            id: dataEditDefault.id,
          };
        }
        createOrEdit(params, 110).then(() => {
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
            form.setFieldsValue({ logo: "" });
          }
        });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAdded;

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    updateData({ dataEditDefault: data });
    form.setFieldsValue(data);
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate({
          ...record,
          ma: record?.dichVu?.ma,
          ten: record?.dichVu?.ten,
          donViTinhId: record?.dichVu?.donViTinhId,
          khongTinhTien: record?.dichVu?.khongTinhTien,
          maTuongDuong: record?.dichVu?.maTuongDuong,
          nhomChiPhiBh: record?.dichVu?.nhomChiPhiBh,
          nhomDichVuCap1Id: record?.dichVu?.nhomDichVuCap1Id,
          nhomDichVuCap2Id: record?.dichVu?.nhomDichVuCap2Id,
          nhomDichVuCap3Id: record?.dichVu?.nhomDichVuCap3Id,
          tenTuongDuong: record?.dichVu?.tenTuongDuong,
          tyLeBhTt: record?.dichVu?.tyLeBhTt,
          tyLeTtDv: record?.dichVu?.tyLeTtDv,
          nhomDvKhoCap1Id: record?.nhomDvKhoCap1Id,
          dsNguonKhacChiTra: record?.dichVu.dsNguonKhacChiTra || [],
        });
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    form.resetFields();
    form.setFieldsValue({ logo: "" });
    updateData({ dataEditDefault: {} });
    if (refAutoFocus.current) {
      setTimeout(() => {
        refAutoFocus.current.focus();
      }, 50);
    }
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue({ ...dataEditDefault });
    } else {
      form.resetFields();
      form.setFieldsValue({ logo: "" });
    }
  };
  const onUpdateData = (item, type) => {
    if (type === "tyLeBhTt" || type === "tyLeTtDv") {
      form.setFieldsValue({ [type]: formatNumberInput(item).slice(0, 3) });
    } else {
      console.log("item", item, "type", type);
      form.setFieldsValue({ [type]: item });
    }
  };
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  const refAutoFocus = useRef(null);
  // useEffect(() => {
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [dataEditDefault]);
  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  return (
    <Main>
      <HomeWrapper title="Danh m???c">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title="Danh m???c h??a ch???t"
            scroll={{ x: 1000 }}
            styleMain={{ marginTop: 0 }}
            classNameRow={"custom-header"}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].HOA_CHAT_THEM])
                ? [
                    {
                      title: "Th??m m???i [F1]",
                      onClick: handleClickedBtnAdded,
                      buttonHeaderIcon: (
                        <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                      ),
                    },
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
                : [
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
            }
            columns={columns}
            dataSource={listData}
            onRow={onRow}
            rowClassName={setRowClassName}
          ></TableWrapper>
          {totalElements > 0 && (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={listData}
              total={totalElements}
              onShowSizeChange={onSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          )}
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            <CreatedWrapper
              title="Th??ng tin chi ti???t"
              onCancel={handleCancel}
              cancelText="H???y"
              onOk={handleAdded}
              okText="L??u [F4]"
              roleSave={[ROLES["DANH_MUC"].HOA_CHAT_THEM]}
              roleEdit={[ROLES["DANH_MUC"].HOA_CHAT_SUA]}
              editStatus={editStatus}
            >
              <fieldset
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].HOA_CHAT_SUA])
                    : !checkRole([ROLES["DANH_MUC"].HOA_CHAT_THEM])
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                  className="form-custom"
                >
                  <Form.Item
                    label="M?? h??a ch???t"
                    name="ma"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p m?? h??a ch???t!",
                      },
                      {
                        max: 20,
                        message:
                          "Vui l??ng nh???p m?? h??a ch???t kh??ng qu?? 20 k?? t???!",
                      },
                      {
                        whitespace: true,
                        message: "Vui l??ng nh???p m?? h??a ch???t!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p m?? h??a ch???t"
                      ref={refAutoFocus}
                    />
                  </Form.Item>
                  <Form.Item
                    label="T??n h??a ch???t"
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p t??n h??a ch???t!",
                      },
                      {
                        max: 1000,
                        message:
                          "Vui l??ng nh???p t??n h??a ch???t kh??ng qu?? 1000 k?? t???!",
                      },
                      {
                        whitespace: true,
                        message: "Vui l??ng nh???p t??n h??a ch???t!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p t??n h??a ch???t"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() => openInNewTab("/danh-muc/nhom-hoa-chat")}
                      >
                        Nh??m h??a ch???t
                      </div>
                    }
                    name="nhomDvKhoCap1Id"
                  >
                    <Select
                      data={listSuppliesGroup}
                      placeholder="Ch???n h??a ch???t"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
                      >
                        ??VT
                      </div>
                    }
                    name="donViTinhId"
                  >
                    <Select data={listAllDonViTinh} placeholder="Ch???n ??vt" />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() => openInNewTab("/danh-muc/xuat-xu")}
                      >
                        N?????c s???n xu???t
                      </div>
                    }
                    name="xuatXuId"
                  >
                    <Select
                      data={listXuatXu}
                      placeholder="Ch???n n?????c s???n xu???t"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() => openInNewTab("/danh-muc/nha-san-xuat")}
                      >
                        Nh?? s???n xu???t
                      </div>
                    }
                    name="nhaSanXuatId"
                  >
                    <Select data={listNSX} placeholder="Ch???n nh?? s???n xu???t" />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() => openInNewTab("/danh-muc/nha-san-xuat")}
                      >
                        Nh?? cung c???p
                      </div>
                    }
                    name="nhaCungCapId"
                  >
                    <Select data={listNCC} placeholder="Ch???n nh?? cung c???p" />
                  </Form.Item>
                  <Form.Item label="Quy c??ch" name="quyCach">
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p quy c??ch"
                    />
                  </Form.Item>
                  <Form.Item label="Gi?? nh???p" name="giaNhapSauVat">
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={(e) => {
                        onUpdateData(e, "giaNhapSauVat");
                      }}
                      className="input-option"
                      placeholder="Vui l??ng nh???p gi?? nh???p"
                    />
                  </Form.Item>
                  <Form.Item label="Gi?? tr???n" name="giaTran">
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={(e) => {
                        onUpdateData(e, "giaTran");
                      }}
                      className="input-option"
                      placeholder="Vui l??ng nh???p gi?? tr???n"
                    />
                  </Form.Item>
                  <Form.Item label="Tr???n b???o hi???m" name="tranBaoHiem">
                    <InputNumber
                      onChange={(e) => {
                        onUpdateData(e, "tranBaoHiem");
                      }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      className="input-option"
                      placeholder="Vui l??ng nh???p tr???n b???o hi???m"
                    />
                  </Form.Item>
                  <Form.Item label="T??? l??? BH thanh to??n" name="tyLeBhTt">
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p t??? l??? BH thanh to??n"
                      onChange={(e) => {
                        onUpdateData(e.target.value, "tyLeBhTt");
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="T??? l??? thanh to??n DV"
                    name="tyLeTtDv"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p t??? l??? thanh to??n DV!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p t??? l??? thanh to??n DV"
                      onChange={(e) => {
                        onUpdateData(e.target.value, "tyLeTtDv");
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                      //TODO: phan loai theo nhom chi phi bhyt
                      // onClick={() => openInNewTab("/danh-muc/phong")}
                      >
                        Nh??m chi ph??
                      </div>
                    }
                    name="nhomChiPhiBh"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p nh??m chi ph??!",
                      },
                    ]}
                  >
                    <Select
                      data={[...listnhomChiPhiBh]}
                      placeholder="Ch???n nh??m chi ph??"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() =>
                          openInNewTab("/danh-muc/nhom-dich-vu?level=1")
                        }
                      >
                        Nh??m dv c???p 1
                      </div>
                    }
                    name="nhomDichVuCap1Id"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng ch???n nh??m dv c???p 1!",
                      },
                    ]}
                  >
                    <Select
                      data={listAllNhomDichVuCap1}
                      placeholder="Ch???n nh??m dv c???p 1"
                      rules={[
                        {
                          required: true,
                          message: "Vui l??ng ch???n nh??m dv c???p 2!",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() =>
                          openInNewTab("/danh-muc/nhom-dich-vu?level=2")
                        }
                      >
                        Nh??m dv c???p 2
                      </div>
                    }
                    name="nhomDichVuCap2Id"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng ch???n nh??m dv c???p 2!",
                      },
                    ]}
                  >
                    <Select
                      data={listAllNhomDichVuCap2}
                      placeholder="Ch???n nh??m dv c???p 2"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() =>
                          openInNewTab("/danh-muc/nhom-dich-vu?level=3")
                        }
                      >
                        Nh??m dv c???p 3
                      </div>
                    }
                    name="nhomDichVuCap3Id"
                  >
                    <Select
                      data={listAllNhomDichVuCap3}
                      placeholder="Ch???n nh??m dv c???p 3"
                    />
                  </Form.Item>
                  <Form.Item label="M?? t????ng ??????ng" name="maTuongDuong">
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p m?? t????ng ??????ng"
                    />
                  </Form.Item>
                  <Form.Item label="T??n t????ng ??????ng" name="tenTuongDuong">
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p t??n t????ng ??????ng"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Ngu???n kh??c chi tr???"
                    name="dsNguonKhacChiTra"
                  >
                    <Select
                      data={listnguonKhacChiTra}
                      placeholder="Ch???n ngu???n chi tr??? kh??c"
                      mode="multiple"
                    />
                  </Form.Item>
                  <Form.Item name="khongTinhTien" valuePropName="checked">
                    <Checkbox>Kh??ng t??nh ti???n</Checkbox>
                  </Form.Item>
                  {editStatus && (
                    <Form.Item name="active" valuePropName="checked">
                      <Checkbox>C?? hi???u l???c</Checkbox>
                    </Form.Item>
                  )}
                </Form>
              </fieldset>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    dichVuKyThuat: {
      listData,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSortColumn,
    },
    donViTinh: { listAllDonViTinh },
    nhaSanXuat: { listNSX, listNCC },
    nhomDichVuCap1: { listAllNhomDichVuCap1 },
    nhomDichVuCap2: { listAllNhomDichVuCap2 },
    nhomDichVuCap3: { listAllNhomDichVuCap3 },
    utils: { listnhomChiPhiBh = [], listnguonKhacChiTra = [] },
    nhomVatTu: { listSuppliesGroup = [] },
    // ttHanhChinh: { listAllQuocGia },
    xuatXu: { listXuatXu },
  } = state;

  return {
    listnguonKhacChiTra,
    listSuppliesGroup,
    listnhomChiPhiBh,
    listNSX,
    listNCC,
    listAllDonViTinh,
    listData,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSortColumn,
    listAllNhomDichVuCap1,
    listAllNhomDichVuCap2,
    listAllNhomDichVuCap3,
    // listAllQuocGia,
    listXuatXu,
  };
};
const mapDispatchToProps = ({
  dichVuKyThuat: {
    onSearch,
    createOrEdit,
    onDelete,
    updateData,
    onChangeInputSearch,
    onSortChange,
    onSizeChange,
  },
  donViTinh: { getListDonViTinh, getListDonViTinhTongHop },
  nhaSanXuat: { getListNhaSanXuat, getListTongHopNhaSanXuat },
  nhomDichVuCap1: { getAllDichVuCap1, getAllTongHopDichVuCap1 },
  nhomDichVuCap2: { getAllDichVuCap2, getAllTongHopDichVuCap2 },
  nhomDichVuCap3: { getAllDichVuCap3, getAllTongHopDichVuCap3 },
  nhomVatTu: { getListSuppliesGroupTongHop },
  utils: { getUtils },
  // ttHanhChinh: { getListAllQuocGia },
  xuatXu: { getListXuatXu, getListXuatXuTongHop },
}) => ({
  onSearch,
  createOrEdit,
  onDelete,
  updateData,
  getListDonViTinh,
  getListNhaSanXuat,
  getAllDichVuCap1,
  getAllDichVuCap2,
  getAllDichVuCap3,
  getListSuppliesGroupTongHop,
  getUtils,
  // getListAllQuocGia,
  getListXuatXu,
  onChangeInputSearch,
  onSortChange,
  onSizeChange,
  getAllTongHopDichVuCap1,
  getAllTongHopDichVuCap2,
  getAllTongHopDichVuCap3,
  getListTongHopNhaSanXuat,
  getListXuatXuTongHop,
  getListDonViTinhTongHop,
});

export default connect(mapStateToProps, mapDispatchToProps)(HoaChat);
