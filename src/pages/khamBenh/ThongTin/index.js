import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Button, Modal, Form, message } from "antd";
import { Element, scroller } from "react-scroll";
import { FRAME_TITLE, HUONG_DIEU_TRI_KHAM, KET_QUA_KHAM } from "../configs";
import NavigationBar from "./NavigationBar";
import StepWrapper from "../components/StepWrapper";
import KetLuan from "../KetLuan";
import KetQua from "../KetQua";
import ChiDinhDichVu from "../ChiDinhDichVu";
import DonThuoc from "../DonThuoc";
import CustomPopoverWithRef from "../components/CustomPopoverWithRef";
import KhamCoBan from "../KhamCoBan";
import ModalChiDinh from "../ModalChiDinh";
import { isEqual, cloneDeep } from "lodash";
import { PopoverWrapper, ButtonCovid } from "./styled";
import FormPopover from "./FormPopover";
import { ModalNotification2 } from "components/ModalConfirm";
import { TRANG_THAI_DICH_VU } from "constants/index";
import successIcon from "assets/images/khamBenh/success-v.png";
import arrowDoubleLeft from "assets/images/khamBenh/arrow-double-left.png";
import arrowDoubleRight from "assets/images/khamBenh/arrow-double-right.png";

const { confirm } = Modal;

const ThongTin = ({ layerId }) => {
  const [state, _setState] = useState({
    ketLuanError: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModalNotification2 = useRef(null);
  const refCustomPopover = useRef(null);
  const { thongTinChiTiet = {}, infoNb } = useSelector(
    (state) => state.khamBenh
  );
  const { typeKhamCoBan } = useSelector((state) => state.khamBenh);
  const nbCovid = useSelector((state) => state.khamBenh.nbCovid);

  const {
    neededUpdateRecord,
    dsDichVuChiDinhXN,
    dsDichVuChiDinhKham,
    dsDichVuChiDinhCls,
  } = useSelector((state) => state.chiDinhKhamBenh);

  const { updateData: updateDataChiDinh } = useDispatch().chiDinhKhamBenh;
  const { getUtils } = useDispatch().utils;

  const { trangThai: trangThaiKham } = thongTinChiTiet?.nbDvKyThuat || {};
  const {
    setElementKey,
    dangKetLuan,
    updateNbDvKham,
    huyKetLuanKham,
    ketLuanKham,
    updateNbCovid,
    updateData: updateDataKhamBenh,
  } = useDispatch().khamBenh;

  const hasDichVu = useMemo(() => {
    return (
      dsDichVuChiDinhXN.length > 0 ||
      dsDichVuChiDinhKham.length > 0 ||
      dsDichVuChiDinhCls.length > 0
    );
  }, [dsDichVuChiDinhKham, dsDichVuChiDinhXN, dsDichVuChiDinhCls]);

  const dataDichVu = useMemo(
    () => [...dsDichVuChiDinhKham, ...dsDichVuChiDinhXN, ...dsDichVuChiDinhCls],
    [dsDichVuChiDinhKham, dsDichVuChiDinhXN, dsDichVuChiDinhCls]
  );

  const [popoverData, setPopoverData] = useState({
    keyHuongDieuTri: null,
    keyKetQua: null,
  });
  const [form] = Form.useForm();
  const dataRef = useRef({});
  console.log("dataRef: ", dataRef.current);
  const refConfirmSaveShowing = useRef(null);

  const dataKetLuanRef = useRef({});
  console.log("dataKetLuanRef: ", dataKetLuanRef);
  const refCurrentKey = useRef(0);
  useEffect(() => {
    getUtils({ name: "huongDieuTriKham" });
    getUtils({ name: "ketQuaDieuTriKham" });
    setElementKey(0);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleOnSave);
    return () => document.removeEventListener("keydown", handleOnSave);
  }, [
    infoNb,
    thongTinChiTiet,
    dsDichVuChiDinhCls,
    dsDichVuChiDinhKham,
    dsDichVuChiDinhXN,
    popoverData,
    typeKhamCoBan,
    nbCovid,
  ]);

  useEffect(() => {
    setState({
      ketLuanError: false, //reset lại flag lỗi huỷ kết luận khi thay đổi bênh nhân
    });
  }, [infoNb]);

  useEffect(() => {
    const { nbChanDoan, nbKetLuan } = thongTinChiTiet || {};
    const { huongDieuTri, ketQuaDieuTri } = nbKetLuan || {};
    if (huongDieuTri || ketQuaDieuTri) {
      setPopoverData({
        keyHuongDieuTri: huongDieuTri,
        keyKetQua: ketQuaDieuTri,
      });
    }
    updateDataChiDinh({
      dataNb: nbChanDoan,
    });
    dataRef.current = thongTinChiTiet;
    dataKetLuanRef.current = cloneDeep(thongTinChiTiet);
  }, [thongTinChiTiet]);

  const handleOnSave = (e) => {
    const { ctrlKey, metaKey, which, value } = e;
    if (
      (ctrlKey || metaKey) &&
      String.fromCharCode(which).toLowerCase() === "s"
    ) {
      e.preventDefault();
      if (
        hasDichVu &&
        !dataRef?.current?.nbChanDoan?.cdSoBo &&
        dataRef?.current?.nbChanDoan?.dsCdChinhId?.length === 0
      ) {
        message.error("Không thể xóa CĐ bệnh khi đã nhập dịch vụ");
        // dataRef.current.nbChanDoan.cdSoBo = thongTinChiTiet.nbChanDoan.cdSoBo
        // var text = document.createTextNode(`${thongTinChiTiet.nbChanDoan.cdSoBo}`);
        // document.getElementById("chan-doan-so-bo").innerHTML = thongTinChiTiet.nbChanDoan.cdSoBo
      } else {
        saveDataByKey();
      }
    }
  };
  const handleSaveKetLuanKham = (ketThuc) => {
    return new Promise((resolve, reject) => {
      const dataSubmit = { id: infoNb?.id };
      let { nbChanDoan, nbChuyenVien, nbNhapVien, nbHoiBenh, nbKhamXet } =
        dataKetLuanRef.current;
      if (!nbChanDoan) nbChanDoan = {};
      if (nbChuyenVien) {
        nbChanDoan.dsCdChinhId = nbChuyenVien?.dsChanDoanId;
      }
      if (nbNhapVien) {
        nbChanDoan.dsCdChinhId = nbNhapVien?.dsChanDoanId;
      }

      updateNbDvKham(
        {
          ...dataSubmit,
          nbChanDoan,
          nbHoiBenh,
          nbKhamXet,
        },
        false
      )
        .then((s) => {
          handleKetLuan(ketThuc)
            .then((s) => {
              resolve(s);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          reject(e);
        });
    });
  };
  const handleKetLuan = (ketThuc) => {
    return new Promise((resolve, reject) => {
      const { keyHuongDieuTri, keyKetQua } = popoverData;
      const {
        nbChuyenVien,
        nbNhapVien,
        nbKetLuan,
        nbHoiBenh,
        nbChanDoan,
        nbKhamXet,
      } = dataKetLuanRef.current;
      let bodyKetLuan = {
        id: infoNb.id,
        huongDieuTri: keyHuongDieuTri,
        ketQuaDieuTri: keyKetQua,
      };
      switch (keyHuongDieuTri) {
        case HUONG_DIEU_TRI_KHAM.HEN_KHAM:
          bodyKetLuan = { ...bodyKetLuan, ...nbKetLuan };
          break;
        case HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN:
          if (nbChuyenVien) {
            if (!nbChuyenVien?.lyDoChuyenTuyen)
              nbChuyenVien.lyDoChuyenTuyen = 1;
            let { dsChanDoanId, ...nbChuyenVienNew } = nbChuyenVien; // anh Minh đổi tên và chuyển dsChanDoanId ra ngoài
            bodyKetLuan.nbChuyenVien = nbChuyenVienNew;
            bodyKetLuan.dsChanDoanId = dsChanDoanId;
          }
          break;
        case HUONG_DIEU_TRI_KHAM.NHAP_VIEN:
          let { dsChanDoanId, ...nbNhapVienNew } = nbNhapVien;
          bodyKetLuan.nbNhapVien = nbNhapVienNew;
          bodyKetLuan.dsChanDoanId = dsChanDoanId;
          break;
        default:
          break;
      }
      bodyKetLuan.nbChanDoan = nbChanDoan;
      bodyKetLuan.nbHoiBenh = nbHoiBenh;
      bodyKetLuan.nbKhamXet = nbKhamXet;
      ketLuanKham(bodyKetLuan, ketThuc)
        .then((s) => {
          resolve(true);
        })
        .catch((e) => {
          reject(false);
        });
    });
  };

  const isValidate = () => {
    // //nbChanDoan
    // if (dataRef?.current?.nbChanDoan?.cdSoBo?.length > 1000) {
    //   message.error("Chẩn đoán sơ bộ sai định dạng dữ liệu");
    //   return true
    // }
    // if (dataRef?.current?.nbChanDoan?.moTa?.length > 2000) {
    //   message.error("Mô tả chi tiết sai định dạng dữ liệu");
    //   return true
    // }
    // //nbHoiBenh
    // if (dataRef?.current?.nbHoiBenh?.quaTrinhBenhLy?.length > 2000) {
    //   message.error("Quá trình bệnh lý số lượng ký tự vượt quá chiều dài cho phép");
    //   return true
    // }
    // if (dataRef?.current?.nbHoiBenh?.tienSuBanThan?.length > 2000) {
    //   message.error("Tiền sử bản thân số lượng ký tự vượt quá chiều dài cho phép");
    //   return true
    // }
    // if (dataRef?.current?.nbHoiBenh?.tienSuGiaDinh?.length > 2000) {
    //   message.error("Tiền sử gia đình số lượng ký tự vượt quá chiều dài cho phép");
    //   return true
    // }
    // //nbKhamXet
    // if (dataRef?.current?.nbKhamXet?.ghiChu?.length > 2000) {
    //   message.error("Lưu ý số lượng ký tự vượt quá chiều dài cho phép");
    //   return true
    // }
    // if (dataRef?.current?.nbKhamXet?.toanThan?.length > 2000) {
    //   message.error("Toàn thân số lượng ký tự vượt quá chiều dài cho phép");
    //   return true
    // }
    // if (dataRef?.current?.nbKhamXet?.cacBoPhan?.length > 2000) {
    //   message.error("Các bộ phận số lượng ký tự vượt quá chiều dài cho phép");
    //   return true
    // }
  };

  const handleSaveDichVuKham = () => {
    const isValidateResult = isValidate();
    refConfirmSaveShowing.current = false;
    if (isValidateResult) return null;
    return new Promise((resolve, reject) => {
      const { nbChanDoan, nbHoiBenh, nbKhamXet } = dataRef.current;
      if (
        hasDichVu &&
        !nbChanDoan?.cdSoBo &&
        !nbChanDoan?.dsCdChinhId?.length
      ) {
        message.error("Không thể xóa CĐ bệnh khi đã nhập dịch vụ");
        reject(false);
      } else {
        // if(typeKhamCoBan?.type === "khamCovid" && nbCovid?.dsCdChinhId?.length === 0){
        //   message.error("Nhập chẩn đoán bệnh trước khi kết thúc khám");
        //   return null
        // }
        const dataSubmit = { id: infoNb?.id, nbChanDoan, nbHoiBenh, nbKhamXet };
        if (
          trangThaiKham == TRANG_THAI_DICH_VU.CHO_KHAM ||
          trangThaiKham == TRANG_THAI_DICH_VU.DA_CHECKIN_KHAM ||
          trangThaiKham == TRANG_THAI_DICH_VU.DA_CHECKIN ||
          trangThaiKham == TRANG_THAI_DICH_VU.CHUAN_BI_KHAM
        ) {
          refModalNotification2.current &&
            refModalNotification2.current.show(
              {
                content: `Người bệnh chưa được gọi khám! Bạn có xác nhận gọi khám để tiếp tục khám cho Người bệnh?`,
                cancelText: "Huỷ",
                okText: "Đồng ý",
                showBtnOk: true,
                typeModal: "warning",
              },
              () => {
                if (typeKhamCoBan?.type === "khamCovid") {
                  let obj = {
                    nbCovid: {
                      ...nbCovid,
                      id: infoNb.id,
                    },
                  };
                  updateNbCovid({ ...obj, changeStatus: true });
                } else {
                  updateNbDvKham(dataSubmit)
                    .then((s) => {
                      resolve(true);
                    })
                    .catch((e) => reject(false));
                }
              },
              () => {
                reject(false);
              }
            );
        } else {
          if (typeKhamCoBan?.type === "khamCovid") {
            let obj = {
              nbCovid: {
                ...nbCovid,
                id: infoNb.id,
              },
            };
            updateNbCovid({ ...obj });
          } else {
            updateNbDvKham(dataSubmit)
              .then((s) => {
                resolve(true);
              })
              .catch((e) => reject(false));
          }
        }
      }
    });
  };

  const saveDataByKey = () => {
    switch (refCurrentKey.current) {
      case 0:
        handleSaveDichVuKham();
        break;
      case 1:
        break;
      case 3: {
        handleSaveKetLuanKham();
        break;
      }
      default:
        break;
    }
  };
  const onActiveTab = (key) => {
    let compared = true;
    let comparedNbCovid = true;
    const newKey = +key;
    const currentKey = refCurrentKey.current;
    const dataCompare = thongTinChiTiet;
    if (currentKey == 0 && newKey !== 0) {
      compared = isEqual(dataCompare, dataRef.current);
      if (typeKhamCoBan?.type === "khamCovid") {
        comparedNbCovid = isEqual(thongTinChiTiet?.nbCovid, nbCovid);
      }
    }
    if (currentKey == 3 && newKey !== 3) {
      //chuyển tuyến khám bệnh
      compared = isEqual(dataCompare, dataKetLuanRef.current);
    }

    if (!compared || !comparedNbCovid) {
      if (refConfirmSaveShowing.current) return;
      const isValidateResult = isValidate();
      if (isValidateResult) {
        scrollTo("0", () => {
          refConfirmSaveShowing.current = false;
        });
        return null;
      }
      refConfirmSaveShowing.current = true;
      confirmSaveData(currentKey, newKey);
    } else {
      refCurrentKey.current = newKey;
    }
  };

  const scrollTo = (key = 0, callback) => {
    scroller.scrollTo(key.toString(), {
      duration: 500,
      offset: 50,
      smooth: "easeInOutQuint",
      containerId: "containerElement",
    });
    setTimeout(() => {
      refCurrentKey.current = key;
      setElementKey(key);
      callback && callback();
    }, 500);
  };
  const confirmSaveData = (currentKey, newKey) => {
    confirm({
      content: `Đang có thay đổi dữ liệu trên ${FRAME_TITLE[currentKey]}, bạn có muốn lưu lại thông tin đã thay đổi?`,
      onCancel() {
        scrollTo("0", () => {
          refConfirmSaveShowing.current = false;
        });
      },
      onOk() {
        if (currentKey === 0) {
          handleSaveDichVuKham()
            .then((s) => {
              refCurrentKey.current = newKey;
              refConfirmSaveShowing.current = false;
            })
            .catch((e) => {
              scrollTo(0, () => {
                refConfirmSaveShowing.current = false;
              });
            });
        }
        if (currentKey === 3) {
          handleSaveKetLuanKham()
            .then((s) => {
              refCurrentKey.current = newKey;
              refConfirmSaveShowing.current = false;
            })
            .catch((e) => {
              scrollTo(3, () => {
                refConfirmSaveShowing.current = false;
              });
            });
          return;
        }
      },
    });
  };

  const handleSetData = (arrKey) => (e) => {
    const value = e?.currentTarget ? e.currentTarget.innerHTML : e;
    const [key1, key2] = arrKey;
    if (key2) {
      dataRef.current = {
        ...dataRef.current,
        [key1]: dataRef.current[key1]
          ? {
              ...dataRef.current[key1],
              [key2]: value,
            }
          : { [key2]: value },
      };
    } else {
      dataRef.current = {
        ...dataRef.current,
        [key1]: value,
      };
    }
  };

  const handleSetDataKetLuan = (arrKey) => (e) => {
    const value = e?.currentTarget ? e.currentTarget.innerHTML : e;
    const [key1, key2] = arrKey;
    if (key2) {
      dataKetLuanRef.current = {
        ...dataKetLuanRef.current,
        [key1]: dataKetLuanRef.current[key1]
          ? {
              ...dataKetLuanRef.current[key1],
              [key2]: value,
            }
          : { [key2]: value },
      };
    } else {
      dataKetLuanRef.current = {
        ...dataKetLuanRef.current,
        [key1]: value,
      };
    }
  };

  const handleChangeSelectPopover = (changedValues, allValues) => {
    let keyKetQua;
    const value = changedValues.keyHuongDieuTri;
    if (changedValues.hasOwnProperty("keyHuongDieuTri")) {
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
      form.setFieldsValue({ keyKetQua });
    }
  };

  const renderContentPopupKetThucKham = () => {
    return (
      <PopoverWrapper>
        <FormPopover
          handleChangeSelectPopover={handleChangeSelectPopover}
          form={form}
        />
      </PopoverWrapper>
    );
  };

  const handleShowPopupKetThucKham = () => {
    if (typeKhamCoBan?.type === "khamCovid") {
      if (nbCovid?.dsCdChinhId?.length === 0 || !nbCovid?.dsCdChinhId) {
        // open dropdown
        const selectCovid = document.getElementById("select-covid");
        let clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent("mousedown", true, true);
        selectCovid.firstElementChild.firstElementChild.scrollIntoView();
        selectCovid.firstElementChild.firstElementChild.dispatchEvent(
          clickEvent
        );
        message.error("Nhập chẩn đoán bệnh trước khi kết thúc khám");
        return;
      }
    } else {
      if (dataRef?.current?.nbChanDoan?.dsCdChinhId?.length === 0) {
        message.error("Nhập chẩn đoán bệnh trước khi kết thúc khám");
        return;
      }
    }
    refCustomPopover.current &&
      refCustomPopover.current.show(
        {},
        handleClickKetLuanKham,
        handleCancelPopover
      );
  };

  const handleCancelPopover = () => {
    refCustomPopover.current && refCustomPopover.current.hide({});
  };

  const dieuKienKetLuanButton = useMemo(() => {
    let th1 = dataDichVu.every((item) => {
      const daKetLuan = item.trangThai >= 150;
      const hasNoiTru = item.doiTuongKcb === 30 || item.doiTuongKcb === 40; //điều trị nội trú (30), điều trị nội trú ban ngày(40)
      const doiTuong = item.doiTuong === 1; // 1 là nb không có bảo hiểm (nb dịch vụ)
      return doiTuong && daKetLuan && !hasNoiTru;
    }); // 150 : đã kết luận
    let th2 = dataDichVu.every((item) => {
      const daKetLuan = item.trangThai >= 150;
      const hasNoiTru = item.doiTuongKcb === 30 || item.doiTuongKcb === 40; //điều trị nội trú (30), điều trị nội trú ban ngày(40)
      const hasThanhToan = item.thanhToanBh || item.thanhToanKhongBh;
      const doiTuong = item.doiTuong === 2; // 2 là nb có bảo hiểm
      return doiTuong && daKetLuan && !hasNoiTru && !hasThanhToan;
    }); // 150 : đã kết luận
    return {
      th1,
      th2,
    };
  }, [dataDichVu]);

  const handleClickKetLuanKham = () => {
    form
      .validateFields()
      .then((values) => {
        dangKetLuan({ ketThucKham: true }).then((s) => {
          //sau khi chọn loại kết thúc khám thì đổi trạng thái sang đang kết luận
          const { keyHuongDieuTri, keyKetQua } = values;
          setPopoverData({ keyHuongDieuTri, keyKetQua }); //cập nhật lại thông tin kết luận khám ngoài màn hình
          refCustomPopover.current && refCustomPopover.current.hide(); //ẩn popover kết luận khám
          scrollTo(3); //scroll xuống dưới khung điền kết luận
        });
      })
      .catch((err) => {});
  };

  const isShowButtonHuyKetLuan = useMemo(() => {
    if (
      !state.ketLuanError &&
      trangThaiKham == TRANG_THAI_DICH_VU.DA_KET_LUAN
    ) {
      if (dieuKienKetLuanButton.th1 || dieuKienKetLuanButton.th2) {
        return true;
      }
    } else {
      return false;
    }
  }, [state.ketLuanError, trangThaiKham, dataDichVu]);

  const handleKetThucKham = () => {
    if (
      dataRef?.current?.nbChanDoan?.dsCdChinhId?.length === 0 ||
      dataRef?.current?.nbCovid?.dsCdChinhId?.length === 0
    ) {
      message.error("Nhập chẩn đoán bệnh trước khi kết thúc khám");
      return;
    }
    confirm({
      content: `Bạn có muốn kết thúc và hoàn thành khám cho Người bệnh?`,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onCancel() {},
      onOk() {
        handleSaveKetLuanKham(true)
          .then((s) => {
            setState({
              ketLuanError: false,
            });
          })
          .catch((e) => {
            setState({
              ketLuanError: true,
            });
          });
      },
    });
  };

  const renderButtonRight = () => {
    if (isShowButtonHuyKetLuan) {
      return (
        <Button
          className={`button-ok `}
          onClick={() => {
            refModalNotification2.current &&
              refModalNotification2.current.show(
                {
                  content: `Người bệnh đã kết thúc khám, bạn có chắc chắn muốn thay đổi kết quả khám bệnh?`,
                  cancelText: "Quay lại",
                  okText: "Đồng ý",
                  showBtnOk: true,
                },
                () => {
                  huyKetLuanKham({ id: infoNb.id });
                }
              );
          }}
        >
          Hủy kết luận
        </Button>
      );
    }
    if (refCurrentKey.current === 3) {
      return (
        <Button className={`button-ok `} onClick={handleKetThucKham}>
          Kết thúc khám
        </Button>
      );
    }
    return (
      <CustomPopoverWithRef
        ref={refCustomPopover}
        handleVisible={handleShowPopupKetThucKham}
        width={300}
        contentPopover={renderContentPopupKetThucKham()}
        text={<Button className={`button-ok `}>Kết thúc khám</Button>}
      />
    );
  };

  const onCancelUpdateRecord = () => {
    updateDataChiDinh({
      neededUpdateRecord: [],
    });
  };

  return (
    <Row>
      <Col span={18}>
        <StepWrapper customHeaderRight={renderButtonRight()} layerId={layerId}>
          <Element name={"0"} className="element element-page">
            <KhamCoBan handleSetData={handleSetData} layerId={layerId} />
            {/* {typeKhamCoBan?.type === "khamCovid" && (
              <ButtonCovid justify="space-between">
                <div>
                  <img src={arrowDoubleLeft} alt="..." style={{ marginLeft: 5 }} />
                  <img src={arrowDoubleRight} alt="..." style={{ marginLeft: 5 }} />
                </div>
                <Button className={`button-ok `} style={{ background: "#0762f7", color: "white" }} onClick={() => {
                  updateNbCovid({ nbCovid: nbCovid })
                }}>
                  Kết thúc khám
                  <img src={successIcon} alt="..." style={{ marginLeft: 5 }} />
                </Button>
              </ButtonCovid>
            )} */}
          </Element>
          {trangThaiKham >= TRANG_THAI_DICH_VU.DANG_KHAM && (
            <Element name={"1"} className="element element-page">
              <ChiDinhDichVu />
            </Element>
          )}
          {trangThaiKham >= TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU && (
            <Element name={"2"} className="element element-page">
              <KetQua />
            </Element>
          )}
          {trangThaiKham >= TRANG_THAI_DICH_VU.DANG_KET_LUAN && (
            <Element name={"3"} className="element element-page">
              <KetLuan
                dataRef={dataKetLuanRef}
                popoverData={popoverData}
                setPopoverData={(value) => {
                  setPopoverData(value); //bên kết luận thay đổi hướng điều trị và kết quả điều trị thì cập nhập lại gía trị trong state
                }}
                title="Kết thúc khám"
                handleSetData={handleSetDataKetLuan}
                dataDichVu={dataDichVu}
                // handleSetData={handleSetData}
              />
            </Element>
          )}
          {trangThaiKham >= TRANG_THAI_DICH_VU.DA_KET_LUAN && (
            <Element name={"4"} className="element element-page">
              <DonThuoc />
            </Element>
          )}
        </StepWrapper>
      </Col>
      <Col span={6} style={{ paddingTop: 43 }}>
        <NavigationBar onActiveTab={onActiveTab} layerId={layerId} />
      </Col>
      <ModalChiDinh
        visible={neededUpdateRecord.length}
        dataSource={neededUpdateRecord}
        onCancel={onCancelUpdateRecord}
      />
      <ModalNotification2 ref={refModalNotification2} />
    </Row>
  );
};

export default ThongTin;
