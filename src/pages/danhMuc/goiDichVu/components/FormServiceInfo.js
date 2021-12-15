import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import { Form, Input, Checkbox } from "antd";
import { connect, useDispatch } from "react-redux";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import FormWraper from "components/FormWraper";

function FormServiceInfo(props, ref) {
  const refAutoFocus = useRef();
  const [state, _setState] = useState({
    listloaiDichVu: [],
    listdoiTuongSuDung: [],
    listAllNhanVien: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { currentItem, refCallbackSave } = props;
  useEffect(() => {
    loadCurrentItem(currentItem);
    props.getUtils({ name: "loaiDichVu" });
    props.getUtils({ name: "doiTuongSuDung" });
    props.getListAllNhanVien({ active: true });
    if (!currentItem?.id && refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);

  const [form] = Form.useForm();

  const loadCurrentItem = (goiDichVu) => {
    if (goiDichVu) {
      const {
        dichVu: { ma, ten, khongTinhTien } = {},
        covid,
        dsLoaiDichVu,
        active,
        hanCheKhoaChiDinh,
        id,
        dsDoiTuongSuDung,
        dsBacSiChiDinhId,
      } = goiDichVu || {};
      const data = {
        id,
        ma,
        ten,
        dsLoaiDichVu,
        khongTinhTien,
        covid,
        active,
        hanCheKhoaChiDinh,
        dsDoiTuongSuDung,
        dsBacSiChiDinhId,
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
    loadCurrentItem(currentItem);
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
          hanCheKhoaChiDinh,
          active,
          khongTinhTien,
          covid,
          dsDoiTuongSuDung,
          dsBacSiChiDinhId,
        } = values;
        values = {
          dsLoaiDichVu: dsLoaiDichVu || [],
          dichVu: { ten, ma, khongTinhTien: khongTinhTien || false },
          covid: covid || false,
          hanCheKhoaChiDinh,
          active,
          id: state.data?.id,
          dsDoiTuongSuDung: dsDoiTuongSuDung || [],
          dsBacSiChiDinhId: dsBacSiChiDinhId || [],
        };
        props.createOrEdit(values).then(() => {
          form.resetFields();
        });
      })
      .catch((error) => {});
  };
  refCallbackSave.current = onSave;

  return (
    <EditWrapper
      title="Thông tin gói dịch vụ"
      onCancel={onCancel}
      onSave={onSave}
      onAddNewRow={onAddNewRow}
      isShowSaveButton={state.data}
      isShowCancelButton={state.data}
      showAdded={false}
      isHiddenButtonAdd={true}
      roleSave={[ROLES["DANH_MUC"].GOI_DICH_VU_THEM]}
      roleEdit={[ROLES["DANH_MUC"].GOI_DICH_VU_SUA]}
      editStatus={state.data?.id}
    >
      <FormWraper
        disabled={
          state.data?.id
            ? !checkRole([ROLES["DANH_MUC"].GOI_DICH_VU_SUA])
            : !checkRole([ROLES["DANH_MUC"].GOI_DICH_VU_THEM])
        }
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        className="form-custom"
      >
        <Form.Item
          label="Mã gói dịch vụ"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã tên gói dịch vụ!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã gói dịch vụ không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên gói dịch vụ!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            className="input-option"
            placeholder="Vui lòng nhập tên thời gian cấp cứu"
          />
        </Form.Item>
        <Form.Item
          label="Tên gói dịch vụ"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên gói dịch vụ!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên gói dịch vụ không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên gói dịch vụ!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên thời gian cấp cứu"
          />
        </Form.Item>
        <Form.Item label="Loại dịch vụ" name="dsLoaiDichVu">
          <Select
            data={props.listloaiDichVu}
            placeholder="Chọn loại dịch vụ"
            mode="multiple"
          />
        </Form.Item>
        <Form.Item label="Trường hợp kê DV" name="dsDoiTuongSuDung">
          <Select
            data={props.listdoiTuongSuDung}
            placeholder="Chọn hợp kê DV"
            mode="multiple"
          />
        </Form.Item>
        <Form.Item label="Tài khoản chỉ định gói" name="dsBacSiChiDinhId">
          <Select
            data={props.listAllNhanVien}
            placeholder="Chọn tài khoản chỉ định gói"
            mode="multiple"
          />
        </Form.Item>
        <Form.Item label=" " name="hanCheKhoaChiDinh" valuePropName="checked">
          <Checkbox>Hạn chế khoa chỉ định</Checkbox>
        </Form.Item>

        <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
          <Checkbox>Không tính tiền</Checkbox>
        </Form.Item>
        <Form.Item label=" " name="covid" valuePropName="checked">
          <Checkbox>Dùng cho Covid</Checkbox>
        </Form.Item>
        {state.data?.id && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </FormWraper>
    </EditWrapper>
  );
}

const mapStateToProps = (state) => {
  const {
    utils: { listloaiDichVu = [], listdoiTuongSuDung = [] },
    nhanVien: { listAllNhanVien },
  } = state;

  return {
    listloaiDichVu,
    listdoiTuongSuDung,
    listAllNhanVien,
  };
};

const mapDispatchToProps = ({
  goiDichVu: { createOrEdit },
  utils: { getUtils },
  nhanVien: { getListAllNhanVien: getListAllNhanVien },
}) => ({ createOrEdit, getUtils, getListAllNhanVien });

export default connect(mapStateToProps, mapDispatchToProps)(FormServiceInfo);
