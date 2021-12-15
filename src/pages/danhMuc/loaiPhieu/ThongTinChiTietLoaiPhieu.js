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
import { CloseOutlined } from "@ant-design/icons";
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
import { INNHANH_KYSO } from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";

const ThongTinChiTietLoaiPhieu = ({
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
  setStateParent,

  refCallbackSave = {}
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

  useEffect(() => {
    if (dataEditDefault) {
      setState({ ...stateParent });
      if (
        !stateParent.editStatus &&
        stateParent.mauBaoCao === null &&
        stateParent.defaultFileList?.length === 0 &&
        !stateParent.invalidMauBaoCao
      ) {
        form.resetFields();
      } else {
        form.setFieldsValue({
          ...dataEditDefault,
        });
      }
    }
  }, [dataEditDefault, stateParent]);

  useEffect(() => {
    onSizeChange({ size: 10 });
    getUtils({ name: "huongGiay" });
    getUtils({ name: "khoGiay" });
    getUtils({ name: "DinhDangBaoCao" });
  }, []);

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        console.log("values: ", values);
        // if (!state.mauBaoCao) {
        //     setState({
        //         invalidMauBaoCao: true,
        //     });
        //     return;
        // }
        let formattedData = {
          ...values,
          ma: values?.ma?.trim(),
          ten: values?.ten?.trim(),
          // chieuDoc: values.chieuDoc || null,
          // chieuNgang: values.chieuNgang || null,
          // mauBaoCao: state.mauBaoCao,
          // dinhDang: values.dinhDang || null,
        };
        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
        }

        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
          }
          setState({
            mauBaoCao: null,
            defaultFileList: [],
          });
          setStateParent({
            isSelected: false,
          });
        });
      })
      .catch((error) => {
        if (!state.mauBaoCao) {
          setState({
            invalidMauBaoCao: true,
          });
          return;
        }
      });
  };
  refCallbackSave.current = handleAdded;

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
    let roleSave = [ROLES["DANH_MUC"].LOAI_PHIEU_THEM];
    let roleEdit = [ROLES["DANH_MUC"].LOAI_PHIEU_SUA];
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
    let roleSave = [ROLES["DANH_MUC"].LOAI_PHIEU_THEM];
    let roleEdit = [ROLES["DANH_MUC"].LOAI_PHIEU_SUA];
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
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [stateParent]);
  return (
    // <Col
    //     {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
    //     className={`mt-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
    // >
    <BaoCaoChiTietStyle>
      {/* <CreatedWrapper
                title="Thông tin chi tiết"
                onCancel={handleCancel}
                cancelText="Hủy"
                onOk={handleAdded}
                okText="Lưu"
                roleSave={[ROLES["DANH_MUC"].BAO_CAO_THEM]}
                roleEdit={[ROLES["DANH_MUC"].BAO_CAO_SUA]}
                editStatus={state.editStatus}
            > */}
      <Wrapper>
        <div className="header-create">
          <div className="create-title">Thông tin chi tiết</div>
        </div>
        <div className="header-body">
          <FormWraper
            disabled={
              state.editStatus
                ? !checkRole([ROLES["DANH_MUC"].LOAI_PHIEU_SUA])
                : !checkRole([ROLES["DANH_MUC"].LOAI_PHIEU_THEM])
            }
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item
              label="Mã loại phiếu"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã loại phiếu!",
                },
                // {
                //     max: 20,
                //     message: "Vui lòng nhập mã báo cáo không quá 20 ký tự!",
                // },
                {
                  whitespace: true,
                  message: "Vui lòng nhập mã loại phiếu!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập mã loại phiếu"
                ref={refAutoFocus}
                autoFocus={true}
              />
            </Form.Item>
            <Form.Item
              label="Tên loại phiếu"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên loại phiếu!",
                },
                // {
                //     max: 20,
                //     message: "Vui lòng nhập mã báo cáo không quá 20 ký tự!",
                // },
                {
                  whitespace: true,
                  message: "Vui lòng nhập tên loại phiếu!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên loại phiếu"
              />
            </Form.Item>
            {state.editStatus && (
              <Form.Item label=" " name="active" valuePropName="checked">
                <Checkbox>Có hiệu lực</Checkbox>
              </Form.Item>
            )}
          </FormWraper>

          {/* </CreatedWrapper> */}
          <div className="button-bottom-modal">
            <Button
              className="button-cancel"
              onClick={handleCancel}
              hidden={handleHiddenCancel()}
            >
              {"Hủy"}
              <CloseOutlined />
            </Button>
            <Button
              className="button-ok"
              onClick={handleAdded}
              // loading={props.loading}
              hidden={handleHiddenSave()}
            >
              {"Lưu [F4]"}
              <img
                style={{ marginLeft: 6 }}
                src={require("assets/images/kho/save.png")}
                alt=""
              ></img>
            </Button>
          </div>
        </div>
      </Wrapper>
    </BaoCaoChiTietStyle>
    // </Col>
  );
};

const mapStateToProps = ({
  loaiPhieu: {
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
  };
};
const mapDispatchToProps = ({
  loaiPhieu: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  createOrEdit,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThongTinChiTietLoaiPhieu);
