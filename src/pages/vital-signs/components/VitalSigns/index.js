import React, { useState, useEffect, useRef } from "react";
import { cloneDeep, isEmpty } from "lodash";
import { connect } from "react-redux";
import { Modal } from "antd";
import {
  SelectVitalSignCategory,
  ScrollView,
  ToolBar,
  ModalInput,
  BloodPressureCanvas,
  BackgroundCanvas,
  LeftColumnCanvas,
  ModalSurgeryInformation,
  CanvasTouchable,
} from "../";
import { SIZE, RADIUS_POINTER } from "utils/vital-signs/constants";
import {
  calculatorPosition,
  drawValueFooter,
  drawValueBody,
} from "utils/vital-signs/canvas-utils";
import { usePrevious } from "hook";
import { Main } from "./styled";
const initState = {
  canvasHeight: SIZE.rowHeight * 75 + SIZE.headerHeight + SIZE.bottomHeight,
  canvasWidth: SIZE.leftColumnWidth,
  indexUpdate: "",
  currentValue: {},
};

function VitalSigns(props, refs) {
  const canvasHeight1 =
    SIZE.rowHeight * 75 +
    SIZE.headerHeight +
    SIZE.bottomHeight +
    props.moreValueIds.length * 50;
  const [state, _setState] = useState({
    ...initState,
    canvasHeight: canvasHeight1,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const values = props.values;
  const refModalInput = useRef(null);
  const refModalSurgeryInformation = useRef(null);
  const refCanvas = useRef(null);
  const refCanvasFooter = useRef(null);
  const refDraw = useRef(null);
  const prevValues = usePrevious(values, []);
  useEffect(() => {
    const values = props.values || [];
    let canvasWidth = SIZE.leftColumnWidth + values.length * SIZE.columnWidth;
    setState({
      canvasWidth: Math.max(canvasWidth, 1200),
    });
    props.updateData({
      isEditing: false,
      isDeleting: false,
      index: props.values.length - 1,
      allowEdit: false,
      isDone: false,
    });
    props.getAllDoctor();
  }, []);

  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.width = state.canvasWidth;
      refCanvas.current.height =
        state.canvasHeight -
        (SIZE.bottomHeight + props.moreValueIds.length * 50);
    }
  }, [refCanvas.current]);
  useEffect(() => {
    if (refCanvasFooter.current) {
      refCanvasFooter.current.width = state.canvasWidth;
      refCanvasFooter.current.height =
        SIZE.bottomHeight + props.moreValueIds.length * 50;
    }
  }, [refCanvasFooter.current]);

  useEffect(() => {
    if (
      props.values &&
      props.values.length &&
      refCanvasFooter.current &&
      refCanvas.current &&
      !refDraw.current
    ) {
      refDraw.current = true;
      draw(values, true);
    }
  }, [
    props.values,
    props.moreValueIds,
    refCanvasFooter.current,
    refCanvas.current,
  ]);

  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.width = state.canvasWidth;
      refCanvas.current.height =
        state.canvasHeight -
        (SIZE.bottomHeight + props.moreValueIds.length * 50);
    }
    if (refCanvasFooter.current) {
      refCanvasFooter.current.width = state.canvasWidth;
      refCanvasFooter.current.height =
        SIZE.bottomHeight + props.moreValueIds.length * 50;
    }
    draw(values, true);
  }, [state.canvasWidth, state.canvasHeight]);

  useEffect(() => {
    if (prevValues.length !== props.values.length) {
      let canvasWidth =
        SIZE.leftColumnWidth + props.values.length * SIZE.columnWidth + 250;
      setState({
        canvasWidth: Math.max(canvasWidth, 1200),
      });
    }
  }, [props.values]);

  useEffect(() => {
    setState({
      canvasHeight:
        SIZE.rowHeight * 75 +
        SIZE.headerHeight +
        SIZE.bottomHeight +
        props.moreValueIds.length * 50,
    });
  }, [props.moreValueIds]);

  const onEdit = (type) => () => {
    const index = props.index;
    const values = props.values;
    props.updateData({
      [type]: true,
      preValues: cloneDeep(values),
    });
    setState({
      indexUpdate: index,
    });
  };

  const redraw = ({
    values,
    isCanvasBody,
    isCanvasFooter,
    isLastColumn,
    isSurgery,
  }) => {
    const { indexUpdate } = state;
    let ctxBody, ctxFooter;
    let newValue = cloneDeep(values);

    const lengthValues = newValue.length;
    if (isCanvasBody) {
      const listNeedReDraw = isLastColumn
        ? [lengthValues - 2, lengthValues - 1]
        : [indexUpdate - 1, indexUpdate, indexUpdate + 1];
      newValue = newValue.map((item, i) => {
        if (!listNeedReDraw.includes(i)) {
          item.isNotDraw = true;
        }
        return item;
      });
      ctxBody = refCanvas.current.getContext("2d");
      if (isSurgery) {
        ctxBody.clearRect(
          SIZE.columnWidth * props.index + SIZE.leftColumnWidth,
          0,
          (SIZE.columnWidth + 1) * props.index + SIZE.leftColumnWidth,
          refCanvas.current.height
        );
      } else {
        if (lengthValues === 1) {
          ctxBody.clearRect(
            0,
            0,
            refCanvas.current.width,
            refCanvas.current.height
          );
        } else {
          ctxBody.clearRect(
            isLastColumn
              ? calculatorPosition(
                  lengthValues - 2,
                  SIZE.columnWidth,
                  SIZE.leftColumnWidth + SIZE.columnWidth / 2
                )
              : calculatorPosition(
                  indexUpdate - 1,
                  SIZE.columnWidth,
                  SIZE.leftColumnWidth +
                    SIZE.columnWidth / 2 -
                    (indexUpdate === 0 ? RADIUS_POINTER : 0) // first item + radius of point
                ),
            0,
            isLastColumn || indexUpdate === 0
              ? SIZE.columnWidth + RADIUS_POINTER
              : SIZE.columnWidth * 2 + RADIUS_POINTER,
            refCanvas.current.height
          );
        }
      }
    }
    if (isCanvasFooter) {
      ctxFooter = refCanvasFooter.current.getContext("2d");
      ctxFooter.clearRect(
        0,
        0,
        refCanvasFooter.current.width,
        refCanvasFooter.current.height
      );
    }
    drawValues({
      ctxBody,
      ctxFooter,
      values: newValue || props.values,
    });
  };

  const drawValues = ({ ctxBody, ctxFooter, values }) => {
    values.forEach((item, index) => {
      try {
        if (ctxBody) {
          drawValueBody(ctxBody, item, values, index);
        }
        // start footer
        if (ctxFooter) {
          drawValueFooter(
            0,
            ctxFooter,
            index,
            item,
            values,
            props.moreValueIds
          );
        }
      } catch (error) {}
    });
  };

  const draw = (values, redraw) => {
    if (refCanvas.current && !isEmpty(values)) {
      drawValues(
        {
          ctxBody: refCanvas.current.getContext("2d"),
          ctxFooter: refCanvasFooter.current.getContext("2d"),
          values,
        },
        redraw
      );
    }
  };

  const update = () => {
    props.onUpdate().then((s) => {
      redraw({
        values: props.values,
        isCanvasBody: true,
        isCanvasFooter: true,
        isLastColumn: false,
      });
    });
  };

  const onUpdate = () => {
    try {
      const { indexUpdate } = state;
      const values = props.values;
      const isDeleting = props.isDeleting;
      const day = new Date(values[indexUpdate].date);
      let date =
        day.getDate() +
        "/" +
        (day.getMonth() + 1) +
        " - " +
        day.getHours() +
        ":" +
        day.getMinutes();

      Modal.confirm({
        title: "Thông báo",
        content: `Bạn có chắc muốn ${
          isDeleting ? "xóa" : "sửa"
        } thông tin tại ngày ${date} không ?`,
        okText: "Đồng ý",
        cancelText: "Huỷ",
        cancelButtonProps: { type: "danger", style: { width: 73 } },
        onOk: () => {
          update();
        },
      });
    } catch (error) {}
  };

  const onCancelUpdate = () => {
    setState({ indexUpdate: "" });
    props.onCancel();
    redraw({
      values: props.preValues,
      isCanvasBody: true,
      isCanvasFooter: true,
    });
  };

  const onValueChange = (values, options) => {
    redraw({ values, ...options });
  };
  const onAddSurgery = () => {
    if (refModalSurgeryInformation.current)
      refModalSurgeryInformation.current.show(
        "",
        "",
        (bacSy, phuongPhapPhauThuat) => {
          console.log(bacSy, phuongPhapPhauThuat);
          props
            .onCreateSurgery({
              vitalSignsId: props.values[props.index]?.id,
              bacSy,
              phuongPhapPhauThuat,
            })
            .then((values) => {
              if (values) redraw({ values, isCanvasBody: true });
            });
        }
      );
  };

  const { canvasWidth, canvasHeight } = state;
  const isDeleting = props.isDeleting;
  if (!props.patient) return null;
  return (
    <Main height={canvasHeight}>
      <ToolBar
        onValueChange={onValueChange}
        onAddSurgery={onAddSurgery}
        isDeleting={isDeleting}
        onEdit={onEdit}
        onCancelUpdate={onCancelUpdate}
        onUpdate={onUpdate}
      />
      <div className="vital-signs-body">
        <ScrollView className="scrollview-body">
          {/* canvas header, collumn */}
          <BackgroundCanvas
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
          <BloodPressureCanvas
            canvasWidth={canvasWidth}
            canvasHeight={
              canvasHeight -
              SIZE.bottomHeight -
              SIZE.headerHeight -
              props.moreValueIds.length * 50
            }
            ref={refCanvas.currentBackground}
          />
          <canvas ref={refCanvas} />
          <canvas ref={refCanvasFooter} />
          <ModalSurgeryInformation ref={refModalSurgeryInformation} />
          <CanvasTouchable
            width={canvasWidth}
            height={canvasHeight}
            onValueChange={onValueChange}
            indexUpdate={state.indexUpdate}
          />
        </ScrollView>
        <LeftColumnCanvas
          canvasWidth={SIZE.leftColumnWidth}
          canvasHeight={canvasHeight}
        />
        <SelectVitalSignCategory
          top={canvasHeight - 100}
          width={SIZE.leftColumnWidth}
          height={50}
        />
      </div>
      <ModalInput ref={refModalInput} />
    </Main>
  );
}

export default connect(
  (state) => {
    return {
      patient: state.vitalSigns.patient,
      values: state.vitalSigns.values || [],
      moreValueIds: state.vitalSigns.moreValueIds || [],
      isEditing: state.vitalSigns.isEditing,
      typeValue: state.vitalSigns.typeValue,
      isDeleting: state.vitalSigns.isDeleting,
      isDone: state.vitalSigns.isDone,
      index: state.vitalSigns.index,
      preValues: state.vitalSigns.preValues,
    };
  },
  ({
    vitalSigns: {
      updateData,
      onUpdate,
      onCancel,
      getAllDoctor,
      onCreateSurgery,
    },
  }) => ({
    updateData,
    onUpdate,
    onCancel,
    getAllDoctor,
    onCreateSurgery,
  })
)(VitalSigns);
