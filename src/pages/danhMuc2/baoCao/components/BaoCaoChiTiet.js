import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Checkbox, Col, Input, Form, InputNumber, Upload, Button } from "antd";
import { HOST } from "client/request";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  HIEU_LUC,
  TABLE_LAYOUT,
  ADD_LAYOUT,
  ROLES,
} from "constants/index";
import baoCaoProvider from "data-access/categories/dm-bao-cao-provider";
import { Main, BaoCaoChiTietStyle } from "./styled";
import uploadImg from "assets/images/his-core/import.png";
import { SORT_DEFAULT, DS_DINH_DANG } from "../configs";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import { IN_NHANH_KYSO } from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import { CloseOutlined } from "@ant-design/icons";
import FormRight from "../../../../components/BaseDmTabForm/FormRight";
const BaoCaoChiTiet = ({
  listData,
  onSizeChange,
  onChangeInputSearch,
  onSortChange,
  dataSortColumn,
  totalElements,
  page,
  size,
  onSearch,
  createOrEdit,
  getUtils,
  listhuongGiay,
  listkhoGiay,
  listDinhDangBaoCao,
  stateParent = {},
  onSizeChangeLoaiPhieu,
  listDataLoaiPhieu,
  setStateParent,

  refCallbackSave = {},
  ...props
}) => {
  const [collapseStatus, setCollapseStatus] = useState(false);

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onChangeKhoGiay = (val) => {
    setState({
      isRequiredKichThuoc: val === 200,
    });
    // form.validateFields();
  };

  const renderForm = ({ form, refAutoFocus, autoFocus, editStatus }) => {
    return (
      <>
        <Form.Item
          label="Mã báo cáo"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã báo cáo!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã báo cáo không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã báo cáo!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã báo cáo"
            ref={refAutoFocus}
            autoFocus={autoFocus}
          />
        </Form.Item>
        <Form.Item label="">
          <div className="image">
            <Upload
              fileList={state.defaultFileList}
              customRequest={({ onSuccess, onError, file }) => {
                baoCaoProvider
                  .upload(file)
                  .then((response) => {
                    onSuccess(null, {});
                    setState({
                      invalidMauBaoCao: false,
                      mauBaoCao: response.data,
                      defaultFileList: [
                        {
                          uid: file.uid,
                          name: file.name,
                          url: `${HOST}/api/his/v1/files/${response?.data}`,
                        },
                      ],
                    });
                  })
                  .catch((e) => {
                    onError(e);
                    setState({
                      mauBaoCao: null,
                    });
                  });
              }}
              accept=".doc,.docx,.xls,.xlsx"
              onRemove={(file) => {
                setState({
                  mauBaoCao: null,
                  defaultFileList: [],
                });
              }}
            >
              <img src={uploadImg} alt="importImg" />
              Tải lên mẫu báo cáo <span style={{ color: "#ff4d4f" }}> * </span>
            </Upload>
            {state.invalidMauBaoCao && (
              <div className="err-msg" style={{ color: "#ff4d4f" }}>
                Vui lòng tải lên mẫu báo cáo (excel)!
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item
          label="Tên báo cáo"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên báo cáo!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên báo cáo không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên báo cáo!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên báo cáo"
          />
        </Form.Item>
        <Form.Item label="Khổ giấy" name="khoGiay">
          <Select
            data={listkhoGiay}
            placeholder="Chọn khổ giấy"
            onChange={onChangeKhoGiay}
          />
        </Form.Item>
        <Form.Item
          label="Kích thước chiều dọc(mm)"
          name="chieuDoc"
          rules={[
            {
              required: state.isRequiredKichThuoc,
              message: "Vui lòng nhập kích thước chiều dọc!",
            },
            {
              pattern: /^[\d]{0,4}$/,
              message: "Vui lòng nhập kích thước chiều dọc không quá 4 ký tự!",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Vui lòng nhập kích thước chiều dọc"
            type="number"
          />
        </Form.Item>
        <Form.Item
          label="Kích thước chiều ngang(mm)"
          name="chieuNgang"
          rules={[
            {
              required: state.isRequiredKichThuoc,
              message: "Vui lòng nhập kích thước chiều ngang!",
            },
            {
              pattern: /^[\d]{0,4}$/,
              message:
                "Vui lòng nhập kích thước chiều ngang không quá 4 ký tự!",
            },
          ]}
        >
          <InputNumber
            className="input-option"
            placeholder="Vui lòng nhập kích thước chiều ngang"
            type="number"
          />
        </Form.Item>
        <Form.Item label="Hướng giấy" name="huongGiay">
          <Select data={listhuongGiay} placeholder="Chọn hướng giấy" />
        </Form.Item>
        <Form.Item label="Định dạng xuất file" name="dinhDang">
          <Select
            data={listDinhDangBaoCao || []}
            placeholder="Chọn định dạng xuất file"
          />
        </Form.Item>
        <Form.Item label="Loại phiếu" name="dsLoaiBaoCaoId">
          <Select
            mode="multiple"
            data={listDataLoaiPhieu || []}
            placeholder="Vui lòng nhập tên loại phiếu"
          />
        </Form.Item>
        <Form.Item label=" " name="inNhanh" valuePropName="checked">
          <Checkbox>In nhanh</Checkbox>
        </Form.Item>
        <Form.Item label=" " name="kySo" valuePropName="checked">
          <Checkbox>Ký số</Checkbox>
        </Form.Item>
        {editStatus && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return (
    <BaoCaoChiTietStyle>
      <FormRight renderForm={renderForm} {...props} />
    </BaoCaoChiTietStyle>
  );
};

const mapStateToProps = ({
  baoCao: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    currentItem,
    dataSortColumn,
    dataEditDefault,
  },
  loaiPhieu: { listData: listDataLoaiPhieu },
  utils: { listkhoGiay, listhuongGiay, listDinhDangBaoCao },
}) => {
  return {
    listData,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
    listhuongGiay,
    listkhoGiay,
    listDinhDangBaoCao,
    listDataLoaiPhieu,
  };
};
const mapDispatchToProps = ({
  baoCao: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
  loaiPhieu: { onSizeChangeTongHop: onSizeChangeLoaiPhieu },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  createOrEdit,
  onSizeChangeLoaiPhieu,
});
export default connect(mapStateToProps, mapDispatchToProps)(BaoCaoChiTiet);