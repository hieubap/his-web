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
          label="M?? b??o c??o"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p m?? b??o c??o!",
            },
            {
              max: 20,
              message: "Vui l??ng nh???p m?? b??o c??o kh??ng qu?? 20 k?? t???!",
            },
            {
              whitespace: true,
              message: "Vui l??ng nh???p m?? b??o c??o!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui l??ng nh???p m?? b??o c??o"
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
              T???i l??n m???u b??o c??o <span style={{ color: "#ff4d4f" }}> * </span>
            </Upload>
            {state.invalidMauBaoCao && (
              <div className="err-msg" style={{ color: "#ff4d4f" }}>
                Vui l??ng t???i l??n m???u b??o c??o (excel)!
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item
          label="T??n b??o c??o"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p t??n b??o c??o!",
            },
            {
              max: 1000,
              message: "Vui l??ng nh???p t??n b??o c??o kh??ng qu?? 1000 k?? t???!",
            },
            {
              whitespace: true,
              message: "Vui l??ng nh???p t??n b??o c??o!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui l??ng nh???p t??n b??o c??o"
          />
        </Form.Item>
        <Form.Item label="Kh??? gi???y" name="khoGiay">
          <Select
            data={listkhoGiay}
            placeholder="Ch???n kh??? gi???y"
            onChange={onChangeKhoGiay}
          />
        </Form.Item>
        <Form.Item
          label="K??ch th?????c chi???u d???c(mm)"
          name="chieuDoc"
          rules={[
            {
              required: state.isRequiredKichThuoc,
              message: "Vui l??ng nh???p k??ch th?????c chi???u d???c!",
            },
            {
              pattern: /^[\d]{0,4}$/,
              message: "Vui l??ng nh???p k??ch th?????c chi???u d???c kh??ng qu?? 4 k?? t???!",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Vui l??ng nh???p k??ch th?????c chi???u d???c"
            type="number"
          />
        </Form.Item>
        <Form.Item
          label="K??ch th?????c chi???u ngang(mm)"
          name="chieuNgang"
          rules={[
            {
              required: state.isRequiredKichThuoc,
              message: "Vui l??ng nh???p k??ch th?????c chi???u ngang!",
            },
            {
              pattern: /^[\d]{0,4}$/,
              message:
                "Vui l??ng nh???p k??ch th?????c chi???u ngang kh??ng qu?? 4 k?? t???!",
            },
          ]}
        >
          <InputNumber
            className="input-option"
            placeholder="Vui l??ng nh???p k??ch th?????c chi???u ngang"
            type="number"
          />
        </Form.Item>
        <Form.Item label="H?????ng gi???y" name="huongGiay">
          <Select data={listhuongGiay} placeholder="Ch???n h?????ng gi???y" />
        </Form.Item>
        <Form.Item label="?????nh d???ng xu???t file" name="dinhDang">
          <Select
            data={listDinhDangBaoCao || []}
            placeholder="Ch???n ?????nh d???ng xu???t file"
          />
        </Form.Item>
        <Form.Item label="Lo???i phi???u" name="dsLoaiBaoCaoId">
          <Select
            mode="multiple"
            data={listDataLoaiPhieu || []}
            placeholder="Vui l??ng nh???p t??n lo???i phi???u"
          />
        </Form.Item>
        <Form.Item label=" " name="inNhanh" valuePropName="checked">
          <Checkbox>In nhanh</Checkbox>
        </Form.Item>
        <Form.Item label=" " name="kySo" valuePropName="checked">
          <Checkbox>K?? s???</Checkbox>
        </Form.Item>
        {editStatus && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>C?? hi???u l???c</Checkbox>
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
