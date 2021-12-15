import React, { useState, useEffect, useMemo } from "react";
import { Button, Select, Tooltip, Input, Checkbox, DatePicker } from "antd";
import { connect } from "react-redux";
import actionReport from "@actions/report";
import reportProvider from "@data-access/report-provider";
import Table from "@admin/components/common/Table";
import SelectSize from "@admin/components/common/SelectSize";
import Pagination from "@admin/components/common/Pagination";
import { AdminPage, Panel } from "@admin/components/admin";
import { saveAs } from 'file-saver';
import "./style.scss";
import "../../style.scss";
import moment from "moment";
import { withTranslate } from 'react-redux-multilingual';

const { Option } = Select;
function index(props) {
  const { translate } = props
  const rolesLogin = props.auth && props.auth.authorities && props.auth.authorities.length && props.auth.authorities.find((option) => option === "ROLE_admin_ivisitor")
  const onSizeChange = size => {
    props.onSizeChange(size);
  };
  const onPageChange = page => {
    props.gotoPage(page-1);
  };
  const [state, _setState] = useState({
    listDistrict: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [load,setLoad]= useState(false);
  useEffect(() => {
    if (props.auth) {
      props.updateData({
        searchDonViId: props.searchDonViId ? props.searchDonViId : (props.auth && props.auth.auth && props.auth.auth.donViId)
      });
      props.searchDoiTuong(props.searchDonViId).then((s) => {
        let ids = s && s.length ? s.map((item) => {
          return item.id
        }) : []
        props.updateData({ doiTuongIds: ids && ids.toString() });
        props.gotoPage(0);
      });
      props.searchKhuVuc(props.searchDonViId);
      props.searchDonVi();
    } else {
      window.location.href = '/login';
    }
  }, []);
  let data = useMemo(() => (props.data || []).map((item, index) => { 
    return {
      key: index,
      col1: (props.page) * props.size + index + 1,
      col2: item.ngayCheckIn,
      col3: item.maKhach,
      col4: item.hoVaTen,
      col5: item.khuVucCheckIn,
      col6: item.khuVucCheckOut,
      col7: item.phanLoai,
      col8: item
    };
  }),[props.data]);
  const viewDetail = (data) => {
    props.history.push(translate("baocaodetailhref") + "/" + data.id);
  }
  const handleBtn = () => {
    setLoad(true);
    let promise = new Promise( (resolve,reject) => {
      let s=false;
      setTimeout( ()=> resolve(s),2000)
    });
    promise
    .then( (s)=> setLoad(s));
  }
  const searchReport = () => {
    handleBtn();
    let dataCheck = state.listDoiTuong && state.listDoiTuong.length ? state.listDoiTuong : props.dataDoiTuong
    let ids = dataCheck && dataCheck.length && dataCheck.filter((item, index, self) => {
      return item.checked
    }).map(item => {
      return item.id;
    }).filter((item, index, self) => {
      return self.indexOf(item) == index;
    })
    props.updateData({
      doiTuongIds: ids && ids.toString(),
      searchDonViId: props.searchDonViId ? props.searchDonViId : (props.auth && props.auth.auth && props.auth.auth.donViId)
    })
    props.gotoPage(0);
    setLoad(false);
  }
  const report = () => {
    handleBtn();
    let tuNgay = props.tuNgay ? moment(props.tuNgay).format("YYYY-MM-DDTHH:mm:ss") : moment(new Date()).format("YYYY-MM-DDT00:00:00")
    let denNgay = props.denNgay ? moment(props.denNgay).format("YYYY-MM-DDTHH:mm:ss") : moment(new Date()).format("YYYY-MM-DDT23:59:59")
    let dataCheck = state.listDoiTuong && state.listDoiTuong.length ? state.listDoiTuong : props.dataDoiTuong
    let ids = dataCheck && dataCheck.length && dataCheck.filter((item, index, self) => {
      return item.checked
    }).map(item => {
      return item.id;
    }).filter((item, index, self) => {
      return self.indexOf(item) == index;
    })
    let doiTuongIds = ids && ids.toString()
    props.updateData({
      doiTuongIds: ids && ids.toString()
    })
    reportProvider.report(
      tuNgay,
      denNgay,
      props.searchKhuVucCheckInId,
      props.khuVucCheckOutId,
      props.searchDonViId,
      doiTuongIds
    ).then(s => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = s;
      saveAs(s, `Bao-cao ${new Date().format("ddMMyyyyHHmmss")}.xls` || 'unknown file')
      setLoad(false);
    }).catch(e => { })
  }
  const date = moment(new Date()).format("DD/MM/YYYY")
  return (
    <AdminPage
      className="mgr-report"
      icon="subheader-icon fal fa-window"
      header={translate("danhsachkhachdendonvi")}
      subheader={translate("baocaothongke")}
    >
      {load && 
      (<div className="Loading">
        <div className="ring-loading"> </div>
      </div>)}
      <div className="search-report">
        <div className="title">
          <img src={require("@images/report.png")} alt="" />
          <div className="name">{translate("tieuchichonbaocao")}</div>
        </div>
        <div className="search">
          <div className="search-select">
            <div className="row">
              <div className="col-md-3">
                <div className="item-title">{translate("tungay")}</div>
                <DatePicker
                  onChange={e => {
                    props.updateData({
                      tuNgay: e
                    });
                  }}
                  showTime={{ format: 'HH:mm' }}
                  format="DD/MM/YYYY HH:mm"
                  defaultValue={moment(date + " 00:00", 'DD/MM/YYYY HH:mm:ss')}
                  value={props.tuNgay ? moment(new Date(props.tuNgay)) : moment(date + " 00:00", 'DD/MM/YYYY HH:mm:ss')}
                  // autoFocus={true}
                  style={{ width: "100%", minWidth: "unset" }}
                  placeholder={translate("nhapngay")}
                  getPopupContainer={trigger => trigger.parentNode}
                  className="custome-picker"
                />
              </div>
              <div className="col-md-3">
                <div className="item-title">{translate("denngay")}</div>
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="DD/MM/YYYY HH:mm"
                  defaultValue={moment(date + " 23:59", 'DD/MM/YYYY HH:mm:ss')}
                  onChange={e => {
                    props.updateData({
                      denNgay: e
                    });
                  }}
                  value={props.denNgay ? moment(new Date(props.denNgay)) : moment(date + " 23:59", 'DD/MM/YYYY HH:mm:ss')}
                  // autoFocus={true}
                  style={{ width: "100%", minWidth: "unset" }}
                  placeholder={translate("nhapngay")}
                  getPopupContainer={trigger => trigger.parentNode}
                />
              </div>
              <div className="col-md-3">
                <div className="item-title">{translate("checkin")}</div>
                <Select
                  showSearch
                  onChange={e => {
                    props.updateData({
                      searchKhuVucCheckInId: e
                    });
                  }}
                  value={props.searchKhuVucCheckInId}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase().unsignText()
                      .indexOf(input.toLowerCase().unsignText()) >= 0
                  }
                >
                  <Option value="">{translate("choncheckin")}</Option>
                  {props.dataKhuVuc.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.ten}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="col-md-3">
                <div className="item-title">{translate("checkout")}</div>
                <Select
                  showSearch
                  onChange={e => {
                    props.updateData({
                      khuVucCheckOutId: e
                    });
                  }}
                  value={props.khuVucCheckOutId}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase().unsignText()
                      .indexOf(input.toLowerCase().unsignText()) >= 0
                  }
                >
                  <Option value="">{translate("choncheckout")}</Option>
                  {props.dataKhuVuc.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.ten}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="row" style={{ paddingTop: 15 }}>
              <div className="col-md-3">
                <div className="item-title">{translate("tenkhach")}</div>
                <Input
                  placeholder={translate("timtenkhach")}
                  value={props.hoVaTen}
                  onChange={e =>
                    props.updateData({
                      hoVaTen: e.target.value
                    })
                  }
                />
              </div>
              <div className="col-md-3">
                <div className="item-title">{translate("makhach")}</div>
                <Input
                  placeholder={translate("timmakhach")}
                  value={props.maKhach}
                  onChange={e =>
                    props.updateData({
                      maKhach: e.target.value
                    })
                  }
                />
              </div>
              <div className="col-md-3">
                <div className="item-title title-cmt">{translate("cmt")}</div>
                <Input
                  placeholder={translate("timcmt")}
                  value={props.soCanCuoc}
                  onChange={e =>
                    props.updateData({
                      soCanCuoc: e.target.value
                    })
                  }
                />
              </div>
              <div className="col-md-3">
                <div className="item-title">{translate("sdt")}</div>
                <Input
                  placeholder={translate("timsdt")}
                  value={props.soDienThoai}
                  onChange={e =>
                    props.updateData({
                      soDienThoai: e.target.value
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="search-checkbox">
            <div className="row">
              {
                props.dataDoiTuong && props.dataDoiTuong.length ? props.dataDoiTuong.map((option, index2) => {
                  return (
                    <div className="col-md-3" key={index2}>
                      {option.checked ?
                        <Checkbox
                          onChange={(event) => {
                            option.checked = !option.checked;
                            setState({ listDoiTuong: [...props.dataDoiTuong] });
                          }}
                          checked={true}
                        // value={option.id.toString()}
                        >{option.ten}</Checkbox> :
                        <Checkbox
                          onChange={(event) => {
                            option.checked = !option.checked;
                            setState({ listDoiTuong: [...props.dataDoiTuong] });
                          }}
                          checked={false}
                        // value={option.id.toString()}
                        >{option.ten}</Checkbox>
                      }
                    </div>
                  )
                }) : null
              }
            </div>
          </div>
          <div className="button-search">
            <div className="row">
              <div className="col-md-3">
                <div className="item-title">{translate("donvi")}</div>
                <Select
                  disabled={rolesLogin !== "ROLE_admin_ivisitor"}
                  showSearch
                  onChange={e => {
                    props.updateData({
                      searchDonViId: e
                    });
                    props.searchDoiTuong(e)
                    props.searchKhuVuc(e)
                  }}
                  value={props.searchDonViId}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase().unsignText()
                      .indexOf(input.toLowerCase().unsignText()) >= 0
                  }
                >
                  <Option value="">{translate("chondonvi")}</Option>
                  {props.dataDonVi.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.ten}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              {/* <div className="col-md-3"></div> */}
              <div className="col-md-9">
                <Button onClick={() => searchReport()}><img src={require("@images/tick.png")} alt="" />{translate("xemdanhsach")}</Button>
                <Button onClick={() => report()}>{translate("excel")}</Button>
              </div>
              {/* <div className="col-md-3">
                <Button onClick={() => report()}>{translate("excel")}</Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Panel
        id={"mgr-report"}
        allowClose={false}
        allowCollapse={false}
        title={translate("danhsachkhachdendonvi")}
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
                </div>
              ),
              width: 70,
              dataIndex: "col1",
              key: "col1"
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">{translate("ngaydanhky")}</div>
                </div>
              ),
              width: 150,
              dataIndex: "col2",
              key: "col2"
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">{translate("makhach")}</div>
                </div>
              ),
              width: 140,
              dataIndex: "col3",
              key: "col3",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">{translate("tenkhach")}</div>
                </div>
              ),
              width: 200,
              dataIndex: "col4",
              key: "col4"
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">{translate("checkin")}</div>
                </div>
              ),
              width: 180,
              dataIndex: "col5",
              key: "col5",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">{translate("checkout")}</div>
                </div>
              ),
              width: 180,
              dataIndex: "col6",
              key: "col6",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">{translate("phanloai")}</div>
                </div>
              ),
              width: 200,
              dataIndex: "col7",
              key: "col7",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box"></div>
                </div>
              ),
              width: 50,
              dataIndex: "col8",
              key: "col8",
              fixed: "right",
              render: (item) => {
                return (
                  <div className="col-action">
                    <Tooltip placement="topLeft" title={"Xem chi tiết"}>
                      <div>
                        <a
                          onClick={() => viewDetail(item)}
                          className="btn btn-info btn-icon waves-effect waves-themed"
                        >
                          <i className="fal fa-eye"></i>
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
            page={props.page+1}
            size={props.size}
            total={props.total}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        </div>
      </Panel>
    </AdminPage>
  );
}
export default connect(
  state => {
    return {
      auth: state.auth && state.auth.auth,
      data: state.report.data || [],
      size: state.report.size || 10,
      page: state.report.page || 0,
      total: state.report.total || 0,
      dataKhuVuc: state.report.dataKhuVuc || [],
      dataDoiTuong: state.report.dataDoiTuong || [],
      quocTichId: state.report.quocTichId || [],
      dataDonVi: state.report.dataDonVi || [],
      tuNgay: state.report.tuNgay || null,
      denNgay: state.report.denNgay || null,
      searchKhuVucCheckInId: state.report.searchKhuVucCheckInId || "",
      khuVucCheckOutId: state.report.khuVucCheckOutId || "",
      searchDonViId: state.report.searchDonViId || (state.auth && state.auth.auth && state.auth.auth.donViId),
      doiTuongIds: state.report.doiTuongIds || "",
      hoVaTen: state.report.hoVaTen,
      maKhach: state.report.maKhach,
      soCanCuoc: state.report.soCanCuoc,
      soDienThoai: state.report.soDienThoai
    };
  },
  {
    updateData: actionReport.updateData,
    onSizeChange: actionReport.onSizeChange,
    gotoPage: actionReport.gotoPage,
    onSearch: actionReport.onSearch,
    searchKhuVuc: actionReport.searchKhuVuc,
    searchDoiTuong: actionReport.searchDoiTuong,
    searchDonVi: actionReport.searchDonVi
  }
)(withTranslate(index));
