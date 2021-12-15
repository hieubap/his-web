import React, { useEffect } from "react";
import { Button, Select, Tooltip, DatePicker } from "antd";
import { connect } from "react-redux";
import actionUnit from "@actions/unit";
import Table from "@admin/components/common/Table";
import SelectSize from "@admin/components/common/SelectSize";
import Pagination from "@admin/components/common/Pagination";
import { AdminPage, Panel } from "@admin/components/admin";
import ClientUtils from "@utils/client-utils";
import moment from "moment";
import { withTranslate } from 'react-redux-multilingual';
import CreateOrEdit from './create';
import DataContants from '@config/data-contants';
import Authorization from "@admin/components/auth"
const { Option } = Select;

function index(props) {
  const { translate } = props;
  const onSizeChange = size => {
    props.onSizeChange(size);
  };

  const onPageChange = page => {
    props.gotoPage(page);
  };
  useEffect(() => {
    props.updateData({
      showCreateOrEdit: false,
      searchMa: '',
      searchTen: '',
      searchCreatedAt: '',
      searchActive: ''
    });
    props.onSearch();
  }, []);
  let data = props.data && props.data.length ? props.data.map((item, index) => {
    return {
      key: index,
      col1: (props.page - 1) * props.size + index + 1,
      col2: item.ma,
      col3: item.ten,
      col4: item.logo,
      col5: item.createdAt && moment(item.createdAt).format("DD/MM/YYYY HH:ss"),
      col6: item.active,
      col7: item.ghiChu,
      col8: item,
    };
  }) : [];
  const editItem = (item) => {
    if (item) {
      props.updateData({
        showCreateOrEdit: true,
        ...item
      })
    } else {
      props.updateData({
        showCreateOrEdit: true,
        id: "",
        ma: "",
        ten: "",
        ghiChu: "",
        logo: "",
        active: false
      })
    }
  };
  const onDeleteItem = item => () => {
    props.onDeleteItem(item);
  };
  const checkStatus = (data) => {
    let check = data ? 1 : 2
    let status = DataContants.listStatusValidity.filter((item) => {
      return parseInt(item.label) === check;
    });
    if (status.length > 0) return status[0];
    return {};
  };
  const authorities = ["ROLE_admin_ivisitor"]
  return (
    <Authorization
      arrRole={authorities}
    >
      <AdminPage
        className="mgr-unit"
        icon="subheader-icon fal fa-window"
        header={translate('quanlydonvi')}
        subheader={translate('danhsachdonvi')}
      >
        <Panel
          id={"mgr-unit"}
          allowClose={false}
          allowCollapse={false}
          // title="Danh sách tài khoản"
          toolbar={
            <div className="toolbar">
              <Button className="button btn-create" onClick={() => editItem()}>
                {translate("themmoi")}
              </Button>
            </div>
          }
        >
          <Table
            scroll={{ x: 800, y: 500 }}
            style={{ marginLeft: -10, marginRight: -10 }}
            className="custom"
            columns={[
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("stt")}</div>
                    <div
                      className="addition-box"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#000"
                      }}
                    >
                      {translate("loctheo")}
                    </div>
                  </div>
                ),
                width: 100,
                dataIndex: "col1",
                key: "col1"
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("madonvi")}</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img src={require("@images/icon/ic-search.png")} alt="" />
                        <input
                          value={props.searchMa}
                          onChange={e => {
                            props.updateData({
                              searchMa: e.target.value
                            })
                            if (props.clearTimeOutAffterRequest) {
                              try {
                                clearTimeout(props.clearTimeOutAffterRequest);
                              } catch (error) { }
                            }
                            let data = setTimeout(() => {
                              props.gotoPage(0);
                            }, 500)
                            props.updateData({
                              clearTimeOutAffterRequest: data
                            })
                          }
                            // props.onSearch(e.target.value, "ma")
                          }
                          placeholder={translate("timtheomadonvi")}
                        />
                      </div>
                    </div>
                  </div>
                ),
                width: 150,
                dataIndex: "col2",
                key: "col2"
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("tendonvi")}</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img src={require("@images/icon/ic-search.png")} alt="" />
                        <input
                          value={props.searchTen}
                          onChange={e => {
                            props.updateData({
                              searchTen: e.target.value
                            })
                            if (props.clearTimeOutAffterRequest) {
                              try {
                                clearTimeout(props.clearTimeOutAffterRequest);
                              } catch (error) { }
                            }
                            let data = setTimeout(() => {
                              props.gotoPage(0);
                            }, 500)
                            props.updateData({
                              clearTimeOutAffterRequest: data
                            })
                          }
                            // props.onSearch(e.target.value, "ten")
                          }
                          placeholder={translate("timtheotendonvi")}
                        />
                      </div>
                    </div>
                  </div>
                ),
                width: 200,
                dataIndex: "col3",
                key: "col3",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("logodonvi")}</div>
                    <div className="addition-box"> </div>
                  </div>
                ),
                width: 200,
                dataIndex: "col4",
                key: "col4",
                render: item => {
                  return (
                    <img style={{ width: "70%", objectFit: 'conver', maxHeight: 70, objectFit: "contain" }} src={ClientUtils.serverApi + "/api/visitor/v1/files/" + item} alt="" />
                  )
                }
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("ngaytao")}</div>
                    <div className="addition-box">
                      <DatePicker
                        value={props.searchCreatedAt}
                        onChange={(e) => {
                          props.onSearch(e && e._d ? e._d : null, "createdAt")
                        }}
                        style={{ width: "100%" }}
                        disabled={props.id ? true : false}
                        format={"DD/MM/YYYY"}
                        placeholder={translate("nhapngaytao")}
                        getPopupContainer={trigger => trigger.parentNode}
                      />
                    </div>
                  </div>
                ),
                width: 200,
                dataIndex: "col5",
                key: "col5",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("trangthai")}</div>
                    <div className="addition-box">
                      <Select
                        value={props.searchActive.toString()}
                        onChange={(e) => {
                          props.onSearch(e, "active");
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase().unsignText()
                            .indexOf(input.toLowerCase().unsignText()) >= 0
                        }
                        placeholder={translate("chontrangthai")}
                      >
                        <Option value="">{translate("tatca")}</Option>
                        {DataContants.listStatusValidity &&
                          DataContants.listStatusValidity.length &&
                          DataContants.listStatusValidity.map((option, index) => {
                            return (
                              <Option key={index} value={option.id.toString()}>
                                {props.intl === "vi" ? option.name : option.english}
                              </Option>
                            );
                          })}
                      </Select>
                    </div>
                  </div>
                ),
                width: 180,
                dataIndex: "col6",
                key: "col6",
                render: item => {
                  return (
                    <>{checkStatus(item) && checkStatus(item).name}</>
                  )
                }
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("ghichu")}</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 200,
                dataIndex: "col7",
                key: "col7",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("tienich")}</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 90,
                dataIndex: "col8",
                key: "col8",
                fixed: "right",
                render: (item) => {
                  return (
                    <div className="col-action">
                      <Tooltip placement="topLeft" title={translate("suadonvi")}>
                        <div>
                          <a
                            onClick={() => editItem(item)}
                            className="btn btn-info btn-icon waves-effect waves-themed"
                          >
                            <i className="fal fa-edit"></i>
                          </a>
                        </div>
                      </Tooltip>
                      <Tooltip placement="topLeft" title={translate("xoa")}>
                        <div>
                          <a
                            onClick={onDeleteItem(item)}
                            className="btn btn-info btn-icon waves-effect waves-themed"
                          >
                            <i className="fal fa-trash-alt"></i>
                          </a>
                        </div>
                      </Tooltip>
                    </div>
                  );
                },
              },
            ]}
            dataSource={data}
          ></Table>
          <div className="footer">
            <SelectSize value={props.size} selectItem={onSizeChange} />
            <Pagination
              onPageChange={onPageChange}
              page={props.page}
              size={props.size}
              total={props.total}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          </div>
        </Panel>
      </AdminPage>
      {props.showCreateOrEdit && <CreateOrEdit />}
    </Authorization>
  );
}

export default connect(
  state => {
    return {
      intl: (state.Intl || {}).locale,
      auth: state.auth && state.auth.auth,
      data: state.unit.data || [],
      size: state.unit.size || 10,
      page: state.unit.page || 1,
      total: state.unit.total || 0,
      searchActive: state.unit.searchActive || "",
      searchTen: state.unit.searchTen,
      searchMa: state.unit.searchMa,
      searchCreatedAt: state.unit.searchCreatedAt ? moment(state.unit.searchCreatedAt) : null,
      showCreateOrEdit: state.unit.showCreateOrEdit,
      clearTimeOutAffterRequest: state.unit.clearTimeOutAffterRequest || null
    };
  },
  {
    updateData: actionUnit.updateData,
    onSizeChange: actionUnit.onSizeChange,
    gotoPage: actionUnit.gotoPage,
    onSearch: actionUnit.onSearch,
    onDeleteItem: actionUnit.onDeleteItem
  }
)(withTranslate(index));
