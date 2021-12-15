import React, { useEffect } from "react";
import { Button, Select, Tooltip, DatePicker } from "antd";
import { connect } from "react-redux";
import actionTarget from "@actions/target";
import actionReport from "@actions/report";
import Table from "@admin/components/common/Table";
import SelectSize from "@admin/components/common/SelectSize";
import Pagination from "@admin/components/common/Pagination";
import { AdminPage, Panel } from "@admin/components/admin";
import moment from "moment";
import { withTranslate } from 'react-redux-multilingual';
import DataContants from '@config/data-contants';
import Authorization from "@admin/components/auth";
import './style.scss';
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
      searchMa: '',
      searchTen: '',
      searchCreatedAt: '',
      searchActive: '',
      searchDonViId: '',
      searchKhuVucId: '',
    });
    props.gotoPage(0)
    props.searchDonVi();
    props.searchKhuVuc();
    // props.searchKhoa(); 
  }, []);

  const checkKeyBoard = (item) => {
    let fristKey = item[0].toUpperCase()
    let newItem = item.slice(1)
    return fristKey + newItem
  }
  let data = props.data && props.data.length ? props.data.map((item, index) => {
    return {
      key: index,
      col1: (props.page - 1) * props.size + index + 1,
      col2: item.ma,
      col3: item.ten && checkKeyBoard(item.ten),
      col4: item.thongTienLienQuan && checkKeyBoard(item.thongTienLienQuan),
      col5: item && item.donVi,
      col6: item.khuVuc && item.khuVuc,
      col7: item.active,
      col8: item.createdAt && moment(item.createdAt).format("DD/MM/YYYY HH:mm"),
      col9: item.ghiChu,
      col10: item
    };
  }) : [];
  const editItem = (item) => {
    if (item) {
      props.history.push(`/target/edit/${item.id}`)
      props.updateData({
        ...item
      })
    } else {
      props.history.push("/target/create")
      props.updateData({
        id: "",
        ma: "",
        ten: "",
        ghiChu: "",
        donViIds: [],
        khuVucIds: [],
        thongTienLienQuan: "",
        dataKhuVucTarget: []
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
  const inputSearch = (e, name) => {
    if (props.clearTimeOutAffterRequest) {
      try {
        clearTimeout(props.clearTimeOutAffterRequest);
      } catch (error) { }
    }
    props.updateData({ [`${name}`]: e.target.value });
    let data = setTimeout(() => {
      props.gotoPage(0);
    }, 500)
    props.updateData({ clearTimeOutAffterRequest: data });
  }
  const update = (e, name) => {
    props.updateData({ [`${name}`]: e });
    props.gotoPage(0);
  }
  const authorities = ["ROLE_admin_ivisitor"];

  return (
    <Authorization arrRole={authorities} >
      <AdminPage
        className="mgr-target"
        icon="subheader-icon fal fa-window"
        header={translate('quanlydoituong')}
        subheader={translate('danhsachdoituong')}
      >
        <Panel
          id={"mgr-target"}
          allowClose={false}
          allowCollapse={false}
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
                    <div className="title-box">{translate("madoituong")}</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img src={require("@images/icon/ic-search.png")} alt="" />
                        <input
                          value={props.searchMa}
                          onChange={e => inputSearch(e, "searchMa")}
                          placeholder={translate("timtheomadoituong")}
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
                    <div className="title-box">{translate("tendoituong")}</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img src={require("@images/icon/ic-search.png")} alt="" />
                        <input
                          value={props.searchTen}
                          onChange={e => inputSearch(e, "searchTen")}
                          placeholder={translate("timtheotendoituong")}
                        />
                      </div>
                    </div>
                  </div>
                ),
                width: 230,
                dataIndex: "col3",
                key: "col3",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("thongtinlienquan")}</div>
                    <div className="addition-box">
                    </div>
                  </div>
                ),
                width: 230,
                dataIndex: "col4",
                key: "col4",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">
                      {translate("donvi")}
                    </div>
                    <div className="addition-box">
                      <Select
                        value={props.searchDonViId}
                        onChange={(e) => {
                          update(e, "searchDonViId")
                          props.searchKhuVuc(e);
                          props.updateData({
                            searchKhuVucId: ""
                          })
                        }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                          && option.props.children
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
                width: 200,
                dataIndex: "col5",
                key: "col5",
                render: item => {
                  return (
                    <div className="detail">
                      {(item || []).map((item, index) => {
                        return <span className="item" key={index}>{item.ten}</span>
                      })}
                    </div>
                  )
                }

              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">
                      {translate("khuvuc")}
                    </div>
                    <div className="addition-box">
                      <Select
                        value={props.searchKhuVucId}
                        onChange={(e) => update(e, "searchKhuVucId")}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                          && option.props.children
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
                dataIndex: "col6",
                key: "col6",
                render: item => {
                  return (
                    <div style={{ cursor: "pointer" }} >
                      <div className="detail">
                        {(item || []).map((item, index) => {
                          return <span className="item" key={index}>{item.ten}</span>
                        })}
                      </div>
                    </div>
                  )
                }

              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">{translate("trangthai")}</div>
                    <div className="addition-box">
                      <Select
                        value={props.searchActive.toString()}
                        onChange={(e) => update(e, "searchActive")}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children
                          && option.props.children
                            .toLowerCase().unsignText()
                            .indexOf(input.toLowerCase().unsignText()) >= 0
                        }
                        placeholder={translate("chontrangthai")}
                      >
                        <Option value="">{translate("tatca")}</Option>
                        {DataContants.listStatusValidity.map((option, index) => {
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
                dataIndex: "col7",
                key: "col7",
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
                        onChange={(e) => update(e && e._d ? e._d : null, "searchCreatedAt")}
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
                      <Tooltip placement="topLeft" title={translate("suadoituong")}>
                        <a
                          onClick={() => editItem(item)}
                          className="btn btn-info btn-icon waves-effect waves-themed"
                        >
                          <i className="fal fa-edit"></i>
                        </a>
                      </Tooltip>
                      <Tooltip placement="topLeft" title={translate("xoa")}>
                        <a
                          onClick={onDeleteItem(item)}
                          className="btn btn-info btn-icon waves-effect waves-themed"
                        >
                          <i className="fal fa-trash-alt"></i>
                        </a>
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
  state => {
    return {
      intl: (state.Intl || {}).locale,
      data: state.target.data || [],
      size: state.target.size || 10,
      page: state.target.page || 1,
      total: state.target.total || 0,
      searchActive: state.target.searchActive || "",
      searchTen: state.target.searchTen,
      searchMa: state.target.searchMa,
      searchThongTienLienQuan: state.target.searchThongTienLienQuan,
      searchCreatedAt: state.target.searchCreatedAt ? moment(state.target.searchCreatedAt) : null,
      searchDonViId: state.target.searchDonViId,
      searchKhuVucId: state.target.searchKhuVucId,
      dataDonVi: state.report.dataDonVi || [],
      dataKhuVuc: state.report.dataKhuVuc || [],
      //dataKhoa: state.report.dataKhoa || [],
      clearTimeOutAffterRequest: state.target.clearTimeOutAffterRequest || null
    };
  },
  {
    updateData: actionTarget.updateData,
    onSizeChange: actionTarget.onSizeChange,
    gotoPage: actionTarget.gotoPage,
    onDeleteItem: actionTarget.onDeleteItem,
    searchDonVi: actionReport.searchDonVi,
    searchKhuVuc: actionReport.searchKhuVuc,
    // searchKhoa: actionReport.searchKhoa,
  }
)(withTranslate(index));