import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalStyled, ModalHeader, ModalBody } from "./styled";
import { Row, Col, Button, Form } from "antd";
import NhomChiSoCon from "./nhomChiSoCon";
import ThongTinChung from "./thongTinChung";
import NhomKetLuan from "./nhomKetLuan";
import { SERVICE_STATUS } from "../configs";
import stringUtils from "mainam-react-native-string-utils";

const ChiTietDichVu = (props, ref) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refButtonSave = useRef(null);
  const {
    xnHuyetHocSinhHoa: { listServices },
    utils: { listphanLoaiKetQuaXetNghiem },
  } = useSelector((state) => state);
  const {
    xnHuyetHocSinhHoa: { updateKetQuaXetNghiem, updateData },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const isDisabledSave = data.trangThai !== SERVICE_STATUS.DA_TIEP_NHAN_MAU;

  useImperativeHandle(ref, () => ({
    show: (data) => {
      setOpen(true);
      setData(data);
      form.setFieldsValue(data);
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
          {
            keyCode: 13, //Enter
            onEvent: () => {
              refButtonSave.current && refButtonSave.current.click();
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

  const handleCancel = () => {
    updateData({
      listServices: listServices.map((item) => {
        return item;
      }),
    });
    setOpen(false);
  };

  const handleSaveData = () => {
    form
      .validateFields()
      .then((values) => {
        if (data.id) {
          let newValues = { ...values, ketQua: String(values.ketQua) };
          updateKetQuaXetNghiem([
            {
              id: data.id.split ? data.id.split("-")[2] : data.id,
              ...newValues,
            },
          ]);
          const newListServices = listServices.map((item) => {
            return item.id == data.recordId
              ? { ...item, ...(item.dsChiSoCon = values) }
              : item;
          });
          updateData({ listServices: newListServices });
        }
      })
      .catch(() => {});
    setOpen(false);
  };

  return (
    <ModalStyled
      width="80%"
      visible={open}
      closable={false}
      maskClosable={false}
      footer={null}
    >
      <ModalHeader>
        <div className="right-header">
          <div className="right-header__title">
            Chi tiết dịch vụ:{" "}
            <span className="right-header__title-bold">{data.tenDichVu}</span>
          </div>
          <div className="right-header__sub-title">
            Chẩn đoán sơ bộ:{" "}
            <span className="right-header__sub-title-bold">{data.cdSoBo}</span>
          </div>
        </div>
        <div className="left-header">
          <Button
            className="btn btn-submit"
            onClick={handleSaveData}
            ref={refButtonSave}
            disabled={isDisabledSave}
          >
            Lưu thay đổi
          </Button>
          <Button className="btn btn-close" onClick={handleCancel}>
            Quay lại
          </Button>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row gutter={32}>
          <Col className="gutter-row" span={8}>
            <NhomKetLuan data={data} form={form} listphanLoaiKetQuaXetNghiem={listphanLoaiKetQuaXetNghiem} />
            <ThongTinChung data={data} />
          </Col>
          <Col className="gutter-row" span={16}>
            <NhomChiSoCon
              form={form}
              data={data}
              listphanLoaiKetQuaXetNghiem={listphanLoaiKetQuaXetNghiem}
            />
          </Col>
        </Row>
      </ModalBody>
    </ModalStyled>
  );
};

export default forwardRef(ChiTietDichVu);
