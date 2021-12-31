import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupBy } from "lodash";
import moment from "moment";
import { Input, DatePicker, message, Button } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Checkbox from "components/Checkbox";
import { isNumber, TRANG_THAI } from "../../configs";
import { TRANG_THAI_LAY_MAU_BN } from "constants/index";

import { Main } from "./styled";
import MainTable from "pages/xetNghiem/components/tableXetNghiem";
import { ModalNotification } from "pages/chanDoanHinhAnh/components/ModalNotification";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
let timer = null;

const DanhSachDichVu = ({ layerId }) => {
  const [state, _setState] = useState({
    isCheckedAll: true,
    dataTable: [],
    listKeys: [],
    selectedRowKeys: [], // [{soPhieu}-{nhomDichVuCap2Id}-{dichVuId}]
    status: null,
    selectedBtn: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refModalNotification = useRef(null);
  const refInputMaDv = useRef(null);
  const {
    layMauXN: { listServices = [], nbDotDieuTriId },
    utils: { listtrangThaiDichVu = [] },
    nbXetNghiem: { listData: listNb },
  } = useSelector((state) => state);

  const {
    layMauXN: {
      getTongHopDichVuXN,
      xacNhanlayMau,
      onChangeInputSearchDSDV: onChangeInputSearch,
      updateData,
      tiepNhan,
      boQua,
    },
    utils: { getUtils },
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
    const dsTrangThai = TRANG_THAI_LAY_MAU_BN.map((item) => item.value);
    updateData({ dsTrangThai });
    getUtils({ name: "trangThaiDichVu" });
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
          }));
          listAllKeys.push(`${item}-${v.nhomDichVuCap2Id}-${v.id}`);
          return {
            ...v,
            children,
            stt: idx + 1,
            id: `${item}-${v.nhomDichVuCap2Id}-${v.id}`,
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
      status: listServices?.[0]?.trangThai,
    });
  }, [listServices]);

  useEffect(() => {
    const listServiceIds = [];
    state.selectedRowKeys.forEach((item) => {
      if (
        item.indexOf("-") > 0 &&
        item.indexOf("-") !== item.lastIndexOf("-")
      ) {
        const id = item.slice(item.lastIndexOf("-") + 1, item.length);
        listServiceIds.push(parseInt(id));
      }
    });
    let listStatus = listServices
      .filter((item) => listServiceIds.includes(item.id))
      .map((item) => item.trangThai);
    setState({ selectedBtn: [...new Set(listStatus)] });
  }, [state.selectedRowKeys]);

  const handleSubmit = (status) => () => {
    const listServiceIds = [];
    state.selectedRowKeys.forEach((item) => {
      if (
        item.indexOf("-") > 0 &&
        item.indexOf("-") !== item.lastIndexOf("-")
      ) {
        const id = item.slice(item.lastIndexOf("-") + 1, item.length);
        listServiceIds.push(parseInt(id));
      }
    });
    if (!listServiceIds.length) {
      message.error("Mời chọn dịch vụ!");
      return;
    }
    xacNhanlayMau({ data: listServiceIds, status }).then((s) => {
      if (s.code === 0) {
        getTongHopDichVuXN({ nbDotDieuTriId });
        setState({
          status: s?.data[0]?.trangThai,
          isCheckedAll: false,
        });
      }
      if (s.code == 7609) {
        refModalNotification.current &&
          refModalNotification.current.show({
            title: "Thông báo",
            content: s.message,
            okText: "Đóng",
            classNameOkText: "button-closel",
            showBtnOk: true,
          });
      }
    });
  };

  const handleService = (key) => {
    const listServiceIds = [];
    state.selectedRowKeys.forEach((item) => {
      if (
        item.indexOf("-") > 0 &&
        item.indexOf("-") !== item.lastIndexOf("-")
      ) {
        const id = item.slice(item.lastIndexOf("-") + 1, item.length);
        listServiceIds.push(parseInt(id));
      }
    });
    if (!listServiceIds.length) {
      message.error("Mời chọn dịch vụ!");
      return;
    }
    if (key == "accept") {
      tiepNhan({ data: listServiceIds })
        .then((s) => {
          if (s.code === 0) {
            getTongHopDichVuXN({ nbDotDieuTriId });
          }
        })
        .catch((e) => {
          refModalNotification.current &&
            refModalNotification.current.show({
              title: "Thông báo",
              content: e.message,
              okText: "Đóng",
              classNameOkText: "button-closel",
              showBtnOk: true,
            });
        });
    } else {
      boQua({ data: listServiceIds }).then((s) => {
        if (s.code === 0) {
          getTongHopDichVuXN({ nbDotDieuTriId });
        }
      });
    }
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

  const renderContent = (type) => (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (type === "thoiGianThucHien") {
      obj.children = moment(value).format("DD/MM/YYYY");
    }

    if (type === "trangThai") {
      const currentStatus = listtrangThaiDichVu.find(
        (item) => item.id === value
      );
      obj.children = currentStatus?.ten;
    }

    if (type === "guiLis") {
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
      render: (text, row, index) => {
        if (!["soPhieu", "dichVuCap2"].includes(row.type)) {
          return <span>{text}</span>;
        }
        return {
          children: <span>{text}</span>,
          props: {
            colSpan: 9,
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
      title: <HeaderSearch title="SL" />,
      width: "25px",
      align: "right",
      dataIndex: "soLuong",
      key: "soLuong",
      render: renderContent("soLuong"),
    },
    {
      title: (
        <HeaderSearch
          // searchSelect={
          //   <Select
          //     defaultValue=""
          //     data={[
          //       { id: "", ten: "Tất cả" },
          //       ...listtrangThaiDichVu.filter((item) =>
          //         TRANG_THAI_FILTER_LAY_MAU.includes(item.id)
          //       ),
          //     ]}
          //     placeholder="Chọn trạng thái"
          //     onChange={onSearchInput("trangThai")}
          //   />
          // }
          title="Trạng thái"
        />
      ),
      width: "60px",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "left",
      render: renderContent("trangThai"),
    },
    {
      title: <HeaderSearch title="Đã gửi lis" />,
      width: "40px",
      dataIndex: "guiLis",
      key: "guiLis",
      align: "center",
      render: renderContent("guiLis"),
    },
    {
      title: (
        <HeaderSearch
          title="Ngày thực hiện"
          searchSelect={
            <DatePicker
              placeholder="Từ ngày"
              format="DD/MM/YYYY"
              onChange={onSearchInput("thoiGianThucHien")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: "60px",
      align: "left",
      dataIndex: "thoiGianThucHien",
      key: "thoiGianThucHien",
      render: renderContent("thoiGianThucHien"),
    },
    {
      title: (
        <HeaderSearch
          title="Bác sĩ chỉ định"
          search={
            <Input
              placeholder="Tìm theo mô tả"
              onChange={onSearchInput("tenBacSiChiDinh")}
            />
          }
        />
      ),
      width: "90px",
      align: "left",
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      render: renderContent("tenBacSiChiDinh"),
    },
    {
      title: (
        <HeaderSearch
          title="Khoa chỉ định"
          search={
            <Input
              placeholder="Tìm theo mô tả"
              onChange={onSearchInput("tenKhoaChiDinh")}
            />
          }
        />
      ),
      width: "90px",
      align: "left",
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      render: renderContent("tenKhoaChiDinh"),
    },
  ];

  const renderHeaderRight = (status) => {
    return (
      <>
        {checkRole([ROLES["XET_NGHIEM"].TIEP_NHAN_MAU]) &&
          state.selectedBtn.some(
            (item) =>
              TRANG_THAI["BO_QUA"].includes(item) ||
              TRANG_THAI["XAC_NHAN_LAY_MAU"].includes(item)
          ) && (
            <Button
              className="button-ok"
              onClick={() => handleService("accept")}
            >
              Tiếp nhận
            </Button>
          )}
        {checkRole([ROLES["XET_NGHIEM"].XAC_NHAN_LAY_MAU]) &&
          state.selectedBtn.some(
            (item) =>
              TRANG_THAI["HUY_MAU"].includes(item) ||
              TRANG_THAI["CHUAN_BI_LAY_MAU"].includes(item)
          ) && (
            <Button className="button-ok" onClick={handleSubmit("accept")}>
              Xác nhận lấy mẫu
            </Button>
          )}
        {checkRole([ROLES["XET_NGHIEM"].BO_QUA]) &&
          state.selectedBtn.some(
            (item) =>
              TRANG_THAI["XAC_NHAN_LAY_MAU"].includes(item) ||
              TRANG_THAI["CHUAN_BI_LAY_MAU"].includes(item)
          ) && (
            <Button
              className="button-header"
              onClick={() => handleService("ignore")}
            >
              Bỏ qua
            </Button>
          )}
      </>
    );
  };

  return (
    <Main>
      <MainTable
        contentHeaderLeft="Danh sách dịch vụ"
        contentHeaderRight={renderHeaderRight(state.status)}
      >
        <TableWrapper
          scroll={{ x: 700 }}
          columns={columns}
          dataSource={state.dataTable}
          expandIconColumnIndex={3}
          className="custom-nestedtable"
          rowSelection={rowSelection}
          rowClassName={(record) =>
            record.type === "soPhieu" ? "sophieu" : ""
          }
          rowKey={(record) => record.id}
          expandable={{
            // expandRowByClick: true,
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
        <ModalNotification ref={refModalNotification} />
      </MainTable>
    </Main>
  );
};

export default DanhSachDichVu;
