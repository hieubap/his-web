import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { combineSort } from "utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import fileUpload from "data-access/file-provider";
import fileUtils from "utils/file-utils";
import { Main } from "./styled";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  HIEU_LUC,
  TABLE_LAYOUT,
  ROLES,
} from "constants/index";
import { Checkbox, Col, Input, Form, Upload, message } from "antd";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import { openInNewTab } from "utils";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";

const { TextArea } = Input;
let timer = null;

const BenhVien = (props) => {
  const {
    listBenhVien,
    listAllTinh,
    listtuyenBenhVien,
    listhangBenhVien,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    getListBenhVien,
    getListAllTinh,
    getUtils,
    createOrEdit,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [imageUploaded, setImageUploaded] = useState({
    loading: false,
    imageUrl: "",
  });
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [collapseStatus, setCollapseStatus] = useState(false);

  const [state, _setState] = useState({
    showFullTable: false,
  });
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
      setImageUploaded({
        ...imageUploaded,
        imageUrl: data[indexNextItem]?.logo
          ? fileUtils.absoluteFileUrl(data[indexNextItem].logo)
          : "",
      });
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListBenhVien(params);
    getListAllTinh();
    getUtils({ name: "tuyenBenhVien" });
    getUtils({ name: "hangBenhVien" });
  }, []);

  useEffect(() => {
    const data = listBenhVien.map((item, index) => {
      return { ...item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listBenhVien, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    delete sort.createdAt;
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListBenhVien({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 80,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: <HeaderSearch title="Logo" />,
      width: 120,
      dataIndex: "logo",
      key: "logo",
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
          title="M?? b???nh vi???n"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="T??m m?? b???nh vi???n"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="T??n b???nh vi???n"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="T??m t??n b???nh vi???n"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 190,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Tuy???n b???nh vi???n"
          sort_key="tuyenBenhVien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tuyenBenhVien || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listtuyenBenhVien]}
              defaultValue=""
              placeholder="Ch???n tuy???n b???nh vi???n"
              onChange={(value) => {
                onSearchInput(value, "tuyenBenhVien");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tuyenBenhVien",
      key: "tuyenBenhVien",
      render: (tuyenBenhVien) => {
        return listtuyenBenhVien.find((tuyen) => tuyen.id === tuyenBenhVien)
          ?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="H???ng b???nh vi???n"
          sort_key="hangBenhVien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.hangBenhVien || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listhangBenhVien]}
              defaultValue=""
              placeholder="Ch???n h???ng b???nh vi???n"
              onChange={(value) => {
                onSearchInput(value, "hangBenhVien");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hangBenhVien",
      key: "hangBenhVien",
      render: (hangBenhVien) => {
        return listhangBenhVien.find((hang) => hang.id === hangBenhVien)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T???nh/TP"
          sort_key="tinhThanhPho.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tinhThanhPho.ten"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listAllTinh]}
              defaultValue=""
              placeholder="T??m t???nh th??nh ph???"
              onChange={(value) => {
                onSearchInput(value, "tinhThanhPhoId");
              }}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "tinhThanhPho",
      key: "tinhThanhPho",
      render: (item) => {
        return item && <span>{item.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="?????a ch???"
          sort_key="diaChi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.diaChi || 0}
          search={
            <Input
              placeholder="T??m ?????a ch???"
              onChange={(e) => {
                onSearchInput(e.target.value, "diaChi");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "diaChi",
      key: "diaChi",
      render: (item) => {
        return <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ghi ch??"
          sort_key="ghiChu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ghiChu || 0}
          search={
            <Input
              placeholder="T??m ghi ch??"
              onChange={(e) => {
                onSearchInput(e.target.value, "ghiChu");
              }}
            />
          }
        />
      ),
      width: 160,
      dataIndex: "ghiChu",
      key: "ghiChu",
      render: (item) => {
        return <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n hi???u l???c"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          title="C?? hi???u l???c"
        />
      ),
      width: 130,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListBenhVien({
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
    getListBenhVien({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListBenhVien({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then(async ({ logo, ...values }) => {
        let logoPath = logo;
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id };
        }

        if (typeof logo !== "string") {
          const resLogo = await fileUpload.upload(
            logo?.file?.originFileObj,
            "benhVien"
          );

          const { code, data } = resLogo;

          if (code === 0) {
            logoPath = data;
          }
        }

        values = { ...values, logo: logoPath };

        createOrEdit(values).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(editStatus ? dataSortColumn : { createdAt: 2 }),
          };
          if (!editStatus) {
            setDataSortColumn({
              createdAt: 2,
            });
            params.page = PAGE_DEFAULT;
            form.resetFields();
            setImageUploaded({ ...imageUploaded, imageUrl: "" });
          }
          getListBenhVien(params);
        });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAdded;

  const handleUploadLogo = () => {
    return;
  };

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    updateData({ dataEditDefault: data });
    form.setFieldsValue(data);
    setImageUploaded({
      ...imageUploaded,
      imageUrl: data?.logo ? fileUtils.absoluteFileUrl(data.logo) : "",
    });
  };

  const onRow = (record) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    form.resetFields();
    updateData({ dataEditDefault: {} });
    setImageUploaded({ ...imageUploaded, imageUrl: "" });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const uploadButton = (
    <div>
      {imageUploaded.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChangeLogo = (data) => {
    const fileUpload = data.file.originFileObj;
    const urlPreview = URL.createObjectURL(fileUpload);
    setImageUploaded({ ...imageUploaded, imageUrl: urlPreview });
  };

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
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
      <HomeWrapper title="Danh m???c">
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
            title="Danh m???c b???nh vi???n"
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
              checkRole([ROLES["DANH_MUC"].BENH_VIEN_THEM])
                ? [
                    {
                      title: "Th??m m???i",
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
          ></TableWrapper>
          {totalElements > size && (
            <Pagination
              onChange={onPageChange}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              listData={listBenhVien}
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
              title="Th??ng tin chi ti???t"
              onCancel={handleCancel}
              cancelText="H???y"
              onOk={handleAdded}
              okText="L??u"
              roleSave={[ROLES["DANH_MUC"].BENH_VIEN_THEM]}
              roleEdit={[ROLES["DANH_MUC"].BENH_VIEN_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].BENH_VIEN_SUA])
                    : !checkRole([ROLES["DANH_MUC"].BENH_VIEN_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="M?? b???nh vi???n"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p m?? b???nh vi???n!",
                    },
                    {
                      max: 20,
                      message: "Vui l??ng nh???p m?? b???nh vi???n kh??ng qu?? 20 k?? t???!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p m?? b???nh vi???n!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Nh???p m?? b???nh vi???n"
                    ref={refAutoFocus}
                  />
                </Form.Item>
                <Form.Item label="Logo" name="logo">
                  <Upload
                    name="logo"
                    showUploadList={false}
                    listType="picture-card"
                    multiple={false}
                    maxCount={1}
                    customRequest={handleUploadLogo}
                    onChange={handleChangeLogo}
                  >
                    {imageUploaded.imageUrl ? (
                      <img
                        src={imageUploaded.imageUrl}
                        alt="logo"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="T??n b???nh vi???n"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p t??n b???nh vi???n!",
                    },
                    {
                      max: 1000,
                      message:
                        "Vui l??ng nh???p t??n b???nh vi???n kh??ng qu?? 1000 k?? t???!",
                    },
                  ]}
                >
                  <Input className="input-option" />
                </Form.Item>
                <Form.Item label="Tuy???n b???nh vi???n" name="tuyenBenhVien">
                  <Select
                    data={listtuyenBenhVien}
                    placeholder="Ch???n tuy???n b???nh vi???n"
                  />
                </Form.Item>
                <Form.Item label="H???ng b???nh vi???n" name="hangBenhVien">
                  <Select
                    data={listhangBenhVien}
                    placeholder="Ch???n h???ng b???nh vi???n"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() =>
                        openInNewTab("/danh-muc/dia-chi-hanh-chinh?tab=2")
                      }
                    >
                      T???nh/TP
                    </div>
                  }
                  name="tinhThanhPhoId"
                >
                  <Select data={listAllTinh} placeholder="Ch???n t???nh/TP" />
                </Form.Item>
                <Form.Item label="?????a ch???" name="diaChi">
                  <Input className="input-option" placeholder="Nh???p ?????a ch???" />
                </Form.Item>
                <Form.Item label="Ghi ch??" name="ghiChu">
                  <TextArea
                    rows={4}
                    placeholder="Nh???p ghi ch??"
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>
                {editStatus && (
                  <Form.Item name="active" label=" " valuePropName="checked">
                    <Checkbox>Hi???u l???c</Checkbox>
                  </Form.Item>
                )}
              </FormWraper>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    benhVien: {
      listBenhVien,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    ttHanhChinh: { listAllTinh },
    utils: { listtuyenBenhVien = [], listhangBenhVien = [] },
  } = state;

  return {
    listBenhVien,
    listAllTinh,
    listtuyenBenhVien,
    listhangBenhVien,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  benhVien: { getListBenhVien, createOrEdit, onDelete, updateData },
  ttHanhChinh: { getListAllTinh },
  utils: { getUtils },
}) => ({
  getListBenhVien,
  getListAllTinh,
  getUtils,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(BenhVien);
