import React, { useState, useRef } from "react";
import { isArrayEqual } from "utils/vital-signs/helpers";
import { cloneDeep } from "lodash";
import { connect } from "react-redux";
import {
  ModalChangeDate,
  ModalInput,
  InputValue,
  ModalSurgeryInformation,
  SurgeryDetail,
  ColumnState,
} from "../";
import { SIZE } from "utils/vital-signs/constants";
import { pointToValue } from "utils/vital-signs/canvas-utils";
import { message } from "antd";
import { Main } from "./styled";

function CanvasTouchable(props, refs) {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const values = props.values;
  const refInputValue = useRef(null);
  const refChangeDate = useRef(null);
  const refModalInput = useRef(null);
  const refModalSurgeryInformation = useRef(null);

  const onChangeDate = (date) => {
    if (date > new Date()) {
      message.error("Vui lòng chọn ngày nhỏ hơn ngày hiện tại");
      return;
    }
    let index = props.index;
    if (index == -1) index = 0;
    let values = cloneDeep(props.values);
    values[index].date = date;
    props.updateData({
      values,
    });
    props.onValueChange(values);
  };
  const onClickHeader = (index) => {
    index = parseInt(index);
    refChangeDate.current.show(
      values[index].date.toDateObject
        ? values[index].date.toDateObject()
        : values[index].date,
      index,
      onChangeDate
    );
  };
  const onClickCanvas = (e) => {
    const canvasHeight = props.height;
    const indexUpdate = props.indexUpdate;
    let type = props.typeValue;
    const values = props.values;
    const isDone = props.isDone;
    const isEditing = props.isEditing;
    const isDeleting = props.isDeleting;
    const newValues = cloneDeep(values);
    if (
      e.nativeEvent.layerX <= SIZE.leftColumnWidth &&
      e.nativeEvent.layerY >= canvasHeight - 100 &&
      e.nativeEvent.layerY <= canvasHeight - 50
    ) {
    } else {
      const index =
        (e.nativeEvent.layerX - SIZE.leftColumnWidth) / SIZE.columnWidth;
      const index2 = Math.floor(index);
      const lastColumn =
        e.nativeEvent.layerX >
          SIZE.leftColumnWidth + (newValues.length - 1) * SIZE.columnWidth &&
        e.nativeEvent.layerX <=
          SIZE.leftColumnWidth + newValues.length * SIZE.columnWidth;

      const isBody =
        e.nativeEvent.layerY > SIZE.headerHeight &&
        e.nativeEvent.layerY <=
          canvasHeight - SIZE.bottomHeight - props.moreValueIds.length * 50;
      const isHeader = e.nativeEvent.layerY < SIZE.headerHeight;
      const isNormalState = !isEditing && !isDeleting;
      //set edit column
      if (lastColumn) {
        if (isNormalState) {
          props.updateData({
            isEditing: false,
            allowEdit: false,
            index: index2,
          });
          setState({
            textEdit: false,
            indexUpdate: "",
          });
        }
      } else if (values[index2] && !isDeleting && !isEditing) {
        props.updateData({
          allowEdit: true,
          index: index2,
        });
      }
      if (indexUpdate === index2 || (lastColumn && !isDone)) {
        if (isHeader) {
          onClickHeader(index);
        } else if (isBody) {
          if ((isEditing && !lastColumn) || (lastColumn && isNormalState)) {
            editBody(index2, e, newValues, lastColumn);
          }

          if (isDeleting && !lastColumn) {
            if (type === 1) {
              newValues[index2].mach = 0;
            } else {
              newValues[index2].nhiet = 0;
            }
          }
        } else {
          // footer
          let x =
            e.nativeEvent.layerY -
            (canvasHeight - SIZE.bottomHeight - props.moreValueIds.length * 50);
          if (x > SIZE.bottomHeight + props.moreValueIds.length * 50 - 100)
            return;
          let y = parseInt(x / 50);
          const listDataFooter = ["huyetap", "nhiptho", "cannang"];
          if (y > listDataFooter.length - 1) {
            if (
              ((isEditing || isDeleting) && !lastColumn) ||
              (lastColumn && isNormalState)
            ) {
              let newValues = cloneDeep(props.values);
              let i = y - listDataFooter.length;
              let _index = (newValues[index2].chiSoKhac || []).findIndex(
                (t) => t.dmChiSoId === props.moreValueIds[i]
              );
              let chiSoKhac = {
                dmChiSoId: props.moreValueIds[i],
                giaTri: "",
                tenChiSo: "",
              };
              if (_index !== -1)
                chiSoKhac = (newValues[index2].chiSoKhac || [])[_index];
              if (isDeleting && !lastColumn) {
                if (_index >= 0) {
                  newValues[index2].chiSoKhac.splice(_index, 1);
                }
                props.updateData({
                  values: newValues,
                });
                props.onValueChange(newValues, { isCanvasFooter: true });
              } else if (refModalInput.current) {
                refModalInput.current.show(
                  chiSoKhac.giaTri,
                  3,
                  "numeric",
                  (value) => {
                    chiSoKhac.giaTri = value;

                    if (!newValues[index2].chiSoKhac)
                      newValues[index2].chiSoKhac = [];

                    if (!value === "") {
                      newValues[index2].chiSoKhac = newValues[
                        index2
                      ].chiSoKhac.filter(
                        (t) => t.dmChiSoId !== chiSoKhac.dmChiSoId
                      );
                    } else {
                      if (_index === -1)
                        newValues[index2].chiSoKhac.push(chiSoKhac);
                      else newValues[index2].chiSoKhac[_index] = chiSoKhac;
                    }

                    props.updateData({
                      values: newValues,
                    });

                    props.onValueChange(newValues, { isCanvasFooter: true });
                  },
                  {}
                );
              }
            }
          } else {
            const currentValueOfFooter = listDataFooter[y];
            if (isDeleting && !lastColumn && currentValueOfFooter) {
              newValues[index2][currentValueOfFooter] = "";
            }
            if (
              (isEditing && !lastColumn) ||
              (lastColumn && isNormalState && refInputValue.current)
            ) {
              if (refModalInput.current)
                refModalInput.current.show(
                  newValues[index2][currentValueOfFooter],
                  y,
                  "numeric",
                  onOK
                );
            }
          }
        }

        if (!isArrayEqual(values, newValues)) {
          props.updateData({
            values: newValues,
          });
          props.onValueChange(newValues, {
            isCanvasBody: isBody,
            isCanvasFooter: !isBody && isDeleting,
            isLastColumn: lastColumn,
          });
        }
      }
    }
  };

  const editBody = (index, e, values, lastColumn) => {
    if (props.typeValue === 1) {
      values[index].mach = parseInt(
        pointToValue(e.nativeEvent.layerY, props.typeValue)
      );
      if (refInputValue.current)
        refInputValue.current.show(
          e.nativeEvent.layerX,
          e.nativeEvent.layerY,
          values[index].mach || 0,
          (val) => {
            values[index].mach = val;
            props.updateData({
              values: [...values],
            });
            props.onValueChange(values, {
              isCanvasBody: true,
              isCanvasFooter: false,
              isLastColumn: lastColumn,
            });
          }
        );
    } else {
      values[index].nhiet = Number(
        pointToValue(e.nativeEvent.layerY, props.typeValue).toFixed(1)
      );
      if (refInputValue.current)
        refInputValue.current.show(
          e.nativeEvent.layerX,
          e.nativeEvent.layerY,
          values[index].nhiet || 0,
          (val) => {
            values[index].nhiet = val;
            props.updateData({
              values: [...values],
            });
            props.onValueChange(values, {
              isCanvasBody: true,
              isCanvasFooter: false,
              isLastColumn: lastColumn,
            });
          }
        );
    }
  };

  const onOK = (valueInput, inputType) => {
    const values = props.values;
    const index = props.index === -1 ? values.length - 1 : props.index;

    if (Number.isNaN(index) || !valueInput) {
      return;
    }
    let item = values[index];
    let value = (valueInput || "").substr(0, Math.min(valueInput.length, 7));
    if (item) {
      switch (inputType) {
        case 0:
          item.huyetap = value;
          break;
        case 1:
          item.nhiptho = value;
          break;
        case 2:
          item.cannang = parseFloat(value);
          break;
        case 5:
          item.kyten = value;
          break;
        default:
          break;
      }
      props.updateData({
        values: [...values],
      });
      props.onValueChange(values, { isCanvasFooter: true });
    }
  };
  const onUpdateSurgery = (item) => {
    if (refModalSurgeryInformation.current) {
      refModalSurgeryInformation.current.show(
        item.nbPhauThuat?.bacSy,
        item.nbPhauThuat?.phuongPhapPhauThuat,
        (bacSy, phuongPhapPhauThuat) => {
          props
            .onUpdateSurgery({
              id: item.nbPhauThuat?.id,
              bacSy,
              phuongPhapPhauThuat,
            })
            .then((values) => {
              item.nbPhauThuat = item.nbPhauThuat || {};
              item.nbPhauThuat.bacSy = bacSy;
              item.nbPhauThuat.phuongPhapPhauThuat = phuongPhapPhauThuat;
              props.updateData({ values: [...props.values] });
            });
        }
      );
    }
  };

  return (
    <>
      <ColumnState indexUpdate={props.indexUpdate} />
      <InputValue ref={refInputValue} />
      <ModalChangeDate ref={refChangeDate} />
      <ModalSurgeryInformation ref={refModalSurgeryInformation} />
      <Main width={props.width} height={props.height} onClick={onClickCanvas} />
      <ModalInput ref={refModalInput} />
      <SurgeryDetail
        onValueChange={props.onValueChange}
        onUpdateSurgery={onUpdateSurgery}
      />
    </>
  );
}
CanvasTouchable.defaultProps = {
  onValueChange: () => {},
};

export default connect(
  (state) => {
    return {
      values: state.vitalSigns.values || [],
      moreValueIds: state.vitalSigns.moreValueIds || [],
      isEditing: state.vitalSigns.isEditing,
      typeValue: state.vitalSigns.typeValue,
      isDeleting: state.vitalSigns.isDeleting,
      isDone: state.vitalSigns.isDone,
      index: state.vitalSigns.index,
    };
  },
  ({ vitalSigns: { updateData, onUpdateSurgery } }) => ({
    updateData,
    onUpdateSurgery,
  })
)(CanvasTouchable);
