import React, { useRef } from "react";
import QrCode from "qrcode.react";
import { Button } from "antd";
export default function index({ data, translate }) {
  const downloadQR = () => {
    const canvas = document.getElementById("qrCodeLink");
    canvas.toBlob(function (blob) {
      let downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "IVISITOR_QR_LINK_BO_CAU_HOI";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink); // this line should be here
    }, "image/png");
  };
  return (
    <div className="col-md-4">
      <div className="search-createlink">
        <div className="title">
          <div className="name">{translate("qrlinkbocauhoi")}</div>
        </div>
        <div className="qr-code">
          <QrCode value={data} id="qrCodeLink" />
        </div>
        <Button onClick={downloadQR}>
          <img src={require("@images/checkin-link/save-link.png")} alt="" />
          {translate("luuqrlinkbocauhoi")}
        </Button>
      </div>
    </div>
  );
}
