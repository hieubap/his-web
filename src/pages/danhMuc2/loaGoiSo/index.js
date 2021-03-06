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
          title="M?? loa g???i s???"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="T??m m?? loa g???i s???"
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
          title="T??n loa g???i s???"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="T??m t??n loa g???i s???"
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
          title="Lo???i g???i s???"
          sort_key="loaiLoaGoiSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiLoaGoiSo || 0}
          searchSelect={
            <Select
              onChange={(e) => {
                onSearchInput(e, "loaiLoaGoiSo");
              }}
              defaultValue=""
              placeholder={"Ch???n lo???i g???i s???"}
              data={[{ id: "", ten: "T???t c???" }, ...listloaiLoaGoiSo]}
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
              placeholder="T??m khoa"
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
              placeholder="Ch???n hi???u l???c"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="C?? hi???u l???c"
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
          label="M?? loa g???i s???"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p m?? loa g???i s???!",
            },
            {
              max: 20,
              message: "Vui l??ng nh???p m?? loa g???i s??? kh??ng qu?? 20 k?? t???!",
            },
            {
              whitespace: true,
              message: "Vui l??ng nh???p m?? loa g???i s???!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui l??ng nh???p m?? loa g???i s???"
          />
        </Form.Item>
        <Form.Item
          label="T??n loa g???i s???"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p t??n loa g???i s???!",
            },
            {
              max: 1000,
              message: "Vui l??ng nh???p t??n loa g???i s??? kh??ng qu?? 1000 k?? t???!",
            },
            {
              whitespace: true,
              message: "Vui l??ng nh???p t??n loa g???i s???!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui l??ng nh???p t??n loa g???i s???"
          />
        </Form.Item>
        <Form.Item label="Lo???i ti???p ????n" name="loaiLoaGoiSo">
          <Select placeholder={"Ch???n lo???i ti???p ????n"} data={listloaiLoaGoiSo} />
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
          <Select placeholder={"Ch???n khoa"} data={listAllKhoa} />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>C?? hi???u l???c</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return (
    <Main>
      <BaseDm
        titleTable="Danh m???c loa g???i s???"
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
      {/* <HomeWrapper title="Danh m???c">
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
            title="Danh m???c loa g???i s???"
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
                      title: "Th??m m???i",
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
              title="Th??ng tin chi ti???t"
              onCancel={handleCancel}
              cancelText="H???y"
              onOk={handleAdded}
              okText="L??u"
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
