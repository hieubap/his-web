import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Main } from "./styled";
import moment from "moment";
import { SIZE } from "utils/vital-signs/constants";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import 'moment/locale/vi';
function ModalChangeDate(props, ref) {
  const refCallback = useRef(null);
  const refDatePicker = useRef(null);
  const [state, _setState] = useState({
    search: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (date, index, callback) => {
      setState({
        value: moment(date),
        index,
        show: true,
      });
      refCallback.current = callback;
    },
  }));

  const onOK = () => {
    setState({ show: false });
    if (refCallback.current) refCallback.current(state.value._d);
  };
  if (!state.show) return null;
  return (
    <Main
      style={{
        top: 0,
        left: SIZE.leftColumnWidth + SIZE.columnWidth * state.index,
        width: SIZE.columnWidth,
      }}
      {...props}
    >
      <DatePicker
        suffixIcon={null}
        locale={locale}
        autoFocus={true}
        open={state.show}
        ref={refDatePicker}
        value={state.value}
        format="DD/MM"
        inputReadOnly={true}
        onMouseLeave={() => {
          setState({ show: false });
        }}
        // renderExtraFooter={() => <div>aa</div>}
        showTime={true}
        disabledDate={(date) => {
          return date._d > new Date();
        }}
        showToday={false}
        onChange={(date) => {
          setState({ value: date });
        }}
        onOk={onOK}
      />
    </Main>
  );
}
export default forwardRef(ModalChangeDate);
