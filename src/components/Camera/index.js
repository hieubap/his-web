import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import fileProvider from "data-access/file-provider";
import ModalWebcam from "components/ModalWebcam";
import Image from "components/Image";
const Index = (props, ref) => {
  const refCallback = useRef(null);
  const { title, value, className, image, icon, disabled } = props;

  const [state, _setState] = useState({
    type: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { type } = state;

  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      setState({
        [`isOpen${data.type}`]: disabled ? false : true,
        type: data.type,
      });
      refCallback.current = callback;
    },
  }));

  const onTakePicture = (fileName) => {
    fileProvider
      .upload(fileName, type)
      .then((s) => {
        if (s?.code === 0) onClose(false, s.data);
      })
      .catch(() => {});
  };

  const onClose = (show, data) => {
    setState({ [`isOpen${type}`]: show });
    if (refCallback.current) refCallback.current(data);
  };
  return (
    <>
      <Image
        className={`${className ? className : ""}image`}
        src={value}
        defaultImage={image}
      />
      <img className={`${className ? className : ""}icon`} src={icon}></img>
      {state[`isOpen${type}`] && (
        <ModalWebcam
          show={state[`isOpen${type}`]}
          title={title}
          modalActions={onTakePicture}
          onClose={onClose}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default forwardRef(Index);
