import React, { useMemo, useRef } from "react";
import { Main } from "./styled";
import { Row } from "antd";
import Breadcrumb from "components/Breadcrumb";
import { connect, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ModalNotification2 } from "components/ModalConfirm";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import MainPage from "../../components/MainPage";
import Card from "../../components/Card";
import ThemMoi from "./ThemMoi";
import ThongTinPhieuNhap from "./ThongTinPhieuNhap";
import ThongTinHangHoa from "./ThongTinHangHoa";
import Button from "../../components/Button";
import SaveIcon from "assets/images/kho/save.png";
import EditIcon from "assets/images/kho/edit.png";
import SendApproveIcon from "assets/images/kho/send-approve.png";
import SubmitIcon from "assets/images/kho/submit.png";
import { useHistory, useParams } from "react-router-dom";

const ChiTietPhieuNhapDuTru = ({
  //state
  thongTinPhieuNhap,
  //dispacth
  updateDataPhieuNhapDuTru,
  getDetailPhieuNhapDuTru,
  deletePhieuNhapDuTru,
  ...props
}) => {
  const { dsNhapXuatChiTiet } = useSelector((state) => state.phieuNhapDuTru);
  const {
    phieuNhapDuTru: { sendApprove, createOrUpdate, updateData },
  } = useDispatch();
  const { id } = useParams();

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
      return urlString.includes("chi-tiet") ? "chi-tiet" : "chinh-sua";
    }
  }, [history.location.pathname]);

  const onDeletePhieu = () => {
    deletePhieuNhapDuTru({ id: thongTinPhieuNhap?.id })
      .then((s) => {
        setTimeout(() => history.push("/kho/nhap-kho"), 200);
      })
      .catch(() => {});
  };
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
        () => {}
      );
  };
  const checkSoLuongDuTru = () => {
    let isValid = true;
    let data = (dsNhapXuatChiTiet || []).reduce((acc, item, index) => {
      acc[item?.dichVuId] = {
        ...acc[item?.dichVuId],
        soLuongKhaDung: item?.soLuongKhaDung || 0,
        soLuongYeuCau:
          parseFloat(item?.soLuongYeuCau || 0) +
          parseFloat(acc[item?.dichVuId]?.soLuongYeuCau || 0),
      };
      return acc;
    }, {});
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (element?.soLuongYeuCau > element?.soLuongKhaDung) isValid = false;
      }
    }
    return { isValid };
  };

  const onSave = (sendApprove) => (e) => {
    const {
      khoDoiUngId,
      thangDuTru,
      khoId,
      hinhThucNhapXuatId,
      ghiChu,
      ...restThongTinPhieuNhap
    } = thongTinPhieuNhap;
    const check = isValidData({
      khoDoiUngId,
      thangDuTru,
      khoId,
      hinhThucNhapXuatId,
      khoDoiUngId,
    });
    if (check) {
      checkSoLuongDuTru();
      updateData({ checkValidate: false });
      let payload = {
        loaiNhapXuat: 20,
        khoDoiUngId,
        thangDuTru,
        hinhThucNhapXuatId,
        khoDoiUngId,
        khoId,
        ghiChu,
        sendApprove,
        dsNhapXuatChiTiet,
      };
      if (props.mode == "them-moi") {
        payload.dsNhapXuatChiTiet = dsNhapXuatChiTiet?.map((item) => ({
          dichVuId: item?.dichVuId,
          soLuong: item?.soLuongYeuCau,
          soLuongYeuCau: item?.soLuongYeuCau,
          ghiChu: item?.ghiChu,
        }));
      }
      if (props.mode == "chinh-sua" && restThongTinPhieuNhap.id) {
        payload = {
          ...payload,
          ...restThongTinPhieuNhap,
          dsNhapXuatChiTiet: dsNhapXuatChiTiet?.map((item) => ({
            active: item?.active,
            createdAt: item?.createdAt,
            createdBy: item?.createdBy,
            dichVu: item?.dichVu,
            dichVuId: item?.dichVuId,
            id: item?.id,
            loNhap: item?.loNhap,
            loNhapId: item?.loNhapId,
            phieuNhapXuatId: item?.phieuNhapXuatId,
            soLuong: item?.soLuong,
            soLuongYeuCau: item?.soLuongYeuCau,
            thanhTien: item?.thanhTien,
            thanhTienSuaDoi: item?.thanhTienSuaDoi,
            updatedAt: item?.updatedAt,
            updatedBy: item?.updatedBy,
            ghiChu: item?.ghiChu,
          })),
        };
      }
      createOrUpdate(payload).then(({ id }) => {
        setTimeout(
          () => history.push(`/kho/phieu-nhap-du-tru/chi-tiet/${id}`),
          200
        );
      });
    } else {
      updateData({ checkValidate: true });
      return;
    }
  };
  const isValidData = (data) => {
    let check = true;
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (!element) {
          check = false;
          break;
        }
      }
    }
    return check;
  };
  const onSendApprove = (payload) => (e) => {
    sendApprove(payload).then((s) => {
      setTimeout(() => window.location.reload(), 200);
    });
  };
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
            <div
              className={
                mode == "them-moi"
                  ? "step step1 current"
                  : "step step1 completed"
              }
            >
              <div className="timeline timeline-r"></div>
              <span className="step-text">Tạo phiếu nhập</span>
              <div
                className="step-desc"
                style={{ visibility: mode == "them-moi" ? "hidden" : "unset" }}
              >
                <span>
                  {moment(thongTinPhieuNhap?.createdAt).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </span>
              </div>
            </div>
            <div
              className={
                mode != "them-moi"
                  ? thongTinPhieuNhap?.trangThai == 10 ||
                    thongTinPhieuNhap?.trangThai == 15
                    ? "step step2"
                    : thongTinPhieuNhap?.trangThai == 20
                    ? "step step2 current"
                    : thongTinPhieuNhap?.trangThai == 30
                    ? "step step2 completed"
                    : "step step2"
                  : "step step2"
              }
            >
              <div className="timeline timeline-r"></div>
              <div className="timeline timeline-l"></div>
              <span className="step-text">Chờ duyệt</span>
              <div className="step-desc" style={{ visibility: "hidden" }}>
                <span>Delivery Details</span>{" "}
                {/* các giá trị này ở 3 trường , nếu thiếu 1 sẽ bị lệch */}
              </div>
            </div>
            <div
              className={
                mode != "them-moi"
                  ? thongTinPhieuNhap?.trangThai == 15 ||
                    thongTinPhieuNhap?.trangThai == 10
                    ? "step step3"
                    : thongTinPhieuNhap?.trangThai == 20
                    ? "step step3"
                    : thongTinPhieuNhap?.trangThai == 30
                    ? "step step3 completed"
                    : "step step3"
                  : "step step3"
              }
            >
              <div className="timeline timeline-l"></div>
              <span className="step-text">Hoàn thành</span>
              <div className="step-desc" style={{ visibility: "hidden" }}>
                <span>Payment Details</span>
              </div>
            </div>
          </div>
        </div>
      </Row>
      <MainPage
        title={
          <>
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
                  objectFit: "contain",
                }}
                src={require("assets/images/kho/delete-red.png")}
                alt=""
                onClick={onShowModalConfirmXoaPhieu()}
              />
            )}
            {(thongTinPhieuNhap?.trangThai == 20 ||
              thongTinPhieuNhap?.trangThai == 30) && (
              <IcPrint className="red pointer" />
            )}
          </>
        }
      >
        <Card>
          {mode == "them-moi" || mode == "chinh-sua" ? (
            <ThemMoi mode={mode} {...props} />
          ) : (
            <ThongTinPhieuNhap mode={mode}{...props} />
          )}
        </Card>
        <Card noPadding={true}>
          <ThongTinHangHoa {...props} mode={mode} />
        </Card>
        <ModalNotification2 ref={refConfirmXoaPhieu} />
      </MainPage>
      <div className="footer-btn">
        {mode == "them-moi" ? (
          <>
            <Button
              onClick={onSave(true)}
              className="left-btn"
              rightIcon={<img src={SendApproveIcon} alt="" />}
            >
              Lưu và gửi duyệt phiếu
            </Button>
            <Button
              className="right-btn"
              onClick={onSave(false)}
              primary={true}
              rightIcon={<img src={SaveIcon} />}
            >
              Lưu phiếu
            </Button>
          </>
        ) : mode == "chinh-sua" ? (
          <Button className="right-btn" onClick={onSave(false)}>
            Lưu&nbsp;
            <img src={SaveIcon} />
          </Button>
        ) : mode == "chi-tiet" &&
          (thongTinPhieuNhap?.trangThai == 10 ||
            thongTinPhieuNhap?.trangThai == 15) ? (
          <>
            <Button
              onClick={() => {
                history.push(`/kho/phieu-nhap-du-tru/chinh-sua/${id}`);
              }}
              className="left-btn"
            >
              Sửa phiếu&nbsp;
              <img src={EditIcon} />
            </Button>
            <Button
              className="right-btn"
              onClick={onSendApprove({ id: thongTinPhieuNhap?.id })}
            >
              Gửi duyệt&nbsp;
              <img src={SubmitIcon} />
            </Button>
          </>
        ) : (
          ""
        )}
      </div>
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
    },
  }) => ({
    updateDataPhieuNhapDuTru,
    getDetailPhieuNhapDuTru,
    deletePhieuNhapDuTru,
  })
)(ChiTietPhieuNhapDuTru);
