import React from "react";
import { Button } from "antd";
import { Input } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function index({ data, translate }) {
  //   const onCopy = () => {
  //     if (navigator.clipboard != undefined) {
  //       //Chrome
  //       navigator.clipboard.writeText(data);
  //     } else if (window.clipboardData) {
  //       // Internet Explorer
  //       window.clipboardData.setData("Text", data);
  //     }
  //   };
  return (
    <div className="col-md-4">
      <div className="search-createlink">
        <div className="title">
          <div className="name">{translate("linkbocauhoi")}</div>
        </div>
        <div className="item-title">{translate("linkbocauhoi")}</div>
        <Input.TextArea placeholder="Link Checkin" readOnly value={data} />
        <CopyToClipboard text={data}>
          <Button className="btn-action">
            <img src={require("@images/checkin-link/copy-link.png")} alt="" />
            {translate("copylink")}
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
