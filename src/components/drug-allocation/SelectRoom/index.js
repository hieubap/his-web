import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const SelectRoom = (props) => {
  const { t } = useTranslation();
  const onSelectRoom = (value) => {
    props.onSelectRoom(value);
  };

  const filterOption = (input, option) => {
    return (
      (option.props.name || "").toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };

  return (
    <Select
      showSearch
      value={props.roomId || undefined}
      onSelect={onSelectRoom}
      placeholder={t("drugDistributions.selectRoom")}
      size={"default"}
      className="search-item"
      filterOption={filterOption}
      notFoundContent={<span id={'room-no-data-mess'}>{t("drugDistributions.noData")}</span>}
    >
      <Select.Option value="">- Chọn tất cả -</Select.Option>
      {props.rooms.map((item, index) => (
        <Select.Option key={index} value={item.id} id={item.id} name={item.name}>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={item.name}
          >
            {item.name}
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

const mapState = (state) => {
  return {
    rooms: state.room.rooms || [],
    roomId: state.drugAllocation.roomId,
  };
};

const mapDispatch = ({ drugAllocation: { onSelectRoom } }) => ({
  onSelectRoom,
});

export default connect(mapState, mapDispatch)(SelectRoom);
