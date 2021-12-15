import React, { useState, useEffect, useMemo } from "react";
import { Collapse } from "antd";
import Header from "./Header";
import DanhSachDichVu from "./DanhSachDichVu";
import { groupBy, orderBy } from "lodash";
import { CollapseWrapper } from "./styled";
import { connect } from "react-redux";
import { TRANG_THAI_DICH_VU } from "constants/index";
const { Panel } = Collapse;

function KetQua(props) {
  const {
    chiDinhTuDichVuId,
    dsKetQuaXN,
    dsKetQuaDichVuCLS,
    getDsKetQuaXN,
    getDsKetQuaDichVuCLS,
  } = props;

  const [state, _setState] = useState({
    collapsedKey: null,
    dataSortColumn: {},
  });

  useEffect(() => {
    if (chiDinhTuDichVuId) {
      getDsKetQuaXN();
      getDsKetQuaDichVuCLS();
    }
  }, [chiDinhTuDichVuId]);

  const setState = (data) => {
    _setState((state) => {
      return {
        ...state,
        ...data,
      };
    });
  };

  const onCollapsed = (value) => {
    setState({
      collapsedKey: value,
    });
  };

  const groupAndOrderItem = (items, groupkey, orderKey) => {
    const groupData = groupBy(items, "trangChiDinh");
    const data = {};
    Object.keys(groupData).forEach((trangChiDinh) => {
      data[`${trangChiDinh}-${groupkey}`] = orderBy(
        groupData[trangChiDinh],
        orderKey,
        "asc"
      );
    });

    return data;
  };

  const dataKetQuaXN = useMemo(() => {
    return groupAndOrderItem(dsKetQuaXN, "xn", [
      "phieuChiDinh",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsKetQuaXN]);

  const dataKetQuaDichVuCLS = useMemo(() => {
    return groupAndOrderItem(dsKetQuaDichVuCLS, "cls", [
      "phieuChiDinh",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsKetQuaDichVuCLS]);

  const dataSource = useMemo(() => {
    return { ...dataKetQuaXN, ...dataKetQuaDichVuCLS };
  }, [dataKetQuaXN, dataKetQuaDichVuCLS]);

  const listPanel = useMemo(() => {
    return Object.keys(dataSource).map((key, index) => {
      const {
        soPhieu,
        tenNhomDichVuCap1,
        tenNhomDichVuCap2,
        tenNhomDichVuCap3,
        tenBacSiChiDinh,
        tenKhoaThucHien,
        nhomDichVuCap1Id,
      } = dataSource[key][0] || {};
      const title = `Kết quả ${tenNhomDichVuCap1 || ""} ${
        tenNhomDichVuCap2 || ""
        } ${tenNhomDichVuCap3 || ""}`;
      if (dataSource[key][0].trangThai >= TRANG_THAI_DICH_VU.DA_CO_KET_QUA) {
        return {
          header: (
            <Header
              title={title}
              isCollapsed={state.collapsedKey === key}
              key={key}
            />
          ),
          content: (
            <DanhSachDichVu
              dataGroup={dataSource[key]}
              dataSortColumn={state.dataSortColumn}
              soPhieu={soPhieu}
              tenBacSiChiDinh={tenBacSiChiDinh}
              tenKhoaThucHien={tenKhoaThucHien}
              nhomDichVuCap1Id={nhomDichVuCap1Id}
            />
          ),
          key,
        };
      }
    }).filter(item => item);
  }, [dataSource, state.dataSortColumn, state.collapsedKey]);

  return (
    <div className="collapse-content">
      <CollapseWrapper bordered={false} accordion onChange={onCollapsed}>
        {listPanel.map((panel, idx) => (
          <Panel showArrow={false} key={panel.key} header={panel.header}>
            {panel.content}
          </Panel>
        ))}
      </CollapseWrapper>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    ketQuaKham: { dsKetQuaXN, dsKetQuaDichVuCLS },
    khamBenh: { infoNb },
  } = state;
  const chiDinhTuDichVuId = infoNb?.id;
  return { dsKetQuaXN, dsKetQuaDichVuCLS, chiDinhTuDichVuId };
};

export default connect(
  mapStateToProps,
  ({ ketQuaKham: { getDsKetQuaXN, getDsKetQuaDichVuCLS } }) => ({
    getDsKetQuaXN,
    getDsKetQuaDichVuCLS,
  })
)(KetQua);
