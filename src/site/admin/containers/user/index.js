import React, { useState, useEffect } from "react";
import { Button, Select, Tooltip, DatePicker } from "antd";
import { connect } from "react-redux";
import actionReport from "@actions/report";
import actionUsers from "@actions/users";
import Table from "@admin/components/common/Table";
import SelectSize from "@admin/components/common/SelectSize";
import Pagination from "@admin/components/common/Pagination";
import { AdminPage, Panel } from "@admin/components/admin";
import moment from "moment";
import DataContants from '@config/data-contants';
import './style.scss';
import { withTranslate } from 'react-redux-multilingual';
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
  const [state, _setState] = useState({
    listDistrict: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const rolesLogin = props.auth && props.auth.authorities && props.auth.authorities.length && props.auth.authorities.find((option) => option === "ROLE_admin_ivisitor")
  useEffect(() => {
    props.updateData({
      searchUsername: '',
      searchDonViId: '',
      searchKhuVucId: '',
      searchRoleId: '',
      searchTrangThai: '',
      searchCreatedAt: '',
      searchDangNhapGanNhat: ''
    })
    props.searchDonVi();
    if (rolesLogin !== "ROLE_admin_ivisitor") {
      props.updateData({
        searchDonViId: (props.auth || {}).donViId
      })
      props.onSearch((props.auth || {}).donViId, "donViId");
      props.searchKhuVuc((props.auth || {}).donViId);
      props.searchListRoles().then(s => {
        let data = s && s.length && s.filter(item => {
          return item.ma !== "ROLE_admin_ivisitor"
        })
        props.updateDataReport({
          dataRoles: data
        })
      }).catch(e => { });
    } else {
      props.gotoPage(0);
      props.searchKhuVuc();
      props.searchListRoles();
    }
  }, []);
  let data = props.data && props.data.length ? props.data.map((item, index) => {
    return {
      key: index,
      col1: (props.page - 1) * props.size + index + 1,
      // col2: moment(new Date(item.ngayCheckIn)).format("DD/MM/YYYY HH:mm"),
      col2: item.username,
      col3: item.donVi && item.donVi.ten,
      col4: item.khuVuc && item.khuVuc.ten,
      col5: item.roles,
      col6: item.trangThai,
      col7: item.createdAt ? moment(new Date(item.createdAt)).format("DD-MM-YYYY HH:mm:ss") : null,
      col8: item.dangNhapGanNhat ? moment(new Date(item.dangNhapGanNhat)).format("DD-MM-YYYY HH:mm:ss") : null,
      col9: item.phanLoai,
      col10: item
    };
  }) : [];
  const editItem = (item) => {
    if (item) {
      props.history.push("/user/edit/" + item.id)
    } else {
      props.history.push("/user/create")
    }
  };
  const onChangeStatus = item => {
    props.changeStatus(item).then(s => {
      props.history.push("/user")
    }).catch(e => {

    })
  }
  const onResetPassword = item => {
    props.resetPassword(item)
  }
  const checkStatus = (data) => {
    let status = DataContants.listStatus.filter((item) => {
      return parseInt(item.id) == data;
    });
    if (status.length > 0) return status[0];
    return {};
  };
  const checkRoles = (data) => {
    let status = props.dataRoles ? props.dataRoles.length && props.dataRoles.filter((item) => {
      return parseInt(item.id) === Number(data);
    }) : [];
    if (status.length > 0) return status[0];
    return {};
  };
  const authorities = ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"]
  return (
    <Authorization
      arrRole={authorities}
    >
      <AdminPage
        className="mgr-user"
        icon="subheader-icon fal fa-window"
        header={translate('quanlytaikhoan')}
        subheader={translate('danhsachtaikhoan')}
      >
        <Panel
          id={"mgr-user"}
          allowClose={false}
          allowCollapse={false}
          // title="Danh sách tài khoản"
          toolbar={
            <div className="toolbar">
              <Button className="button btn-create waves-effect" onClick={() => editItem()}>
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
                    <div className="title-box">{translate("tendangnhap")}</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img src={require("@images/icon/ic-search.png")} alt="" />
                        <input
                          value={props.searchUsername}
                          onChange={e => {
                            props.updateData({
                              searchUsername: e.target.value
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
                            // props.onSearch(e.target.value, "username")
                          }}
                          placeholder={translate("timtheoten")}
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
                    <div className="title-box">{translate("donvi")}</div>
                    <div className="addition-box">
                      <Select
                        disabled={rolesLogin === "ROLE_admin_ivisitor" ? false : true}
                        value={props.searchDonViId}
                        onChange={(e) => {
                          props.onSearch(e, "donViId");
                          props.updateData({
                            searchKhuVucId: ""
                          })
                          props.updateDataReport({
                            dataKhuVuc: []
                          })
                          props.searchKhuVuc(e);
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase().unsignText()
                            .indexOf(input.toLowerCase().unsignText()) >= 0
                        }
                        placeholder={translate("chondonvi")}
                      >
                        <Option value="">{translate("tatca")}</Option>
                        {props.dataDonVi.map((option, index) => {
                          return (
                            <Option key={index} value={option.id}>
                              {option.ten}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                ),
                width: 140,
                dataIndex: "col3",
                key: "col3",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("khuvuc")}</div>
                    <div className="addition-box">
                      <Select
                        value={props.searchKhuVucId}
                        onChange={(e) => {
                          props.onSearch(e, "khuVucId");
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase().unsignText()
                            .indexOf(input.toLowerCase().unsignText()) >= 0
                        }
                        placeholder={translate("chonkhuvuc")}
                      >
                        <Option value="">{translate("tatca")}</Option>
                        {props.dataKhuVuc.map((option, index) => {
                          return (
                            <Option key={index} value={option.id}>
                              {option.ten}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                ),
                width: 200,
                dataIndex: "col4",
                key: "col4"
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("quyen")}</div>
                    <div className="addition-box">
                      <Select
                        value={props.searchRoleId}
                        onChange={(e) => {
                          // props.updateData({ searchRoleId: e });
                          props.onSearch(e, "roleIds")
                        }}
                        // mode="multiple"
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase().unsignText()
                            .indexOf(input.toLowerCase().unsignText()) >= 0
                        }
                        placeholder={translate("chonquyen")}
                      >
                        <Option value="">{translate("tatca")}</Option>
                        {props.dataRoles.map((option, index) => {
                          return (
                            <Option key={index} value={option.id}>
                              {option.ten}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                ),
                width: 200,
                dataIndex: "col5",
                key: "col5",
                render: item => {
                  return (
                    <span className="roles-detail">
                      {item && item.length ? item.map((option, index) => {
                        return (
                          <span key={index}>
                            {option ? <span className="item">{checkRoles(option.id) && checkRoles(option.id).ten}</span> : null}
                          </span>
                        )
                      }) : null}
                    </span>
                  )
                }
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("trangthai")}</div>
                    <div className="addition-box">
                      <Select
                        value={props.searchTrangThai}
                        onChange={(e) => {
                          props.onSearch(e, "trangThai");
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
                        {DataContants.listStatus &&
                          DataContants.listStatus.length &&
                          DataContants.listStatus.map((option, index) => {
                            return (
                              <Option key={index} value={option.label}>
                                {props.intl === "vi" ? option.name : option.english}
                                {/* {option.name} */}
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
                dataIndex: "col7",
                key: "col7",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("dangnhapgannhat")}</div>
                    <div className="addition-box">
                      <DatePicker
                        value={props.searchDangNhapGanNhat}
                        onChange={(e) => {
                          props.onSearch(e && e._d ? e._d : null, "dangNhapGanNhat")
                        }}
                        style={{ width: "100%" }}
                        disabled={props.id ? true : false}
                        format={"DD/MM/YYYY"}
                        placeholder={translate("chonngaydangnhapgannhat")}
                        getPopupContainer={trigger => trigger.parentNode}
                      />
                    </div>
                  </div>
                ),
                width: 200,
                dataIndex: "col8",
                key: "col8",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("ghichu")}</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 200,
                dataIndex: "col9",
                key: "col9",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("tienich")}</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 90,
                dataIndex: "col10",
                key: "col10",
                fixed: "right",
                render: (item) => {
                  return (
                    <div className="col-action">
                      <Tooltip placement="topLeft" title={translate("suataikhoan")}>
                        <div>
                          <a
                            onClick={() => editItem(item)}
                            className="btn btn-info btn-icon waves-effect waves-themed"
                          >
                            <i className="fal fa-edit"></i>
                          </a>
                        </div>
                      </Tooltip>
                      <Tooltip placement="topLeft" title={translate("resetmatkhau")}>
                        <div>
                          <a
                            onClick={() => onResetPassword(item)}
                            className="btn btn-info btn-icon waves-effect waves-themed"
                          >
                            <i className="fal fa-sync"></i>
                          </a>
                        </div>
                      </Tooltip>
                      {
                        item && item.trangThai === 0 ?
                          <Tooltip placement="topLeft" title={translate("khoataikhoan")}>
                            <div>
                              <a
                                onClick={() => onChangeStatus(item)}
                                className="btn btn-info btn-icon waves-effect waves-themed"
                              >
                                <i className="fal fa-lock"></i>
                              </a>
                            </div>
                          </Tooltip> :
                          <Tooltip placement="topLeft" title={translate("mokhoataikhoan")}>
                            <div>
                              <a
                                onClick={() => onChangeStatus(item)}
                                className="btn btn-info btn-icon waves-effect waves-themed"
                              >
                                <i className="fal fa-unlock"></i>
                              </a>
                            </div>
                          </Tooltip>
                      }

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

    </Authorization>

  );
}

export default connect(
  state => {
    return {
      intl: (state.Intl || {}).locale,
      auth: state.auth && state.auth.auth,
      data: state.users.data || [],
      size: state.users.size || 10,
      page: state.users.page || 1,
      total: state.users.total || 0,
      dataKhuVuc: state.report.dataKhuVuc || [],
      dataDonVi: state.report.dataDonVi || [],
      modalBlock: state.users.modalBlock || false,
      modalReset: state.users.modalReset || false,
      dataIndex: state.users.dataIndex || {},
      searchUsername: state.users.searchUsername,
      searchDonViId: state.users.searchDonViId,
      searchKhuVucId: state.users.searchKhuVucId,
      searchRoleId: state.users.searchRoleId,
      searchTrangThai: state.users.searchTrangThai || "",
      searchCreatedAt: state.users.searchCreatedAt ? moment(state.users.searchCreatedAt) : null,
      searchDangNhapGanNhat: state.users.searchDangNhapGanNhat ? moment(state.users.searchDangNhapGanNhat) : null,
      dataRoles: state.report.dataRoles || [],
      clearTimeOutAffterRequest: state.users.clearTimeOutAffterRequest || null
    };
  },
  {
    updateData: actionUsers.updateData,
    onSizeChange: actionUsers.onSizeChange,
    gotoPage: actionUsers.gotoPage,
    onSearch: actionUsers.onSearch,
    changeStatus: actionUsers.changeStatus,
    resetPassword: actionUsers.resetPassword,
    searchKhuVuc: actionReport.searchKhuVuc,
    searchDonVi: actionReport.searchDonVi,
    searchListRoles: actionReport.searchRoles,
    updateDataReport: actionReport.updateData,
  }
)(withTranslate(index));
