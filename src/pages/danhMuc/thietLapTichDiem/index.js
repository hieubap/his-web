import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { Button, Col, Row } from "antd";
import Breadcrumb from "components/Breadcrumb";
import { connect } from "react-redux";
import { InputNumberFormat } from "components/common";

const ThietLapTichDiem = ({
  //state
  dataEditDefault,
  //dispacth
  getTichDiem,
  tichDiem,
  updateData,
  ...props
}) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }))
  };
  const onChange = (type) => (e) => {
    setState({
      [type]: e?.floatValue,
    })
  }
  const onSave = () => {
    const payload = {
      ...state,
    };
    tichDiem(payload);
  }
  const onCancel = () => {
    updateData({ dataEditDefault: {} });
  }

  useEffect(() => {
    if (dataEditDefault) {
      setState({
        chiPhiKcb: dataEditDefault?.chiPhiKcb,
        diemKcb: dataEditDefault?.diemKcb,
        diemLanGioiThieu: dataEditDefault?.diemLanGioiThieu,
        diemLanKham: dataEditDefault?.diemLanKham,
        diemQuyDoi: dataEditDefault?.diemQuyDoi,
        soLanGioiThieu: dataEditDefault?.soLanGioiThieu,
        soLanKham: dataEditDefault?.soLanKham,
        tienTuongDuong: dataEditDefault?.tienTuongDuong,
      });
    }
  }, [dataEditDefault]);

  useEffect(() => {
    getTichDiem();
  }, []);

  return (
    <Main>
      <Row className="top-level-category" justify="space-between">
        <Breadcrumb
          chains={[
            { title: "Thiết lập", link: "/thiet-lap" },
            { title: "Tích điểm", link: "/thiet-lap/tich-diem" },
          ]}
        />
      </Row>
      <Row>
        <Col xxl={23} className="body">
          <div className="title">
            <div>
              Thiết lập tích điểm
            </div>
            <div className="action">
              <Button
                className="button-ok"
                onClick={onSave}
              >
                Lưu
              </Button>
              <Button
                className="button-cancel"
                onClick={onCancel}
              >
                Hủy
              </Button>
            </div>
          </div>
          <div className="main">
            <div className="text text-bold">
              Quy tắc đổi điểm
            </div>
            <div className="ml-3 line">
              <span className="text">
                Chi phí khám chữa bệnh
              </span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("chiPhiKcb")}
                  value={state.chiPhiKcb}
                />
              </div>
              <span className="text mw-50">vnđ</span>
              <span className="text mw-50">= 1 điểm</span>
            </div>
            <div className="ml-3 line">
              <span className="text">
                Số lần khám
              </span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("soLanKham")}
                  value={state.soLanKham}
                />
              </div>
              <span className="text mw-50">lần</span>
              <span className="text mw-50">=</span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("diemLanKham")}
                  value={state.diemLanKham}
                />
              </div>
              <div className="text mw-50">điểm</div>
            </div>
            <div className="ml-3 line">
              <span className="text">
                Số lượt giới thiệu
              </span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("soLanGioiThieu")}
                  value={state.soLanGioiThieu}
                />
              </div>
              <span className="text mw-50">lượt</span>
              <span className="text mw-50">=</span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("diemLanGioiThieu")}
                  value={state.diemLanGioiThieu}
                />
              </div>
              <div className="text mw-50">điểm</div>
            </div>
            <div className="line">
              <div className="text text-bold mr-3">
                Thanh toán bằng điểm
              </div>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("diemQuyDoi")}
                  value={state.diemQuyDoi}
                />
              </div>
              <span className="text mw-50">điểm</span>
              <span className="text mw-50">=</span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("tienTuongDuong")}
                  value={state.tienTuongDuong}
                />
              </div>
              <span className="text mw-50">vnđ</span>
            </div>
          </div>
        </Col>
      </Row>
    </Main>
  );
};

export default connect(
  (state) => ({
    dataEditDefault: state.thietLapTichDiem.dataEditDefault,
  }),
  ({
    thietLapTichDiem: {
      post: tichDiem,
      get: getTichDiem,
      updateData,
    }
  }) => ({
    tichDiem,
    getTichDiem,
    updateData,
  })
)(ThietLapTichDiem);
