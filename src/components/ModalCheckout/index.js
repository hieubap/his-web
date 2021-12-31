import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect
} from "react";
import {
  ModalStyled,
  ModalHeader,
  SubModalHeader,
  ModalContent,
  ModalFooter,
  ButtonBack,
  ButtonNext,
} from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

function ModalCheckout(props, ref) {
  const {
    children,
    titleHeader,
    subTitleHeader,
    titleBtnBack = "Quay lại",
    disabledBtnNext,
    titleBtnNext = "Lưu",
    onClickBack,
    onClickNext,
    width,
    borderButtonBack,
    disabledBtnBack,
    ...rest
  } = props;
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const refLayerHotKey = useRef(stringUtils.guid());

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsModalVisible(true);
    },
    close: () => {
      setIsModalVisible(false);
    },
  }));
  useEffect(() => {
    if (isModalVisible) {
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setIsModalVisible(false);
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              if (!disabledBtnNext && onClickNext) onClickNext();
            },
          },
        ],
      });
    }
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, [isModalVisible]);

  return (
    <ModalStyled
      width={width}
      visible={isModalVisible}
      closable={false}
      footer={null}
      {...rest}
    >
      <ModalHeader className="modal-header">
        {titleHeader}
        <SubModalHeader>{subTitleHeader}</SubModalHeader>
      </ModalHeader>
      <ModalContent className="modal-content">{props.children}</ModalContent>
      <ModalFooter className="modal-footer">
        <ButtonBack
          disabled={disabledBtnBack}
          borderButtonBack={borderButtonBack}
          onClick={onClickBack}
        >
          {titleBtnBack}
        </ButtonBack>
        <ButtonNext disabled={disabledBtnNext} onClick={onClickNext}>
          {titleBtnNext}
        </ButtonNext>
      </ModalFooter>
    </ModalStyled>
  );
}

export default forwardRef(ModalCheckout);
