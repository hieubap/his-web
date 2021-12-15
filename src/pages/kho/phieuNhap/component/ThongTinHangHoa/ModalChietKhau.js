import { Input, Button, Row, Col, InputNumber } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { ContentTable, Main, Modal } from "./styled";
import SaveIcon from "assets/svg/kho/save.svg";
import { formatterNumber, parserNumber } from "utils";

const ModalChietKhau = ({
  thongTinPhieuNhap,
  dsNhapXuatChiTiet,
  updateDataNhapKho,
  ...props
},
  ref
) => {
  const [state, _setState] = useState({ phanTramChietKhau: true });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }))
  }
  useImperativeHandle(ref, () => ({
    show: ({ isReadOnly = false }) => {
      setState({
        show: true,
        isReadOnly,
      });
    }
  }));

  useEffect(() => {
    let max = 0;
    if (!state.phanTramChietKhau) {
      max = (dsNhapXuatChiTiet || [])
        .reduce((acc, item) => {
          if (item?.tienChietKhau != null)
            acc += item?.giaNhapTruocVat * (item?.soLuong || 0) - item?.tienChietKhau;
          else if (item?.tyLeChietKhau != null)
            acc += item?.giaNhapTruocVat * (item?.soLuong || 0) - ((item?.tyLeChietKhau / 100) * (item?.soLuong || 0) * item?.giaNhapTruocVat);
          return acc;
        }, 0);
    }
    else { max = 100 };
    setState({ max });
  }, [state.phanTramChietKhau]);

  useEffect(() => {
    let newState =
      (thongTinPhieuNhap?.phanTramChietKhau != undefined ||
        thongTinPhieuNhap?.tienChietKhau != null) ?
        {
          phanTramChietKhau: true,
          value: thongTinPhieuNhap?.phanTramChietKhau
        } :
        (thongTinPhieuNhap?.tienChietKhau != undefined ||
          thongTinPhieuNhap?.tienChietKhau != null) ?
          {
            phanTramChietKhau: false,
            value: thongTinPhieuNhap?.tienChietKhau
          } :
          {
            phanTramChietKhau: true,
            value: 0
          };
    setState({ ...newState });
  }, [
    thongTinPhieuNhap?.tienChietKhau,
    thongTinPhieuNhap?.phanTramChietKhau
  ]);

  return (
    <Modal
      visible={state.show}
      onCancel={() => { setState({ show: false }) }}
      footer={null}
      title={
        <div className="title">
          <h2>
            <b>Chiết khấu</b>
          </h2>
        </div>
      }
    >
      <ContentTable>
        <Row>
          <Col span={12}>
            <Checkbox
              checked={state.phanTramChietKhau}
              onChange={() => setState({ phanTramChietKhau: true })}
              disabled={state.isReadOnly}
            >
              Theo %
            </Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox
              checked={!state.phanTramChietKhau}
              onChange={() => setState({ phanTramChietKhau: false })}
              disabled={state.isReadOnly}
            >
              Theo VNĐ
            </Checkbox>
          </Col>
        </Row>
        <div style={{ marginTop: "15px" }}>
          <label>Giá trị</label>
          {state.isReadOnly ? (
            <InputNumber
              style={{
                width: "100%",
                border: "1px solid lightgrey",
                borderRadius: "5px",
              }}
              disabled={state.isReadOnly}
              value={state.value}
              formatter={(value) => formatterNumber(value)}
              parser={(value) => parserNumber(value)}
            />
          ) : (
            <InputNumber
              style={{
                width: "100%",
                border: "1px solid lightgrey",
                borderRadius: "5px",
              }}
              min={0}
              max={state.max}
              formatter={(value) => formatterNumber(value)}
              parser={(value) => parserNumber(value)}
              value={state.value}
              onChange={(e) => {
                const value =
                  !isNaN(parseFloat(e)) && parseFloat(e) > 0
                    ? parseFloat(e) % 1.0 === 0.0
                      ? parseInt(e)
                      : parseFloat(e)
                    : 0;
                setState({ value });
              }}
            />
          )}
        </div>
        <div className="footer">
          <Button className="left-btn" onClick={() => setState({ show: false })}>
            Quay lại
          </Button>
          {!state.isReadOnly && (
            <Button
              className="right-btn"
              onClick={() => {
                const type = !state.phanTramChietKhau ? "phanTramChietKhau" : "tienChietKhau";

                updateDataNhapKho({
                  thongTinPhieuNhap: {
                    ...thongTinPhieuNhap,
                    phanTramChietKhau: state.value,
                    tienChietKhau: state.value,
                    [type]: undefined
                  }
                });
                setState({ show: false });
              }}
            >
              Lưu
              <SaveIcon />
            </Button>
          )}
        </div>
      </ContentTable>
    </Modal>
  );
};

export default connect(
  (state) => ({
    thongTinPhieuNhap: state.phieuNhap.thongTinPhieuNhap,
    dsNhapXuatChiTiet: state.phieuNhapChiTiet.dsNhapXuatChiTiet || [],
  }),
  ({
    phieuNhap: {
      updateData: updateDataNhapKho,
    }
  }) => ({
    updateDataNhapKho,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ModalChietKhau));