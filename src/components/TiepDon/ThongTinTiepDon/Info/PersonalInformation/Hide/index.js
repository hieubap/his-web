import React, {
  useRef,
  memo,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Row, Col, Input, Checkbox } from "antd";
import { connect, useDispatch } from "react-redux";
import Camera from "components/Camera";
import Select from "components/Select";
import { openInNewTab } from "utils";
import Modal from "components/TiepDon/Modal";
import { Main } from "./styled";

const Index = (props, ref) => {
  const {
    tiepDon: { updateData },
  } = useDispatch();

  const {
    onChange,
    danTocId,
    listAllDanToc,
    nbGiayToTuyThan,
    disableTiepDon,
    daXacThucThongTin,
    ngheNghiepId,
    listAllNgheNghiep,
    soBaoHiemXaHoi,
    nbDiaChi,
    searchThe,
    theBaoHiem,
  } = props;
  const refanhMatTruoc = useRef();
  const refanhMatSau = useRef();
  const [state, _setState] = useState({ visible: false });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ visible: true });
    },
  }));
  useEffect(() => {
    setState({
      anhMatTruoc: nbGiayToTuyThan?.anhMatTruoc,
      anhMatSau: nbGiayToTuyThan?.anhMatSau,
    });
  }, [nbGiayToTuyThan]);
  useEffect(() => {
    setState({ soBaoHiemXaHoi });
  }, [soBaoHiemXaHoi]);
  useEffect(() => {
    if (!!nbDiaChi)
      setState({
        diaChiNuocNgoai: nbDiaChi?.diaChiNuocNgoai,
      });
  }, [nbDiaChi]);
  useEffect(() => {
    props.getListAllDanToc();
  }, []);
  const {
    anhMatSau,
    anhMatTruoc,
    diaChiNuocNgoai,
    soBaoHiemXaHoi: nbSoBaoHiemXaHoi,
  } = state;
  const showModalCamera = (type) => {
    if (type === "anhMatTruoc") {
      if (refanhMatTruoc.current)
        refanhMatTruoc.current.show({ type: type }, (data) => {
          onChange(data[0], type);
        });
    } else {
      if (refanhMatSau.current)
        refanhMatSau.current.show({ type: type }, (data) => {
          onChange(data[0], type);
        });
    }
  };
  // const onChangeIndex = (value, variables) => {
  //   setState({ [`${variables}`]: value });
  //   if (
  //     variables === "loaiGiayTo" ||
  //     variables === "anhMatTruoc" ||
  //     variables === "anhMatSau"
  //   ) {
  //     nbGiayToTuyThan[`${variables}`] = value;
  //     updateData({ nbGiayToTuyThan: { ...nbGiayToTuyThan } });
  //   }
  // };
  const onBlur = (value, variables) => {
    if (variables === "diaChiNuocNgoai" || variables === "soNha") {
      let data = nbDiaChi || {};
      data[`${variables}`] = value;
      updateData({ nbDiaChi: { ...data } });
    }
    if (variables == "soBaoHiemXaHoi") {
      onChange(value, variables);
    }
    // else {
    //   nbGiayToTuyThan[`${variables}`] = value;
    //   updateData({ nbGiayToTuyThan: { ...nbGiayToTuyThan } });
    //   if (variables === "maSo") {
    //     onCheckTrungThongTin(value, variables);
    //   }
    // }
  };
  const update = (value, variables) => {
    setState({ [`${variables}`]: value });
  };

  const onBack = () => {
    setState({ visible: false });
  };

  const onOk = () => {
    setState({ visible: false });
  };

  return (
    <Modal
      closable={false}
      width={600}
      show={state.visible}
      typeModal="infoModal"
      title={"Th??ng tin b??? sung"}
      button={
        <>
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => onOk()}
          >
            <div
              className="pointer"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ color: "#0762F7", marginRight: 5 }}>Thu g???n</span>
              <img
                className="icon"
                src={require("assets/images/welcome/arrow.png")}
              />
            </div>
          </div>
        </>
      }
    >
      <Main>
        <Row className="row-name">
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select" style={{ marginTop: 10 }}>
              <label
                className="label pointer"
                onClick={() => openInNewTab("/danh-muc/dan-toc")}
              >
                D??n t???c
              </label>
              <Select
                onChange={(e) => onChange(e, "danTocId")}
                value={danTocId}
                className="select"
                placeholder={"Ch???n d??n t???c"}
                data={listAllDanToc}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          {/* {props.dataMacDinh?.quocTich?.id !== quocTichId && ( */}
          <Col md={12} xl={12} xxl={12} style={{ paddingRight: 0 }}>
            <div className="item-input" style={{ marginTop: 10 }}>
              <label className="label">?????a ch??? t???i n?????c ngo??i</label>
              <Input.TextArea
                placeholder="Nh???p ?????a ch??? ??? n?????c ngo??i"
                value={diaChiNuocNgoai}
                onChange={(e) => update(e.target.value, "diaChiNuocNgoai")}
                onBlur={(e) => onBlur(e.target.value, "diaChiNuocNgoai")}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          {/* )} */}
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label
                className="label pointer"
                onClick={() => openInNewTab("/danh-muc/nghe-nghiep")}
              >
                Ngh??? nghi???p
              </label>
              <Select
                onChange={(e) => onChange(e, "ngheNghiepId")}
                value={ngheNghiepId}
                className="select"
                placeholder={"Ch???n ngh??? nghi???p"}
                data={listAllNgheNghiep}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12} style={{ paddingRight: 0 }}>
            <div className="item-input">
              <label className="label">M?? s??? b???o hi???m x?? h???i</label>
              <Input
                placeholder="Nh???p m?? s??? BHXH"
                value={nbSoBaoHiemXaHoi}
                onChange={(e) => update(e.target.value, "soBaoHiemXaHoi")}
                onBlur={(e) => onChange(e.target.value, "soBaoHiemXaHoi")}
                disabled={
                  disableTiepDon || (searchThe && theBaoHiem?.maKetQua == "000")
                }
              />
            </div>
          </Col>
          <Col md={24} xl={24} xxl={24}>
            <div className="checkbox">
              <Checkbox
                disabled={disableTiepDon}
                checked={daXacThucThongTin}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    onChange(!e?.target?.checked, "daXacThucThongTin");
                  }
                }}
              >
                ???? x??c th???c th??ng tin
              </Checkbox>
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div
              className={
                disableTiepDon ? "optimize avatar-no-drop" : "optimize"
              }
              onClick={() => showModalCamera("anhMatTruoc")}
            >
              <Camera
                ref={refanhMatTruoc}
                type={"anhMatTruoc"}
                title={"M???t tr?????c"}
                value={anhMatTruoc}
                image={require("assets/images/welcome/Mattruoc.png")}
                icon={require("assets/images/welcome/iconAccept.png")}
                disabled={disableTiepDon}
              />
              <div className="text">
                CMND/C??n c?????c <br />
                M???t tr?????c
              </div>
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div
              className={
                disableTiepDon ? "optimize avatar-no-drop" : "optimize"
              }
              onClick={() => showModalCamera("anhMatSau")}
            >
              <Camera
                ref={refanhMatSau}
                type={"anhMatSau"}
                title={"M???t sau"}
                value={anhMatSau}
                image={require("assets/images/welcome/Matsau.png")}
                icon={require("assets/images/welcome/iconAccept.png")}
                disabled={disableTiepDon}
              />
              <div className="text">
                CMND/C??n c?????c <br />
                M???t sau
              </div>
            </div>
          </Col>
        </Row>
      </Main>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    nbGiayToTuyThan: state.tiepDon.nbGiayToTuyThan || {},
    danTocId: state.tiepDon.danTocId,
    listAllDanToc: state.danToc.listAllDanToc || [],
    disableTiepDon: state.tiepDon.disableTiepDon,
    checkValidate: state.tiepDon.checkValidate,
    daXacThucThongTin: state.tiepDon.daXacThucThongTin || false,
    listAllQuocGia: state.ttHanhChinh.listAllQuocGia || [],
    quocTichId: state.tiepDon.quocTichId,
    ngheNghiepId: state.tiepDon.ngheNghiepId,
    soBaoHiemXaHoi: state.tiepDon.soBaoHiemXaHoi,
    listAllNgheNghiep: state.ngheNghiep.listAllNgheNghiep || [],
    dataMacDinh: state.tiepDon.dataMacDinh || {},
    nbDiaChi: state.tiepDon.nbDiaChi,
    searchThe: state.tiepDon.searchThe || false,
    theBaoHiem: state.tiepDon.theBaoHiem || {},
  };
};

export default connect(
  mapStateToProps,
  ({ danToc: { getListAllDanToc } }) => ({
    getListAllDanToc,
  }),
  null,
  { forwardRef: true }
)(forwardRef(Index));
