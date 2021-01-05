import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Modal, Button, Popover } from "antd";
import { SIZE } from "utils/vital-signs/constants";
import { ModalSurgeryInformation } from "../";

function SurgeryDetail(props, refs) {
  const refModalSurgeryInformation = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onClick = (item, isEdit, index) => () => {
    setState({
      ["visible" + index]: false,
    });
    let date = item.date.format("dd/MM/yyyy");
    if (isEdit) {
      props.onUpdateSurgery(item);
    } else {
      Modal.confirm({
        title: "Thông báo",
        content: `Bạn có chắc muốn xóa thông tin phẫu thuật ngày ${date} không ?`,
        okText: "Đồng ý",
        cancelText: "Huỷ",
        cancelButtonProps: { type: "danger", style: { width: 73 } },
        onOk: () => {
          props.onRemoveSurgery(item.id).then((values) => {
            props.onValueChange(values, {
              isCanvasBody: true,
              isCanvasFooter: false,
              isLastColumn: false,
              isSurgery: true,
            });
          });
        },
      });
    }
  };
  const handleVisibleChange = (index) => (visible) => {
    setState({
      ["visible" + index]: visible,
    });
  };
  return (
    <div
      style={{
        position: "absolute",
        marginBottom: 2,
        top: 80,
        height: 40,
        zIndex: 101,
        flexDirection: "row",
        display: "flex",
        width: state.canvasWidth,
        left: SIZE.leftColumnWidth,
      }}
    >
      {((values) => {
        let _item = null;
        let _index = 0;
        let _date = null;
        return values.map((item, i) => {
          if (item.nbPhauThuat) {
            _item = item;
            _index = 1;
            _date = item.date;
            return (
              <Popover
                style={{}}
                key={i}
                visible={state["visible" + i]}
                onVisibleChange={handleVisibleChange(i)}
                title={
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}> Thông tin phẫu thuật</div>
                    <div style={{ alignSelf: "flex-end" }}>
                      <Button
                        icon="edit"
                        type="primary"
                        style={{ marginRight: 5 }}
                        onClick={onClick(item, true, i)}
                      >
                        Sửa
                      </Button>
                      <Button
                        icon="delete"
                        type="danger"
                        onClick={onClick(item, false, i)}
                      >
                        Xoá
                      </Button>
                    </div>
                  </div>
                }
                content={
                  <div style={{ width: 400 }}>
                    <div>
                      Bác sĩ: <b>{item.nbPhauThuat.bacSy}</b>
                    </div>
                    <div style={{ marginTop: 5 }}>Phương pháp phẫu thuật:</div>
                    <div>{item.nbPhauThuat.phuongPhapPhauThuat}</div>
                  </div>
                }
              >
                <Button
                  type="danger"
                  style={{
                    position: "absolute",
                    top: 5,
                    left: i * SIZE.columnWidth + 10,
                    width: SIZE.columnWidth - 20,
                    height: 20,
                  }}
                  key={i}
                >
                  1
                </Button>
              </Popover>
            );
          } else {
            if (
              _item &&
              (!_date || _date.ddmmyyyy() !== item.date.ddmmyyyy())
            ) {
              _date = item.date;
              _index++;
              return (
                <Popover
                  style={{}}
                  key={i}
                  visible={state["visible" + i]}
                  onVisibleChange={handleVisibleChange(i)}
                  title={
                    <div style={{ display: "flex" }}>
                      <div style={{ flex: 1 }}> Thông tin phẫu thuật</div>
                    </div>
                  }
                  content={
                    <div style={{ width: 400 }}>
                      <div>
                        Bác sĩ: <b>{_item.nbPhauThuat?.bacSy}</b>
                      </div>
                      <div style={{ marginTop: 5 }}>
                        Phương pháp phẫu thuật:
                      </div>
                      <div>{_item.nbPhauThuat?.phuongPhapPhauThuat}</div>
                    </div>
                  }
                >
                  <Button
                    type="danger"
                    style={{
                      position: "absolute",
                      top: 5,
                      left: i * SIZE.columnWidth + 10,
                      width: SIZE.columnWidth - 20,
                      height: 20,
                    }}
                    key={i}
                  >
                    {_index}
                  </Button>
                </Popover>
              );
            }
          }
          return null;
        });
      })(props.values)}
      <ModalSurgeryInformation ref={refModalSurgeryInformation} />
    </div>
  );
}
SurgeryDetail.defaultProps = {
  onValueChange: () => {},
  onUpdateSurgery: () => {},
};

export default connect(
  (state) => {
    return {
      values: state.vitalSigns.values || [],
      isEditing: state.vitalSigns.isEditing,
      isDeleting: state.vitalSigns.isDeleting,
      isDone: state.vitalSigns.isDone,
      index: state.vitalSigns.index,
    };
  },
  ({
    vitalSigns: {
      updateData,
      onUpdate,
      onCancel,
      onCreate,
      getAllDoctor,
      onCreateSurgery,
      onRemoveSurgery,
    },
  }) => ({
    updateData,
    onUpdate,
    onCancel,
    onCreate,
    getAllDoctor,
    onCreateSurgery,
    onRemoveSurgery,
  })
)(SurgeryDetail);
