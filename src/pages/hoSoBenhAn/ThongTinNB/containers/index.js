import { Col, DatePicker, Input, Popover, Row, TimePicker } from "antd";
import AddressFull from "components/AddressFull";
import Camera from "components/Camera";
import InputBlur from "components/InputBlur";
import Select from "components/Select";
import { isNil } from "lodash";
import moment from "moment";
import React, { memo, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import fileUtils from "utils/file-utils";
import { Main } from "./styled";

const Index = (props) => {
  const {
    hangThe,
    soDienThoai,
    ngaySinh,
    tuoi,
    gioiTinh,
    quocTichId,
    nbDiaChi,
    ngheNghiepId,
    soBaoHiemXaHoi,
    daXacThucThongTin,
    tenNb,
    nbGiayToTuyThan,
    email,
    danTocId,
    nbTheBaoHiem,
    loaiGiayTo,
    soNha,
    diaChiNuocNgoai,
    thangTuoi,
    maSo,
    anhMatSau,
    anhMatTruoc,
    thongTinBenhNhan,

    isDetail,
    updateData,
    getUtils,
    listAllNgheNghiep,
    listgioiTinh,
    listAllQuocGia,
    listAllDanToc,
    listloaiGiayTo,
  } = props;

  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const { diaChi } = state;

  const refanhMatTruoc = useRef();
  const refanhMatSau = useRef();
  const refCamera = useRef();

  useEffect(() => {
    if (!!nbDiaChi)
      setState({
        diaChi: nbDiaChi?.diaChiText
          ? nbDiaChi?.diaChiText
          : nbDiaChi?.tinhThanhPho
          ? `${nbDiaChi?.xaPhuong?.ten || ""}, ${
              nbDiaChi?.quanHuyen?.ten || ""
            }, ${nbDiaChi?.tinhThanhPho?.ten || ""}`
          : "",
      });
  }, [nbDiaChi]);

  useEffect(() => {
    props.getListAllQuocGia();
    props.getListAllNgheNghiep();
    getUtils({ name: "loaiGiayTo" });
  }, []);

  const checkGender = (value) => {
    let dataTen = value.toUpperCase();
    let genderVan = dataTen.search("VĂN");
    let genderThi = dataTen.search("THỊ");
    if (genderVan >= 0 && genderThi < 0) {
      updateData({ gioiTinh: 1 });
    } else if (genderThi >= 0) {
      updateData({ gioiTinh: 2 });
    } else {
      updateData({ gioiTinh: "" });
    }
  };

  const selectAddress = async (data) => {
    let address = {};
    if (data?.tinhThanhPho && data?.quanHuyen) {
      address = {
        ...nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.quanHuyen?.id,
        xaPhuongId: data?.id,
        diaChiText: data?.displayText,
      };
    } else if (data?.tinhThanhPho) {
      address = {
        ...nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.id,
        diaChiText: data?.displayText,
      };
    } else {
      address = {
        ...nbDiaChi,
        tinhThanhPhoId: data?.id,
        diaChiText: data?.displayText,
      };
    }
    updateData({
      thongTinBenhNhan: { ...thongTinBenhNhan, nbDiaChi: address },
    });
  };

  useEffect(() => {
    props.getListAllDanToc();
  }, []);
  const showModalCamera = (type) => {
    if (!isDetail) {
      if (type === "anhDaiDien") {
        if (refCamera.current)
          refCamera.current.show({ type }, (data) => {
            if (data)
              updateData({
                thongTinBenhNhan: {
                  ...thongTinBenhNhan,
                  anhDaiDien: data,
                },
              });
          });
      } else if (type === "anhMatTruoc") {
        if (refanhMatTruoc.current)
          refanhMatTruoc.current.show({ type }, (data = []) => {
            updateData({
              thongTinBenhNhan: {
                ...thongTinBenhNhan,
                nbGiayToTuyThan: {
                  ...nbGiayToTuyThan,
                  anhMatTruoc: data[0],
                },
              },
            });
          });
      } else {
        if (refanhMatSau.current)
          refanhMatSau.current.show({ type }, (data = []) => {
            updateData({
              thongTinBenhNhan: {
                ...thongTinBenhNhan,
                nbGiayToTuyThan: {
                  ...nbGiayToTuyThan,
                  anhMatSau: data[0],
                },
              },
            });
          });
      }
    }
  };

  return (
    <Main md={24}>
      <div className="frames">
        <div className="row-name top-content">
          <div
            className={isDetail ? "avatar img-no-drop" : "avatar"}
            onClick={() => showModalCamera("anhDaiDien")}
          >
            <div className="wrapperCamera">
              {hangThe && hangThe?.icon && (
                <div className="hangTheIcon">
                  <Popover
                    content={`${hangThe?.ten}`}
                    placement="right"
                    trigger="hover"
                  >
                    <img
                      src={`${fileUtils.absoluteFileUrl(hangThe?.icon)}`}
                      alt=""
                    />
                  </Popover>
                </div>
              )}
              <Camera
                ref={refCamera}
                type={"anhDaiDien"}
                title={"Upload avatar"}
                className="image"
                value={thongTinBenhNhan.anhDaiDien}
                image={require("assets/images/welcome/avatar.png")}
                icon={require("assets/images/welcome/avatarIcon.png")}
              />
            </div>
          </div>
          <div>
            <div className="ma-nb">Mã NB: {thongTinBenhNhan.maNb}</div>
            {/* <div style={{ marginTop: "5px" }}>Số lượt giới thiệu: 0</div> */}
          </div>
        </div>
        <Row className="row-name">
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label className={!tenNb ? `label label-error` : "label"}>
                Họ và tên
              </label>
              <InputBlur
                placeholder="Nhập họ và tên"
                value={tenNb}
                readOnly={isDetail}
                style={{ textTransform: "uppercase" }}
                onChange={(e) => {
                  checkGender(e);
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      tenNb: e,
                    },
                  });
                }}
              />
              {!tenNb ? (
                <div className="error">Vui lòng nhập tên người bệnh!</div>
              ) : null}
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label className="label"> Số điện thoại</label>
              <InputBlur
                placeholder="Nhập số điện thoại"
                value={soDienThoai}
                readOnly={isDetail}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      soDienThoai: e,
                    },
                  })
                }
              />
              {soDienThoai &&
              !soDienThoai.replaceAll(" ", "").isPhoneNumber() ? (
                <div className="error">Số điện thoại sai định dạng!</div>
              ) : null}
            </div>
          </Col>
          <Col md={7} xl={7} xxl={7} style={{ paddingRight: 0 }}>
            <div className="item-date">
              <label
                className={
                  !ngaySinh
                    ? `label item-title label-error`
                    : "label item-title"
                }
              >
                Ngày tháng năm sinh
              </label>
              <DatePicker
                className="item-born"
                value={moment(ngaySinh)}
                format={"DD/MM/YYYY"}
                placeholder={"Nhập ngày tháng năm sinh"}
                disabled={isDetail}
                allowClear={false}
                onChange={(e) => {
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      ngaySinh: moment(
                        e.format("DD/MM/YYYY") +
                          moment(ngaySinh).format(" HH:mm:ss"),
                        "DD/MM/YYYY HH:mm:ss"
                      ),
                      tuoi: moment().diff(e, "years"),
                      thangTuoi: moment().diff(e, "months"),
                    },
                  });
                }}
              />
            </div>
          </Col>
          <Col md={5} xl={5} xxl={5}>
            <div className="item-date">
              <label className="label"> Giờ sinh</label>
              <TimePicker
                placeholder="00:00:00"
                className="item-time"
                value={moment(ngaySinh)}
                disabled={isDetail}
                format="HH:mm:ss"
                allowClear={false}
                onSelect={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      ngaySinh: moment(
                        moment(ngaySinh).format("DD/MM/YYYY") +
                          e.format(" HH:mm:ss"),
                        "DD/MM/YYYY HH:mm:ss"
                      ),
                    },
                  })
                }
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-input">
              <label className="label"> Tuổi</label>
              <Input
                value={
                  !isNil(thangTuoi) && thangTuoi <= 36
                    ? `${thangTuoi} tháng`
                    : tuoi
                }
                disabled
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className={!gioiTinh ? `label label-error` : "label"}>
                Giới tính
              </label>
              <Select
                value={gioiTinh}
                className="item-male"
                placeholder={"Chọn giới tính"}
                data={listgioiTinh}
                disabled={isDetail}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      gioiTinh: e,
                    },
                  })
                }
              />
              {!gioiTinh ? (
                <div className="error">Vui lòng chọn giới tính!</div>
              ) : null}
            </div>
          </Col>

          <Col md={8} xl={8} xxl={8} style={{ paddingRight: 0 }}>
            <div className="item-input" style={{ marginBottom: 0 }}>
              <label className="label">Số nhà/ Thôn/ Xóm</label>
              <InputBlur
                placeholder="SN/ Thôn/ Xóm"
                value={soNha}
                readOnly={isDetail}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      nbDiaChi: { ...nbDiaChi, soNha: e },
                    },
                  })
                }
              />
            </div>
            <span
              style={{
                fontStyle: "italic",
                opacity: 0.8,
                fontSize: 12,
                lineHeight: "15px",
              }}
            >
              VD: Số 8, Tổ 28
            </span>
          </Col>
          <Col md={16} xl={16} xxl={16}>
            <div className="item-input" style={{ marginBottom: 0 }}>
              <label className={!diaChi ? `label label-error` : "label"}>
                Phường/Xã, Quận/Huyện, Tỉnh/TP
              </label>
              <AddressFull
                styleInput={{ width: "100%" }}
                placeholder="Phường/Xã, Quận/Huyện, Tỉnh/Thành Phố"
                value={diaChi}
                onChange={(e) => setState({ diaChi: e })}
                selectAddress={selectAddress}
                readOnly={isDetail}
              />
            </div>
            <div
              style={{
                fontStyle: "italic",
                opacity: 0.8,
                fontSize: 12,
                lineHeight: "15px",
              }}
            >
              VD: Khương Mai, Thanh Xuân, Hà Nội
            </div>
            {!diaChi ? (
              <div className="error">
                Vui lòng nhập Phường/Xã, Quận/Huyện, Tỉnh/Thành Phố!
              </div>
            ) : null}
          </Col>

          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label className="label">Số bảo hiểm</label>
              <InputBlur
                readOnly={isDetail}
                placeholder="Nhập số bảo hiểm"
                value={nbTheBaoHiem.maThe}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      nbTheBaoHiem: {
                        ...nbTheBaoHiem,
                        maThe: e,
                      },
                    },
                  })
                }
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item">
              <div className="item-select">
                <label className={!quocTichId ? `label label-error` : "label"}>
                  Quốc tịch
                </label>
                <Select
                  value={quocTichId}
                  className="select"
                  placeholder={"Chọn quốc tịch"}
                  data={listAllQuocGia}
                  disabled={isDetail}
                  onChange={(e) =>
                    updateData({
                      thongTinBenhNhan: {
                        ...thongTinBenhNhan,
                        quocTichId: e,
                      },
                    })
                  }
                />
                {!quocTichId ? (
                  <div className="error">Vui lòng chọn quốc tịch!</div>
                ) : null}
              </div>
            </div>
          </Col>
          {props.dataMacDinh?.quocTich?.id !== quocTichId && (
            <Col md={24} xl={24} xxl={24} style={{ paddingRight: 0 }}>
              <div className="item-input">
                <label className="label">Địa chỉ tại nước ngoài</label>
                <InputBlur
                  readOnly={isDetail}
                  placeholder="Nhập địa chỉ ở nước ngoài"
                  value={diaChiNuocNgoai}
                  onChange={(e) =>
                    updateData({
                      thongTinBenhNhan: {
                        ...thongTinBenhNhan,
                        nbDiaChi: {
                          ...nbDiaChi,
                          diaChiNuocNgoai: e,
                        },
                      },
                    })
                  }
                />
              </div>
            </Col>
          )}

          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label className="label">Nghề nghiệp</label>
              <Select
                style={{ width: "100%" }}
                value={ngheNghiepId}
                className="select"
                placeholder={"Chọn nghề nghiệp"}
                data={listAllNgheNghiep}
                disabled={isDetail}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      ngheNghiepId: e,
                    },
                  })
                }
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label className="label">Loại giấy tờ tùy thân</label>
              <Select
                style={{ width: "100%" }}
                value={loaiGiayTo}
                className="select"
                placeholder={"Chọn loại giấy tờ tùy thân"}
                data={listloaiGiayTo}
                disabled={isDetail}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      nbGiayToTuyThan: {
                        ...nbGiayToTuyThan,
                        loaiGiayTo: e,
                      },
                    },
                  })
                }
              />
            </div>
          </Col>

          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label className="label">Mã số bảo hiểm xã hội</label>
              <InputBlur
                readOnly={isDetail}
                placeholder="Nhập mã số BHXH"
                value={soBaoHiemXaHoi || ""}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      soBaoHiemXaHoi: e,
                    },
                  })
                }
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label className="label">Mã số giấy tờ tùy thân</label>
              <InputBlur
                readOnly={isDetail}
                className="input"
                placeholder="Nhập mã số giấy tờ tùy thân"
                value={maSo || ""}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      nbGiayToTuyThan: { ...nbGiayToTuyThan, maSo: e },
                    },
                  })
                }
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label className="label">Email</label>
              <InputBlur
                readOnly={isDetail}
                className="input"
                placeholder="Nhập email"
                value={email}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      email: e,
                    },
                  })
                }
              />
              <div className="error">
                {email && !email?.isEmail()
                  ? "Vui lòng nhập đúng định dạng địa chỉ email!"
                  : null}
              </div>
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label className="label">Dân tộc</label>
              <Select
                style={{ width: "100%" }}
                value={danTocId}
                className="select"
                placeholder={"Chọn dân tộc"}
                data={listAllDanToc}
                disabled={isDetail}
                onChange={(e) =>
                  updateData({
                    thongTinBenhNhan: {
                      ...thongTinBenhNhan,
                      danTocId: e,
                    },
                  })
                }
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div
              className={isDetail ? "optimize img-no-drop" : "optimize"}
              onClick={() => showModalCamera("anhMatTruoc")}
            >
              <Camera
                ref={refanhMatTruoc}
                type={"anhMatTruoc"}
                title={"Mặt trước"}
                value={anhMatTruoc}
                image={require("assets/images/welcome/Mattruoc.png")}
                icon={require("assets/images/welcome/iconAccept.png")}
              />
              <div className="text">
                CMND/Căn cước <br />
                Mặt trước
              </div>
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div
              className={isDetail ? "optimize img-no-drop" : "optimize"}
              onClick={() => showModalCamera("anhMatSau")}
            >
              <Camera
                ref={refanhMatSau}
                type={"anhMatSau"}
                title={"Mặt sau"}
                value={anhMatSau}
                image={require("assets/images/welcome/Matsau.png")}
                icon={require("assets/images/welcome/iconAccept.png")}
              />
              <div className="text">
                CMND/Căn cước <br />
                Mặt sau
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const { thongTinBenhNhan = {} } = state.nbDotDieuTri;
  return {
    thongTinBenhNhan,
    tenNb: thongTinBenhNhan.tenNb,
    ngaySinh: thongTinBenhNhan.ngaySinh || "",
    tuoi: thongTinBenhNhan.tuoi,
    thangTuoi: thongTinBenhNhan.thangTuoi,
    gioiTinh: thongTinBenhNhan.gioiTinh,
    soDienThoai: thongTinBenhNhan.soDienThoai,
    soBaoHiemXaHoi: thongTinBenhNhan.soBaoHiemXaHoi,
    ngheNghiepId: thongTinBenhNhan.ngheNghiepId,
    daXacThucThongTin: thongTinBenhNhan.daXacThucThongTin || false,
    quocTichId: thongTinBenhNhan.quocTichId,
    nbTheBaoHiem: thongTinBenhNhan.nbTheBaoHiem || {},
    nbDiaChi: thongTinBenhNhan.nbDiaChi,
    dataMacDinh: thongTinBenhNhan.dataMacDinh || {},
    nbGiayToTuyThan: thongTinBenhNhan.nbGiayToTuyThan || {},
    danTocId: thongTinBenhNhan.danTocId,
    email: thongTinBenhNhan.email,
    hangThe: thongTinBenhNhan.hangThe || {},
    hangTheId: thongTinBenhNhan.hangTheId,
    loaiGiayTo: thongTinBenhNhan.nbGiayToTuyThan?.loaiGiayTo,
    soNha: thongTinBenhNhan.nbDiaChi?.soNha,
    diaChiNuocNgoai: thongTinBenhNhan.nbDiaChi?.diaChiNuocNgoai,
    maSo: thongTinBenhNhan.nbGiayToTuyThan?.maSo,
    anhMatSau: thongTinBenhNhan.nbGiayToTuyThan?.anhMatSau,
    anhMatTruoc: thongTinBenhNhan.nbGiayToTuyThan?.anhMatTruoc,

    listAllNgheNghiep: state.ngheNghiep.listAllNgheNghiep || [],
    listAllDanToc: state.danToc.listAllDanToc || [],
    listloaiGiayTo: state.utils.listloaiGiayTo || [],
    listgioiTinh: state.utils.listgioiTinh || [],
    listAllQuocGia: state.ttHanhChinh.listAllQuocGia || [],
  };
};
export default connect(
  mapStateToProps,
  ({
    danToc: { getListAllDanToc },
    ttHanhChinh: { getListAllQuocGia },
    ngheNghiep: { getListAllNgheNghiep },
    utils: { getUtils },
    nbDotDieuTri: { updateData },
  }) => ({
    getListAllQuocGia,
    getListAllNgheNghiep,
    getListAllDanToc,
    getUtils,
    updateData,
  })
)(memo(Index));
