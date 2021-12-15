import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import T from "prop-types";
import { Button, Upload, Icon, Spin, message } from "antd";
import { Main } from "./styled";
import "react-html5-camera-photo/build/css/index.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Camera from "react-html5-camera-photo";

const WebcamModal = ({ image, upload, title, ...props }, ref) => {
  const webcamRef = useRef(null);

  const [state, _setState] = useState({
    crop: {
      aspect: 1,
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    },
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [cameraChange,setCameraChange]= useState(true);
  const refCallBack = useRef(null);
  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      setState({
        show: true,
        urlPreview: data.image,
        fileUpload: "",
        fileName: "",
        isSelectImage: true,
        imageFile: null,
      });
      refCallBack.current = callback;
      showWebcame();
    },
  }));
  // useEffect(() => {
  //   showWebcame();
  //   return () => {
  //     releaseWebcame();
  //     // handleCancel();
  //   };
  // }, [webcamRef, state.urlPreview]);
  // const releaseWebcame = () => {
  //   try {
  //     var video = document.querySelector("#videoElement");
  //     var stream = video.srcObject;
  //     var tracks = stream.getTracks();
  //     for (var i = 0; i < tracks.length; i++) {
  //       var track = tracks[i];
  //       track.stop();
  //     }
  //     video.srcObject = null;
  //   } catch (error) { }
  // };
  const showWebcame = () => {
    if (!state.urlPreview) {
      var video = document.querySelector("#videoElement");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: { width: { min: 1280 }, height: { max: 720 } },
            advanced: [
              {
                facingMode: "user",
              },
            ],
          })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function () {
            console.log("Something went wrong!");
          });
      }
    }
  };

  useEffect(() => {
    setState({
      urlPreview: image,
      checkFormatImage: false,
    });
  }, [image]);
  //Usage example:
  const dataURLtoFile = (dataurl, filename) => {
    if (dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  };
  const blobToFile = (theBlob, fileName) => {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  };
  const onOK = (ok) => () => {
    // releaseWebcame();
    handleCancel();
    if (ok) {
      setState({ show: false });
      if (refCallBack.current) refCallBack.current(state.value);
    } else {
      setState({ show: false });
    }
  };
  const handleCancel = () => {
    navigator.getUserMedia(
      { audio: false, video: true },
      function (stream) {
        var track = stream.getTracks()[0];
        track.stop();
      },
      function (error) {
        console.log("getUserMedia() error", error);
      }
    );
  };
  const selectImage = (data, isCapture, upload) => {
    let type =
      data &&
      data.file &&
      data.file.originFileObj &&
      data.file.originFileObj.type;
    if (
      type === "image/png" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      upload
    ) {
      let file = "";
      let fileUpload = "";
      let urlPreview = "";
      let fileName = "";
      if (isCapture) {
        const base64regex = /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g;
        const isbase64 = base64regex.test(data);
        if (isbase64) {
          const imageSrc = data;

          file = dataURLtoFile(imageSrc, "image.jpg");
          urlPreview = imageSrc;
          fileUpload = file;
          fileName = "";
        }
      } else {
        fileUpload = data.file.originFileObj;
        fileName = data.file.name;
        urlPreview = URL.createObjectURL(data.file.originFileObj);
      }
      setState({
        fileName,
        fileUpload,
        urlPreview,
        isSelectImage: true,
        crop: {
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          aspect: 1,
        },
        allowUpload: true,
        imageFile: null,
        checkFormatImage: false,
      });
    } else {
      setState({
        checkFormatImage: true,
      });
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      resolve(canvas.toDataURL());
    });
  };

  const uploadImage = () => {
    if (!state.imageFile) {
      message.error("Vui lòng chọn ảnh đại diện");
      return;
    }
    getCroppedImg(
      state.imageFile,
      state.crop,
      "422651_345735872182381_369553123_n.png"
    ).then((s) => {
      upload(dataURLtoFile(s, "image.jpg")).then((s) => {
        onOK(false)();
      });
    });
  };

  const reTakePhoto = () => {
    setState({
      urlPreview: "",
      fileUpload: "",
      fileName: "",
      isSelectImage: false,
      allowUpload: false,
    });
  };
  // const takePhoto = () => {
  //   if (webcamRef.current) {
  //     let canvas = document.createElement("canvas");
  //     canvas.width = webcamRef.current.videoWidth;
  //     canvas.height = webcamRef.current.videoHeight;
  //     canvas
  //       .getContext("2d")
  //       .drawImage(webcamRef.current, 0, 0, canvas.width, canvas.height);
  //     selectImage(canvas.toDataURL(), true);
  //   }
  // };
  const changeCamera = () => {
    setState({
      camera: state.camera == "user" ? "environment" : "user",
    });
    setCameraChange(!cameraChange);
  };
  return (
    <Main
      visible={state.show}
      onOk={onOK(true)}
      title={
        <div>
          <img src={require("@images/web-cam/camera.png")} />
          <span>{title}</span>
        </div>
      }
      // closable={false}
      // onCancel={onOK(false)}
      style={{ minWidth: 768, height: "calc(100vh - 100px)" }}
      footer={
        <div
          style={{
            display: "flex",
            padding: "5px",
            justifyContent: "space-between",
          }}
        >
          <div className={"selectImage"}>
            <Upload
              accept="image/*"
              onChange={(e) => selectImage(e)}
              showUploadList={false}
            >
              <Button size={"small"} style={{ height: 35 }} type="dashed">
                <img src={require("@images/web-cam/image.png")} /> Tải ảnh lên
              </Button>
            </Upload>
            <span className={"name-image"} style={{ marginLeft: 12 }}>
              {state.checkFormatImage ? (
                <span className="error">
                  Vui lòng chọn đúng định dạng ảnh đại diện!
                </span>
              ) : null}
            </span>
          </div>
          <div className="action">
            <Button
              type="danger"
              className="btn-create"
              onClick={reTakePhoto}
              size="large"
              // disabled={!state.urlPreview}
            >
              Chụp lại
            </Button>
            <Button
              type="primary"
              className="btn-create"
              htmlType="submit"
              size="large"
              onClick={uploadImage}
              // disabled={!state.allowUpload}
            >
              Upload
            </Button>
          </div>
        </div>
      }
      cancelButtonProps={{ style: { display: "none" } }}
      closeIcon={
        <Button onClick={onOK(false)}>
          <Icon type="arrow-left" />
          Quay lại
        </Button>
      }
    >
      <Spin spinning={props.isLoading || false}>
        <div className="image-preview">
          {state.urlPreview ? (
            state.isSelectImage ? (
              <>
                <ReactCrop
                  src={state.urlPreview}
                  crop={state.crop}
                  onChange={(newCrop) => {
                    setState({
                      crop: newCrop,
                    });
                  }}
                  onImageLoaded={(image) => {
                    let width = Math.min(image.width, image.height);
                    setState({
                      crop: {
                        width: width,
                        height: width,
                        x: (image.width - width) / 2,
                        y: (image.height - width) / 2,
                        aspect: 1,
                      },
                      imageFile: image,
                    });
                    return false; // Return false when setting crop state in here.
                  }}
                />
              </>
            ) : (
              <img src={state.urlPreview} />
            )
          ) : (
            <div className="camera" 
            //style={{transform: (cameraChange)? "rotateY(180deg)": ""}}
            >
              <Camera
                idealFacingMode={state.camera}
                isImageMirror={!cameraChange}
                onTakePhoto={(dataUri) => {
                selectImage(dataUri, true, true);
                }}
              />
              {/* <video ref={webcamRef} autoPlay={true} id="videoElement"></video>
                <div className="btn-take" onClick={takePhoto}></div> */}
            </div>
          )}
          <div className="change-camera">
            <img
              onClick={changeCamera}
              src={require("@images/searchQR/change-camera.png")}
              style={{ cursor: "pointer" }}
              alt=""
              style={{ maxWidth: 30 }}
            />
          </div>
        </div>

        <div />
      </Spin>
    </Main>
  );
};
WebcamModal.defaultProps = {
  visible: false,
  data: {},
};

WebcamModal.propTypes = {
  visible: T.bool,
  data: T.shape({}),
};
export default forwardRef(WebcamModal);
