import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Button, Row, Checkbox } from "antd";
import { Main, ModalStyled } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";

const ModalChiTietDichVu = (props, ref) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { listtrangThaiDichVu = [] } = useSelector((state) => state.utils);
  const {
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState();
  const closeToggleModal = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    show: (item) => {
      setOpen(true);
      setItem(item);
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setOpen(false);
            },
          },
        ],
      });
    },
  }));
  useEffect(() => {
    if (!open) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
  }, [open]);
  useEffect(() => {
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  return (
    <ModalStyled
      width={800}
      height={442}
      visible={open}
      closable={false}
      footer={null}
    >
      <Main>
        <Row className="header">
          <div className="header__left">
            <span>Chi tiết dịch vụ: </span>
            <span style={{ fontWeight: "bold" }}>{item?.tenDichVu}</span>
          </div>
          <div className="header__right">
            <span>Chẩn đoán sơ bộ: </span>
            <span style={{ fontWeight: "bold" }}>{item?.cdSoBo}</span>
          </div>
        </Row>
        <div className="service">
          <div className="info-content">
            <div className="custom-col">
              <table>
                <tbody>
                  <tr>
                    <td>BS chỉ định:</td>
                    <td style={{ fontWeight: "bold" }}>
                      {item?.tenBacSiChiDinh}
                    </td>
                  </tr>
                  <tr>
                    <td>Thời gian chỉ định:</td>
                    <td style={{ fontWeight: "bold" }}>
                      {" "}
                      {item?.thoiGianChiDinh}
                    </td>
                  </tr>
                  <tr>
                    <td>Khoa chỉ định:</td>
                    <td style={{ fontWeight: "bold" }}>
                      {" "}
                      {item?.tenKhoaChiDinh}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="custom-col col 2">
              <table>
                <tbody>
                  <tr>
                    <td>Thành tiền : </td>
                    <td style={{ fontWeight: "bold" }}>
                      {item?.thanhTien?.formatPrice()}
                    </td>
                  </tr>
                  <tr>
                    <td>Trạng thái:</td>
                    <td style={{ fontWeight: "bold" }}>
                      {
                        listtrangThaiDichVu.find((x) => x.id == item?.trangThai)
                          ?.ten
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Đã gủi PASC:</td>
                    <td>
                      <Checkbox disabled={true}>{item?.guiPacs}</Checkbox>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Button className="btn_back" onClick={closeToggleModal}>
            Quay lại
          </Button>
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalChiTietDichVu);
