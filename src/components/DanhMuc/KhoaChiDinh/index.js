import React, { useState, useEffect, useMemo, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import SelectLargeData from "components/SelectLargeData";
import { HIEU_LUC } from "constants/index";
import { Input, Checkbox, InputNumber } from "antd";
import { openInNewTab } from "utils";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
function KhoaChiDinh(props) {
  console.log('render ... 4');
  
  const { size, page, dichVuId, totalElements, refCallbackSave = {} } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
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
  }, [dichVuId]);

  useEffect(() => {
    setState({ data: [...props.listData] });
  }, [props.listData, page, size]);

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  // const onSearchInput = (key) => (e) => {
  //   let value = "";
  //   if (e?.target) {
  //     if (e.target.hasOwnProperty("checked")) value = e.target.checked;
  //     else value = e.target.value;
  //   } else value = e;
  //   props.onChangeInputSearch({
  //     [key]: value,
  //     dichVuId,
  //   });
  // };

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
        props.onChangeInputSearch({
          [key]: value,
          dichVuId
        });
      },
      500,
      key,
      e?.target
    );
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
    } else value = e;
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
              Tên khoa
            </div>
          }
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.id"] || 0}
          require
          searchSelect={
            <Select
              placeholder={"Chọn khoa"}
              data={props.listAllKhoa}
              onChange={onSearchInput("khoaChiDinhId")}
              style={{ width: "100%" }}
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
      width: "100px",
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
    return {
      onClick: (event) => {
        setState({
          currentItem: JSON.parse(JSON.stringify(record)),
          currentIndex: index,
          pressedRow: true,
        });
      },
    };
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
    const { id, dichVuId, active = true } = state.currentItem || {};
    props
      .createOrEdit(
        {
          id,
          dichVuId: dichVuId,
          khoaChiDinhId: state.currentItem?.khoaChiDinh?.id,
          active,
        },
        dichVuId
      )
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
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
    });
  };
  return (
    <EditWrapper
      title={"Khoa chỉ định dịch vụ"}
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
    khoaChiDinhDichVu: { listData, size, page, totalElements, dataSortColumn },
    phong: { listAllPhong = [] },
    khoa: { listAllKhoa = [] },
  } = state;

  return {
    listData: listData || [],
    size,
    page,
    totalElements,
    listAllPhong,
    listAllKhoa,
    dataSortColumn: dataSortColumn || { active: 2, ["dichVu.ten"]: 1 },
  };
};

const mapDispatchToProps = ({
  khoaChiDinhDichVu: {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KhoaChiDinh);
