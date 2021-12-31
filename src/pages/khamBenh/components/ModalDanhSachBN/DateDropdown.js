import { DatePicker, Input, Button, Row, Col } from "antd";
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Main, PopoverStyled, GlobalStyles } from "./styled";
import Search from "assets/images/welcome/search.png";
import Calendar from "assets/images/kho/calendar.png";
import Select from "components/Select";
import { connect, useDispatch, useSelector } from "react-redux";
import moment from "moment"
const { Option } = Select
const { RangePicker } = DatePicker;

const DateDropdown = (props, ref) => {
  const { onChangeInputSearch } = useDispatch().nbKhamBenh;
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  const onCancel = (key) => {
    setState({ show: key === "justClosePopupSetting" ? true : false, tuyChon: false, from: "", to: "", isCheckValidateDate: false });
    props.setStateParent({
      selectedDateKey: "",
    })
  };

  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else value = e;
    setState({ [key]: value });
  };

  const onChangeDate = (key) => (e) => {
    setState({
      [key]: e?.format("DD/MM/YYYY"),
    })
  };
  const submit = async (e) => {
    if (!state.from || !state.to) {
      setState({
        isCheckValidateDate: true
      })
    } else {
      await props.setStateParent({
        selectedDateFrom: state.from,
        selectedDateTo: state.to,
      })
      onChangeInputSearch({
        tuThoiGianVaoVien: moment(moment(state.from, "DD/MM/YYYY")).format("DD-MM-YYYY"),
        denThoiGianVaoVien: moment(moment(state.to, "DD/MM/YYYY")).format("DD-MM-YYYY"),
      })
      onCancel()
    }
  };

  const selectDate = (key) => {
    return (e) => {
      switch (key) {
        case "today": { //----------------------------------------------------------------
          onChangeInputSearch({
            tuThoiGianVaoVien: moment().format("DD-MM-YYYY"),
            denThoiGianVaoVien: moment().format("DD-MM-YYYY"),
          })
          props.setStateParent({
            selectedDateFrom: moment().format("DD/MM/YYYY"),
            selectedDateTo: moment().format("DD/MM/YYYY"),
            selectedDateKey: "today"
          })
          setState({tuyChon: false, from: "", to: "", isCheckValidateDate: false });
          break;
        }
        case "yesterday": { //----------------------------------------------------------------
          props.setStateParent({
            selectedDateFrom: moment().subtract(1, 'days').format("DD/MM/YYYY"),
            selectedDateTo: moment().subtract(1, 'days').format("DD/MM/YYYY"),
            selectedDateKey: "yesterday"
          })
          onChangeInputSearch({
            tuThoiGianVaoVien: moment().subtract(1, 'days').format("DD-MM-YYYY"),
            denThoiGianVaoVien: moment().subtract(1, 'days').format("DD-MM-YYYY"),
          })
          setState({tuyChon: false, from: "", to: "", isCheckValidateDate: false });
          break;
        }
        case "last7DaysBefore": { //----------------------------------------------------------------
          props.setStateParent({
            selectedDateFrom: moment().subtract(6, 'days').format("DD/MM/YYYY"), // là ngày thứ 7 tính từ ngày hiện tại ( Ngày hiện tại là ngày thứ nhất và cộng thêm 6 ngày trước ngày hiện tại)
            selectedDateTo: moment().format("DD/MM/YYYY"), // Ví dụ hôm nay là 14/12/2021 thì khi chọn 7 ngày trước, Từ ngày sẽ là 08/12/2021
            selectedDateKey: "last7DaysBefore"
          })
          onChangeInputSearch({
            tuThoiGianVaoVien: moment().subtract(6, 'days').format("DD-MM-YYYY"),
            denThoiGianVaoVien: moment().format("DD-MM-YYYY"),
          })
          setState({tuyChon: false, from: "", to: "", isCheckValidateDate: false });
          break;
        }
        case "last30DaysBefore": { //----------------------------------------------------------------
          props.setStateParent({
            selectedDateFrom: moment().subtract(29, 'days').format("DD/MM/YYYY"), // Từ ngày: là ngày thứ 30 tính từ ngày hiện tại ( Ngày hiện tại là ngày thứ nhất và cộng thêm 29 ngày trước ngày hiện tại)
            selectedDateTo: moment().format("DD/MM/YYYY"), // Ví dụ hôm nay là 14/12/2021 thì khi chọn 30 ngày trước, từ ngày sẽ là 15/11/2021
            selectedDateKey: "last30DaysBefore"
          })
          onChangeInputSearch({
            tuThoiGianVaoVien: moment().subtract(29, 'days').format("DD-MM-YYYY"),
            denThoiGianVaoVien: moment().format("DD-MM-YYYY"),
          })
          setState({tuyChon: false, from: "", to: "", isCheckValidateDate: false });
          break;
        }
        case "currentMonth": { //----------------------------------------------------------------
          props.setStateParent({
            selectedDateFrom: moment().startOf('month').format("DD/MM/YYYY"),
            selectedDateTo: moment().endOf('month').format("DD/MM/YYYY"),
            selectedDateKey: "currentMonth"
          })
          onChangeInputSearch({
            tuThoiGianVaoVien: moment().startOf('month').format("DD-MM-YYYY"),
            denThoiGianVaoVien: moment().endOf('month').format("DD-MM-YYYY"),
          })
          setState({tuyChon: false, from: "", to: "", isCheckValidateDate: false });
          break;
        }
        case "lastMonth": { //----------------------------------------------------------------------
          props.setStateParent({
            selectedDateFrom: moment().subtract(1, 'months').startOf('month').format("DD/MM/YYYY"),
            selectedDateTo: moment().subtract(1, 'months').endOf('month').format("DD/MM/YYYY"),
            selectedDateKey: "lastMonth"
          })
          onChangeInputSearch({
            tuThoiGianVaoVien: moment().subtract(1, 'months').startOf('month').format("DD-MM-YYYY"),
            denThoiGianVaoVien: moment().subtract(1, 'months').endOf('month').format("DD-MM-YYYY"),
          })
          setState({tuyChon: false, from: "", to: "", isCheckValidateDate: false });
          break;
        }
        case "setting": {
          props.setStateParent({
            selectedDateKey: "setting"
          })
          setState({ tuyChon: true })
          break;
        }

        default:
          break;
      }
    }
  }

  const content = () => (
    <Main>
      <div className="content-popover">
        <Row gutter={[6]}>
          <Col span={state.tuyChon ? 6 : 24}>
            <div className={`content-popover_button ${props.stateParent.selectedDateKey === "today" ? "active" : ""}`} onClick={selectDate("today")}>Hôm nay</div>
            <div className={`content-popover_button ${props.stateParent.selectedDateKey === "yesterday" ? "active" : ""}`} onClick={selectDate("yesterday")}>Hôm qua</div>
            <div className={`content-popover_button ${props.stateParent.selectedDateKey === "last7DaysBefore" ? "active" : ""}`} onClick={selectDate("last7DaysBefore")}>7 ngày trước</div>
            <div className={`content-popover_button ${props.stateParent.selectedDateKey === "last30DaysBefore" ? "active" : ""}`} onClick={selectDate("last30DaysBefore")}>30 ngày trước</div>
            <div className={`content-popover_button ${props.stateParent.selectedDateKey === "currentMonth" ? "active" : ""}`} onClick={selectDate("currentMonth")}>Tháng hiện tại</div>
            <div className={`content-popover_button ${props.stateParent.selectedDateKey === "lastMonth" ? "active" : ""}`} onClick={selectDate("lastMonth")}>Tháng trước</div>
            <div className={`content-popover_button ${props.stateParent.selectedDateKey === "setting" && state.tuyChon ? "active" : ""}`} onClick={selectDate("setting")}>Tùy chọn</div>
          </Col>
          {state.tuyChon && (
            <Col span={state.tuyChon ? 18 : 6} style={{ height: 457, borderRadius: 8, border: "1px solid #172b4d30", padding: 0 }}>
              <div className="title-dropdow">Tùy chọn</div>
              <Row style={{ marginTop: 10 }}>
                <Col span={6} style={{ left: 16 }}>
                  Từ ngày
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    open={true}
                    getPopupContainer={node => node.parentNode}
                    className={"date-name-first"}
                    showToday={false}
                    placeholder={"Vui lòng chọn ngày"}
                    onChange={onChangeDate("from")}
                    disabledDate={d => !d || d.isAfter((state.to && moment(moment(state.to, "DD/MM/YYYY")).format("YYYY-MM-DD")) || null)}
                    suffixIcon={<img src={Calendar} alt="..." style={{ marginRight: 5 }} />}
                  />
                  {state.isCheckValidateDate && !state.from && <div style={{ color: "red" }}>Vui lòng nhập Từ ngày</div>}
                </Col>
                <Col span={6} style={{ left: 165 }}>
                  Đến ngày
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    open={true}
                    getPopupContainer={node => node.parentNode}
                    className={"date-name-seccond"}
                    showToday={false}
                    placeholder={"Vui lòng chọn ngày"}
                    onChange={onChangeDate("to")}
                    disabledDate={d => !d || d.isBefore((state.from && moment(moment(state.from, "DD/MM/YYYY")).format("YYYY-MM-DD")) || null)}
                    suffixIcon={<img src={Calendar} alt="..." style={{ marginRight: 5 }} />}
                  />
                  {state.isCheckValidateDate && !state.to && <div style={{ color: "red" }}>Vui lòng nhập Đến ngày</div>}
                </Col>
              </Row>
              <Row className="footer">
                <div onClick={() => onCancel("justClosePopupSetting")}>Hủy</div>
                <div onClick={() => submit()}>Đồng ý</div>
              </Row>
            </Col>
          )}
        </Row>

      </div>
    </Main>
  );
  return (
    <>
      <GlobalStyles width={state.tuyChon ? 835 : 204} height={state.tuyChon ? 469 : "auto"} />
      <PopoverStyled
        overlayClassName="popover-modal-date-custom"
        content={content}
        // visible={true}
        trigger="click"
        visible={state.show}
        placement="bottomLeft"
        onVisibleChange={() => onCancel()}
      ></PopoverStyled>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = ({
}) => ({
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(DateDropdown));
