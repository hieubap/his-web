import React, { useRef, useEffect, useState, memo } from "react";
import { Col, Input, Checkbox, Row } from "antd";
import { GlobalStyle, Main, PopoverWrapper } from "./styled";
import Camera from "components/Camera";
import { useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import { hexToUtf8 } from "utils";
import ModalAddCapCuu from "./ModalAddCapCuu";
import ModalAddQuanNhan from "./ModalAddQuanNhan";
import moment from "moment";
import { ModalNotification2 } from "components/ModalConfirm";
import fileUtils from "utils/file-utils";
import { openInNewTab } from "utils";
const { TextArea } = Input;

const InfoHeader = (props) => {
  const {
    tiepDon: {
      doiTuong,
      maHoSo,
      loaiDoiTuongId,
      nbChanDoan,
      uuTien = false,
      capCuu = false,
      nbTheBaoHiem,
      nbCapCuu = {},
      nbQuanNhan = {},
      checkValidate = false,
      disableTiepDon,
      anhDaiDien,
      hangThe,
      covid = false,
    },
    loaiDoiTuong: { listAllLoaiDoiTuong = [] },
    utils: { listdoiTuong = [] },
    theBaoHiem: { listAllTheBaoHiem = [] },
  } = useSelector((state) => state);
  const {
    goiSo: { updateData: updateDataGoiSo, getInfoFromQr },
    tiepDon: { updateData, resetData: resetDataTiepDon },
    thietLap: { onSearch: onSearchThietLap },
  } = useDispatch();

  const refCamera = useRef(null);
  const refModalNotification2 = useRef(null);
  const refAddCapCuu = useRef();
  const refQuanNhan = useRef();
  const refMaNb = useRef();
  const refMaDinhDanh = useRef();
  const refCheckboxCapCuu = useRef(null);
  const searchMaNbTiepDon = useDispatch().tiepDon.searchMaNbTiepDon;
  const updateDetail = useDispatch().tiepDon.updateDetail;
  const { maNb, onSearchTime } = useSelector((state) => state.tiepDon);
  const { onChange, refModal, onCheckCardInsurance } = props;

  const [state, _setState] = useState({
    maDinhDanh: "",
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { maDinhDanh, lyDoDenKham, maThe } = state;
  useEffect(() => {
    refModal({
      refQuanNhan,
      refAddCapCuu,
    });
    document.addEventListener("keydown", (e) => {
      if (e.code === "F2") {
        e.preventDefault();
        refMaDinhDanh.current.focus();
      }
    });
    onSearchThietLap({ size: 999, dataSearch: { ma: "MA_KHOA_CAP_CUU" } });
  }, []);
  useEffect(() => {
    setState({ lyDoDenKham: nbChanDoan?.lyDoDenKham });
  }, [nbChanDoan]);

  useEffect(() => {
    setState({ maThe: nbTheBaoHiem?.maThe });
  }, [nbTheBaoHiem]);

  useEffect(() => {
    if (onSearchTime && maDinhDanh) {
      //nếu người bệnh trong tiếp đón thay đổi thì clear trường mã định danh
      setState({ maDinhDanh: "" });
    }
  }, [onSearchTime]);

  const onBlur = (value, variables) => {
    let data = nbChanDoan || {};
    data[`${variables}`] = value;
    updateData({ nbChanDoan: { ...data } });
  };
  const onSearchMaThe = (e) => {
    if (e.key === "Enter" || e.key == "Tab") {
      if (maDinhDanh) {
        if (maDinhDanh.indexOf("$") == maDinhDanh.length - 1) {
          resetDataTiepDon({
            //giữ lại đối tượng và loại đối tượng khi search mã định danh theo bhyt
            loaiDoiTuongId,
            doiTuong,
          });
          updateData({ loadingNotification: true });
          searchMaThe(maDinhDanh);
        } else if (maDinhDanh.endsWith("==")) {
          resetDataTiepDon();
          getInfoFromQr({ qrText: maDinhDanh });
        } else {
          getInfoFromCCCD(maDinhDanh);
        }
      }
    }
  };

  const getInfoFromCCCD = (value = "") => {
    let array = value.split("|");
    if (array.length == 7) {
      let date = moment(array[3], "DDMMYYYY");
      const arr = (array[5] || "").split(",").map((item) => item.trim());
      updateData({
        nbGiayToTuyThan: { loaiGiayTo: 2, maSo: array[0] },
        tenNb: array[2],
        ngaySinh: { date: date._d, str: date._d.format("dd/MM/yyyy") },
        tuoi: date._d.getAge() || "",
        gioiTinh: array[4] === "Nữ" ? 2 : 1,
        searchThe: true,
        nbDiaChi: {
          diaChi: arr.slice(1, 4).join(", "),
          soNha: arr[0],
        },
      });
    }
  };
  const searchMaThe = (value = "") => {
    let array = value.split("|");
    let day = array[2]?.split("/") || [];
    let dayLate = `${day[2]}/${day[1]}/${day[0]}`;
    let date = {
      str: array[2],
      date: new Date(dayLate),
    };
    let day5nam = (array[12] && array[12].split("/")) || [];
    let ten = hexToUtf8(array[1]);
    let mucHuong = array[0]?.substr(0, 3);
    let dataCheck = listAllTheBaoHiem?.find((item) => item.ma == mucHuong);
    updateData({
      nbTheBaoHiem: {
        ...(nbTheBaoHiem || {}),
        mucHuong: dataCheck?.mucHuong,
        maThe: array[0],
        thoiGianDu5Nam: `${day5nam[2]}/${day5nam[1]}/${day5nam[0]}`,
      },
      tenNb: ten,
      ngaySinh: date,
      gioiTinh: array[3] && Number(array[3]),
      // nbDiaChi: {
      //   diaChi: hexToUtf8(array[4]),
      // },
      searchThe: true,
    });
    if (ten && ten.length && date?.date) {
      setState({ maDinhDanh: "" });
      onCheckCardInsurance(
        {
          hoTen: ten,
          maThe: array[0],
          ngaySinh: date?.date,
        },
        { ten }
      );
    }
  };
  const showModalCamera = () => {
    if (refCamera.current && !disableTiepDon)
      refCamera.current.show(
        {
          type: "anhDaiDien",
        },
        (data) => {
          if (data) updateData({ anhDaiDien: data });
        }
      );
  };
  const onSearchInfo = (value = "") => {
    if (value.trim())
      searchMaNbTiepDon({ maNb: value }).then((s) => {
        if (s.code == 7925 || s.code == 7924 || s.code == 7922) {
          refModalNotification2.current &&
            refModalNotification2.current.show(
              {
                showBtnOk: true,
                title: "Thông báo",
                content: s.message,
              },
              () => {
                updateDetail({
                  ...s.data,
                  maHoSo: null,
                });
                updateDataGoiSo({
                  daThanhToan: false,
                  messageChuaThanhToan: s.message,
                });
              },
              () => {
                updateData({
                  maNb: null,
                });
                updateDataGoiSo({
                  daThanhToan: true,
                  messageChuaThanhToan: null,
                });
              }
            );
        } else {
          if (s.code == 0) {
            updateDetail(s.data);
          }
        }
      });
  };
  const onKeyDown = (event) => {
    if (event.nativeEvent.key === "Enter") refMaNb.current.blur();
  };
  const showAddCapCuu = (item) => {
    refAddCapCuu.current.show(
      {
        show: true,
        loaiCapCuuId: item?.loaiCapCuuId,
        viTriChanThuongId: item?.viTriChanThuongId,
        nguyenNhanNhapVienId: item?.nguyenNhanNhapVienId,
        thoiGianCapCuuId: item?.thoiGianCapCuuId,
      },
      (data = {}) => {
        let obj = { ...nbCapCuu, ...data };
        updateData({ nbCapCuu: { ...obj } });
      }
    );
  };
  const showQuanNhan = (value) => {
    refQuanNhan.current.show(
      {
        show: true,
        donViId: value?.donViId,
        nguoiDaiDienId: value?.nguoiDaiDienId,
        chucVuId: value?.chucVuId,
        quanHamId: value?.quanHamId,
      },
      (data = {}) => {
        updateData({ nbQuanNhan: { ...nbQuanNhan, ...data } });
      }
    );
  };

  const onClearLoaiDoiTuong = () => {
    updateData({ loaiDoiTuongId: null });
  };
  return (
    <Main className="main-header">
      <Row className="body-info">
        <Col sm={12} md={12} xl={12} xxl={12} style={{ padding: 0 }}>
          <Row style={{ width: "100%" }}>
            <Col sm={8} md={8} xl={6} xxl={6}>
              <div
                className={disableTiepDon ? "avatar avatar-no-drop" : "avatar"}
                onClick={() => showModalCamera()}
              >
                <div className="wrapperCamera">
                  {hangThe && hangThe?.icon && (
                    <div className="hangTheIcon">
                      <GlobalStyle />
                      <PopoverWrapper
                        content={`${hangThe?.ten}`}
                        placement="right"
                        trigger="hover"
                      >
                        <img
                          src={`${fileUtils.absoluteFileUrl(hangThe?.icon)}`}
                          alt=""
                        />
                      </PopoverWrapper>
                    </div>
                  )}
                  <Camera
                    ref={refCamera}
                    type={"anhDaiDien"}
                    title={"Upload avatar"}
                    className={"avatar__"}
                    value={anhDaiDien}
                    image={require("assets/images/welcome/avatar.png")}
                    icon={require("assets/images/welcome/avatarIcon.png")}
                  />
                </div>
              </div>
            </Col>
            <Col sm={12} md={12} xl={18} xxl={18}>
              <Row style={{ width: "100%" }}>
                <Col
                  sm={24}
                  md={24}
                  xl={24}
                  xxl={24}
                  className="header-item"
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <div className="item-input">
                    <div className="d-flex">
                      <label className="label">Mã định danh</label>
                      <label className="label">
                        <i className="sub-color">Quét QR CCCD, BHYT, mã NB</i>
                      </label>
                    </div>
                    <Input
                      style={{ paddingRight: "35px" }}
                      ref={refMaDinhDanh}
                      autoFocus
                      placeholder="Quét mã QR"
                      value={maDinhDanh}
                      onChange={(e) => setState({ maDinhDanh: e.target.value })}
                      onKeyDown={onSearchMaThe}
                      disabled={disableTiepDon}
                    />
                    <div className="qr-icon">
                      <img
                        src={require("assets/images/welcome/iconqr.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </Col>
                <Col
                  sm={24}
                  md={24}
                  xl={24}
                  xxl={24}
                  className="header-item"
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <div className="item-text-area">
                    <label className="label">Lý do đến khám</label>
                    <TextArea
                      className="text-content"
                      value={lyDoDenKham}
                      disabled={disableTiepDon}
                      onChange={(e) =>
                        setState({ lyDoDenKham: e.target.value })
                      }
                      onBlur={(e) => onBlur(e.target.value, "lyDoDenKham")}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col
          sm={12}
          md={12}
          xl={12}
          xxl={12}
          style={{ paddingRight: 7, paddingLeft: 0 }}
        >
          <Row style={{ width: "100%" }} className="meta-info">
            {/* <Col sm={24} md={24} xl={24} xxl={24} className="header-button">
              <div className="button-item" style={{ marginRight: 15 }}>
                {" "}
                Thẻ khám bệnh
              </div>
              <div className="button-item"> Tạo thẻ tạm</div>
            </Col> */}
            <Col sm={13} md={13} xl={9} xxl={9} className="header-item">
              <div className="item-select">
                <label className={!doiTuong ? `label label-error` : "label"}>
                  Đối tượng<span style={{ color: "red" }}> *</span>
                </label>
                <Select
                  onChange={(e, list) => onChange(e, "doiTuong")}
                  value={doiTuong}
                  className="item__second-select"
                  placeholder={"Chọn đối tượng"}
                  data={listdoiTuong}
                  onClear={onClearLoaiDoiTuong}
                  id={"value"}
                  ten={"name"}
                  disabled={disableTiepDon}
                />
                {checkValidate && !doiTuong ? (
                  <div className="error">Vui lòng chọn đối tượng!</div>
                ) : null}
              </div>
            </Col>

            <Col sm={12} md={12} xl={6} xxl={6} className="header-item">
              <div>
                <Checkbox
                  className="box-item"
                  onChange={(e) => onChange(e?.target?.checked, "uuTien")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onChange(!e?.target?.checked, "uuTien");
                    }
                  }}
                  checked={uuTien}
                  disabled={disableTiepDon}
                >
                  Là ưu tiên
                </Checkbox>
                <div className="d-flex">
                  <Checkbox
                    ref={refCheckboxCapCuu}
                    className="box-item"
                    onChange={(e) => {
                      let value = e?.target?.checked;
                      onChange(value, "capCuu");
                      if (value) showAddCapCuu();
                      else updateData({ nbCapCuu: {} });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        let value = e?.target?.checked;
                        onChange(!value, "capCuu");
                        if (!value) showAddCapCuu();
                        else updateData({ nbCapCuu: {} });
                      }
                    }}
                    checked={capCuu}
                    disabled={disableTiepDon}
                  >
                    <span>Là cấp cứu</span>
                  </Checkbox>
                  {capCuu && nbCapCuu?.loaiCapCuuId ? (
                    <span className="detail-view">
                      {/* {"Chi tiết"} */}
                      <img
                        src={require("assets/images/welcome/view.png")}
                        onClick={() => showAddCapCuu(nbCapCuu)}
                        alt=""
                      />
                    </span>
                  ) : null}
                </div>
              </div>
            </Col>
            <Col sm={11} md={11} xl={9} xxl={9} className="header-item">
              <div className="item-input">
                <label className="label">Mã người bệnh</label>
                <Input
                  ref={refMaNb}
                  onChange={(e) => onChange(e.target.value, "maNb")}
                  placeholder="Nhập mã người bệnh"
                  onBlur={(e) => onSearchInfo(e.target.value)}
                  onKeyDown={onKeyDown}
                  value={maNb}
                  disabled={disableTiepDon}
                  type="number"
                />
              </div>
            </Col>
          </Row>
          <Row style={{ width: "100%" }} className="meta-info">
            <Col sm={13} md={13} xl={9} xxl={9} className="header-item">
              <div className="item-select">
                <label
                  className={
                    !loaiDoiTuongId
                      ? `label label-error pointer`
                      : "label pointer"
                  }
                >
                  <span
                    onClick={() => openInNewTab("/danh-muc/loai-doi-tuong")}
                  >
                    Loại đối tượng
                  </span>
                  <span style={{ color: "red" }}> *</span>
                  {nbQuanNhan?.donViId ? (
                    <span className="detail-view">
                      {/* {"Chi tiết"} */}
                      <img
                        onClick={() => showQuanNhan(nbQuanNhan)}
                        src={require("assets/images/welcome/view.png")}
                        alt=""
                      />
                    </span>
                  ) : null}
                </label>
                <Select
                  onChange={(e, list) => {
                    let value = list?.lists?.quanNhan;
                    const newState = { quanNhan: value };
                    if (value) showQuanNhan();
                    else {
                      newState.nbQuanNhan = null;
                    }
                    updateData(newState);
                    onChange(e, "loaiDoiTuongId");
                  }}
                  value={loaiDoiTuongId}
                  className="item__select"
                  placeholder={"Chọn loại đối tượng"}
                  data={listAllLoaiDoiTuong}
                  disabled={disableTiepDon}
                />
                {checkValidate && !loaiDoiTuongId ? (
                  <div className="error">Vui lòng chọn loại đối tượng!</div>
                ) : null}
              </div>
            </Col>

            <Col sm={12} md={12} xl={6} xxl={6} className="header-item">
              <div>
                <Checkbox
                  className="box-item"
                  // onChange={(e) => onChange(e?.target?.checked, "covid")}
                  // onKeyDown={(e) => {
                  //   if (e.keyCode === 13) {
                  //     onChange(!e?.target?.checked, "covid");
                  //   }
                  // }}
                  checked={maThe}
                  disabled
                >
                  Giữ thẻ BHYT
                </Checkbox>
                <Checkbox
                  className="box-item"
                  onChange={(e) => onChange(e?.target?.checked, "covid")}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      onChange(!e?.target?.checked, "covid");
                    }
                  }}
                  checked={covid}
                  disabled={disableTiepDon}
                >
                  NB Covid
                </Checkbox>
              </div>
            </Col>
            <Col sm={11} md={11} xl={9} xxl={9} className="header-item">
              <div className="item-input">
                <label className="label">Mã hồ sơ</label>
                <Input value={maHoSo} disabled />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalAddCapCuu ref={refAddCapCuu} />
      <ModalAddQuanNhan ref={refQuanNhan} />
      <ModalNotification2 ref={refModalNotification2} />
    </Main>
  );
};

export default memo(InfoHeader);
