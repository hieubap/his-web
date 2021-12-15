import React, { useState, useRef, useEffect } from "react";
import { HeaderSearch, TitleSearch } from "./styled";
import { Button, Input, Col, Row, message } from "antd";
import { useHistory } from "react-router-dom";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import IconQrCode from "assets/images/thuNgan/qrCode.png";
import IconList from "assets/images/thuNgan/icList.png";
import IconArrowLeft from "assets/images/thuNgan/arrowLeft.png";
import { useDispatch } from "react-redux";

const TimKiemBenhNhan = (props) => {
  const { onRegisterHotkey } = useDispatch().phimTat;
  const { titleBack, backLink, icon, layerId } = props;
  const refInput = useRef(null);
  const history = useHistory();
  const [valueSearch, setValueSearch] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const onClickDsPhieuThu = () => {
    history.push(backLink || "/thu-ngan/danh-sach-phieu-thu");
  };
  const { searchNBDotDieuTri } = useDispatch().nbDotDieuTri;
  const { onSearch } = useDispatch().danhSachPhieuThu;

  useEffect(() => {
    if (refInput && refInput.current) {
      refInput.current.focus();
    }
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refInput.current.focus();
          },
        },
        {
          keyCode: titleBack ? 27 : 113, //F2
          onEvent: () => {
            if (titleBack) {
            }
            onClickDsPhieuThu();
          },
        },
        {
          keyCode: 112, //F1
          onEvent: () => {},
        },
      ],
    });
  }, []);

  const onKeyDown = (e) => {
    let param = {};
    if (e.key === "Enter") {
      let check = valueSearch?.trim();
      if (check) {
        if (/^[0-9]+$/.test(check)) {
          param = { maHoSo: Number(check) };
        } else {
          let arr = e.target.value.split(",");
          let checkMaHS = arr.filter((el) => {
            let convertEl = el.includes("”") ? el.split("”") : el.split('"');
            return convertEl.some((et) => et === "maHoSo");
          });
          checkMaHS = (checkMaHS.length && checkMaHS[0]) || "";
          let paramRes = checkMaHS
            ? checkMaHS.includes("”")
              ? checkMaHS.split("”")
              : checkMaHS.split('"')
            : [];
          paramRes = paramRes.filter((et) => /^[0-9]+$/.test(et));
          if (paramRes.length) {
            param = { maHoSo: Number(paramRes[0]) };
          }
        }
        submit(param);
      } else {
        return;
      }
    }
  };
  const submit = (param) => {
    if (param.maHoSo) {
      searchNBDotDieuTri(param).then((s) => {
        if (s.code === 0) {
          const { data } = s;
          if (data.length && data[0].id) {
            onSearch({
              page: 0,
              size: 9999,
              nbDotDieuTriId: data?.length && data[0].id,
            }).then((s) => {
              if (s.code === 0) {
                if (s.data?.length) {
                  history.push(
                    `/thu-ngan/chi-tiet-phieu-thu/${data[0].maHoSo}/${s.data[0].id}/${data[0].id}`
                  );
                } else {
                  message.error(
                    `Không tìm thấy thông tin phiếu thu của NB ${
                      data.length && data[0].khoa?.ten
                        ? "ở khoa " + data[0].khoa?.ten
                        : ""
                    }`
                  );
                }
              }
            });
          } else {
            message.error(
              `Không tìm thấy thông tin phiếu thu của NB ${
                data.length && data[0].khoa?.ten
                  ? "ở khoa " + data[0].khoa?.ten
                  : ""
              }`
            );
          }
        }
      });
    } else {
      message.error(`Không tìm thấy thông tin phiếu thu của NB `);
    }
    setValueSearch("");
  };
  const onChangeCode = (e) => {
    setValueSearch(e.target.value);
  };

  const onFocus = () => {
    if (refInput.current) {
      setFocusInput(true);
    }
  };
  const onBlur = () => {
    if (refInput.current) {
      setFocusInput(false);
    }
  };
  return (
    <HeaderSearch focusInput={focusInput}>
      <TitleSearch>Tìm người bệnh</TitleSearch>
      <Row align="middle">
        <AuthWrapper accessRoles={[ROLES["THU_NGAN"].TIM_NB]}>
          <Col md={6} sm={12} xs={24}>
            <div className="input-search">
              <Input
                placeholder="Quét QR NB hoặc nhập mã hồ sơ"
                onChange={onChangeCode}
                onKeyDown={onKeyDown}
                ref={refInput}
                autoFocus
                onFocus={onFocus}
                onBlur={onBlur}
                value={valueSearch}
              />
              <img src={IconQrCode} alt="IconQrCode" />
            </div>
          </Col>
        </AuthWrapper>
        <Col md={12} sm={12} xs={24} className="button-gopage">
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]}>
            <Button onClick={onClickDsPhieuThu}>
              {titleBack || "Danh sách phiếu thu"}
              <img src={icon || IconList} alt="IconList" />
            </Button>
          </AuthWrapper>
        </Col>
        <Col md={6} sm={8} xs={24} className="next-partient">
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].NB_TIEP_THEO]}>
            <Button>
              Người bệnh tiếp theo
              <img src={IconArrowLeft} alt="IconArrowLeft" />
            </Button>
          </AuthWrapper>
        </Col>
      </Row>
    </HeaderSearch>
  );
};

export default TimKiemBenhNhan;
