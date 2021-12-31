import React, { memo, useState, useEffect, useMemo, useRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Input, Checkbox } from "antd";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { ROLES } from "constants/index";
import Header from "components/Header";
import Table from "components/Table";
import { Main } from "./styled";
import Select from "components/Select";
import { checkRole } from "app/Sidebar/constant";
import useWindowSize from "hook/useWindowSize";
import { ModalNotification2 } from "components/ModalConfirm";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useParams } from "react-router-dom";

const TimKiemDichVu = (props) => {
  const { id } = useParams();
  const refModalNotification = useRef(null);
  const refTimerSearch = useRef(null);
  const refCurrentFocus = useRef(null);
  const {
    searchDvTiepDon,
    listDvKham,
    updateData,
    listDvChoose,
    tamTinhTien,
    doiTuong,
    listAllPhong,
  } = props;
  const roles = get(props.auth, "auth.authorities", []);
  const size = useWindowSize();

  const [state, _setState] = useState({
    active: 1,
    textSearchDv: "",
    loaiDichVu: 10,
    itemHtmlTriggerClicked: null,
    currentFocus: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    props.getUtils({ name: "loaiDichVu" });
    document.addEventListener("keyup", (e) => {
      if (e.code === "Tab")
        setState({ idFocus: document.activeElement.id, currentFocus: {} });
    });
  }, []);
  useEffect(() => {
    if (props.gioiTinh !== undefined && props.khoaTiepDonId)
      onGetListService({
        loaiDichVu: state.loaiDichVu,
        gioiTinh: props.gioiTinh,
        khoaChiDinhId: props.khoaTiepDonId,
        covid:
          props.covid && state.textSearchDv.length <= 0 ? props.covid : null,
      });
  }, [props.gioiTinh, props.covid, state.textSearchDv, props.khoaTiepDonId]);

  const dataloaiDichVu = useMemo(() => {
    if (doiTuong === 2)
      return props.listloaiDichVu.filter((item) => item.id == 10);
    return [
      ...(checkRole([ROLES["TIEP_DON"].KE_DV_KHAM], roles)
        ? props.listloaiDichVu.filter((item) => item.id == 10)
        : []),
      ...(checkRole([ROLES["TIEP_DON"].KE_DV_XN], roles)
        ? props.listloaiDichVu.filter((item) => item.id == 20)
        : []),
      ...(checkRole([ROLES["TIEP_DON"].KE_DV_CLS], roles)
        ? props.listloaiDichVu.filter((item) => item.id == 30)
        : []),
      ...(checkRole([ROLES["TIEP_DON"].KE_GOI_DV], roles)
        ? [
          {
            ten: "Gói DV",
            id: "",
          },
        ]
        : []),
    ];
  }, [props.listloaiDichVu, props.auth, doiTuong]);

  const onChangeGroupService = (value) => {
    //https://conf.isofh.com.vn/pages/viewpage.action?pageId=34413804
    if (doiTuong === 2) {
      if (value === 10) {
        setState({ loaiDichVu: value });
        onGetListService({ loaiDichVu: value });
      }
    } else {
      setState({ loaiDichVu: value });
      onGetListService({ loaiDichVu: value });
    }
  };
  const onGetListService = (payload = {}) => {
    searchDvTiepDon({
      gioiTinh: props.gioiTinh,
      covid: props.covid ? props.covid : null,
      ...payload,
      khoaChiDinhId: props.khoaTiepDonId,
    });
  };
  let listService = useMemo(() => {
    let datacheck = listDvChoose || [];
    let ten = "",
      tenText = "";
    let data = (listDvKham || [])
      .filter((item) => {
        ten = `${item?.ten ? item?.ten : ""} ${item?.maPhong ? item?.maPhong : ""
          } ${item?.tenPhong ? item?.tenPhong : ""}`;
        tenText = ten ? ten.trim().toLowerCase().unsignText() : "";
        return tenText.indexOf(state.textSearchDv) >= 0;
      })
      .map((item, index) => {
        let dataChecked = datacheck?.filter((option) => {
          return (
            option?.dichVuId === item?.dichVuId &&
            (item?.phongId ? option?.phongId === item?.phongId : true)
          );
        });
        let checkThanhToan = dataChecked?.find((option) => option.thanhToan);
        return {
          ...item,
          checked: !!dataChecked.length,
          thanhToan: !!checkThanhToan,
          key: index,
        };
      });
    return orderBy(data, "checked", "desc");
  }, [listDvKham, listDvChoose, state.textSearchDv]);

  const onSearchService = (e) => {
    const value = e.target?.value || "";
    let textSearchDv = value ? value.trim().toLowerCase().unsignText() : "";
    if (refTimerSearch.current) {
      try {
        clearTimeout(refTimerSearch.current);
      } catch (error) { }
    }
    refTimerSearch.current = setTimeout(() => {
      setState({ textSearchDv });
    }, 300);
  };

  const onSelectService = (item) => (e) => {
    //nam.mn 2021 05 20
    /*
    - update nghiệp vụ mới, cho phép chọn nhiều dịch vụ trùng nhau, bỏ trạng thái check box khi click chọn
    - yến confirm    
    */
    let value = e?.target?.checked;
    let service = listDvKham.find((x) => {
      return (
        x?.dichVuId === item?.dichVuId &&
        (item?.phongId ? x?.phongId === item?.phongId : true)
      );
    });
    let checkDuplicate = false;
    let index = listDvChoose.find((x) => {
      return x.dichVuId == item.dichVuId && x.phongId != item.phongId;
    });
    if (index && value) {
      refModalNotification.current &&
        refModalNotification.current.show(
          {
            title: "Trùng dịch vụ",
            content: `Dịch vụ ${item.ten} đã tồn tại. <br> Chắc chắn muốn chỉ định trùng dịch vụ?`,
            cancelText: "Quay lại",
            okText: "Đồng ý",
            classNameOkText: "button-error",
            showImg: true,
            showBtnOk: true,
            showBtnOk: true,
          },
          () => {
            onService(value, item);
          },
          () => { }
        );
      checkDuplicate = true;
    }
    if (service && !checkDuplicate) {
      // service.checked = value;
      onService(value, item);
    }
  };

  const onService = (value, item) => {
    if (value) {
      let obj = {
        nbDotDieuTriId: id,
        nbDichVu: {
          dichVuId: item?.dichVuId,
          soLuong: 1,
          loaiDichVu: item?.loaiDichVu,
        },
      };
      tamTinhTien({
        data: [obj],
        loaiDichVu: item?.loaiDichVu,
      }).then((s) => {
        item.tinhTien = s.data[0]?.nbDichVu || {};
        // if (doiTuong === 2 && listDvChoose?.length) {
        //   service.checked = false;
        //   updateData({ listDvChoose: [...listDvChoose] });
        //   message.error("Đối tượng bảo hiểm chỉ được chọn 1 DV khám!");
        // } else {
        item.thanhToan = false;
        // listDvChoose.splice(0, 0, item);
        const newListChoose = doiTuong === 2 ? [item] : [item, ...listDvChoose];
        updateData({ listDvChoose: newListChoose });        
        // }
      });
    } else {
      let index = listDvChoose.findIndex((x) => {
        return (
          x?.dichVuId === item?.dichVuId &&
          (item?.phongId ? x?.phongId === item?.phongId : true)
        );
      });
      if (index !== -1) listDvChoose.splice(index, 1);
      updateData({ listDvChoose: [...listDvChoose] });
    }
    updateData({
      listDvKham: [...listDvKham],
    });
  };

  const getTenPhong = (id) => {
    let phong = listAllPhong?.find((e) => e.id === id);
    if (phong) {
      return (
        phong?.ma + "-" + phong?.ten + (phong.toaNha ? "-" + phong.toaNha : "")
      );
    }
    return "";
  };
  useEffect(() => {
    if (state.itemHtmlTriggerClicked) {
      state.itemHtmlTriggerClicked.click();
    }
  }, [state.itemHtmlTriggerClicked]);
  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        setState({
          itemHtmlTriggerClicked:
            event.target.parentElement.lastElementChild.firstElementChild,
        });
      },
    };
  };
  setTimeout(() => {
    if (refCurrentFocus.current) {
      refCurrentFocus.current.focus();
    }
  }, 1);
  return (
    <Main className="main">
      <Header
        title="Chỉ định dịch vụ"
        content={
          <>
            <Select
              onChange={onChangeGroupService}
              value={state.loaiDichVu}
              placeholder={"Chọn nhóm dịch vụ"}
              data={dataloaiDichVu}
            />
            <div className="input-text">
              <img src={require("assets/images/welcome/search2.png")} alt="" />
              <Input
                autoFocus={true}
                placeholder="Tìm tên dịch vụ, phòng thực hiện"
                onChange={(e) => onSearchService(e)}
              />
            </div>
            <div className="icon-option">
              <img
                src={require("assets/images/welcome/menu2.png")}
                alt=""
              />
              <img
                src={require("assets/images/welcome/iconTabletwo.png")}
                alt=""
              />
            </div>
          </>
        }
      />
      <Table
        className="table"
        scroll={{ y: 453, x: 1000 }}
        rowKey={(record) => `${record.dichVuId} - ${record.phongId}`}
        onRow={onRow}
        rowClassName={(record) =>
          record?.checked
            ? "background-checked"
            : "checkbox_dv_" + record.dichVuId === state.idFocus
              ? "background-hover"
              : ""
        }
        columns={[
          {
            title: (
              <HeaderSearch
                title="Mã DV"
                sort_key="ma"
              // // onClickSort={onClickSort}
              // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 70,
            dataIndex: "ma",
            hideSearch: true,
          },
          {
            title: (
              <HeaderSearch
                title="Tên dịch vụ"
                sort_key="ten"
              // // onClickSort={onClickSort}
              // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 294,
            dataIndex: "ten",
            type: true,
            hideSearch: true,
          },
          {
            title: (
              <HeaderSearch
                title="Đơn giá không BH"
                sort_key="giaKhongBaoHiem"
              // // onClickSort={onClickSort}
              // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 70,
            dataIndex: "giaKhongBaoHiem",
            hideSearch: true,
            align: "right",
            render: (item) => {
              return <div>{item ? item.formatPrice() : ""}</div>;
            },
          },
          {
            title: (
              <HeaderSearch
                title="Đơn giá BH"
                sort_key="giaBaoHiem"
              // // onClickSort={onClickSort}
              // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 80,
            dataIndex: "giaBaoHiem",
            hideSearch: true,
            align: "right",
            render: (item) => {
              return <div>{item ? item.formatPrice() : ""}</div>;
            },
          },
          {
            title: (
              <HeaderSearch
                title="Phòng"
                sort_key="phongId"
              // // onClickSort={onClickSort}
              // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 200,
            dataIndex: "phongId",
            hideSearch: true,
            render: (item) => {
              return getTenPhong(item);
            },
          },
          {
            title: (
              <HeaderSearch
                title="Chọn"
              // sort_key="ma"
              // // onClickSort={onClickSort}
              // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 46,
            dataIndex: "checked",
            hideSearch: true,
            align: "center",
            render: (value, item, index) => {
              if (item?.thanhToan) {
                return (
                  <Checkbox
                    ref={
                      item.dichVuId == state.currentFocus.dichVuId
                        ? refCurrentFocus
                        : null
                    }
                    checked={value}
                    id={"checkbox_dv_" + item.dichVuId}
                    // disabled
                    className="box-item"
                  ></Checkbox>
                );
              } else {
                return (
                  <Checkbox
                    ref={
                      item.dichVuId == state.currentFocus.dichVuId
                        ? refCurrentFocus
                        : null
                    }
                    id={"checkbox_dv_" + item.dichVuId}
                    autoFocus={state.isSelect === 1 && index === 1}
                    className="box-item"
                    onChange={onSelectService(item)}
                    checked={value}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        const event = {
                          target: { checked: !e.target?.checked },
                        };
                        onSelectService(item)(event);
                        if (!e.target?.checked) {
                          setState({ currentFocus: item });
                        }
                      }
                    }}
                  />
                );
              }
            },
          },
        ]}
        dataSource={listService}
      ></Table>
      <ModalNotification2 ref={refModalNotification} />
    </Main>
  );
};
const mapStateToProps = (state) => {
  return {
    listDvKham: state.tiepDonDichVu.listDvKham || [],
    listDvChoose: state.tiepDonDichVu.listDvChoose || [],
    doiTuong: state.tiepDon.doiTuong,
    auth: state.auth.auth || {},
    gioiTinh: state.tiepDon.gioiTinh,
    listloaiDichVu: state.utils.listloaiDichVu || [],
    listAllPhong: state.phong.listAllPhong || [],
    covid: state.tiepDon.covid,
    khoaTiepDonId: state.tiepDon.khoaTiepDonId,
  };
};

const mapDispatchToProps = ({
  tiepDonDichVu: { searchDvTiepDon, updateData, tamTinhTien },
  utils: { getUtils },
}) => ({
  searchDvTiepDon,
  updateData,
  tamTinhTien,
  getUtils,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(TimKiemDichVu);
