import React, { useState, useEffect, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import { HIEU_LUC } from "constants/index";
import { Input, Checkbox } from "antd";

function KhoaChiDinh(props) {
  const { size, page, dichVuId, totalElements } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    props.getData({ dichVuId });
  }, [dichVuId]);

  useEffect(() => {
    setState({ data: [...props.listData] });
  }, [props.listData, page, size]);

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

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
        });
      },
      500,
      key,
      e?.target
    );
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
          title="M?? m???u k???t qu???"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.id"] || 0}
          search={
            <Input
              placeholder="T??m m?? m???u k???t qu???"
              onChange={onSearchInput("dichVu.ma")}
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
            <Input
              defaultValue={state.currentItem?.khoaChiDinh}
              placeholder="Nh???p m?? m???u k???t qu???"
              onChange={onChange("diaChi")}
            />
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??n m???u k???t qu???"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.id"] || 0}
          search={
            <Input
              placeholder="T??m t??n m???u k???t qu???"
              onChange={onSearchInput("dichVu.ma")}
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
            <Input
              defaultValue={state.currentItem?.khoaChiDinh}
              placeholder="Nh???p t??n m???u k???t qu???"
              onChange={onChange("diaChi")}
            />
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="K???t qu???"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.id"] || 0}
          search={
            <Input
              placeholder="T??m k???t qu???"
              onChange={onSearchInput("dichVu.ma")}
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
            <Input
              defaultValue={state.currentItem?.khoaChiDinh}
              placeholder="Nh???p k???t qu???"
              onChange={onChange("diaChi")}
            />
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="K???t lu???n"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.id"] || 0}
          search={
            <Input
              placeholder="T??m k???t lu???n"
              onChange={onSearchInput("dichVu.ma")}
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
            <Input
              defaultValue={state.currentItem?.khoaChiDinh}
              placeholder="Nh???p k???t lu???n"
              onChange={onChange("diaChi")}
            />
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Vi th???"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.id"] || 0}
          search={
            <Input
              placeholder="T??m vi th???"
              onChange={onSearchInput("dichVu.ma")}
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
            <Input
              defaultValue={state.currentItem?.khoaChiDinh}
              placeholder="Nh???p vi th???"
              onChange={onChange("diaChi")}
            />
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="?????i th???"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.id"] || 0}
          search={
            <Input
              placeholder="T??m ?????i th???"
              onChange={onSearchInput("dichVu.ma")}
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
            <Input
              defaultValue={state.currentItem?.khoaChiDinh}
              placeholder="Nh???p ?????i th???"
              onChange={onChange("diaChi")}
            />
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="B??n lu???n"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["khoaChiDinh.id"] || 0}
          search={
            <Input
              placeholder="T??m b??n lu???n"
              onChange={onSearchInput("dichVu.ma")}
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
            <Input
              defaultValue={state.currentItem?.khoaChiDinh}
              placeholder="Nh???p b??n lu???n"
              onChange={onChange("diaChi")}
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
              placeholder="Ch???n hi???u l???c"
              onChange={onSearchInput("active")}
            />
          }
          title="C?? hi???u l???c"
        />
      ),
      width: "120px",
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
    });
  };
  const onSave = () => {
    const { id, dichVuId, active = true } = state.currentItem || {};
    props
      .createOrEdit({
        id,
        dichVuId: dichVuId,
        khoaChiDinhId: state.currentItem?.khoaChiDinh?.id,
        active,
      })
      .then((s) => {
        setState({
          currentIndex: -1,
          currentItem: null,
        });
      });
  };

  const onCancel = () => {
    setState({
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
    });
  };
  return (
    <EditWrapper
      title={"M???u k???t qu???"}
      onCancel={onCancel}
      onSave={onSave}
      onAddNewRow={onAddNewRow}
      isShowSaveButton={state.currentItem}
      isShowCancelButton={state.currentItem}
      showAdded={dichVuId && !state.currentItem}
    >
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
    </EditWrapper>
  );
}

const mapStateToProps = (state) => {
  const {
    mauKetQua: { listData, size, page, totalElements, dataSortColumn },
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
  mauKetQua: {
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
  },
}) => {
  return {
    getData,
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
