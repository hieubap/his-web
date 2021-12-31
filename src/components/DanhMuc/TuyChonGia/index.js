import React, { useState, useEffect, useMemo } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import SelectLargeData from "components/SelectLargeData";
import { HIEU_LUC, KHONG_TINH_TIEN } from "constants/index";
import { Checkbox, InputNumber, DatePicker } from "antd";
import moment from "moment";
import { openInNewTab } from "utils";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
function TuyChonGia(props) {
  console.log('render ... 3');
  
  const { size, page, totalElements, dichVuId, refCallbackSave = {} } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
    listAllLoaiDoiTuong: [],
  });
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    props.getData({ dichVuId });
    props.getListAllKhoa();
    props.getListAllPhong({});
    props.getListAllLoaiDoiTuong();
    props.getUtils({
      name: "nguonKhacChiTra",
    });
  }, [dichVuId]);

  useEffect(() => {
    setState({
      listAllLoaiDoiTuong: [
        { id: "", ten: "Tất cả" },
        ...props.listAllLoaiDoiTuong,
      ],
    });
  }, [props.listAllLoaiDoiTuong]);

  useEffect(() => {
    setState({
      listAllKhoa: [{ id: "", ten: "Tất cả" }, ...props.listAllKhoa],
    });
  }, [props.listAllKhoa]);

  useEffect(() => {
    setState({
      listnguonKhacChiTra: [...props.listnguonKhacChiTra],
    });
  }, [props.listnguonKhacChiTra]);

  useEffect(() => {
    setState({ data: [...props.listData] });
  }, [props.listData, page, size]);

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    props.onChangeInputSearch({
      [key]: value,
      dichVuId,
    });
  };

  const onPageChange = (page) => {
    // const params = { page: page - 1, size };
    // updateData(params);
    // getListServicesPack({
    //   ...params,
    //   ...dataSearch,
    //   sort: combineSort(dataSortColumn),
    // });
  };
  const onChange = (key, selector) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d;
    else value = e;
    if (state.currentItem) {
      if (selector) {
        if (!state.currentItem[selector]) state.currentItem[selector] = {};
        state.currentItem[selector][key] = value;
      } else state.currentItem[key] = value;
    }
  };

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, dichVuId });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size, dichVuId });
  };
  const getDefaultValue = (value) => {
    if (value?.toDateObject) {
      // return value.toDateObject();
      return moment(value.toDateObject());
    }
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
    },
    {
      title: (
        <HeaderSearch
          title={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/khoa")}
            >
              Khoa chỉ định
            </div>
          }
          sort_key="khoaChiDinh.id"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.id"] || 0}
          searchSelect={
            <Select
              data={state.listAllKhoa}
              placeholder="Chọn khoa"
              onChange={onSearchInput("khoaChiDinhId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "khoaChiDinh",
      key: "khoaChiDinh",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            // <Select
            //   data={props.listAllKhoa}
            //   placeholder="Không tính tiền"
            //   onChange={onSearchInput("khongTinhTien")}
            // />

            <SelectLargeData
              placeholder={"Chọn khoa"}
              data={props.listAllKhoa}
              onChange={onChange("id", "khoaChiDinh")}
              style={{ width: "100%" }}
              getValue={(item) => item?.id}
              renderText={(item) => item?.ten}
              value={state.currentItem?.khoaChiDinh?.id}
            />
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá không BH"
          sort_key="giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["giaKhongBaoHiem"] || 0}
          require
          search={
            <InputNumber
              min={0}
              placeholder="Tìm giá không bảo hiểm"
              onChange={onSearchInput("giaKhongBaoHiem")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <>
              <InputNumber
                formatter={(value) => {
                  if (!value) return;
                  if (value && /\D*/.test(value)) {
                    value = value.replace(/\D*/g, "");
                  }
                  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }}
                parser={(value) => value.replace(".", "")}
                min={0}
                defaultValue={state.currentItem?.giaKhongBaoHiem}
                placeholder="Nhập giá không bảo hiểm"
                onChange={onChange("giaKhongBaoHiem")}
                style={{ width: "100%" }}
              />
              {state?.checkValidate && !state.currentItem?.giaKhongBaoHiem && (
                <span className="error">Vui lòng nhập giá không bảo hiểm!</span>
              )}
            </>
          );
        } else return item ? (item + "").formatPrice() : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá BH"
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["giaBaoHiem"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="Tìm giá BH"
              onChange={onSearchInput("giaBaoHiem")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <InputNumber
              formatter={(value) => {
                if (!value) return;
                if (value && /\D*/.test(value)) {
                  value = value.replace(/\D*/g, "");
                }
                return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              }}
              parser={(value) => value.replace(".", "")}
              min={0}
              placeholder="Nhập giá bảo hiểm"
              defaultValue={state.currentItem?.giaBaoHiem}
              style={{ width: "100%" }}
              onChange={onChange("giaBaoHiem")}
            />
          );
        } else return item ? (item + "").formatPrice() : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phụ thu"
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["giaPhuThu"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="Tìm giá phụ thu"
              onChange={onSearchInput("giaPhuThu")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <InputNumber
              min={0}
              defaultValue={state.currentItem?.giaPhuThu}
              placeholder="Nhập giá phụ thu"
              onChange={onChange("giaPhuThu")}
              style={{ width: "100%" }}
              formatter={(value) => {
                if (!value) return;
                if (value && /\D*/.test(value)) {
                  value = value.replace(/\D*/g, "");
                }
                return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              }}
              parser={(value) => value.replace(".", "")}
            />
          );
        } else return item ? (item + "").formatPrice() : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại đối tượng"
          sort_key="loaiDoiTuong.id"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["loaiDoiTuong.id"] || 0}
          searchSelect={
            <Select
              onChange={onSearchInput("loaiDoiTuongId")}
              className="select"
              placeholder={"Chọn loại đối tượng"}
              data={state.listAllLoaiDoiTuong}
              allowClear={false}
            ></Select>
          }
        />
      ),
      width: "200px",
      dataIndex: "loaiDoiTuong",
      key: "loaiDoiTuong",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <SelectLargeData
              placeholder={"Chọn loại đối tượng"}
              data={props.listAllLoaiDoiTuong}
              onChange={onChange("id", "loaiDoiTuong")}
              style={{ width: "100%" }}
              getValue={(item) => item?.id}
              renderText={(item) => item?.ten}
              value={state.currentItem?.loaiDoiTuong?.id}
            />
          );
        } else return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Áp dụng từ ngày"
          sort_key="tuNgay"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["tuNgay"] || 0}
          require
          searchSelect={
            <DatePicker
              placeholder="Từ ngày"
              format="DD/MM/YYYY"
              onChange={onSearchInput("tuNgay")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "tuNgay",
      key: "tuNgay",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <>
              <DatePicker
                defaultValue={getDefaultValue(state.currentItem?.tuNgay)}
                placeholder="Từ ngày"
                format="DD/MM/YYYY"
                onChange={onChange("tuNgay")}
              />
              {state?.checkValidate && !state.currentItem?.tuNgay && (
                <span className="error">Vui lòng chọn áp dụng từ ngày!</span>
              )}
            </>
          );
        } else return (item && moment(item).format("DD/MM/YYYY")) || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Áp dụng đến ngày"
          sort_key="denNgay"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["denNgay"] || 0}
          searchSelect={
            <DatePicker
              placeholder="Đến ngày"
              format="DD/MM/YYYY"
              onChange={onSearchInput("denNgay")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "denNgay",
      key: "denNgay",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <DatePicker
              defaultValue={getDefaultValue(state.currentItem?.denNgay)}
              placeholder="Đến ngày"
              format="DD/MM/YYYY"
              onChange={onChange("denNgay")}
            />
          );
        } else return (item && moment(item).format("DD/MM/YYYY")) || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nguồn khác chi trả"
          sort_key="dsNguonKhacChiTra"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dsNguonKhacChiTra"] || 0}
          searchSelect={
            <Select
              data={state.listnguonKhacChiTra}
              placeholder="Chọn nguồn chi trả"
              onChange={onSearchInput("dsNguonKhacChiTra")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dsNguonKhacChiTra",
      key: "dsNguonKhacChiTra",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Select
              mode="multiple"
              defaultValue={state.currentItem?.dsNguonKhacChiTra || []}
              data={props.listnguonKhacChiTra}
              placeholder="Chọn nguồn chi trả"
              onChange={onChange("dsNguonKhacChiTra")}
            />
          );
        } else {
          if (props.listnguonKhacChiTra?.length) {
            let list =
              item
                ?.map((nguon, index) => {
                  let x = props.listnguonKhacChiTra.find(
                    (dv) => dv.id === nguon
                  );
                  return x?.ten || "";
                })
                .filter((item) => item) ?? [];

            return list.join(", ");
          }
          return "";
        }
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="khongTinhTien"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.khongTinhTien || 0}
          searchSelect={
            <Select
              data={KHONG_TINH_TIEN}
              placeholder="Không tính tiền"
              onChange={onSearchInput("khongTinhTien")}
            />
          }
          title="Không tính tiền"
        />
      ),
      width: 150,
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      align: "center",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Checkbox
              defaultChecked={item}
              onChange={onChange("khongTinhTien")}
            />
          );
        } else
          return (
            <Checkbox checked={item} onChange={onChange("khongTinhTien")} />
          );
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
          title="Có hiệu lực"
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("active")} />
          );
        } else return <Checkbox checked={item} onChange={onChange("active")} />;
      },
    },
  ];
  const onRow = (record = {}, index) => {
    if (!state.pressButtonAdded) {
      return {
        onClick: (event) => {
          setState({
            currentItem: JSON.parse(JSON.stringify(record)),
            currentIndex: index,
            pressedRow: true,
          });
        },
      };
    }
  };
  const onAddNewRow = () => {
    let item = { dichVuId, active: true };
    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
      pressButtonAdded: true,
    });
  };
  const onSave = () => {
    const {
      id,
      dichVuId,
      diaChi,
      gioiTinh,
      active = true,
      giaPhuThu,
      giaBaoHiem,
      giaKhongBaoHiem,
      tuNgay,
      denNgay,
      khongTinhTien = true,
      dsNguonKhacChiTra = [],
    } = state.currentItem || {};
    // if (!state.currentItem?.giaKhongBaoHiem || !state.currentItem?.tuNgay) {
    //   setState({
    //     checkValidate: true,
    //   });
    //   return;
    // }
    // setState({
    //   checkValidate: false,
    // });
    props
      .createOrEdit({
        id,
        dichVuId: dichVuId,
        khoaChiDinhId: state.currentItem?.khoaChiDinh?.id,
        loaiDoiTuongId: state.currentItem?.loaiDoiTuong?.id,
        diaChi,
        gioiTinh,
        active,
        phongId: state.currentItem?.phong?.id,
        giaBaoHiem: giaBaoHiem?.toString().replace(".", "") || null,
        giaKhongBaoHiem: giaKhongBaoHiem?.toString().replace(".", "") || null,
        giaPhuThu: giaPhuThu?.toString().replace(".", "") || null,
        tuNgay,
        denNgay,
        khongTinhTien,
        dsNguonKhacChiTra,
      })
      .then((s) => {
        setState({
          currentIndex: -1,
          currentItem: null,
          pressButtonAdded: false,
        });
      });
  };
  refCallbackSave.current = onSave;

  const onCancel = () => {
    setState({
      checkValidate: false,
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
    });
  };
  return (
    <EditWrapper
      title={"Tùy chọn giá"}
      onCancel={onCancel}
      onSave={onSave}
      onAddNewRow={onAddNewRow}
      isShowSaveButton={state.currentItem}
      isShowCancelButton={state.currentItem}
      showAdded={dichVuId && !state.currentItem}
      roleSave={props.roleSave}
      roleEdit={props.roleEdit}
      editStatus={state?.pressButtonAdded ? false : editStatus}
      forceShowButtonSave={
        (state?.pressedRow && checkRole(props.roleEdit) && true) || (state.pressButtonAdded && checkRole(props.roleEdit) && true) || false
      }
      forceShowButtonCancel={
        (state?.pressedRow && checkRole(props.roleEdit) && true) || (state.pressButtonAdded && checkRole(props.roleEdit) && true) || false
      }
      isEditAndPressRow={dichVuId && checkRole(props.roleEdit)}
    >
      <fieldset disabled={state?.pressButtonAdded ? false : editStatus}>
        <div>
          <TableWrapper
            scroll={{ y: 500, x: 700 }}
            columns={columns}
            dataSource={dichVuId ? state.data : []}
            onRow={onRow}
          ></TableWrapper>
          {dichVuId && totalElements ? (
            <Pagination
              onChange={onChangePage}
              current={props.page + 1}
              pageSize={props.size}
              total={totalElements}
              onShowSizeChange={onSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
        </div>
      </fieldset>
    </EditWrapper>
  );
}

const mapStateToProps = (state) => {
  const {
    tuyChonGia: { listData, size, page, totalElements, dataSortColumn },
    phong: { listAllPhong = [] },
    khoa: { listAllKhoa = [] },
    loaiDoiTuong: { listAllLoaiDoiTuong = [] },
    utils: { listnguonKhacChiTra = [] },
  } = state;

  return {
    listData: listData || [],
    size,
    page,
    totalElements,
    listAllPhong,
    listAllKhoa,
    listAllLoaiDoiTuong,
    listnguonKhacChiTra,
    dataSortColumn: dataSortColumn || { active: 2, ["dichVu.ten"]: 1 },
  };
};

const mapDispatchToProps = ({
  tuyChonGia: {
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,

    createOrEdit,
    onDelete,
  },
  khoa: { getListAllKhoa },
  phong: { getListAllPhong },
  utils: { getUtils },
  loaiDoiTuong: { getListAllLoaiDoiTuong },
}) => {
  return {
    getData,
    getListAllKhoa,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,

    createOrEdit,
    onDelete,
    updateData,
    getListAllPhong,
    getListAllLoaiDoiTuong,
    getUtils,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TuyChonGia);
