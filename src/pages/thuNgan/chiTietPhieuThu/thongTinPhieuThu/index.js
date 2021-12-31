import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { ROLES } from "constants/index";
import { Main } from "./styled";
import { Button, Collapse, Tooltip } from "antd";
import moment from "moment";
import AuthWrapper from "components/AuthWrapper";
import IconCheckOut from "assets/images/thuNgan/icCheckout.svg";
import IconPrinter from "assets/images/thuNgan/icPrinter.svg";
import IconPrint from "assets/images/thuNgan/icPrint.svg";
import IconArrowDown from "assets/images/thuNgan/icArrowDown.svg";
import IconPanel from "assets/images/thuNgan/icPanel.svg";
import IconHDHD from "assets/images/thuNgan/icHDHD.svg";
// import ModalCheckout from "components/ModalCheckout";
import ModalContentMethod from "./modalContentMethod";
import ModalContentService from "./modalContentService";
import HDDT from "../HDDT";
import { DOI_TUONG } from "constants/index";
import { formatDecimal } from "utils";
import { useDispatch } from "react-redux";

const { Panel } = Collapse;

function ThongTinPhieuThu(props) {
  const {
    thongTinPhieuThu: {
      thanhTien,
      tienNbCungChiTra,
      tongTien,
      tienMienGiam,
      tienMienGiamPhieuThu,
      tienBhThanhToan,
      dsPhuongThucTt,
      tienNbTuTra,
      tienNbPhuThu,
      tienNguonKhac,
      tienMienGiamDichVu,
      phanTramMienGiam,
      thanhToan,
      thuNgan,
      thoiGianThanhToan,
      maGiamGia,
      maGiamGiaId,
      soPhieu,
    },
    getThongTinPhieuThu,
    phieuThuId,
    nbDotDieuTriId,
    layerId,
  } = props;
  const { onRegisterHotkey } = useDispatch().phimTat;
  const modalPayMethodRef = useRef();
  const modalPayServiceRef = useRef();
  const modalHddtRef = useRef();
  const refBtnInPhieuThu = useRef(null);
  const refBtnSinhPhieuChi = useRef(null);

  useEffect(() => {
    if (!phieuThuId) return;
    getThongTinPhieuThu(phieuThuId);
  }, [phieuThuId]);
  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 119, //F8
          onEvent: () => {
            refBtnInPhieuThu.current && refBtnInPhieuThu.current.click();
          },
        },
        // {
        //   keyCode: 120, //F9
        //   onEvent: () => {
        //     refBtnSinhPhieuChi.current && refBtnSinhPhieuChi.current.click();
        //   },
        // },
        {
          keyCode: 123, //F12
          onEvent: () => {
            onClickThanhToan();
          },
        },
      ],
    });
  }, []);

  const onClickThanhToan = () => {
    modalPayMethodRef.current.show();
  };

  const handleClickBtnPrinter = () => {};

  const customIcon = (panelProps) => {
    const { isActive } = panelProps;
    return (
      <span
        className={`anticon anticon-right ant-collapse-arrow ${
          isActive ? "" : "ant-collapse-arrow--revert"
        }`}
      >
        <IconPanel />
      </span>
    );
  };

  const onPrintPhieuThu = () => {
    return props.printPhieuThu(phieuThuId);
  };
  const onClickSinhPhieuChi = () => {
  };

  return (
    <Main>
      <div className="top-header">
        <span className="top-header__title">Thông tin phiếu thu</span>
        {!thanhToan && (
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].THANH_TOAN]}>
            <Button
              className="top-header__btn"
              icon={
                <span className="icon-checkout">
                  <IconCheckOut />
                </span>
              }
              onClick={onClickThanhToan}
            >
              Thanh toán [F12]
            </Button>
          </AuthWrapper>
        )}
        {thanhToan && (
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].XUAT_HDDT]}>
            <Button
              className="top-header__btn top-header__btn--bg"
              icon={
                <span className="icon-checkout">
                  <IconPrinter />
                </span>
              }
              onClick={handleClickBtnPrinter}
            >
              Xuất HĐĐT
            </Button>
          </AuthWrapper>
        )}
      </div>
      <div className="content-box">
        <Collapse
          defaultActiveKey={[1, 2]}
          bordered={false}
          expandIcon={customIcon}
        >
          <Panel
            header={
              <div className="info-payment info-payment--pd0-header">
                <div className="info-payment__title info-payment__title--bs">
                  Tổng tiền
                </div>
                <div className="info-payment__price info-payment__price--bs">
                  {formatDecimal(tongTien || 0)} đ
                </div>
              </div>
            }
            key="1"
          >
            {props.thongTinBenhNhan.doiTuong === DOI_TUONG.BAO_HIEM && (
              <>
                <div className="info-payment">
                  <div className="info-payment__title">BH chi trả</div>
                  <div className="info-payment__price">
                    {formatDecimal(tienBhThanhToan || 0)} đ
                  </div>
                </div>
                <div className="info-payment">
                  <div className="info-payment__title">NB cùng chi trả</div>
                  <div className="info-payment__price">
                    {formatDecimal(tienNbCungChiTra || 0)} đ
                  </div>
                </div>
                <div className="info-payment">
                  <div className="info-payment__title">NB tự trả</div>
                  <div className="info-payment__price">
                    {formatDecimal(tienNbTuTra || 0)} đ
                  </div>
                </div>
                <div className="info-payment">
                  <div className="info-payment__title">Phụ thu</div>
                  <div className="info-payment__price">
                    {formatDecimal(tienNbPhuThu || 0)} đ
                  </div>
                </div>
              </>
            )}
            <div className="info-payment">
              <div className="info-payment__title">Nguồn khác</div>
              <div className="info-payment__price">
                {formatDecimal(tienNguonKhac || 0)} đ
              </div>
            </div>
          </Panel>
          {(tienMienGiam > 0 || maGiamGia) && (
            <Panel
              header={
                <div className="info-payment info-payment--pd0-header">
                  <div className="info-payment__title info-payment__title--bs">
                    Tổng tiền miễn giảm
                  </div>
                  <div className="info-payment__price info-payment__price--bs">
                    {formatDecimal(tienMienGiam || 0)} đ
                  </div>
                </div>
              }
              key="2"
            >
              <div className="info-payment">
                <div className="info-payment__title">Theo DV</div>
                <div className="info-payment__price">
                  {formatDecimal(tienMienGiamDichVu || 0)} đ
                </div>
              </div>
              <div className="info-payment">
                <div className="info-payment__title">Theo phiếu thu</div>
                <div className="info-payment__price">
                  <IconArrowDown style={{ verticalAlign: "middle" }} />{" "}
                  {phanTramMienGiam || 0} %
                </div>
              </div>
              <div className="info-payment">
                <div className="info-payment__title"></div>
                <div className="info-payment__price">
                  <IconArrowDown style={{ verticalAlign: "middle" }} />{" "}
                  {formatDecimal(tienMienGiamPhieuThu || 0)} đ
                </div>
              </div>
              {maGiamGia && (
                <div className="info-payment">
                  <div className="info-payment__title">Voucher</div>
                  <div className="info-payment__price">
                    <Tooltip title={maGiamGia?.moTa} color="#108ee9">
                      <span className="info-payment__voucher">
                        {maGiamGia?.maVoucher}
                      </span>
                    </Tooltip>
                  </div>
                </div>
              )}
            </Panel>
          )}
        </Collapse>
        <div className="info-payment info-payment--pd0">
          <div className="info-payment__title info-payment__title--fixed">
            Số tiền NB phải trả
          </div>
          <div className="info-payment__price info-payment__price--fixed">
            {formatDecimal(String(thanhTien) || 0)} đ
          </div>
        </div>

        <div className="info-payment info-payment--pdt">
          <div className="info-payment__title info-payment__title--bs">
            Trạng thái phiếu thu
          </div>
          <div
            className={`info-payment__price ${
              thanhToan
                ? "info-payment__price--green"
                : "info-payment__price--orange"
            }`}
          >
            {thanhToan ? "Đã thanh toán" : "Chưa thanh toán"}
          </div>
        </div>
        <div className="info-payment">
          <div className="info-payment__title">Tên thu ngân</div>
          <div className="info-payment__price">{thuNgan?.ten}</div>
        </div>
        {thanhToan && (
          <div className="info-payment">
            <div className="info-payment__title">TG thanh toán</div>
            <div className="info-payment__price">
              {thoiGianThanhToan &&
                moment(thoiGianThanhToan).format("DD/MM/YYYY HH:mm")}
            </div>
          </div>
        )}
        {soPhieu && (
          <div className="info-payment">
            <div className="info-payment__title">Số phiếu thu</div>
            <div className="info-payment__price">{soPhieu}</div>
          </div>
        )}

        {dsPhuongThucTt && (
          <div className="info-payment info-payment--pdt">
            <div className="info-payment__title info-payment__title--bs">
              Chi tiết phương thức TT
            </div>
            <div className="info-payment__price"></div>
          </div>
        )}
        {dsPhuongThucTt &&
          dsPhuongThucTt.map((ds) => (
            <div className="info-payment" key={ds.id}>
              <div className="info-payment__title">{ds.phuongThucTt?.ten}</div>
              <div className="info-payment__price">
                {formatDecimal(ds.tongTien || 0)} đ
              </div>
            </div>
          ))}

        {thanhToan && (
          <div className="bottom-group">
            <AuthWrapper accessRoles={[ROLES["THU_NGAN"].IN_PHIEU_THU]}>
              <Button
                className="btn"
                onClick={onPrintPhieuThu}
                ref={refBtnInPhieuThu}
              >
                <span className="btn-text">In phiếu thu</span> <IconPrint />
              </Button>
            </AuthWrapper>
            <AuthWrapper accessRoles={[ROLES["THU_NGAN"].PHIEU_CHI]}>
              <Button
                className="btn"
                onClick={onClickSinhPhieuChi}
                ref={refBtnSinhPhieuChi}
              >
                <span className="btn-text">Sinh phiếu chi</span> <IconHDHD />
              </Button>
            </AuthWrapper>
          </div>
        )}
      </div>

      <ModalContentMethod
        tongTien={thanhTien}
        phieuThuId={phieuThuId}
        nbDotDieuTriId={nbDotDieuTriId}
        modalPayMethodRef={modalPayMethodRef}
        modalPayServiceRef={modalPayServiceRef}
      />
      <ModalContentService
        modalPayServiceRef={modalPayServiceRef}
        phieuThuId={phieuThuId}
        nbDotDieuTriId={nbDotDieuTriId}
      />
      <HDDT modalCheckoutRef={modalHddtRef} />
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    thuNgan: { thongTinPhieuThu },
    nbDotDieuTri: { thongTinBenhNhan },
  } = state;

  return { thongTinPhieuThu, thongTinBenhNhan };
};

const mapDispatchToProps = ({
  thuNgan: { getThongTinPhieuThu, printPhieuThu },
}) => ({
  getThongTinPhieuThu,
  printPhieuThu,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThongTinPhieuThu);
