import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import fileProvider from "data-access/files-provider";
import WebcamModal from 'components/webcamModal';

const Index = (props, ref) => {
  const refCallback = useRef(null);
  const { title, value, className, image, icon } = props;

  const [state, _setState] = useState({
    type: "",
    isUploadingAvatar: false
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { isUploadingAvatar, type } = state;

  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      setState({
        [`isOpen${data.type}`]: true,
        type: data.type
      });
      refCallback.current = callback;
    },
  }));

  const onTakePicture = fileName => {
    setState({ isUploadingAvatar: true });
    fileProvider.uploadFile(fileName).then(s => {
      if (s && s.data && s.data.code === 0) {
        onClose(false, s.data.data);
      }
    }).catch(() => { })
  };

  const onClose = (show, data) => {
    setState({ [`isOpen${type}`]: show });
    if (refCallback.current) refCallback.current(data);
  }
  return (
    <>
      <img className={`${className ? className : ""}image`} src={value ? value.absoluteUrl() : image}></img>
      <img className={`${className ? className : ""}icon`} src={icon}></img>
      {state[`isOpen${type}`] && <WebcamModal
        show={state[`isOpen${type}`]}
        title={title}
        modalActions={onTakePicture}
        isLoading={isUploadingAvatar}
        onClose={onClose}
      />}
    </>
  );
}

export default forwardRef(Index);