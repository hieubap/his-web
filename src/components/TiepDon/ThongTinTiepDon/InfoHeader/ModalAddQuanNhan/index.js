import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Main } from "components/TiepDon/ThongTinTiepDon/InfoHeader/ModalAddCapCuu/styled";
import { Col } from "antd";
import Select from "components/Select";
import Modal from "components/TiepDon/Modal";
import { connect } from "react-redux";

const ModalAddQuanNhan = (props, ref) => {
  const refCallback = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      setState({
        show: item.show,
        donViId: item?.donViId,
        nguoiDaiDienId: item?.nguoiDaiDienId,
        chucVuId: item?.chucVuId,
        quanHamId: item?.quanHamId,
      });
      refCallback.current = callback;
    },
  }));
  const {
    donViId,
    nguoiDaiDienId,
    chucVuId,
    quanHamId,
    checkValidate
  } = state;
  const onOK = () => {
    if (donViId && chucVuId && quanHamId) {
      setState({
        show: false,
        checkValidate: false,
      });
      let obj = {
        donViId,
        nguoiDaiDienId,
        chucVuId,
        quanHamId,
      };
      if (refCallback.current) refCallback.current(obj);
    } else {
      setState({ checkValidate: true });
    }
  };
  const onBack = () => {
    setState({ show: false });
  };
  const onChange = (value, variables) => {
    setState({ [`${variables}`]: value });
  };
  useEffect(() => {
    props.getListAllChucVu();
    props.getListAllDonVi();
    props.getListAllQuanHam();
    props.getListAllNguoiDaiDien();
  }, []);
  return (
    <Modal
      closable={false}
      width={600}
      show={state.show}
      typeModal="infoModal"
      title={"Thông tin bổ sung"}
      button={
        <>
          <div className="btn btn-cancel" onClick={() => onBack()}>
            <span> Quay lại </span>
          </div>
          <div className="btn btn-accept" onClick={() => onOK()}>
            <span>Lưu thông tin</span>
            <img src={require("assets/images/welcome/save.png")}></img>
          </div>
        </>
      }
    >
      <Main>
        <Col span={12} className="pr-3">
          <div className="item-select">
            <label className={!donViId ? `label label-error` : "label"}>
              Đơn vị<span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e) => onChange(e, "donViId")}
              value={donViId}
              placeholder={"Chọn đơn vị"}
              data={props.listAllDonVi}
            />
            {checkValidate && !donViId && (
              <div className="error2">Vui lòng chọn loại đơn vị!</div>
            )}
          </div>
          <div className="item-select ">
            <label className={!chucVuId ? `label label-error` : "label"}>
              Chức vụ<span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e) => onChange(e, "chucVuId")}
              value={chucVuId}
              placeholder={"Chọn chức vụ"}
              data={props.listAllChucVu}
            />
            {checkValidate && !chucVuId && (
              <div className="error2">Vui lòng chọn loại chức vụ!</div>
            )}
          </div>
        </Col>
        <Col span={12} className="pl-3">
          <div className="item-select">
            <label className={!quanHamId ? `label label-error` : "label"}>
              Quân hàm<span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e) => onChange(e, "quanHamId")}
              value={quanHamId}
              placeholder={"Chọn quân hàm"}
              data={props.listAllQuanHam}
            />
            {checkValidate && !quanHamId && (
              <div className="error2">Vui lòng chọn quân hàm!</div>
            )}
          </div>
          <div className="item-select">
            <label className="label">Người đại diện</label>
            <Select
              onChange={(e) => onChange(e, "nguoiDaiDienId")}
              value={nguoiDaiDienId}
              placeholder={"Chọn người đại diện"}
              data={props.listAllNguoiDaiDien}
            />
          </div>
        </Col>
      </Main>
    </Modal>
  );
};

export default connect(
  (state) => {
    return {
      listAllChucVu: state.chucVu.listAllChucVu,
      listAllDonVi: state.donVi.listAllDonVi || [],
      listAllQuanHam: state.quanHam.listAllQuanHam || [],
      listAllNguoiDaiDien: state.nguoiDaiDien.listAllNguoiDaiDien || [],
    };
  },
  ({
    chucVu: { getListAllChucVu },
    donVi: { getListAllDonVi },
    quanHam: { getListAllQuanHam },
    nguoiDaiDien: { getListAllNguoiDaiDien },
  }) => ({
    getListAllChucVu,
    getListAllDonVi,
    getListAllQuanHam,
    getListAllNguoiDaiDien,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ModalAddQuanNhan));
