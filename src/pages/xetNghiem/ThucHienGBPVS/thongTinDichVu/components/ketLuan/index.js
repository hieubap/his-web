import React, { useEffect } from "react";
import { Form, Input, InputNumber } from "antd";
import { Main } from "./styled";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import {
  SERVICE_STATUS,
  LOAI_KET_QUA,
  CHON_KET_QUA,
} from "../../../../configs";
import InputBlockString from "components/DanhMuc/inputBlockString";
import { openInNewTab } from "utils";

const { TextArea } = Input;

function KetLuan(props) {
  const { form, infoDichVu, mauSelected, listMaMay, listphanLoaiKetQuaXetNghiem } = props;

  useEffect(() => {
    const { ketQua, ketLuan, maMayId, phanLoaiKetQua, viThe, daiThe } =
      mauSelected && Object.keys(mauSelected).length > 0 ? mauSelected : infoDichVu || {};
    form.setFieldsValue({ ketQua, ketLuan, maMayId, phanLoaiKetQua, viThe, daiThe });
  }, [infoDichVu, mauSelected]);

  const isDisabled = infoDichVu.trangThai !== SERVICE_STATUS.DA_TIEP_NHAN_MAU;

  const renderResult = () => {
    const { loaiKetQua, phanLoaiKetQua } = infoDichVu;

    if (loaiKetQua === LOAI_KET_QUA.SO) {
      return <Input placeholder="Nhập kết quả" disabled={isDisabled} type="number" className={showClassByInput(phanLoaiKetQua)} />;
    } else if (loaiKetQua === LOAI_KET_QUA.CHON_GIA_TRI) {
      return <Select data={CHON_KET_QUA} disabled={isDisabled} className={showClassByInput(phanLoaiKetQua)} />;
    } else {
      return <Input placeholder="Nhập kết quả" disabled={isDisabled} className={showClassByInput(phanLoaiKetQua)} />;
    }
  };

  const showClassByInput = (item) => {
    let strClass = "";
    if(item == 0) {
      strClass="input-center";
    }
    if(item == 10) {
      strClass="input-left";
    }
    if(item == 20 || item == 30) {
      strClass="input-right";
    }
    return strClass;
  };

  return (
    <Main>
      <Form layout="vertical" className="form-content" form={form}>
        <Form.Item label="Kết quả" name="ketQua" className="form-item">
          {renderResult()}
        </Form.Item>
        <Form.Item label="Kết luận" name="ketLuan" className="form-item">
          <Input placeholder="Nhập kết luận" disabled={isDisabled} />
        </Form.Item>
        <Form.Item label="Bàn luận" name="banLuan" className="form-item">
          <TextArea placeholder="Nhập bàn luận" disabled={isDisabled} />
        </Form.Item>
        <Form.Item
          label={(
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/ma-may")}
            >Mã máy</div>
          )} name="maMayId" className="form-item">
          <Select
            placeholder="Chọn mã máy"
            data={listMaMay}
            disabled={isDisabled}
          />
        </Form.Item>
        <Form.Item label=" " className="form-item">
          <div>Kết quả bình thường: {infoDichVu.ketQuaThamChieu}</div>
        </Form.Item>
        <Form.Item
          label="Đánh giá kết quả"
          className="form-item"
        >
          {listphanLoaiKetQuaXetNghiem?.find((x) => x.id == infoDichVu.phanLoaiKetQua)?.ten}
        </Form.Item>
      </Form>
    </Main>
  );
}

export default KetLuan;
