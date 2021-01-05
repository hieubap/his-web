import React, { useRef, useEffect } from "react";
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
} from "@zxing/library";

export default ({ onUpdate, facingMode }) => {
  const webcamRef = useRef(null);

  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.CODABAR,
  ]);
  hints.set(DecodeHintType.TRY_HARDER, true); // Shouldn't need this but either way makes no difference
  const codeReader = new BrowserMultiFormatReader(hints);

  useEffect(() => {
    if (webcamRef) {
      var video = document.querySelector("#videoElement");
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: { width: { min: 1280 }, height: { min: 720 } },
            advanced: [
              {
                facingMode: "user",
              },
            ],
          })
          .then(function (stream) {
            video.srcObject = stream;
            codeReader
              .decodeFromInputVideoDevice(undefined, "videoElement")
              .then((result) => {
                console.log(result);
                onUpdate(null, result);
              })
              .catch((err) => {
                console.log(1, err);
                onUpdate(err);
              });
          })
          .catch(function (err0r) {
            console.log("Something went wrong!");
          });
      }

      return () => {
        var stream = video.srcObject;
        var tracks = stream.getTracks();

        for (var i = 0; i < tracks.length; i++) {
          var track = tracks[i];
          track.stop();
        }

        video.srcObject = null;
      };
    }
  }, [webcamRef, facingMode]);

  return <video ref={webcamRef} autoPlay={true} id="videoElement"></video>;
};
