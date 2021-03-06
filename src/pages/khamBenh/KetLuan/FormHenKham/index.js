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

    return `gi??? ${value.hour()}h ng??y ${value.date()} th??ng ${
      value.month() + 1
    } n??m ${value.year()}`;
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
            <span>H??? v?? t??n: </span>
            {tenNb}
          </div>
        </Col>
        <Col span={7} offset={1}>
          <Checkbox checked={gioiTinh === 1}>Nam</Checkbox>
          <Checkbox checked={gioiTinh === 2}>N???</Checkbox>
        </Col>
      </Row>
      <div className="mr-5">
        <span>Sinh ng??y: </span>
        <span>{ngaySinh && moment(ngaySinh).format("DD/MM/YYYY")}</span>
        {/*<DatePickerField
            value={ngaySinh && moment(ngaySinh)}
            label="Sinh ng??y:"
            placeholder="........ / ....... / ............."
          /> */}
      </div>
      <div className="mr-5">
        <span>?????a ch???: </span>
        {showAddress()}
      </div>
      {doiTuong === DOI_TUONG.BAO_HIEM && (
        <>
          <div className="mr-5">
            <span>S??? th??? b???o hi???m y t???:</span>
            <span> {maTheBhyt}</span>
            {/* <MultiInput className="mrl-5" sizeRange={[3, 3, 3, 8]} /> */}
          </div>

          <div className="mr-5">
            <span>H???n s??? d???ng t??? </span>
            <span>
              {tuNgayTheBhyt && moment(tuNgayTheBhyt).format("DD/MM/YYYY")}
            </span>
            <span> ?????n </span>
            <span>
              {denNgayTheBhyt && moment(denNgayTheBhyt).format("DD/MM/YYYY")}
            </span>{" "}
          </div>
        </>
      )}
      <div className="mr-5">
        <span>Ng??y kh??m b???nh: </span>
        <span>
          {thoiGianThucHien && moment(thoiGianThucHien).format("DD/MM/YYYY")}
        </span>{" "}
      </div>

      <TextField
        html={quaTrinhBenhLy}
        classNameLabel={dataSelect.quaTrinhBenhLy ? "" : "red"}
        label={`Qu?? tr??nh b???nh l??`}
        afterText={<span className="red"> *</span>}
        onChange={handleChangeData("quaTrinhBenhLy")}
        maxLength={1000}
        maxLine={3}
      />
      <div className="mr-5">
        <span className={(dsCdChinh || []).length === 0 ? "red" : ""}>
          Ch???n ??o??n <span className="red"> *</span>:
        </span>
        {(dsCdChinh || []).map((cd, index) => {
          if (dsCdChinh.length === index + 1) {
            return <span key={cd.id}>{cd.ten}</span>;
          }

          return <span key={cd.id}>{cd.ten}, </span>;
        })}
      </div>
      <div className="mr-5">
        <span>B???nh k??m theo: </span>
        {(dsCdKemTheo || []).map((cd, index) => {
          if (dsCdKemTheo.length === index + 1) {
            return <span key={cd.id}>{cd.ten}</span>;
          }

          return <span key={cd.id}>{cd.ten}, </span>;
        })}
      </div>

      {/* <TextField className="mr-5" label="Ch???n ??o??n" />
        <TextField className="mr-5" label="B???nh k??m theo" /> */}
      <TextField
        html={ghiChu}
        className="mr-5"
        maxLength={1000}
        maxLine={3}
        onChange={handleChangeData("ghiChu")}
        label="Ghi ch??"
      />
      <TextField
        html={loiDan}
        className="mr-5"
        maxLength={1000}
        maxLine={3}
        onChange={handleChangeData("loiDan")}
        label="L???i d???n"
      />
      <div className="mr-17">
        <span
          className={
            dataSelect.thoiGianHenKham || (thoiGianHenKham && moment(thoiGianHenKham)) ? "" : "red"
          }
        >
          H???n kh??m l???i v??o <span className="red"> *</span>{" "}
        </span>{" "}
        <DatePickerField
          value={dataSelect.thoiGianHenKham || (thoiGianHenKham && moment(thoiGianHenKham))}
          showTime={{ format: "HH:mm" }}
          customFormat={customFormat}
          disabledDate={checkDisabledDate}
          onChange={handleChangeData("thoiGianHenKham")}
          placeholder="gi??? ........ ng??y ........ th??ng ........ n??m ........."
        />
        <span>
          ho???c ?????n b???t k??? th???i ??i???m n??o tr?????c ng??y h???n kh??m n???u c?? d???u hi???u b???t
          th?????ng.
        </span>
      </div>
      <div className="mr-17">
        Gi???y h???n kh??m l???i c?? gi?? tr??? s??? d???ng 01 l???n trong th???i h???n 10 ng??y k??? t???
        ng??y h???n kh??m l???i.
      </div>
      <Row className="sign-box">
        <Col span={10}>
          <div className="sign-bottom mr-20">
            <div className="sign-bottom__title">B??C S??, Y S?? KH??M B???NH</div>
            <div>(K?? t??n)</div>
          </div>
        </Col>
        <Col span={12} offset={2}>
          <div className="sign-bottom">
            <div>
              {moment(thoiGianKetLuan || new Date()).format(
                "[ng??y] DD, [th??ng] MM, [n??m] YYYY"
              )}
            </div>
            <div className="sign-bottom__title">
              ?????I DI???N C?? S??? KH??M B???NH - CH???A B???NH
            </div>
            <div>(K?? t??n, ????ng d???u)</div>
          </div>
        </Col>
      </Row>
    </Main>
  );
};


export default FormHenKham;
