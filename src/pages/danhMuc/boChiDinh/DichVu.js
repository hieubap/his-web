import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TableWrapper from "components/TableWrapper";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import SelectLargeData from "components/SelectLargeData";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import { HIEU_LUC } from "constants/index";
import { Checkbox, Image, Space, Modal } from "antd";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import { useMemo } from "react";
const DichVu = (props) => {
  const { size, page, totalElements, boChiDinhId, refCallbackSave } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  useEffect(() => {
    if (boChiDinhId) props.getData({ boChiDinhId });
  }, [boChiDinhId]);

  useEffect(() => {
    setState({ data: [...props.listData] });
  }, [props.listData, page, size]);

  useEffect(() => {
    if (!props.dataEditDefault.thuocChiDinhNgoai) {
      props.getAllDichVu({
        dsLoaiDichVu: props.dsLoaiDichVu ? props.dsLoaiDichVu?.join(",") : "",
        active: true,
      });
    } else {
      props.getAllThuocKeNgoai({ page: 0, active: true });
    }
  }, [props.dsLoaiDichVu, props.dataEditDefault.thuocChiDinhNgoai]);

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
      boChiDinhId,
    });
  };
  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, boChiDinhId });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size, boChiDinhId });
  };

  const onSave = () => {
    const {
      id,
      boChiDinhId,
      dichVuId,
      active = true,
      thuocChiDinhNgoaiId,
      soLuong,
    } = state.currentItem || {};

    setState({
      checkValidate: false,
    });
    props
      .createOrEdit({
        id,
        boChiDinhId: boChiDinhId,
        dichVuId: dichVuId,
        thuocChiDinhNgoaiId: thuocChiDinhNgoaiId,
        soLuong: soLuong,
        active,
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

  const onRow = (record = {}, index) => {
    return {
      onClick: (event) => {
        setState({
          currentItem: JSON.parse(JSON.stringify(record)),
          currentIndex: index,
        });
      },
    };
  };

  const onAddNewRow = () => {
    let item = { boChiDinhId: boChiDinhId, active: true };
    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
      pressButtonAdded: true,
    });
  };
  const onChange = (key, selector) => (e) => {
    if (
      key === "thuocChiDinhNgoaiId" &&
      !props?.dataEditDefault?.thuocChiDinhNgoai
    ) {
      key = "dichVuId";
    }
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d;
    else value = e;
    if (state?.currentItem) {
      if (selector) {
        if (!state.currentItem[selector]) state.currentItem[selector] = {};
        state.currentItem[selector][key] = value;
      } else {
        state.currentItem[key] = value;
        setState({
          currentItem: state.currentItem,
        });
      }
    }
  };
  const onDeleteItem = (item) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa bản ghi này không?",
      cancelText: "Hủy",
      okText: "Đồng ý",
      onOk() {
        props.onDelete(item.id);
      },
      onCancel() {},
    });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 30,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Dịch vụ"
          sort_key="dichVuId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.dichVuId || 0}
          searchSelect={
            <Select
              placeholder="Tìm dịch vụ"
              data={
                props.dataEditDefault.thuocChiDinhNgoai
                  ? props.listAllThuocKeNgoai
                  : props.listAllDichVu
              }
              onChange={onSearchInput("thuocChiDinhNgoaiId")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "thuocChiDinhNgoai",
      key: "thuocChiDinhNgoai",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <SelectLargeData
                placeholder={"Chọn dịch vụ"}
                data={
                  props.dataEditDefault.thuocChiDinhNgoai
                    ? props.listAllThuocKeNgoai
                    : props.listAllDichVu
                }
                onChange={onChange("thuocChiDinhNgoaiId")}
                style={{ width: "100%" }}
                getValue={(item) => item?.id}
                renderText={(item) => item?.ten}
                value={state.currentItem?.dichVu?.id}
              />
              {state?.checkValidate &&
                !state.currentItem?.thuocChiDinhNgoai?.id && (
                  <span className="error">Vui lòng chọn dịch vụ!</span>
                )}
            </>
          );
        } else return (item && item.ten) || (list?.dichVu && list?.dichVu?.ten);
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 70,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, list, index) => {
        if (index === state?.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("active")} />
          );
        } else return <Checkbox checked={item} onChange={onChange("active")} />;
      },
    },
    {
      title: <HeaderSearch title="Actions" />,
      width: 50,
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, item) => {
        return (
          <Image
            preview={false}
            src={require("assets/images/his-core/iconDelete.png")}
            onClick={() => {
              onDeleteItem(item);
            }}
          />
        );
      },
    },
  ];
  return (
    <>
      <EditWrapper
        title="Dịch vụ trong bộ chỉ định"
        onCancel={onCancel}
        onSave={onSave}
        onAddNewRow={onAddNewRow}
        isShowSaveButton={state.currentItem}
        isShowCancelButton={state.currentItem}
        showAdded={boChiDinhId && !state.currentItem}
        roleSave={[ROLES["DANH_MUC"].BO_CHI_DINH_THEM]}
        roleEdit={[ROLES["DANH_MUC"].BO_CHI_DINH_SUA]}
        editStatus={state?.pressButtonAdded ? false : editStatus}
        // isHiddenButtonAdd={true}
        forceShowButtonSave={
          (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
          false
        }
        forceShowButtonCancel={
          (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
          false
        }
      >
        <TableWrapper
          columns={columns}
          dataSource={boChiDinhId ? state.data : []}
          onRow={onRow}
        ></TableWrapper>
        {boChiDinhId && totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={props.page + 1}
            pageSize={props.size}
            total={totalElements}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
      </EditWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    dichVu: { listAllDichVu = [] },
    boChiDinh: { dataEditDefault = {} },
    boChiDinhChiTiet: { listData, size, page, totalElements, dataSortColumn },
    thuocKeNgoai: { listAllData: listAllThuocKeNgoai = [] },
  } = state;

  return {
    listAllDichVu,
    listData,
    size,
    page,
    totalElements,
    dataSortColumn,
    dataEditDefault,
    listAllThuocKeNgoai,
  };
};
const mapDispatchToProps = ({
  dichVu: { getAllDichVu },
  boChiDinhChiTiet: {
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
  },
  thuocKeNgoai: { getAllTongHop: getAllThuocKeNgoai },
}) => ({
  getAllDichVu,
  getData,
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  onDelete,
  getAllThuocKeNgoai,
});

export default connect(mapStateToProps, mapDispatchToProps)(DichVu);
