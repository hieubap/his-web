import React from "react";
import { Button } from "antd";
import { withTranslate } from "react-redux-multilingual";
import { MainSearch } from "../styledModal";
import GotoPage from './gotoPage'
function index(props) {
  const donViMaLink = window.location.search.getQueryStringHref("donViMa");
  const maKhach = window.location.search.getQueryStringHref("ma");
  const { translate, submit, update, checkButtonSubmit, history, yeuCauChupHinh, updateData } = props;
  return (
    <MainSearch className="mgr-search">
      {donViMaLink ? (
        <div style={{ textAlign: "right" }}>
          <div className="row">
            <div className="col-md-6 medical-declaration-2 button-submit">
              <div className="box-search">
                <Button
                  disabled={checkButtonSubmit}
                  className="search-qr action-search"
                  onClick={(e)=>{submit(e,false); }}
                >
                  {translate("hoanthanh")}
                </Button>
              </div>
            </div>
            <GotoPage
              translate={translate}
              history={history}
              yeuCauChupHinh={yeuCauChupHinh}
              updateData={updateData}
              maKhach={maKhach}
              className="change-location-767-right"
            />
          </div>
        </div>
      ) : (
          <div style={{ textAlign: "right" }}>
            <div className="row">
              <div className="col-md-6 medical-declaration-2 button-submit">
                <div className="box-search">
                  <Button
                    className="search-qr action-search"
                    onClick={() => update()}
                  >
                    <img src={require("@images/checkin/icUpdate.png")} alt="" />
                    {translate("update_data")}
                  </Button>
                </div>
              </div>
              <div className="col-md-6 medical-declaration-2 button-submit">
                <div className="box-search">
                  <Button
                    disabled={checkButtonSubmit}
                    className="search-qr action-search"
                    onClick={(e)=>{submit(e,true); }}
                  >
                    <img src={require("@images/checkin/icCheckin.png")} alt="" />
                    {"Check-in"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
    </MainSearch>
  );
}
export default withTranslate(index);
