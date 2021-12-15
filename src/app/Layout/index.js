import React, { Suspense } from "react";
import Header from "app/Header";
import Pages from "pages";
import { Main } from "./styled";

export default function index(props) {
  return (
    <Main>
      {(window.location.pathname.indexOf("/kiosk") && window.location.pathname.indexOf("/qms")) === -1 && (
        <Suspense fallback={<div></div>}>
          <Header history={props.history} />
        </Suspense>
      )}
      <div className="app-main">
        <Pages />
      </div>
    </Main>
  );
}
