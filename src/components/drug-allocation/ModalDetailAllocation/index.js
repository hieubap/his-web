import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
} from "react";
import { Main } from "./styled";
import { Button, Card } from "antd";
import detailImage from "assets/img/detail-drug.png";
import { useTranslation } from "react-i18next";

const ModalDetailAllocation = (props, ref) => {
  const refCallback = useRef(null);
  const { t } = useTranslation();

  const [state, _setState] = useState({
    search: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (item, callback) => {
      setState({
        show: true,
        item,
      });
      refCallback.current = callback;
    },
  }));
  const onClose = () => {
    setState({ show: false });
    if (refCallback.current) refCallback.current();
  };

  let nurseName = "";
  if (state?.item?.nhanVienCapPhat) {
    nurseName += state.item.nhanVienCapPhat.fullName || "";
    nurseName += " - " + state.item.nhanVienCapPhat.value || "";
    if (state?.item?.nhanVienCapPhat?.department) {
      if (nurseName) nurseName += " - ";
      nurseName += state?.item?.nhanVienCapPhat?.department?.name || "";
    }
  }
  return (
    <Main
      visible={state.show}
      style={{ maxWidth: 420 }}
      bodyStyle={{ padding: "24px 0 0 0" }}
      closable={false}
      centered
      onCancel={onClose}
      footer={[
        <div style={{ textAlign: "center" }}>
          <Button type="danger" onClick={onClose}>
            Đóng
          </Button>
        </div>,
      ]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Card
        bordered={false}
        cover={
          <img
            alt=""
            src={detailImage}
            style={{ maxWidth: 285, margin: "auto" }}
          />
        }
      >
        <div className="modal-des">
          <h4 className="title-des">CHI TIẾT CẤP PHÁT</h4>
          <p className="content-des">
            <span>{t("drugDistributions.distributionTime")}: </span>
            <span className="detail-txt">
              {state.item?.ngayCapPhat
                ?.toDateObject()
                .format("dd/MM/yyyy HH:mm")}
            </span>
          </p>
          <p className="content-des">
            <span>{t("drugDistributions.medicineDistributor")}:</span>
            <span className="detail-txt"> {nurseName}</span>
          </p>
        </div>
      </Card>
    </Main>
  );
};

export default forwardRef(ModalDetailAllocation);
