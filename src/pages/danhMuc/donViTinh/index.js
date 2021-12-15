import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Tabs } from "antd";
import HomeWrapper from "components/HomeWrapper";
import { Main } from "./styled";
import { tableLayoutFull } from "./config";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import { GroupUnit, Unit, FormGroupUnit, FormUnit, Total } from "./components";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import stringUtils from "mainam-react-native-string-utils";

const { TabPane } = Tabs;

const DonViTinh = ({
  createOrEditNhomDonViTinh,
  createOrEditDonViTinh,
  searchDonViTinh,
  searchNhomDonViTinh,
  listGroupUnit,
  pageGroupUnit,
  sizeGroupUnit,
  totalGroupUnit,
  updateData,
  pageUnit,
  sizeUnit,
  totalUnit,
  listUnit,
  dataSortGroupUnit,
  dataSortUnit,
  dataSearchGroupUnit,
  dataSearchUnit,
  dataEditUnitDefault,
  dataEditGroupUnitDefault,
  phimTat,
}) => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const { onAddLayer } = useDispatch().phimTat;

  const [editStatus, setEditStatus] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [editUnitId, setEditUnitId] = useState(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const formGroupUnitRef = useRef(null);
  const formUnitRef = useRef(null);
  const fullTableLayout = { xl: 24, xxl: 24 };
  useEffect(() => {
    const sort = combineSort(SORT_DEFAULT);
    if (activeTab !== 1) {
      const currentSort =
        dataEditGroupUnitDefault?.id && activeTab !== 0
          ? { nhomDonViTinhId: dataEditGroupUnitDefault.id }
          : {};
      searchDonViTinh({
        pageUnit,
        sizeUnit,
        sort,
        ...currentSort,
      });
    }

    if (dataEditGroupUnitDefault?.id && formGroupUnitRef.current) {
      formGroupUnitRef.current.setfields(dataEditGroupUnitDefault);
    }
  }, [activeTab, dataEditGroupUnitDefault?.id]);

  useEffect(() => {
    const sort = combineSort(SORT_DEFAULT);
    searchNhomDonViTinh({ pageGroupUnit, sizeGroupUnit, sort });
  }, []);

  const callback = (key) => {
    setActiveTab(parseInt(key, 10));
    if (key === "1") onAddLayer({ layerId: refLayerHotKey1.current });
    else onAddLayer({ layerId: refLayerHotKey2.current });
  };

  const addNewGroupUnit = (values) => {
    createOrEditNhomDonViTinh({ ...values, id: dataEditGroupUnitDefault?.id })
      .then(() => {
        searchNhomDonViTinh({
          pageGroupUnit,
          sizeGroupUnit,
          ...dataSearchGroupUnit,
        }).then(() => {
          if (!dataEditGroupUnitDefault?.id) {
            formGroupUnitRef.current.resetFields();
          }
        });
      })
      .catch((err) => console.error(err));
  };

  const addNewUnit = async (values) => {
    const callback = () => {
      searchDonViTinh({ pageUnit, sizeUnit, ...dataSearchUnit }).then((res) => {
        formUnitRef.current.resetFields();
      });
    };

    await createOrEditDonViTinh({ ...values, id: editUnitId, callback });
  };

  const onEditGroupUnit = (info) => {
    updateData({
      dataEditGroupUnitDefault: info,
    });
    formGroupUnitRef.current.setfields(info);
  };

  const onEditUnit = (info) => {
    updateData({
      dataEditUnitDefault: info,
    });
    setEditUnitId(info.id);
    formUnitRef.current.setfields(info);
  };

  const onSizeChangeGroupUnit = (size) => {
    const params = { pageGroupUnit, sizeGroupUnit: size };
    const sort = {
      ...SORT_DEFAULT,
      ...dataSortGroupUnit,
    };

    updateData(params);
    searchNhomDonViTinh({
      ...params,
      ...dataSearchGroupUnit,
      sort: combineSort(sort),
    });
  };

  const onChangePageGroupUnit = (values) => {
    const params = { pageGroupUnit: values - 1, sizeGroupUnit };
    const sort = {
      ...SORT_DEFAULT,
      ...dataSortGroupUnit,
    };
    updateData(params);
    searchNhomDonViTinh({
      ...params,
      ...dataSearchGroupUnit,
      sort: combineSort(sort),
    });
  };

  const onSizeChangeUnit = (size) => {
    const params = { pageUnit, sizeUnit: size };
    updateData(params);
    const sort = {
      ...SORT_DEFAULT,
      ...dataSortGroupUnit,
    };
    searchDonViTinh({
      ...params,
      ...dataSearchUnit,
      sort: combineSort(sort),
    });
  };

  const onChangePageUnit = (page) => {
    const params = { pageUnit: page - 1, sizeUnit };
    const sort = {
      ...SORT_DEFAULT,
      ...dataSortGroupUnit,
    };
    updateData(params);
    searchDonViTinh({
      ...params,
      ...dataSearchUnit,
      sort: combineSort(sort),
    });
  };

  const onResetUnitForm = () => {
    if (formUnitRef.current && editUnitId) {
      setEditStatus(false);
      formUnitRef.current.resetFields();
    }
  };

  const onResetGroupUnitForm = () => {
    if (formGroupUnitRef.current && dataEditGroupUnitDefault?.id) {
      setEditStatus(false);
      formGroupUnitRef.current.resetFields();
    }
  };

  const onCancelUpdateUnitForm = () => {
    if (formUnitRef.current) {
      formUnitRef.current.setfields(dataEditUnitDefault);
    }
  };

  const onCancelUpdateGroupUnitForm = () => {
    if (formGroupUnitRef.current) {
      formGroupUnitRef.current.setfields(dataEditGroupUnitDefault);
    }
  };
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
    setState({
      changeCollapseStatus: true,
      collapseStatus: !state.collapseStatus,
    });
    setTimeout(() => {
      setState({
        changeCollapseStatus: false,
      });
    }, 500);
  };
  const layout = activeTab === 0 ? { ...tableLayoutFull } : { ...TABLE_LAYOUT };
  return (
    <Main>
      <HomeWrapper title="Danh mục đơn vị tính">
        <Col
          {...(activeTab === 0
            ? fullTableLayout
            : !state.showFullTable
            ? state.collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          className={`pr-3 ${
            state.changeCollapseStatus || activeTab == 0
              ? "transition-ease"
              : ""
          }`}
        >
          <div className="title-parentChild">Danh mục đơn vị tính</div>
          <Tabs
            defaultActiveKey={activeTab}
            onChange={callback}
            className="table-tab"
          >
            <TabPane tab="Tất cả" key={0}>
              <Total
                listUnit={listUnit}
                listGroupUnit={listGroupUnit}
                searchDonViTinh={searchDonViTinh}
                pageGroupUnit={pageGroupUnit}
                sizeGroupUnit={sizeGroupUnit}
                onEditUnit={onEditUnit}
                page={pageUnit}
                size={sizeUnit}
                total={totalUnit}
                onSizeChange={onSizeChangeUnit}
                onPageChange={onChangePageUnit}
                onReset={onResetUnitForm}
                updateData={updateData}
                dataSearchUnit={dataSearchUnit}
                dataEditGroupUnitDefault={dataEditGroupUnitDefault}
                dataSortUnit={dataSortUnit}
                setEditStatus={setEditStatus}
              />
            </TabPane>
            <TabPane tab="Nhóm đơn vị tính" key={1}>
              <GroupUnit
                layerId={refLayerHotKey1.current}
                handleChangeshowTable={handleChangeshowTable}
                showFullTable={state.showFullTable}
                collapseStatus={state.collapseStatus}
                handleCollapsePane={handleCollapsePane}
                listGroupUnit={listGroupUnit}
                page={pageGroupUnit}
                size={sizeGroupUnit}
                total={totalGroupUnit}
                onEditGroupUnit={onEditGroupUnit}
                updateData={updateData}
                onSizeChange={onSizeChangeGroupUnit}
                onPageChange={onChangePageGroupUnit}
                onReset={onResetGroupUnitForm}
                searchNhomDonViTinh={searchNhomDonViTinh}
                dataSearchGroupUnit={dataSearchGroupUnit}
                dataSortGroupUnit={dataSortGroupUnit}
                setEditStatus={setEditStatus}
              />
            </TabPane>
            <TabPane tab="Đơn vị tính" key={2}>
              <Unit
                layerId={refLayerHotKey2.current}
                handleChangeshowTable={handleChangeshowTable}
                showFullTable={state.showFullTable}
                collapseStatus={state.collapseStatus}
                handleCollapsePane={handleCollapsePane}
                listUnit={listUnit}
                listGroupUnit={listGroupUnit}
                searchDonViTinh={searchDonViTinh}
                pageGroupUnit={pageGroupUnit}
                sizeGroupUnit={sizeGroupUnit}
                onEditUnit={onEditUnit}
                page={pageUnit}
                size={sizeUnit}
                total={totalUnit}
                onSizeChange={onSizeChangeUnit}
                onPageChange={onChangePageUnit}
                onReset={onResetUnitForm}
                updateData={updateData}
                dataSearchUnit={dataSearchUnit}
                dataEditGroupUnitDefault={dataEditGroupUnitDefault}
                dataSortUnit={dataSortUnit}
                setEditStatus={setEditStatus}
              />
            </TabPane>
          </Tabs>
        </Col>
        {!state.showFullTable && (
          <Col
            {...(state.collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3  ${
              state.changeCollapseStatus ? "transition-ease" : ""
            } parrent-wrapper`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            {activeTab === 1 && (
              <FormGroupUnit
                layerId={refLayerHotKey1.current}
                handleSubmit={addNewGroupUnit}
                ref={formGroupUnitRef}
                onCancel={onCancelUpdateGroupUnitForm}
                editStatus={editStatus}
              />
            )}
            {activeTab === 2 && (
              <FormUnit
                layerId={refLayerHotKey2.current}
                handleSubmit={addNewUnit}
                ref={formUnitRef}
                listGroupUnit={listGroupUnit}
                onCancel={onCancelUpdateUnitForm}
                editStatus={editStatus}
              />
            )}
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    donViTinh: {
      listGroupUnit,
      totalGroupUnit,
      pageGroupUnit,
      sizeGroupUnit,
      pageUnit,
      sizeUnit,
      totalUnit,
      listUnit,
      dataEditUnitDefault,
      dataEditGroupUnitDefault,
      dataSearchGroupUnit,
      dataSearchUnit,
      dataSortGroupUnit,
      dataSortUnit,
    },
  } = state;

  return {
    listGroupUnit,
    totalGroupUnit,
    pageGroupUnit,
    sizeGroupUnit,
    pageUnit,
    sizeUnit,
    totalUnit,
    listUnit,
    dataEditUnitDefault,
    dataEditGroupUnitDefault,
    dataSearchGroupUnit,
    dataSearchUnit,
    dataSortGroupUnit,
    dataSortUnit,
  };
};
const mapDispatchToProps = ({
  donViTinh: {
    searchDonViTinh,
    searchNhomDonViTinh,
    createOrEditNhomDonViTinh,
    createOrEditDonViTinh,
    updateData,
  },
}) => ({
  searchNhomDonViTinh,
  searchDonViTinh,
  createOrEditNhomDonViTinh,
  createOrEditDonViTinh,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(DonViTinh);
