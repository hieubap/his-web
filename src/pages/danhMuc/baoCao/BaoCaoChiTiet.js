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
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [stateParent]);
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
        if (
          dataEditDefault?.dsLoaiBaoCaoId?.length < 1 ||
          !dataEditDefault?.dsLoaiBaoCaoId
        ) {
          dataEditDefault.dsLoaiBaoCaoId = [];
        }
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
    onSizeChangeLoaiPhieu({ size: 500 });
  }, []);

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let editStatus = false;
        if (!state.mauBaoCao) {
          setState({
            invalidMauBaoCao: true,
          });
          return;
        }
        let formattedData = {
          ...values,
          ma: values?.ma?.trim(),
          ten: values?.ten?.trim(),
          chieuDoc: values.chieuDoc || null,
          chieuNgang: values.chieuNgang || null,
          mauBaoCao: state.mauBaoCao,
          dinhDang: values.dinhDang || null,
        };
        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
          editStatus = true;
        }

        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
          }
          setState({
            mauBaoCao: null,
            defaultFileList: [],
          });
          if (!editStatus) {
            setStateParent({
              isSelected: false,
            });
          }
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
    // <Col
    //     {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
    //     className={`mt-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
    // >
    <BaoCaoChiTietStyle>
      {/* <CreatedWrapper
                title="Th??ng tin chi ti???t"
                onCancel={handleCancel}
                cancelText="H???y"
                onOk={handleAdded}
                okText="L??u"
                roleSave={[ROLES["DANH_MUC"].BAO_CAO_THEM]}
                roleEdit={[ROLES["DANH_MUC"].BAO_CAO_SUA]}
                editStatus={state.editStatus}
            > */}
      <Wrapper>
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
              autoFocus
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
                T???i l??n m???u b??o c??o{" "}
                <span style={{ color: "#ff4d4f" }}> * </span>
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
                message:
                  "Vui l??ng nh???p k??ch th?????c chi???u d???c kh??ng qu?? 4 k?? t???!",
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
          <Form.Item
            label="Lo???i phi???u"
            name="dsLoaiBaoCaoId"
            // rules={[
            //     {
            //         required: true,
            //         message: "Vui l??ng nh???p t??n lo???i phi???u!",
            //     },
            //     // {
            //     //     max: 20,
            //     //     message: "Vui l??ng nh???p m?? b??o c??o kh??ng qu?? 20 k?? t???!",
            //     // },
            //     {
            //         whitespace: true,
            //         message: "Vui l??ng nh???p t??n lo???i phi???u!",
            //     },
            // ]}
          >
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
          {state.editStatus && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox>C?? hi???u l???c</Checkbox>
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
            {"H???y"}
            <CloseOutlined />
          </Button>
          <Button
            className="button-ok"
            onClick={handleAdded}
            // loading={props.loading}
            hidden={handleHiddenSave()}
          >
            {"L??u [F4]"}
            <img
              style={{ marginLeft: 6 }}
              src={require("assets/images/kho/save.png")}
              alt=""
            ></img>
          </Button>
        </div>
      </Wrapper>
    </BaoCaoChiTietStyle>
    // </Col>
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
