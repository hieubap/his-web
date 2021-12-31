import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DatePicker, Input, Popover, Select, Table } from "antd";
import empty from "assets/images/kho/empty.png";
import { Button } from "antd";
import { PopoverWrapper, GlobalStyles } from "../ThongTinHangHoa/styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { formatNumber } from "utils";
import { useDispatch } from "react-redux";

const HangHoa = ({
  dataSortColumn,
  onClickSort,
  dataSource = [],
  detachLine = true,
  detail = {},
  ...props
}) => {
  const [search, setSearch] = useState("");
  const styleInput = {
    border: "none",
  };
  const updateData = useDispatch().phieuNhapChiTiet.updateData
  useEffect(() => {
    return () => {
      updateData({
        dsNhapXuatChiTiet: []
      })
    }
  }, [])
  const contentPopover = (item) => () =>
    (
      <div className="dd-flex fd-col">
        <div className="text text-bold">{`${item?.dichVu?.ma} - ${item?.dichVu?.ten}`}</div>
        <div className="info dd-flex fd-row space-between">
          <div className="_col">
            {item?.loNhap?.xuatXu?.ten &&
              <div className="_row">
                <span>Xuất xứ: </span>
                {item?.loNhap?.xuatXu?.ten}
              </div>
            }
            {item?.loNhap?.nhaSanXuat?.ten &&
              <div className="_row">
                <span>Nhà sản xuất: </span>
                {item?.loNhap?.nhaSanXuat?.ten}
              </div>
            }
            {item?.loNhap?.nhaSanXuat &&
              <div className="_row">
                <span>Hãng sãn xuất: </span>
                {item?.loNhap?.nhaSanXuat}
              </div>
            }
            {item?.loNhap?.soVisa &&
              <div className="_row">
                <span>Số visa: </span>
                {item?.loNhap?.soVisa}
              </div>
            }
            {item?.dichVu?.quyCach &&
              <div className="_row">
                <span>Quy cách: </span>
                {item?.dichVu?.quyCach}
              </div>
            }
            {item?.dichVu?.tenDuongDung &&
              <div className="_row">
                <span>Đường dùng: </span>
                {item?.dichVu?.tenDuongDung}
              </div>
            }
          </div>
          <div className="_col">
            {detail?.quyetDinhThau?.goiThau &&
              <div className="_row">
                <span>Gói thầu: </span>
                {detail?.quyetDinhThau?.goiThau}
              </div>
            }
            {item?.chiTietThau?.soLuongThau &&
              <div className="_row">
                <span>Số lượng thầu: </span>
                {item?.chiTietThau?.soLuongThau}
              </div>
            }
            {item?.chiTietThau?.soLuongConLai &&
              <div className="_row">
                <span>Số lượng còn lại: </span>
                {item?.chiTietThau?.soLuongConLai}
              </div>
            }
            {item?.dichVu?.maHoatChat &&
              <div className="_row">
                <span>Mã hoạt chất: </span>
                {item?.dichVu?.maHoatChat}
              </div>
            }
            {item?.dichVu?.tenHoatChat &&
              <div className="_row">
                <span>Tên hoạt chất: </span>
                {item?.dichVu?.tenHoatChat}
              </div>
            }
            {item?.dichVu?.hamLuong &&
              <div className="_row">
                <span>Hàm lượng: </span>
                {item?.dichVu?.hamLuong}
              </div>
            }
          </div>
        </div>
      </div>
    );

  const columns = [
    {
      title: "STT",
      key: "stt",
      width: "5%",
      ellipsis: {
        showTitle: false,
      },
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: (
              <div>
                <div className="d-flex" style={{ fontWeight: "normal" }}>
                  <div style={{ width: "5%" }}>Xuất xứ</div>
                  <div style={{ width: "15%", fontWeight: "bold" }}>
                    {data.loNhap?.xuatXu?.ten}
                  </div>
                  <div style={{ width: "80%" }}>
                    <ul>
                      {(data.dsLo || []).map((item, idx) => (
                        <li key={idx}>
                          <span style={{ paddingRight: "10px" }}>
                            <span>Số lô - NSX - HSD: </span>
                            <span style={{ marginLeft: "30px" }}>
                              {item?.loNhap?.soLo}
                            </span>
                            {item?.loNhap?.ngaySanXuat && (
                              <>
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                >
                                  -
                                </span>
                                <span>
                                  {moment(item.loNhap.ngaySanXuat).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </>
                            )}
                            {item?.loNhap?.ngayHanSuDung && ((
                              <>
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                >
                                  -
                                </span>
                                <span>
                                  {moment(item.loNhap.ngayHanSuDung).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="" style={{ width: "20%" }}>
                    <span
                      style={{
                        width: "30%",
                        paddingRight: "12%",
                        fontWeight: "normal",
                      }}
                    >
                      Đơn giá BH
                    </span>
                    <span
                      style={{
                        width: "50%",
                        marginRight: "2%",
                      }}
                    >
                      {formatNumber(data?.loNhap?.giaBaoHiem || 0)}
                    </span>
                  </div>
                  <div style={{ width: "30%" }}>
                    <span style={{ fontWeight: "normal" }}>
                      Đơn giá không BH
                    </span>
                    <span
                      style={{
                        width: "42%",
                        marginRight: "1%",
                        marginLeft: "15%",
                      }}
                    >
                      {formatNumber(data?.loNhap?.giaKhongBaoHiem || 0)}
                    </span>
                  </div>
                  <div style={{ width: "15%" }}>
                    <span
                      style={{ paddingRight: "10px", fontWeight: "normal" }}
                    >
                      Phụ thu
                    </span>
                    <span
                      style={{
                        width: "65%",
                        marginRight: "2%",
                      }}
                    >
                      {formatNumber(data.phuThu || 0)}
                    </span>
                  </div>
                </div>
              </div>
            ),
            props: {
              colSpan: 6,
            },
          }
        ) : (
            <div style={{ marginTop: "-20px" }}>{parseInt(index / 2) + 1}</div>
          ),
    },
    {
      title: (
        <HeaderSearch
          title="Mã hàng hóa"
          sort_key="dichVu.dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["dichVu.dichVu.ma"] || 0}
        />
      ),
      key: "ma",
      width: "15%",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
            <>
              <GlobalStyles />
              <PopoverWrapper
                trigger="hover"
                overlayClassName="wide"
                overlayInnerStyle={{ width: "650px" }}
                content={contentPopover(data)}
                placement="rightTop"
              >
                <div className="text-blue" style={{ marginTop: "-20px", width: "fit-content" }}>
                  {data.dichVu?.ma}
                </div>
              </PopoverWrapper>
            </>
          ),
    },
    {
      title: (
        <HeaderSearch
          title="Tên hàng hóa"
          sort_key="dichVu.dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["dichVu.dichVu.ten"] || 0}
        />
      ),
      key: "ten",
      width: "30%",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
            <>
              <div>
                <GlobalStyles />
                <PopoverWrapper
                  trigger="hover"
                  overlayClassName="wide"
                  overlayInnerStyle={{ width: "650px" }}
                  content={contentPopover(data)}
                  placement="rightTop"
                >
                  <div className="text-blue" style={{ width: "fit-content" }}>{data.dichVu?.ten}</div>
                </PopoverWrapper>
                <div style={{ fontWeight: "normal" }}>
                  Ghi chú: {data.loNhap?.ghiChu}
                </div>
              </div>
            </>
          ),
    },
    {
      title: (
        <HeaderSearch
          title="SL"
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soLuong || 0}
        />
      ),
      dataIndex: "soLuong",
      key: "soLuong",
      width: "15%",
      align: "center",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
            <div>{formatNumber(item) + " " + (data.dichVu?.tenDonViTinh || "")}</div>
          ),
    },
    {
      title: (
        <HeaderSearch
          title="Giá sau VAT"
          sort_key="loNhap.giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["loNhap.giaNhapSauVat"] || 0}
        />
      ),
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      width: "15%",
      align: "center",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
            <Popover
              placement="right"
              overlayInnerStyle={{ borderRadius: "5px", borderColor: "" }}
              content={
                <div style={{ textAlign: "right" }}>
                  <label>Giá nhập trước VAT</label>
                  <label>
                    {formatNumber(data?.loNhap?.giaNhapTruocVat || 0)}
                  </label>

                  <hr
                    style={{
                      borderTop: "1px solid #c5cad3",
                      marginLeft: "-12px",
                      marginRight: "-12px",
                    }}
                  />
                  <label>VAT</label>
                  <label>{formatNumber(data?.loNhap?.vat || 0)}</label>
                  <hr
                    style={{
                      borderTop: "1px solid #c5cad3",
                      marginLeft: "-12px",
                      marginRight: "-12px",
                    }}
                  />
                  <label>Giá nhập sau VAT</label>
                  <label>
                    {(formatNumber(data?.loNhap?.giaNhapSauVat || 0))}
                  </label>
                  <hr
                    style={{
                      borderTop: "1px solid #c5cad3",
                      marginLeft: "-12px",
                      marginRight: "-12px",
                    }}
                  />
                  <label>Thặng số bán lẻ</label>
                  <p>{(formatNumber(data?.loNhap?.thangSoBanLe || 0))}</p>
                </div>
              }
            >
              <div className="pointer">
                {(formatNumber(data?.loNhap?.giaNhapSauVat || 0))}
              </div>
            </Popover>
          ),
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.thanhTien || 0}
        />
      ),
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: "20%",
      align: "center",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
            <Popover
              placement="right"
              overlayInnerStyle={{ borderRadius: "5px", borderColor: "" }}
              content={
                <div style={{ textAlign: "right" }}>
                  <label>Tổng tiền</label>
                  <p>
                    {formatNumber(
                      ((data?.loNhap?.giaNhapSauVat || 0) * (data?.soLuong || 0) || 0)
                    )}
                  </p>
                  <hr
                    style={{
                      borderTop: "1px solid #c5cad3",
                      marginLeft: "-12px",
                      marginRight: "-12px",
                    }}
                  />
                  <label>Chiết khấu</label>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <span>{formatNumber(data?.loNhap?.tyLeChietKhau || 0)} </span>
                    {data?.loNhap?.tyLeChietKhau != null
                      ? (<span>%</span>)
                      : data?.loNhap?.tienChietKhau != null
                        ? (<span>VNĐ</span>)
                        : (<span>%</span>)}
                  </div>
                  <hr
                    style={{
                      borderTop: "1px solid #c5cad3",
                      marginLeft: "-12px",
                      marginRight: "-12px",
                    }}
                  />
                  <label>Thành tiền</label>
                  <p>{formatNumber(data?.thanhTien || 0)}</p>
                  <hr
                    style={{
                      borderTop: "1px solid #c5cad3",
                      marginLeft: "-12px",
                      marginRight: "-12px",
                    }}
                  />
                  <label>Thành tiền sửa đổi</label>
                  <p>{formatNumber(data?.thanhTienSuaDoi || 0)}</p>
                </div>
              }
            >
              <div className="pointer">
                {formatNumber(data?.thanhTien || 0)}
              </div>
            </Popover>
          ),
    },
    // {
    //   title: "",
    //   key: "delete",
    //   width: 40,
    //   render: (item, __, index) =>
    //     index % 2 === 1 ? (
    //       {
    //         children: index + 1,
    //         props: {
    //           colSpan: 0,
    //         },
    //       }
    //     ) : (
    //       <img style={{ cursor: "pointer" }} src={IcDelete} />
    //     ),
    // },
  ];

  const handleData = () => {
    const maps = {};
    (dataSource || []).forEach((item, index) => {
      const detachId =
        item.dichVu?.dichVu?.ma +
        "_" +
        item.loNhap?.giaNhapSauVat +
        "_" +
        item.loNhap?.soLo +
        "_" +
        item.loNhap?.xuatXuId;
      if (maps[detachId]) {
        maps[detachId] = {
          ...maps[detachId],
          detachId,
          soLuong:
            (parseFloat(maps[detachId].soLuong) || 0) +
            (parseFloat(item.soLuong) || 0),
          dsLo: [...maps[detachId].dsLo, { ...item, detachId, index }],
        };
      } else {
        maps[detachId] = item;
        maps[detachId].detachId = detachId;
        maps[detachId].dsLo = [{ ...item, detachId, index }];
      }
    });

    return Object.keys(maps).reduce((a, b, index) => {
      const item = maps[b];
      return [
        ...a,
        {
          ...item,
          rowId: index,
        },
        {
          ...item,
          rowId: index + "_",
        },
      ];
    }, []);
  };

  return (
    <Table
      locale={{
        emptyText: (
          <div style={{ padding: "100px 0" }}>
            <img src={empty} />
            <div style={{ padding: "10px 0" }}>Chưa có hàng hóa</div>
          </div>
        ),
      }}
      showSorterTooltip={false}
      rowClassName={(record, index) =>
        index % 2 === 1 ? "none-border-top" : "border-top"
      }
      columns={columns}
      dataSource={handleData()}
      pagination={false}
      rowKey={(record) => record.rowId}
    ></Table>
  );
};

export default HangHoa;
