import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import { Form, Input, InputNumber } from "antd";
import Select from "components/Select";
import { connect } from "react-redux";
import { LOAI_KET_QUA, CHON_KET_QUA, SERVICE_STATUS } from "../../configs";
import { openInNewTab } from "utils";

const { TextArea } = Input;

function NhomKetLuan(props) {
  const { listMaMay, searchMaMay, form, data, listphanLoaiKetQuaXetNghiem } = props;
  const [result, setResult] = useState(null);

  useEffect(() => {
    searchMaMay({ page: 0, size: 10000, active: true });
  }, []);

  const isDisabled = data.trangThai !== SERVICE_STATUS.DA_TIEP_NHAN_MAU;
  // const isDisabled = false;

  const handleChangeInputResult = (e) => {
    setResult(e?.target ? e.target.value : e);
  };

  const showClassByInput = (item) => {
    let strClass = "";
    if (item == 0) {
      strClass = "input-center";
    }
    if (item == 10) {
      strClass = "input-left";
    }
    if (item == 20 || item == 30) {
      strClass = "input-right";
    }
    return strClass;
  };

  const renderKetQua = () => {
    const { loaiKetQua, phanLoaiKetQua } = data;
    if (loaiKetQua === LOAI_KET_QUA.SO) {
      return (
        <InputNumber
          style={{ width: "100%" }}
          disabled={isDisabled}
          className={showClassByInput(phanLoaiKetQua)}
          onChange={handleChangeInputResult}
        />
      );
    } else if (loaiKetQua === LOAI_KET_QUA.CHON_GIA_TRI) {
      return (
        <Select
          data={CHON_KET_QUA}
          className={showClassByInput(phanLoaiKetQua)}
          disabled={isDisabled}
          onChange={handleChangeInputResult}
        />
      );
    } else {
      return (
        <TextArea
          className={showClassByInput(phanLoaiKetQua)}
          disabled={isDisabled}
          onChange={handleChangeInputResult}
        />
      );
    }
  };
  return (
    <Main>
      <div className="group-title">Kết luận</div>
      <div className="group-content">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Kết quả"
            name="ketQua"
            rules={
              (data?.loaiKetQua !== LOAI_KET_QUA.SO &&
                data?.loaiKetQua !== LOAI_KET_QUA.CHON_GIA_TRI && [
                  {
                    max: 1500,
                    message: "Vui lòng nhập kết quả không quá 1500 ký tự!",
                  },
                ]) ||
              []
            }
          >
            {renderKetQua()}
          </Form.Item>
          <Form.Item
            label="Kết luận"
            name="ketLuan"
            rules={[
              {
                max: 1500,
                message: "Vui lòng nhập kết luận không quá 1500 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập kết luận!",
              },
            ]}
          >
            <TextArea autoSize={{ minRows: 1 }} disabled={isDisabled} />
          </Form.Item>
          <Form.Item
            label="Bàn luận"
            name="banLuan"
            rules={[
              {
                max: 1500,
                message: "Vui lòng nhập bàn luận không quá 1500 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập bàn luận!",
              },
            ]}
          >
            <TextArea autoSize={{ minRows: 1 }} disabled={isDisabled} />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/ma-may")}
              >
                Mã máy
              </div>
            }
            name="maMayId"
          >
            <Select data={listMaMay} disabled={isDisabled} />
          </Form.Item>
          <Form.Item label="Đánh giá kết quả" name="phanLoaiKetQua">
            <Select data={listphanLoaiKetQuaXetNghiem} disabled></Select>
          </Form.Item>
          <Form.Item label="">
            <div>Kết quả bình thường: {data.ketQuaThamChieu}</div>
          </Form.Item>
          <Form.Item
            style={{ display: "none" }}
            label=""
            name="dsChiSoCon"
          ></Form.Item>
        </Form>
      </div>
    </Main>
  );
}

export default connect(
  ({ maMay: { listData: listMaMay = [] } }) => ({ listMaMay }),
  ({ maMay: { onSearch: searchMaMay } }) => ({ searchMaMay })
)(NhomKetLuan);
