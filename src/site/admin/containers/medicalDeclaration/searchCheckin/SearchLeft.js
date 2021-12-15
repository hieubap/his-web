import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import { connect } from "react-redux";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import actionSetting from "@actions/setting";
import { withTranslate } from "react-redux-multilingual";
import { MainSearch } from "../styledModal";
import ScanQrCode from "@admin/components/common/ScanQrCode";
import actionPost from "@actions/post";
import ModalData from "../ModalData";
import moment from "moment";
import postProvider from "@data-access/post-provider";
import snackbar from "@utils/snackbar-utils";
import GotoPage from "./gotoPage";
import settingProvider from "@data-access/setting-provider";

function index(props) {
  const refQRCodeScaner = useRef(null);
  const donViMaLink = window.location.search.getQueryStringHref("donViMa");
  const maKhach = window.location.search.getQueryStringHref("ma");
  const {
    yeuCauChupHinh,
    history,
    translate,
    timKiem,
    searchInfo,
    updateData,
    onSearchQuanHuyen,
    onSearchXaPhuong,
    form,
    updateDataPost,
    showPopupData,
    dataHistory,
    anhDaiDien,
    donViId,
    searchAllQuestions,
    initAnswer,
    historyCheckin,
    loadSetPostDetail,
    auth,
    questions,
    khuVucId,
  } = props;
  const [state, _setState] = useState({
    camera: "user",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    updateData({ timKiem: "" });
  }, []);
  useEffect(() => {
    try {
      let checkFormCheckin = settingProvider.getValue(
        props.dataSetting,
        "man_hinh_checkin_mac_dinh",
        10
      );
      if (checkFormCheckin == 20 && !donViMaLink) {
        onScanQRcode();
      }
    } catch (error) {}
  }, [props.dataSetting]);
  useEffect(() => {
    if (donViId) {
      props.onSearchSetting(donViId);
    }
  }, [donViId]);

  useEffect(() => {
    let camera =
      settingProvider.getValue(props.dataSetting, "camera", "") == 20
        ? "environment"
        : "user";
    setState({
      camera,
    });
  }, [props.dataSetting]);
  const onsearchInfo = (e, qrCode, upload) => {
    clearDataIndex();
    console.log(e);
    console.log(qrCode);
    searchInfo(e, qrCode, "", upload)
      .then((s) => {
        updateData({checkBoCauHoi:true})
        if (qrCode && qrCode.length < 15 && !donViMaLink) {
          historyCheckin({ma: s.ma, page: 0})
            .then((s) => {
              let dataPost = s.data[0] || {};
              handlingPostAnswer(dataPost);
            })
            .catch(() => {});
        } else if (qrCode && qrCode.length > 15) {
          updateData({ timKiem: "" });
          historyCheckin({ma: s.ma, page: 0})
            .then((s) => {
              let dataPost = s.data[0] || {};
              handlingPostAnswer(dataPost);
            })
            .catch(() => {});
          updateData({
            idCheck: "",
            id: "",
          });
        } else if (donViMaLink && qrCode === "qrCode") {
          updateData({
            id: "",
            idCheck: "",
          });
        }
        if (s.checkQuestion) {
          let dataPost = s.dataPost || {};
          if (s.boCauHoiId) {
            getPostDetail(s.boCauHoiId, dataPost);
          } else {
            searchPost(dataPost.doiTuongId);
          }
        }
        if (s.tinhThanhPhoId) {
          onSearchQuanHuyen(s.tinhThanhPhoId);
        }
        if (s.quanHuyenId) {
          onSearchXaPhuong(s.quanHuyenId);
        }
      })
      .catch(() => {
        clearDataIndex();
      });
  };
  const searchPost = (doiTuongId) => {
    postProvider
      .searchAll(auth.donViId, auth.khuVucId, doiTuongId)
      .then((s) => {
        if (s && s.code === 0 && s.data) {
          let dataQuestions = questions || {};
          dataQuestions[auth.khuVucId + "_" + doiTuongId] = s.data;
          updateDataPost({
            questions: dataQuestions,
            dataQuestions: s.data,
          });
          initAnswer(s.data);
        } else {
          snackbar.show(translate("khong_ton_tai_bang_hoi"), "danger");
        }
      })
      .catch(() => {});
  };
  const handlingPostAnswer = (dataPost) => {
    let ngayDen = dataPost.ngayCheckIn;
    updateData({
      answer: dataPost.khaiBaoYTe && dataPost.khaiBaoYTe.traLoi,
      doiTuongId: dataPost.doiTuongId,
      doiTuongMa: dataPost.doiTuong && dataPost.doiTuong.ma,
      thongTinDoiTuongLienHe: dataPost.thongTinDoiTuongLienHe,
      anhDaiDien: dataPost.anhDaiDien || anhDaiDien,
      ngayCheckIn:ngayDen
      // donViId: dataPost.donViId,
      // khuVucId: dataPost.khuVucCheckInId
      //   ? dataPost.khuVucCheckInId
      //   : khuVucId,
    });
    let nowDate = moment(new Date()).format("YYYYMMDD");
    if (
      donViId === dataPost.donViId &&
      // ngayDen == nowDate &&
      dataPost.trangThai != 30
    ) {
      let boCauHoiId = dataPost.khaiBaoYTe && dataPost.khaiBaoYTe.boCauHoiId;
      if (boCauHoiId) {
        getPostDetail(boCauHoiId, dataPost);
      } else if (dataPost.doiTuongId && dataPost.thongTinDoiTuongLienHe) {
        searchPost(dataPost.doiTuongId);
      }
    } else {
      updateData({
        doiTuongId: "",
        doiTuongMa: "",
        answer: [],
        thongTinDoiTuongLienHe: "",
        idCheck: "",
      });
    }
  };
  const getPostDetail = (boCauHoiId, dataPost) => {
    loadSetPostDetail(boCauHoiId)
      .then((s) => {
        let dataQuestions = {};
        let khuVuc = "";
        if (donViMaLink) {
          khuVuc = khuVucId;
        } else {
          khuVuc = auth.khuVucId;
        }
        dataQuestions[khuVuc + "_" + dataPost.doiTuongId] = s.data;
        updateDataPost({
          questions: dataQuestions,
          dataQuestions: s.data,
        });
        initAnswer(s.data, dataPost.khaiBaoYTe && dataPost.khaiBaoYTe.traLoi);
      })
      .catch(() => {});
  };
  const clearDataIndex = () => {
    form.resetFields();
    updateData({
      ttHanhChinh: {},
      checkin: null,
      id: "",
      hoVaTen: "",
      soCanCuoc: "",
      ngaySinh: "",
      ngheNghiepId: null,
      nguoiBaoHo: "",
      gioiTinh: "1",
      soDienThoai: "",
      sdtNguoiBaoHo: "",
      quocTichId: 22,
      quanHuyenId: null,
      soNha: "",
      tinhThanhPhoId: null,
      quanHuyenId: null,
      xaPhuongId: "",
      anhDaiDien: "",
      checkValidate: false,
      dinhdangngaysinh: false,
      checkNgaySinh: false,
    });
  };
  const onScanQRcode = () => {
    if (refQRCodeScaner.current) {
      refQRCodeScaner.current.show(
        {
          camera: state.camera,
        },
        (data) => {
          onsearchInfo(null, data);
        }
      );
    }
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onsearchInfo(timKiem);
    }
  };
  const selectImage = (event) => {
    onsearchInfo("", "qrCode", event);
  };
  return (
    <>
      <MainSearch className={`mgr-search`} style={{ minHeight: 80 }}>
        <div className={`row ${!!donViMaLink && "page-heigth-checkin"}`}>
          {!donViMaLink ? (
            <div
              className="col-md-6 medical-declaration-2"
              style={{ textAlign: "right" }}
            >
              <div className="box-search">
                <span className="icSearch">
                  <img
                    src={require("@images/checkin/searchDepartment.png")}
                    alt=" "
                  />
                </span>
                <Input
                  placeholder={translate("tim_theo_ma_khach")}
                  value={timKiem}
                  onChange={(e) => {
                    updateData({ timKiem: e.target.value })
                    if (e.target.value.length>15) onsearchInfo(null,e.target.value);
                  }}
                  className="action-search"
                  onKeyDown={onKeyDown}
                />
              </div>
            </div>
          ) : null}
          {maKhach ? (
            ""
          ) : (
            <div
              className="col-md-6 medical-declaration-2"
              style={{ textAlign: "right" }}
            >
              <div className="box-search">
                <Button
                  onClick={() => onScanQRcode()}
                  className="search-qr action-search"
                >
                  <img src={require("@images/checkin/icQrCode.png")} alt="" />
                  {translate("scan_qr_code")}
                </Button>
              </div>
            </div>
          )}
          {!!donViMaLink && (
            <GotoPage
              translate={translate}
              history={history}
              yeuCauChupHinh={yeuCauChupHinh}
              updateData={updateData}
              maKhach={maKhach}
              className="change-location-767-left"
            />
          )}
        </div>
      </MainSearch>
      <ScanQrCode ref={refQRCodeScaner} selectImage={selectImage} />
      {showPopupData && (
        <ModalData
          show={showPopupData}
          updateData={updateData}
          dataHistory={dataHistory}
          anhDaiDien={anhDaiDien}
          onSearchQuanHuyen={onSearchQuanHuyen}
          onSearchXaPhuong={onSearchXaPhuong}
          donViId={donViId}
          updateDataPost={updateDataPost}
          searchAllQuestions={searchAllQuestions}
          historyCheckin={historyCheckin}
          auth={auth}
        />
      )}
    </>
  );
}
export default connect(
  (state) => {
    return {
      auth: (state.auth && state.auth.auth) || {},
      timKiem: state.ttHanhChinh.timKiem,
      showPopupData: state.ttHanhChinh.showPopupData || false,
      dataHistory: state.ttHanhChinh.dataHistory || [],
      anhDaiDien: state.ttHanhChinh.anhDaiDien,
      donViId: state.ttHanhChinh.donViId
        ? state.ttHanhChinh.donViId
        : state.auth && state.auth.auth && state.auth.auth.donViId,
      khuVucId: state.ttHanhChinh.khuVucId
        ? state.ttHanhChinh.khuVucId
        : state.auth && state.auth.auth && state.auth.auth.khuVucId,
      doiTuongId: state.ttHanhChinh.doiTuongId,
      questions: state.post.questions || [],
      dataSetting: state.setting.data || [],
    };
  },
  {
    searchInfo: actionTtHanhChinh.searchInfo,
    updateData: actionTtHanhChinh.updateData,
    updateDataPost: actionPost.updateData,
    searchAllQuestions: actionPost.searchAllQuestions,
    onSearch: actionPost.gotoPage,
    historyCheckin: actionTtHanhChinh.historyCheckin,
    loadSetPostDetail: actionPost.loadSetPostDetail,
    onSearchSetting: actionSetting.onSearch,
  }
)(withTranslate(index));
