import React, { useState, useEffect, useMemo, useRef } from "react";
import { Input, Row, Col, Select as SelectAntd } from "antd";
import { PhieuChiDinhWrapper, SelectGroup } from "../styled";
import { SelectGroupNhapVien } from "./styled";
import TextField from "components/TextField";
import DatePickerField from "components/DatePickerField";
import Checkbox from "components/Checkbox";
import moment from "moment";
import { DOI_TUONG, GIOI_TINH } from "constants/index";
import { DivInfo } from "../../KhamCoBan/styled";
import IcSave from "assets/images/khamBenh/icSave.svg";
import { useSelector } from "react-redux";
// import { join } from "lodash";

const { Option } = SelectAntd;

const FormNhapVien = (props) => {
  const selectFirstRef = useRef();
  const { dataTIEU_DE_TRAI_1 } = useSelector((state) => state.thietLap);
  const infoNb = useSelector((state) => state.khamBenh.infoNb || {});
  const thongTinChiTiet = useSelector(
    (state) => state.khamBenh.thongTinChiTiet || {}
  );
  const { benhVien = {} } = useSelector((state) => state.auth.auth || {});
  const listAllKhoa = useSelector((state) => state.khoa.listAllKhoa || []);
  const listAllNgheNghiep = useSelector(
    (state) => state.ngheNghiep.listAllNgheNghiep || []
  );
  const { nbChiSoSong, nbHoiBenh, nbDvKyThuat, nbNhapVien, nbKhamXet } =
    thongTinChiTiet;
  const { handleSetData, updateChiSoSong } = props;

  // const listAllNhomBenhChinh = useSelector(
  //   (state) => state.nhomBenh.listAllNhomBenhChinh || []
  // );
  const listAllMaBenhChinh = useSelector(
    (state) => state.maBenh.listAllMaBenhChinh || []
  );
  const listAllNhomBenhPhu1 = useSelector(
    (state) => state.nhomBenh.listAllNhomBenhPhu1 || []
  );
  const [dimensionSelect, setDimensionSelect] = useState({
    firstHeight: "auto",
    secondHeight: "auto",
  });
  const { quaTrinhBenhLy, tienSuBanThan, tienSuGiaDinh } = nbHoiBenh || {};
  const { cacBoPhan, toanThan, luuY } = nbKhamXet || {};
  const { mach, nhietDo, huyetApTamThu, huyetApTamTruong, nhipTho } =
    nbChiSoSong || {};
  const { phongThucHien } = nbDvKyThuat || {};
  const { lyDoVaoVien, daXuLy } = nbNhapVien || {};
  const {
    soNha,
    noiLamViec,
    tenNb,
    gioiTinh,
    tuoi,
    ngaySinh,
    danToc,
    xaPhuong,
    quanHuyen,
    tinhThanhPho,
    ngheNghiep,
    tenNguoiBaoLanh,
    soDienThoaiNguoiBaoLanh,
    maTheBhyt,
    denNgayTheBhyt,
    lyDoDenKham,
    thoiGianVaoVien,
  } = infoNb;
  const [chiSoSong, setChiSoSong] = useState({});
  const [dataSelect, setDataSelect] = useState(() => ({
    ...thongTinChiTiet?.nbChanDoan,
    ...thongTinChiTiet?.nbNhapVien,
    ...infoNb,
  }));
  const [highlight, setHighlight] = useState(true);

  const dateTimeFormat = (value) => {
    return `${value.hours()} giờ ${value.minutes()} phút         ngày ${value.date()} tháng ${
      value.month() + 1
    } năm ${value.year()}`;
  };

  useEffect(() => {
    setDimensionSelect({
      ...dimensionSelect,
      firstHeight: selectFirstRef.current.offsetHeight,
      firstWidth: selectFirstRef.current.offsetWidth,
    });
  }, [dataSelect]);

  useEffect(() => {
    setChiSoSong(nbChiSoSong);
  }, [nbChiSoSong]);

  useEffect(() => {
    // if (thongTinChiTiet?.nbNhapVien) {
    setDataSelect({
      ...thongTinChiTiet?.nbChanDoan,
      ...thongTinChiTiet?.nbNhapVien,
      ...infoNb,
    });
    // }
  }, [thongTinChiTiet]);

  // let { tenChanDoan } = useMemo(() => {
  //   // let listFilter =  listAllNhomBenhChinh.filter(o1 =>  props.thongTinChiTiet?.nbChanDoan?.dsCdChinhId.some(o2 => o1.id === o2))
  //   let listFilter = listAllMaBenhChinh.filter((o1) =>
  //     props.thongTinChiTiet?.nbChanDoan?.dsCdChinhId.some((o2) => o1.id === o2)
  //   );
  //   let tenChanDoan = join(
  //     listFilter.map((element) => {
  //       return element.ten;
  //     })
  //   );
  //   return {
  //     tenChanDoan,
  //   };
  // }, [props.thongTinChiTiet, listAllMaBenhChinh]);

  const optionCd = useMemo(
    () =>
      listAllMaBenhChinh.map((item, index) => {
        return (
          <Option
            key={index}
            value={item?.id + ""}
          >{`${item?.ma} - ${item?.ten}`}</Option>
        );
      }),
    [listAllMaBenhChinh]
  );

  const handleChangeData = (key) => (values) => {
    if ("khoaNhapVienId" === key) {
      setHighlight(!values);
    }
    handleSetData(["nbNhapVien", key])(values);
    setDataSelect({ ...dataSelect, [key]: values });
  };

  const handleChangeChiSoSong = (key) => (e) => {
    setChiSoSong({ ...chiSoSong, [key]: e.currentTarget.innerHTML });
  };

  const hanleClickSave = () => {
    const { id } = infoNb;

    if (!id) return;

    updateChiSoSong({ id, ...chiSoSong });
  };

  const customFormat = (value) => {
    return `giờ ${value.hour()}h ngày ${value.date()} tháng ${
      value.month() + 1
    } năm ${value.year()}`;
  };

  const children = listAllKhoa.map((khoa) => {
    return (
      <Option key={khoa.id} value={khoa.id}>
        {khoa.ten}
      </Option>
    );
  });
  const ngheNghiepOption = listAllNgheNghiep.map((item) => {
    return (
      <Option key={item.id} value={item.id}>
        {item.ten}
      </Option>
    );
  });
  return (
    <PhieuChiDinhWrapper>
      <div className="form-detail">
        <div className="flex-center">
          <div style={{ width: "100%", textAlign: "center" }}>
            <span style={{ width: "100%" }}>BUỒNG KHÁM BỆNH: </span>
            {phongThucHien.ten
              ? phongThucHien.ten
              : "..........................."}
          </div>
          <div></div>
        </div>
        <Row className="mr-5">
          <Col span={12}>
            <span>Sở y tế: </span>
            <span>{dataTIEU_DE_TRAI_1}</span>
          </Col>
          <Col span={8} offset={4}>
            <TextField
              label="MS"
              html={"42/BV-01"}
              disabled={true}
              displayDot={false}
            />
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={12}>
            <TextField label="Bệnh viện" html={benhVien?.ten} disabled={true} />
          </Col>
          <Col span={8} offset={4}>
            <TextField label="Số vào viện" html={""} disabled={true} />
          </Col>
        </Row>
        <h3 className="mr-17">I. HÀNH CHÍNH</h3>
        <Row className="mr-5">
          <Col span={12}>
            <TextField
              label="1. Họ và tên (In hoa)"
              html={tenNb}
              disabled={true}
            />
          </Col>
          <Col span={7} offset={2}>
            <TextField
              label="2. Sinh ngày"
              html={ngaySinh && moment(ngaySinh).format("DD/MM/YYYY")}
              disabled={true}
            />
          </Col>
          <Col span={2} offsset={1}>
            <TextField label="Tuổi" html={tuoi} disabled={true} />
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={12}>
            <span>3. Giới tính: </span>
            <Checkbox checked={gioiTinh === GIOI_TINH.NAM}>Nam</Checkbox>
            <Checkbox checked={gioiTinh === GIOI_TINH.NU}>Nữ</Checkbox>
          </Col>
          <Col span={10} offset={2}>
            <SelectGroup style={{ width: "100%" }}>
              <span style={{ width: "35%" }}>4. Nghề nghiệp: </span>
              <div className="select-box" style={{ width: "65%" }}>
                <SelectAntd
                  value={dataSelect?.ngheNghiepId}
                  onChange={handleChangeData("ngheNghiepId")}
                  style={{ width: "100%" }}
                >
                  {ngheNghiepOption}
                </SelectAntd>
              </div>
            </SelectGroup>
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={12}>
            <TextField
              label="5. Dân tộc"
              html={dataSelect.tenDanToc}
              disabled={true}
            />
          </Col>
          <Col span={10} offset={2}>
            <TextField label="6. Ngoại kiều" disabled={true} />
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={14}>
            <TextField
              label="7. Địa chỉ: Số nhà/Thôn/Xóm"
              html={dataSelect.soNha}
              disabled={true}
            />
          </Col>
          {/* <Col span={8}>
            <TextField label="Thôn, phố:" html={soNha} disabled={true} />
          </Col> */}
          <Col span={10}>
            <TextField
              label="Xã, Phường"
              html={dataSelect.tenXaPhuong}
              disabled={true}
            />
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={14}>
            <TextField
              label="Huyện (Q.TX)"
              html={dataSelect.tenQuanHuyen}
              disabled={true}
            />
          </Col>
          <Col span={10}>
            <TextField
              label="Tỉnh, thành phố"
              html={dataSelect.tenTinhThanhPho}
              disabled={true}
            />
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={10}>
            <TextField
              label="8. Nơi làm việc"
              html={noiLamViec}
              disabled={true}
            />
          </Col>
          <Col span={14}>
            <span style={{ marginRight: "20px" }}>9. Đối tượng:</span>
            <Checkbox checked={infoNb.doiTuong === DOI_TUONG.BAO_HIEM}>
              1.BHYT
            </Checkbox>
            <Checkbox checked={infoNb.doiTuong === DOI_TUONG.KHONG_BAO_HIEM}>
              2.Thu phí{" "}
            </Checkbox>
            <Checkbox checked={false}>3.Miễn giảm </Checkbox>
            <Checkbox checked={false}>4.Khác </Checkbox>
          </Col>
        </Row>
        <Row className="mr-5">
          <Col span={14}>
            <span>10. BHYT giá trị đến ngày </span>{" "}
            <span>
              {denNgayTheBhyt ? moment(denNgayTheBhyt).format("DD") : "......."}
            </span>
            <span> tháng </span>{" "}
            <span>
              {denNgayTheBhyt ? moment(denNgayTheBhyt).format("MM") : "......."}
            </span>
            <span> năm </span>
            <span>
              {denNgayTheBhyt
                ? moment(denNgayTheBhyt).format("YYYY")
                : "......."}
            </span>
          </Col>
          <Col span={10}>
            <span>Số thẻ BHYT </span>
            <Input
              style={{ width: "15%" }}
              defaultValue={maTheBhyt && maTheBhyt.substring(0, 2)}
              disabled
            />{" "}
            <Input
              style={{ width: "10%" }}
              defaultValue={maTheBhyt && maTheBhyt.substring(2, 3)}
              disabled
            />{" "}
            <Input
              style={{ width: "15%" }}
              defaultValue={maTheBhyt && maTheBhyt.substring(3, 5)}
              disabled
            />{" "}
            <Input
              style={{ width: "32%" }}
              defaultValue={maTheBhyt && maTheBhyt.substring(5)}
              disabled
            />{" "}
          </Col>
        </Row>
        <div>11. Họ tên, địa chỉ người nhà khi cần báo tin: </div>
        <TextField
          className="mr-5"
          label={" "}
          displayColon={false}
          html={tenNguoiBaoLanh}
        />
        <Row className="mr-5">
          <Col span={10}>
            <TextField label={" "} displayColon={false} />
          </Col>
          <Col span={14}>
            <TextField label="Điện thoại số" html={soDienThoaiNguoiBaoLanh} />
          </Col>
        </Row>

        <div className="mr-5">
          <TextField
            label="12. Đến khám bệnh lúc"
            html={
              thoiGianVaoVien &&
              `${moment(thoiGianVaoVien).get("hour")} giờ ${moment(
                thoiGianVaoVien
              ).get("minute")} phút 
              ngày ${moment(thoiGianVaoVien).get("date")} tháng ${
                moment(thoiGianVaoVien).get("month") + 1
              } năm ${moment(thoiGianVaoVien).get("year")}`
            }
            disabled={true}
          />
          {/* <span>12. Đến khám bệnh lúc: </span>
          <DatePickerField
            showTime={{ format: "HH:mm" }}
            customFormat={dateTimeFormat}
            onChange={handleChangeData("thoiGianHenKham")}
            defaultValue= {moment(thoiGianVaoVien, "YYYY-MM-DDTHH:mm:ss")}
            placeholder="......giờ ........phút        ngày ........ tháng ......... năm ........."
            disabled
          /> */}
        </div>
        <div className="mr-5">
          <TextField
            label="13. Chẩn đoán của nơi giới thiệu"
            html={infoNb.cdNoiGioiThieu}
          />
        </div>
        <div className="mr-5 reason">
          <TextField
            label="II. LÝ DO VÀO VIỆN"
            html={lyDoDenKham}
            onChange={handleChangeData("lydoVaoVien")}
          />
        </div>
        <h3 className="mr-17">III. HỎI BỆNH</h3>
        <div className="mr-5">
          <TextField
            label="1. Quá trình bệnh lý"
            onChange={handleChangeData("quaTrinhBenhLy")}
            html={quaTrinhBenhLy}
          />
        </div>
        <div className="mr-5">2. Tiền sử bệnh:</div>
        <div className="mr-5">
          <TextField label="- Bản thân" html={tienSuBanThan} />
        </div>
        <div className="mr-5">
          <TextField label="- Gia đình" html={tienSuGiaDinh} />
        </div>
        <h3 className="mr-17">IV. KHÁM XÉT</h3>
        <Row className="mr-5">
          <Col span={14}>
            <div className="mr-5">
              <TextField label="1. Toàn thân" html={toanThan} />
            </div>
            <div className="mr-5">
              <TextField label="2. Các bộ phận" html={cacBoPhan} />
            </div>
            <TextField label="3. Tóm tắt kết quả lâm sàng" />
            {/* <TextField label="4. Chẩn đoán vào viện" html={tenChanDoan} /> */}
            <SelectGroupNhapVien dimension={dimensionSelect} className="mr-0">
              <span>4. Chẩn đoán bệnh: </span>
              <div className="select-box-nhap-vien" ref={selectFirstRef}>
                <SelectAntd
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  value={(
                    dataSelect.dsChanDoanId ||
                    dataSelect?.dsCdChinhId ||
                    []
                  ).map((item) => item + "")}
                  onChange={handleChangeData("dsChanDoanId")}
                >
                  {optionCd}
                </SelectAntd>
              </div>
            </SelectGroupNhapVien>
          </Col>
          <Col span={6} offset={2}>
            <div className="save-info">
              Cập nhật <IcSave onClick={hanleClickSave} />
            </div>
            <DivInfo>
              <TextField
                label="Mạch"
                html={mach}
                maxLine={1}
                style={{ width: 100 }}
                onChange={handleChangeChiSoSong("mach")}
              />
              <span>lần/phút</span>
            </DivInfo>
            <DivInfo>
              <TextField
                label="Nhiệt độ"
                maxLine={1}
                html={nhietDo}
                style={{ width: 120 }}
                onChange={handleChangeChiSoSong("nhietDo")}
              />
              <span>C0</span>
            </DivInfo>
            <DivInfo>
              <TextField
                label="Huyết áp"
                maxLine={1}
                html={huyetApTamThu}
                style={{ width: 120 }}
                onChange={handleChangeChiSoSong("huyetApTamTruong")}
              />
              <TextField
                label="/"
                displayColon={false}
                maxLine={1}
                style={{ width: 40 }}
                html={huyetApTamTruong}
                onChange={handleChangeChiSoSong("huyetApTamThu")}
              />
              <span> mmHg</span>
            </DivInfo>
            <DivInfo maxWidth={177}>
              <TextField
                label="Nhịp thở"
                maxLine={1}
                html={nhipTho}
                style={{ width: 120 }}
                onChange={handleChangeChiSoSong("nhipTho")}
              />
              <span>lần/phút</span>
            </DivInfo>
          </Col>
        </Row>
        <TextField
          className="mr-5"
          html={daXuLy}
          onChange={handleChangeData("daXuLy")}
          label="5. Đã xử lý (thuốc, chăm sóc...)"
        />
        <SelectGroup style={{ width: "100%" }}>
          <span
            style={
              highlight ? { width: "21%", color: "red" } : { width: "21%" }
            }
          >
            6. Cho vào điều trị tại khoa:{" "}
          </span>
          <div className="select-box" style={{ width: "79%" }}>
            <SelectAntd
              value={dataSelect.khoaNhapVienId}
              onChange={handleChangeData("khoaNhapVienId")}
              style={{ width: "100%" }}
            >
              {children}
            </SelectAntd>
          </div>
        </SelectGroup>
        <TextField className="mr-5" label="7. Chú ý" />

        <Row className="sign-box">
          <Col span={12}></Col>
          <Col span={12}>
            <div className="sign-bottom text-center">
              <div>
                {/* <TextField className="sign-bottom__text" /> */}
                {/* {","} */}
                <DatePickerField placeholder="..... ngày ..... tháng ..... năm ....." />
              </div>
              <div className="sign-bottom__title">
                <b>BÁC SĨ KHÁM BỆNH</b>
              </div>
              <div className="sign-bottom__sign">(Ký tên, đóng dấu)</div>
            </div>
          </Col>
        </Row>
      </div>
    </PhieuChiDinhWrapper>
  );
};

export default FormNhapVien;
