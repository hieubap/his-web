import moment from "moment";

const format = {
  "d...m...y...": {
    name: "Label",
    label: "ngày...tháng...năm...",
    key: "d...m...y...",
  },
  "D...m...y...": {
    name: "Label",
    label: "Ngày...tháng...năm...",
    key: "D...m...y...",
  },
  "HH/mm_D...m...y...": {
    name: "Label",
    label: "...giờ...phút Ngày...tháng...năm...",
    key: "HH/mm_D...m...y...",
  },
  "D/M/Y": { name: "Label", label: ".../.../...", key: "D/M/Y" },
  "D-M-Y": { name: "Label", label: "...-...-...", key: "D-M-Y" },
  "H:M:S": { name: "Label", label: "...:...:...", key: "H:M:S" },
  "HH:mm": { name: "Label", label: "...:...", key: "HH:mm" },
  "HH:mm D/M/Y": {
    name: "Label",
    label: "...:... .../.../...",
    key: "HH:mm D/M/Y",
  },

  "...H...M...S": {
    name: "Label",
    label: "...giờ...phút...giây",
    key: "...H...M...S",
  },
  "...H...M": { name: "Label", label: "...giờ...phút", key: "...H...M" },
  "...H...": { name: "Label", label: "...giờ...", key: "...H..." },
  "..:..D...m...y...": {
    name: "Label",
    label: "..:..Ngày...tháng...năm...",
    key: "..:..D...m...y...",
  },
};

const formatSecond = [
  "H:M:S",
  "HH:mm",
  "HH:mm D/M/Y",
  "...H...M...S",
  "...H...M",
  "...H...",
  "HH/mm_D...m...y...",
  "..:..D...m...y...",
];

const render = (type, value, mode) => {
  if (!value || mode === "config") {
    return format[type] ? format[type].label : "..../..../......";
  }

  switch (type) {
    case "d...m...y...":
      return moment(value).format("ngà\\y DD t\\háng MM nă\\m YYYY");
    case "D...m...y...":
      return moment(value).format("\\Ngà\\y DD t\\háng MM nă\\m YYYY");
    case "..:..D...m...y...":
      return moment(value).format("HH:mm \\Ngà\\y DD t\\háng MM nă\\m YYYY");
    case "HH/mm_D...m...y...":
      return moment(value).format(
        "HH giờ mm p\\hút \\Ngà\\y DD t\\háng MM nă\\m YYYY"
      );
    case "D/M/Y":
      return moment(value).format("DD/MM/YYYY");
    case "HH:mm D/M/Y":
      return (
        moment(value).format("HH:mm") + " " + moment(value).format("DD/MM/YYYY")
      );
    case "D-M-Y":
      return moment(value).format("DD-MM-YYYY");
    case "H:M:S":
      return moment(value).format("HH:mm:ss");
    case "HH:mm":
      return moment(value).format("HH:mm");
    case "...H...M...S":
      return moment(value).format("HH giờ mm p\\hút ss giâ\\y");
    case "...H...M":
      return moment(value).format("HH giờ mm p\\hút");
    case "...H...":
      return moment(value).format("HH giờ mm");
    default:
      return moment(value).format("DD/MM/YYYY");
  }
};

export { format, render, formatSecond };
