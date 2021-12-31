import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { groupBy } from "lodash";
import moment from "moment";
import { Input, message, Button } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import Select from "components/Select";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Checkbox from "components/Checkbox";
import {
  isNumber,
  TRANG_THAI,
  TRANG_THAI_FILTER,
  LOAI_KET_QUA,
} from "pages/xetNghiem/configs";
import { Main } from "./styled";
import MainTable from "pages/xetNghiem/components/tableXetNghiem";
import { ModalNotification } from "pages/chanDoanHinhAnh/components/ModalNotification";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import printProvider from "data-access/print-provider";

let timer = null;

const DanhSachDichVu = ({ layerId, onChangeInputSearch, onShowInfo }) => {
  const refNotification = useRef(null);
  const refInputMaDv = useRef(null);
  const [state, _setState] = useState({
    isCheckedAll: true,
    actionXNSuccess: false,
    dataTable: [],
    listKeys: [],
    selectedBtn: [],
    selectedRowKeys: [], // [{soPhieu}-{nhomDichVuCap2Id}-{dichVuId}]
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const {
    xnHuyetHocSinhHoa: { listServices = [], nbDotDieuTriId },
    nbXetNghiem: { listData: listNb },
    utils: {
      listKetQuaXetNghiem = [],
      listtrangThaiDichVu = [],
      listphanLoaiKetQuaXetNghiem = [],
    },
    maMay: { listDataTongHop = [] },
    donViTinh: { listAllDonViTinh },
  } = useSelector((state) => state);
  const {
    xnHuyetHocSinhHoa: {
      getTongHopDichVuXN,
      capNhatKetQua,
      xacNhanKetQua,
      duyetKetQua,
      xacNhanTiepNhanMau,
      updateData,
      getPhieuKetQua,
    },
    layMauXN: { xacNhanlayMau },
    utils: { getUtils },
    maMay: { getDataTongHop = [] },
    donViTinh: { getListDonViTinhTongHop },
    phimTat: { onRegisterHotkey },
  } = useDispatch();
  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refInputMaDv.current && refInputMaDv.current.focus();
          },
        },
      ],
    });
  }, []);
  useEffect(() => {
    updateData({ dsTrangThai: [66] });
    getUtils({ name: "KetQuaXetNghiem" });
    getUtils({ name: "trangThaiDichVu" });
    getUtils({ name: "phanLoaiKetQuaXetNghiem" });
    getDataTongHop({});
    getListDonViTinhTongHop();
  }, []);

  useEffect(() => {
    const index = listNb.findIndex((item) => item.id === nbDotDieuTriId);

    if (index === -1) {
      updateData({ nbDotDieuTriId: null });
    }
  }, [listNb, nbDotDieuTriId]);

  useEffect(() => {
    if (nbDotDieuTriId) {
      getTongHopDichVuXN({
        nbDotDieuTriId,
        dataSortColumnDSDV: { maDichVu: 1 },
      }).then((s) => {
        if (s.length <= 0) {
          message.error(`Không tồn tại dịch vụ người bệnh`);
        }
      });
    }
  }, [nbDotDieuTriId]);

  useEffect(() => {
    const data = formatDataIds(state.selectedRowKeys);
    const listStatus = state.dataTable
      .filter((d) => d.nbDotDieuTriId)
      .filter((item) => data.includes(item.recordId))
      .map((u) => u.trangThai);
    setState({
      selectedBtn: [...new Set(listStatus)],
    });
  }, [state.selectedRowKeys]);

  useEffect(() => {
    let listAllKeys = []; // Id record format: {soPhieu}-{nhomDichVuCap2Id}-{dichVuId}
    let dataTable = [];
    const groupBySoPhieu = groupBy(listServices, "soPhieu");
    Object.keys(groupBySoPhieu).forEach((item) => {
      const dataSoPhieu = groupBySoPhieu[item];
      const groupByDichVu = groupBy(dataSoPhieu, "tenNhomDichVuCap2");
      dataTable.push({
        type: "soPhieu",
        stt: `Số phiếu: ${item}`,
        id: item,
      });
      listAllKeys.push(item);

      Object.keys(groupByDichVu).forEach((d) => {
        let dichVu = groupByDichVu[d];
        dichVu = dichVu.map((v, idx) => {
          const children = v.dsChiSoCon.map((chiso) => ({
            ...chiso,
            maDichVu: chiso.maChiSoCon,
            tenDichVu: chiso.tenChiSoCon,
            isChiSoCon: true,
            trangThai: v.trangThai,
          }));
          listAllKeys.push(`${item}-${v.nhomDichVuCap2Id}-${v.id}`);
          return {
            ...v,
            children,
            stt: idx + 1,
            id: `${item}-${v.nhomDichVuCap2Id}-${v.id}`,
            recordId: v.id,
            donVi: listAllDonViTinh?.find((item) => item?.id == v?.donViTinhId)
              ?.ten,
          };
        });
        dataTable.push({
          type: "dichVuCap2",
          stt: d,
          id: `${item}-${groupByDichVu[d]?.[0]?.nhomDichVuCap2Id}`,
        });
        listAllKeys.push(`${item}-${groupByDichVu[d]?.[0]?.nhomDichVuCap2Id}`);
        dataTable = [...dataTable, ...dichVu];
      });
    });
    setState({
      selectedRowKeys: listAllKeys,
      listKeys: listAllKeys,
      dataTable,
    });
  }, [listServices]);

  const formatDataIds = (data) => {
    const listServiceIds = [];
    data.forEach((item) => {
      if (
        item.indexOf("-") > 0 &&
        item.indexOf("-") !== item.lastIndexOf("-")
      ) {
        const id = item.slice(item.lastIndexOf("-") + 1, item.length);
        listServiceIds.push(parseInt(id));
      }
    });
    return listServiceIds;
  };

  const handleCancel = (status) => () => {
    const data = formatDataIds(state.selectedRowKeys);
    if (!data.length) {
      message.error("Mời chọn dịch vụ!");
      return;
    }
    xacNhanlayMau({ data, status }).then((s) => {
      if (s.code === 0) {
        getTongHopDichVuXN({ nbDotDieuTriId });
      }
    });
  };

  const handleSubmit = (status) => () => {
    const data = formatDataIds(state.selectedRowKeys);
    if (!data.length) {
      message.error("Mời chọn dịch vụ!");
      return;
    }

    xacNhanTiepNhanMau({ data, status }).then((res) => {
      if (res.code === 0) {
        const selectedBtn = [
          ...new Set([...state.selectedBtn, TRANG_THAI["XAC_NHAN_KET_QUA"][0]]),
        ];
        const dataTable = state.dataTable.map((item) => ({
          ...item,
          ...(data.includes(item.recordId)
            ? { trangThai: TRANG_THAI["XAC_NHAN_KET_QUA"][0] }
            : {}),
        }));
        setState({
          dataTable,
          selectedBtn,
        });
        getTongHopDichVuXN({ nbDotDieuTriId });
      }

      if (res.code == 7609) {
        refNotification.current &&
          refNotification.current.show({
            title: "Thông báo",
            content: res.message,
            okText: "Đóng",
            classNameOkText: "button-closel",
            showBtnOk: true,
          });
      }
    });
  };

  const onUpdateResult = () => {
    const data = state.dataTable
      .filter((d) => d.nbDotDieuTriId)
      .map((item) => {
        const id = item.id.slice(item.id.lastIndexOf("-") + 1, item.id.length);
        return {
          id: parseInt(id),
          ketQua: item.ketQua || "",
          banLuan: item.banLuan || "",
          ketLuan: item.ketLuan || "",
          maMayId: item.maMayId || "",
          dsChiSoCon: item.dsChiSoCon,
        };
      });

    if (!data.length) {
      message.error("Mời chọn dịch vụ!");
      return;
    }
    capNhatKetQua({ data }).then((s) => {
      getTongHopDichVuXN({ nbDotDieuTriId });
    });
  };

  const onResult = (status) => () => {
    const data = formatDataIds(state.selectedRowKeys);
    if (!data.length) {
      message.error("Mời chọn dịch vụ!");
      return;
    }
    xacNhanKetQua({ data, status }).then((res) => {
      if (res?.code === 0) {
        const selectedBtn = [
          ...new Set([...state.selectedBtn, TRANG_THAI["CO_KET_QUA"][0]]),
        ];
        const dataTable = state.dataTable.map((item) => ({
          ...item,
          ...(data.includes(item.recordId)
            ? { trangThai: TRANG_THAI["CO_KET_QUA"][0] }
            : {}),
        }));
        setState({
          dataTable,
          selectedBtn,
        });
        getTongHopDichVuXN({ nbDotDieuTriId });
      }
    });
  };

  const onConfirmResult = (isConfirm) => () => {
    const data = formatDataIds(state.selectedRowKeys);
    if (!data.length) {
      message.error("Mời chọn dịch vụ!");
      return;
    }
    duyetKetQua({ data, status: isConfirm }).then((s) => {
      if (s.code === 0) {
        getTongHopDichVuXN({ nbDotDieuTriId });
      }
    });
  };

  const onSearchInput = (key, requiredNumber) => (e) => {
    if (!nbDotDieuTriId) return;
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    if (requiredNumber && !isNumber(value) && value) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };

  const showInfo = (data) => () => {
    onShowInfo(data);
    setState({
      dataTable: null,
    });
  };

  const onChangeEditBox = (type, index, record) => (e) => {
    if (type == "ketQua") {
      const value = e.target ? e.target?.value : e;
      if (`${value}`.length > 1500) {
        message.error("Vui lòng nhập kết quả không quá 1500 lý tự!");
        return;
      }
    }
    let tableChildren = state.dataTable.find(
      (x) => x.recordId == record?.nbDvXetNghiemId
    );
    let idx = state.dataTable.indexOf(tableChildren);
    let value = "";
    if (state.dataTable) {
      if (e?.target) {
        value = e.target.value;
      } else {
        value = e ? String(e) : "";
      }
      if (idx) {
        state.dataTable[idx].dsChiSoCon[index][type] = value;
      } else {
        state.dataTable[index][type] = value;
      }
    }
  };
  const renderKetQua = (record, value, type, index) => {
    const isEdittable = TRANG_THAI["XAC_NHAN_KET_QUA"].includes(
      record.trangThai
    );
    switch (record.loaiKetQua) {
      case LOAI_KET_QUA.SO:
        return isEdittable ? (
          <Input
            className={showClassByInput(record?.phanLoaiKetQua)}
            defaultValue={value}
            type="number"
            onChange={onChangeEditBox(type, index, record)}
          />
        ) : (
          value
        );
      case LOAI_KET_QUA.CHON_GIA_TRI:
        return isEdittable ? (
          <Select
            className={showClassByInput(record?.phanLoaiKetQua)}
            defaultValue={value ? parseInt(value) : ""}
            onChange={onChangeEditBox(type, index, record)}
            placeholder={"Chọn kết quả"}
            data={listKetQuaXetNghiem}
            allowClear={false}
          />
        ) : (
          listKetQuaXetNghiem.find((d) => d.id === parseInt(value))?.ten
        );
      default:
        return isEdittable ? (
          <Input
            className={showClassByInput(record?.phanLoaiKetQua)}
            defaultValue={value}
            onChange={onChangeEditBox(type, index, record)}
          />
        ) : (
          value
        );
    }
  };

  const renderExclamation = (type) => (value, row, index) => {
    if (row.nbDvXetNghiemId) return null;
    const obj = {
      children: (
        <img
          src={require(`assets/images/xetNghiem/exclamation.png`)}
          alt="exclamation"
          onClick={showInfo(row)}
        />
      ),
      props: {},
    };
    if (["soPhieu", "dichVuCap2"].includes(row.type)) {
      obj.children = null;
    }
    return obj;
  };

  const renderContent = (type) => (value, row, index) => {
    let children = null;
    switch (type) {
      case "thoiGianThucHien":
        children = moment(value).format("DD/MM/YYYY");
        break;
      case "ketQua":
        children = renderKetQua(row, value, type, index);
        break;
      case "trangThai":
        const currentItem = listtrangThaiDichVu.find((d) => d.id === value);
        children = currentItem?.ten;
        break;
      case "maMayId":
        const item = listDataTongHop.find((x) => x.id == value);
        if (TRANG_THAI["XAC_NHAN_KET_QUA"].includes(row.trangThai)) {
          children = row.isChiSoCon ? (
            item?.ten
          ) : (
            <Select
              data={listDataTongHop}
              defaultValue={item?.ten}
              onChange={onChangeEditBox(type, index, row)}
            ></Select>
          );
        } else {
          children = value;
        }
        break;
      default:
        if (
          (("banLuan" === type && !row.isChiSoCon) || "ketLuan" === type) &&
          TRANG_THAI["XAC_NHAN_KET_QUA"].includes(row.trangThai)
        ) {
          children = (
            <Input
              defaultValue={value}
              rows={2}
              onChange={onChangeEditBox(type, index, row)}
            />
          );
        } else children = value;
    }

    const obj = {
      children,
      props: {},
    };

    if (["soPhieu", "dichVuCap2"].includes(row.type)) {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys) => {
    let updatedSelectedKeys = selectedRowKeys;

    const isAdding = state.selectedRowKeys.length < selectedRowKeys.length;
    const selectedKey = isAdding
      ? selectedRowKeys
          .filter((x) => !state.selectedRowKeys.includes(x))
          .toString()
      : state.selectedRowKeys
          .filter((x) => !selectedRowKeys.includes(x))
          .toString();
    if (isAdding) {
      if (selectedKey.indexOf("-") < 0) {
        // select all sophieu => add all dich vu + nhom dich vu thuoc so phieu
        const newList = state.listKeys.filter(
          (item) => item.includes(`${selectedKey}-`) || item === selectedKey
        );
        updatedSelectedKeys = [...updatedSelectedKeys, ...newList];
        updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
      } else if (selectedKey.indexOf("-") === selectedKey.lastIndexOf("-")) {
        const soPhieu = selectedKey.slice(0, selectedKey.indexOf("-"));
        const newList = state.listKeys.filter((item) =>
          item.includes(`${selectedKey}-`)
        );

        updatedSelectedKeys = [...updatedSelectedKeys, ...newList];
        updatedSelectedKeys = [...new Set(updatedSelectedKeys)];

        const itemNotSelectedInsoPhieu = state.listKeys.filter((item) => {
          if (
            item.indexOf("-") !== item.lastIndexOf("-") &&
            !updatedSelectedKeys.includes(item) &&
            item.slice(0, item.indexOf("-")) === soPhieu
          )
            return true;
          return false;
        });
        if (!itemNotSelectedInsoPhieu.length) {
          updatedSelectedKeys = [...updatedSelectedKeys, soPhieu];
        }
      } else {
        const group = selectedKey.slice(0, selectedKey.lastIndexOf("-"));
        const currentItemsInGroup = state.selectedRowKeys.filter((item) =>
          item.includes(group)
        ).length;
        const itemsInGroup = state.listKeys.filter((item) =>
          item.includes(group)
        ).length;
        if (currentItemsInGroup + 2 === itemsInGroup) {
          updatedSelectedKeys = [...updatedSelectedKeys, group];
        }
      }
    } else {
      if (selectedKey.indexOf("-") < 0) {
        // select all sophieu => remove all dich vu + nhom dich vu thuoc so phieu
        updatedSelectedKeys = state.selectedRowKeys.filter(
          (item) => !item.includes(`${selectedKey}-`) && item !== selectedKey
        );
      } else if (selectedKey.indexOf("-") === selectedKey.lastIndexOf("-")) {
        // select tenNhomDichVuCap2 => remove all dich vu thuoc nhom dich vu cap 2
        updatedSelectedKeys = state.selectedRowKeys.filter(
          (item) => !item.includes(`${selectedKey}-`) && item !== selectedKey
        );
        const soPhieu = selectedKey.slice(0, selectedKey.indexOf("-"));
        const otherItemInsoPhieu = updatedSelectedKeys.filter((item) =>
          item.includes(`${soPhieu}-`)
        );
        if (!otherItemInsoPhieu.length) {
          // Remove all sophieu
          updatedSelectedKeys = updatedSelectedKeys.filter(
            (item) => item !== soPhieu
          );
        }
      } else {
        const soPhieuNhomdichVu = selectedKey.slice(
          0,
          selectedKey.lastIndexOf("-")
        );
        const otherItemInDichVu = state.selectedRowKeys.filter(
          (item) =>
            item.includes(`${soPhieuNhomdichVu}-`) && item !== selectedKey
        );
        const soPhieu = selectedKey.slice(0, selectedKey.indexOf("-"));
        if (!otherItemInDichVu.length) {
          // Remove all dichvu
          updatedSelectedKeys = state.selectedRowKeys.filter(
            (item) =>
              !item.includes(`${soPhieuNhomdichVu}-`) &&
              item !== soPhieuNhomdichVu
          );
        }
        const otherItemInsoPhieu = updatedSelectedKeys.filter((item) =>
          item.includes(`${soPhieu}-`)
        );
        if (!otherItemInsoPhieu.length) {
          // Remove all sophieu
          updatedSelectedKeys = updatedSelectedKeys.filter(
            (item) => item !== soPhieu
          );
        }
      }
    }
    setState({ selectedRowKeys: updatedSelectedKeys });
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={<Checkbox onChange={oncheckAll} checked={state.isCheckedAll} />}
      />
    ),
    columnWidth: 50,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const showClassByInput = (item) => {
    let strClass = "";
    if (item == 0) {
      strClass = "input-center";
    }
    if (item == 10) {
      strClass = "input-left";
    }
    if (item == 20 || item == 30) {
      strClass = "input-right";
    }
    return strClass;
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "40px",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (text, row, index) => {
        if (!["soPhieu", "dichVuCap2"].includes(row.type)) {
          return <span>{text}</span>;
        }
        return {
          children: <span>{text}</span>,
          props: {
            colSpan: 13,
            style: {
              textAlign: "left",
              fontSize: 18,
              fontWeight: "bold",
              ...(row.type === "soPhieu"
                ? { background: "#054ab9", color: "#ffffff" }
                : {}),
            },
          },
        };
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã DV"
          search={
            <Input
              ref={refInputMaDv}
              placeholder="Tìm mã thiết lập"
              onChange={onSearchInput("maDichVu")}
            />
          }
        />
      ),
      align: "left",
      width: "100px",
      dataIndex: "maDichVu",
      key: "maDichVu",
      render: renderContent("maDichVu"),
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          search={
            <Input
              placeholder="Tìm theo giá trị"
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: "250px",
      align: "left",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      render: renderContent("tenDichVu"),
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          searchSelect={
            <Select
              defaultValue=""
              data={[
                { id: "", ten: "Tất cả" },
                ...listtrangThaiDichVu.filter((item) =>
                  TRANG_THAI_FILTER.includes(item.id)
                ),
              ]}
              placeholder="Chọn trạng thái"
              onChange={onSearchInput("trangThai")}
            />
          }
        />
      ),
      width: "150px",
      align: "left",
      dataIndex: "trangThai",
      key: "trangThai",
      render: renderContent("trangThai"),
    },
    {
      title: (
        <HeaderSearch
          title="Kết quả"
          search={
            <Input
              placeholder="Tìm theo mô tả"
              onChange={onSearchInput("ketQua", true)}
            />
          }
        />
      ),
      width: "140px",
      textAlign: "left",
      dataIndex: "ketQua",
      key: "ketQua",
      render: renderContent("ketQua"),
    },
    {
      title: (
        <HeaderSearch
          search={
            <Input
              placeholder="Tìm theo chỉ số thấp"
              onChange={onSearchInput("chiSoThap", true)}
            />
          }
          title="Chỉ số thấp"
        />
      ),
      width: "120px",
      dataIndex: "chiSoThap",
      key: "chiSoThap",
      align: "right",
      render: renderContent("chiSoThap"),
    },
    {
      title: (
        <HeaderSearch
          search={
            <Input
              placeholder="Tìm theo chỉ số cao"
              onChange={onSearchInput("chiSoCao", true)}
            />
          }
          title="Chỉ số cao"
        />
      ),
      width: "120px",
      dataIndex: "chiSoCao",
      key: "chiSoCao",
      align: "right",
      render: renderContent("guiLis"),
    },
    {
      title: <HeaderSearch title="Đánh giá kết quả" />,
      width: "100px",
      align: "center",
      dataIndex: "phanLoaiKetQua",
      key: "phanLoaiKetQua",
      render: (item, data) => {
        return listphanLoaiKetQuaXetNghiem.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn vị"
          search={
            <Input
              placeholder="Tìm theo mô tả"
              onChange={onSearchInput("donVi")}
            />
          }
        />
      ),
      width: "100px",
      align: "left",
      dataIndex: "donVi",
      key: "donVi",
      render: renderContent("donVi"),
    },
    {
      title: (
        <HeaderSearch
          title="Kết luận"
          search={
            <Input
              placeholder="Tìm theo mô tả"
              onChange={onSearchInput("ketLuan")}
            />
          }
        />
      ),
      width: "200px",
      align: "left",
      dataIndex: "ketLuan",
      key: "ketLuan",
      render: renderContent("ketLuan"),
    },
    {
      title: (
        <HeaderSearch
          title="Bàn luận"
          search={
            <Input
              placeholder="Tìm theo mô tả"
              onChange={onSearchInput("banLuan")}
            />
          }
        />
      ),
      width: "200px",
      align: "left",
      dataIndex: "banLuan",
      key: "banLuan",
      render: renderContent("banLuan"),
    },
    {
      title: (
        <HeaderSearch
          title="Mã máy"
          searchSelect={
            <Select placeholder="Tìm mã máy" data={listDataTongHop} />
          }
        />
      ),
      width: "200px",
      align: "left",
      dataIndex: "maMayId",
      key: "maMayId",
      render: renderContent("maMayId"),
    },
    {
      title: <HeaderSearch title="Chi tiết" />,
      width: "70px",
      dataIndex: "exclamation",
      fixed: "right",
      key: "exclamation",
      align: "center",
      render: renderExclamation("exclamation"),
    },
  ];
  const onPriviewPdf = () => {
    getPhieuKetQua({}).then((s) => {
      let data = s.map((item) => {
        return item.file.pdf;
      });
      printProvider.printMergePdf(data);
    });
  };
  const renderHeaderRight = () => (
    <>
      {state.selectedBtn.some((item) =>
        TRANG_THAI["XAC_NHAN_TIEP_NHAN_MAU"].includes(item)
      ) && (
        <>
          {checkRole([ROLES["XET_NGHIEM"].HUY_MAU_HH]) && (
            <Button
              className="button-header btn-small"
              onClick={handleCancel("cancel")}
            >
              Hủy mẫu
            </Button>
          )}
          {checkRole([ROLES["XET_NGHIEM"].TIEP_NHAN_MAU_HH]) && (
            <Button
              className={"button-ok btn-small"}
              onClick={handleSubmit("accept")}
            >
              Tiếp nhận mẫu
            </Button>
          )}
        </>
      )}
      {state.selectedBtn.some((item) =>
        TRANG_THAI["XAC_NHAN_KET_QUA"].includes(item)
      ) &&
        checkRole([ROLES["XET_NGHIEM"].NHAP_KET_QUA_HH]) && (
          <>
            <Button
              className="button-header btn-small"
              onClick={handleSubmit("cancel")}
            >
              Hủy tiếp nhận mẫu
            </Button>
            <Button className="button-ok btn-small" onClick={onUpdateResult}>
              Lưu kết quả
            </Button>
            <Button
              className="button-ok btn-small"
              onClick={onResult("accept")}
            >
              Có kết quả
            </Button>
          </>
        )}

      {state.selectedBtn.some((item) =>
        TRANG_THAI["CO_KET_QUA"].includes(item)
      ) &&
        checkRole([ROLES["XET_NGHIEM"].DUYET_KET_QUA_HH]) && (
          <>
            <Button
              className="button-header btn-small"
              onClick={onResult("cancel")}
            >
              Hủy kết quả
            </Button>
            <Button
              className="button-ok btn-small"
              onClick={onConfirmResult("accept")}
            >
              Duyệt kết quả
            </Button>
          </>
        )}
      {state.selectedBtn.some((item) =>
        TRANG_THAI["DUYET_KET_QUA"].includes(item)
      ) && (
        <>
          {checkRole([ROLES["XET_NGHIEM"].HUY_DUYET_KET_QUA_HH]) && (
            <Button
              className="button-header btn-small"
              onClick={onConfirmResult("cancel")}
            >
              Hủy duyệt kết quả
            </Button>
          )}
        </>
      )}
      {state.selectedBtn.some((item) => TRANG_THAI["IN"].includes(item)) &&
        checkRole([ROLES["XET_NGHIEM"].IN_KET_QUA_HH]) && (
          <>
            <Button
              className="button-header btn-small"
              onClick={() => onPriviewPdf()}
            >
              In kết quả
            </Button>
          </>
        )}
    </>
  );

  return (
    <Main>
      <MainTable
        contentHeaderLeft="Danh sách dịch vụ"
        contentHeaderRight={renderHeaderRight()}
      >
        <TableWrapper
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={state.dataTable}
          expandIconColumnIndex={3}
          className="custom-nestedtable"
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
          rowClassName={(record) =>
            record.type === "soPhieu" ? "sophieu" : ""
          }
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) => {
              if (!record.children?.length) return null;
              return expanded ? (
                <CaretDownOutlined onClick={(e) => onExpand(record, e)} />
              ) : (
                <CaretUpOutlined onClick={(e) => onExpand(record, e)} />
              );
            },
          }}
        />
        <ModalNotification ref={refNotification} />
      </MainTable>
    </Main>
  );
};

export default DanhSachDichVu;
