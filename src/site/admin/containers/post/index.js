import React, { useEffect } from "react";
import { Button, Select, Tooltip, Modal, DatePicker } from "antd";
import { connect } from "react-redux";
import actionReport from "@actions/report";
import actionPost from "@actions/post";
import Table from "@admin/components/common/Table";
import SelectSize from "@admin/components/common/SelectSize";
import Pagination from "@admin/components/common/Pagination";
import { AdminPage, Panel } from "@admin/components/admin";
// import { saveAs } from 'file-saver';
import moment from "moment";
import DataContants from "@config/data-contants";
import "./style.scss";
import { withTranslate } from "react-redux-multilingual";
import Authorization from "@admin/components/auth";

const { Option } = Select;
function index(props) {
  const { translate } = props;
  const onSizeChange = (size) => {
    props.onSizeChange(size);
  };

  const onPageChange = (page) => {
    props.gotoPage(page);
  };
  const rolesLogin =
    props.auth &&
    props.auth.authorities &&
    props.auth.authorities.length &&
    props.auth.authorities.find((option) => option === "ROLE_admin_ivisitor");
  useEffect(() => {
    props.searchDonVi();
    props.updateData({
      searchMa: "",
      searchDonViId: "",
      searchKhuVucId: "",
      searchDoiTuongId: "",
      searchTen: "",
      searchCreatedAt: "",
      searchActive: "",
    });
    if (rolesLogin !== "ROLE_admin_ivisitor") {
      props.updateData({
        searchDonViId: (props.auth || {}).donViId,
      });
      props.onSearch((props.auth || {}).donViId, "donViId");
      props.searchKhuVuc((props.auth || {}).donViId);
      props.searchDoiTuong((props.auth || {}).donViId);
    } else {
      props.searchKhuVuc();
      props.searchDoiTuong();
      props.gotoPage(0);
    }
  }, []);

  let data =
    props.data && props.data.length
      ? props.data.map((item, index) => {
          return {
            key: index,
            col1: (props.page - 1) * props.size + index + 1,
            col2: item.donVi && item.donVi.ten,
            col3: item.ma,
            col4: item.ten,
            col5: item.khuVuc || [],
            col6: item.doiTuong || [],
            col7: item.active,
            col8: item.createdAt
              ? moment(new Date(item.createdAt)).format("DD-MM-YYYY")
              : null,
            col9: item,
          };
        })
      : [];

  const toggleModal = (item) => {
    props.history.push("/detail/" + item.id);
  };
  const editItem = (item) => {
    if (item) {
      props.updateData({
        boCauHoiId: item.id,
        ma: item.ma,
        ten: item.ten,
        donViId: item.donViId,
        khuVucIds: item.khuVucIds,
        khuVuc: item.khuVuc,
        doiTuongIds: item.doiTuong?item.doiTuong.map((item) => item.id):[],
        doiTuong: item.doiTuong,
        dataShow: {},
        dataShowLanguage: {},
      });
      props.history.push("/post/edit/" + item.id);
    } else {
      props.updateData({
        boCauHoiId: "",
        id: "",
        loaiCauHoi: "",
        soThuTu: "",
        noiDung: "",
        goiY: "",
        batBuoc: false,
        nhieuDong: false,
        chonNhieu: false,
        cauTraLoi: [],
        dataShow: {},
        dataShowLanguage: {},
        cauHoiChiTiet: [],
        ma: "",
        ten: "",
        donViId: "",
        khuVucId: "",
        doiTuongId: "",
        dataPost: [],
        tieude: "",
        active: false,
        batThuong: false,
        index: null,
        macDinh: false,
      });
      props.history.push("/post/create");
    }
  };
  const checkStatus = (data) => {
    let check = data ? 1 : 2;
    let status = DataContants.listValidity.filter((item) => {
      return parseInt(item.label) === check;
    });
    if (status.length > 0) return status[0];
    return {};
  };
  const onDeleteItem = (item) => () => {
    props.onDeleteItem(item);
  };
  const authorities = ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"];
  return (
    <Authorization arrRole={authorities}>
      <AdminPage
        className="mgr-post"
        icon="subheader-icon fal fa-window"
        header={translate("danhsachcauhoi")}
        subheader={translate("khaibaodanhsachcauhoi")}
      >
        <Panel
          id={"mgr-post"}
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
                        color: "#000",
                      }}
                    >
                      {translate("loctheo")}
                    </div>
                  </div>
                ),
                width: 100,
                dataIndex: "col1",
                key: "col1",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("donvi")}</div>
                    <div className="addition-box">
                      <Select
                        disabled={
                          rolesLogin === "ROLE_admin_ivisitor" ? false : true
                        }
                        value={props.searchDonViId}
                        onChange={(e) => {
                          props.onSearch(e, "donViId");
                          props.updateData({
                            searchKhuVucId: "",
                          });
                          props.updateDataReport({
                            dataKhuVuc: [],
                          });
                          props.searchKhuVuc(e);
                          props.searchDoiTuong(e);
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .unsignText()
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
                width: 200,
                dataIndex: "col2",
                key: "col2",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("mabocauhoi")}</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("@images/icon/ic-search.png")}
                          alt=""
                        />
                        <input
                          value={props.searchMa}
                          onChange={
                            (e) => {
                              props.updateData({
                                searchMa: e.target.value,
                              });
                              if (props.clearTimeOutAffterRequest) {
                                try {
                                  clearTimeout(props.clearTimeOutAffterRequest);
                                } catch (error) {}
                              }
                              let data = setTimeout(() => {
                                props.gotoPage(0);
                              }, 500);
                              props.updateData({
                                clearTimeOutAffterRequest: data,
                              });
                            }
                            // props.onSearch(e.target.value, "ma")
                          }
                          placeholder={translate("timmabocauhoi")}
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
                    <div className="title-box">{translate("bocauhoi")}</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("@images/icon/ic-search.png")}
                          alt=""
                        />
                        <input
                          value={props.searchTen}
                          onChange={
                            (e) => {
                              props.updateData({
                                searchTen: e.target.value,
                              });
                              if (props.clearTimeOutAffterRequest) {
                                try {
                                  clearTimeout(props.clearTimeOutAffterRequest);
                                } catch (error) {}
                              }
                              let data = setTimeout(() => {
                                props.gotoPage(0);
                              }, 500);
                              props.updateData({
                                clearTimeOutAffterRequest: data,
                              });
                            }
                            // props.onSearch(e.target.value, "ten")
                          }
                          placeholder={translate("timbocauhoi")}
                        />
                      </div>
                    </div>
                  </div>
                ),
                width: 150,
                dataIndex: "col4",
                key: "col4",
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
                          props.searchDoiTuong(props.searchDonViId, e);
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .unsignText()
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
                dataIndex: "col5",
                key: "col5",
                render: (item) => {
                  return (
                    <div style={{ cursor: "pointer" }}>
                      <div className="detail">
                        {(item || []).map((item, index) => {
                          return (
                            <span className="item" key={index}>
                              {item.ten}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                },
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("doituong")}</div>
                    <div className="addition-box">
                      <Select
                        value={props.searchDoiTuongId}
                        onChange={(e) => {
                          props.onSearch(e, "doiTuongId");
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .unsignText()
                            .indexOf(input.toLowerCase().unsignText()) >= 0
                        }
                        placeholder={translate("chondoituong")}
                      >
                        <Option value="">{translate("tatca")}</Option>
                        {props.dataDoiTuong.map((option, index) => {
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
                dataIndex: "col6",
                key: "col6",
                render: (item) => {
                  return (
                    <div style={{ cursor: "pointer" }}>
                      <div className="detail">
                        {(item || []).map((item, index) => {
                          return (
                            <span className="item" key={index}>
                              {item.ten}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                },
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("hieuluc")}</div>
                    <div className="addition-box">
                      <Select
                        value={props.searchActive.toString()}
                        onChange={(e) => {
                          props.onSearch(e, "active");
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .unsignText()
                            .indexOf(input.toLowerCase().unsignText()) >= 0
                        }
                        placeholder={translate("chontrangthai")}
                      >
                        <Option value="">{translate("tatca")}</Option>
                        {DataContants.listValidity &&
                          DataContants.listValidity.length &&
                          DataContants.listValidity.map((option, index) => {
                            return (
                              <Option key={index} value={option.id.toString()}>
                                {props.intl === "vi"
                                  ? option.name
                                  : option.english}
                              </Option>
                            );
                          })}
                      </Select>
                    </div>
                  </div>
                ),
                width: 180,
                dataIndex: "col7",
                key: "col7",
                render: (item) => {
                  return <>{checkStatus(item) && checkStatus(item).name}</>;
                },
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("ngaytao")}</div>
                    <div className="addition-box">
                      <DatePicker
                        value={props.searchCreatedAt}
                        onChange={(e) => {
                          props.onSearch(e && e._d ? e._d : null, "createdAt");
                        }}
                        style={{ width: "100%" }}
                        disabled={props.id ? true : false}
                        format={"DD/MM/YYYY"}
                        placeholder={translate("nhapngaytao")}
                        getPopupContainer={(trigger) => trigger.parentNode}
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
                    <div className="title-box">{translate("tienich")}</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 150,
                dataIndex: "col9",
                key: "col9",
                fixed: "right",
                render: (item) => {
                  return (
                    <div className="col-action">
                      <Tooltip placement="topLeft" title={translate("chitiet")}>
                        <div>
                          <a
                            onClick={() => {
                              toggleModal(item);
                            }}
                            className="btn btn-info btn-icon waves-effect waves-themed"
                          >
                            <i className="fal fa-eye"></i>
                          </a>
                        </div>
                      </Tooltip>
                      <Tooltip
                        placement="topLeft"
                        title={translate("suabocauhoi")}
                      >
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
    </Authorization>
  );
}

export default connect(
  (state) => {
    return {
      intl: (state.Intl || {}).locale,
      auth: state.auth && state.auth.auth,
      data: state.post.data || [],
      size: state.post.size || 10,
      page: state.post.page || 1,
      total: state.post.total || 0,
      dataKhuVuc: state.report.dataKhuVuc || [],
      dataDonVi: state.report.dataDonVi || [],
      dataDoiTuong: state.report.dataDoiTuong || [],
      searchDonViId: state.post.searchDonViId,
      searchActive: state.post.searchActive || "",
      searchTen: state.post.searchTen,
      searchMa: state.post.searchMa,
      searchKhuVucId: state.post.searchKhuVucId,
      searchDoiTuongId: state.post.searchDoiTuongId,
      searchCreatedAt: state.post.searchCreatedAt
        ? moment(state.post.searchCreatedAt)
        : null,
      clearTimeOutAffterRequest: state.post.clearTimeOutAffterRequest || null,
    };
  },
  {
    updateData: actionPost.updateData,
    onSizeChange: actionPost.onSizeChange,
    gotoPage: actionPost.gotoPage,
    onSearch: actionPost.onSearch,
    changeStatus: actionPost.changeStatus,
    resetPassword: actionPost.resetPassword,
    onDeleteItem: actionPost.onDeleteItem,
    searchKhuVuc: actionReport.searchKhuVuc,
    searchDonVi: actionReport.searchDonVi,
    searchDoiTuong: actionReport.searchDoiTuong,
    searchListRoles: actionReport.searchRoles,
    updateDataReport: actionReport.updateData,
  }
)(withTranslate(index));
