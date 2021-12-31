import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Input, DatePicker, message, Button, Image, Popover } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Checkbox from "components/Checkbox";
import { isNumber, TRANG_THAI } from "../../configs";
import { Main } from "./styled";
import MainTable from "pages/chanDoanHinhAnh/components/TableCDHA";
import Exclamation from "assets/images/xetNghiem/exclamation.png";
import ModalChiTietDichVu from "pages/chanDoanHinhAnh/components/ModalChiTietDichVu";
import ModalPhanPhong from "pages/chanDoanHinhAnh/components/ModalPhanPhong";
import { ModalNotification2 } from "components/ModalConfirm";
import ModalChiTietDichVuTiepNhan from "pages/chanDoanHinhAnh/components/ModalChiTietDichVuTiepNhan";
import { ModalNotification } from "pages/chanDoanHinhAnh/components/ModalNotification";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import IcPdf from "assets/images/xetNghiem/icPdf.png";
import IcViewImagePacs from "assets/images/xetNghiem/icViewImagePacs.png";
import printProvider from "data-access/print-provider";
import IcPdfHide from "assets/images/xetNghiem/icPdfHide.png";
import IcViewImagePacsHide from "assets/images/xetNghiem/icViewImagePacsHide.png";
import IcOption from "assets/images/xetNghiem/icOption.png";
import IcChangeService from "assets/images/xetNghiem/icChangeService.png";
import IcCreateService from "assets/images/xetNghiem/icCreateService.png";
import IcChangeServiceHide from "assets/images/xetNghiem/icChangeServiceHide.png";
import ThongTin from "pages/chanDoanHinhAnh/tiepNhan/ThongTin";
import ModalChiDinhDichVuThem from "pages/chanDoanHinhAnh/tiepNhan/ModalChiDinhDichVuThem";
import ModalDoiDichVu from "pages/chanDoanHinhAnh/tiepNhan/ModalDoiDichVu";
import ModalHoanDichVu from "pages/chanDoanHinhAnh/tiepNhan/ModalHoanDichVu";

let timer = null;

const DanhSachDichVu = ({ layerId }) => {
  const refMaDV = useRef(null);
  const { listServices = [], nbDotDieuTriId } = useSelector(
    (state) => state.choTiepDonDV
  );
  const { listtrangThaiDichVu = [], listtrangThaiHoan = [] } = useSelector(
    (state) => state.utils
  );

  const {
    choTiepDonDV: {
      getTongHopDichVuCLS,
      updateData,
      onChangeInputSearch,
      huyTiepNhanDv,
      tiepNhanDv,
      coKetQuaDv,
      huyKetQuaDv,
    },
    utils: { getUtils },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const [state, _setState] = useState({
    isCheckedAll: false,
    listKeys: [],
    selectedRowKeys: [],
    status: null,
    selectedBtn: [],
    content: "",
    dsDichVuId: [],
    listDichVuId: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );
  const [data, setData] = useState();
  const ChiTietDichVuRef = useRef(null);
  const refModalPhanPhong = useRef(null);
  const ChiTietDichVuTiepNhanRef = useRef(null);
  const ThongTinDichVuRef = useRef(null);
  const WarningServiceRef = useRef(null);
  const ChiDinhDichVuRef = useRef(null);
  const DoiDichVuRef = useRef(null);
  const HoanDichVuRef = useRef(null);

  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refMaDV.current && refMaDV.current.focus();
          },
        },
      ],
    });
  }, []);

  const handleDichVu = (data) => {
    if (ChiTietDichVuRef.current) ChiTietDichVuRef.current.show(data);
  };

  const onChiDichDichVu = (data) => {
    if (ChiDinhDichVuRef.current) ChiDinhDichVuRef.current.show(data);
  };

  const onDoiDichVu = (data) => {
    if (
      TRANG_THAI["CHO_TIEP_NHAN"].includes(data?.trangThai) &&
      data.trangThaiHoan &&
      data.trangThaiHoan === 0
    ) {
      if (DoiDichVuRef.current) DoiDichVuRef.current.show(data);
    } else {
      return null;
    }
  };

  const onHoanDichVu = (data, selectedRowKeys) => {
    if (HoanDichVuRef.current)
      HoanDichVuRef.current.show(data, selectedRowKeys);
  };

  const handleDichVuTiepNhan = (data) => {
    if (ChiTietDichVuTiepNhanRef.current) {
      ChiTietDichVuTiepNhanRef.current.showTiepNhan(data);
      updateData({ chiDinhTuDichVuId: data?.id });
    }
  };

  const handlePhong = (selectedRowKeys, dsDichVuId) => {
    refModalPhanPhong.current &&
      refModalPhanPhong.current.show(selectedRowKeys, dsDichVuId);
  };

  useEffect(() => {
    updateData({ dsTrangThai: [25, 35, 43] });
    getUtils({ name: "trangThaiDichVu" });
    getUtils({ name: "trangThaiHoan" });
  }, []);

  useEffect(() => {
    let listStatus = listServices
      .filter((item) => state.selectedRowKeys.includes(item.id))
      .map((item) => item.trangThai);
    setState({ selectedBtn: [...new Set(listStatus)] });
  }, [state.selectedRowKeys]);

  useEffect(() => {
    if (nbDotDieuTriId) {
      getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
      setState({ isCheckedAll: false });
    }
  }, [nbDotDieuTriId]);

  useEffect(() => {
    let listAllKeys = []; // Id record format: {soPhieu}-{nhomDichVuCap2Id}-{dichVuId}
    let listAllDichVuId = [];
    const data = listServices.map((item, index) => {
      listAllKeys.push(item.id);
      listAllDichVuId.push(item.dichVuId);
      return { ...item, stt: index + 1 };
    });
    setState({
      listKeys: listAllKeys,
      listDichVuId: listAllDichVuId,
    });
    setData(data);
  }, [listServices]);

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
      onChangeInputSearch(
        {
          [key]: value,
        },
        paramCheck
      );
    }, 300);
  };

  const renderContent = (type) => (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };

    if (type === "thoiGianChiDinh") {
      obj.children = moment(value).format("DD/MM/YYYY");
    }

    if (type === "trangThai") {
      let currentStatus = "";
      if (row.trangThaiHoan && row.trangThaiHoan !== 0) {
        currentStatus = listtrangThaiHoan.find(
          (item) => item.id === row.trangThaiHoan
        );
      } else {
        currentStatus = listtrangThaiDichVu.find((item) => item.id === value);
      }
      obj.children = currentStatus?.ten;
    }

    if (type === "guiPacs" || type === "thanhToan") {
      obj.children = <Checkbox checked={value} onChange={() => {}} />;
    }

    if (["soPhieu", "dichVuCap2"].includes(row.type)) {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
      dsDichVuId: e.target?.checked ? state.listDichVuId : [],
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    let updateSelectDichVuId = data.map((item) => item.dichVuId);
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    updateSelectDichVuId = [...new Set(updateSelectDichVuId)];
    if (listServices.length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
        dsDichVuId: updateSelectDichVuId,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
        dsDichVuId: updateSelectDichVuId,
      });
    }
  };
  const handleTiepNhan = () => {
    let dataService = listServices
      .filter(
        (item) =>
          state.selectedRowKeys.includes(item.id) &&
          !TRANG_THAI["TIEP_NHAN"].includes(item.trangThai)
      )
      .map(
        (x) =>
          x.tenDichVu +
            " trạng thái " +
            listtrangThaiDichVu
              .find((t) => t.id === x.trangThai)
              ?.ten.toLowerCase() || ""
      );
    if (dataService.length > 0) {
      WarningServiceRef.current &&
        WarningServiceRef.current.show({
          title: "Cảnh báo",
          content: `NB có dịch vụ ${dataService} không thể tiếp nhận. Vui lòng bỏ chọn dịch vụ này trước khi nhấn Tiếp nhận!`,
          cancelText: "Quay lại",
          showImg: false,
        });
    } else {
      tiepNhanDv(state.selectedRowKeys)
        .then((s) => {
          if (s) {
            getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
            setState({ isCheckedAll: false, selectedRowKeys: [] });
          }
        })
        .catch((error) => {
          if (error?.code == 7609) {
            ThongTinDichVuRef.current &&
              ThongTinDichVuRef.current.show({
                title: "Thông báo",
                content: error.message,
                okText: "Đóng",
                classNameOkText: "button-closel",
                showBtnOk: true,
              });
          }
        });
    }
  };

  const handleHuyTiepNhan = () => {
    let dataService = listServices
      .filter(
        (item) =>
          state.selectedRowKeys.includes(item.id) &&
          !TRANG_THAI["DA_TIEP_NHAN"].includes(item.trangThai)
      )
      .map(
        (x) =>
          x.tenDichVu +
            " trạng thái " +
            listtrangThaiDichVu
              .find((t) => t.id === x.trangThai)
              ?.ten.toLowerCase() || ""
      );
    if (dataService.length > 0) {
      WarningServiceRef.current &&
        WarningServiceRef.current.show({
          title: "Cảnh báo",
          content: `NB có dịch vụ ${dataService} không thể tiếp nhận. Vui lòng bỏ chọn dịch vụ này trước khi nhấn Hủy tiếp nhận!`,
          cancelText: "Quay lại",
          showImg: false,
        });
    } else {
      huyTiepNhanDv(state.selectedRowKeys).then((s) => {
        if (s) {
          getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
          setState({ isCheckedAll: false, selectedRowKeys: [] });
        }
      });
    }
  };

  const handleCoKetQua = () => {
    let dataService = listServices
      .filter(
        (item) =>
          state.selectedRowKeys.includes(item.id) &&
          !TRANG_THAI["DA_TIEP_NHAN"].includes(item.trangThai)
      )
      .map(
        (x) =>
          x.tenDichVu +
            " trạng thái " +
            listtrangThaiDichVu
              .find((t) => t.id === x.trangThai)
              ?.ten.toLowerCase() || ""
      );
    if (dataService.length > 0) {
      WarningServiceRef.current &&
        WarningServiceRef.current.show({
          title: "Cảnh báo",
          content: `NB có dịch vụ ${dataService} không thể tiếp nhận. Vui lòng bỏ chọn dịch vụ này trước khi nhấn Có kết quả!`,
          cancelText: "Quay lại",
          showImg: false,
        });
    } else {
      coKetQuaDv(state.selectedRowKeys).then((s) => {
        if (s) {
          getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
          setState({ isCheckedAll: false, selectedRowKeys: [] });
        }
      });
    }
  };

  const handleHuyKetQua = () => {
    let dataService = listServices
      .filter(
        (item) =>
          state.selectedRowKeys.includes(item.id) &&
          !TRANG_THAI["DA_CO_KET_QUA"].includes(item.trangThai)
      )
      .map(
        (x) =>
          x.tenDichVu +
            " trạng thái " +
            listtrangThaiDichVu
              .find((t) => t.id === x.trangThai)
              ?.ten.toLowerCase() || ""
      );
    if (dataService.length > 0) {
      WarningServiceRef.current &&
        WarningServiceRef.current.show({
          title: "Cảnh báo",
          content: `NB có dịch vụ ${dataService} không thể tiếp nhận. Vui lòng bỏ chọn dịch vụ này trước khi nhấn Hủy kết quả!`,
          cancelText: "Quay lại",
          showImg: false,
        });
    } else {
      WarningServiceRef.current &&
        WarningServiceRef.current.show(
          {
            title: "Cảnh báo",
            content: `DV đã có KQ, bạn có chắc chắn muốn hủy KQ?`,
            cancelText: "Quay lại",
            showBtnOk: true,
          },
          () => {
            huyKetQuaDv(state.selectedRowKeys).then((s) => {
              if (s) {
                getTongHopDichVuCLS({ nbDotDieuTriId }, paramCheck);
                setState({ isCheckedAll: false, selectedRowKeys: [] });
              }
            });
          }
        );
    }
  };

  const printPdf = (data) => {
    if (data?.dsFileKetQua) printProvider.printMergePdf(data?.dsFileKetQua);
  };

  const openViewPacs = (data) => {
    if (data?.anhKetQua) window.open(data?.anhKetQua, "_blank").focus();
  };

  const content = (data) => (
    <div className="option">
      <div onClick={() => onDoiDichVu(data)}>
        <img
          src={
            TRANG_THAI["CHO_TIEP_NHAN"].includes(data?.trangThai) &&
            data.trangThaiHoan &&
            data.trangThaiHoan === 0
              ? IcChangeService
              : IcChangeServiceHide
          }
        />
        <span
          style={{
            paddingLeft: "10px",
            color: `${
              TRANG_THAI["CHO_TIEP_NHAN"].includes(data?.trangThai) &&
              data.trangThaiHoan &&
              data.trangThaiHoan === 0
                ? ""
                : "#a6a6a6"
            }`,
          }}
        >
          Đổi dịch vụ
        </span>
      </div>
      <div style={{ paddingTop: "15px" }} onClick={() => onChiDichDichVu(data)}>
        <img src={IcCreateService} />
        <span style={{ paddingLeft: "10px" }}>Chỉ định thêm</span>
      </div>
    </div>
  );
  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          ></Checkbox>
        }
      />
    ),
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã DV"
          search={
            <Input
              ref={refMaDV}
              placeholder="Tìm mã thiết lập"
              onChange={onSearchInput("maDichVu")}
            />
          }
        />
      ),
      align: "left",
      width: "40px",
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
      width: "150px",
      align: "left",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      render: renderContent("tenDichVu"),
    },
    {
      title: <HeaderSearch title="Số phiếu" />,
      width: "40px",
      align: "right",
      dataIndex: "soPhieu",
      key: "soPhieu",
      render: renderContent("soPhieu"),
    },
    {
      title: (
        <HeaderSearch
          title="ID"
          search={
            <Input placeholder="Tìm theo Id" onChange={onSearchInput("id")} />
          }
        />
      ),
      width: "50px",
      align: "right",
      dataIndex: "id",
      key: "id",
      render: renderContent("tenDichVu"),
    },
    {
      title: <HeaderSearch title="Trạng thái" />,
      width: "60px",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "left",
      render: renderContent("trangThai"),
    },
    {
      title: <HeaderSearch title="Đã gửi PACS" />,
      width: "40px",
      dataIndex: "guiPacs",
      key: "guiPacs",
      align: "center",
      render: renderContent("guiPacs"),
    },
    {
      title: (
        <HeaderSearch
          title="Ngày chỉ định"
          searchSelect={
            <DatePicker
              placeholder="Từ ngày"
              format="DD/MM/YYYY"
              onChange={onSearchInput("thoiGianChiDinh")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: "60px",
      align: "left",
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      render: renderContent("thoiGianChiDinh"),
    },
    {
      title: <HeaderSearch title="Đã TT" />,
      width: "50px",
      align: "center",
      dataIndex: "thanhToan",
      key: "thanhToan",
      render: renderContent("thanhToan"),
    },
    {
      title: <HeaderSearch title="" />,
      width: "65px",
      align: "center",
      dataIndex: "action",
      key: "action",
      render: (value, data) => {
        return (
          <div>
            <Image
              preview={false}
              src={Exclamation}
              onClick={() =>
                paramCheck ? handleDichVuTiepNhan(data) : handleDichVu(data)
              }
            />
            {paramCheck && (
              <Image
                preview={false}
                src={data?.dsFileKetQua ? IcPdf : IcPdfHide}
                onClick={() => printPdf(data)}
              />
            )}
            {paramCheck && (
              <Image
                preview={false}
                src={data?.anhKetQua ? IcViewImagePacs : IcViewImagePacsHide}
                onClick={() => openViewPacs(data)}
              />
            )}
            {paramCheck && (
              <Popover
                trigger="click"
                content={content(data)}
                placement="bottomLeft"
              >
                <Image
                  preview={false}
                  src={IcOption}
                  onClick={() => openViewPacs(data)}
                />
              </Popover>
            )}
          </div>
        );
      },
    },
  ];
  console.log("state.selectedBtn", state.selectedBtn);
  console.log(
    "state.data",
    (data || []).find((x) => x.trangThaiHoan && x.trangThaiHoan !== 0)
  );
  console.log("state.selectedRowKeys", state.selectedRowKeys);

  const renderHeaderRight = () => (
    <>
      {state.selectedBtn.length > 0 &&
        ((data || []).find(
          (x) =>
            x.trangThaiHoan &&
            x.trangThaiHoan !== 0 &&
            state?.selectedRowKeys.includes(x.id)
        ) ||
        state.selectedBtn.find(
          (item) => !TRANG_THAI["CHO_TIEP_NHAN"].includes(item)
        ) ? (
          ""
        ) : (
          <>
            <Button
              className="button-ok btn-small"
              onClick={() => onHoanDichVu(data, state?.selectedRowKeys)}
            >
              Yêu cầu hoàn
            </Button>
          </>
        ))}
      {state.selectedBtn.some((item) =>
        TRANG_THAI["DA_TIEP_NHAN"].includes(item)
      ) && (
        <>
          {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].HUY_TIEP_NHAN_DICH_VU]) && (
            <Button
              className="button-header btn-small"
              onClick={() => handleHuyTiepNhan()}
            >
              Hủy tiếp nhận
            </Button>
          )}
          {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].CO_KET_QUA]) && (
            <Button
              className="button-ok btn-small"
              onClick={() => handleCoKetQua()}
            >
              Có kết quả
            </Button>
          )}
        </>
      )}

      {state.selectedBtn.some((item) =>
        TRANG_THAI["TIEP_NHAN"].includes(item)
      ) &&
        !(data || [])?.find(
          (x) =>
            x.trangThaiHoan &&
            x.trangThaiHoan !== 0 &&
            state?.selectedRowKeys.includes(x.id)
        ) &&
        checkRole([ROLES["CHAN_DOAN_HINH_ANH"].TIEP_NHAN_DICH_VU]) && (
          <>
            <Button
              className="button-ok btn-small"
              onClick={() => handleTiepNhan()}
            >
              Tiếp nhận
            </Button>
            <Button className="button-header btn-small">Bỏ qua</Button>
          </>
        )}

      {state.selectedBtn.some((item) =>
        TRANG_THAI["DA_CO_KET_QUA"].includes(item)
      ) && (
        <>
          {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].IN_KET_QUA]) && (
            <Button className="button-ok btn-small">In kết quả</Button>
          )}
          {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].HUY_CO_KET_QUA]) && (
            <Button
              className="button-ok btn-small"
              onClick={() => handleHuyKetQua()}
            >
              Hủy kết quả
            </Button>
          )}
        </>
      )}

      {state.selectedRowKeys?.length > 0 &&
        !paramCheck &&
        checkRole([ROLES["CHAN_DOAN_HINH_ANH"].PHAN_PHONG_CHO_TIEP_DON]) && (
          <>
            <Button
              className="button-ok"
              onClick={() =>
                handlePhong(state.selectedRowKeys, state.dsDichVuId)
              }
            >
              Phân phòng
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
          scroll={{ x: 700 }}
          columns={columns}
          dataSource={data}
          expandIconColumnIndex={3}
          className="custom-nestedtable"
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
          expandable={{
            expandRowByClick: true,
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
      </MainTable>
      <ModalChiTietDichVu ref={ChiTietDichVuRef} />
      <ModalPhanPhong ref={refModalPhanPhong} />
      <ModalChiTietDichVuTiepNhan ref={ChiTietDichVuTiepNhanRef} />
      <ModalNotification2 ref={WarningServiceRef} />
      <ModalNotification ref={ThongTinDichVuRef} />
      <ModalNotification2 ref={WarningServiceRef} />
      <ModalChiDinhDichVuThem ref={ChiDinhDichVuRef} />
      <ModalDoiDichVu ref={DoiDichVuRef} />
      <ModalHoanDichVu ref={HoanDichVuRef} />
    </Main>
  );
};

export default DanhSachDichVu;
