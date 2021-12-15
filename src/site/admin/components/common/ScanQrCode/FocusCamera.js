import React, { useEffect, useState } from "react";
import "./style.scss";

function ScanQrCode() {
  const [styleF, setStyleF] = useState({});
  let a = 177;
  useEffect(() => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    setStyleF({
      top: (h - 200) / 2,
      left: (w - 204) / 2,
    });
  }, []);
  return (
    <div className="rectangle-container" style={styleF}>
      <div className="rectangle">
        <div
          style={{
            backgroundColor: "#00FF00",
            width: 2,
            height: 30,
            left: 0,
            top: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            backgroundColor: "#00FF00",
            width: 2,
            height: 30,
            left: 0,
            bottom: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            backgroundColor: "#00FF00",
            width: 2,
            height: 30,
            right: 0,
            top: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            backgroundColor: "#00FF00",
            width: 2,
            height: 30,
            right: 0,
            bottom: 0,
            position: "absolute",
          }}
        />

        <div
          style={{
            backgroundColor: "#00FF00",
            height: 2,
            width: 30,
            left: 0,
            top: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            backgroundColor: "#00FF00",
            height: 2,
            width: 30,
            left: 0,
            bottom: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            backgroundColor: "#00FF00",
            height: 2,
            width: 30,
            right: 0,
            top: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            backgroundColor: "#00FF00",
            height: 2,
            width: 30,
            right: 0,
            bottom: 0,
            position: "absolute",
          }}
        />
      </div>
    </div>
  );
}

export default ScanQrCode;
