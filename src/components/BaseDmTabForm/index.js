import Icon from "@ant-design/icons";
import { Col, Form } from "antd";
import { checkRole } from "app/Sidebar/constant";
import IcCreate from "assets/images/kho/IcCreate.png";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import extendTable from "assets/svg/extendTable.svg";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import { HOST } from "client/request";
import HomeWrapper from "components/HomeWrapper";
import MultiLevelTab from "./MultiLevelTab";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import {
  ADD_LAYOUT,
  ADD_LAYOUT_COLLAPSE,
  ROLES,
  TABLE_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
} from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { SORT_DEFAULT } from "./configs";
import { GlobalStyle, Main } from "./styled";
import { combineSort } from "../../utils";

const BaseDmTabForm = ({
  dataEditDefault,

  updateData,
  listPanel = () => [],
  listData,
  getData = () => {},
  getColumns,
  hotKeys,
  totalElements,
  page,
  size,
  customHandleClickedBtnAdded,
  customOnSelectColumn,

  title,
  roleSave,
  roleEdit,
  dataSearch = {},
  dataSort = {},
  rowKey,
}) => {
  const [form] = Form.useForm();
  const [collapseStatus, setCollapseStatus] = useState(false);

  const [state, _setState] = useState({
    mauBaoCao: null,
    defaultFileList: [],
    showFullTable: false,
    activeKeyTab: "0",
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const generateHotkeyArr = () => {
    const output = [];
    if (listPanel) {
      for (let i = 0; i < listPanel({}).length; i++) {
        output[i] = stringUtils.guid();
      }
    }

    return output;
  };
  const refLayerHotKey = useRef(generateHotkeyArr());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const { onAddLayer } = useDispatch().phimTat;
  // register layerId
  useEffect(() => {
    getData({ ...dataSearch, page: 0 });
    onAddLayer({ layerId: refLayerHotKey.current[0] });
    // onRegisterHotkey({
    //   layerId: refLayerHotKey.current[0],
    //   hotKeys: [
    //     {
    //       keyCode: 115, //F4
    //       onEvent: (e) => {
    //         refClickBtnSave.current && refClickBtnSave.current(e);
    //       },
    //     },
    //   ],
    // });
    // return () => {
    //   onRemoveLayer({ layerId: refLayerHotKey.current });
    // };
  }, []);

  refClickBtnSave.current = (e) => {
    const { activeKeyTab } = state;

    const _hotkey = hotKeys.find(
      (hotkey) =>
        hotkey.layerId === refLayerHotKey.current[state.activeKeyTab] &&
        hotkey.keyCode === 115
    );

    if (_hotkey && _hotkey.onEvent) {
      _hotkey.onEvent();
    }
  };

  const handleClickedBtnAdded = () => {
    setState({
      mauBaoCao: null,
      defaultFileList: [],
      invalidMauBaoCao: false,
    });

    const _hotkey = hotKeys.find(
      (hotkey) =>
        hotkey.layerId === refLayerHotKey.current[state.activeKeyTab] &&
        hotkey.keyCode === 112
    );

    if (_hotkey && _hotkey.onEvent) {
      _hotkey.onEvent();
    }
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const _onSelectColumn = (_dataEdit) => {
    updateData({ _dataEdit });
  };
  const handleShowColumn = customOnSelectColumn
    ? customOnSelectColumn({ form, callback: _onSelectColumn })
    : (_dataEdit = {}) => {
        updateData({ _dataEdit });
      };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        handleShowColumn(record);
      },
    };
  };

  // sắp xếp bản ghi
  const onClickSort = (key, value) => {
    updateData({
      _dataSort: {
        ...dataSort,
        [key]: value,
      },
    });
    const sort = { ...dataSort, [key]: value };
    delete sort.createdAt;
    const res = combineSort(sort);
    console.log(res, "res...");
    getData({
      ...dataSearch,
      page: 0,
      size,
      sort: res,
    });
  };

  // xử lý tìm kiếm bảng
  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        getData({
          ...dataSearch,
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };

  const handleChangePage = (page) => {
    getData({ ...dataSearch, page: page - 1 });
  };

  const handleSizeChange = (size) => {
    getData({ ...dataSort, page: 0, size });
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
    setCollapseStatus(!collapseStatus);
  };
  const onChangeTab = (activeKeyTab) => {
    onAddLayer({ layerId: refLayerHotKey.current[activeKeyTab] });
    setState({ activeKeyTab });
  };
  return (
    <Main>
      <GlobalStyle />
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
            title={title}
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
              checkRole(roleSave)
                ? [
                    {
                      title: "Thêm mới [F1]",
                      type: "create",
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
            columns={getColumns({
              onClickSort,
              onSearchInput,
              dataSort,
              page,
              size,
            })}
            dataSource={listData}
            onRow={onRow}
            layerIds={refLayerHotKey.current}
            dataEditDefault={dataEditDefault}
            refClickBtnAdd={refClickBtnAdd}
            rowKey={rowKey}
            // rowClassName={setRowClassName}
          />
          {totalElements ? (
            <Pagination
              listData={listData}
              onChange={handleChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
              style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
            />
          ) : null}
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
          >
            <MultiLevelTab
              listPanel={listPanel({ layerIds: refLayerHotKey.current })}
              isBoxTabs={true}
              activeKey={state.activeKeyTab}
              onChange={onChangeTab}
              layerIds={refLayerHotKey.current}
            />
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};
export default BaseDmTabForm;
