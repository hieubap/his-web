import React, { useEffect, useRef } from "react";
import { SIZE, BLOOD_PRESSURE } from "utils/vital-signs/constants";
import { cloneDeep, isEmpty } from "lodash";
import {
  drawLine,
  drawDate,
  handleBloodPressure,
  drawValueFooter,
  drawValueBody,
  drawBodyBloodPressure,
  drawLeftColumnFooter,
  drawLeftColumnBloodPressure,
  drawLeftColumnBackground,
} from "utils/vital-signs/canvas-utils";
import { Main } from "./styled";

export default function Page({
  moreValueIds = [],
  values = [],
  vitalSignsCategories,
  data = {},
}) {
  const { leftColumnWidth, columnWidth, headerHeight, rowHeight } = SIZE;
  const refCanvas = useRef(null);
  const showSurgery = process.env.REACT_APP_SHOW_SURGERY === "true";
  const bottomHeight = SIZE.bottomHeight + moreValueIds.length * 50;
  const canvasHeight = rowHeight * 75 + headerHeight + bottomHeight;
  let canvasWidth = Math.max(
    leftColumnWidth + values.length * columnWidth,
    850
  );
  const sizeLeftItem = leftColumnWidth / 3;

  let rangeBloodPressure = [];
  if (!isEmpty(values)) {
    const cloneValues = cloneDeep(values);
    const indexOfLastItemHasValue =
      cloneValues.length -
      1 -
      cloneValues
        .reverse()
        .findIndex((item) => !!item.huyetap && item.huyetap.length > 1);
    const newValue = handleBloodPressure(
      values[indexOfLastItemHasValue] && values[indexOfLastItemHasValue].huyetap
    );

    rangeBloodPressure =
      BLOOD_PRESSURE.find(
        (item) => item.min <= newValue.systolic && newValue.systolic <= item.max
      ) &&
      BLOOD_PRESSURE.find(
        (item) => item.min <= newValue.systolic && newValue.systolic <= item.max
      ).listShow;
  }
  if (!showSurgery) {
    values.map((item) => (item.nbPhauThuat = null));
  }

  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.width = canvasWidth;
      refCanvas.current.height = canvasHeight;
      draw();
    }
  }, [refCanvas.current]);

  const drawLineRow = (ctx) => {
    for (
      let i = 0;
      i < canvasHeight - bottomHeight - headerHeight;
      i = i + rowHeight
    ) {
      if (i % (rowHeight * 10) === 0) {
        drawLine(
          ctx,
          { x: leftColumnWidth, y: i + headerHeight },
          { x: canvasWidth, y: i + headerHeight },
          1.5
        );
      } else {
        drawLine(
          ctx,
          { x: leftColumnWidth, y: i + headerHeight },
          { x: canvasWidth, y: i + headerHeight },
          0.5,
          [10, 2]
        );
      }
    }
  };
  const drawLineColumn = (ctx) => {
    for (let i = 0; i < values.length + 1; i++) {
      drawLine(
        ctx,
        { x: i * columnWidth + leftColumnWidth, y: 0 },
        {
          x: i * columnWidth + leftColumnWidth,
          y: canvasHeight,
        },
        0.5
      );
    }
  };
  const drawText = (ctx, text, from) => {
    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText(text, from.x, from.y);
  };

  const drawHeader = (ctx) => {
    drawText(ctx, "Ngày/tháng", { x: 40, y: 20 });
    drawText(ctx, "Huyết", { x: 10, y: 50 });
    drawText(ctx, "áp", { x: 10, y: 70 });
    drawText(ctx, "Mạch", { x: sizeLeftItem + 5, y: 50 });
    drawText(ctx, "L/ph", { x: sizeLeftItem + 5, y: 70 });
    drawText(ctx, "Nhiệt", { x: sizeLeftItem * 2 + 5, y: 50 });
    drawText(ctx, "độ C", { x: sizeLeftItem * 2 + 5, y: 70 });
    drawDate(ctx, values);
  };

  const drawValues = (ctx, values) => {
    if (isEmpty(values)) return;

    values.forEach((item, index) => {
      try {
        drawBodyBloodPressure(
          ctx,
          item,
          index,
          canvasHeight,
          bottomHeight,
          headerHeight,
          rangeBloodPressure
        );

        drawValueBody(ctx, item, values, index);

        drawValueFooter(
          canvasHeight - bottomHeight,
          ctx,
          index,
          item,
          values,
          moreValueIds
        );
      } catch (error) {}
    });
  };
  const drawBackground = (ctx) => {
    if (!ctx) {
      return;
    }
    drawLineRow(ctx);
    drawLineColumn(ctx);
    drawLeftColumnBackground(
      ctx,
      canvasWidth,
      canvasHeight,
      sizeLeftItem,
      bottomHeight
    );
    drawHeader(ctx);
    drawLeftColumnFooter(
      ctx,
      moreValueIds,
      vitalSignsCategories,
      canvasWidth,
      canvasHeight,
      bottomHeight
    );
    drawLeftColumnBloodPressure(ctx, rangeBloodPressure);
  };
  const draw = () => {
    if (refCanvas.current) {
      const ctx = refCanvas.current.getContext("2d");
      drawBackground(ctx);
      drawValues(ctx, values);
    }
  };

  if (!data) return null;
  return (
    <Main style={{ width: 870, margin: 10, pageBreakAfter: "always" }}>
      <table style={{ marginBottom: 20 }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}>
              <div>{(data.leftTitle1 || "").toUpperCase()}</div>
              <div style={{ fontWeight: "bold", marginTop: 5 }}>
                {(data.leftTitle2 || "").toUpperCase()}
              </div>
            </td>
            <td>
              <div className="text-header">
                {data.centerTitle || "PHIẾU THEO DÕI CHỨC NĂNG SỐNG"}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ width: 240 }}>
              <span>{data.department}</span>
            </td>
            <td>
              Họ tên bệnh nhân:{" "}
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: 200,
                  display: "inline-block",
                  marginRight: 50,
                }}
              >
                {data.patientName}
              </span>
              Tuổi:{" "}
              <span style={{ fontWeight: "bold", marginRight: 50 }}>
                {data.birthday?.toDateObject().getAge()}
              </span>{" "}
              Giới:{" "}
              <span style={{ fontWeight: "bold", marginRight: 50 }}>
                {data.gender === 1 ? "Nam" : "Nữ"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingTop: 3 }}>
              {data.room && (
                <div>
                  <span>{data.room}</span>
                </div>
              )}
              <div>
                Giường:
                <span> {data.bed}</span>
              </div>
              {data.medicalRecordNo || data.patientDocument ? (
                <div style={{ marginTop: 5 }}>
                  Số vào viện:
                  <span> {data.medicalRecordNo || data.patientDocument}</span>
                </div>
              ) : null}
            </td>
            <td style={{ verticalAlign: "top" }}>
              {data.diagnostic ? (
                <div style={{ marginTop: 3 }}>Chẩn đoán: {data.diagnostic}</div>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ flexDirection: "row", marginTop: 10, paddingBottom: 5 }}>
        <div style={{ flexDirection: "row" }}>
          <img
            src={require("../images/bg_red.png")}
            style={{
              width: 10,
              height: 10,
              background: "#E74C3C",
              float: "left",
              marginTop: 5,
            }}
            alt=""
          />
          <span style={{ marginLeft: 5, float: "left" }}>Nhịp mạch</span>

          <img
            src={require("../images/bg_blue.png")}
            style={{
              width: 10,
              height: 10,
              background: "#5498DB",
              float: "left",
              marginTop: 5,
              marginLeft: 30,
            }}
            alt=""
          />
          <span style={{ marginLeft: 5, float: "left" }}>Nhiệt độ</span>
          <img
            src={require("../images/huyet_ap.png")}
            style={{
              width: 10,
              height: 10,
              float: "left",
              marginTop: 5,
              marginLeft: 30,
            }}
            alt=""
          />
          <span style={{ marginLeft: 5, float: "left" }}>Huyết áp</span>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <canvas
          ref={refCanvas}
          id="canvas"
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
      {showSurgery && (
        <ul className="list-surgery">
          {values.map((item, index) => {
            if (item.nbPhauThuat) {
              return (
                <li key={index}>
                  {item.date.format("dd/MM/yyyy HH:mm")} - Bác sĩ:{" "}
                  {item.nbPhauThuat.bacSy} -{" "}
                  {item.nbPhauThuat.phuongPhapPhauThuat}
                </li>
              );
            }
            return null;
          })}
        </ul>
      )}
    </Main>
  );
}
