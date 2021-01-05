import React from "react";
import InsertRow from "./InsertRow";
import GridData from "./GridDataRender";
import LayoutRender from "./LayoutRender";
import AddRow from "./AddRow";
import Categories from "./Categories";
import ConfigRender from "./ConfigRender";
import ListRender from "./ListRender";

export const composeRender = (type, props) => {
  const { mode } = props;

  if (mode === "config" && type === "analytic") {
    return <Categories {...props} />;
  }

  if (mode === "config") {
    return <ConfigRender {...props} />;
  }

  if (type === "insertRow") {
    return <InsertRow {...props} />;
  }

  if (type === "listRender") {
    return <ListRender {...props} />;
  }

  if (type === "gridData") {
    return <GridData {...props} />;
  }

  if (type === "replicationRow") {
    return <AddRow {...props} />;
  }

  if (type === "analytic") {
    return <Categories {...props} />;
  }

  return <LayoutRender {...props} />;
};

const isHiddenBetweenTwoItem = (hiddenKeys, start, end) => {
  let idx = start + 1;
  let flag = false;
  while(idx < end) {
    flag = hiddenKeys.includes(idx);
    idx += 1
  }
  return flag
}

export const checkConsecutive = (indexList, hiddenKeys) => {
  indexList = indexList.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  if (indexList.length > 1) {
    let idx = 0;

    while (idx < indexList.length) {
      if (indexList[idx] + 1 !== indexList[idx + 1]) {
        if(isHiddenBetweenTwoItem(hiddenKeys, indexList[idx] + 1, indexList[idx + 1] + 1)) return true;
        return false;
      }
      idx += 1;

      if (idx === indexList.length - 1) {
        return true;
      }
    }
  } else {
    return true;
  }
};