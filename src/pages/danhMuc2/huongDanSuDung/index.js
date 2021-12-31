import { Checkbox, Form, Input, message, Upload } from "antd";
import BaseDm from "components/BaseDm";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import React, { useState } from "react";
import { connect } from "react-redux";
import fileProvider from "../../../data-access/file-provider";
import { WrapperStyled } from "./styled";

const ChucVu = ({
  _listData,
  _dataSearch,
  _dataSort,
  _page,
  _size,
  _totalElements,
  _dataEdit,

  _getList,
  _createOrEdit,
  _onDelete,
  updateData,
  store,
  ...props
}) => {
  const [listFile, setListFile] = useState([]);
  const getColumns = ({ onClickSort, dataSortColumn, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 15,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã tài liệu"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên tài liệu"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên tài liệu"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 50,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const renderForm = ({ form, editStatus }) => {
    return (
      <>
        <Form.Item
          label="Mã HDSD"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã HDSD!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã HDSD không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã HDSD!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã HDSD"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label="Tên tài liệu HDSD"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tài liệu HDSD!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên tài liệu HDSD!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập tên tài liệu HDSD"
          />
        </Form.Item>
        <Form.Item
          name="hdsd"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn file tải lên!",
            },
          ]}
          style={{ width: "100%" }}
        >
          <div className="ant-row">
            <div className="ant-col">
              Tải lên HDSD <span style={{ color: "red" }}>*</span>
            </div>

            <Upload
              accept=".html"
              fileList={listFile}
              onRemove={(file) => {
                form.setFieldsValue({ hdsd: null });
              }}
              customRequest={({ onSuccess, onError, file }) => {
                setListFile([file]);
                fileProvider
                  .upload(file, "huongDanSuDung")
                  .then((s) => {
                    if (s && s.code === 0) {
                      form.setFieldsValue({ hdsd: s.data });
                    } else {
                      message.error(s.message);
                    }
                  })
                  .catch((e) => {
                    message.error("Có lỗi xảy ra");
                  });
              }}
            >
              {listFile.length > 0 ? null : (
                <div className="d-flex direction-col align-center pointer">
                  <div className="img-upload">
                    <img
                      src={require("assets/images/his-core/import.png")}
                      alt=""
                    />
                  </div>

                  <div className="name">Tải lên file định dạng html</div>
                </div>
              )}
            </Upload>
          </div>
        </Form.Item>

        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  const setDefaultForm = () => {
    setListFile([]);
  };
  return (
    <WrapperStyled>
      <BaseDm
        titleTable="Danh mục Tài liệu hướng dẫn sử dụng"
        dataEditDefault={_dataEdit}
        getColumns={getColumns}
        createOrEdit={_createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={_getList}
        listData={_listData}
        dataSearch={_dataSearch}
        totalElements={_totalElements}
        page={_page}
        size={_size}
        roleSave={[ROLES["DANH_MUC"].HDSD_THEM]}
        roleEdit={[ROLES["DANH_MUC"].HDSD_SUA]}
        afterSubmit={setDefaultForm}
        setDefaultForm={setDefaultForm}
      />
    </WrapperStyled>
  );
};

export default connect(
  ({
    hdsd: {
      _listData,
      _dataSearch,
      _dataSort,
      _page,
      _size,
      _totalElements,
      _dataEdit,
    },
    ...store
  }) => ({
    store,
    _listData,
    _dataSearch,
    _dataSort,
    _page,
    _size,
    _totalElements,
    _dataEdit,
  }),
  ({ hdsd: { _getList, _createOrEdit, updateData, _onDelete } }) => ({
    _getList,
    _createOrEdit,
    _onDelete,
    updateData,
  })
)(ChucVu);
