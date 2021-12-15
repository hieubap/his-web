import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { Row, Col, Input, DatePicker, Checkbox } from "antd";
import Header from "components/Header";
import { connect, useDispatch } from "react-redux";
import { Main } from "./styled";
import moment from "moment";
import SelectMore from "components/SelectMore";
import { compose } from "redux";
import UploadFile from "./UploadFile";
import IcEye from "assets/svg/tiep-don/eye.svg";
import IcCloud from "assets/svg/tiep-don/cloud.svg";
import { cloneDeep, isEqual } from "lodash";
import { TAI_KHOAN_BHXH } from "constants/thietLapChung";
const { TextArea } = Input;

const Index = (props) => {
  const refUploadFile = useRef(null);
  const refSoBaoHieu = useRef(null);
  const refNbBaoHiem = useRef({});
  const {
    tiepDon: { updateData },
  } = useDispatch();

  const {
    nbTheBaoHiem,
    checkValidate,
    doiTuong,
    onCheckTrungThongTin,
    disableTiepDon,
    listAllBenhVien,
    nbChanDoan,
    checkNoiGioiThieu,
    auth,
    checkFormBhyt,
    getListAllLoaiDoiTuong,
    checkTheBhyt,
  } = props;

  const [state, _setState] = useState({
    show: false,
    mienDongChiTra: true,
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const {
    maThe,
    mucHuong,
    tuNgay,
    tuNgayStr,
    denNgay,
    denNgayStr,
    cdNoiGioiThieu,
    noiDangKyId,
    noiGioiThieuId,
    thoiGianDu5Nam,
    noiGioiThieuTen,
    noiDangKyTen,
    thoiGianMienDongChiTra,
    giayChuyenTuyen,
    henKhamLai,
    mienDongChiTra,
    giayHenKham,
  } = state;
  // + nameField tên trường tương ứng trong theBaoHiem check
  // + nameDetail tên trường đưa vào thông báo:
  // vd trường tuNgay -> nameDetail = Bảo hiểm từ ngày
  // + valDetail giá trị tương ứng trong theBaoHiem
  const onChange = (value, variables, nameField, nameDetail, valDetail) => {
    setState({ [`${variables}`]: value });
    let data = {};
    if (
      variables === "tuNgay" ||
      variables === "denNgay" ||
      variables === "thoiGianDu5Nam" ||
      variables === "thoiGianMienDongChiTra" ||
      variables === "noiGioiThieuId" ||
      variables === "noiDangKyId"
    ) {
      updateData({
        nbTheBaoHiem: { ...(nbTheBaoHiem || {}), [variables]: value },
      });
    }
    if (variables === "maThe" && value?.length === 15) {
      if (doiTuong === 2) updateData({ checkFormBhyt: true });
      else {
        updateData({ doiTuong: 2, loaiDoiTuongId: null, checkFormBhyt: true });
        getListAllLoaiDoiTuong({ doiTuong: 2 });
      }
    }
    if (variables === "noiDangKyId") {
      if (auth?.benhVien?.id === value)
        updateData({ checkNoiGioiThieu: false });
      else updateData({ checkNoiGioiThieu: true });
    }
    if (nameField) {
      checkTheBhyt(valDetail, nameField, nameDetail);
    }
  };
  const onBlur = (value, variables) => {
    let data = {};
    if (variables === "cdNoiGioiThieu") {
      data = { ...(nbChanDoan || {}), [variables]: value };
      updateData({ nbChanDoan: data });
    } else {
      data = { ...(nbTheBaoHiem || {}), [variables]: value };
      if (variables == "henKhamLai") {
        data["giayChuyenTuyen"] = null;
      }
      if (variables === "maThe" && value.length === 15) {
        const mucHuong = value?.substr(0, 3);
        const dataCheck = props.listAllTheBaoHiem?.find(
          (item) => item.ma == mucHuong
        );
        data.mucHuong = dataCheck?.mucHuong;
      }

      updateData({
        nbTheBaoHiem: { ...data },
      });

      if (variables === "maThe") {
        if (
          state.maThe !== nbTheBaoHiem.maThe &&
          (state.maThe?.length === 10 || state.maThe?.length === 15)
        ) {
          checkTheBhyt(value, variables);
        }
      } else onCheckTrungThongTin(value, variables);
    }
  };
  useEffect(() => {
    props.getThietLap({ ma: TAI_KHOAN_BHXH });
    document.addEventListener("keydown", (e) => {
      if (e.code === "F7") {
        e.preventDefault();
        refSoBaoHieu.current.focus();
      }
    });
  }, []);

  useEffect(() => {
    if (!isEqual(refNbBaoHiem.current, nbTheBaoHiem)) {
      //nếu khác dữ liệu trước đó
      refNbBaoHiem.current = nbTheBaoHiem; //gán lại dữ liệu
      if (!nbTheBaoHiem?.mucHuong && nbTheBaoHiem?.maThe) {
        onBlur(nbTheBaoHiem?.maThe, "maThe");
      }

      setState({
        maThe: nbTheBaoHiem?.maThe,
        mucHuong: nbTheBaoHiem?.mucHuong,
        tuNgay: nbTheBaoHiem?.tuNgay && moment(nbTheBaoHiem?.tuNgay),
        tuNgayStr: nbTheBaoHiem?.tuNgay
          ? moment(nbTheBaoHiem?.tuNgay).format("DD/MM/yyyy")
          : "",
        denNgay: nbTheBaoHiem?.denNgay && moment(nbTheBaoHiem?.denNgay),
        denNgayStr: nbTheBaoHiem?.denNgay
          ? moment(nbTheBaoHiem?.denNgay).format("DD/MM/yyyy")
          : "",
        noiDangKyId: nbTheBaoHiem?.noiDangKyId,
        noiGioiThieuId: nbTheBaoHiem?.noiGioiThieuId,
        thoiGianDu5Nam:
          nbTheBaoHiem?.thoiGianDu5Nam && moment(nbTheBaoHiem?.thoiGianDu5Nam),
        thoiGianMienDongChiTra:
          nbTheBaoHiem?.thoiGianMienDongChiTra &&
          moment(nbTheBaoHiem?.thoiGianMienDongChiTra),
        henKhamLai: nbTheBaoHiem?.henKhamLai,
        giayHenKham: nbTheBaoHiem?.giayHenKham,
        giayChuyenTuyen: nbTheBaoHiem?.giayChuyenTuyen,
        mienDongChiTra: nbTheBaoHiem?.mienDongChiTra || true,
        noiGioiThieuTen: nbTheBaoHiem?.noiGioiThieu?.ten,
        noiDangKyTen: nbTheBaoHiem?.noiDangKy?.ten,
      });
    }
  }, [nbTheBaoHiem]);
  useEffect(() => {
    setState({ cdNoiGioiThieu: nbChanDoan?.cdNoiGioiThieu });
  }, [nbChanDoan]);

  const showUploadFile =
    (item = [], type, title) =>
    () => {
      if (!disableTiepDon) {
        refUploadFile.current.show(
          {
            show: true,
            dataView: item,
            type,
            title,
          },
          (data = {}) => {
            let obj = cloneDeep(nbTheBaoHiem || {});
            obj[`${data?.type}`] = data?.data;
            updateData({ nbTheBaoHiem: { ...obj } });
          }
        );
      }
    };

  const isSameHospital = useCallback(() => {
    if (doiTuong != 2) return true;
    if (!noiDangKyId) return false;
    const giaTri = props.dataTAI_KHOAN_BHXH;
    return (
      giaTri ==
      (listAllBenhVien.find((item) => item.id == noiDangKyId)?.ma || "") + "_BV"
    );
  }, [props.dataTAI_KHOAN_BHXH, noiDangKyId, listAllBenhVien]);
  return (
    <Main>
      <Row>
        <Header
          title="Thông tin BHYT"
          content={
            <div>
              Nhấn <span>[F7] </span>để thêm thông tin BHYT{" "}
            </div>
          }
        />
      </Row>
      <Row className="flame-right-main">
        <Col md={16} xl={16} xxl={16}>
          <div className="item-input">
            <label
              className={
                !maThe && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              Số bảo hiểm
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}{" "}
            </label>
            <Input
              ref={refSoBaoHieu}
              placeholder="Số bảo hiểm"
              value={maThe}
              maxLength={15}
              onChange={(e) =>
                (!e.target.value || /^[a-zA-Z0-9]+$/i.test(e.target.value)) &&
                onChange(e.target.value, "maThe")
              }
              onBlur={(e) => onBlur(e.target.value, "maThe")}
              disabled={disableTiepDon}
            />
          </div>
          {checkValidate && doiTuong === 2 && !maThe ? (
            <div className="error">Vui lòng nhâp số bảo hiểm!</div>
          ) : // !checkMaThe ? (
          //   <div className="error">Số bảo hiểm sai định dạng!</div>
          // ) :
          null}
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-input">
            <label
              className={
                !mucHuong && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              Mức hưởng
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
            </label>
            <Input
              value={mucHuong ? `${mucHuong} %` : ""}
              onChange={(e) => onChange(e.target.value, "mucHuong")}
              onBlur={(e) => onBlur(e.target.value, "mucHuong")}
              disabled
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label
              className={
                !tuNgay && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              Bảo hiểm từ ngày
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
            </label>
            <DatePicker
              value={tuNgay}
              className="item-born"
              onChange={(e) =>
                onChange(
                  e,
                  "tuNgay",
                  "gtTheTu",
                  "Bảo hiểm từ ngày",
                  e.format("DD/MM/YYYY")
                )
              }
              placeholder="Chọn ngày"
              format="DD/MM/YYYY"
              disabled={disableTiepDon}
            />
            {/* <DOBInput
              className="item-born"
              value={{ date: tuNgay, str: tuNgayStr }}
              onBlur={(e,nofi) => {
                setState({ validate : nofi })
                onChange(e.date, "tuNgay", true);
              }}
              disabled={disableTiepDon}
              onChange={(e) => {
                setState({
                  tuNgayStr: e.str,
                });
              }}
              placeholder={"Nhập ngày"}
            /> */}
            {state?.validate &&
            state.validate !== 0 &&
            doiTuong === 2 &&
            tuNgayStr ? (
              <div className="error">Từ ngày sai định dạng!</div>
            ) : checkValidate && doiTuong === 2 && !tuNgay ? (
              <div className="error">Vui lòng chọn từ ngày!</div>
            ) : null}
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label
              className={
                !denNgay && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              Bảo hiểm đến ngày
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
            </label>
            <DatePicker
              value={denNgay}
              className="item-born"
              onChange={(e) =>
                onChange(
                  e,
                  "denNgay",
                  "gtTheDen",
                  "Bảo hiểm đến ngày",
                  e.format("DD/MM/YYYY")
                )
              }
              placeholder="Chọn ngày"
              format="DD/MM/YYYY"
              disabled={disableTiepDon}
            />
            {/* <DOBInput
              className="item-born"
              value={{ date: denNgay, str: denNgayStr }}
              onBlur={(e) => {
                onChange(e.date, "denNgay", true);
              }}
              disabled={disableTiepDon}
              onChange={(e) => {
                setState({
                  denNgayStr: e.str,
                });
              }}
              placeholder={"Nhập ngày"}
            /> */}
            {state?.validate &&
            state.validate !== 0 &&
            doiTuong === 2 &&
            denNgayStr ? (
              <div className="error">Đến ngày sai định dạng!</div>
            ) : checkValidate && doiTuong === 2 && !denNgay ? (
              <div className="error">Vui lòng chọn đến ngày!</div>
            ) : null}
          </div>
        </Col>
        <Col md={24} xl={24} xxl={24}>
          <div className="item-input">
            <label
              className={
                !cdNoiGioiThieu && doiTuong === 2
                  ? `label label-error`
                  : "label"
              }
            >
              Chẩn đoán nơi giới thiệu
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
            </label>
            <TextArea
              placeholder="Nhập nội dung"
              value={cdNoiGioiThieu}
              onChange={(e) => onChange(e.target.value, "cdNoiGioiThieu")}
              onBlur={(e) => onBlur(e.target.value, "cdNoiGioiThieu")}
              disabled={disableTiepDon}
              cols={5}
            />
            {checkValidate && doiTuong === 2 && !cdNoiGioiThieu && (
              <div className="error">Vui lòng chẩn đoán nơi giới thiệu!</div>
            )}
          </div>
        </Col>
        <Col
          md={!isSameHospital() ? 12 : 24}
          xl={!isSameHospital() ? 12 : 24}
          xxl={!isSameHospital() ? 12 : 24}
        >
          <div className="item-input">
            <label
              className={
                !noiDangKyId && doiTuong === 2 ? `label label-error` : "label"
              }
            >
              Nơi đăng ký
              {doiTuong === 2 && <span style={{ color: "red" }}> *</span>}
            </label>
            <SelectMore
              onChange={(e) =>
                onChange(
                  e,
                  "noiDangKyId",
                  "tenDKBD",
                  "Nơi đăng ký",
                  (listAllBenhVien.find((bv) => bv.id === e) || {}).ten
                )
              }
              className="noiDangKyId"
              placeholder={"Chọn nơi đăng ký"}
              data={listAllBenhVien}
              valueText={noiDangKyTen}
              disabled={disableTiepDon}
              valueTen={"ma"}
            />
            {checkValidate && doiTuong === 2 && !noiDangKyId && (
              <div className="error">Vui lòng chọn nơi đăng ký!</div>
            )}
          </div>
        </Col>
        {!isSameHospital() ? ( //và nơi đăng ký không trùng với thông tin khai báo trong thiết lập chung tài khoản bhxh thì hiển thị ô nhập nơi giới thiệu
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label
                className={
                  !noiGioiThieuId && doiTuong === 2 && checkNoiGioiThieu
                    ? `label label-error`
                    : "label"
                }
              >
                Nơi giới thiệu
                {doiTuong === 2 &&
                  checkNoiGioiThieu &&
                  !nbTheBaoHiem?.henKhamLai && (
                    <span style={{ color: "red" }}> *</span>
                  )}
              </label>
              <SelectMore
                className="noiGioiThieuId"
                onChange={(e) => onChange(e, "noiGioiThieuId")}
                placeholder={"Chọn nơi giới thiệu"}
                data={listAllBenhVien}
                valueText={noiGioiThieuTen}
                disabled={disableTiepDon}
                valueTen={"ma"}
              />
              {checkValidate &&
                doiTuong === 2 &&
                checkNoiGioiThieu &&
                !nbTheBaoHiem?.henKhamLai &&
                !noiGioiThieuId && (
                  <div className="error">Vui lòng chọn nơi giới thiệu!</div>
                )}
            </div>
          </Col>
        ) : null}
        {/* {checkFormBhyt && (
          <> */}
        {/* <Col md={12} xl={12} xxl={12} style={{ paddingBottom: 12 }}>
              <div className="checkbox">
                <Checkbox
                  checked={mienDongChiTra}
                  disabled={disableTiepDon}
                  onChange={() => onBlur(!mienDongChiTra, "mienDongChiTra")}
                >
                  Miễn đồng chi trả
                </Checkbox>
              </div>
            </Col> */}
        {/* {mienDongChiTra ? ( */}
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label className="label">Thời gian đủ 5 năm liên tục</label>
            <DatePicker
              disabled
              value={thoiGianDu5Nam}
              onChange={(e) => onChange(e, "thoiGianDu5Nam")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY"
              disabled={disableTiepDon}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-date">
            <label className="label">Thời gian miễn đồng chi trả</label>
            <DatePicker
              placeholder="Chọn ngày"
              format="DD/MM/YYYY"
              value={thoiGianMienDongChiTra}
              disabled={!mienDongChiTra}
              onChange={(e) => onChange(e, "thoiGianMienDongChiTra")}
              disabled={disableTiepDon}
            />
          </div>
        </Col>
        {/* ) : (
              <Col md={12} xl={12} xxl={12}></Col>
            )} */}
        {noiGioiThieuId ? (
          <Col md={12} xl={12} xxl={12}>
            <div className={`checkbox ${henKhamLai ? "disabled" : ""}`}>
              <div
                className={"upload-giay-chuyen-tuyen"}
                onClick={
                  !henKhamLai &&
                  showUploadFile(
                    giayChuyenTuyen,
                    "giayChuyenTuyen",
                    "chuyển tuyến"
                  )
                }
              >
                Tải lên giấy chuyển tuyến
                {giayChuyenTuyen?.length ? (
                  <IcEye className="icon" />
                ) : (
                  <IcCloud className="icon" />
                )}
              </div>
            </div>
          </Col>
        ) : null}
        <Col md={12} xl={12} xxl={12}>
          <div className="checkbox">
            <Checkbox
              checked={henKhamLai}
              disabled={disableTiepDon}
              onChange={() => onBlur(!henKhamLai, "henKhamLai")}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  onChange(!e?.target?.checked, "henKhamLai");
                }
              }}
            ></Checkbox>
            <div
              // className={!henKhamLai ? "disabled" : ""}
              className={!henKhamLai ? "" : ""}
              onClick={
                henKhamLai &&
                showUploadFile(giayHenKham, "giayHenKham", "hẹn khám lại")
              }
            >
              Có lịch hẹn khám lại
              {giayHenKham?.length ? (
                <IcEye className="icon" />
              ) : (
                <IcCloud className="icon" />
              )}
            </div>
          </div>
        </Col>
      </Row>
      <UploadFile ref={refUploadFile} />
    </Main>
  );
};
const mapState = (state) => ({
  auth: state.auth?.auth || {},
  nbTheBaoHiem: state.tiepDon.nbTheBaoHiem || {},
  nbChanDoan: state.tiepDon.nbChanDoan,
  checkValidate: state.tiepDon.checkValidate,
  listAllBenhVien: state.benhVien.listAllBenhVien || [],
  disableTiepDon: state.tiepDon.disableTiepDon,
  doiTuong: state.tiepDon.doiTuong,
  checkNoiGioiThieu: state.tiepDon.checkNoiGioiThieu || false,
  listAllTheBaoHiem: state.theBaoHiem.listAllTheBaoHiem || [],
  checkFormBhyt: state.tiepDon.checkFormBhyt || false,
  dataTAI_KHOAN_BHXH: state.thietLap.dataTAI_KHOAN_BHXH,
  // checkMaThe: (state.tiepDon.validateData || {}).checkMaThe || true,
});

const mapDispatch = ({
  tiepDon: { searchSoThe },
  thietLap: { getThietLap },
}) => ({
  searchSoThe,
  getThietLap,
});

const withConnect = connect(mapState, mapDispatch);

export default compose(withConnect, memo)(Index);
