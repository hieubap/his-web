import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Row, Col } from "antd";
import { dataInfoCommon, FORMAT_DATE } from "../../configs";
import moment from "moment";

function ThongTinChung(props) {
  const { data = {}, listtrangThaiDichVu, getUtils, ...rest } = props;

  useEffect(() => {
    getUtils({ name: "trangThaiDichVu" });
  }, []);

  const renderData = (item, type) => {
    if (type === "datetime") {
      return item && moment(item).format(FORMAT_DATE);
    }
    if (type === "status") {
      const index = listtrangThaiDichVu.findIndex((st) => st.id === item);
      if (index === -1) return;
      return listtrangThaiDichVu[index].ten;
    }
    return item;
  };

  return (
    <Main {...rest}>
      {dataInfoCommon.map((item) => {
        return (
          <Row
            key={item.dataIndex}
            className={`info-row ${item.className}`}
            gutter={32}
          >
            <Col className="gutter-row" span={8}>
              {item.title}
            </Col>
            <Col className="gutter-row--bold" span={16}>
              {renderData(data[item.dataIndex], item.type)}
            </Col>
          </Row>
        );
      })}
    </Main>
  );
}

export default connect(
  ({ utils: { listtrangThaiDichVu = [] } }) => ({ listtrangThaiDichVu }),
  ({ utils: { getUtils } }) => ({ getUtils })
)(ThongTinChung);
