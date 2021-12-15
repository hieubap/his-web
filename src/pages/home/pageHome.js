import React from "react";
import { connect } from "react-redux";
import Layout from "./layout";
import { checkRole } from "app/Sidebar/constant";
import { Row, Col } from "antd";
import { WrapperContentLeft } from "./layout/divInner";
import { ListContentLeftHome } from "./layout/configData";

function Index(props) {
  const listRoles = props?.auth?.authorities || [];
  const listAuthMenu = ListContentLeftHome.filter((item) => {
    if (!checkRole(item.accessRoles, listRoles)) return false;
    return true;
  });

  return (
    <Layout homePage={props.homePage}>
      <div className="list-category">
        <Row className="box-list-module">
          {listAuthMenu.map((item, index) => {
            return (
              <Col xs={24} md={12} xl={12} key={index}>
                <WrapperContentLeft
                  title={item.title}
                  bg={item.bg}
                  icon={item.icon}
                  link={item.link}
                  {...props}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </Layout>
  );
}

export default connect(
  (state) => {
    return {
      auth: state.auth.auth,
    };
  },
  null
)(Index);
