import React, { useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import actionAddress from "@actions/address";
import "../ttHanhChinh/style.scss";
import { SelectBox } from "@admin/components/admin/Select";
import { withTranslate } from "react-redux-multilingual";
function index(props) {
  const {
    translate,
    getFieldDecorator,
    updateData,
    tinhThanhPhoId,
    updateDataAddress,
    onSearchQuanHuyen,
    dataTinhTp,
    soNha,
    xaPhuongId,
    dataXaPhuong,
    dataQuanHuyen,
    quanHuyenId,
    onSearchXaPhuong,
    checkValidate,
    id,
    qr,
    hoVaTen,
    toggleDownload,
    donViMaLink,
    hashTag,
  } = props;
  const refCity = useRef();
  const refDistrict = useRef();
  const refWard = useRef();
  const refHome = useRef();
  useEffect(() => {
    if (hashTag === "refDiaChi") {
      if (!tinhThanhPhoId) {
        refCity.current.scrollIntoView({ block: "center" });
      } else if (!quanHuyenId) {
        refDistrict.current.scrollIntoView({ block: "center" });
      } else if (!xaPhuongId) {
        refWard.current.scrollIntoView({ block: "center" });
      } else if (!soNha) {
        refHome.current.scrollIntoView({ block: "center" });
      }
    }
  }, [hashTag]);
  return (
    <>
      <p>{translate("diachivn")}</p>
      <Form layout="vertical" hideRequiredMark>
        <div className="row address">
          <div className="col" style={{ marginBottom: 20 }} ref={refCity}>
            <div className="address-title">
              {translate("tp")} <span style={{ color: "red" }}> *</span>
            </div>
            <SelectBox
              isDisabled={id ? true : false}
              listOption={[{ id: "", ten: translate("chontp") }, ...dataTinhTp]}
              placeholder={translate("chontp")}
              selected={tinhThanhPhoId}
              getIdObject={(item) => {
                return item.id;
              }}
              getLabelObject={(item) => {
                return item.ten;
              }}
              onChangeSelect={(lists, ids) => {
                updateDataAddress({
                  dataQuanHuyen: [],
                  dataXaPhuong: [],
                });
                updateData({
                  tinhThanhPhoId: ids,
                  quanHuyenId: "",
                  xaPhuongId: "",
                  checkButtonSubmit: false,
                });
                onSearchQuanHuyen(ids);
              }}
              id="tinhThanhPhoId"
              name="tinhThanhPhoId"
              validates={
                checkValidate && !tinhThanhPhoId
                  ? translate("vuilongchonTP")
                  : null
              }
            />
          </div>
        </div>
        <div className="row address" ref={refDistrict}>
          <div className="col" style={{ marginBottom: 20 }}>
            <div className="address-title">
              {translate("huyen")} <span style={{ color: "red" }}> *</span>
            </div>
            <SelectBox
              isDisabled={id ? true : false}
              listOption={[
                { id: "", ten: translate("chonhuyen") },
                ...dataQuanHuyen,
              ]}
              placeholder={translate("chonhuyen")}
              selected={quanHuyenId}
              getIdObject={(item) => {
                return item.id;
              }}
              getLabelObject={(item) => {
                return item.ten;
              }}
              onChangeSelect={(lists, ids) => {
                updateDataAddress({
                  dataXaPhuong: [],
                });
                updateData({
                  quanHuyenId: ids,
                  xaPhuongId: "",
                  checkButtonSubmit: false,
                });
                onSearchXaPhuong(ids);
              }}
              id="quanHuyenId"
              name="quanHuyenId"
              validates={
                checkValidate && !quanHuyenId
                  ? translate("vuilongchonhuyen")
                  : null
              }
            />
          </div>
        </div>
        <div className="row address" ref={refWard}>
          <div className="col" style={{ marginBottom: 20 }}>
            <div className="address-title">
              {translate("xa")} <span style={{ color: "red" }}> *</span>
            </div>
            <SelectBox
              isDisabled={id ? true : false}
              listOption={[
                { id: "", ten: translate("chonxa") },
                ...dataXaPhuong,
              ]}
              placeholder={translate("chonxa")}
              selected={xaPhuongId}
              getIdObject={(item) => {
                return item.id;
              }}
              getLabelObject={(item) => {
                return item.ten;
              }}
              onChangeSelect={(lists, ids) => {
                updateData({
                  xaPhuongId: ids,
                  checkButtonSubmit: false,
                });
              }}
              id="xaPhuongId"
              name="xaPhuongId"
              validates={
                checkValidate && !xaPhuongId ? translate("vuilongchonxa") : null
              }
            />
          </div>
        </div>
        <div className="row" ref={refHome}>
          <div className="col" style={{ marginBottom: 20 }}>
            <Form.Item
              label={
                <>
                  <span>{translate("sonha")}</span>
                  <span style={{ color: "red" }}> *</span>
                </>
              }
            >
              {getFieldDecorator("soNha", {
                rules: [
                  {
                    required: true,
                    message: translate("vuilongnhapsonha"),
                  },
                ],
                initialValue: soNha,
              })(
                <Input
                  id="soNha"
                  disabled={id ? true : false}
                  autoComplete="off"
                  onChange={(e) =>
                    updateData({
                      soNha: e.target.value,
                      checkButtonSubmit: false,
                    })
                  }
                  placeholder={translate("nhapsonha")}
                />
              )}
            </Form.Item>
          </div>
        </div>
      </Form>
      {qr ? (
        <div className="qr-checkin">
          <div className="title-qr">{translate("thongtinqr")}</div>
          <img className="qr" src={"data:image/jpeg;base64," + qr} />
          {/* <div className="button-submit button-hide">
            <Button
              className="button"
              onClick={() => {
                toggleDownload(qr, hoVaTen);
              }}
            >
              {translate("luuqr")}
            </Button>
          </div> */}
        </div>
      ) : null}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    id: state.ttHanhChinh.id,
    soNha: state.ttHanhChinh.soNha || "",
    tinhThanhPhoId: state.ttHanhChinh.tinhThanhPhoId || "",
    quanHuyenId: state.ttHanhChinh.quanHuyenId || "",
    xaPhuongId: state.ttHanhChinh.xaPhuongId || "",
    dataTinhTp: state.address.dataTinhTp || [],
    dataQuanHuyen: state.address.dataQuanHuyen || [],
    dataXaPhuong: state.address.dataXaPhuong || [],
    ngayCheckIn: state.ttHanhChinh.ngayCheckIn,
    checkValidate: state.ttHanhChinh.checkValidate,
    qr: state.ttHanhChinh.qr,
    hoVaTen: state.ttHanhChinh.hoVaTen,
    hashTag: state.ttHanhChinh.hashTag,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (event) => dispatch(actionTtHanhChinh.updateData(event)),
    updateDataAddress: (event) => dispatch(actionAddress.updateData(event)),
  };
};
export default withTranslate(
  connect(mapStateToProps, mapDispatchToProps)(index)
);
