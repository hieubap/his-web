import React, { useEffect, useRef, useState } from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import actionReport from "@actions/report";
import actionAddress from "@actions/address";
import actionSetting from "@actions/setting";
import { AdminPage } from "@admin/components/admin";
import { withTranslate } from "react-redux-multilingual";
import ThongTinCaNhan from "./ThongTinCaNhan";
import DoiTuongKhach from "./DoiTuongKhach";
import DiaChiVietNam from "./DiaChiVietNam";
import BoCauHoi from "./BoCauHoi";
import snackbar from "@utils/snackbar-utils";
import actionPost from "@actions/post";
import "../ttHanhChinh/style.scss";
import AnhDaiDien from "./AnhDaiDien";
import ButtonLeft from "./searchCheckin/SearchLeft";
import ButtonRight from "./searchCheckin/searchRight";
import settingProvider from "@data-access/setting-provider";
import LichSuDangKy from "./LichSuDangKy";
import TheKhach from "./TheKhach";
import {Modal} from 'antd';
import moment from "moment";
function index(props) {
  const {
    translate,
    form,
    updateData,
    onQuocGia,
    onSearchTinhTp,
    searchNgheNghiep,
    donViId,
    khuVucId,
    questions,
    auth,
    onCheckin,
    answer,
    khaiBaoYTe,
    searchDoiTuong,
    listDoiTuong,
    updateDataAddress,
    onSearchQuanHuyen,
    onSearchXaPhuong,
    thongTinDoiTuongLienHeTen,
    searchDonVi,
    searchKhuVuc,
    onSearchSetting,
    doiTuongId,
    history,
    searchAllQuestions,
    doiTuongMa,
    getAllKhoa,
    listDepartment,
    soDienThoai,
    quanHuyenId,
    xaPhuongId,
    ngayCheckIn,
    tinhThanhPhoId,
    ngaySinh,
    dinhdangngaysinh,
    thongTinDoiTuongLienHe,
    id,
    checkDate,
    phanLoai,
    checkButtonSubmit,
    onSearch,
    idCheck,
    clearData,
    thongTienLienQuan,
    hoVaTen,
    soCanCuoc,
    ma,
    dataDonVi,
    clickMenu,
    hashTag,
    soNha,
    checkBoCauHoi,
  } = props;
  const refDoiTuongMa = useRef();
  const refGuestCard = useRef();
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const [checkKhuVuc, setCheckKhuVuc] = useState(false);
  const { getFieldDecorator, setFieldsValue } = form;
  const donViMaLink = window.location.search.getQueryStringHref("donViMa");
  const khuVucMaLink = window.location.search.getQueryStringHref("khuVucMa");
  const doiTuongMaLink = window.location.search.getQueryStringHref(
    "doiTuongMa"
  );
  const doiTuongIdLink = window.location.search.getQueryStringHref(
    "doiTuongId"
  );
  const boCauHoiMaLink = window.location.search.getQueryStringHref(
    "boCauHoiMa"
  );
  const maKhach = window.location.search.getQueryStringHref("ma");
  useEffect(() => {
    let newState = {
      checkValidate: false,
      ngayCheckIn: donViMaLink ? ngayCheckIn ? ngayCheckIn : new Date() : new Date(),
      dinhdangngaysinh: false,
      checkNgaySinh: false,
      laSoDienThoaiNguoiThan: false,
      checkButtonSubmit: false,
      phanLoai: "0",
    };
    if (clickMenu) {
      clearData();
      form.resetFields();
      newState.clickMenu = false;
    }
    let dataCheckTarget = doiTuongMaLink && doiTuongMaLink.split(",");
    if (dataCheckTarget && dataCheckTarget.length === 1) {
      newState.doiTuongMa = doiTuongMaLink;
      newState.doiTuongId = doiTuongIdLink ? Number(doiTuongIdLink) : "";
    } else {
      newState.doiTuongMa = "";
      newState.doiTuongId = "";
    }
    onQuocGia(0);
    onSearchTinhTp(0, 9999);
    searchNgheNghiep();
    if (maKhach) {
      update();
      if (tinhThanhPhoId) onSearchQuanHuyen(tinhThanhPhoId);
      if (quanHuyenId) onSearchXaPhuong(quanHuyenId);
    }
    if (boCauHoiMaLink) {
      onSearch("", null, null, null, boCauHoiMaLink)
        .then((s) => {
          const question = s[khuVucId + "_" + doiTuongId];
          initAnswer(question);
        })
        .catch(() => {});
    }
    if (donViMaLink) {
      searchDonVi().then((s) => {
        let donVi = s.find((item) => item.ma === donViMaLink);
        updateData({ donViId: donVi && donVi.id });
      });
    } else if (props.auth && props.auth.id) {
      newState.donViId = auth.donViId;
      // Hiển thị toàn bộ khu vực thay vì KHU VỰC MẶC ĐỊNH
      if (!khuVucId) setCheckKhuVuc(true)
      newState.khuVucId = auth.khuVucId;
      newState.ngayCheckIn = donViMaLink
        ? ngayCheckIn
        : new Date();

      searchDonVi();
    } else {
      window.location.href = "/login";
    }
    updateData(newState);
  }, []);
  const timDoiTuongTuDoiTuongMa = (donViId, khuVucId) => {
    searchDoiTuong(donViId, khuVucId, true).then((s) => {
      let data =
        s.data && s.data
          ? s.data.map((item) => {
              if (doiTuongMaLink === item.ma) {
                item.checked = true;
                if (!boCauHoiMaLink)
                  onSearchAllQuestions(donViId, khuVucId, item.id);
                updateData({
                  doiTuongId: item.id,
                  thongTienLienQuan: item.thongTienLienQuan,
                });
              }
              return item;
            })
          : [];
      if (!checkKhuVuc) updateData({ listDoiTuong: data });
    });
  };

  useEffect(() => {
    if (hashTag === "refDoiTuongMa") {
      refDoiTuongMa.current.scrollIntoView({
        block: "center",
      });
    }
  }, [hashTag]);
  useEffect(() => {
    if (donViId) {
      getAllKhoa(donViId);
      onSearchSetting(donViId);
    }
  }, [donViId]);
  useEffect(() => {
    if (donViId) {
      if (khuVucId)
        if (!doiTuongIdLink) timDoiTuongTuDoiTuongMa(donViId, khuVucId);
        else
          searchKhuVuc(donViId).then((s) => {
            let khuVuc = s.find((item) => item.ma === khuVucMaLink);
            let khuVucId = khuVuc && khuVuc.id;
            updateData({ khuVucId: khuVucId });
            if (khuVucId && !doiTuongIdLink)
              timDoiTuongTuDoiTuongMa(donViId, khuVucId);
          });
      if (!window.location.search.getQueryStringHref("khuVucMa"))
      {
        searchDoiTuong(donViId, null, true).then((s) => {
          updateData({ listDoiTuong: s.data });
        });
      }
      if (checkKhuVuc) 
      {
        searchDoiTuong(donViId, null, true).then((s) => {
          updateData({ listDoiTuong: s.data });
        });
      }
      else
      searchDoiTuong(donViId, khuVucId, true).then((s) => {
        updateData({ listDoiTuong: s.data });
      });
    }
  }, [donViId, khuVucId]);
  const setting = (donViId) => () => {
    onSearchSetting(donViId);
  };
  const checkShowPhone = (value) => {
    let checkValue = value.replaceAll(" ", "");
    let number = checkValue.slice(0, 4);
    let match = checkValue.slice(4, checkValue.length);
    var parts = [number];
    for (let i = 0, len = match.length; i < len; i += 3) {
      parts.push(match.substring(i, i + 3));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const isAnomaly = () => {
    try {
      let bbt = false;
      const question = questions[khuVucId + "_" + doiTuongId];
      if (!question) return false;
      (question.cauHoi || []).forEach((item, index) => {
        if (item.loaiCauHoi == 5) {
          item.cauHoiChiTiet.forEach((item2, index) => {
            if (item2.batThuong) {
              try {
                let x = answer.find((item3) => item3.cauHoiId == item.id);
                if (x) {
                  let y = JSON.parse(x.traLoi);
                  let temp = (item.cauTraLoi || []).find(
                    (t) => t.ma == y[index]
                  );
                  if (temp && temp.batThuong) bbt = true;
                }
              } catch (error) {}
            }
          });
        } else {
          if (item.loaiCauHoi == 4) {
            try {
              let x = answer.find((item3) => item3.cauHoiId == item.id);
              if (x) {
                let y = [];
                try {
                  y = JSON.parse(x.traLoi);
                } catch (error) {}
                y.forEach((p) => {
                  let temp = (item.cauTraLoi || []).find((t) => t.ma == p);
                  if (temp && temp.batThuong) bbt = true;
                });
              }
            } catch (error) {}
          }
        }
      });
      return bbt;
    } catch (error) {}
    return false;
  };
  const validate = () => {
    try {
      let valid = true;
      const question = questions[khuVucId + "_" + doiTuongId];
      if (!question) return true;
      let answer = props.answer || [];
      (question.cauHoi || []).forEach((item, index) => {
        if (item.batBuoc) {
          let x = answer.find((item2) => item2.cauHoiId == item.id);
          if (item.loaiCauHoi == 5) {
            try {
              if (!x || !(x.traLoi || "").trim()) {
                valid = false;
              } else {
                let y = JSON.parse(x.traLoi);
                if (y.length < item.cauHoiChiTiet.length) {
                  valid = false;
                }
              }
            } catch (error) {}
          } else if (item.loaiCauHoi == 4) {
            let y = null;
            try {
              if (!x || !(x.traLoi || "").trim()) {
                valid = false;
                y = [];
              } else {
                y = JSON.parse(x.traLoi);
              }
            } catch (error) {
              y = [];
            }
            if (!y.length) {
              valid = false;
            } else if (y.length == 1) {
              if (!x.thongTinThem) {
                y.forEach((p) => {
                  let q = item.cauTraLoi.find(
                    (t) => t.noiDung == p && t.themThongTin
                  );
                  if (q) {
                    valid = false;
                  }
                });
              }
            }
          } else {
            if (!x || !(x.traLoi || "").trim()) {
              valid = false;
            }
          }
        }
      });
      return valid;
    } catch (error) {}
    return false;
  };
  const toggleDownload = (data, name) => {
    var a = document.createElement("a");
    a.href = "data:application/octet-stream;base64," + data;
    a.accept = "image/png";
    a.download = `"iVisitor_"${name}.png`;
    a.click();
  };
  const submit = (e,checkClick) => {
    updateData({ checkButtonSubmit: true });
    let bbt = false || isAnomaly();
    if (bbt) {
      updateData({ phanLoai: 10 });
    } else {
      updateData({ phanLoai: 0 });
    }
    if (!ngaySinh) {
      updateData({ checkNgaySinh: true });
    }
    if (!doiTuongMa) {
      updateData({ hashTag: "refDoiTuongMa" });
      snackbar.show("Vui lòng chọn đối tượng khách!", "danger");
    } else if (!thongTinDoiTuongLienHe) {
      snackbar.show(`Vui lòng ${thongTienLienQuan}!`, "danger");
      updateData({ hashTag: "refDoiTuongMa" });
    }
    let checkPhoneInSubmit =
      state.checkSdt == "true" ? (soDienThoai || "").length : true;
    if (id && state.checkSdt == "true" && !soDienThoai) {
      snackbar.show(translate("vui_long_nhap_so_dien_thoai") + " !", "danger");
    }
    let validateSubmit;
    let arrValidate = [];
    if (!hoVaTen) arrValidate.push("hoVaTen");
    if (!checkPhoneInSubmit) arrValidate.push("soDienThoai");
    if (!ngaySinh || !ngaySinh.length || checkDate || dinhdangngaysinh) arrValidate.push("ngaySinh");
    if (!tinhThanhPhoId) arrValidate.push("tinhThanhPhoId");
    if (!quanHuyenId) arrValidate.push("quanHuyenId");
    if (!xaPhuongId) arrValidate.push("xaPhuongId");
    if (!soNha) arrValidate.push("soNha");
    if (arrValidate.length){
      if (arrValidate[0] == "hoVaTen" || arrValidate[0] == "soDienThoai" ||  arrValidate[0] == "ngaySinh" || arrValidate[0] == "soNha")
      {
        document.getElementById(arrValidate[0]).focus();
      }
      else{
        document.querySelector("#"+arrValidate[0]+ " input").focus();
      }
    }
    if (
      quanHuyenId &&
      xaPhuongId &&
      tinhThanhPhoId &&
      hoVaTen &&
      ngaySinh &&
      ngaySinh.length &&
      !checkDate &&
      !dinhdangngaysinh &&
      checkPhoneInSubmit &&
      thongTinDoiTuongLienHe &&
      thongTinDoiTuongLienHe.length &&
      doiTuongId &&
      soNha
    ) {
      validateSubmit = false;
    } else {
      validateSubmit = true;
      if (doiTuongMa && thongTinDoiTuongLienHe && (!hoVaTen || !ngaySinh)) {
        updateData({
          hashTag: "refThongTinCaNhan",
        });
      } else if (
        doiTuongMa &&
        thongTinDoiTuongLienHe &&
        (!quanHuyenId || !xaPhuongId || !tinhThanhPhoId || !soNha)
      ) {
        updateData({ hashTag: "refDiaChi" });
      }
    }
    updateData({ checkValidate: validateSubmit });
    e.preventDefault();
    console.log(e);
    props.form.validateFields((err, values) => {
      updateData({ checkButtonSubmit: false });
      if (!err && !validateSubmit) {
        if (state.yeuCauBangHoi == "true") {
          if (!validate()) {
            snackbar.show("Vui lòng chọn đủ câu trả lời", "danger");
            return;
          }
        }
        updateData({ checkButtonSubmit: true });
        onCheckin(checkClick)
          .then((s) => {
            let checkin = s.data;
            let data = {};
            data.traLoi = answer;
            data.checkInId = checkin.id;
            data.ttHanhChinhId = checkin.ttHanhChinh.id;
            const question = questions[khuVucId + "_" + doiTuongId];
            if (question) {
              data.boCauHoiId = question.id;
            }
            if (donViMaLink) {
              let dataImage = s.data && s.data.ttHanhChinh;
              console.log(dataImage);
              updateData({ qr: dataImage.qr})
              updateData({ hoVaTen: dataImage.hoVaTen});
              toggleDownload(dataImage.qr, dataImage.hoVaTen);
            }
            khaiBaoYTe(data, checkin.khaiBaoYTe && checkin.khaiBaoYTe.id)
              .then((res) => {
                updateData({ checkButtonSubmit: false });
                if (res && res.code === 0) {
                  if (!donViMaLink && state.checkInInTheKhach === "true") {
                    showDataModal(res);
                  } else {
                    // không reset màn hình
                    if (auth.donViId && false) {
                      clearData();
                      form.resetFields();
                      updateData({
                        ngayCheckIn: new Date(),
                        gioiTinh: "1",
                        quocTichId: 22,
                        donViId: auth.donViId,
                        khuVucId: auth.khuVucId,
                      });
                      searchDoiTuong(auth.donViId, auth.khuVucId, true).then(
                        (s) => {
                          updateData({ listDoiTuong: s.data });
                        }
                      );
                      setting(auth.donViId);
                      getAllKhoa(auth.donViId);
                    }
                  }
                  if(bbt && state.thongBaoKhiBatThuong)
                  {
                    Modal.info({
                      title: 'Thông báo',
                      content: state.thongBaoKhiBatThuong,
                      okText: "Thoát"
                    });
                  }
                }
              })
              .catch(() => {
                updateData({ checkButtonSubmit: false });
              });
          })
          .catch(() => {
            updateData({ checkButtonSubmit: false });
          });
      } else {
        return;
      }
    });
  };
  const showDataModal = (res) => {
    refGuestCard.current.show({
      checkInId: res.data && res.data.checkInId,
      donViId: donViId,
      dataDonVi: dataDonVi,
      hoVaTen: hoVaTen,
      soCanCuoc: soCanCuoc,
      ma: ma,
      ngaySinh: ngaySinh,
      ngayCheckIn: ngayCheckIn,
      qrcodeBarcode: state.qrcodeBarcode,
      phanLoai: phanLoai,
    });
  };
  const update = () => {
    updateData({
      id: "",
      idCheck: "",
    });
  };
  const initAnswer = (question, traLoi) => {
    // let checkData = props.answer && props.answer.length ? props.answer : traLoi ? traLoi : [];
    let checkData = traLoi
      ? traLoi
      : props.answer && props.answer.length
      ? props.answer
      : [];
    let answer = JSON.parse(JSON.stringify(checkData));
    if (question) {
      (question.cauHoi || []).forEach((item, index) => {
        let x = answer.find((item2) => item2.cauHoiId == item.id);
        if (!x) {
          x = {
            cauHoiId: item.id,
            traLoi: "",
          };
          answer.push(x);
        }
        if (item.loaiCauHoi == 4) {
          try {
            if (!x.traLoi) {
              x.traLoi = "[]";
            }
            let y = JSON.parse(x.traLoi);
            item.cauTraLoi.forEach((item2, index2) => {
              if (y.indexOf(item2.ma) == -1) {
                if (item2.macDinh) {
                  y.push(item2.ma);
                  updateData({ phanLoai: "10" });
                }
              }
            });
            x.traLoi = JSON.stringify(y);
          } catch (error) {}
        } else if (item.loaiCauHoi == 5) {
          try {
            if (!x.traLoi) {
              x.traLoi = "[]";
            }
            let y = JSON.parse(x.traLoi);
            item.cauHoiChiTiet.forEach((item2, index2) => {
              // if (!y[index2]) {
              //     y[index2] = undefined;
              // }
              if (!y[index2]) {
                item.cauTraLoi.forEach((item3, index3) => {
                  if (item3.macDinh) {
                    y[index2] = item3.ma;
                    updateData({ phanLoai: "10" });
                  }
                });
              }
            });
            x.traLoi = y ? JSON.stringify(y) : "[]";
          } catch (error) {}
        }
      });
      updateData({ answer: answer });
    }
  };
  const onSearchAllQuestions = (donVi, khuVuc, doiTuong) => {
    if (!checkBoCauHoi)
    {
    updateData({ answer: [] });
    searchAllQuestions(donVi, khuVuc, doiTuong)
      .then((s) => {
        const question = s[khuVuc + "_" + doiTuong];
        initAnswer(question);
      })
      .catch(() => {});
  }};
  useEffect(() => {
    try {
      let tenPhieu = settingProvider.getValue(
        props.dataSetting,
        "ten_phieu_khai_thac_thong_tin",
        ""
      );
      let qrcodeBarcode = settingProvider.getValue(
        props.dataSetting,
        "qrcode_barcode",
        10
      );
      let checkSdt = settingProvider.getValue(
        props.dataSetting,
        "yeu_cau_so_dien_thoai",
        ""
      );
      let yeuCauBangHoi = settingProvider.getValue(
        props.dataSetting,
        "yeu_cau_bang_hoi",
        ""
      );
      let yeuCauChupHinh = settingProvider.getValue(
        props.dataSetting,
        "yeu_cau_chup_hinh",
        ""
      );
      let checkInInTheKhach = settingProvider.getValue(
        props.dataSetting,
        "check_in_in_the_khach",
        ""
      );
      let thongBaoKhiBatThuong = settingProvider.getValue(
        props.dataSetting,
        "thong_bao_khi_bat_thuong",
        ""
      );
      setState({
        ...state,
        tenPhieu,
        qrcodeBarcode,
        checkSdt,
        yeuCauBangHoi,
        yeuCauChupHinh,
        checkInInTheKhach,
        thongBaoKhiBatThuong
      });
    } catch (error) {}
  }, [props.dataSetting]);
  return (
    <>
      <AdminPage
        className="mgr-form-types mgr-medical-declaration"
        icon={[<img src={require("@images/checkin/icLogPage.png")} />]}
        header={
          state.tenPhieu ? state.tenPhieu : translate("khaibaoytetunguyen")
        }
        subheader={"  "}
      >
        <div className="row">
          <div className="col-md-6 col-12">
            <ButtonLeft
              history={history}
              onSearchQuanHuyen={onSearchQuanHuyen}
              onSearchXaPhuong={onSearchXaPhuong}
              form={form}
              submit={submit}
              update={update}
              checkButtonSubmit={checkButtonSubmit}
              initAnswer={initAnswer}
              questions={questions}
              doiTuongId={doiTuongId}
              yeuCauChupHinh={state.yeuCauChupHinh}
            />
            <div className="row">
              <div className="col-lg-6 col-12 page-child page-childScreen">
                <div className="title-khai-bao" ref={refDoiTuongMa}>
                  <DoiTuongKhach
                    updateData={updateData}
                    listDoiTuong={listDoiTuong}
                    donViId={donViId ? donViId : auth.donViId}
                    khuVucId={khuVucId ? khuVucId : auth.khuVucId}
                    doiTuongId={doiTuongId}
                    history={history}
                    searchAllQuestions={onSearchAllQuestions}
                    doiTuongMa={doiTuongMa}
                    listDepartment={listDepartment}
                    thongTinDoiTuongLienHeTen={thongTinDoiTuongLienHeTen}
                    thongTinDoiTuongLienHe={thongTinDoiTuongLienHe}
                    getFieldDecorator={getFieldDecorator}
                    ngayCheckIn={ngayCheckIn}
                    phanLoai={phanLoai}
                    setFieldsValue={setFieldsValue}
                    answer={answer}
                    idCheck={idCheck}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-12 page-child page-childScreen">
                <div className="title-khai-bao">
                  <AnhDaiDien />
                </div>
              </div>
              <div className="col-lg-6 col-12 page-child page-childScreen">
                <div className="title-khai-bao">
                  <ThongTinCaNhan
                    getFieldDecorator={getFieldDecorator}
                    checkSdt={state.checkSdt}
                    checkShowPhone={checkShowPhone}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-12 page-child page-childScreen">
                <div className="title-khai-bao">
                  <DiaChiVietNam
                    updateData={updateData}
                    updateDataAddress={updateDataAddress}
                    onSearchQuanHuyen={onSearchQuanHuyen}
                    getFieldDecorator={getFieldDecorator}
                    onSearchXaPhuong={onSearchXaPhuong}
                    toggleDownload={toggleDownload}
                    donViMaLink={donViMaLink}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-md-6 col-12 page-child ${
              !!donViMaLink && "page-res-767"
            }`}
          >
            <ButtonRight
              history={history}
              onSearchQuanHuyen={onSearchQuanHuyen}
              onSearchXaPhuong={onSearchXaPhuong}
              form={form}
              submit={submit}
              update={update}
              checkButtonSubmit={checkButtonSubmit}
              initAnswer={initAnswer}
              yeuCauChupHinh={state.yeuCauChupHinh}
              checkSdt={state.checkSdt}
              updateData={updateData}
            />

            {(doiTuongId || doiTuongMa) &&
            (state.yeuCauBangHoi == "true" ||
              state.yeuCauBangHoi == "10" ||
              !state.yeuCauBangHoi) &&
            thongTinDoiTuongLienHe ? (
              <div className="title-khai-bao page-BCH">
                <BoCauHoi
                  updateData={updateData}
                  tenPhieu={
                    state.tenPhieu
                      ? state.tenPhieu
                      : translate("khaibaoytetunguyen")
                  }
                  readOnly={idCheck ? true : false}
                />
              </div>
            ) : null}
          </div>
        </div>
      </AdminPage>
      <LichSuDangKy />
      <TheKhach
        ref={refGuestCard}
        clearData={clearData}
        form={form}
        updateData={updateData}
        auth={auth}
        searchDoiTuong={searchDoiTuong}
        getAllKhoa={getAllKhoa}
        setting={setting}
      />
    </>
  );
}
export default connect(
  (state) => {
    return {
      checkBoCauHoi: state.ttHanhChinh.checkBoCauHoi,
      id: state.ttHanhChinh.id,
      idCheck: state.ttHanhChinh.idCheck,
      auth: (state.auth && state.auth.auth) || {},
      hoVaTen: state.ttHanhChinh.hoVaTen || "",
      qr: state.ttHanhChinh.qr,
      soCanCuoc: state.ttHanhChinh.soCanCuoc || "",
      ngaySinh: state.ttHanhChinh.ngaySinh || null,
      soDienThoai: state.ttHanhChinh.soDienThoai || "",
      tinhThanhPhoId: state.ttHanhChinh.tinhThanhPhoId || "",
      dataHistory: state.ttHanhChinh.dataHistory,
      quanHuyenId: state.ttHanhChinh.quanHuyenId || "",
      xaPhuongId: state.ttHanhChinh.xaPhuongId || "",
      soNha: state.ttHanhChinh.soNha || "",
      dinhdangngaysinh: state.ttHanhChinh.dinhdangngaysinh,
      listDoiTuong: state.ttHanhChinh.listDoiTuong || [],
      answer: state.ttHanhChinh.answer || [],
      questions: state.post.questions,
      donViId: state.ttHanhChinh.donViId,
      khuVucId: state.ttHanhChinh.khuVucId,
      doiTuongId: state.ttHanhChinh.doiTuongId,
      doiTuongMa: state.ttHanhChinh.doiTuongMa,
      listDepartment: state.ttHanhChinh.listDepartment || [],
      thongTinDoiTuongLienHeTen: state.ttHanhChinh.thongTinDoiTuongLienHeTen,
      thongTinDoiTuongLienHe: state.ttHanhChinh.thongTinDoiTuongLienHe || "",
      thongTienLienQuan: state.ttHanhChinh.thongTienLienQuan,
      phanLoai:
        (state.ttHanhChinh.phanLoai && state.ttHanhChinh.phanLoai.toString()) ||
        "0",
      datakhaiBaoYTe: state.ttHanhChinh.datakhaiBaoYTe,
      checkNgaySinh: state.ttHanhChinh.checkNgaySinh,
      checkValidate: state.ttHanhChinh.checkValidate,
      qrcode_barcode: state.ttHanhChinh.qrcode_barcode,
      checkDate: state.ttHanhChinh.checkDate,
      ngayCheckIn:
        state.ttHanhChinh.ngayCheckIn && moment(state.ttHanhChinh.ngayCheckIn),
      checkButtonSubmit: state.ttHanhChinh.checkButtonSubmit,
      dataDonVi: state.report.dataDonVi || [],
      ma: state.ttHanhChinh.ma || "",
      clickMenu: state.ttHanhChinh.clickMenu,
      hashTag: state.ttHanhChinh.hashTag,
      dataSetting: state.setting.data || [],
    };
  },
  {
    updateData: actionTtHanhChinh.updateData,
    updateDataAddress: actionAddress.updateData,
    createOrEdit: actionTtHanhChinh.createOrEdit,
    onQuocGia: actionAddress.onSearchQuocGia,
    onSearchQuanHuyen: actionAddress.onSearchQuanHuyen,
    onSearchTinhTp: actionAddress.onSearchTinhTp,
    onSearchXaPhuong: actionAddress.onSearchXaPhuong,
    searchNgheNghiep: actionReport.searchNgheNghiep,
    searchDoiTuong: actionReport.searchDoiTuong,
    searchDonVi: actionReport.searchDonVi,
    searchKhuVuc: actionReport.searchKhuVuc,
    onSearchSetting: actionSetting.onSearch,
    searchAllQuestions: actionPost.searchAllQuestions,
    getAllKhoa: actionTtHanhChinh.getAllKhoa,
    onCheckin: actionTtHanhChinh.checkin,
    khaiBaoYTe: actionTtHanhChinh.khaiBaoYTe,
    onSearch: actionPost.gotoPage,
    searchInfo: actionTtHanhChinh.searchInfo,
    clearData: actionTtHanhChinh.clearData,
  }
)(Form.create()(withTranslate(index)));
