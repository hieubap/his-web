import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import moment from "moment";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
} from "constants/index";
import {
  Checkbox,
  Col,
  Input,
  Modal,
  Form,
  Upload,
  message,
  InputNumber,
} from "antd";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import fileUtils from "utils/file-utils";
import fileUpload from "data-access/file-provider";
import { HOST, dataPath } from "client/request";
import stringUtils from "mainam-react-native-string-utils";

let timer = null;

const HangThe = (props) => {
  const {
    listHangThe,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    getListHangThe,
    createOrEdit,
    onDelete,
  } = props;

  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [data, setData] = useState([]);
  const [imageUploaded, setImageUploaded] = useState({
    loading: false,
    imageUrl: "",
  });
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (data?.findIndex((item) => item.id === dataEditDefault?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setEditStatus(true);
      updateData({ dataEditDefault: data[indexNextItem] });
      form.setFieldsValue(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListHangThe(params);
  }, []);

  useEffect(() => {
    const data = listHangThe.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listHangThe, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListHangThe({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 60,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã hạng thẻ"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã hạng thẻ"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên hạng thẻ"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên hạng thẻ"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 260,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Số điểm tối thiểu"
          sort_key="diemToiThieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.diemToiThieu || 0}
          // search={
          //   <Input
          //     placeholder="Tìm tên hạng thẻ"
          //     onChange={(e) => {
          //       onSearchInput(e.target.value, "ten");
          //     }}
          //   />
          // }
        />
      ),
      width: 260,
      dataIndex: "diemToiThieu",
      key: "diemToiThieu",
    },
    {
      title: <HeaderSearch title="Icon" />,
      width: 150,
      dataIndex: "icon",
      key: "icon",
      render: (item) => {
        return (
          <div>
            <img src={item ? fileUtils.absoluteFileUrl(item) : ""} />
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          // searchSelect={
          //   <Select
          //     data={HIEU_LUC}
          //     placeholder="Chọn hiệu lực"
          //     defaultValue=""
          //     onChange={(value) => {
          //       onSearchInput(value, "active");
          //     }}
          //   />
          // }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    // {
    //   title: <HeaderSearch title="Thao tác" />,
    //   width: 10,
    //   dataIndex: "action",
    //   key: "action",
    //   fixed: "right",
    //   align: "center",
    //   render: (item) => {
    //     return (
    //       <div className="support">
    //         <img
    //           onClick={() => handleDeleteItem(item)}
    //           src={require("assets/images/his-core/iconDelete.png")}
    //         ></img>
    //       </div>
    //     );
    //   },
    // },
  ];

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListHangThe({
        ...dataSearch,
        page: PAGE_DEFAULT,
        size,
        [name]: value,
        sort: combineSort(dataSortColumn),
      });
    }, 500);
  };

  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getListHangThe({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListHangThe({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleDeleteItem = (item) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa bản ghi này không?",
      onOk() {
        onDelete(item.id);
      },
      onCancel() {},
    });
  };

  const onClick = () => {};

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then(async ({ icon, ...values }) => {
        let iconPath = icon;
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id };
        }
        if (icon?.file && typeof icon === "object") {
          const resIcon = await fileUpload.upload(
            icon?.file?.originFileObj,
            "hangThe"
          );

          const { code, data, message: mess } = resIcon;
          if (code === 0) {
            iconPath = data;
          } else {
            message.error(mess);
            return;
          }
        }
        values = { ...values, icon: iconPath };

        createOrEdit(values).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(dataSortColumn),
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            // form.resetFields();
          }
          getListHangThe(params);
        });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAdded;

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    updateData({ dataEditDefault: data });
    form.setFieldsValue(data);
    setImageUploaded({
      ...imageUploaded,
      imageUrl: data?.icon ? fileUtils.absoluteFileUrl(data.icon) : "",
    });
    console.log(
      "fileUtils.absoluteFileUrl(data.icon): ",
      fileUtils.absoluteFileUrl(data.icon)
    );
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record.action);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    setImageUploaded({});
    form.resetFields();
    updateData({ dataEditDefault: {} });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  const handleUploadIcon = () => {
    return;
  };

  const uploadButton = (
    <div>
      {imageUploaded.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChangeIcon = (data) => {
    const fileUpload = data.file.originFileObj;
    const urlPreview = URL.createObjectURL(fileUpload);
    setImageUploaded({ ...imageUploaded, imageUrl: urlPreview });
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [dataEditDefault]);
  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  return (
    <Main>
      <HomeWrapper title="Danh mục">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title="Danh mục hạng thẻ"
            scroll={{ x: 1000 }}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].HANG_THE_THEM])
                ? [
                    {
                      title: "Thêm mới",
                      onClick: handleClickedBtnAdded,
                      buttonHeaderIcon: (
                        <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                      ),
                    },
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },

                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
                : [
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },

                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
            }
            columns={columns}
            dataSource={data}
            onRow={onRow}
            rowClassName={setRowClassName}
            rowKey="id"
          ></TableWrapper>
          {totalElements && (
            <Pagination
              onChange={onPageChange}
              current={page + 1}
              pageSize={size}
              listData={data}
              total={totalElements}
              onShowSizeChange={onSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          )}
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            <CreatedWrapper
              title="Thông tin chi tiết"
              onCancel={handleCancel}
              cancelText="Hủy"
              onOk={handleAdded}
              okText="Lưu"
              roleSave={[ROLES["DANH_MUC"].HANG_THE_THEM]}
              roleEdit={[ROLES["DANH_MUC"].HANG_THE_SUA]}
              editStatus={editStatus}
            >
              <fieldset
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].HANG_THE_SUA])
                    : !checkRole([ROLES["DANH_MUC"].HANG_THE_THEM])
                }
              >
                <FormWraper
                  // disabled={
                  //   editStatus
                  //     ? !checkRole([ROLES["DANH_MUC"].LOAI_CC_SUA])
                  //     : !checkRole([ROLES["DANH_MUC"].LOAI_CC_THEM])
                  // }
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                  className="form-custom"
                >
                  <Form.Item
                    label="Mã hạng thẻ"
                    name="ma"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mã hạng thẻ!",
                      },
                      // {
                      //   max: 20,
                      //   message:
                      //     "Vui lòng nhập mã hạng thẻ không quá 20 ký tự!",
                      // },
                      {
                        whitespace: true,
                        message: "Vui lòng nhập mã hạng thẻ!",
                      },
                    ]}
                  >
                    <Input
                      ref={refAutoFocus}
                      className="input-option"
                      placeholder="Vui lòng nhập mã hạng thẻ"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Tên hạng thẻ"
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên hạng thẻ!",
                      },
                      // {
                      //   max: 1000,
                      //   message:
                      //     "Vui lòng nhập tên hạng thẻ không quá 1000 ký tự!",
                      // },
                      {
                        whitespace: true,
                        message: "Vui lòng nhập tên hạng thẻ!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui lòng nhập tên hạng thẻ"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Số điểm tối thiểu"
                    name="diemToiThieu"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điểm tối thiểu!",
                      },
                      // {
                      //   max: 1000,
                      //   message:
                      //     "Vui lòng nhập số điểm tối thiểu không quá 1000 ký tự!",
                      // },
                      // {
                      //   whitespace: true,
                      //   message: "Vui lòng nhập số điểm tối thiểu!",
                      // },
                    ]}
                  >
                    <InputNumber
                      type="number"
                      className="input-option"
                      placeholder="Vui lòng nhập số điểm tối thiểu"
                    />
                  </Form.Item>

                  <Form.Item label="Icon" name="icon">
                    <Upload
                      name="icon"
                      showUploadList={false}
                      listType="picture-card"
                      multiple={false}
                      maxCount={1}
                      customRequest={handleUploadIcon}
                      onChange={handleChangeIcon}
                    >
                      {imageUploaded.imageUrl ? (
                        <img
                          src={imageUploaded?.imageUrl}
                          alt="icon"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>

                  {/* <Form.Item label=" " name="active" valuePropName="checked">
                <Checkbox>Có hiệu lực</Checkbox>
              </Form.Item> */}

                  {editStatus && (
                    <Form.Item label=" " name="active" valuePropName="checked">
                      <Checkbox>Có hiệu lực</Checkbox>
                    </Form.Item>
                  )}
                </FormWraper>
              </fieldset>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    hangThe: {
      listHangThe,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
  } = state;

  return {
    listHangThe,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
  };
};
const mapDispatchToProps = ({
  hangThe: { getListHangThe, createOrEdit, onDelete, updateData },
}) => ({
  getListHangThe,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(HangThe);
