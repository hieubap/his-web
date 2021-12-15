import React, { useEffect, useState, useMemo, useRef } from "react";
import { useHistory } from "react-router";
import { Main } from "./styled";
import LeftPanel from "./LeftPanel";
import { Col, Row } from "antd";
import Breadcrumb from "components/Breadcrumb";
import { connect } from "react-redux";
import moment from "moment";
import { ModalNotification2 } from "components/ModalConfirm";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";

const ChiTietPhieuNhapDuTru = ({
  //state
  thongTinPhieuNhap,
  //dispacth
  updateDataPhieuNhapDuTru,
  getDetailPhieuNhapDuTru,
  deletePhieuNhapDuTru,
  ...props
}) => {
  const refConfirmXoaPhieu = useRef(null);
  const history = useHistory();
  const mode = useMemo(() => {
    const urlString = history.location.pathname;
    if (urlString.includes("them-moi")) {
      updateDataPhieuNhapDuTru({ dsNhapXuatChiTiet: [] });
      return "them-moi";
    } else {
      const id = props.match.params.id;
      getDetailPhieuNhapDuTru(id);
      return urlString.includes("chi-tiet") ?
        "chi-tiet" :
        "chinh-sua";
    }
  }, [history.location.pathname]);

  const onDeletePhieu = () => {
    deletePhieuNhapDuTru({ id: thongTinPhieuNhap?.id })
      .then((s) => {
        setTimeout(() => history.push("/kho/nhap-kho"), 200);
      })
      .catch(() => { });
  }
  const onShowModalConfirmXoaPhieu = () => () => {
    refConfirmXoaPhieu.current &&
      refConfirmXoaPhieu.current.show(
        {
          title: "Cảnh báo",
          content: `Xóa phiếu số ${thongTinPhieuNhap?.soPhieu}?`,
          cancelText: "Đóng",
          okText: "Xóa",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
          showBtnOk: true,
        },
        () => {
          onDeletePhieu();
        },
        () => { }
      );
  }

  return (
    <Main>
      <Row className="top-level-category" justify="space-between">
        <Breadcrumb
          chains={[
            { title: "Kho", link: "/kho" },
            { title: "Nhập kho", link: "/kho/nhap-kho" },
          ]}
        ></Breadcrumb>
        <div className="checkout-broken">
          <div className="registration-steps">
            <div className={
              mode == "them-moi" ?
                "step step1 current" :
                "step step1 completed"
            }>
              <div className="timeline timeline-r"></div>
              <span className="step-text">Tạo phiếu nhập</span>
              <div className="step-desc"
                style={{ visibility: mode == "them-moi" ? "hidden" : "unset" }}
              >
                <span>{moment(thongTinPhieuNhap?.createdAt).format("HH:mm:ss - DD/MM/YYYY")}</span>
              </div>
            </div>
            <div
              className={
                mode != "them-moi" ?
                  (thongTinPhieuNhap?.trangThai == 10 ||
                    thongTinPhieuNhap?.trangThai == 15) ?
                    "step step2" :
                    thongTinPhieuNhap?.trangThai == 20 ?
                      "step step2 current" :
                      thongTinPhieuNhap?.trangThai == 30 ?
                        "step step2 completed" :
                        "step step2" :
                  "step step2"
              }
            >
              <div className="timeline timeline-r"></div>
              <div className="timeline timeline-l"></div><span className="step-text">Chờ duyệt</span>
              <div className="step-desc" style={{ visibility: "hidden" }}><span>Delivery Details</span> {/* các giá trị này ở 3 trường , nếu thiếu 1 sẽ bị lệch */}

              </div>
            </div>
            <div className={
              mode != "them-moi" ?
                (thongTinPhieuNhap?.trangThai == 15 ||
                  thongTinPhieuNhap?.trangThai == 10) ?
                  "step step3" :
                  thongTinPhieuNhap?.trangThai == 20 ?
                    "step step3" :
                    thongTinPhieuNhap?.trangThai == 30 ?
                      "step step3 completed" :
                      "step step3" :
                "step step3"
            }>
              <div className="timeline timeline-l"></div><span className="step-text">Hoàn thành</span>
              <div className="step-desc" style={{ visibility: "hidden" }}><span>Payment Details</span>
              </div>
            </div>
          </div>
        </div>
      </Row>

      <div className="title-category">
        <div className={
          (thongTinPhieuNhap?.trangThai == 20 ||
            thongTinPhieuNhap?.trangThai == 30) ? {} :
            { display: "flex", alignItems: "center" }
        }>
          Phiếu nhập dự trù
          {(thongTinPhieuNhap?.trangThai == 10 ||
            thongTinPhieuNhap?.trangThai == 15) && (
              <img
                style={{
                  marginLeft: 10,
                  marginBottom: 5,
                  cursor: "pointer",
                  height: 15,
                  width: 15,
                  objectFit: "contain"
                }}
                src={require("assets/images/kho/delete-red.png")} alt=""
                onClick={onShowModalConfirmXoaPhieu()}
              />
            )}
          {(thongTinPhieuNhap?.trangThai == 20 ||
            thongTinPhieuNhap?.trangThai == 30) && (
              <IcPrint
                className="red pointer"
              />
            )}
        </div>
      </div>
      <Row>
        <Col xxl={24} className="body">
          <LeftPanel mode={mode} />
        </Col>
      </Row>
      <ModalNotification2 ref={refConfirmXoaPhieu} />
    </Main>
  );
};

export default connect(
  (state) => ({
    thongTinPhieuNhap: state.phieuNhapDuTru.thongTinPhieuNhap,
  }),
  ({
    phieuNhapDuTru: {
      getDetail: getDetailPhieuNhapDuTru,
      delete: deletePhieuNhapDuTru,
      updateData: updateDataPhieuNhapDuTru,
    }
  }) => ({
    updateDataPhieuNhapDuTru,
    getDetailPhieuNhapDuTru,
    deletePhieuNhapDuTru,
  })
)(ChiTietPhieuNhapDuTru);
