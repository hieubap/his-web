// import { Toast } from 'native-base';
import { message } from "antd";
export default {
  showShort(message, type) {
    this.show(message, type, 3000);
  },
  showLong(message, type) {
    this.show(message, type, 6000);
  },
  show(message, type, duration) {
    if (duration != 0 && !duration) duration = 3000;
    let _type = "info";
    switch (type) {
      case "warning":
      case "info":
      case "success":
      case "danger":
        _type = type;
        break;
    }
    this.showWithTitle("iVisitor", message, _type, duration);
  },
  showWithTitle(mes, description, type, duration) {
    let func = message.success;
    switch (type) {
      case "danger":
        func = message.error;
        break;
      case "info":
        func = message.info;
        break;
      case "warning":
        func = message.warn;
        break;
    }
    func(description);
  },
};
