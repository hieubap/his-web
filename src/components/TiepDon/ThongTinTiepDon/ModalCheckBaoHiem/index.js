import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Row, Col } from "antd";
import Modal from "components/TiepDon/Modal";
import { ModalNotification } from "components/ModalConfirm";

const ModalCheckBaoHiem = (props, ref) => {
  const refCallback = useRef(null);
  const [state, _setState] = useState({
    data: {},
    dataDetail: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      setState({
        show: item.show,
        data: item.data || {},
        dataDetail: item?.data?.data || {},
        hoTen: item?.hoTen,
      });
      refCallback.current = callback;
    },
  }));

  const { data, dataDetail, hoTen, openThongBaoBoQuaThe } = state;

  const onOK = () => {
    let dataFilter = {};
    setState({ show: false });
    dataFilter = props.listAllBenhVien?.find(
      (item) => item.ma == dataDetail?.maDKBDMoi
    );
    let day5nam = dataDetail?.ngayDu5Nam && dataDetail?.ngayDu5Nam.split("/");
    let date = "";
    if (day5nam && day5nam.length === 3) {
      date = `${day5nam[2]}/${day5nam[1]}/${day5nam[0]}`;
    }
    let obj = {
      ...(dataDetail || {}),
      noiDangKy: dataFilter,
      thoiGianDu5Nam: date,
    };
    if (refCallback.current) refCallback.current(obj);
  };
  const onBack = (data) => {
    setState({
      show: false,
      data: {},
      dataDetail: {},
    });
    if (refCallback.current) refCallback.current(data);
  };

  const showThongBaoBoQuaThe = (data, boQuaTheLoi) => {
    setState({ openThongBaoBoQuaThe: data });
    if (boQuaTheLoi) onBack({ boQuaTheLoi: true });
  };
  useEffect(() => {
    props.getListAllBenhVien();
    props.getUtils({ name: "ketQuaDieuTriKham" });
  }, []);
  const getDate = (date) => {
    try {
      return `${date.slice(6, 8)}/${date.slice(4, 6)}/${date.slice(
        0,
        4
      )} ${date.slice(8, 10)}:${date.slice(10, 12)}`;
    } catch (error) {}
    return "";
  };
  return (
    <>
      <Modal
        closable={false}
        width={1090}
        show={state.show}
        typeModal={data?.code === 0 ? "success" : "error"}
        title={data?.code === 0 ? "Th??ng tin th??? ch??nh x??c" : "L???i"}
        button={
          <>
            {data?.code === 0 ? (
              <>
                <div className="btn btn-cancel" onClick={() => onBack()}>
                  <span>Quay l???i</span>
                </div>
                <div className="btn btn-accept" onClick={() => onOK()}>
                  <span>S??? d???ng th??ng tin th???</span>
                  <img
                    style={{ paddingLeft: 10 }}
                    src={require("assets/images/welcome/correct.png")}
                  ></img>
                </div>
              </>
            ) : (
              <>
                <div className="btn btn-cancel" onClick={() => onBack()}>
                  <span>Quay l???i</span>
                </div>
                <div
                  className="btn btn-accept button-error"
                  onClick={() => showThongBaoBoQuaThe(true)}
                >
                  <span>B??? ki???m tra th???</span>
                  <img
                    style={{ paddingLeft: 10 }}
                    src={require("assets/images/welcome/delete3.png")}
                  ></img>
                </div>
              </>
            )}
          </>
        }
      >
        <Main className="container">
          <div className="modal-content--left">
            {data?.code !== 0 && (
              <>
                <Row className="error-body">
                  <img
                    style={{ paddingRight: 10 }}
                    src={require("assets/images/welcome/error.png")}
                    alt=""
                  ></img>
                  <div className="error-detail">
                    <div className="code">M?? l???i {data?.code} </div>
                    <div className="message"> {data?.message} </div>
                  </div>
                </Row>
                <Row className="note">
                  <h5>Ghi ch??</h5>
                  <p>{data?.data?.ghiChu}</p>
                </Row>
              </>
            )}
            <Row>
              <div className="info">
                <h5>Th??ng tin ????ng:</h5>
              </div>
            </Row>
            <div className="content">
              <div className="content-info">
                <Row>
                  <Col span={6}>
                    <h6>M?? th???: </h6>
                  </Col>
                  <Col span={18} className="ma">
                    <p>{dataDetail?.maThe}</p>
                  </Col>
                  <Col span={6}>
                    <h6>H??? v?? t??n:</h6>
                  </Col>
                  <Col span={18} className="name">
                    <p>{hoTen ? hoTen : dataDetail?.hoTen}</p>
                  </Col>
                  <Col span={6}>
                    <h6>Gi???i t??nh:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail?.gioiTinh}</p>
                  </Col>
                </Row>
                <Row className="gender">
                  <Col span={6}>
                    <h6>Ng??y sinh:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail?.ngaySinh}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h6 style={{ marginTop: 10 }}>N??i ??K KCBBD:</h6>
                  </Col>
                  <Col span={18}>
                    <p style={{ marginTop: 10 }}>{dataDetail?.tenDKBD}</p>
                  </Col>
                  <Col span={6}>
                    <h6>Gi?? tr??? th???:</h6>
                  </Col>
                  <Col span={18}>
                    <p>
                      T??? {dataDetail?.gtTheTu} - ?????n {dataDetail?.gtTheDen}
                    </p>
                  </Col>
                  <Col span={6}>
                    <h6>Ng??y 5 n??m LT:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail.ngayDu5Nam}</p>
                  </Col>
                  <Col span={6}>
                    <h6>M?? th??? m???i:</h6>
                  </Col>
                  <Col span={18} className="ma">
                    <p>{dataDetail?.maTheMoi}</p>
                  </Col>
                  <Col span={6}>
                    <h6>Gi?? tr??? th??? m???i:</h6>
                  </Col>
                  <Col span={18}>
                    <p>
                      T??? {dataDetail?.gtTheTuMoi} - ?????n{" "}
                      {dataDetail?.gtTheDenMoi}
                    </p>
                  </Col>
                  <Col span={6}>
                    <h6>M?? s??? BHXH:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail?.maSoBHXH}</p>
                  </Col>
                  <Col span={6}>
                    <h6>M?? khu v???c:</h6>
                  </Col>
                  <Col span={18}>
                    <p>{dataDetail?.maKV}</p>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="modal-content--right">
            <Row>
              <div className="info">
                <h5>L???ch s??? kh??m ch???a b???nh:</h5>
              </div>
            </Row>
            <div className="history">
              {!!(data?.data?.dsLichSuKCB2018 || []).length &&
                data?.data?.dsLichSuKCB2018.map((item, index) => {
                  return (
                    <div className="history--item" key={index}>
                      <div className="date">{getDate(item.ngayVao)}</div>
                      <div className="name-hospital">{item.tenCSKCB}</div>
                      <div className="res-hospital">
                        K???t qu??? ??i???u tr???:{" "}
                        {` ${
                          props.listketQuaDieuTriKham.find(
                            (kq) => kq.id == item.kqDieuTri
                          )?.ten || ""
                        }`}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* {data.code !== 0 && (
          <div className="loiDan">
            <div className="loiDan-title">
              B???n c?? ch???c ch???n mu???n b??? qua ki???m tra th??? kh??ng?
              </div>
            <div className="loiDan-content">
              B??? qua ki???m tra th??? v???i c???ng gi??m ?????nh c?? th??? d???n ?????n c??c d???ch v??? <br />
                c???a ng?????i b???nh kh??ng ???????c c?? quan BHYT quy???t to??n!
              </div>
          </div>
        )} */}
        </Main>
      </Modal>
      {openThongBaoBoQuaThe && (
        <ModalNotification
          visible={openThongBaoBoQuaThe}
          title="B??? ki???m tra th???"
          content="B???n c?? ch???c ch???n mu???n b??? qua ki???m tra th??? kh??ng?"
          detail="B??? qua ki???m tra th??? v???i c???ng gi??m ?????nh c?? th??? d???n ?????n c??c d???ch v???<br /> c???a ng?????i b???nh kh??ng ???????c c?? quan BHYT quy???t to??n!"
          onOk={() => showThongBaoBoQuaThe(false, true)}
          onCancel={showThongBaoBoQuaThe}
          cancelText="Quay l???i"
          okText="B??? ki???m tra th???"
          classNameOkText="button-error"
          showImg={true}
          showBtnOk={true}
        />
      )}
    </>
  );
};

export default connect(
  (state) => ({
    listAllBenhVien: state.benhVien.listAllBenhVien || [],
    listketQuaDieuTriKham: state.utils.listketQuaDieuTriKham || [],
  }),
  ({ benhVien: { getListAllBenhVien }, utils: { getUtils } }) => ({
    getListAllBenhVien,
    getUtils,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ModalCheckBaoHiem));
