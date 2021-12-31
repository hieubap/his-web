import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
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
import { Main, BaoCaoChiTietStyle, Wrapper } from "./styled";
import uploadImg from "assets/images/his-core/import.png";
import { SORT_DEFAULT, DS_DINH_DANG } from "./configs";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import { IN_NHANH_KYSO } from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import { CloseOutlined } from "@ant-design/icons";
const BaoCaoChiTiet = ({
  listData,
  onSizeChange,
  updateData,
  onChangeInputSearch,
  onSortChange,
  dataSortColumn,
  totalElements,
  page,
  size,
  onSearch,
  dataEditDefault,
  createOrEdit,
  getUtils,
  listhuongGiay,
  listkhoGiay,
  listDinhDangBaoCao,
  stateParent,
  onSizeChangeLoaiPhieu,
  listDataLoaiPhieu,
  setStateParent,

  refCallbackSave = {},
  renderForm = () => <></>,
  layerId,
  ...props
}) => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

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
  const refAutoFocus = useRef(null);
  const refClickBtnSave = useRef();
  const refClickBtnAdd = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;
  console.log(layerId, " layerId ...");
  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: (e) => {
            refClickBtnAdd.current && refClickBtnAdd.current(e);
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);

  refClickBtnAdd.current = () => {
    form.resetFields();
    if (refAutoFocus.current) refAutoFocus.current.focus();
  };
  // useEffect(() => {
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [stateParent]);
  useEffect(() => {
    // if (dataEditDefault) {
    //   setState({ ...stateParent });
    //   if (
    //     !stateParent.editStatus &&
    //     stateParent.mauBaoCao === null &&
    //     stateParent.defaultFileList?.length === 0 &&
    //     !stateParent.invalidMauBaoCao
    //   ) {
    //     form.resetFields();
    //   } else {
    //     if (
    //       dataEditDefault?.dsLoaiBaoCaoId?.length < 1 ||
    //       !dataEditDefault?.dsLoaiBaoCaoId
    //     ) {
    //       dataEditDefault.dsLoaiBaoCaoId = [];
    //     }
    //     form.setFieldsValue({
    //       ...dataEditDefault,
    //     });
    //   }
    // }
  }, [stateParent]);

  useEffect(() => {
    if (dataEditDefault) {
      form.setFieldsValue(dataEditDefault);
    }
  }, [dataEditDefault]);

  const handleAdded = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        createOrEdit(values);
      })
      .catch((error) => {});
  };

  refClickBtnSave.current = handleAdded;

  const onChangeKhoGiay = (val) => {
    setState({
      isRequiredKichThuoc: val === 200,
    });
    form.validateFields();
  };
  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
    setStateParent({
      isSelected: true,
    });
  };
  const handleHiddenCancel = () => {
    let roleSave = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    let roleEdit = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };
  const handleHiddenSave = () => {
    let roleSave = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    let roleEdit = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };
  return (
    <div>
      <FormWraper
        disabled={
          state.editStatus
            ? !checkRole([ROLES["DANH_MUC"].BAO_CAO_SUA])
            : !checkRole([ROLES["DANH_MUC"].BAO_CAO_THEM])
        }
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        className="form-custom"
      >
        {renderForm({ form, refAutoFocus, autoFocus: true })}
      </FormWraper>

      <div className="button-bottom-modal">
        <Button
          className="button-cancel"
          onClick={handleCancel}
          hidden={handleHiddenCancel()}
        >
          Hủy
          <CloseOutlined />
        </Button>
        <Button
          className="button-ok"
          onClick={handleAdded}
          // loading={props.loading}
          hidden={handleHiddenSave()}
        >
          Lưu [F4]
          <img
            style={{ marginLeft: 6 }}
            src={require("assets/images/kho/save.png")}
            alt=""
          ></img>
        </Button>
      </div>
    </div>
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
  onSizeChangeLoaiPhieu,
});
export default connect(mapStateToProps, mapDispatchToProps)(BaoCaoChiTiet);
