import Icon from "@ant-design/icons";
import { checkRole } from "app/Sidebar/constant";
import IcCreate from "assets/images/kho/IcCreate.png";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import extendTable from "assets/svg/extendTable.svg";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import { Pagination, TableWrapper } from "components";
import { PAGE_DEFAULT, ROLES } from "constants/index";
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { combineSort } from "utils";
let timer = null;

const TableLeft = ({
  page,
  size,
  total,
  listData, // = [],
  dataSearch,
  sortData = {},
  setEditStatus,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,

  layerId,
  getColumns = () => [],
  getData = () => {}, // = () => {},
  dataEdit,
  updateData = () => {}, // update data vào redux
  // custom lại update vào redux khi chọn 1 hàng
  // mặc định là trường dataEdit
  updateDataEdit, //function () => {}
  updateDataSearch, //function () => {}

  addHeader = () => [], // giữ mặc định chỉ thêm các header vào
  customHeader, // replace toàn bộ header (parentProp) => []
  refClickBtnAdd = {},
  refForm,
}) => {
  const refSelectRow = useRef();
  const { onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 38, //up
          onEvent: (e) => {
            if (refSelectRow.current && e.target.nodeName != "INPUT") {
              refSelectRow.current(-1);
            }
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            console.log(e.target);
            if (refSelectRow.current && e.target.nodeName != "INPUT")
              refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId });
    };
  }, []);

  useEffect(() => {
    const res = combineSort(sortData);
    getData({ ...dataSearch, page, size, sort: res });
  }, []);

  const onShowEdit = updateDataEdit
    ? updateDataEdit
    : (dataEdit) => {
        updateData({ dataEdit });
      };

  refSelectRow.current = (index) => {
    const indexNextItem =
      (data?.findIndex((item) => item.id === dataEdit?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setEditStatus(true);
      onShowEdit(data[indexNextItem]);
      document
        .getElementsByClassName(
          `row-id-${layerId}-${data[indexNextItem]?.id}`
        )[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { ...sortData, [key]: value };
    delete sort.createdAt;
    updateData({ dataSortQuocGia: sort });
    const res = combineSort(sort);
    getData({
      ...dataSearch,
      page: PAGE_DEFAULT,
      size,
      sort: res,
    });
  };

  const _updateDataSearch = updateDataSearch
    ? updateDataSearch({ dataSearch })
    : ({ name, value }) => {
        updateData({
          dataSearch: { ...dataSearch, [name]: value },
        });
      };

  const onSearchInput = (name) => (e) => {
    const value =
      e?.target?.value ||
      (typeof e === "string" || Number.isInteger(e) ? e : null);

    clearTimeout(timer);
    timer = setTimeout(() => {
      _updateDataSearch({ name, value });

      getData({
        ...dataSearch,
        page: 0,
        size,
        [name]: value,
        sort: combineSort(sortData),
      });
    }, 300);
  };

  const onRow = (record, index) => ({
    onClick: (event) => {
      setEditStatus(true);
      onShowEdit(record.action);
    },
  });
  const data = useMemo(() => {
    return listData.map((item, index) => {
      return {
        ...item,
        action: item,
        stt: page * size + index + 1,
      };
    });
  }, [listData]);
  const setRowClassName = (record) => {
    let idDiff = dataEdit?.id;
    return record.id == idDiff
      ? `row-actived row-id-${layerId}-${record.id}`
      : `row-id-${layerId}-${record.id}`;
  };

  const onChangePageOrSize = (isPage) => (value) => {
    const params = isPage ? { page: value - 1 } : { page: 0, size: value };
    updateData(params);
    getData({
      ...params,
      sort: combineSort(sortData),
    });
  };

  return (
    <div>
      <TableWrapper
        scroll={{ x: 1000 }}
        classNameRow={"custom-header"}
        styleMain={{ marginTop: 0 }}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={
          customHeader
            ? customHeader({})
            : checkRole([ROLES["DANH_MUC"].DIA_CHI_HANH_CHINH_THEM])
            ? [
                ...addHeader({ dataSearch, onSearchInput }),
                {
                  title: "Thêm mới [F1]",
                  onClick:
                    refClickBtnAdd.current && refClickBtnAdd.current(true),
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
                {
                  className: "btn-change-full-table",
                  title: <Icon component={showFullTable ? thuNho : showFull} />,
                  onClick: handleChangeshowTable,
                },

                {
                  className: "btn-collapse",
                  title: (
                    <Icon
                      component={collapseStatus ? extendTable : extendChiTiet}
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
            : [
                ...addHeader({ dataSearch, onSearchInput }),
                {
                  className: "btn-change-full-table",
                  title: <Icon component={showFullTable ? thuNho : showFull} />,
                  onClick: handleChangeshowTable,
                },

                {
                  className: "btn-collapse",
                  title: (
                    <Icon
                      component={collapseStatus ? extendTable : extendChiTiet}
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
        }
        columns={getColumns({
          dataSearch,
          sortData,
          onSearchInput,
          onClickSort,
        })}
        dataSource={data}
        onRow={onRow}
        rowClassName={setRowClassName}
      />

      {total && (
        <Pagination
          onChange={onChangePageOrSize(true)}
          onShowSizeChange={onChangePageOrSize(false)}
          current={page + 1}
          pageSize={size}
          total={total}
          // listData={data}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

export default TableLeft;
