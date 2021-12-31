import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
} from "constants/index";
import { Checkbox, Col, Input, Modal, Form } from "antd";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import FormWraper from "components/FormWraper";
import { openInNewTab } from "utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm from "components/BaseDm";

let timer = null;

const LoaGoiSo = ({
  listLoaGoiSo,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  getListLoaGoiSo,
  createOrEdit,
  onDelete,
  getListAllKhoa,
  getUtils,
  listloaiLoaGoiSo,
  listAllKhoa,
}) => {
  useEffect(() => {
    // const sort = combineSort(dataSortColumn);
    // const params = { page, size, sort };
    // getListLoaGoiSo(params);
    getListAllKhoa();
    getUtils({ name: "loaiLoaGoiSo" });
  }, []);

  const getColumns = ({ onClickSort, dataSortColumn, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 25,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã loa gọi số"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã loa gọi số"
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
          title="Tên loa gọi số"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên loa gọi số"
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
          title="Loại gọi số"
          sort_key="loaiLoaGoiSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiLoaGoiSo || 0}
          searchSelect={
            <Select
              onChange={(e) => {
                onSearchInput(e, "loaiLoaGoiSo");
              }}
              defaultValue=""
              placeholder={"Chọn loại gọi số"}
              data={[{ id: "", ten: "Tất cả" }, ...listloaiLoaGoiSo]}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "loaiLoaGoiSo",
      key: "loaiLoaGoiSo",
      render: (item) => {
        let res = listloaiLoaGoiSo.filter((val) => {
          return +item === +val.id;
        });
        return res.length ? res[0].ten : {};
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          onClickSort={onClickSort}
          sort_key="khoa.ten"
          dataSort={dataSortColumn["khoa.ten"] || 0}
          search={
            <Input
              placeholder="Tìm khoa"
              onChange={(e) => {
                onSearchInput(e.target.value, "khoa.ten");
              }}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "khoa",
      key: "khoa",
      render: (item) => {
        return item?.ten;
      },
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
  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã loa gọi số"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã loa gọi số!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã loa gọi số không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã loa gọi số!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã loa gọi số"
          />
        </Form.Item>
        <Form.Item
          label="Tên loa gọi số"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên loa gọi số!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên loa gọi số không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên loa gọi số!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên loa gọi số"
          />
        </Form.Item>
        <Form.Item label="Loại tiếp đón" name="loaiLoaGoiSo">
          <Select placeholder={"Chọn loại tiếp đón"} data={listloaiLoaGoiSo} />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/khoa")}
            >
              Khoa
            </div>
          }
          name="khoaId"
        >
          <Select placeholder={"Chọn khoa"} data={listAllKhoa} />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return (
    <Main>
      <BaseDm
        titleTable="Danh mục loa gọi số"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListLoaGoiSo}
        listData={listLoaGoiSo}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].LOA_GOI_SO_THEM]}
        roleEdit={[ROLES["DANH_MUC"].LOA_GOI_SO_SUA]}
      />
      {/* <HomeWrapper title="Danh mục">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title="Danh mục loa gọi số"
            scroll={{ x: 1000 }}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].LOA_GOI_SO_THEM])
                ? [
                    {
                      title: "Thêm mới",
                      onClick: handleClickedBtnAdded,
                      buttonHeaderIcon: (
                        <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                      ),
                    },
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
                : [
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
            }
            columns={columns}
            dataSource={data}
            onRow={onRow}
            rowClassName={setRowClassName}
          ></TableWrapper>
          {totalElements && (
            <Pagination
              onChange={onPageChange}
              current={page + 1}
              pageSize={size}
              listData={data}
              total={totalElements}
              onShowSizeChange={onSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          )}
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            <CreatedWrapper
              title="Thông tin chi tiết"
              onCancel={handleCancel}
              cancelText="Hủy"
              onOk={handleAdded}
              okText="Lưu"
              roleSave={[ROLES["DANH_MUC"].LOA_GOI_SO_THEM]}
              roleEdit={[ROLES["DANH_MUC"].LOA_GOI_SO_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].LOA_GOI_SO_SUA])
                    : !checkRole([ROLES["DANH_MUC"].LOA_GOI_SO_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                
              </FormWraper>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper> */}
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    loaGoiSo: {
      listLoaGoiSo,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    khoa: { listAllKhoa = [] },
    utils: { listloaiLoaGoiSo = [] },
  } = state;

  return {
    listAllKhoa,
    listloaiLoaGoiSo,
    listLoaGoiSo,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  loaGoiSo: { getListLoaGoiSo, createOrEdit, onDelete, updateData },
  khoa: { getListAllKhoa },
  utils: { getUtils },
}) => ({
  getListAllKhoa,
  getUtils,
  getListLoaGoiSo,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoaGoiSo);
