import { Checkbox, Col, DatePicker, Row } from "antd";
import HomeWrapper from "components/HomeWrapper";
import PdfView from "components/PdfView";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";
import { Main } from "./styled";
import IcPrint from "assets/images/kho/IcPrint.png";

/**
 * Báo cáo tài chính: Báo cáo sử dụng hóa đơn
 *
 */

const hinhThuc = [
  { id: 10, ten: "Trong thầu" },
  { id: 20, ten: "Ngoài thầu" },
];

const Index = ({
  listAllKho,
  listNCC,
  listAllQuyetDinhThau,

  getUtils,
  getAllKho,
  getListTongHopNhaSanXuat,
  getListAllQuyetDinhThau,
  ...props
}) => {
  const [state, _setState] = useState({
    loaiThoiGian: 20,
    tuNgay: moment().set("hour", 0).set("minute", 0).set("second", 0),
    denNgay: moment().set("hour", 23).set("minute", 59).set("second", 59),
    isValidData: true,
    priviewPdf: false,
  });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const onChange = (type) => (e) => {
    const value = e?.hasOwnProperty("target")
      ? e?.target?.value
      : e?.hasOwnProperty("_d")
      ? moment(e._d)
      : e?.target?.checked
      ? e?.target?.checked
      : e;
    setState({
      [type]: value,
    });
  };

  useEffect(() => {
    getAllKho({ nhapTuNcc: true });
    getListTongHopNhaSanXuat({ loaiNhaSanXuat: 20 });
    getListAllQuyetDinhThau({});
  }, []);

  const onOk = (isOk) => () => {
    setState({ priviewPdf: !isOk });
  };
  const action = (
    <>
      {!state.priviewPdf && (
        <div className="action">
          <div className="btn" onClick={onOk(false)}>
            <span>Xem báo cáo</span>
          </div>
          <div className="btn btn-blue" onClick={onOk(true)}>
            <span>Xuất báo cáo</span>
            <img src={require("assets/images/bao-cao/export.png")} alt="" />
          </div>
        </div>
      )}
      {state.priviewPdf && (
        <div className="action">
          <div
            className="btn"
            onClick={() => setState({ priviewPdf: false, blobUrl: null })}
          >
            <span>Quay lại</span>
          </div>
          <div className="btn btn-blue" onClick={onOk(false)}>
            <span>Xuất báo cáo</span>
            <img src={require("assets/images/bao-cao/export.png")} alt="" />
          </div>
          <div className="btn btn-red">
            <span>In báo cáo</span>
            <img src={IcPrint} alt="" />
          </div>
        </div>
      )}
    </>
  );
  return (
    <Main>
      <HomeWrapper title="Báo cáo">
        <Wrapper title="K01. Bảng kê hóa đơn nhập" action={action}>
          {state.blobUrl ? (
            <PdfView src={state?.blobUrl} />
          ) : (
            <div>
              <div className="note">Chọn tiêu chí lọc cho báo cáo!</div>
              <Row>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-date">
                    <label
                      // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
                      style={{ color: state.tuNgay ? "" : "red" }}
                      className="label-filter"
                    >
                      Từ ngày
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <DatePicker
                      showTime
                      value={state.tuNgay}
                      onChange={onChange("tuNgay")}
                      placeholder="Chọn ngày"
                      format="DD/MM/YYYY HH:mm:ss"
                      className="input-filter"
                    />
                    {!state.isValidData && !state.tuNgay && (
                      <div className="error">
                        Vui lòng chọn thời gian từ ngày!
                      </div>
                    )}
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-date">
                    <label
                      style={{ color: state.denNgay ? "" : "red" }}
                      className="label-filter"
                    >
                      Đến ngày
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <DatePicker
                      showTime
                      value={state.denNgay}
                      onChange={onChange("denNgay")}
                      placeholder="Chọn ngày"
                      format="DD/MM/YYYY HH:mm:ss"
                      className="input-filter"
                    />
                    {!state.isValidData && !state.denNgay && (
                      <div className="error">
                        Vui lòng chọn thời gian đến ngày!
                      </div>
                    )}
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label className="label-filter">Kho</label>
                    <Select
                      className="input-filter"
                      placeholder={"Chọn kho"}
                      data={listAllKho || []}
                      onChange={onChange("khoId")}
                    />
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label className="label-filter">Nhà cung cấp</label>
                    <Select
                      mode="multiple"
                      onChange={onChange("nccId")}
                      value={state.nccId}
                      className="input-filter"
                      placeholder={"Chọn nhà cung cấp"}
                      data={[{ id: "", ten: "Tất cả" }, ...(listNCC || [])]}
                    />
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label className="label-filter">
                      Hình thức trong/ ngoài thầu
                    </label>
                    <Select
                      onChange={onChange("doiTuongKcb")}
                      value={state.doiTuongKcb}
                      className="input-filter"
                      placeholder={"Chọn hình thức trong/ ngoài thầu"}
                      data={[{ id: "", ten: "Tất cả" }, ...(hinhThuc || [])]}
                    />
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label className="label-filter">Quyết định thầu</label>
                    <Select
                      onChange={onChange("quyetDinhThauId")}
                      value={state.quyetDinhThauId}
                      className="input-filter"
                      placeholder={"Chọn quyết định thầu"}
                      data={[
                        { id: "", ten: "Tất cả" },
                        ...(listAllQuyetDinhThau || []).map((item) => ({
                          ...item,
                          ten: item.goiThau,
                        })),
                      ]}
                    />
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label className="label-filter">Số hóa đơn</label>
                    <Select
                      onChange={onChange("doiTuongKcb")}
                      value={state.doiTuongKcb}
                      className="input-filter"
                      placeholder={"Chọn số hóa đơn"}
                      data={[{ id: "", ten: "Tất cả" }]}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Wrapper>
      </HomeWrapper>
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKho: state.kho.listAllKho || [],
    listNCC: state.nhaSanXuat.listNCC || [],
    listAllQuyetDinhThau: state.quyetDinhThau.listAllQuyetDinhThau || [],
  }),
  ({
    utils: { getUtils },
    nhaSanXuat: { getListTongHopNhaSanXuat },
    quyetDinhThau: { getListAllQuyetDinhThau },
    ...state
  }) => ({
    getAllKho: state.kho.getAllTongHop,
    getListTongHopNhaSanXuat,
    getListAllQuyetDinhThau,
  })
)(Index);
