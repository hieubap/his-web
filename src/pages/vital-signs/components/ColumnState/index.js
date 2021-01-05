import React, { memo } from "react";
import { connect } from "react-redux";
import { SIZE } from "utils/vital-signs/constants";
import { Main } from "./styled";
function ColumnState(props, refs) {
  const values = props.values;

  const { indexUpdate } = props;
  let index = props.index;
  if (index === -1) index = values.length - 1;
  const isEditing = props.isEditing;
  const isDeleting = props.isDeleting;
  return (
    <Main>
      {values.map((item, i) => {
        if (i === (isEditing || isDeleting ? indexUpdate : index))
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                backgroundColor: "green",
                height: 3,
                left: SIZE.columnWidth * i,
                top: 0,
                width: SIZE.columnWidth,
              }}
            />
          );
        return null;
      })}
    </Main>
  );
}

export default connect((state) => {
  return {
    values: state.vitalSigns.values || [],
    index: state.vitalSigns.index,
  };
}, null)(memo(ColumnState));
