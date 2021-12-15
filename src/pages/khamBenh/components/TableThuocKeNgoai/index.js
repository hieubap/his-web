import React, { useState, useEffect, useCallback } from "react";
import { Button, Checkbox, Col, Input, message, Row, Popover, Form, Select as SelectAntd, Modal } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import { BoxWrapper, PopoverStyled, GlobalStyle, ContentWrapper, WrapperInput, WrapperSelect } from "./styled";
import { Element, scroller, Link, animateScroll as scroll } from "react-scroll";
import { debounce } from "lodash";
import arrowRight from "assets/images/khamBenh/next-arrrow.png";
import Select from "components/Select";
import { openInNewTab } from "utils";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import imgSearch from "assets/images/template/icSearch.png";
import { WarningOutlined } from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";

const TableThuocKeNgoai = (props) => {
  const {
    data = [],
    boChiDinh = {},
    onSelectedBoChiDinh,
    listAllLieuDung,
    onSelectedNoPayment,
    listSelected,
    loaiDonThuoc
  } = props;

  const refLayerHotKey = useRef(stringUtils.guid());
  const refButtonSubmit = useRef(null);
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const [form] = Form.useForm();
  const onSizeChangeThuocKeNgoai = useDispatch().thuocKeNgoai.onSizeChange
  const listAllDonViTinh = useSelector(state => state.donViTinh.listAllDonViTinh)
  const nhanVienId = useSelector(state => state.auth.auth.nhanVienId)
  // const listDuongDung = useSelector(state => state.duongDung.listDuongDung)
  const createOrEdit = useDispatch().thuocKeNgoai.createOrEdit
  const updatedDataThuocKeNgoai = useDispatch().thuocKeNgoai.updateData
  const getBoChiDinh = useDispatch().boChiDinh.getBoChiDinh

  const [state, _setState] = useState(() => {
    let selectedRowKeysCustom = []
    let listServiceSelectedCustom = []
    if (listSelected) {
      let list = listSelected.map(item => item.key)
      selectedRowKeysCustom = list
      listServiceSelectedCustom = [...listSelected]

    }
    return ({
      page: 1,
      size: 10,
      isBoChiDinh: false,
      visiblePopup: false,
      visiblePopupThemLieuDung: false,
      listServiceSelected: listServiceSelectedCustom, // listServiceSelectedCustom
      selectedRowKeys: selectedRowKeysCustom //selectedRowKeysCustom
    })
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (state.visiblePopup) {
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setState({ visiblePopup: !state.visiblePopup })
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              refButtonSubmit.current && refButtonSubmit.current.click();
            },
          },
        ],
      });
    }
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, [state.visiblePopup]);

  useEffect(() => { // khi thay đổi loại thuốc , sẽ xóa đi selected được chọn
    setState({
      selectedRowKeys: [],
      listServiceSelected: [],
    });
  }, [loaiDonThuoc]);
  useEffect(() => {
    if (listSelected?.length === 0) { // nhấn đồng ý đê tạo và xóa đi selected được chọn
      setState({
        selectedRowKeys: [],
        listServiceSelected: [],
      });
    }
  }, [listSelected]);

  const onSelectChange = (selectedRowKeys, data) => {

    let updatedSelectedKeys = selectedRowKeys;
    let selectedRowKeysService = data;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    selectedRowKeysService = [...new Set(selectedRowKeysService)];


    setState({
      selectedRowKeys: updatedSelectedKeys,
      listServiceSelected: selectedRowKeysService,
    });
    onSelectedNoPayment(selectedRowKeysService);
    // onSelected(selectedRowKeysService);
  };

  const onChangePage = (page) => {
    setState({ page: page });
  };
  const handleSizeChange = (value) => {
    setState({ size: value });
  };


  useEffect(() => {
    setState({
      // listData: data
      listData: data.slice(
        (state.page - 1) * state.size,
        (state.page - 1) * state.size + state.size
      ).map((item) => {
        return { ...item, soLuong: 1 }
      })
    });
  }, [state.page, state.size, data]);

  const rowSelection = {
    columnTitle: <HeaderSearch title={<Checkbox />} />,
    columnWidth: 50,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
    preserveSelectedRowKeys: true
  };
  const rowSelectionRight = {
    columnTitle: <HeaderSearch title={"Chọn"} />,
    columnWidth: 50,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const onChangeInput = (type, index) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    if (type === "soLuong" && Number(value) <= 0 && value) {
      state.listServiceSelected[index][type] = 1;
      // message.error("Vui lòng nhập số lượng > 0");
    } else {
      state.listServiceSelected[index][type] = value;
    }
    onSelectedNoPayment(state?.listServiceSelected);
    // onSelected(state?.listServiceSelected);
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const columnsTableLeft = [
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "65%",
      render: (item, data) => {
        return `${item.ten} ${item.tenHoatChat ? " (" + item.tenHoatChat + ")" : " "} ${item.hamLuong ? " - " + item.hamLuong : ""}`;
      },
    },
    {
      title: <Input className="input-header" placeholder="Nhập giá thuốc" />,
      dataIndex: "donViTinh",
      key: "donViTinh",
      width: "30%",
      align: "right",
      render: (item, data) => {
        return item?.ten
      },
    },
  ];
  const columnsTableRight = [
    {
      title: (
        <HeaderSearch isTitleCenter={true} title={(
          <div
            className="pointer"
            onClick={() => openInNewTab("/danh-muc/thuoc")}
          >
            Tên Thuốc - Hàm lượng
          </div>
        )}
        />
      ),
      dataIndex: "",
      key: "",
      width: "47%",
      render: (item, data) => {
        return `${data?.ten} ${data.tenHoatChat ? " (" + data.tenHoatChat + ")" : " "} ${data.hamLuong ? " - " + data.hamLuong : ""}`
      },
    },
    {
      title: <HeaderSearch title="Số lượng" isTitleCenter={true} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: "25%",
      align: "right",
      render: (item, data, index) => {
        console.log('data: ', data);
        return (
          <WrapperInput className="form-item">
            <Input
              value={item}
              defaultValue="1"
              type="number"
              onChange={onChangeInput("soLuong", index)}
              onKeyDown={blockInvalidChar}
            ></Input>
            <span>{data?.donViTinh?.ten}</span>
          </WrapperInput>
        );
      },
    },
    {
      title: (
        <HeaderSearch isTitleCenter={true} title={(
          <div
            className="pointer"
            onClick={() => openInNewTab("/danh-muc/lieu-dung")}
          >
            Liều dùng - Cách dùng
          </div>
        )}
        />
      ),
      dataIndex: "lieuDung",
      key: "lieuDung",
      width: "45%",
      render: (item, data, index) => {
        return (
          <WrapperSelect>
            <Select
              bordered={false}
              showSearch={true}
              data={listAllLieuDung}
              defaultValue={item}
              onChange={onChangeInput("lieuDungId", index)}
            ></Select>
          </WrapperSelect >
        );
      },
    },
  ];
  const debounceFunc = useCallback(
    debounce((value, boChiDinhId) => onSizeChangeThuocKeNgoai({ size: 99999, ten: value, boChiDinhId, active: true })
      , 500),
    []
  );
  const debounceFuncBoChiDinh = useCallback(
    debounce((value) => {
      getBoChiDinh({ thuocChiDinhNgoai: true, ten: value, bacSiChiDinhId: nhanVienId })
      if (!state.boChiDinhSelected) {
        updatedDataThuocKeNgoai({ listData: [] })
      }
    }
      , 500),
    []
  );
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    debounceFunc(key, value)
  };
  const onSubmitThem = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {

        let editStatus = false;
        let formattedData = {
          ...values,
          active: true,
          donViTinhId: values.donViTinhId,
          donViTinh: listAllDonViTinh?.find(item => item?.id == values?.donViTinhId),
          hamLuong: values.hamLuong,
          ten: values.ten,
          tenHoatChat: values.tenHoatChat,
          turnOfErrorMessage: true
        };

        createOrEdit(formattedData).then((s) => {
          onSizeChangeThuocKeNgoai({ size: 99999, isListAll: true, active: true }).then((result) => {
            let obj = result.find((itemA) => {
              itemA.soLuong = 1
              return s.data.id === itemA.id
            });
            setState({
              listServiceSelected: [...state.listServiceSelected, obj],
              selectedRowKeys: [...state.selectedRowKeys, obj.key],
              visiblePopup: false
            })
          })
          form.resetFields();
        }).catch(err => {
          Modal.error({
            title: "Thông báo",
            content: err,
            icon: <WarningOutlined />,
            centered: true,
            onOk() { },
            okText: "Đã hiểu",
            className: "modal-error-thuoc-ke-ngoai"
          });
        });
      })
      .catch((error) => {

      });
  }
  const contentPopover = () => {
    return (
      <>
        <div className={"mask"} style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}></div>
        <ContentWrapper>
          <div className="content-popover">
            <div className="title-popup" style={{
              background: "linear-gradient(0deg, rgba(23, 43, 77, 0.1), rgba(23, 43, 77, 0.1)),linear-gradient(0deg, #FFFFFF, #FFFFFF)",
              fontFamily: "Nunito Sans",
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: 700,
              letterSpacing: 0,
              textAlign: "left",
              padding: "8px 16px",
            }}>Thêm danh mục thuốc kê ngoài</div>
            <EditWrapper actionHeaderClass={"action-header-custom"}>
              <Form
                form={form}
                layout="vertical"
                className="form-custom form-custom--one-line"
              >
                <Form.Item
                  label="Tên thuốc"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên thuốc!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập tên thuốc!",
                    },
                  ]}
                >
                  <Input
                    className=""
                    placeholder="Vui lòng nhập tên thuốc"
                  />
                </Form.Item>
                <Form.Item
                  label="Hoạt chất"
                  name="tenHoatChat"
                >
                  <Input
                    className=""
                    placeholder="Vui lòng nhập hoạt chất"
                  />
                </Form.Item>
                <Form.Item
                  label="Đơn vị tính"
                  name="donViTinhId"
                >
                  <Select
                    placeholder="Vui lòng chọn đơn vị tính"
                    data={listAllDonViTinh}
                    showArrow={true}
                  />
                </Form.Item>
                <Form.Item
                  label="Hàm lượng"
                  name="hamLuong"
                >
                  <Input
                    className=""
                    placeholder="Vui lòng nhập hàm lượng"
                  />
                </Form.Item>
              </Form>
            </EditWrapper>
            <div className="popover-btn-list">
              <Button className="popover-btn-list__cancel"
                //  onClick={onCancel}
                onClick={() => setState({ visiblePopup: !state.visiblePopup })}
              >
                Hủy
          </Button>
              <Button
                className="popover-btn-list__ok"
                onClick={onSubmitThem}
                ref={refButtonSubmit}
              >
                {"Lưu"}<img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
              </Button>
            </div>
          </div>
        </ContentWrapper>

      </>
    )
  }
  const renderEmptyTextLeftTable = () => {
    if (boChiDinh?.data?.length <= 0 && state?.isBoChiDinh && state.keyWord) {
      // condition : click bộ chỉ định => search => không có bộ chỉ định => hiện
      return (
        <div style={{ marginTop: 100 }}>
          <div style={{ color: "#7A869A", fontSize: 14 }}>Không có dữ liệu phù hợp</div>
          <Button trigger="click" style={{
            border: "1px solid",
            borderRadius: "10px",
            width: "200px",
            margin: "auto",
            lineHeight: 0,
            color: "#172B4D",
            // boxShadow: "-1px 3px 1px 1px #d9d9d9",
            cursor: "pointer"
          }} onClick={() => window.open("/danh-muc/bo-chi-dinh")}>Thêm mới bộ chỉ định</Button>
        </div>
      )
    } else if ((state?.isBoChiDinh && !state?.boChiDinhSelected) || (state?.isBoChiDinh && Object.keys(state?.boChiDinhSelected)?.length <= 0)) {

      // condition : click bộ chỉ định => chưa chọn bộ chỉ định => hiện
      return (
        <div style={{ marginTop: 130 }}>
          <div style={{ color: "#c3c3c3" }}>
            Chọn bộ chỉ định để hiển thị danh sách thuốc của bộ
          </div>
        </div>
      )
    }
    return (
      <div style={{ marginTop: 100 }}>
        <div style={{ color: "#7A869A", fontSize: 14 }}>Không có dữ liệu phù hợp</div>
        <PopoverStyled
          overlayClassName="popover-table-thuoc-ke-ngoai"
          overlayInnerStyle={{ width: 640, height: "fit-content", padding: "0px !important" }}
          content={contentPopover()}
          // trigger="click"
          visible={state.visiblePopup}
          placement="bottom"
        >
          <Button trigger="click" style={{
            border: "1px solid",
            borderRadius: "10px",
            width: "200px",
            margin: "auto",
            lineHeight: 0,
            color: "#172B4D",
            // boxShadow: "-1px 3px 1px 1px #d9d9d9",
            cursor: "pointer"
          }} onClick={() => setState({ visiblePopup: !state.visiblePopup })}>Thêm mới thuốc kê ngoài</Button>
        </PopoverStyled>
        {/* )} */}
      </div>
    )
  }
  return (
    <BoxWrapper>
      <GlobalStyle />
      <div className="content-left">
        <Row justify="space-between" align="middle">
          <div className="input-box">
            <img src={imgSearch} alt="imgSearch" />
            <Input
              style={{ width: 450, height: 32, marginLeft: 0 }}
              className="input-header"
              placeholder="Nhập tên thuốc hoặc tên bộ chỉ định"
              value={state?.keyWord}
              onChange={(e) => {
                if (state.isBoChiDinh) {
                  debounceFuncBoChiDinh(e.target.value)
                } else {
                  debounceFunc(e.target.value, state?.boChiDinhSelected?.id)
                }
                setState({
                  keyWord: e.target.value
                })
              }}
            />
          </div>
          <Checkbox checked={state.isBoChiDinh} onChange={(e) => {
            setState({ isBoChiDinh: !state.isBoChiDinh, keyWord: "" })
            if (!state?.boChiDinhSelected?.id) {
              debounceFunc("")
              // updatedDataThuocKeNgoai({listData : []})
            }
          }}>
            Tìm bộ chỉ định
          </Checkbox>
        </Row>
        <div className="content-left-header-table">
          <div className="header">
            <Col span={1} className="navigation-left">
              <div
                onClick={(event) => {
                  scroll.scrollMore(-151, {
                    containerId: "containerElementBoChiDinh",
                    duration: 100,
                    smooth: true,
                    horizontal: true
                  })
                }}>
                <img src={arrowRight} alt="btn-collapse" />
              </div>
            </Col>
            <Element
              name="tableLoaiDV"
              className="element section-body group-service"
              id="containerElementBoChiDinh"
            >
              {boChiDinh &&
                (boChiDinh?.data || []).map((item, index) => {
                  return (
                    <Element name={`${index}`} key={index} >
                      <Col>
                        <Button
                          key={item}
                          className={`button-group-service ${item.id === state?.boChiDinhSelected?.id ? "active" : ""
                            }`}
                          onClick={() => {
                            if (item.id !== state.boChiDinhSelected?.id) {
                              //nếu item không giống thì sẽ thêm vào
                              setState({ boChiDinhSelected: item });
                              onSelectedBoChiDinh(item);
                            } else {
                              setState({ boChiDinhSelected: {} });
                              onSelectedBoChiDinh({});
                              updatedDataThuocKeNgoai({ listData: [] })
                            }
                          }}
                        >
                          {item.ten}
                        </Button>
                      </Col>
                    </Element>
                  );
                })}
            </Element>
            <Col className="navigation-right" span={1}>
              <div
                onClick={(event) => {
                  scroll.scrollMore(151, {
                    containerId: "containerElementBoChiDinh",
                    duration: 100,
                    smooth: true,
                    horizontal: true
                  })
                }}>
                <img src={arrowRight} alt="btn-collapse" />
              </div>
            </Col>
          </div>
          <TableWrapper
            locale={{
              emptyText: renderEmptyTextLeftTable(),
            }}
            rowClassName={(record, index) => {
              return index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
            }}
            columns={columnsTableLeft}
            dataSource={((state?.isBoChiDinh && !state?.boChiDinhSelected) || (state?.isBoChiDinh && Object.keys(state?.boChiDinhSelected)?.length <= 0)) ? [] : (state.listData || data)}
            rowSelection={rowSelection}
            showHeader={false}
          />
          {data?.length > 0 ?
            <Pagination
              listData={state?.listData}
              onChange={onChangePage}
              current={state.page}
              pageSize={state.size}
              total={data?.length}
              onShowSizeChange={handleSizeChange}
              stylePagination={{ flex: 1, justifyContent: "flex-start" }}
            />
            : <div style={{ height: 38 }} />}
        </div>

      </div>
      <div className="content-right">
        <div className="title">
          <div className="title__left">
            <img src={CircleCheck} alt="" /> Đã chọn
          </div>
          <div className="title__right">
            {/* Tổng tiền: {(thanhTien || 0).formatPrice()} đ */}
          </div>
        </div>
        <div className="content-right_table">
          <TableWrapper
            rowClassName={(record, index) => {
              return index % 2 === 0 ? `table-row-even ${index == state?.listServiceSelected?.length - 1 ? "add-border" : ""}` : `table-row-odd ${index == state?.listServiceSelected?.length - 1 ? "add-border" : ""}`
            }}
            rowSelection={rowSelectionRight}
            className="table-right"
            columns={columnsTableRight}
            dataSource={state?.listServiceSelected}
            locale={{
              emptyText: (
                <div style={{ height: 297 }}>
                  <div style={{ color: "#c3c3c3", lineHeight: "297px" }}>Không có dữ liệu thuốc đã chọn</div>
                </div>
              )
            }}
          />
        </div>
      </div>
    </BoxWrapper>
  );
};

export default TableThuocKeNgoai;
