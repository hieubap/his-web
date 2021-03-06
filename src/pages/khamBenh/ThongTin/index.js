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
      ketLuanError: false, //reset l???i flag l???i hu??? k???t lu???n khi thay ?????i b??nh nh??n
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
        message.error("Kh??ng th??? x??a C?? b???nh khi ???? nh???p d???ch v???");
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
            let { dsChanDoanId, ...nbChuyenVienNew } = nbChuyenVien; // anh Minh ?????i t??n v?? chuy???n dsChanDoanId ra ngo??i
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
    //   message.error("Ch???n ??o??n s?? b??? sai ?????nh d???ng d??? li???u");
    //   return true
    // }
    // if (dataRef?.current?.nbChanDoan?.moTa?.length > 2000) {
    //   message.error("M?? t??? chi ti???t sai ?????nh d???ng d??? li???u");
    //   return true
    // }
    // //nbHoiBenh
    // if (dataRef?.current?.nbHoiBenh?.quaTrinhBenhLy?.length > 2000) {
    //   message.error("Qu?? tr??nh b???nh l?? s??? l?????ng k?? t??? v?????t qu?? chi???u d??i cho ph??p");
    //   return true
    // }
    // if (dataRef?.current?.nbHoiBenh?.tienSuBanThan?.length > 2000) {
    //   message.error("Ti???n s??? b???n th??n s??? l?????ng k?? t??? v?????t qu?? chi???u d??i cho ph??p");
    //   return true
    // }
    // if (dataRef?.current?.nbHoiBenh?.tienSuGiaDinh?.length > 2000) {
    //   message.error("Ti???n s??? gia ????nh s??? l?????ng k?? t??? v?????t qu?? chi???u d??i cho ph??p");
    //   return true
    // }
    // //nbKhamXet
    // if (dataRef?.current?.nbKhamXet?.ghiChu?.length > 2000) {
    //   message.error("L??u ?? s??? l?????ng k?? t??? v?????t qu?? chi???u d??i cho ph??p");
    //   return true
    // }
    // if (dataRef?.current?.nbKhamXet?.toanThan?.length > 2000) {
    //   message.error("To??n th??n s??? l?????ng k?? t??? v?????t qu?? chi???u d??i cho ph??p");
    //   return true
    // }
    // if (dataRef?.current?.nbKhamXet?.cacBoPhan?.length > 2000) {
    //   message.error("C??c b??? ph???n s??? l?????ng k?? t??? v?????t qu?? chi???u d??i cho ph??p");
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
        message.error("Kh??ng th??? x??a C?? b???nh khi ???? nh???p d???ch v???");
        reject(false);
      } else {
        // if(typeKhamCoBan?.type === "khamCovid" && nbCovid?.dsCdChinhId?.length === 0){
        //   message.error("Nh???p ch???n ??o??n b???nh tr?????c khi k???t th??c kh??m");
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
                content: `Ng?????i b???nh ch??a ???????c g???i kh??m! B???n c?? x??c nh???n g???i kh??m ????? ti???p t???c kh??m cho Ng?????i b???nh?`,
                cancelText: "Hu???",
                okText: "?????ng ??",
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
      //chuy???n tuy???n kh??m b???nh
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
      content: `??ang c?? thay ?????i d??? li???u tr??n ${FRAME_TITLE[currentKey]}, b???n c?? mu???n l??u l???i th??ng tin ???? thay ?????i?`,
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
        message.error("Nh???p ch???n ??o??n b???nh tr?????c khi k???t th??c kh??m");
        return;
      }
    } else {
      if (dataRef?.current?.nbChanDoan?.dsCdChinhId?.length === 0) {
        message.error("Nh???p ch???n ??o??n b???nh tr?????c khi k???t th??c kh??m");
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
      const hasNoiTru = item.doiTuongKcb === 30 || item.doiTuongKcb === 40; //??i???u tr??? n???i tr?? (30), ??i???u tr??? n???i tr?? ban ng??y(40)
      const doiTuong = item.doiTuong === 1; // 1 l?? nb kh??ng c?? b???o hi???m (nb d???ch v???)
      return doiTuong && daKetLuan && !hasNoiTru;
    }); // 150 : ???? k???t lu???n
    let th2 = dataDichVu.every((item) => {
      const daKetLuan = item.trangThai >= 150;
      const hasNoiTru = item.doiTuongKcb === 30 || item.doiTuongKcb === 40; //??i???u tr??? n???i tr?? (30), ??i???u tr??? n???i tr?? ban ng??y(40)
      const hasThanhToan = item.thanhToanBh || item.thanhToanKhongBh;
      const doiTuong = item.doiTuong === 2; // 2 l?? nb c?? b???o hi???m
      return doiTuong && daKetLuan && !hasNoiTru && !hasThanhToan;
    }); // 150 : ???? k???t lu???n
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
          //sau khi ch???n lo???i k???t th??c kh??m th?? ?????i tr???ng th??i sang ??ang k???t lu???n
          const { keyHuongDieuTri, keyKetQua } = values;
          setPopoverData({ keyHuongDieuTri, keyKetQua }); //c???p nh???t l???i th??ng tin k???t lu???n kh??m ngo??i m??n h??nh
          refCustomPopover.current && refCustomPopover.current.hide(); //???n popover k???t lu???n kh??m
          scrollTo(3); //scroll xu???ng d?????i khung ??i???n k???t lu???n
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
      message.error("Nh???p ch???n ??o??n b???nh tr?????c khi k???t th??c kh??m");
      return;
    }
    confirm({
      content: `B???n c?? mu???n k???t th??c v?? ho??n th??nh kh??m cho Ng?????i b???nh?`,
      okText: "?????ng ??",
      cancelText: "H???y",
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
                  content: `Ng?????i b???nh ???? k???t th??c kh??m, b???n c?? ch???c ch???n mu???n thay ?????i k???t qu??? kh??m b???nh?`,
                  cancelText: "Quay l???i",
                  okText: "?????ng ??",
                  showBtnOk: true,
                },
                () => {
                  huyKetLuanKham({ id: infoNb.id });
                }
              );
          }}
        >
          H???y k???t lu???n
        </Button>
      );
    }
    if (refCurrentKey.current === 3) {
      return (
        <Button className={`button-ok `} onClick={handleKetThucKham}>
          K???t th??c kh??m
        </Button>
      );
    }
    return (
      <CustomPopoverWithRef
        ref={refCustomPopover}
        handleVisible={handleShowPopupKetThucKham}
        width={300}
        contentPopover={renderContentPopupKetThucKham()}
        text={<Button className={`button-ok `}>K???t th??c kh??m</Button>}
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
                  K???t th??c kh??m
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
                  setPopoverData(value); //b??n k???t lu???n thay ?????i h?????ng ??i???u tr??? v?? k???t qu??? ??i???u tr??? th?? c???p nh???p l???i g??a tr??? trong state
                }}
                title="K???t th??c kh??m"
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
