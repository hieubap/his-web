import {
  SIZE,
  RADIUS_POINTER,
  NHIETS,
  MACHS,
} from "utils/vital-signs/constants";
import { isEmpty } from "lodash";

export const drawLine = (ctx, from, to, width, lighdash, color) => {
  ctx.lineWidth = width;
  if (lighdash) {
    ctx.setLineDash(lighdash);
  } else ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.fillStyle = "black";
  if (color) {
    ctx.strokeStyle = color;
  }
  ctx.stroke();
};

export const drawPoint = (ctx, index, point, type) => {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.fillStyle = type === 1 ? "#E74C3C" : "#3498DB";
  ctx.arc(
    SIZE.leftColumnWidth + SIZE.columnWidth / 2 + index * SIZE.columnWidth,
    point,
    RADIUS_POINTER,
    0,
    2 * Math.PI
  );
  ctx.fill();
};

export const drawSurgery = (ctx, index) => {
  ctx.beginPath();
  const bottom = 248;
  const lineWidth = 3;
  const top = 110;
  const top1 = 130;
  drawLine(
    ctx,
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 -
        7,
      y: bottom,
    },
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 +
        7,
      y: bottom,
    },
    lineWidth,
    [],
    "red"
  );
  drawLine(
    ctx,
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 -
        7,
      y: bottom,
    },
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 -
        7,
      y: top1,
    },
    lineWidth,
    [],
    "red"
  );
  drawLine(
    ctx,
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 +
        7,
      y: bottom,
    },
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 +
        7,
      y: top1,
    },
    lineWidth,
    [],
    "red"
  );
  drawLine(
    ctx,
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 -
        7,
      y: top1,
    },
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 -
        16,
      y: top1,
    },
    lineWidth,
    [],
    "red"
  );
  drawLine(
    ctx,
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 +
        7,
      y: top1,
    },
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 +
        16,
      y: top1,
    },
    lineWidth,
    [],
    "red"
  );
  drawLine(
    ctx,
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 -
        16,
      y: top1,
    },
    {
      x: index * SIZE.columnWidth + SIZE.leftColumnWidth + SIZE.columnWidth / 2,
      y: top,
    },
    lineWidth,
    [],
    "red"
  );
  drawLine(
    ctx,
    {
      x:
        index * SIZE.columnWidth +
        SIZE.leftColumnWidth +
        SIZE.columnWidth / 2 +
        16,
      y: top1,
    },
    {
      x: index * SIZE.columnWidth + SIZE.leftColumnWidth + SIZE.columnWidth / 2,
      y: top,
    },
    lineWidth,
    [],
    "red"
  );
};

export const drawText = (ctx, text, from, color) => {
  ctx.font = "16px Times New Roman";
  ctx.fillStyle = color || "black";
  ctx.fillText(text, from.x, from.y);
};

export const drawDate = (ctx, values) => {
  let number = 0;
  let itemNbPhauThuat = null;
  let date = null;
  values.forEach((item, index) => {
    try {
      drawText(ctx, item.date.format("dd/MM"), {
        x: SIZE.leftColumnWidth + index * SIZE.columnWidth + 20,
        y: 20,
      });
      drawText(ctx, item.date.format("HH:mm"), {
        x: SIZE.leftColumnWidth + index * SIZE.columnWidth + 20,
        y: 60,
      });
      if (item.nbPhauThuat) {
        drawText(
          ctx,
          "(1)",
          {
            x: SIZE.leftColumnWidth + index * SIZE.columnWidth + 30,
            y: 100,
          },
          "red"
        );
        number = 1;
        itemNbPhauThuat = item;
        date = item.date.ddmmyyyy();
      } else {
        if (itemNbPhauThuat) {
          if (item.date.ddmmyyyy() !== date && item.id) {
            date = item.date.ddmmyyyy();
            number++;
            drawText(
              ctx,
              `(${number})`,
              {
                x: SIZE.leftColumnWidth + index * SIZE.columnWidth + 30,
                y: 100,
              },
              "red"
            );
          }
        }
      }
    } catch (error) {}
  });
};

export const pointToValue = (point, type) => {
  const sumCanvasHeight =
    SIZE.rowHeight * 75 + SIZE.headerHeight + SIZE.bottomHeight;
  if (type === 1) {
    let value =
      ((sumCanvasHeight - SIZE.bottomHeight - point) / SIZE.rowHeight) * 2 + 30;
    return value;
  } else {
    let value =
      (sumCanvasHeight - SIZE.bottomHeight - point) / SIZE.rowHeight / 10 +
      34.5;
    return value;
  }
};

export const valueToPoint = (value, type, positionStart) => {
  const heightBody = SIZE.rowHeight * 75;
  // 518
  const canvasHeight = heightBody + SIZE.headerHeight + SIZE.bottomHeight;
  let point = null;
  switch (type) {
    case 1:
      point =
        canvasHeight - SIZE.bottomHeight + ((30 - value) * SIZE.rowHeight) / 2;
      break;
    case 2:
      point =
        canvasHeight - SIZE.bottomHeight + (34.5 - value) * SIZE.rowHeight * 10;
      break;
    case 3:
      point = heightBody - (heightBody / 150) * positionStart;
      break;
    default:
      break;
  }
  return point;
};

export const calculatorPosition = (count, value, res) => {
  if (count < 0) {
    return res;
  }
  return count * value + res;
};

export function drawSquare(ctx, index, yFirst, height, color = "244,208,63") {
  const { columnWidth } = SIZE;
  //random rgba colour
  ctx.fillStyle = `rgba(${color},0.5)`;
  ctx.fillRect(
    SIZE.leftColumnWidth + index * SIZE.columnWidth,
    yFirst,
    columnWidth,
    height
  );
}

export function handleBloodPressure(values) {
  const bloodPressure = {
    systolic: 0,
    diastolic: 0,
  };
  if (!values) {
    return bloodPressure;
  }
  const splitValues = values.split("/");
  bloodPressure.systolic = splitValues[0];
  bloodPressure.diastolic = splitValues[1];
  return bloodPressure;
}
export function drawValueFooter(
  marginTop,
  ctxFooter,
  index,
  item,
  values,
  moreValueIds
) {
  if (item.huyetap)
    drawText(ctxFooter, item.huyetap, {
      x: index * SIZE.columnWidth + SIZE.leftColumnWidth + 10,
      y: marginTop + 30,
    });
  if (item.nhiptho) {
    // const valueShow = item.resuscitationMask ? ;
    drawText(ctxFooter, item.nhiptho, {
      x: index * SIZE.columnWidth + SIZE.leftColumnWidth + 10,
      y: marginTop + 80,
    });
  }
  if (item.cannang)
    drawText(ctxFooter, item.cannang, {
      x: index * SIZE.columnWidth + SIZE.leftColumnWidth + 10,
      y: marginTop + 130,
    });
  let top = marginTop + 130;
  for (let i = 0; i < moreValueIds.length; i++) {
    top += 50;
    let temp = (values[index].chiSoKhac || []).find((t) => {
      return t.dmChiSoId === moreValueIds[i];
    });
    if (temp)
      drawText(ctxFooter, temp.giaTri, {
        x: index * SIZE.columnWidth + SIZE.leftColumnWidth + 10,
        y: top,
      });
  }

  if (item.kyten)
    drawText(ctxFooter, item.kyten, {
      x: index * SIZE.columnWidth + SIZE.leftColumnWidth + 2,
      y: top + 100,
    });
}

export function drawValueBody(ctx, item, values, index) {
  const { leftColumnWidth, columnWidth } = SIZE;

  let preItem = null;
  if (index !== 0) {
    preItem = values[index - 1];
    if (preItem.mach && item.mach) {
      drawLine(
        ctx,
        {
          x: (index - 1) * columnWidth + leftColumnWidth + columnWidth / 2,
          y: valueToPoint(preItem.mach, 1),
        },
        {
          x: index * columnWidth + leftColumnWidth + columnWidth / 2,
          y: valueToPoint(item.mach, 1),
        },
        2,
        [],
        "#E74C3C"
      );
    }
    if (preItem.nhiet && item.nhiet) {
      drawLine(
        ctx,
        {
          x: (index - 1) * columnWidth + leftColumnWidth + columnWidth / 2,
          y: valueToPoint(preItem.nhiet, 2),
        },
        {
          x: index * columnWidth + leftColumnWidth + columnWidth / 2,
          y: valueToPoint(item.nhiet, 2),
        },
        2,
        [],
        "#3498DB"
      );
    }
  }

  if (item.mach) drawPoint(ctx, index, valueToPoint(item.mach, 1), 1);
  if (item.nhiet) drawPoint(ctx, index, valueToPoint(item.nhiet, 2), 2);
  if (item.nbPhauThuat) drawSurgery(ctx, index);
}

export function drawBodyBloodPressure(
  ctx,
  item,
  index,
  canvasHeight,
  bottomHeight,
  headerHeight,
  rangeBloodPressure
) {
  if (item.huyetap && rangeBloodPressure) {
    const handleValue = handleBloodPressure(item.huyetap);
    const smallestValue =
      rangeBloodPressure[rangeBloodPressure.length - 1] - 10;
    if (handleValue.systolic > smallestValue) {
      const pointY =
        handleValue.systolic > rangeBloodPressure[0]
          ? 0
          : valueToPoint(
              handleValue.systolic,
              3,
              handleValue.systolic - smallestValue
            );
      const pointLastY =
        handleValue.diastolic < smallestValue // if diastolic smaller than smallestValue => bodyHeight
          ? canvasHeight - bottomHeight - headerHeight
          : valueToPoint(
              handleValue.diastolic,
              3,
              handleValue.diastolic - smallestValue
            );
      const color = handleValue.systolic > 180 ? "255,140,0" : "244,208,63";
      drawSquare(ctx, index, pointY + headerHeight, pointLastY - pointY, color);
    }
  }
}

export function drawLeftColumnBackground(
  ctx,
  canvasWidth,
  canvasHeight,
  sizeLeftItem,
  bottomHeight
) {
  //line header 1
  drawLine(ctx, { x: 5, y: 0 }, { x: canvasWidth, y: 0 }, 1, []);
  //line header 2
  drawLine(ctx, { x: 5, y: 30 }, { x: canvasWidth, y: 30 }, 0.5, []);
  //line header 3
  drawLine(ctx, { x: 5, y: 80 }, { x: canvasWidth, y: 80 }, 0.5, []);

  //mid line col
  drawLine(ctx, { x: 5, y: 0 }, { x: 5, y: canvasHeight }, 0.5);
  //text col mach
  //mid line col
  drawLine(
    ctx,
    { x: sizeLeftItem, y: 30 },
    { x: sizeLeftItem, y: canvasHeight - bottomHeight },
    0.5
  );
  //text col nhiet
  NHIETS.forEach((item, index) => {
    drawText(ctx, item, {
      x: sizeLeftItem + 10,
      y: 5 + index * SIZE.rowHeight * 10 + SIZE.headerHeight,
    });
  });
  //mid line col
  drawLine(
    ctx,
    { x: sizeLeftItem * 2, y: 30 },
    { x: sizeLeftItem * 2, y: canvasHeight - bottomHeight },
    0.5
  );
  MACHS.forEach((item, index) => {
    drawText(ctx, item, {
      x: sizeLeftItem * 2 + 10,
      y: 5 + index * SIZE.rowHeight * 10 + SIZE.headerHeight,
    });
  });
  //line col end
  drawLine(
    ctx,
    { x: canvasWidth, y: 0 },
    { x: canvasWidth, y: canvasHeight },
    0.5
  );
}

export function drawLeftColumnBloodPressure(ctx, rangeBloodPressure) {
  if (!ctx) {
    return;
  }
  if (!isEmpty(rangeBloodPressure)) {
    rangeBloodPressure.forEach((item, index) => {
      drawText(ctx, item, {
        x: 10,
        y: 5 + index * SIZE.rowHeight * 10 + SIZE.headerHeight,
      });
    });
  }
}

export function drawLeftColumnFooter(
  ctx,
  moreValueIds,
  vitalSignsCategories,
  canvasWidth,
  canvasHeight,
  bottomHeight
) {
  //line bottom
  let top = canvasHeight - bottomHeight;
  let x = bottomHeight / 50;
  for (let i = 0; i <= x; i++) {
    drawLine(
      ctx,
      { x: 5, y: top + i * 50 },
      {
        x: canvasWidth,
        y: top + i * 50,
      },
      0.5,
      []
    );
  }

  drawText(ctx, "1. Huyết áp", {
    x: 10,
    y: top + 20,
  });
  drawText(ctx, "(mmHg)", {
    x: 10,
    y: top + 40,
  });
  drawText(ctx, "2. Nhịp thở", {
    x: 10,
    y: top + 20 + 50,
  });
  drawText(ctx, "(lần/phút)", {
    x: 10,
    y: top + 40 + 50,
  });
  drawText(ctx, "3. Cân nặng", {
    x: 10,
    y: top + 20 + 100,
  });
  drawText(ctx, "(kg)", {
    x: 10,
    y: top + 40 + 100,
  });

  let y = top + 30 + 100;
  moreValueIds.forEach((item, index) => {
    y = y + 50;
    drawText(
      ctx,
      ((item) => {
        let temp = (vitalSignsCategories || []).find((x) => {
          return x.id === item;
        });
        if (temp) {
          let text = 4 + index + ". " + temp.ten;
          if (temp.donVi) text += " (" + temp.donVi + ")";
          return text;
        }
        return "";
      })(item),
      {
        x: 10,
        y: y,
      }
    );
  });

  drawText(ctx, "Điều dưỡng", {
    x: 10,
    y: y + 20 + 70,
  });
  drawText(ctx, "ký và ghi tên", {
    x: 10,
    y: y + 40 + 70,
  });
}
