import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Layout from "../../layout";
import { checkRole } from "app/Sidebar/constant";
import { Row, Col } from "antd";
import { WrapperContentLeft } from "../../layout/divInner";
import { ListContentLeftHome } from "../../layout/configData";
import { Link } from "react-router-dom";

function SubPage(props) {
  const { auth } = useSelector((state) => state.auth);

  const listAuthMenu = useMemo(() => {
    const listRoles = auth?.authorities || [];
    return ListContentLeftHome.filter((item) => {
      if (!checkRole(item.accessRoles, listRoles)) return false;
      return true;
    });
  }, [ListContentLeftHome, auth]);

  return (
    <Layout homePage={props.homePage}>
      <div className="list-category">
        <Row className="box-list-module">
          {listAuthMenu.map((item, index) => {
            return (
              <Col xs={24} md={12} xl={12} key={index}>
                <Link to={item.link}>
                  <WrapperContentLeft
                    title={item.title}
                    bg={item.bg}
                    icon={item.icon}
                    link={item.link}
                    {...props}
                  />
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </Layout>
  );
}

export default SubPage;
