import React, { useState, useCallback, useRef, memo } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Card, Icon, Empty, Spin, Input, Popover } from "antd";
import { useTranslation } from "react-i18next";
import { areEqual, VariableSizeList as CustomVirtualizeList } from "react-window";
import ModalSearch from "../ModalSearch";

const NursingList = ({
  onDeleteNursing,
  nursingSelected,
  isLoadingNursingSelected,
  title,
  showModal,
  visible,
  total,
  onDeleteNurseAll,
  isLoadingDeSelectAllNurse,
}) => {
  const { t } = useTranslation();
  const listRef = useRef();
  const handledeleteNursing = (id) => {
    onDeleteNursing(id);
  };
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredNurse = useCallback(
    (nursingSelected || []).filter((item) => {
      const fullName = item?.user?.fullName || "";
      const userName = item?.user?.value || "";
      const text = inputValue.toLowerCase().createUniqueText();
      if (!text) return true;
      if (
        fullName.toLowerCase().createUniqueText().indexOf(text) !== -1 ||
        userName.toLowerCase().createUniqueText().indexOf(text) !== -1
      ) {
        return true;
      }
      return false;
    }),
    [nursingSelected, inputValue]
  );

  const handleDeselectedAll = () => {
    if (filteredNurse.length === 0) return;
    const body = filteredNurse.map((item) => item.id);
    onDeleteNurseAll(body);
  };

  const RowItems = memo(({ index, style }) => {
    const currentRow = filteredNurse[index];
    console.log({ filteredNurse });
    return (
      <div
        style={style}
        className="selected-patient"
      >
        <div className="left-box">
          <div>
            <b>{currentRow?.user?.fullName}</b>
          </div>
          <div className="desc">
            {`${t("patientRoom.nursingCode")}: ${currentRow?.user?.value || ''}, ${t(
              "drugDistributions.department"
            )}: ${currentRow?.user?.department?.name || ''}`}
          </div>
        </div>
        <div
          className="right-box"
          id={`close_icon_${currentRow.id}`}
          onClick={() => handledeleteNursing(currentRow.id)}
        >
          <Icon type="close" />
        </div>
      </div>
    );
  }, areEqual);
  const getItemSize = (index) => {
    const currentRow = filteredNurse[index];
    return currentRow?.department?.name?.length > 41 ? 70 : 60;
  };

  return (
    <Main className="main-selected">
      <Card
        title={title}
        bordered={false}
        className={`card-container ${!filteredNurse.length && "empty"}`}
      >
        <Spin spinning={isLoadingDeSelectAllNurse}>
          <div className="search-inner mb-3">
            {total && (
              <>
                <p className="item-length">
                  <Popover
                    placement="rightTop"
                    content={
                      <div
                        onClick={handleDeselectedAll}
                        className="popover-content"
                      >
                        Xóa tất cả
                      </div>
                    }
                    overlayClassName="custom-overlay"
                  >
                    <Icon type="down-square" />{" "}
                  </Popover>
                  {`${nursingSelected.length + " bản ghi"}`}
                </p>
                <Input
                  value={inputValue}
                  placeholder="Nhập tên, mã nhân viên"
                  onChange={handleChange}
                  prefix={<Icon type="search" style={{ color: "#125872" }} />}
                />
              </>
            )}
          </div>
          <Spin spinning={isLoadingNursingSelected}>
            {filteredNurse?.length ? (
              <div className="custom-virtualize-list">
                <CustomVirtualizeList
                  height={400}
                  itemCount={filteredNurse.length}
                  itemSize={getItemSize}
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
      <ModalSearch visible={visible} showModal={showModal} />
    </Main>
  );
};

const mapState = (state) => ({
  nursingSelected: state.patientRoom.nursingSelected || [],
  isLoadingNursingSelected: state.patientRoom.isLoadingNursingSelected,
  isLoadingDeSelectAllNurse: state.patientRoom.isLoadingDeSelectAllNurse,
});

const mapDispatch = ({
  patientRoom: { onDeleteNursing, onDeleteNurseAll },
}) => ({
  onDeleteNursing,
  onDeleteNurseAll,
});

export default connect(mapState, mapDispatch)(NursingList);
