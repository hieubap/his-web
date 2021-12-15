import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { DatePicker } from "antd";
import { withTranslate } from "react-redux-multilingual";
import { SelectBox } from "@admin/components/admin/Select";
import "./style.scss";
function index(props, ref) {
  const {
    translate,
    updateData,
    khuVucId,
    donViId,
    dataDonVi,
    dataKhuVuc,
    ngayCheckIn,
    donViMaLink,
  } = props;
  const refCallback = useRef();
  const checkLinkIsofhcare = window.location.pathname === "/khai-bao-y-te" ? true : false;
  const [state, _setState] = useState({
    sending: true,
    checkValidate: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    submit: (data = {}, callback) => {
      setState({
        checkValidate: data.checkValidate,
      });
      refCallback.current = callback;
    },
  }));
  return (
    <>
      <p>{translate("thongtinkhachhang")}</p>
      <div className="row address">
        <div className="col">
          <div className="address-title">
            {translate("coquanden")} <span style={{ color: "red" }}> *</span>
          </div>
          <SelectBox
            isDisabled={donViMaLink || checkLinkIsofhcare ? true : false}
            listOption={[
              { id: "", ten: translate("choncoquanden") },
              ...dataDonVi,
            ]}
            placeholder={translate("choncoquanden")}
            selected={donViId}
            getIdObject={(item) => {
              return item.id;
            }}
            getLabelObject={(item) => {
              return item.ten;
            }}
            onChangeSelect={(lists, ids) => {
              updateData({
                donViId: ids,
                donViMa: lists.ma,
                nhaCungCapTinNhan: lists.nhaCungCapTinNhan,
                khuVucId: "",
                dataKhuVuc: [],
                listDoiTuong: [],
                doiTuongMa: "",
              });
            }}
            id="donViId"
            name="donViId"
            validates={
              state.checkValidate && !donViId
                ? translate("vuilongchoncoquanden")
                : null
            }
          />
        </div>
      </div>
      <div className="row address">
        <div className="col">
          <div className="address-title">
            {translate("khuvucden")} <span style={{ color: "red" }}> *</span>
          </div>
          <SelectBox
            listOption={[
              {
                id: "",
                ten: translate("chonkhuvucden"),
                english: translate("chonkhuvucden"),
              },
              ...dataKhuVuc,
            ]}
            placeholder={translate("chonkhuvucden")}
            selected={khuVucId}
            getIdObject={(item) => {
              return item.id;
            }}
            getLabelObject={(item) => {
              return item.ten;
            }}
            onChangeSelect={(lists, ids) => {
              updateData({
                khuVucId: ids,
                khuVucMa: lists.ma,
              });
            }}
            id="khuVucId"
            name="khuVucId"
            validates={
              state.checkValidate && !khuVucId
                ? "Vui lòng chọn khu vực đến!"
                : null
            }
          />
        </div>
      </div>
      <div className="row address">
        <div className="col">
          <div className="address-title">
            {translate("ngayden")} <span style={{ color: "red" }}> *</span>
          </div>
          <DatePicker
            onChange={(e) => {
              updateData({
                ngayCheckIn: e,
              });
            }}
            disabled={checkLinkIsofhcare}
            disabledDate={(d) => {
              let date = new Date();
              date.setDate(date.getDate() + 7);
              let minDate = new Date();
              minDate.setDate(minDate.getDate() - 1);
              return d._d >= date || d._d < minDate;
            }}
            format="DD/MM/YYYY HH:mm"
            value={ngayCheckIn}
            style={{ width: "100%" }}
            showTime={true}
            placeholder={translate("ngayden")}
            getPopupContainer={(trigger) => trigger.parentNode}
          />
          {state.checkValidate && !ngayCheckIn ? (
            <div className="error">{translate("vuilongchonngayden")}</div>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default withTranslate(forwardRef(index));
