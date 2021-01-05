import React, { memo } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Radio, Button } from "antd";

const ToolBar = memo(function ToolBar(props) {
  const isDisabled = () => {
    return props.isDeleting || props.isEditing || props.isDone ? true : false;
  };
  const onPrint = () => {
    window.open("/vital-signs/" + props.patientDocument);
  };
  const onCreate = () => {
    props.onCreate().then((values) => {
      if (values) {
        props.onValueChange(values, { isCanvasFooter: true });
      }
    });
  };
  return (
    <Main>
      <div className="toolbar">
        <div className="toolbar-inner">
          <div className="toolbar-right">
            <Button
              icon={"form"}
              type={"primary"}
              onClick={props.onAddSurgery}
              disabled={!props.currentVitalSign.id}
            >
              + Thêm phẫu thuật
            </Button>
            <Button
              icon={"printer"}
              type={"primary"}
              onClick={onPrint}
              disabled={props.isDeleting || props.isEditing}
            >
              In
            </Button>

            {!props.isEditing && !props.isDeleting ? (
              <>
                <Button
                  style={{ minWidth: 50 }}
                  icon={"edit"}
                  type={"primary"}
                  onClick={props.onEdit("isEditing")}
                  disabled={!props.allowEdit}
                >
                  Sửa
                </Button>
                <Button
                  style={{ minWidth: 50 }}
                  icon={"delete"}
                  type={"danger"}
                  onClick={props.onEdit("isDeleting")}
                  disabled={!props.allowEdit}
                >
                  Xoá
                </Button>
              </>
            ) : (
              <Button
                style={{ minWidth: 50 }}
                icon={"delete"}
                type={"danger"}
                onClick={props.onCancelUpdate}
                disabled={!props.allowEdit}
              >
                Huỷ
              </Button>
            )}
            {props.isEditing || props.isDeleting ? (
              <>
                {props.isEditing ? (
                  <Button
                    style={{ minWidth: 50 }}
                    icon={"save"}
                    type={"primary"}
                    onClick={props.onUpdate}
                  >
                    Lưu
                  </Button>
                ) : (
                  <Button
                    style={{ minWidth: 50 }}
                    icon={"delete"}
                    type={"primary"}
                    onClick={props.onUpdate}
                  >
                    Xoá
                  </Button>
                )}
              </>
            ) : (
              <Button
                style={{ minWidth: 50 }}
                icon={"save"}
                type={"primary"}
                onClick={onCreate}
                disabled={isDisabled()}
              >
                Lưu
              </Button>
            )}
          </div>
          <Radio.Group
            className="radio-nhip-mach"
            value={props.typeValue}
            onChange={(val) => {
              props.updateData({
                typeValue: val.target.value,
              });
            }}
          >
            <div className="radio">
              <Radio value={1} />
              <div
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#E74C3C",
                  marginHorizontal: 5,
                }}
              />
              <span className="radio-content">Nhịp mạch</span>
            </div>
            <div className="radio">
              <Radio value={2} />
              <div
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#3498DB",
                  marginHorizontal: 5,
                }}
              />
              <span className="radio-content">Nhiệt độ</span>
            </div>
            <div className="radio">
              <img
                src={require("../../images/huyet_ap.png")}
                width={10}
                style={{
                  marginHorizontal: 5,
                }}
                alt=""
              />
              <span className="radio-content">Huyết áp</span>
            </div>
          </Radio.Group>
        </div>
      </div>
    </Main>
  );
});

ToolBar.defaultProps = {
  onValueChange: () => {},
};
export default connect(
  (state) => {
    return {
      patientDocument: state.vitalSigns.patientDocument,
      isEditing: state.vitalSigns.isEditing,
      allowEdit: state.vitalSigns.allowEdit,
      isDone: state.vitalSigns.isDone,
      typeValue: state.vitalSigns.typeValue,
      index: state.vitalSigns.index,
      currentVitalSign:
        (state.vitalSigns.values || [])[state.vitalSigns.index || 0] || {},
    };
  },
  ({ vitalSigns: { updateData, onCreate } }) => ({
    updateData,
    onCreate,
  })
)(ToolBar);
