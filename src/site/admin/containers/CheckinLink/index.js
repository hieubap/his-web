import React, { useEffect } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import actionReport from "@actions/report";
import { AdminPage } from "@admin/components/admin";
import { withTranslate } from "react-redux-multilingual";
// import "../report/style.scss";
// import "./style.scss";
import SelectBox from "./selectFillter";
import actionPost from "@actions/post";
import QrCode from "./qrCode";
import CreateLink from "./createLink";
import Authorization from "@admin/components/auth"
import { Main } from "./styled"
function index(props) {
  const {
    translate,
    auth,
    dataKhuVuc,
    dataDonVi,
    updateData,
    searchKhuVuc,
    searchDonVi,
    searchDoiTuong,
    dataDoiTuong,
    doiTuongId,
    donViIdLink,
    khuVucId,
    linkCheckin,
    createSuccess,
    searchBoCauHoi,
    dataBoCauHoi,
    boCauHoiId,
    checkCreateLink,
    boCauHoiMa,
    donViMa,
    khuVucMa,
    doiTuongMa,
  } = props;
  const rolesLogin = auth && (auth.authorities || []).find((option) => option === "ROLE_admin_ivisitor");
  // const getDonViMa = (donViIdLink) => {
  //   let code = (dataDonVi || []).filter((item) => item.id === donViIdLink)
  //   if (code && code.length) {
  //     return code[0].ma
  //   }
  //   return
  // }
  useEffect(() => {
    searchDonVi();
    updateData({
      khuVucId: undefined,
      doiTuongId: undefined,
      donViIdLink: auth && auth.donViId,
      // donViMa: donViIdLink !== auth.donViId ? getDonViMa(donViIdLink) : auth && auth.donViMa,
      donViMa: auth && auth.donViMa,
      linkCheckin: "",
      dataKhuVuc: [],
      dataDoiTuong: [],
      dataBoCauHoi: [],
      createSuccess: false,
      boCauHoiId: undefined,
      checkCreateLink: false,
      boCauHoiMa: "",
      khuVucMa: "",
      doiTuongMa: "",
    });
  }, []);
  useEffect(() => {
    if (donViIdLink) {
      searchKhuVuc(donViIdLink);
      searchDoiTuong(donViIdLink);
    }
  }, [donViIdLink]);
  useEffect(() => {
    if (donViIdLink) {
      searchBoCauHoi(donViIdLink, doiTuongId, khuVucId);
    }
  }, [donViIdLink, doiTuongId, khuVucId]);
  const createLink = () => {
    if (donViIdLink) {
      updateData({
        checkCreateLink: false,
        createSuccess: true,
        linkCheckin: `${global.origin}/bo-cau-hoi?donViMa=${donViMa}${khuVucMa ? "&khuVucMa=" + khuVucMa : ""}${doiTuongMa ? "&doiTuongMa=" + doiTuongMa : ""}${boCauHoiMa ? "&boCauHoiMa=" + boCauHoiMa : ""}`,
      });
    } else {
      updateData({
        checkCreateLink: true,
      });
      return;
    }
  };
  const authorities = ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"]
  return (
    <Authorization arrRole={authorities} >
      <Main>
        <AdminPage
          className="mgr-createlink"
          icon={[<img src={require("@images/checkin-link/Logo.png")} />]}
          header={translate("taolinkbocauhoi")}
          subheader={translate("taolinkbocauhoi")}
        >
          <div className="row">
            <div className="col-md-4">
              <div className="search-createlink">
                <div className="title">
                  <div className="name">{translate("chonthongtin")}</div>
                </div>
                <div className="search">
                  <div className="search-select">
                    <div className="item-title">
                      {translate("donvi")}
                      <span className="red-text">*</span>
                    </div>
                    <SelectBox
                      value={donViIdLink}
                      disabled={
                        rolesLogin !== "ROLE_admin_ivisitor" ? true : false
                      }
                      onChange={(e, arrCurrent) => {
                        updateData({
                          donViIdLink: e,
                          donViMa: arrCurrent.ref,
                          khuVucId: undefined,
                          doiTuongId: undefined,
                          boCauHoiId: undefined,
                          khuVucMa: "",
                          doiTuongMa: "",
                          boCauHoiMa: "",
                        });
                      }}
                      textTranslate={translate("chondonvi")}
                      data={dataDonVi}
                      validate={checkCreateLink && !donViIdLink}
                      error={translate("vuilongchondonvi")}
                      require
                    />
                    <div className="item-title">{translate("khuvuc")}</div>
                    <SelectBox
                      value={khuVucId}
                      onChange={(e, arrCurrent) => {
                        updateData({
                          khuVucId: e,
                          khuVucMa: arrCurrent.ref,
                          boCauHoiId: undefined,
                          boCauHoiMa: "",
                        });
                      }}
                      textTranslate={translate("chonkhuvuc")}
                      data={dataKhuVuc}
                    />
                    <div className="item-title">{translate("doituong")}</div>
                    <SelectBox
                      multiple
                      value={doiTuongId}
                      onChange={(e, arrCurrent) => {
                        updateData({
                          doiTuongId: e,
                          doiTuongMa: arrCurrent.map(item => item.ref),
                          boCauHoiId: undefined,
                          boCauHoiMa: "",
                        });
                      }}
                      textTranslate={translate("chondoituong")}
                      data={dataDoiTuong}
                    />
                    <div className="item-title">{translate("bocauhoi")}</div>
                    <SelectBox
                      value={boCauHoiId}
                      onChange={(e, arrCurrent) => {
                        updateData({
                          boCauHoiId: e,
                          boCauHoiMa: arrCurrent.ref,
                        });
                      }}
                      textTranslate={translate("chonbocauhoi")}
                      data={dataBoCauHoi}
                    />
                  </div>
                </div>
                <Button onClick={() => createLink()} className="btn-action">
                  <img src={require("@images/checkin-link/create-link.png")} alt="" />
                  {translate("taolinkcheckin")}
                </Button>
              </div>
            </div>
            {createSuccess ? (
              <>
                <CreateLink translate={translate} data={linkCheckin} />
                <QrCode translate={translate} data={linkCheckin} />
              </>
            ) : null}
          </div>
        </AdminPage>

      </Main>

    </Authorization>
  );
}
export default connect(
  (state) => {
    return {
      auth: state.auth && state.auth.auth,
      dataKhuVuc: state.report.dataKhuVuc || [],
      dataDonVi: state.report.dataDonVi || [],
      dataDoiTuong: state.report.dataDoiTuong || [],
      doiTuongId: state.post.doiTuongId,
      donViIdLink: state.post.donViIdLink,
      khuVucId: state.post.khuVucId,
      linkCheckin: state.post.linkCheckin,
      createSuccess: state.post.createSuccess,
      dataBoCauHoi: state.report.dataBoCauHoi || [],
      boCauHoiId: state.post.boCauHoiId,
      checkCreateLink: state.post.checkCreateLink,
      boCauHoiMa: state.post.boCauHoiMa,
      donViMa: state.post.donViMa,
      khuVucMa: state.post.khuVucMa,
      doiTuongMa: state.post.doiTuongMa,
    };
  },
  {
    updateData: actionPost.updateData,
    gotoPage: actionPost.gotoPage,
    searchKhuVuc: actionReport.searchKhuVuc,
    searchDonVi: actionReport.searchDonVi,
    searchDoiTuong: actionReport.searchDoiTuong,
    searchBoCauHoi: actionReport.searchBoCauHoi,
  }
)(withTranslate(index));
