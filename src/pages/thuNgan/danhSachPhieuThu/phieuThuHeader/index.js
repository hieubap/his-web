import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { Button } from "antd";
import moment from "moment";
import { ROLES } from "constants/index";
import DatePicker from "components/DatePicker";
import AuthWrapper from "components/AuthWrapper";
import IconList from "assets/images/thuNgan/icList.svg";
import { TIME_FORMAT } from "../configs";
import locale from "antd/es/date-picker/locale/de_DE";
const PhieuThuHeader = ({ layerId }) => {
  const refDatePicker = useRef(null);
  const {
    danhSachPhieuThu: { chuaThanhToan, daThanhToan, tongSo, dataSearch },
  } = useSelector((state) => state);

  const {
    danhSachPhieuThu: { onChangeInputSearch, getStatistical },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const [timePayment, setTimePayment] = useState({
    thoiGianThanhToanTu: null,
    thoiGianThanhToanDen: null,
  });
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 9, //Tab
          onEvent: () => {
            refDatePicker.current && refDatePicker.current.focus();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    getStatistical(dataSearch);
  }, [dataSearch]);

  const handleChangeDate = (key) => (date) => {
    setTimePayment({ ...timePayment, [key]: date });
    onChangeInputSearch({
      [key]: date ? encodeURIComponent(moment(date).format()) : "",
    });
  };

  const handleStartDate = (time) => {
    return moment(time) > moment();
  };

  const handleEndDate = (time) => {
    return moment(time) < moment(timePayment.thoiGianThanhToanTu);
  };
  console.log(locale);
  return (
    <Main>
      <div className="left">
        <span className="left__title">Ngày thanh toán</span>
        <DatePicker
          ref={refDatePicker}
          format={TIME_FORMAT}
          showTime={true}
          disabledDate={handleStartDate}
          placeholder="Từ ngày"
          value={timePayment.thoiGianThanhToanTu}
          showTime={{ defaultValue: moment().startOf("day") }}
          onChange={handleChangeDate("thoiGianThanhToanTu")}
          locale={{
            ...locale,
            lang: {
              ...locale.lang,
              now: "Hiện tại",
            },
          }}
        />
        <span className="left__spread">-</span>
        <DatePicker
          showTime={true}
          format={TIME_FORMAT}
          placeholder="Đến ngày"
          disabledDate={handleEndDate}
          showTime={{ defaultValue: moment().endOf("day") }}
          value={timePayment.thoiGianThanhToanDen}
          onChange={handleChangeDate("thoiGianThanhToanDen")}
          locale={{
            ...locale,
            lang: {
              ...locale.lang,
              now: "Hiện tại",
            },
          }}
        />
      </div>
      <div className="right">
        <span>
          Tổng phiếu thu: <span className="bold">{tongSo || 0}</span>
        </span>
        <span>
          Chưa thanh toán: <span className="bold">{chuaThanhToan || 0}</span>
        </span>
        <span>
          Đã thanh toán: <span className="bold">{daThanhToan || 0}</span>
        </span>
        <AuthWrapper accessRoles={[ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]}>
          <Button className="btn-export">
            Xuất DS{" "}
            <span className="icon-export">
              <IconList />
            </span>
          </Button>
        </AuthWrapper>
      </div>
    </Main>
  );
};

export default PhieuThuHeader;
