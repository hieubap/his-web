import React from "react";
import { Button } from "antd";
import { withTranslate } from "react-redux-multilingual";

function index(props) {
  const { translate, history, yeuCauChupHinh, updateData, maKhach } = props;
  const gotoPage = () => {
    let link = "";
    if (maKhach) {
      if (yeuCauChupHinh == "true" || yeuCauChupHinh == "10") {
        link = "/chup-hinh";
      } else {
        link = "/bo-cau-hoi";
      }
    } else {
      link = "/so-dien-thoai";
    }
    updateData({
      id: "",
      idCheck: "",
      hoVaTen: "",
      soCanCuoc: "",
      ngaySinh: null,
      ngheNghiepId: "",
      nguoiBaoHo: "",
      gioiTinh: "1",
      soDienThoai: "",
      sdtNguoiBaoHo: "",
      quocTichId: 22,
      quanHuyenId: "",
      soNha: "",
      tinhThanhPhoId: "",
      quanHuyenId: "",
      xaPhuongId: "",
      anhDaiDien: "",
      ma: "",
      showPopupData: false,
      doiTuongId: "",
      thongTinDoiTuongLienHe: "",
      thongTinDoiTuongLienHeTen: "",
      dataHistory: [],
      dataQuestions: {},
    });
    let href = link + window.location.search;
    history.push(href);
  };
  return (
    <div className={`col-md-6 medical-declaration-2 button-submit ${props.className}`}>
      <div className="box-search">
        <Button className="search-qr action-search" onClick={() => gotoPage()}>
          {translate("quaylai")}
        </Button>
      </div>
    </div>
  );
}
export default withTranslate(index);
