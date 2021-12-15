import React, { memo, useEffect, useRef } from "react";
import { Row, Col, Input } from "antd";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import QuayTiepDon from "./QuayTiepDon";
import ButtonNguoiBenhTiepTheo from "../ButtonNguoiBenhTiepTheo";
import CustomButton from "../CustomeButton";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { addPrefixNumberZero } from "utils";
import moment from "moment";
import { LENGTH_ZERO_PREFIX } from "./configs";
import IcThongKe from "assets/svg/tiep-don/iconThongKe.svg";
import Icon from "@ant-design/icons";

const DanhSachBenhNhan = ({
  showTabThongTin,
  onChange,
  disabled,
  onGiamDinhThe,
  ...props
}) => {
  const refTimeoutSearchSTT = useRef(null);
  const {
    dongQuay,
    searchGoiSo,
    updateData: updateDataGoiSo,
  } = useDispatch().goiSo;
  const { getAllQuayTiepDon } = useDispatch().quayTiepDon;

  const { readOnlyDsGoiNho, quayTiepDonId, nbTiepTheo } = useSelector(
    (state) => state.goiSo
  );
  const { stt, disableTiepDon } = useSelector((state) => state.tiepDon);

  const onKeyDownStt = (event) => {
    if (event.nativeEvent.key === "Enter") {
      if (refTimeoutSearchSTT.current) {
        //nếu đang có 1 timeout chờ search stt thì clear timeout đi
        clearTimeout(refTimeoutSearchSTT.current);
        refTimeoutSearchSTT.current = null;
      }
      onSearch(stt);
    }
  };

  const onSearch = (stt) => {
    searchGoiSo({ stt }, true)
      .then((data) => {
        if (data.maTheBhyt)
          onGiamDinhThe &&
            onGiamDinhThe({
              data: {
                hoTen: data.tenNb,
                ngaySinh: data.ngaySinh,
                maThe: data.maTheBhyt,
              },
              tenNb: data.tenNb,
              diaChi: data.diaChi,
            });
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (disabled) {
      updateDataGoiSo({ readOnlyDsGoiNho: true });
    }
  }, [disabled]);

  useEffect(() => {
    getAllQuayTiepDon(); //lấy tất cả quầy tiếp đón
    return () => {
      //unmount
      if (refTimeoutSearchSTT.current) {
        //clear timeout search stt
        clearTimeout(refTimeoutSearchSTT.current);
      }
    };
  }, []);
  const onChangeSTT = (e) => {
    onChange(Number(e.target.value), "stt");
    if (refTimeoutSearchSTT.current) {
      //khi thay đổi dữ liệu trường stt thì clear timeout search theo stt hiện tại
      clearTimeout(refTimeoutSearchSTT.current);
    }
    refTimeoutSearchSTT.current = setTimeout(
      //đồng thời tạo mới 1 timeout mới (5s) để tự động search
      (value) => {
        onSearch(value);
      },
      5000,
      e.target.value
    );
  };

  const onClose = () => {
    if (!disabled && quayTiepDonId) {
      dongQuay({ quayHienTai: quayTiepDonId });
    }
  };

  return (
    <Main className="container">
      <Row md={24} xl={24} xxl={24} style={{ float: "right" }}>
        <div
          className="btn-thong-ke"
          onClick={() => {
            showTabThongTin && showTabThongTin({ isVisible: true });
          }}
        >
          Xem thống kê
          <Icon component={IcThongKe} />
        </div>
      </Row>
      <Row className="second-row" style={{ paddingBottom: 6 }}>
        <Col md={15} xl={15} xxl={15}>
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].CHON_QUAY]}>
            <QuayTiepDon disabled={disabled} />
          </AuthWrapper>
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].NB_TIEP_THEO]}>
            <ButtonNguoiBenhTiepTheo
              disabled={disabled}
              className={readOnlyDsGoiNho || disabled ? " disable-button" : ""}
            />
          </AuthWrapper>
        </Col>
        <Col md={9} xl={9} xxl={9}>
          {/* <AuthWrapper accessRoles={[ROLES["TIEP_DON"].DS_NHO]}>
            <DanhSachGoiNho getListGoiNho={props.getListGoiNho} />
          </AuthWrapper> */}
          <div className="item-input">
            <Input
              onChange={onChangeSTT}
              placeholder="Nhập STT tiếp đón"
              onKeyDown={onKeyDownStt}
              disabled={disableTiepDon || disabled}
              value={addPrefixNumberZero(stt, LENGTH_ZERO_PREFIX)}
            />
          </div>
          {/* <div className="mt-10">
            <CustomButton
              disabled={disabled}
              title="Danh sách người bệnh"
              icon={require("assets/images/welcome/menu.png")}
              onClick={() => {
                showTabThongTin && showTabThongTin({ isVisible: true });
              }}
            />
          </div> */}
          <div className="mt-10">
            <CustomButton
              className="close"
              border="none"
              color="#0762F7"
              title="Đóng quầy"
              icon={require("assets/images/welcome/cancel.png")}
              onClick={onClose}
            />
          </div>
        </Col>
      </Row>
      <Row className="second-row" style={{ zIndex: 1019 }}>
        <Col md={24} xl={24} xxl={24}>
          <div className="elipsis">
            {nbTiepTheo?.stt && <b>{addPrefixNumberZero(nbTiepTheo?.stt)} </b>}
            {nbTiepTheo?.tenNb && <span>{nbTiepTheo?.tenNb}</span>}
            {nbTiepTheo?.ngaySinh && (
              <span>
                {" - "}
                {moment(nbTiepTheo?.ngaySinh)?._d?.getAge()}T
              </span>
            )}
          </div>
        </Col>
      </Row>
    </Main>
  );
};

export default memo(DanhSachBenhNhan);
