import React, { useEffect } from "react";
import { Button, Radio, Input, Select } from "antd";
import { connect } from "react-redux";
import actionSetting from "@actions/setting";
import { AdminPage, Panel } from "@admin/components/admin";
import DataContants from "@config/data-contants";
import { withTranslate } from "react-redux-multilingual";
import "./style.scss";
const { Option } = Select;
const { TextArea } = Input;
function index(props) {
  const { translate, auth } = props;
  const rolesLogin =
    auth && (auth.authorities || []).find((option) => option === "ROLE_user");

  let dataView = DataContants.listSetting.filter((item) => {
    let isAuthorized = true;
    if (!item.unUserType.length) {
      isAuthorized = false;
    } else {
      isAuthorized = item.unUserType[0] === rolesLogin;
    }
    if (!isAuthorized) {
      return {
        ...item,
      };
    }
  });
  useEffect(() => {
    props.updateData({
      dataSetting: dataView,
    });
    props
      .onSearch(props.donViId)
      .then((s) => {
        if (s && s.length === 0) {
          props.updateData({
            dataSetting: dataView,
            donViId: props.donViId,
          });
        } else {
          let data = dataView.map((item) => {
            let giaTri = (s || []).find((option) => {
              return (option && option.maThietLap) == (item && item.maThietLap);
            });
            return {
              translate: item.translate,
              maThietLap: item.maThietLap,
              name: item.name,
              english: item.english,
              giaTri: giaTri && giaTri.giaTri,
            };
          });
          props.updateData({
            dataSetting: data,
            donViId: props.donViId,
          });
        }
      })
      .catch((e) => { });
  }, []);
  const create = () => {
    let data = props.dataSetting.map((item) => {
      return {
        maThietLap: item.maThietLap,
        giaTri: item.giaTri || null,
      };
    });
    props.createOrEdit(data);
  };
  const handleViewSetting = (ma) => {
    let res = {};
    switch (ma) {
      case "camera":
        res = { left: translate("front_side"), right: translate("rear_side") };
        break;
      case "man_hinh_checkin_mac_dinh":
        res = { left: "Form Checkin", right: "Scan QR" };
        break;
      case "type_of_pager":
        res = {
          left: translate("label_pager"),
          right: translate("receipt_pager"),
        };
        break;
      case "qrcode_barcode":
        res = { left: "Qrcode", right: "Barcode" };
        break;
      default:
        res = { left: translate("co"), right: translate("khong") };
        break;
    }
    return res;
  };
  const defaultSetting = [
    "khai_bao_thong_tin_tin_nhan_thuong_hieu",
    "camera",
    "man_hinh_checkin_mac_dinh",
    "type_of_pager",
    "qrcode_barcode",
  ];
  const defaultSetting2 = [
    "yeu_cau_bang_hoi",
    "in_phan_loai_khach",
    "yeu_cau_so_dien_thoai",
    "su_dung_man_hinh_nhap_sdt",
    "yeu_cau_chup_hinh",
    "check_in_in_the_khach",
    "thong_bao_khi_bat_thuong"
  ];
  return (
    <AdminPage
      className="mgr-setting-update"
      icon="subheader-icon fal fa-edit"
      header={translate("thietlapchung")}
      subheader=" "
    >
      <div className="row">
        {(props.dataSetting || []).map((item, index) => {
          return (
            <div
              className="col-lg-4 col-md-6 ui-sortable sortable-grid"
              key={index}
            >
              <Panel
                id={"mgr-setting-" + index}
                allowClose={false}
                allowCollapse={false}
                title={translate(item.translate)}
              >
                {item.maThietLap === "ten_phieu_khai_thac_thong_tin" ||
                  item.maThietLap === "don_vi_truc_thuoc" ||
                  item.maThietLap === "chan_ky_to_khai" ? (
                  <Input
                    placeholder={
                      item.maThietLap === "ten_phieu_khai_thac_thong_tin"
                        ? translate("nhaptenphieukhaithacthongtin")
                        : item.maThietLap === "don_vi_truc_thuoc"
                          ? translate("nhapdonvitructhuoc")
                          : translate("nhapchankytokhai")
                    }
                    value={item.giaTri}
                    onChange={(e) => {
                      item.giaTri = e.target.value;
                      props.updateData({
                        dataSetting: [...props.dataSetting],
                      });
                    }}
                  />
                ) : (item.maThietLap === "footer_to_khai" || item.maThietLap === "thong_bao_khi_bat_thuong") ? (
                  <TextArea
                    placeholder={item.maThietLap === "footer_to_khai"?translate("nhapfootertokhai"):translate("nhapthongbaokhibatthuong")}
                    value={item.giaTri}
                    onChange={(e) => {
                      item.giaTri = e.target.value;
                      props.updateData({
                        dataSetting: [...props.dataSetting],
                      });
                    }}
                  />
                ) : item.maThietLap === "paper_size" ||
                  item.maThietLap === "print_speed" ? (
                  <>
                    <Select
                      value={item.giaTri}
                      onChange={(e) => {
                        item.giaTri = e;
                        props.updateData({
                          dataSetting: [...props.dataSetting],
                        });
                      }}
                    >
                      {(item.maThietLap === "paper_size"
                        ? DataContants.listPaper
                        : DataContants.listPrintSpeed
                      ).map((item, index) => {
                        return (
                          <Option value={item.id} key={index}>
                            {item.ten}
                          </Option>
                        );
                      })}
                    </Select>
                  </>
                ) : defaultSetting.some((s) => s === item.maThietLap) ? (
                  <>
                    <Radio.Group
                      onChange={(e) => {
                        item.giaTri = e.target.value;
                        props.updateData({
                          dataSetting: [...props.dataSetting],
                        });
                      }}
                      value={item.giaTri}
                    >
                      <Radio value={"10"}>
                        {handleViewSetting(item.maThietLap).left}
                      </Radio>
                      <Radio value={"20"}>
                        {handleViewSetting(item.maThietLap).right}
                      </Radio>
                    </Radio.Group>
                  </>
                ) : defaultSetting2.some((s) => s === item.maThietLap) ? (
                  <>
                    <Radio.Group
                      onChange={(e) => {
                        item.giaTri = e.target.value;
                        props.updateData({
                          dataSetting: [...props.dataSetting],
                        });
                      }}
                      value={item.giaTri}
                    >
                      <Radio value={"true"}>
                        {handleViewSetting(item.maThietLap).left}
                      </Radio>
                      <Radio value={"false"}>
                        {handleViewSetting(item.maThietLap).right}
                      </Radio>
                    </Radio.Group>
                  </>
                ) : null}
              </Panel>
            </div>
          );
        })}
      </div>
      <div className="button-setting">
        <Button className="save" onClick={() => create()}>
          <i className="fal fa-check" style={{ paddingRight: 15 }}></i>
          {translate("luu")}
        </Button>
      </div>
    </AdminPage>
  );
}
export default connect(
  (state) => {
    return {
      auth: state.auth && state.auth.auth,
      donViId: state.auth && state.auth.auth && state.auth.auth.donViId,
      dataSetting: state.setting.dataSetting || [],
    };
  },
  {
    updateData: actionSetting.updateData,
    createOrEdit: actionSetting.createOrEdit,
    onSearch: actionSetting.onSearch,
  }
)(withTranslate(index));
