import React, { useState, useEffect, useDebugValue } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import SelectLargeData from "components/SelectLargeData";
import { HIEU_LUC, ROLES } from "constants/index";
import { Input, Checkbox, InputNumber } from "antd";
import { set } from "lodash";

function DichVuTrongGoi(props) {
  const { size, page, goiDichVu, totalElements, listAllDichVuPhong, refCallbackSave } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
    listAllDichVuPhong: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    props.onSizeChange({ size: 10 });
    props.getAllDichVu({
      dsLoaiDichVu: goiDichVu?.dsLoaiDichVu?.join(","),
      active: true,
    });
    // props.loadAllRoom({});
    props.getListAllDichVuPhong({});
  }, [goiDichVu]);

  useEffect(() => {
    setState({
      data: [...props.listData],
      listAllDichVuPhong: [...props.listAllDichVuPhong],
    });
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
    } else value = e;
    props.onChangeInputSearch({
      [key]: value,
    });
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

    if (listAllDichVuPhong?.length > 0) {
      if (selector === "dichVu") {
        const result = listAllDichVuPhong.filter(
          (item) => item.dichVuId === value
        );
        if (result?.length == 1) {
          if (state.currentItem) {
            if (!state.currentItem["phong"]) state.currentItem["phong"] = {};
            state.currentItem["phong"] = { ...result[0] };
            state.currentItem["phongId"] = result[0]?.id;
          }
        }
        setState({
          listAllDichVuPhong: result,
        });
      }
    }

    if (value === "" || value === undefined) {
      setState({
        listAllDichVuPhong: props.listAllDichVuPhong,
      });
    }
  };

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên dịch vụ"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <>
              <SelectLargeData
                placeholder={"Chọn dịch vụ"}
                data={props.listAllDichVu}
                onChange={onChange("id", "dichVu")}
                style={{ width: "100%" }}
                getValue={(item) => item?.id}
                renderText={(item) => item?.ten}
                value={state.currentItem?.dichVu?.id}
              />
              {state?.checkValidate && !state.currentItem?.dichVu?.id && (
                <span className="error">Vui lòng chọn dịch vụ!</span>
              )}
            </>
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng"
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.soLuong || 0}
          search={
            <Input
              placeholder="Tìm số lượng"
              onChange={onSearchInput("soLuong")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <>
              <InputNumber
                placeholder="Nhập số lượng"
                style={{ width: "100%" }}
                defaultValue={state.currentItem?.soLuong}
                onChange={onChange("soLuong", "")}
              />
              {state?.checkValidate && state.currentItem?.soLuong === null && (
                <span className="error">Vui lòng nhập số lượng!</span>
              )}
            </>
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phòng"
          sort_key="phong.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["phong.ten"] || 0}
          search={
            <Input
              placeholder="Tìm phòng"
              onChange={onSearchInput("phong.ten")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "phong",
      key: "phong",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <SelectLargeData
              placeholder={"Chọn phòng"}
              data={state.listAllDichVuPhong}
              onChange={onChange("phongId", "phong")}
              style={{ width: "100%" }}
              getValue={(item) => item?.phongId}
              renderText={(item) => item?.phong?.ten}
              value={state.currentItem?.phong?.phongId}
            />
          );
        } else return item && item?.ten;
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
      width: 150,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, list, index) => {
        if (index == state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("active")} />
          );
        } else return <Checkbox checked={item} />;
      },
    },
  ];
  const onRow = (record = {}, index) => {
    return {
     onClick: (event) => {
        let dsDichVu = listAllDichVuPhong.filter(
          (item) => item.dichVuId === record?.dichVuId
        );
        let newState = {
          currentItem: JSON.parse(JSON.stringify(record)),
          currentIndex: index,
          listAllDichVuPhong: dsDichVu,
        }
        if (dsDichVu?.length == 1) {
          newState.currentItem = newState.currentItem || {};
          newState.currentItem["phong"] = { ...dsDichVu[0] };
          newState.currentItem["phongId"] = dsDichVu[0]?.id;
        }
        setState(newState);
      },
    };
  };
  const onAddNewRow = () => {
    let item = { goiDvId: props.goiDvId, soLuong: 1 };
    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
      listAllDichVuPhong: props.listAllDichVuPhong,
    });
  };
  const onSave = () => {
    const { id, goiDvId, soLuong, active } = state.currentItem || {};
    if (!state.currentItem?.soLuong || !state.currentItem?.dichVu?.id) {
      setState({
        checkValidate: true,
      });
      return;
    } else {
      setState({
        checkValidate: false,
      });
    }

    props
      .createOrEdit({
        id,
        goiDvId,
        soLuong,
        active,
        dichVuId: state.currentItem?.dichVu?.id,
        phongId: state.currentItem?.phong?.phongId,
      })
      .then((s) => {
        setState({
          currentIndex: -1,
          currentItem: null,
        });
      });
  };
  refCallbackSave.current = onSave;

  const onCancel = () => {
    setState({
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
      listAllDichVuPhong: props.listAllDichVuPhong,
    });
  };
  return (
    <EditWrapper
      title={"Dịch vụ trong gói"}
      onCancel={onCancel}
      onSave={onSave}
      onAddNewRow={onAddNewRow}
      isShowSaveButton={state.currentItem}
      isShowCancelButton={state.currentItem}
      showAdded={goiDichVu?.id && !state.currentItem}
      roleSave={[ROLES["DANH_MUC"].GOI_DICH_VU_THEM]}
    >
      <div>
        <TableWrapper
          scroll={{ y: 500, x: 700 }}
          columns={columns}
          dataSource={goiDichVu?.id ? state.data : []}
          onRow={onRow}
        ></TableWrapper>
        {goiDichVu?.id && totalElements ? (
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
    </EditWrapper>
  );
}

const mapStateToProps = (state) => {
  const {
    goiDichVuChiTiet: { listData, size, page, totalElements, dataSortColumn },
    goiDichVu: { currentItem: goiDichVu },
    dichVu: { listAllDichVu = [] },
    // phong: { listPhong = [] },
    phongThucHien: { listAllDichVuPhong },
  } = state;

  return {
    listData: listData || [],
    size,
    page,
    totalElements,
    goiDichVu,
    listAllDichVu: listAllDichVu || [],
    // listPhong,
    listAllDichVuPhong,
    dataSortColumn: dataSortColumn || { active: 2, ["dichVu.ten"]: 1 },
  };
};

const mapDispatchToProps = ({
  goiDichVuChiTiet: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
  },
  dichVu: { getAllDichVu },
  phongThucHien: { getListAllDichVuPhong },
}) => {
  return {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
    updateData,
    getAllDichVu,
    getListAllDichVuPhong,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DichVuTrongGoi);
