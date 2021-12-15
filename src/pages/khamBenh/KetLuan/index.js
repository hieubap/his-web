import React, { useState, useEffect, useMemo } from "react";
import { Collapse, Row, Col } from "antd";
import HeaderKetThucKham from "./HeaderKetThucKham";
import FormHenKham from "./FormHenKham";
import FormChuyenVien from "./FormChuyenVien";
import FormNhapVien from "./FormNhapVien";
import { CollapseWrapper, StickyWrapper } from "./styled";
import Select from "components/Select";
import { connect, useSelector } from "react-redux";
import {
  HUONG_DIEU_TRI_KHAM,
  TITLE_KET_LUAN_KHAM,
  KET_QUA_KHAM,
} from "../configs";
import { TIEU_DE_TRAI_1 } from "constants/thietLapChung";
import { TRANG_THAI_DICH_VU } from "constants/index";
const { Panel } = Collapse;

const KetLuan = ({
  dataTIEU_DE_TRAI_1,
  dataRef,
  handleSetData,
  listhuongDieuTriKham,
  listketQuaDieuTriKham,
  popoverData,
  setPopoverData,
  getListAllBenhVien,
  getListAllKhoa,
  updateChiSoSong,
  getThietLap,
  getListAllNgheNghiep,
  dataDichVu,
}) => {
  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );

  const [collapsedKey, setCollapsedKey] = useState(1);

  const isDichVuWasFinish = useMemo(() => {
    const res = dataDichVu.every((item) => item.trangThai === 150); // 150 : đã kết luận
    return res;
  }, [dataDichVu, trangThaiKham]);

  useEffect(() => {
    getListAllBenhVien();
    getListAllKhoa();
    getThietLap({ ma: TIEU_DE_TRAI_1 });
    getListAllNgheNghiep();
  }, []);

  const renderTitle = () => {
    return TITLE_KET_LUAN_KHAM[popoverData?.keyHuongDieuTri];
  };

  const renderContent = () => {
    let content = "";
    switch (popoverData?.keyHuongDieuTri) {
      case HUONG_DIEU_TRI_KHAM.HEN_KHAM:
        content = <FormHenKham handleSetData={handleSetData} />;
        break;
      case HUONG_DIEU_TRI_KHAM.NHAP_VIEN:
        content = (
          <FormNhapVien
            dataTIEU_DE_TRAI_1={dataTIEU_DE_TRAI_1}
            handleSetData={handleSetData}
            updateChiSoSong={updateChiSoSong}
          />
        );
        break;
      case HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN:
        content = <FormChuyenVien handleSetData={handleSetData} />;
        break;
      default:
        break;
    }
    return content;
  };

  const listPanel = [
    {
      header: (
        <HeaderKetThucKham
          isCollapsed={parseInt(collapsedKey) === 1}
          title={renderTitle()}
          showIconDelete={false}
        />
      ),
      content: renderContent(),
      key: 1,
    },
    // {
    //   header: (
    //     <HeaderKetThucKham
    //       isCollapsed={parseInt(collapsedKey) === 2}
    //       title="GIẤY CHUYỂN TUYẾN KHÁM BỆNH, CHỮA BỆNH BHYT"
    //     />
    //   ),
    //   content: <InfoKetThucKham />,
    //   key: 2,
    // },
  ];

  const onCollapsed = (value) => {
    setCollapsedKey(value);
  };

  const handleChangeKetLuanKham = (key) => (value) => {
    let keyKetQua;

    if (dataRef.current?.nbKetLuan) {
      dataRef.current.nbKetLuan[
        key === "keyHuongDieuTri" ? "huongDieuTri" : "ketQuaDieuTri"
      ] = value;
    }

    if (key === "keyHuongDieuTri") {
      if (
        value === HUONG_DIEU_TRI_KHAM.HEN_KHAM ||
        value === HUONG_DIEU_TRI_KHAM.CHO_VE
      ) {
        keyKetQua = KET_QUA_KHAM.DO;
      } else if (
        value === HUONG_DIEU_TRI_KHAM.NHAP_VIEN ||
        value === HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN
      ) {
        keyKetQua = KET_QUA_KHAM.NANG_HON;
      } else {
        keyKetQua = KET_QUA_KHAM.KHONG_DANH_GIA;
      }
    }
    setPopoverData({ ...popoverData, keyKetQua, [key]: value });
  };

  const listketQuaDieuTriKhamFilter = useMemo(() => {
    return listketQuaDieuTriKham.filter((item) => {
      let arrKetQua = [];
      if (popoverData.keyHuongDieuTri === HUONG_DIEU_TRI_KHAM.HEN_KHAM) {
        arrKetQua = [1, 2, 3, 10];
      } else if (popoverData.keyHuongDieuTri === HUONG_DIEU_TRI_KHAM.CHO_VE) {
        arrKetQua = [1, 2, 10];
      } else if (
        popoverData.keyHuongDieuTri === HUONG_DIEU_TRI_KHAM.NHAP_VIEN ||
        popoverData.keyHuongDieuTri === HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN
      ) {
        arrKetQua = [3, 4, 10];
      } else {
        arrKetQua = [10];
      }

      return arrKetQua.includes(item.id);
    });
  }, [popoverData?.keyHuongDieuTri]);

  const stickyHeader = useMemo(() => {
    {
      return (
        (!isDichVuWasFinish ||
          trangThaiKham == TRANG_THAI_DICH_VU.DANG_KET_LUAN) && (
          <StickyWrapper>
            <Row className="info">
              <Col span={11} className="info__left">
                <div>Hướng điều trị</div>
                <Select
                  style={{ width: "100%" }}
                  value={popoverData?.keyHuongDieuTri}
                  data={listhuongDieuTriKham}
                  onChange={handleChangeKetLuanKham("keyHuongDieuTri")}
                  placeholder="Chọn hướng điều trị khám"
                />
              </Col>
              <Col span={11} offset={2} className="info__right">
                <div>Kết quả</div>
                <Select
                  style={{ width: "100%" }}
                  value={popoverData?.keyKetQua}
                  data={listketQuaDieuTriKhamFilter}
                  onChange={handleChangeKetLuanKham("keyKetQua")}
                  placeholder="Chọn hướng điều trị khám"
                />
              </Col>
            </Row>
          </StickyWrapper>
        )
      );
    }
  }, [
    isDichVuWasFinish,
    trangThaiKham,
    popoverData,
    listketQuaDieuTriKhamFilter,
  ]);

  return (
    <>
      {stickyHeader}
      {popoverData?.keyHuongDieuTri != 10 &&
        popoverData?.keyHuongDieuTri != 100 &&
        popoverData?.keyHuongDieuTri && (
          <div className="collapse-content">
            <CollapseWrapper
              bordered={false}
              onChange={onCollapsed}
              activeKey={collapsedKey}
            >
              {listPanel.map((panel) => (
                <Panel showArrow={false} key={panel.key} header={panel.header}>
                  {panel.content}
                </Panel>
              ))}
            </CollapseWrapper>
          </div>
        )}
    </>
  );
};

export default connect(
  ({
    thietLap: { dataTIEU_DE_TRAI_1 },
    utils: { listhuongDieuTriKham = [], listketQuaDieuTriKham = [] },
    khamBenh: { thongTinChiTiet },
  }) => ({
    listhuongDieuTriKham,
    listketQuaDieuTriKham,
    thongTinChiTiet,
    dataTIEU_DE_TRAI_1,
  }),
  ({
    thietLap: { getThietLap },
    benhVien: { getListAllBenhVien },
    khoa: { getListAllKhoa },
    khamBenh: { updateChiSoSong },
    ngheNghiep: { getListAllNgheNghiep },
  }) => ({
    getThietLap,
    getListAllBenhVien,
    getListAllKhoa,
    updateChiSoSong,
    getListAllNgheNghiep,
  })
)(KetLuan);
