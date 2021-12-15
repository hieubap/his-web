import React, { useState, useEffect, useRef } from "react";
import { AdminPage, Panel } from "@admin/components/admin";
import { Button, Form, Input, Select, Tooltip, Modal, Upload } from "antd";
import "../userinfo/style.scss";
import userProvider from "@data-access/user-provider";
import fileProvider from "@data-access/file-provider";
import ModalChangePass from "@admin/containers/userinfo/modalChangePass";
import snackbar from "@utils/snackbar-utils";
import { connect } from "react-redux";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
function index(props) {
  const files = useRef([]);
  const [state, _setState] = useState({
    size: 10,
    page: 1,
    data: {},
    fileList: [],
    showChangePass: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = () => {
    userProvider
      .getById(props.auth.id)
      .then((s) => {
        if (s && s.code === 0) {
          setState({
            data: s.data,
            anhDaiDien: s.data.anhDaiDien,
            fileList: [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: s.data.anhDaiDien.absoluteFileUrl(),
              },
            ],
          });
        }
      })
      .catch((e) => {});
  };
  const { previewVisible, previewImage, fileList } = state;
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  const handleChange = ({ fileList }) => {};
  const handleSubmit = () => {};
  const onChangePass = () => {
    setState({
      showChangePass: true,
    });
  };
  const closeModal = () => {
    setState({
      showChangePass: false,
    });
  };
  const { getFieldDecorator } = props.form;

  const handleChangePass = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        userProvider
          .changePass(props.auth.id, state.password, state.newPassword)
          .then((s) => {
            if (s && s.code === 0) {
              snackbar.show("Thay đổi mật khẩu thành công", "success");
              closeModal();
            } else {
              snackbar.show("Thay đổi mật khẩu thất bại", "danger");
            }
          })
          .catch((e) => {});
      }
    });
  };
  return (
    <AdminPage
      icon="subheader-icon fal fa-window"
      header="Thông tin cá nhân"
      subheader="Thông tin tài khoản"
    >
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 ui-sortable sortable-grid">
          <Panel
            title="Thông tin cá nhân"
            id={"mgr-form-type"}
            // allowClose={false}
            // allowCollapse={false}
          >
            <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
              <div style={{ display: "flex" }}>
                <div>
                  <Form.Item>
                    <Upload
                      listType="picture-card"
                      fileList={fileList.map((item) => {
                        let item2 = JSON.parse(JSON.stringify(item));
                        if (item2.url) item2.url = item2.url.absoluteFileUrl();
                        return item2;
                      })}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      onRemove={(file) => {
                        files.current = files.current.filter(
                          (item) => item.uid != file.uid
                        );
                        setState({
                          fileList: files.current,
                          hasChange: true,
                        });
                      }}
                      customRequest={({ onSuccess, onError, file }) => {
                        file.status = "uploading";
                        files.current.push(file);
                        setState({
                          fileList: files.current,
                        });
                        fileProvider
                          .uploadImage(file)
                          .then((s) => {
                            var x = files.current.find(
                              (item) => item.uid == file.uid
                            );
                            if (x) {
                              if (s && s.code == 0 && s.data.length) {
                                setState({
                                  anhDaiDien: s.data[0],
                                });
                                let url = s.data[0];
                                x.status = "done";
                                x.url = url;
                              } else {
                                x.status = "error";
                              }
                              setState({
                                fileList: files.current,
                                hasChange: true,
                              });
                            }
                          })
                          .catch((e) => {
                            var x = files.current.find(
                              (item) => item.uid == file.uid
                            );
                            if (x) {
                              x.status = "error";
                              setState({
                                fileList: files.current,
                              });
                            }
                          });
                      }}
                      accept=".png,.gif,.jpg"
                    >
                      {fileList.length >= 1 ? null : (
                        <div className="ant-upload-text">Upload</div>
                      )}
                    </Upload>
                  </Form.Item>
                </div>
                <div className="style-button col-md-9">
                  <Button
                    className="button btn-cless-01"
                    onClick={() => onChangePass()}
                  >
                    Thay đổi mật khẩu
                  </Button>
                  <br />
                  <Button className="button btn-cless-02">
                    Thay đổi email
                  </Button>
                </div>
              </div>
              <div className="">
                <Form.Item name="name" label="Email">
                  <Input
                    placeholder="Vui lòng nhập email"
                    value={state.data && state.data.email}
                  />
                </Form.Item>
                <Form.Item name="name" label="Đơn vị">
                  <Input
                    placeholder="Vui lòng nhập đơn vị"
                    value={
                      state.data && state.data.dmDonVi && state.data.dmDonVi.ten
                    }
                  />
                </Form.Item>
                <Form.Item name="owner" label="Địa chỉ">
                  <Input
                    placeholder="Vui lòng nhập địa chỉ"
                    value={state.data && state.data.diaChi}
                  />
                </Form.Item>
              </div>
            </Form>
          </Panel>
        </div>
      </div>
      {state.showChangePass ? <ModalChangePass onClose={closeModal} /> : null}
    </AdminPage>
  );
}
function mapStateToProps(state) {
  return {
    auth: (state.auth && state.auth.auth) || {},
  };
}

export default connect(mapStateToProps)(Form.create()(index));
