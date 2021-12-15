import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Radio, DatePicker } from "antd";
import { withTranslate } from "react-redux-multilingual";
import ModalDepartment from "./ModalDepartment";
import "./style.scss";
import { MainDoiTuongKhach } from "./styledModal";
import snackbar from "@utils/snackbar-utils";
import SearchDoiTuong from "@data-access/post-provider";

const DoiTuongKhach = (props)=> {
  const refDepartment = useRef();
  const {
    translate,
    updateData,
    listDoiTuong,
    donViId,
    khuVucId,
    thongTinDoiTuongLienHeTen,
    ngayCheckIn,
    searchAllQuestions,
    doiTuongMa,
    listDepartment,
    phanLoai,
    getFieldDecorator,
    thongTinDoiTuongLienHe,
    setFieldsValue,
    doiTuongId,
    idCheck,
  } = props;
  const boCauHoiMaLink = window.location.search.getQueryStringHref(
    "boCauHoiMa"
  );
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    setState({ dataDepartment: listDepartment });
  }, []);
  useEffect(() => {
    setFieldsValue({
      phanLoai: phanLoai,
    });
  }, [phanLoai]);
  const showModalDepartment = () => {
    if (refDepartment.current) {
      refDepartment.current.show({ show: true });
    }
  };
  const onSearchDepartment = (e) => {
    let value = e.target.value;
    let data = listDepartment.filter((item) => {
      return (
        (item.ten || "").toLocaleLowerCase().unsignText().indexOf(value) !== -1
      );
    });
    setState({
      dataDepartment: data,
      value: value,
    });
  };
  const selectDepartment = (e) => {
    updateData({
      thongTinDoiTuongLienHe: e.ten,
      thongTinDoiTuongLienHeTen: e.ten,
    });
    refDepartment.current.show({ show: false });
  };
  useEffect(() => {
    searchAllQuestions(donViId, khuVucId, doiTuongId);
  }, [donViId, khuVucId, doiTuongId]);

  useEffect(() =>{
    if(boCauHoiMaLink)
    {
      SearchDoiTuong.search(null,null,boCauHoiMaLink)
      .then((s) => {
        const doiTuongBoCauHoi = (s.data[0].doiTuongIds);
        const DoiTuongfilter = doiTuongBoCauHoi.map((item)=>{
          for(var i=0; i<listDoiTuong.length; i++)
          {
            if (listDoiTuong[i].id==item) return listDoiTuong[i];
          }
        });
        updateData({listDoiTuong : DoiTuongfilter})
      });
    }
  },[]);
  return (
    <>
      <p>
        <span>{translate("who_are_you")} </span>
        <span style={{ color: "red", paddingLeft: 10 }}> *</span>
      </p>
      <MainDoiTuongKhach>
        <Form layout="vertical" hideRequiredMark>
          <div className="row">
            <Radio.Group
              disabled={idCheck && doiTuongId ? true : false}
              value={(doiTuongId || "").toString()}
              style={{ width: "100%" }}
            >
              {listDoiTuong && listDoiTuong.length
                ? listDoiTuong.map((option, index) => {
                  return (
                    <div
                      className="col-md-12"
                      key={index}
                      className="body-target"
                      onClick={() => {
                        if (idCheck && doiTuongId) {
                        } else {
                          if (doiTuongId != option.id) {
                            setState({ valueText: "" });
                            updateData({
                              thongTinDoiTuongLienHe: "",
                              thongTinDoiTuongLienHeTen: "",
                              doiTuongMa: option.ma,
                              doiTuongId: option.id,
                              listDoiTuong: [...listDoiTuong],
                              thongTienLienQuan: option.thongTienLienQuan,
                              checkButtonSubmit: false,
                            });
                          }
                          if (option.ma === "NB01" || option.ma === "NV01") {
                            let data = state.dataDepartment && state.dataDepartment.length
                              ? state.dataDepartment
                              : listDepartment;
                            if (data && data.length === 1) {
                              updateData({
                                thongTinDoiTuongLienHe: data[0].ten,
                                thongTinDoiTuongLienHeTen: data[0].ten,
                              });
                            } else if (data && data.length > 1) {
                              showModalDepartment();
                            } else {
                              snackbar.show("Đơn vị chưa có khoa. Vui lòng bổ sung thêm thông tin khoa!", "danger");
                            }
                          }
                        }
                      }}
                    >
                      <div className="option-who_are-you">
                        <Radio value={(option.id || "").toString()} />
                        <div className="name">{option.ten}</div>
                      </div>
                      <span className="info-target">
                        <div className="note">
                          {thongTinDoiTuongLienHeTen &&
                            option.ma == doiTuongMa &&
                            option.id == doiTuongId ? (
                            <span>{thongTinDoiTuongLienHeTen}</span>
                          ) : option.ma == doiTuongMa &&
                            option.id == doiTuongId ? (
                            <Input
                              placeholder={option.thongTienLienQuan}
                              onChange={(e) => {
                                updateData({
                                  thongTinDoiTuongLienHe: e.target.value,
                                  thongTienLienQuan: option.thongTienLienQuan,
                                });
                                setState({ valueText: e.target.value });
                              }}
                              disabled={idCheck && doiTuongId ? true : false}
                              className="input-info-target"
                              value={thongTinDoiTuongLienHe}
                            />
                          ) : (
                            <Input
                              className="input-info-target"
                              placeholder={option.thongTienLienQuan}
                              value={""}
                              disabled={idCheck && doiTuongId ? true : false}
                            />
                          )}
                        </div>
                      </span>
                    </div>
                  );
                })
                : null}
            </Radio.Group>
          </div>
          {window.location.pathname === "/check-in" ? (
            <>
              <div className="col">
                <Form.Item
                  name="ngayCheckIn"
                  label={
                    <>
                      <span>{translate("ngayden")}</span>
                      <span style={{ color: "red" }}> *</span>
                    </>
                  }
                >
                  {getFieldDecorator("ngayCheckIn", {
                    rules: [
                      {
                        required: true,
                        message: translate("vuilongchonngayden"),
                      },
                    ],
                    initialValue: ngayCheckIn,
                  })(
                    <DatePicker
                      onChange={(e) => updateData({ ngayCheckIn: e })}
                      value={ngayCheckIn}
                      disabled={true}
                      disabledDate={(d) => {
                        let date = new Date();
                        date.setDate(date.getDate() + 7);
                        return d._d >= date || d._d < new Date();
                      }}
                      format="DD/MM/YYYY HH:mm"
                      style={{ width: "100%" }}
                      placeholder={translate("ngayden")}
                      getPopupContainer={(trigger) => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </div>
              <div className="col">
                <Form.Item
                  name="phanLoai"
                  label={
                    <>
                      <span>{"Phân loại khách"}</span>
                      <span style={{ color: "red" }}> *</span>
                    </>
                  }
                >
                  {getFieldDecorator("phanLoai", {
                    rules: [
                      {
                        required: true,
                        message: translate("vuilongchonphanloaikhach"),
                      },
                    ],
                    initialValue: phanLoai,
                  })(
                    <Radio.Group disabled={true}>
                      {/* <Radio value="0" onClick={e => updateData({ phanLoai: e.target.value })}>{translate("binhthuong")}</Radio> */}
                      <Radio value="0">{translate("binhthuong")}</Radio>
                      <Radio value="10">{translate("batthuong")}</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
            </>
          ) : null}
        </Form>
      </MainDoiTuongKhach>
      <ModalDepartment
        ref={refDepartment}
        onChange={onSearchDepartment}
        onClick={selectDepartment}
        dataDepartment={
          state.dataDepartment && state.dataDepartment.length
            ? state.dataDepartment
            : listDepartment
        }
        value={state.value}
      />
    </>
  );
}
export default withTranslate(DoiTuongKhach);
