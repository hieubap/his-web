import React from "react";
import Pages from "pages";
import { Main } from "./styled";

export default function index() {
  return (
    <Main className="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
      <div className="app-main">
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Pages />
          </div>
        </div>
      </div>
    </Main>
  );
}
