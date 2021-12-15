import React, { useState, useEffect, useRef, useMemo } from "react";
import { Select as SelectAntd } from "antd";
import { SelectGroup } from "../styled";
import {SelectGroupChuyenVien} from "./styled"
import { Main } from "./styled";
import TextField from "components/TextField";
import DatePickerField from "components/DatePickerField";
import moment from "moment";
import { DOI_TUONG, GIOI_TINH } from "constants/index";
import {  useSelector, useDispatch, connect } from "react-redux";
const { Option } = SelectAntd;

export const FormChuyenVien = (props) => {
  const getUtils = useDispatch().utils.getUtils;
  const getListAllNgheNghiep = useDispatch().ngheNghiep.getListAllNgheNghiep;
  const { infoNb } = useSelector((state) => state.khamBenh || {});
  
  const thongTinChiTiet = useSelector(
    (state) => state.khamBenh.thongTinChiTiet || {}
    );
  const { nbChuyenVien, nbChanDoan } = thongTinChiTiet;
  const { benhVien = {} } = useSelector((state) => state.auth.auth || {});
  const listAllBenhVien = useSelector(
    (state) => state.benhVien.listAllBenhVien || []
  );
  const listAllNgheNghiep = useSelector(
    (state) => state.ngheNghiep.listAllNgheNghiep || []
  );
  const listAllMaBenhChinh = useSelector(
    (state) => state.maBenh.listAllMaBenhChinh || []
  );
  const listtuyenBenhVien = useSelector(
    (state) => state.utils.listtuyenBenhVien || []
  );

  const { handleSetData } = props;

  const {
    dauHieuLamSang,
    ketQuaXnCls,
    phuongPhapDaSuDung,
    tinhTrangChuyenVien,
    huongDieuTri,
    thoiGianChuyenTuyen,
    phuongTienVanChuyen,
    nguoiHoTong,
  } = nbChuyenVien || {};

  const {
    tenNb,
    doiTuong,
    tuNgayTheBhyt,
    denNgayTheBhyt,
    maTheBhyt,
    tenXaPhuong,
    tenQuanHuyen,
    tenTinhThanhPho,
    gioiTinh,
    tuoi,
    tenDanToc,
    tenQuocGia,
  } = infoNb || {};
  const selectFirstRef = useRef();
  const [dataSelect, setDataSelect] = useState(() => {
    let nbChuyenVienClone = {...nbChuyenVien} || {}
    if (!nbChuyenVienClone.ngheNghiepId) {
      nbChuyenVienClone.ngheNghiepId = infoNb.ngheNghiepId;
    }
    return ({ nbChanDoan, nbChuyenVien : nbChuyenVienClone })
  });
  const [dimensionSelect, setDimensionSelect] = useState({
    firstHeight: "auto",
    secondHeight: "auto",
  });

  useEffect(() => {
    getUtils({ name: "tuyenBenhVien" });
    getListAllNgheNghiep();
  }, []);

  // useEffect(() => {
  //   if (nbChuyenVien) {
  //     if (!nbChuyenVien.ngheNghiepId) {
  //       nbChuyenVien.ngheNghiepId = infoNb.ngheNghiepId;
  //     }
  //     setDataSelect({ nbChanDoan, ...dataSelect, ...nbChuyenVien });
  //   }
  // }, [thongTinChiTiet]);

  useEffect(() => {
    setDimensionSelect({
      ...dimensionSelect,
      firstHeight: selectFirstRef.current.offsetHeight,
      firstWidth: selectFirstRef.current.offsetWidth,
    });
  }, [dataSelect]);

  const showAddress = () => {
    return `${tenXaPhuong || ""}${tenXaPhuong && tenQuanHuyen ? " - " : ""}${
      tenQuanHuyen || ""
    }${(tenXaPhuong || tenQuanHuyen) && tenTinhThanhPho ? " - " : ""}${
      tenTinhThanhPho || ""
    }`;
  };

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

  const optionBv = useMemo(
    () =>
      listAllBenhVien.map((bv) => {
        return (
          <Option key={bv.id} value={bv.id}>
            {bv.ten}
          </Option>
        );
      }),
    [listAllBenhVien]
  );
  const optionNn = useMemo(
    () =>
      listAllNgheNghiep.map((nn) => {
        return (
          <Option key={nn.id} value={nn.id}>
            {nn.ten}
          </Option>
        );
      }),
    [listAllNgheNghiep]
  );

  const getBenhVien = (benhVienId) => {
    return listAllBenhVien?.find((item) => item.id == benhVienId);
  };

  const handleChangeData = (key) => (values) => {
    handleSetData(["nbChuyenVien", [key]])(values);
    if (
      [
        "vienChuyenDenId",
        "dieuTriTai2Id",
        "dieuTriTuNgay2",
        "dieuTriDenNgay2",
        "dsChanDoanId",
        "thoiGianChuyenTuyen",
        "lyDoChuyenTuyen",
        "ngheNghiepId",
        "noiLamViec",
      ].includes(key)
    ) {
      setDataSelect({ ...dataSelect, [key]: values });
    }
  };

  const customFormat = (value) => {
    return `${value.hour()} giờ ${value.minute()} phút, ngày ${value.date()} tháng ${
      value.month() + 1
    } năm ${value.year()}`;
  };

  const getTuyen = (benhVien) => {
    return listtuyenBenhVien.find((item) => item.id == benhVien?.tuyenBenhVien)
      ?.ten;
  };

  const disableNgayChuyenTuyen = (date) => {
    if (infoNb?.thoiGianVaoVien) {
      if (date._d < infoNb?.thoiGianVaoVien) return true;
    }
    if (dataSelect.dieuTriDenNgay1) {
      if (date._d > dataSelect.dieuTriDenNgay1) return true;
    }
  };

  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };
  return (
    <Main className="form-detail">
      <div className="flex-center">
        <SelectGroup className="flex group-kinh-gui">
          <span className={`${dataSelect.nbChuyenVien.vienChuyenDenId ? "" : "red"}`}>
            Kính gửi <span className="red">*</span>:
          </span>
          <div className="select-box flex1">
            <SelectAntd
              showSearch
              value={dataSelect.nbChuyenVien.vienChuyenDenId}
              filterOption={filterOption}
              onChange={handleChangeData("vienChuyenDenId")}
            >
              {optionBv}
            </SelectAntd>
          </div>
        </SelectGroup>
      </div>
      <div className="mr-5 flex">
        <div className="flex1">
          <span>Cơ sở khám, chữa bệnh: </span>
          {benhVien?.ten}
        </div>
        <div className="width250">Trân trọng giới thiệu: </div>
      </div>
      <div className="mr-5 flex">
        <div className="flex1">
          <span>Họ và tên: </span>
          <span>{tenNb}</span>
        </div>
        <div className="width150">
          <span>Nam/Nữ: </span>
          <span>{gioiTinh === GIOI_TINH.NAM ? "Nam" : "Nữ"}</span>
        </div>
        <div className="width150">
          <span>Tuổi: </span>
          <span>{tuoi}</span>
        </div>
      </div>
      <div className="mr-5 mr-5">
        <span>Địa chỉ: </span>
        {showAddress()}
      </div>
      <div className="mr-5 flex">
        <div className="flex1">
          <span>Dân tộc: </span>
          {tenDanToc}
        </div>
        <div className="width300">
          <span>Quốc tịch: </span>
          {tenQuocGia}
        </div>
      </div>
      <div className="mr-5 flex">
        <SelectGroup className="flex1 flex  mr-0 mrr-20">
          <span>Nghề nghiệp: </span>
          <div className="select-box flex1">
            <SelectAntd
              showSearch
              filterOption={filterOption}
              value={dataSelect.nbChuyenVien.ngheNghiepId}
              onChange={handleChangeData("ngheNghiepId")}
              className="max-width mrh-5"
            >
              {optionNn}
            </SelectAntd>
          </div>
        </SelectGroup>
        <div className="width300">
          <TextField
            label="Nơi làm việc"
            maxLength={500}
            html={dataSelect.nbChuyenVien.noiLamViec}
            onChange={handleChangeData("noiLamViec")}
          />
        </div>
      </div>
      {doiTuong === DOI_TUONG.BAO_HIEM && (
        <>
          <div className="mr-5">
            <span>Số thẻ bảo hiểm y tế:</span>
            <span>{maTheBhyt}</span>
            {/* <MultiInput className="mrl-5" sizeRange={[3, 3, 3, 8]} /> */}
          </div>

          <div className="mr-5">
            <span>Hạn sử dụng: Từ </span>
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
        <div>Đã được khám bệnh/điều trị</div>
        <div className="mr-5 flex">
          <div className="flex1">
            <span>+ Tại: </span>
            <span>{nbChuyenVien?.dieuTriTai1?.ten || benhVien?.ten}</span>
          </div>
          <div className="width100">
            (
            <span>
              {getTuyen(nbChuyenVien?.dieuTriTai1 || benhVien) || "Tuyến: "}
            </span>
            )
          </div>
          <div className="width180">
            <span>Từ ngày: </span>
            <span>{moment(infoNb?.thoiGianVaoVien).format("DD/MM/YYYY")}</span>
          </div>
          <div className="width180">
            <span>Đến ngày: </span>
            <DatePickerField
              value={
                dataSelect.dieuTriDenNgay1
                  ? moment(dataSelect.dieuTriDenNgay1)
                  : moment(new Date())
              }
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              onChange={handleChangeData("dieuTriDenNgay1")}
              className="p-5"
            />
          </div>
        </div>
        <div className="mr-5 flex">
          <div className="flex1">
            <SelectGroup className="flex mr-0">
              <span>+ Tại: </span>
              <div className="select-box flex1">
                <SelectAntd
                  showSearch
                  filterOption={filterOption}
                  value={dataSelect.nbChuyenVien.dieuTriTai2Id}
                  onChange={handleChangeData("dieuTriTai2Id")}
                  style={{ width: "100%" }}
                >
                  {optionBv}
                </SelectAntd>
              </div>
            </SelectGroup>
          </div>
          <div className="width100">
            (
            <span>
              {getTuyen(
                nbChuyenVien?.dieuTriTai2 ||
                  getBenhVien(dataSelect.dieuTriTai2Id)
              ) || "Tuyến: "}
            </span>
            )
          </div>
          <div className="width180">
            <span>Từ ngày: </span>
            <DatePickerField
              value={
                dataSelect.dieuTriTuNgay2 && moment(dataSelect.dieuTriTuNgay2)
              }
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              onChange={handleChangeData("dieuTriTuNgay2")}
              className="p-5"
            />
          </div>
          <div className="width180">
            <span>Đến ngày: </span>
            <DatePickerField
              value={
                dataSelect.dieuTriDenNgay2 && moment(dataSelect.dieuTriDenNgay2)
              }
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              onChange={handleChangeData("dieuTriDenNgay2")}
              className="p-5"
            />
          </div>
        </div>
      </div>
      <h3 className="mr-17" style={{ marginBottom: "5px" }}>
        TÓM TẮT BỆNH ÁN
      </h3>
      <TextField
        label="Dấu hiệu lâm sàng"
        html={dauHieuLamSang}
        onChange={handleChangeData("dauHieuLamSang")}
      />
      <TextField
        label="Kết quả xét nghiệm, cận lâm sàng"
        html={ketQuaXnCls}
        onChange={handleChangeData("ketQuaXnCls")}
      />
      <SelectGroupChuyenVien dimension={dimensionSelect} className="mr-0">
        <span>Chẩn đoán bệnh: </span>
        <div className="select-box-chuyen-vien" ref={selectFirstRef}>
          <SelectAntd
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            value={(
              dataSelect.dsChanDoanId ||
              dataSelect?.nbChanDoan?.dsCdChinhId ||
              []
            ).map((item) => item + "")}
            onChange={handleChangeData("dsChanDoanId")}
          >
            {optionCd}
          </SelectAntd>
        </div>
      </SelectGroupChuyenVien>
      <TextField
        label="Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị"
        html={phuongPhapDaSuDung}
        onChange={handleChangeData("phuongPhapDaSuDung")}
      />
      <TextField
        label="Tình trạng người bệnh lúc chuyển tuyến"
        html={tinhTrangChuyenVien}
        onChange={handleChangeData("tinhTrangChuyenVien")}
      />
      <div>
        Lý do chuyển tuyến: Tick chọn vào lý do chuyển tuyến phù hợp sau đây:
      </div>
      <div className="ly-do-chuyen-tuyen">
        <div
          className="checkbox-panel"
          onClick={() => handleChangeData("lyDoChuyenTuyen")(1)}
        >
          {(!dataSelect.lyDoChuyenTuyen || dataSelect.lyDoChuyenTuyen == 1) && (
            <i></i>
          )}
        </div>
        <div>1. Đủ điều kiện chuyển tuyến</div>
      </div>
      <div className="ly-do-chuyen-tuyen">
        <div
          className="checkbox-panel"
          onClick={() => handleChangeData("lyDoChuyenTuyen")(2)}
        >
          {dataSelect.lyDoChuyenTuyen == 2 && <i></i>}
        </div>
        <div>
          2. Theo yêu cầu của người bệnh hoặc người đại diện hợp pháp của người
          bệnh.
        </div>
      </div>

      <TextField
        label="Hướng điều trị"
        html={huongDieuTri}
        onChange={handleChangeData("huongDieuTri")}
      />
      <div>
        <span>Chuyển tuyến hồi: </span>
        <DatePickerField
          disabledDate={disableNgayChuyenTuyen}
          showTime={{ format: "HH:mm" }}
          customFormat={customFormat}
          value={thoiGianChuyenTuyen && moment(thoiGianChuyenTuyen)}
          onChange={handleChangeData("thoiGianChuyenTuyen")}
          placeholder=".... giờ .... phút, ngày .... tháng .... năm 20..."
        />
      </div>
      <TextField
        className="sign-location"
        label="Phương tiện vận chuyển"
        html={phuongTienVanChuyen}
        onChange={handleChangeData("phuongTienVanChuyen")}
      />
      <TextField
        label="Họ tên, chức danh, trình độ chuyên môn của người hộ tống"
        html={nguoiHoTong}
        onChange={handleChangeData("nguoiHoTong")}
      />
    </Main>
  );
};
export default FormChuyenVien;
