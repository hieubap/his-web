import React, { useState, useEffect } from "react";
import { Main } from "./styled";

const HtmlView = (props) => {
  const { width, height, html } = props;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    setState({
      src: `data:text/html, ${encodeURIComponent(html)}`,
    });
  }, [html]);

  return (
    <Main width={width} height={height}>
      <iframe src={state.src}></iframe>
    </Main>
  );
};

export default HtmlView;
