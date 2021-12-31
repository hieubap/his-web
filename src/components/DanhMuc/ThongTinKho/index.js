import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import { Form, Input, Row, Col } from "antd";
import { connect } from "react-redux";
function ThongTinKho(props, ref) {
  const { currentItem, layerId } = props;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    form.resetFields();
    loadCurrentItem(currentItem);
  }, [currentItem]);
  useEffect(() => {}, []);

  const [form] = Form.useForm();

  const loadCurrentItem = (thongTinKho) => {
    if (thongTinKho) {
      const {
        ma,
        ten,
        id,
        dsLoaiDichVu,
        dsCoCheDuTru,
        dsCoCheDuyetPhat,
        dsGiuTonKhaDung,
        khoaQuanLyId,
        nhapTuNcc,
        nhaThuoc,
        active,
        khongSuDung,
      } = thongTinKho || {};
      const data = {
        id,
        ma,
        ten,
        khoaQuanLyId,
        dsLoaiDichVu: dsLoaiDichVu || [],
        dsCoCheDuTru: dsCoCheDuTru || [],
        dsCoCheDuyetPhat: dsCoCheDuyetPhat || [],
        dsGiuTonKhaDung: dsGiuTonKhaDung || [],
        nhapTuNcc,
        nhaThuoc,
        active,
        khongSuDung,
      };
      form.setFieldsValue(data);
      setState({
        data: data,
      });
    } else {
      form.resetFields();
      setState({
        data: null,
      });
    }
  };

  const onAddNewRow = () => {
    loadCurrentItem({});
  };

  const onCancel = () => {
    if (currentItem?.id) {
      loadCurrentItem({ ...currentItem });
    } else {
      loadCurrentItem({});
      form.resetFields();
    }
  };
  const onSave = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        const {
          ma,
          ten,
          dsLoaiDichVu,
          dsCoCheDuTru,
          dsCoCheDuyetPhat,
          dsGiuTonKhaDung,
          khoaQuanLyId,
          nhapTuNcc,
          nhaThuoc,
          active,
          khongSuDung,
        } = values;
        values = {
          ma,
          ten,
          id: state.data?.id,
          dsLoaiDichVu,
          dsCoCheDuTru,
          dsCoCheDuyetPhat,
          dsGiuTonKhaDung,
          khoaQuanLyId,
          nhapTuNcc,
          nhaThuoc,
          active,
          khongSuDung,
        };
        props.createOrEdit(values, props.id).then(() => {
          if (state.data?.id) {
            return;
          }
          form.resetFields();
        });
      })
      .catch((error) => {});
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);
  return (
    <EditWrapper
      title="Thông tin kho"
      onCancel={onCancel}
      onSave={onSave}
      onAddNewRow={onAddNewRow}
      // isShowSaveButton={state.data}
      // isShowCancelButton={state.data}
      // showAdded={!state.data}
      showAdded={false}
      isShowSaveButton={true}
      isShowCancelButton={true}
      layerId={layerId}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        className="form-custom-new"
      >
        <Row>
          <Col span="12">
            <Form.Item
              label="Mã kho"
              name="ma"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã kho!",
                },
                {
                  max: 20,
                  message: "Vui lòng nhập mã kho không quá 20 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập mã kho!",
                },
              ]}
            >
              <Input
                autoFocus={true}
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui lòng nhập mã kho"
              />
            </Form.Item>
            <Form.Item
              label="Tên kho"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên kho!",
                },
                {
                  max: 1000,
                  message: "Vui lòng nhập tên dịch vụ không quá 1000 ký tự!",
                },
                {
                  whitespace: true,
                  message: "Vui lòng nhập tên kho!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên kho "
              />
            </Form.Item>
            <Form.Item label="Loại kho" name="dsLoaiDichVu">
              <Select
                data={props.listloaiDichVuKho}
                placeholder="Vui lòng chọn loại kho"
                mode="multiple"
                showArrow
                style={{ paddingRight: "10pt" }}
              />
            </Form.Item>
            <Form.Item label="Khoa quản lý" name="khoaQuanLyId">
              <Select
                data={props.listKhoa}
                placeholder="Vui lòng chọn khoa quản lý"
                onChange={(e, item) => {
                  setState({ loaiKetQuaXN: e });
                  if (e === 20) {
                    form.setFieldsValue({
                      ketQuaThamChieu: [],
                    });
                  } else {
                    form.setFieldsValue({
                      ketQuaThamChieu: null,
                    });
                  }
                }}
              />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item name="nhapTuNcc" valuePropName="checked">
                  <Checkbox>Nhập từ NCC</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="nhaThuoc" valuePropName="checked">
                  <Checkbox>Nhà thuốc</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="active" valuePropName="checked">
                  <Checkbox>Có hiệu lực</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="khongSuDung" valuePropName="checked">
                  <Checkbox>Không sử dụng</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Form.Item label="Cơ chế duyệt phát" name="dsCoCheDuyetPhat">
              <Select
                data={props.listCoCheDuyetPhat}
                placeholder="Vui lòng chọn cơ chế duyệt phát"
                mode="multiple"
                showArrow
                style={{ paddingRight: "10pt" }}
              />
            </Form.Item>
            <Form.Item label="Cơ chế dự trù/ Lĩnh bù" name="dsCoCheDuTru">
              <Select
                data={props.listCoCheDuTru}
                placeholder="Vui lòng chọn Cơ chế dự trù/ Lĩnh bù"
                mode="multiple"
                showArrow
                style={{ paddingRight: "10pt" }}
              />
            </Form.Item>
            <Form.Item label="Giữ chỗ ngay khi kê" name="dsGiuTonKhaDung">
              <Select
                data={props.listGiuTonKhaDung}
                placeholder="Vui lòng chọn Giữ chỗ ngay khi kê"
                mode="multiple"
                showArrow
                style={{ paddingRight: "10pt" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </EditWrapper>
  );
}

const mapStateToProps = (state) => {
  const {
    khoa: { listKhoa },
    utils: {
      listloaiDichVuKho = [],
      listCoCheDuyetPhat = [],
      listCoCheDuTru = [],
      listGiuTonKhaDung = [],
    },
  } = state;

  return {
    listKhoa,
    listloaiDichVuKho,
    listCoCheDuyetPhat,
    listCoCheDuTru,
    listGiuTonKhaDung,
  };
};
const mapDispatchToProps = ({
  kho: { createOrEdit },
  utils: { getUtils },
}) => ({
  getUtils,
  createOrEdit,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ThongTinKho));
