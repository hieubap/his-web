import React, { useRef, memo, useState, useEffect, useMemo } from "react";
import InfoHeader from "./InfoHeader";
import Info from "./Info";
import { Main } from "./styledMain";
import { useSelector } from "react-redux";
import moment from "moment";
import { ROLES } from "constants/index";
import ModalCheckBaoHiem from "./ModalCheckBaoHiem";
import ModalTrungThongTin from "./ModalTrungThongTin";
import { Row, Col, message } from "antd";
import { ModalNotification2 } from "components/ModalConfirm";
import AuthWrapper from "components/AuthWrapper";
import { ModalConfirm } from "components/ModalConfirm";
import { useDispatch } from "react-redux";
import { MA_KHOA_CAP_CUU } from "constants/thietLapChung";
import DanhSachBenhNhan from "../DanhSachBenhNhan";
import TabThongTin from "../DanhSachBenhNhan/TabThongTin";
import { openInNewTab } from "utils";

const ThongTinTiepDon = (props) => {
  const { idLink, history } = props;

  const { daThanhToan, messageChuaThanhToan, quayTiepDonId } = useSelector(
    (state) => state.goiSo
  );
  const {
    id,
    loaiDoiTuongId,
    tenNb,
    gioiTinh,
    ngaySinh,
    soDienThoai = "",
    quocTichId,
    email,
    doiTuong,
    quanNhan,
    khoaTiepDonId,
    nbQuanNhan,
    nbDiaChi,
    nbGiayToTuyThan = {},
    nbNguoiBaoLanh,
    nbTheBaoHiem,
    theBaoHiem,
    nbCapCuu,
    nbChanDoan,
    checkNgaySinh,
    disableTiepDon,
    stt,
    checkNoiGioiThieu,
    requiredNguoiGioiThieu,
    nbNguonNb,
    capCuu,
    dataMacDinh,
    dangKyKhamCc,
  } = useSelector((state) => state.tiepDon);
  const { listgioiTinh = [] } = useSelector((state) => state.utils);
  const { dataMA_KHOA_CAP_CUU } = useSelector((state) => state.thietLap);
  const { listAllQuayTiepDonTaiKhoan } = useSelector(
    (state) => state.quayTiepDon
  );

  const {
    tiepDon: {
      updateData,
      onSaveData,
      kiemTraThanhToan,
      getDetail,
      resetData,
      giamDinhThe,
      hienThiThongTinThe,
      onSetCapCuu,
      onCheckIsKhamCapCuu,
    },
    loaiDoiTuong: { getListAllLoaiDoiTuong },
    information: { onCheckTrungThongTin },
    thietLap: { getThietLap },
    ngheNghiep: { getListAllNgheNghiep },
    ttHanhChinh: {
      getListQuocGiaTongHop,
      getListAllTinh,
      getListHuyenTongHop,
      getListXaPhuongTongHop,
    },
    goiSo: { huyTiepDon },
  } = useDispatch();

  const refTrungThongTin = useRef();
  const refModalCheckBaoHiem = useRef();
  const refNotification = useRef(null);
  const refModal = useRef(null);
  const refTabThongTin = useRef(null);
  useEffect(() => {
    getThietLap({ ma: MA_KHOA_CAP_CUU });
    document.addEventListener("keydown", (e) => {
      if (e.code === "F4") {
        e.preventDefault();
        document.getElementById("btn_luu_thong_tin_quay_tiep_don").click();
      }
    });
  }, []);

  const selectAddress = async (data) => {
    let address = {};
    if (data?.tinhThanhPho && data?.quanHuyen) {
      address = {
        ...nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.quanHuyen?.id,
        xaPhuongId: data?.id,
        diaChi: data?.displayText,
        quocGiaId: data?.tinhThanhPho?.quocGia?.id || nbDiaChi?.quocGiaId,
      };
    } else if (data?.tinhThanhPho) {
      address = {
        ...nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.id,
        diaChi: data?.displayText,
        quocGiaId: data?.tinhThanhPho?.quocGia?.id || nbDiaChi?.quocGiaId,
      };
    } else {
      address = {
        ...nbDiaChi,
        tinhThanhPhoId: data?.id,
        diaChi: data?.displayText,
        quocGiaId: data?.quocGia?.id || nbDiaChi?.quocGiaId,
      };
    }
    updateData({ nbDiaChi: address });
    onCheckTrung(address, "diaChi");
  };
  const onChange = (value, variables) => {
    let newData = { [`${variables}`]: value };
    if (variables === "doiTuong" && value) {
      newData.loaiDoiTuongId = null;
      if (value === 1) newData.nbTheBaoHiem = {};
      getListAllLoaiDoiTuong({ doiTuong: value });
    }
    if (variables === "anhMatTruoc" || variables === "anhMatSau") {
      nbGiayToTuyThan[`${variables}`] = value;
      newData.nbGiayToTuyThan = { ...nbGiayToTuyThan };
    }
    if (variables == "gioiTinh") {
      newData.gioiTinh = value;
      checkMaTheBhyt(
        (listgioiTinh.find((gt) => gt.id === value) || {}).ten,
        "gioiTinh",
        "Giới tính"
      );
    }
    if (variables == "capCuu") {
      newData.capCuu = value;
    }
    updateData(newData);
  };
  const showTrungThongTin = (data) => {
    refTrungThongTin.current.show(
      {
        show: true,
        data: data,
      },
      (data, code) => {
        if (data) {
          let tenNb = data?.data?.tenNb;
          let maThe = data?.data?.nbTheBaoHiem?.maThe;
          let ngaySinh = data?.data?.ngaySinh;
          if (code) {
            updateData({
              doiTuong: 1,
              loaiDoiTuongId: dataMacDinh?.loaiDoiTuong?.id,
              id: "",
            });
          }
          if (tenNb && maThe && ngaySinh) {
            onCheckCardInsurance(
              {
                hoTen: tenNb,
                maThe,
                ngaySinh,
              },
              { tenNb }
            );
          }
        } else {
          if (nbTheBaoHiem?.maThe && tenNb?.length && ngaySinh?.date) {
            onCheckCardInsurance(
              {
                hoTen: tenNb,
                maThe: nbTheBaoHiem?.maThe,
                ngaySinh: ngaySinh?.date,
              },
              { tenNb: tenNb }
            );
          }
        }
      }
    );
  };
  const onCheckTrung = (value, variables) => {
    onCheckTrungThongTin({
      variables,
      value,
    }).then((s) => {
      if (s?.type == 1) {
        showTrungThongTin(s.data);
      } else {
        if (s?.type == 2) {
          onCheckCardInsurance(s.data, { tenNb: s.data?.hoTen });
        }
      }
    });
  };

  // hàm gọi trực tiếp check cổng
  const checkMaTheBhyt = (value, variables, nameDetail) => {
    if (doiTuong !== 2 && variables !== "maThe") return;
    if (nameDetail) {
      if (value !== (theBaoHiem || {})[variables]) {
        refModalCheckBaoHiem.current.show(
          {
            show: true,
            data: {
              code: 7950,
              message: "Sai thông tin " + nameDetail + ": " + value,
              data: theBaoHiem,
            },
          },
          (data) => hienThiThongTinThe(data)
        );
      }
      return;
    }
    const check = (value) => {
      return value?.trim && value?.trim();
    };

    if (!check(tenNb || (variables == "hoTen" ? value : ""))) {
      message.error("Vui lòng điền Họ và tên");
      return;
    }
    if (!check(ngaySinh?.strData || (variables == "ngaySinh" ? value : ""))) {
      message.error("Vui lòng điền Ngày sinh");
      return;
    }
    if (!check(nbTheBaoHiem?.maThe || (variables == "maThe" ? value : ""))) {
      message.error("Vui lòng điền Số bảo hiểm");
      return;
    }
    updateData({ loadingNotification: true });
    onGiamDinhThe({
      data: {
        hoTen: tenNb || "",
        maThe: nbTheBaoHiem?.maThe || "",
        ngaySinh: ngaySinh?.date || "",
        [variables]: value,
      },
      tenNb: tenNb || "",
      diaChi: "",
    });
  };
  const showModalQuanNhan = () => {
    refModal.current.refQuanNhan.current.show({
      show: true,
      donViId: nbQuanNhan?.donViId,
      nguoiDaiDienId: nbQuanNhan?.nguoiDaiDienId,
      chucVuId: nbQuanNhan?.chucVuId,
      quanHamId: nbQuanNhan?.quanHamId,
    });
  };
  const showModalCapCuu = () => {
    refModal.current.refAddCapCuu.current.show(
      {
        show: true,
        loaiCapCuuId: nbCapCuu?.loaiCapCuuId,
        viTriChanThuongId: nbCapCuu?.viTriChanThuongId,
        nguyenNhanNhapVienId: nbCapCuu?.nguyenNhanNhapVienId,
        thoiGianCapCuuId: nbCapCuu?.thoiGianCapCuuId,
      },
      (data = {}) => {
        updateData({ nbCapCuu: { ...nbCapCuu, ...data } });
      }
    );
  };
  const onSubmit = () => {
    let tuoi = ngaySinh?.date?._d
      ? ngaySinh?.date?._d.getAge()
      : moment(ngaySinh?.date)?._d?.getAge();
    if (!nbDiaChi && !nbDiaChi?.tinhThanhPhoId) {
      //với trường hợp người bệnh bảo hiểm lấy địa chỉ từ bảo hiểm
      message.error("Địa chỉ hành chính không có trong hệ thống");
    }
    if (!quayTiepDonId) {
      updateData({ checkValidate: true });
      return;
    }
    if (!daThanhToan) {
      refNotification.current.show(
        {
          showBtnOk: true,
          title: "Thông báo",
          content: messageChuaThanhToan,
        },
        () => {}
      );
      return;
    }
    if (
      doiTuong &&
      loaiDoiTuongId &&
      tenNb &&
      tenNb.length &&
      ngaySinh?.date &&
      (!checkNgaySinh || ngaySinh?.date) &&
      gioiTinh &&
      quocTichId &&
      (soDienThoai ? soDienThoai.replaceAll(" ", "").isPhoneNumber() : true) &&
      (nbDiaChi?.diaChi || nbDiaChi?.tinhThanhPhoId) && //với trường hợp người bệnh bảo hiểm lấy địa chỉ từ bảo hiểm
      (doiTuong === 2
        ? nbTheBaoHiem?.maThe &&
          nbTheBaoHiem?.maThe?.length <= 15 &&
          nbTheBaoHiem?.tuNgay &&
          nbTheBaoHiem?.denNgay &&
          nbChanDoan?.cdNoiGioiThieu &&
          nbTheBaoHiem?.noiDangKyId &&
          (checkNoiGioiThieu && !nbTheBaoHiem?.henKhamLai
            ? nbTheBaoHiem?.noiGioiThieuId
            : true)
        : true) &&
      (tuoi < 6
        ? nbNguoiBaoLanh?.hoTen &&
          (nbNguoiBaoLanh?.soDienThoai &&
          nbNguoiBaoLanh?.soDienThoai.replaceAll(" ", "").isPhoneNumber()
            ? true
            : false) &&
          nbNguoiBaoLanh?.moiQuanHeId
        : true) &&
      (email?.length ? email.isEmail() : true) &&
      (requiredNguoiGioiThieu
        ? nbNguonNb?.nguoiGioiThieuId
          ? true
          : false
        : true)
    ) {
      if (quanNhan) {
        if (!nbQuanNhan) {
          showModalQuanNhan();
          return message.warning(
            "Vui lòng nhập đầy đủ thông tin dành cho đối tượng Quân nhân!"
          );
        } else if (
          !(nbQuanNhan.chucVuId && nbQuanNhan.donViId && nbQuanNhan.quanHamId)
        ) {
          showModalQuanNhan();
          return message.warning(
            "Vui lòng nhập đầy đủ thông tin dành cho đối tượng Quân nhân!"
          );
        }
      }
      if (capCuu) {
        if (!nbCapCuu) {
          showModalCapCuu();
          return message.warning(
            "Vui lòng nhập đầy đủ thông tin dành cho đối tượng cấp cứu!"
          );
        } else if (!nbCapCuu.loaiCapCuuId) {
          showModalCapCuu();
          return message.warning(
            "Vui lòng nhập đầy đủ thông tin dành cho đối tượng cấp cứu!"
          );
        }
      }
      if (nbTheBaoHiem?.boQuaTheLoi) {
        refNotification.current &&
          refNotification.current.show(
            {
              title: "Bỏ kiểm tra thẻ",
              content: "Bạn có chắc chắn muốn bỏ qua kiểm tra thẻ không?",
              detail:
                "Bỏ qua kiểm tra thẻ với cổng giám định có thể dẫn đến các dịch vụ<br /> của người bệnh không được cơ quan BHYT quyết toán!",
              cancelText: "Quay lại",
              okText: "Bỏ kiểm tra thẻ",
              showImg: true,
              showBtnOk: true,
            },
            submit
          );
      } else submit();
    } else {
      updateData({ checkValidate: true });
    }
  };
  const submit = () => {
    onSaveData({
      data: {
        tenNb: tenNb,
        gioiTinh: gioiTinh,
        ngaySinh: ngaySinh?.date,
        soDienThoai: soDienThoai?.replaceAll(" ", ""),
        khoaTiepDonId: khoaTiepDonId,
        quocTichId: quocTichId,
        email: email,
        doiTuong: doiTuong,
        loaiDoiTuongId: loaiDoiTuongId,
        nbQuanNhan: nbQuanNhan,
        nbDiaChi: nbDiaChi,
        nbGiayToTuyThan: nbGiayToTuyThan,
        nbNguoiBaoLanh: {
          ...nbNguoiBaoLanh,
          soDienThoai: nbNguoiBaoLanh?.soDienThoai?.replaceAll(" ", ""),
        },
        nbTheBaoHiem: nbTheBaoHiem,
        nbCapCuu: nbCapCuu,
        nbChanDoan: nbChanDoan,
        nbNguonNb: nbNguonNb,
      },
      id: idLink ? idLink : id,
    })
      .then((s) => {
        switch (s?.code) {
          case 0:
            if (idLink) {
              // updateData({ disableTiepDon: true });
              // }
              // else {
              history.push(
                `/tiep-don/dich-vu/${s?.data?.id ? s?.data?.id : ""}`
              );
            } else {
              if (!dangKyKhamCc)
                history.push(
                  `/tiep-don/dich-vu/${s?.data?.id ? s?.data?.id : ""}`
                );
              else {
                resetData();
                openInNewTab("/kham-benh");
                // }
              }
            }
            break;
          case 7950:
            ModalConfirm({
              content: `${s?.message}, bạn có muốn bỏ qua kiểm tra thẻ không?`,
              onOk: () => onBackCheckThe(true),
              onCancel: () => onBackCheckThe(),
            });
            break;
          case 7920:
            refNotification.current &&
              refNotification.current.show(
                {
                  title: "Thông báo",
                  content: `${s?.message}`,
                  showBtnOk: true,
                  classNameOkText: "button-error",
                },
                () => {
                  onChange(1, "doiTuong");
                }
              );
            break;
        }
      })
      .catch(() => {});
  };
  const onBackCheckThe = (onOK) => {
    if (onOK) {
      let data = nbTheBaoHiem || {};
      data.boQuaTheLoi = true;
      updateData({ nbTheBaoHiem: { ...data } });
      submit();
    }
  };

  // hàm xử lý bắt trùng
  const onCheckCardInsurance = (data, item, checkCong) => {
    if (!nbTheBaoHiem?.boQuaTheLoi || checkCong) {
      updateData({ loadingNotification: true });
      onGiamDinhThe({ data, tenNb: item?.tenNb, diaChi: item?.diaChi });
    }
  };
  const onGiamDinhThe = ({ data, tenNb, diaChi }) => {
    giamDinhThe(data).then((data) => {
      updateData({ loadingNotification: false, theBaoHiem: data?.data });
      refModalCheckBaoHiem.current.show(
        {
          show: true,
          data: data,
          hoTen: tenNb,
          diaChi: diaChi,
        },
        (data) => hienThiThongTinThe(data)
      );
    });
  };
  const edit = (value) => {
    updateData({ disableTiepDon: value });
    if (value) getDetail(idLink);
  };
  const onBack = () => {
    history.push(`/tiep-don/dich-vu/${idLink}`);
  };
  const onResetData = () => {
    if (refNotification.current)
      refNotification.current.show(
        {
          title: "Hủy tiếp đón",
          content:
            "Những thay đổi dữ liệu sẽ không được lưu,<br /> bạn có chắc chắn muốn hủy tiếp đón?",
          cancelText: "Quay lại",
          okText: "Hủy tiếp đón",
          classNameOkText: "button-error",
          showBtnOk: true,
        },
        () => {
          if (stt && quayTiepDonId) {
            huyTiepDon(quayTiepDonId);
          }
          resetData();
        }
      );
  };
  const showTabThongTin = (isVisible = true) => {
    if (refTabThongTin.current) {
      refTabThongTin.current.show({ isVisible });
    }
  };
  useEffect(() => {
    onSetCapCuu();
  }, [quayTiepDonId, listAllQuayTiepDonTaiKhoan, dataMA_KHOA_CAP_CUU]);

  useEffect(() => {
    onCheckIsKhamCapCuu();
  }, [capCuu, quayTiepDonId, dataMA_KHOA_CAP_CUU, listAllQuayTiepDonTaiKhoan]);
  useEffect(() => {
    if (capCuu) {
      showModalCapCuu();
    }
  }, [capCuu]);

  useEffect(() => {
    getListAllNgheNghiep();
    getListQuocGiaTongHop({
      pageQuocGia: 0,
      sizeQuocGia: 500,
      active: true,
    });
    getListAllTinh();
    getListHuyenTongHop({ page: 0, size: 99999 });
    getListXaPhuongTongHop({ page: 0, size: 99999 });
  }, []);

  return (
    <Main>
      <div className="container-fluid">
        <Row style={{ width: "100%" }}>
          <Col md={24} xl={16} xxl={16}>
            <AuthWrapper accessRoles={[ROLES["TIEP_DON"].THONG_TIN_CHUNG]}>
              <InfoHeader
                onChange={onChange}
                onCheckCardInsurance={onCheckCardInsurance}
                refModal={(fnc) => (refModal.current = fnc)}
                checkTheBhyt={checkMaTheBhyt}
              />
            </AuthWrapper>
          </Col>
          <Col md={24} xl={8} xxl={8} className="bg-color1">
            <div className="line">
              <DanhSachBenhNhan
                showTabThongTin={showTabThongTin}
                onChange={onChange}
                disabled={idLink}
                onGiamDinhThe={onGiamDinhThe}
              />
            </div>
          </Col>
        </Row>
        <Info
          onChange={onChange}
          selectAddress={selectAddress}
          history={history}
          onCheckTrungThongTin={onCheckTrung}
          checkTheBhyt={checkMaTheBhyt}
          getListAllLoaiDoiTuong={getListAllLoaiDoiTuong}
        />
        <div className={`button-bottom`}>
          <div className="button-bottom-right">
            {idLink ? (
              <AuthWrapper accessRoles={[ROLES["TIEP_DON"].SUA_THONG_TIN]}>
                {disableTiepDon ? (
                  <>
                    <div
                      className="button button-back"
                      onClick={() => onBack()}
                      style={{ minWidth: 0 }}
                    >
                      <span>Quay lại</span>
                    </div>
                    <div
                      className="button button-danger"
                      style={{ marginLeft: "0" }}
                      onClick={() => edit(false)}
                    >
                      <span>Cập nhật thông tin</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="button button-danger"
                      style={{ marginLeft: 30, minWidth: 0 }}
                      // onClick={() => edit(true)}
                      onClick={() => onBack()}
                    >
                      <span>Hủy</span>
                    </div>
                    <div
                      className="button button-danger"
                      style={{ marginLeft: "0" }}
                      onClick={() => onSubmit()}
                    >
                      <span>Lưu thay đổi</span>
                    </div>
                  </>
                )}
              </AuthWrapper>
            ) : (
              <>
                <AuthWrapper accessRoles={[ROLES["TIEP_DON"].HUY_TIEP_DON]}>
                  <div className="button button-danger" onClick={onResetData}>
                    <span>Hủy tiếp đón</span>
                    <img
                      src={require("assets/images/welcome/danger.png")}
                      alt=""
                    ></img>
                  </div>
                </AuthWrapper>
                <div
                  className="button button-save"
                  id="btn_luu_thong_tin_quay_tiep_don"
                  onClick={() => onSubmit()}
                >
                  <span>Lưu thông tin</span>
                  <span>[F4]</span>
                  <img
                    src={require("assets/images/welcome/save.png")}
                    alt=""
                  ></img>
                </div>
                {dangKyKhamCc && (
                  <div
                    className="button button-emergency"
                    onClick={() => onSubmit()}
                  >
                    <span>Lưu và đăng ký khám cấp cứu</span>
                    <img
                      src={require("assets/images/welcome/emergency.png")}
                      alt=""
                    ></img>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <ModalCheckBaoHiem ref={refModalCheckBaoHiem} />
        <ModalTrungThongTin
          ref={refTrungThongTin}
          kiemTraThanhToan={kiemTraThanhToan}
        />
        <TabThongTin ref={refTabThongTin} />
      </div>
      <ModalNotification2 ref={refNotification} />
    </Main>
  );
};

export default memo(ThongTinTiepDon);
