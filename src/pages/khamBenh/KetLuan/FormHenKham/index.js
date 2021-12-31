import React, { useCallback, useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import { Form, Input, Row, Col } from "antd";
import { Main } from "./styled";
import TextField from "components/TextField";
import DatePickerField from "components/DatePickerField";
import Checkbox from "components/Checkbox";
import MultiInput from "components/MultiInput";
import { DOI_TUONG } from "constants/index";

export const FormHenKham = (props) => {
  const { handleSetData } = props;
  const { nbHoiBenh, nbChanDoan, nbDichVu, nbKetLuan } = useSelector(
    (state) => state.khamBenh.thongTinChiTiet || {}
  );
  const {
    tenNb,
    doiTuong,
    ngaySinh,
    tenXaPhuong,
    tenQuanHuyen,
    tenTinhThanhPho,
    gioiTinh,
    maTheBhyt,
    thoiGianVaoVien,
    soNha,
    tuNgayTheBhyt,
    denNgayTheBhyt,
  } = useSelector((state) => {
    return state.khamBenh.infoNb || {}
  });
  const { quaTrinhBenhLy } = nbHoiBenh || {};
  const { dsCdChinh, dsCdKemTheo } = nbChanDoan || {};
  const { thoiGianThucHien } = nbDichVu || {};
  const { thoiGianKetLuan, thoiGianHenKham, ghiChu, loiDan } = nbKetLuan || {};
  const [state, _setState] = useState({
    visibleDelete: null,
    visibleEdit: null,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const [dataSelect, setDataSelect] = useState({});
  useEffect(() => {
    setDataSelect({ ...nbHoiBenh, ...nbChanDoan, ...nbDichVu, ...dataSelect });
  }, [props.thongTinChiTiet]);
  const [form] = Form.useForm();
  const { dataSortColumn = {} } = props;
  const onClickSort = () => {};

  const handleEdit = (record) => () => {
    form.validateFields().then((values) => {
      setState({
        visibleEdit: false,
      });
    });
  };

  const onCancel = () => {
    setState({
      visibleEdit: null,
      visibleDelete: null,
    });
  };
  const handleVisible = (type, idx) => (visible) => {
    const dataType = {
      edit: "visibleEdit",
      delete: "visibleDelete",
      info: "visibleInfo",
    };
    setState({
      [dataType[type]]: idx,
    });
  };

  const showAddress = () => {
    return `${soNha ? `${soNha} - ` : ""}${tenXaPhuong || ""}${tenXaPhuong && tenQuanHuyen ? " - " : ""}${
      tenQuanHuyen || ""
    }${(tenXaPhuong || tenQuanHuyen) && tenTinhThanhPho ? " - " : ""}${
      tenTinhThanhPho || ""
    }`;
  };

  const customFormat = (value) => {
    if (!value) return;

    value = moment(value);

    return `giờ ${value.hour()}h ngày ${value.date()} tháng ${
      value.month() + 1
    } năm ${value.year()}`;
  };

  const handleChangeData = (key) => (values) => {
    handleSetData(["nbKetLuan", key])(values);
    // if (["thoiGianHenKham"].includes(key)) {
    setDataSelect({ ...dataSelect, [key]: values });
    // }
  };

  const checkDisabledDate = (currentDate) => {
    return moment(currentDate) < moment(thoiGianThucHien);
  };
  return (
    <Main className="form-detail">
      <Row className="mr-5">
        <Col span={16}>
          <div>
            <span>Họ và tên: </span>
            {tenNb}
          </div>
        </Col>
        <Col span={7} offset={1}>
          <Checkbox checked={gioiTinh === 1}>Nam</Checkbox>
          <Checkbox checked={gioiTinh === 2}>Nữ</Checkbox>
        </Col>
      </Row>
      <div className="mr-5">
        <span>Sinh ngày: </span>
        <span>{ngaySinh && moment(ngaySinh).format("DD/MM/YYYY")}</span>
        {/*<DatePickerField
            value={ngaySinh && moment(ngaySinh)}
            label="Sinh ngày:"
            placeholder="........ / ....... / ............."
          /> */}
      </div>
      <div className="mr-5">
        <span>Địa chỉ: </span>
        {showAddress()}
      </div>
      {doiTuong === DOI_TUONG.BAO_HIEM && (
        <>
          <div className="mr-5">
            <span>Số thẻ bảo hiểm y tế:</span>
            <span> {maTheBhyt}</span>
            {/* <MultiInput className="mrl-5" sizeRange={[3, 3, 3, 8]} /> */}
          </div>

          <div className="mr-5">
            <span>Hạn sử dụng từ </span>
            <span>
              {tuNgayTheBhyt && moment(tuNgayTheBhyt).format("DD/MM/YYYY")}
            </span>
            <span> đến </span>
            <span>
              {denNgayTheBhyt && moment(denNgayTheBhyt).format("DD/MM/YYYY")}
            </span>{" "}
          </div>
        </>
      )}
      <div className="mr-5">
        <span>Ngày khám bệnh: </span>
        <span>
          {thoiGianThucHien && moment(thoiGianThucHien).format("DD/MM/YYYY")}
        </span>{" "}
      </div>

      <TextField
        html={quaTrinhBenhLy}
        classNameLabel={dataSelect.quaTrinhBenhLy ? "" : "red"}
        label={`Quá trình bệnh lý`}
        afterText={<span className="red"> *</span>}
        onChange={handleChangeData("quaTrinhBenhLy")}
        maxLength={1000}
        maxLine={3}
      />
      <div className="mr-5">
        <span className={(dsCdChinh || []).length === 0 ? "red" : ""}>
          Chẩn đoán <span className="red"> *</span>:
        </span>
        {(dsCdChinh || []).map((cd, index) => {
          if (dsCdChinh.length === index + 1) {
            return <span key={cd.id}>{cd.ten}</span>;
          }

          return <span key={cd.id}>{cd.ten}, </span>;
        })}
      </div>
      <div className="mr-5">
        <span>Bệnh kèm theo: </span>
        {(dsCdKemTheo || []).map((cd, index) => {
          if (dsCdKemTheo.length === index + 1) {
            return <span key={cd.id}>{cd.ten}</span>;
          }

          return <span key={cd.id}>{cd.ten}, </span>;
        })}
      </div>

      {/* <TextField className="mr-5" label="Chẩn đoán" />
        <TextField className="mr-5" label="Bệnh kèm theo" /> */}
      <TextField
        html={ghiChu}
        className="mr-5"
        maxLength={1000}
        maxLine={3}
        onChange={handleChangeData("ghiChu")}
        label="Ghi chú"
      />
      <TextField
        html={loiDan}
        className="mr-5"
        maxLength={1000}
        maxLine={3}
        onChange={handleChangeData("loiDan")}
        label="Lời dặn"
      />
      <div className="mr-17">
        <span
          className={
            dataSelect.thoiGianHenKham || (thoiGianHenKham && moment(thoiGianHenKham)) ? "" : "red"
          }
        >
          Hẹn khám lại vào <span className="red"> *</span>{" "}
        </span>{" "}
        <DatePickerField
          value={dataSelect.thoiGianHenKham || (thoiGianHenKham && moment(thoiGianHenKham))}
          showTime={{ format: "HH:mm" }}
          customFormat={customFormat}
          disabledDate={checkDisabledDate}
          onChange={handleChangeData("thoiGianHenKham")}
          placeholder="giờ ........ ngày ........ tháng ........ năm ........."
        />
        <span>
          hoặc đến bất kỳ thời điểm nào trước ngày hẹn khám nếu có dấu hiệu bất
          thường.
        </span>
      </div>
      <div className="mr-17">
        Giấy hẹn khám lại có giá trị sử dụng 01 lần trong thời hạn 10 ngày kể từ
        ngày hẹn khám lại.
      </div>
      <Row className="sign-box">
        <Col span={10}>
          <div className="sign-bottom mr-20">
            <div className="sign-bottom__title">BÁC SĨ, Y SĨ KHÁM BỆNH</div>
            <div>(Ký tên)</div>
          </div>
        </Col>
        <Col span={12} offset={2}>
          <div className="sign-bottom">
            <div>
              {moment(thoiGianKetLuan || new Date()).format(
                "[ngày] DD, [tháng] MM, [năm] YYYY"
              )}
            </div>
            <div className="sign-bottom__title">
              ĐẠI DIỆN CƠ SỞ KHÁM BỆNH - CHỮA BỆNH
            </div>
            <div>(Ký tên, đóng dấu)</div>
          </div>
        </Col>
      </Row>
    </Main>
  );
};


export default FormHenKham;
