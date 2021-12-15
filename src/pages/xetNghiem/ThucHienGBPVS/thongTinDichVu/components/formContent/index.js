import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Input, Form } from "antd";
import Select from "components/Select";
import { SERVICE_STATUS } from "../../../../configs";
import { openInNewTab } from "utils";

const { TextArea } = Input;

function GiaiPhauBenh(props) {
  const {
    listDataTongHopNhuom,
    listDataTongHopSinhThiet,
    infoDichVu,
    listtinhChatBenhPham,
    form,
    getUtils,
    getDataTongHopNhuom,
    getDataTongHopSinhThiet,
  } = props;
  const isDisabled = infoDichVu.trangThai !== SERVICE_STATUS.DA_TIEP_NHAN_MAU;
  // const isDisabled = false;
  const isShowFiledGPB = infoDichVu.nhomDichVuCap2Id == 62 || infoDichVu.nhomDichVuCap2Id === undefined;
  useEffect(() => {
    form.setFieldsValue(infoDichVu);
  }, [infoDichVu]);

  useEffect(() => {
    getDataTongHopNhuom({ page: 0, size: 1000, active: true });
    getDataTongHopSinhThiet({ page: 0, size: 1000, active: true });
    getUtils({ name: "tinhChatBenhPham" });
  }, []);

  return (
    <Main>
      <Form form={form} layout="vertical" className="form-content">
        <Form.Item label="Bệnh phẩm" name="benhPham" className="form-item">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Mô tả bệnh phẩm"
          name="moTaBenhPham"
          className="form-item"
        >
          <TextArea autoSize={{ minRows: 1, maxRows: 6 }} disabled />
        </Form.Item>
        <Form.Item
          label="Tính chất bệnh phẩm"
          name="tinhChatBenhPham"
          className="form-item"
        >
          <Select disabled={isDisabled} data={listtinhChatBenhPham} />
        </Form.Item>
        {isShowFiledGPB && (
          <Form.Item
            label={(
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/vi-tri-sinh-thiet")}
              >
                Vị trí sinh thiết
              </div>
            )}
            name="viTriSinhThietId"
            className="form-item"
          >
            <Select disabled={isDisabled} data={listDataTongHopSinhThiet} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item
            label={(
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/phuong-phap-nhuom")}
              >
                Phương pháp nhuộm
              </div>
            )}
            name="phuongPhapNhuomId"
            className="form-item"
          >
            <Select disabled={isDisabled} data={listDataTongHopNhuom} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item label="Số GPB" name="soGpb" className="form-item">
            <Input disabled={isDisabled} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item label="Số tiêu bản" name="soTieuBan" className="form-item">
            <Input disabled={isDisabled} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item label="Số hồ sơ" name="soHoSo" className="form-item">
            <Input disabled={isDisabled} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item
            label="Vi thể"
            name="viThe"
            className="form-item form-item--full-width"
          >
            <TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item
            label="Đại thể"
            name="daiThe"
            className="form-item form-item--full-width"
          >
            <TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
          </Form.Item>
        )}
      </Form>
    </Main>
  );
}

export default connect(
  ({
    utils: { listtinhChatBenhPham = [] },
    viTriSinhThiet: { listDataTongHop : listDataTongHopSinhThiet  },
    phuongPhapNhuom: { listDataTongHop : listDataTongHopNhuom },
  }) => ({ listtinhChatBenhPham, listDataTongHopSinhThiet, listDataTongHopNhuom }),
  ({
    utils: { getUtils },
    viTriSinhThiet: { getDataTongHop : getDataTongHopSinhThiet },
    phuongPhapNhuom: { getDataTongHop : getDataTongHopNhuom },
  }) => ({
    getUtils,
    getDataTongHopSinhThiet,
    getDataTongHopNhuom,
  })
)(GiaiPhauBenh);
