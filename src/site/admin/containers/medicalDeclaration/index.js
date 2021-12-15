import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "antd";
import { connect } from "react-redux";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import actionReport from "@actions/report";
import actionSetting from "@actions/setting";
import actionPost from "@actions/post";
import { AdminPage } from "@admin/components/admin";
import "../ttHanhChinh/style.scss";
import { withTranslate } from "react-redux-multilingual";
import DoiTuongKhach from "./DoiTuongKhach";
import ThongTin from "./ThongTin";
import moment from "moment";
import snackbar from "@utils/snackbar-utils";
import settingProvider from "@data-access/setting-provider";

function index(props) {
  const {
    form,
    translate,
    updateData,
    searchDoiTuong,
    listDoiTuong,
    searchDonVi,
    searchKhuVuc,
    onSearchSetting,
    dataSetting,
    history,
    donViId,
    khuVucId,
    donViMa,
    khuVucMa,
    doiTuongMa,
    searchAllQuestions,
    listDepartment,
    thongTinDoiTuongLienHeTen,
    dataDonVi,
    dataKhuVuc,
    ngayCheckIn,
    thongTinDoiTuongLienHe,
    getAllKhoa,
    thongTienLienQuan,
    doiTuongId,
    answer,
    auth,
    historyCheckin,
  } = props;
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const { setFieldsValue } = form;
  const refMedicalDeclaration = useRef();
  const donViMaLink = window.location.search.getQueryStringHref("donViMa");
  const khuVucMaLink = window.location.search.getQueryStringHref("khuVucMa");
  const doiTuongMaLink = window.location.search.getQueryStringHref(
    "doiTuongMa"
  );
  const boCauHoiMaLink = window.location.search.getQueryStringHref(
    "boCauHoiMa"
  );
  const maKhach = window.location.search.getQueryStringHref("ma");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let href = window.location.pathname;
    if (href === "/khai-bao-y-te" && maKhach) {
      historyCheckin({ma: maKhach, page: 0}).then((s) => {
        let dataPost = s.data[0] || {};
        let data = dataPost.ttHanhChinh || {};
        let arr = data.ngaySinh && data.ngaySinh.split("-");
        let date = "";
        if (arr && arr.length === 3) {
          date = arr[2] + "/" + arr[1] + "/" + arr[0];
        }
        updateData({
          ttHanhChinh: s.data.ttHanhChinh,
          checkin: dataPost,
          id: dataPost.id,
          idCheck: data.id,
          hoVaTen: data.hoVaTen,
          soCanCuoc: data.soCanCuoc,
          ngaySinh: date,
          ngheNghiepId: data.ngheNghiepId,
          nguoiBaoHo: data.nguoiBaoHo,
          gioiTinh: data.gioiTinh || "1",
          soDienThoai: data.soDienThoai,
          sdtNguoiBaoHo: data.sdtNguoiBaoHo,
          quocTichId: data.quocTichId || 22,
          quanHuyenId: data.quanHuyenId,
          soNha: data.soNha,
          tinhThanhPhoId: data.tinhThanhPhoId,
          quanHuyenId: data.quanHuyenId,
          xaPhuongId: data.xaPhuongId,
          anhDaiDien: dataPost.anhDaiDien,
          ma: data.ma,
          ngayCheckIn: dataPost.ngayCheckIn,
          doiTuongId: dataPost.doiTuongId,
          doiTuongMa: dataPost.doiTuong && dataPost.doiTuong.ma,
          thongTinDoiTuongLienHe: dataPost.thongTinDoiTuongLienHe,
          donViId: dataPost.donViId,
          donViMa: dataPost.donVi && dataPost.donVi.ma,
          khuVucId: dataPost.khuVucCheckInId,
          datakhaiBaoYTe: dataPost,
        });
        searchDonVi();
        if (dataPost.khuVucCheckInId) {
          searchKhuVuc(dataPost.donViId).then((s) => {
            let khuVuc = s.find((item) => item.id === dataPost.khuVucCheckInId);
            let khuVucMa = khuVuc && khuVuc.ma;
            updateData({ khuVucMa: khuVucMa });
          });
        }
      });
    } else {
      if (donViMaLink) {
        let dataCheckTarget = doiTuongMaLink && doiTuongMaLink.split(",");
        updateData({
          checkValidate: false,
          ngayCheckIn: new Date(),
          khuVucMa: khuVucMaLink,
          donViMa: donViMaLink,
        });
        if (dataCheckTarget && dataCheckTarget.length === 1) {
          updateData({ doiTuongMa: doiTuongMaLink });
        } else {
          updateData({
            doiTuongMa: "",
            thongTinDoiTuongLienHe: "",
            thongTinDoiTuongLienHeTen: "",
          });
        }
        searchDonVi().then((s) => {
          let donVi = s.find((item) => item.ma === donViMaLink);
          let donViId = donVi && donVi.id;
          updateData({
            donViId: donViId,
            nhaCungCapTinNhan: donVi.nhaCungCapTinNhan,
          });
          getAllKhoa(donViId);
          if (donViId) {
            searchKhuVuc(donViId).then((s) => {
              let khuVuc = s.find((item) => item.ma === khuVucMaLink);
              let khuVucId = khuVuc && khuVuc.id;
              updateData({ khuVucId: khuVucId });
              searchDoiTuong(donViId, khuVucId, true).then((s) => {
                let data =
                  s.data && s.data
                    ? s.data.map((item) => {
                      if (doiTuongMaLink === item.ma) {
                        item.checked = true;
                        updateData({
                          doiTuongId: item.id,
                          thongTienLienQuan: item.thongTienLienQuan,
                        });
                      }
                      return item;
                    })
                    : [];
                updateData({ listDoiTuong: data });
              });
            });
          }
        });
      } else {
        updateData({
          listDoiTuong: [],
          dataKhuVuc: [],
          donViId: "",
          khuVucId: "",
          doiTuongId: "",
          thongTinDoiTuongLienHe: "",
          thongTinDoiTuongLienHeTen: "",
          ngayCheckIn: new Date(),
        });
        searchDonVi(true);
      }
    }
    updateData({ dataQuestions: {} });
  }, []);

  useEffect(() => {
    if (donViId) {
      getAllKhoa(donViId);
      searchKhuVuc(donViId);
      onSearchSetting(donViId);
    }
  }, [donViId]);

  useEffect(() => {
    if (khuVucId) {
      searchDoiTuong(donViId, khuVucId, true).then((s) => {
        updateData({ listDoiTuong: s.data });
      });
    }
  }, [khuVucId, donViId]);

  const gotoPage = () => {
    let checkValidate;
    setIsLoading(true);
    if (refMedicalDeclaration.current) {
      if (
        donViId &&
        khuVucId &&
        ngayCheckIn &&
        doiTuongMa &&
        thongTinDoiTuongLienHe
      ) {
        checkValidate = false;
      } else {
        if (!doiTuongMa) {
          snackbar.show("Vui lòng chọn đối tượng khách!", "danger");
        } else if (!thongTinDoiTuongLienHe) {
          snackbar.show(`Vui lòng nhập thông tin địa điểm đến!`, "danger");
        }
        checkValidate = true;
      }
      refMedicalDeclaration.current.submit({
        checkValidate: checkValidate,
      });
    }
    if (checkValidate) {
      setIsLoading(false);
      return;
    } else {
      let yeu_cau_chup_hinh = dataSetting.find((item) => {
        return item.maThietLap === "yeu_cau_chup_hinh";
      });
      let su_dung_man_hinh_nhap_sdt = dataSetting.find((item) => {
        return item.maThietLap === "su_dung_man_hinh_nhap_sdt";
      });
      if (yeu_cau_chup_hinh && yeu_cau_chup_hinh.giaTri === "true") {
        history.push(
          `/chup-hinh?donViMa=${donViMa}&khuVucMa=${khuVucMa}&doiTuongMa=${doiTuongMa}&doiTuongId=${doiTuongId}&boCauHoiMa=${boCauHoiMaLink ? boCauHoiMaLink : ""
          }${maKhach ? "&ma=" + maKhach : ""}`
        );
      } else if (su_dung_man_hinh_nhap_sdt && su_dung_man_hinh_nhap_sdt.giaTri === "true") {
        history.push(
          `/so-dien-thoai?donViMa=${donViMa}&khuVucMa=${khuVucMa}&doiTuongMa=${doiTuongMa}&doiTuongId=${doiTuongId}&boCauHoiMa=${boCauHoiMaLink ? boCauHoiMaLink : ""
          }`
        );
      } else {
        history.push(
          `/check-in?donViMa=${donViMa}&khuVucMa=${khuVucMa}&doiTuongMa=${doiTuongMa}&doiTuongId=${doiTuongId}&boCauHoiMa=${boCauHoiMaLink ? boCauHoiMaLink : ""
          }&ma=${maKhach ? maKhach : ""}`
        );
      }
    }
  };

  const initAnswer = (question) => {
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
          } catch (error) { }
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
            x.traLoi = JSON.stringify(y);
          } catch (error) { }
        }
      });
      updateData({ answer: answer });
    }
  };
  const onSearchAllQuestions = (donVi, khuVuc, doiTuong) => {
    updateData({ answer: [] });
    searchAllQuestions(donVi, khuVuc, doiTuong)
      .then((s) => {
        const question = s[khuVuc + "_" + doiTuong];
        initAnswer(question);
      })
      .catch(() => { });
  };
  useEffect(() => {
    const tenPhieu = settingProvider.getValue(
      props.dataSetting,
      "ten_phieu_khai_thac_thong_tin",
      ""
    );
    setState({ tenPhieu });
  }, [props.dataSetting]);
  return (
    <AdminPage
      className="mgr-form-types mgr-medical-declaration"
      icon={[<img src={require("@images/checkin/icLogPage.png")} />]}
      header={state.tenPhieu ? state.tenPhieu : translate("khaibaoytetunguyen")}
      subheader={translate("vuilongchonthongtinphiaduoi")}
    >
      <div className="row">
        <div className="col-lg-6 col-12  page-child">
          <div className="title-khai-bao">
            <ThongTin
              updateData={updateData}
              khuVucId={khuVucId}
              donViId={donViId}
              dataDonVi={dataDonVi}
              dataKhuVuc={dataKhuVuc}
              ngayCheckIn={ngayCheckIn}
              ref={refMedicalDeclaration}
              donViMaLink={donViMaLink}
              auth={auth}
            />
          </div>
        </div>
        {listDoiTuong && listDoiTuong.length ? (
          <div className="col-lg-6 col-12 page-child">
            <div className="title-khai-bao">
              <DoiTuongKhach
                updateData={updateData}
                listDoiTuong={listDoiTuong}
                donViId={donViId}
                khuVucId={khuVucId}
                doiTuongId={doiTuongId}
                history={history}
                searchAllQuestions={onSearchAllQuestions}
                doiTuongMa={doiTuongMa}
                listDepartment={listDepartment}
                thongTinDoiTuongLienHeTen={thongTinDoiTuongLienHeTen}
                thongTinDoiTuongLienHe={thongTinDoiTuongLienHe}
                setFieldsValue={setFieldsValue}
                answer={answer}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="row">
        <div className="button-submit medical-declaration">
          <Button
            className="button"
            onClick={() => gotoPage()}
            loading={isLoading}
          >
            {translate("tieptuc")}
          </Button>
        </div>
      </div>
    </AdminPage>
  );
}

export default connect(
  (state) => {
    return {
      auth: (state.auth && state.auth.auth) || {},
      listDoiTuong: state.ttHanhChinh.listDoiTuong || [],
      dataSetting: state.setting.data || [],
      donViId: state.ttHanhChinh.donViId,
      khuVucId: state.ttHanhChinh.khuVucId,
      doiTuongId: state.ttHanhChinh.doiTuongId,
      doiTuongMa: state.ttHanhChinh.doiTuongMa,
      khuVucMa: state.ttHanhChinh.khuVucMa,
      donViMa: state.ttHanhChinh.donViMa,
      listDepartment: state.ttHanhChinh.listDepartment || [],
      thongTinDoiTuongLienHeTen: state.ttHanhChinh.thongTinDoiTuongLienHeTen,
      thongTinDoiTuongLienHe: state.ttHanhChinh.thongTinDoiTuongLienHe,
      dataDonVi: state.report.dataDonVi || [],
      dataKhuVuc: state.report.dataKhuVuc || [],
      ngayCheckIn:
        state.ttHanhChinh.ngayCheckIn && moment(state.ttHanhChinh.ngayCheckIn),
      thongTienLienQuan: state.ttHanhChinh.thongTienLienQuan,
      answer: state.ttHanhChinh.answer || [],
    };
  },
  {
    updateData: actionTtHanhChinh.updateData,
    searchDoiTuong: actionReport.searchDoiTuong,
    searchDonVi: actionReport.searchDonVi,
    searchKhuVuc: actionReport.searchKhuVuc,
    onSearchSetting: actionSetting.onSearch,
    searchAllQuestions: actionPost.searchAllQuestions,
    getAllKhoa: actionTtHanhChinh.getAllKhoa,
    searchInfo: actionTtHanhChinh.searchInfo,
    historyCheckin: actionTtHanhChinh.historyCheckin,
  }
)(Form.create()(withTranslate(index)));
