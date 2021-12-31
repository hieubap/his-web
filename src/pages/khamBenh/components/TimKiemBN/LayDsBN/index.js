import { Row, Col } from "antd";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Main, ButtonSearch, ButtonGoToPage } from "../styled";
import IconArrowLeft from "assets/images/thuNgan/arrowLeft.png";
import IconCancel from "assets/images/khamBenh/iconCancel.png";
import IconList from "assets/images/thuNgan/icList.png";
import ModalDanhSachBN from "../../ModalDanhSachBN";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import { ModalNotification2 } from "components/ModalConfirm";

export const LayDSBN = ({ layerId }) => {
  const refModalDanhSachBN = useRef(null);
  const refFuncGetNbTiepTheo = useRef(null);
  const refDsNb = useRef(null);
  const { boQuaKham, nguoiBenhTiepTheo, kiemTraTrangThaiLoadNguoiBenh } =
    useDispatch().khamBenh;
  const { onRegisterHotkey } = useDispatch().phimTat;
  const onShowDsNb = () => {
    if (refModalDanhSachBN.current) {
      refModalDanhSachBN.current.show();
    }
  };
  const boQuaNb = () => {
    boQuaKham({ loadNbTiepTheo: true });
  };
  useEffect(() => {}, []);
  const refModalNotification2 = useRef(null);
  const onGetNbTiepTheo = () => {
    kiemTraTrangThaiLoadNguoiBenh()
      .then((s) => {
        nguoiBenhTiepTheo();
      })
      .catch((e) => {
        refModalNotification2.current &&
          refModalNotification2.current.show(
            {
              content: e,
              cancelText: "Huỷ",
              okText: "Xác nhận",
              showBtnOk: true,
              typeModal: "warning",
            },
            () => {
              nguoiBenhTiepTheo();
            },
            () => {}
          );
      });
  };
  refFuncGetNbTiepTheo.current = onGetNbTiepTheo;
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refFuncGetNbTiepTheo.current && refFuncGetNbTiepTheo.current();
          },
        },
        {
          keyCode: 118, //F1
          onEvent: (e) => {
            refDsNb.current && refDsNb.current.click();
          },
        },
      ],
    });
  }, []);
  return (
    <Main>
      <Row align="middle" gutter={4}>
        {checkRole([ROLES["KHAM_BENH"].GOI_NB_TIEP_THEO]) && (
          <Col xs={24} md={8}>
            <ButtonSearch onClick={onGetNbTiepTheo}>
              NB tiếp theo
              <img src={IconArrowLeft} alt="IconArrowLeft" />
            </ButtonSearch>
          </Col>
        )}
        <Col xs={24} md={8}>
          <ButtonGoToPage onClick={onShowDsNb} ref={refDsNb}>
            Danh sách NB
            <img src={IconList} alt="IconList" />
          </ButtonGoToPage>
        </Col>
        <Col xs={24} md={8}>
          <ButtonSearch color="#0050d3" onClick={boQuaNb}>
            Bỏ qua
            <img src={IconCancel} alt="IconCancel" />
          </ButtonSearch>
        </Col>
      </Row>
      <ModalDanhSachBN
        ref={refModalDanhSachBN}
        refModalNotification2={refModalNotification2}
      />
      <ModalNotification2 ref={refModalNotification2} />
    </Main>
  );
};

export default LayDSBN;
