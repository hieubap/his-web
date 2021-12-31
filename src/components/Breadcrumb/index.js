import React from "react";
import { Row } from "antd";
import { Main } from "./styled";
import { useHistory } from "react-router-dom";
import { chain } from "lodash";

const Breadcrumb = ({ chains = [], children }) => {
  const history = useHistory();
  const gotoPage = (value, onClick = () => {}) => {
    onClick();
    history.push(value);
  };
  const listLink = [{ title: "Trang chủ", link: "/" }, ...chains];
  return (
    <Main>
      <div className="container">
        <Row className="home">
          <div className="home-breadcrumbs" style={{ display: "flex" }}>
            {listLink.map((item, index) => (
              <div key={index}>
                {index !== 0 && <span>/</span>}
                {index === listLink.length - 1 ? (
                  <label onClick={() => gotoPage(item?.link || "",item.onClick)}>
                    {item.title}
                  </label>
                ) : (
                  <span className="link" onClick={() => gotoPage(item?.link || "",item.onClick)}>
                    {item.title}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Row>
        <Row>{children}</Row>
      </div>
    </Main>
  );
};

export default Breadcrumb;
