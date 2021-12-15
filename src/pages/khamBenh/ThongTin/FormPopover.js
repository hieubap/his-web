import React, { useState, useMemo } from "react";
import { Form } from "antd";
import Select from "components/Select";
import { HUONG_DIEU_TRI_KHAM } from "../configs";
import { useSelector } from "react-redux";
function FormPopover(props) {
  const { handleChangeSelectPopover, form } = props;

  const { listhuongDieuTriKham = [], listketQuaDieuTriKham = [] } = useSelector(
    (state) => state.utils
  );
  const [huongDieuTri, setHuongDieuTri] = useState();

  const handleChangeHuongDieuTri = (value) => {
    setHuongDieuTri(value);
  };

  const listKetQuaDieuTriFilter = useMemo(() => {
    const _huongDieuTri = huongDieuTri || form.getFieldValue("keyHuongDieuTri");
    return listketQuaDieuTriKham.filter((item) => {
      let arrKetQua = [];
      if (_huongDieuTri === HUONG_DIEU_TRI_KHAM.HEN_KHAM) {
        arrKetQua = [1, 2, 3, 10];
      } else if (_huongDieuTri === HUONG_DIEU_TRI_KHAM.CHO_VE) {
        arrKetQua = [1, 2, 10];
      } else if (
        _huongDieuTri === HUONG_DIEU_TRI_KHAM.NHAP_VIEN ||
        _huongDieuTri === HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN
      ) {
        arrKetQua = [3, 4, 10];
      } else {
        arrKetQua = [10];
      }

      return arrKetQua.includes(item.id);
    });
  }, [huongDieuTri]);

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleChangeSelectPopover}
    >
      <Form.Item
        label="Hướng điều trị"
        name="keyHuongDieuTri"
        rules={[{ required: true, message: "Vui lòng nhập hướng điều trị!" }]}
      >
        <Select
          allowClear
          data={listhuongDieuTriKham}
          placeholder="Chọn hướng điều trị"
          onChange={handleChangeHuongDieuTri}
        />
      </Form.Item>
      <Form.Item label="Kết quả" name="keyKetQua">
        <Select
          allowClear
          data={listKetQuaDieuTriFilter}
          placeholder="Chọn kết quả khám"
        />
      </Form.Item>
    </Form>
  );
}

export default FormPopover;
