import React, { useEffect, useState, useMemo, useRef, memo } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Input, Card, Spin, Empty, Checkbox, Icon } from "antd";
import { useTranslation } from "react-i18next";
import { areEqual, VariableSizeList as CustomVirtualizeList  } from 'react-window';

const NursingAll = ({
  onSelectNusing,
  isLoadingNursing,
  searchNurse,
  nurseSearch,
  visible,
  selectAllNurse,
  isLoadingSelectAllNurse,
}) => {
  const listRef = useRef();
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState();
  useEffect(() => {
    setInputValue("");
    searchNurse({ timKiem: "" });
    if(listRef.current) { // Re calculate list item height
      listRef.current.resetAfterIndex(0, false);
    }
  }, [visible]);

  const selectNusing = (item) => {
    if (!item.selected) {
      const id = item.id;
      onSelectNusing({ nurseId: id });
    }
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    searchNurse({ timKiem: inputValue });
    if(listRef.current) { // Re calculate list item height
      listRef.current.resetAfterIndex(0, false);
    }
  };

  const ischeckAll = useMemo(
    () =>
      nurseSearch.filter((item) => item.selected).length === nurseSearch.length,
    [nurseSearch]
  );

  const onSelectAllItem = () => {
    if(!ischeckAll) {
      selectAllNurse();
      setInputValue("");
    }
  }

  const RowItems = memo(({ index, style }) => {
    const currentRow = nurseSearch[index];
    return (
      <div
        className={`room-item ${currentRow.selected ? "disabled" : ""}`}
        onClick={() => selectNusing(currentRow)}
        style={style}
      >
        <div className="left-box">
          <Checkbox
            disabled={currentRow.selected}
            checked={currentRow.selected}
          />
        </div>
        <div className="right-box">
          <div>
            <b>{currentRow?.fullName}</b>
          </div>
          <div className="desc">
            {`${t("patientRoom.nursingCode")}: ${currentRow?.value || ""}, ${t(
              "drugDistributions.department"
            )}: ${currentRow?.department?.name || ""}`}
          </div>
        </div>
      </div>
    );
  }, areEqual);

  const getItemSize = index => {
    const currentRow = nurseSearch[index];
    return currentRow?.department?.name?.length > 41 ? 65 : 54
  };

  return (
    <Main>
      <Card
        className={`card-container ${!nurseSearch.length && "empty"}`}
        bordered={false}
      >
        <Spin spinning={isLoadingSelectAllNurse}>
          <div className="search-inner mb-3">
            <p className="items-length">
              <Checkbox onChange={onSelectAllItem} checked={ischeckAll} />{" "}
              {nurseSearch?.length || 0} bản ghi
            </p>
            <Input
              value={inputValue}
              placeholder="Nhập tên, mã nhân viên"
              onChange={handleChange}
              onPressEnter={handleSubmit}
              prefix={
                <Icon
                  type="search"
                  style={{ color: "#125872" }}
                  onClick={handleSubmit}
                />
              }
            />
          </div>

          <Spin spinning={isLoadingNursing}>
            {nurseSearch.length ? (
              <div className="custom-virtualize-list">
                <CustomVirtualizeList
                  height={400}
                  itemCount={nurseSearch.length}
                  itemSize={getItemSize}
                  width={`calc(100% - 7px)`}
                  ref={listRef}
                >
                  {RowItems}
                </CustomVirtualizeList>
              </div>
            ) : (
              <Empty
                description={
                  <span id={"empty_no_data"}>
                    {t("drugDistributions.noData")}
                  </span>
                }
              />
            )}
          </Spin>
        </Spin>
      </Card>
    </Main>
  );
};

const mapState = (state) => ({
  nurses: state.patientRoom.nurses,
  nursesAll: state.patientRoom.nursesAll,
  nurseSearch: state.patientRoom.nurseSearch || [],
  isLoadingNursing: state.patientRoom.isLoadingNursing,
  nursingSelected: state.patientRoom.nursingSelected,
  isLoadingSelectAllNurse: state.patientRoom.isLoadingSelectAllNurse,
});

const mapDispatch = ({
  patientRoom: {
    getAllNursing,
    onSelectNusing,
    getListNurseByDepartment,
    searchNurse,
    selectAllNurse,
  },
}) => ({
  getAllNursing,
  onSelectNusing,
  getListNurseByDepartment,
  searchNurse,
  selectAllNurse,
});

export default connect(mapState, mapDispatch)(NursingAll);
