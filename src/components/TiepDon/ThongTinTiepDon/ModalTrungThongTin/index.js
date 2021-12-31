import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
} from "react";
import { Main } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import { Button, Input, Radio } from 'antd';
import { ModalConfirm, ModalWarning } from "components/ModalConfirm";

const ModalTrungThongTin = (props, ref) => {
  const refCallback = useRef(null);
  const [state, _setState] = useState({
    data: []
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { data, checked, maNb, soDienThoai, tenNb, sdtNguoiBaoLanh, maSoGiayToTuyThan, diaChi, clearTimeOutAffterRequest, dataIndex } = state;
  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      let dataCheck = item?.data?.map((option) => {
        return ({
          ...option,
          diaChi: `${option?.soNha ? `${option?.soNha}, `
            : ''}${option?.xaPhuong ? `${option?.xaPhuong}, `
              : ""}${option?.quanHuyen ? `${option?.quanHuyen}, `
                : ''}${option?.tinhThanhPho ? option?.tinhThanhPho : ''}`
        })
      })
      setState({
        data: [...dataCheck],
        dataIndex: [...dataCheck],
        show: item.show,
        checked: ""
      });
      refCallback.current = callback;
    },
  }));

  const onSearch = (value, variables) => {
    setState({ [`${variables}`]: value });
    let soDienThoaiSearch = variables === "soDienThoai" ? value : soDienThoai ? soDienThoai : "";
    let maNbSearch = variables === "maNb" ? value : maNb ? maNb : "";
    let tenNbSearch = variables === "tenNb" ? value : tenNb ? tenNb : "";
    let sdtNguoiBaoLanhSearch = variables === "sdtNguoiBaoLanh" ? value : sdtNguoiBaoLanh ? sdtNguoiBaoLanh : "";
    let maSoGiayToTuyThanSearch = variables === "maSoGiayToTuyThan" ? value : maSoGiayToTuyThan ? maSoGiayToTuyThan : "";
    let diaChiSearch = variables === "diaChi" ? value : diaChi ? diaChi : "";
    if (clearTimeOutAffterRequest) {
      try {
        clearTimeout(clearTimeOutAffterRequest);
      } catch (error) { }
    }
    let timer = setTimeout(() => {
      let dataSearchText = (data || []).filter(item => {
        return (
          (item.soDienThoai || "").indexOf(soDienThoaiSearch) !== -1
          && (item.maNb || "").indexOf(maNbSearch) !== -1
          && (item.tenNb || "").toLocaleLowerCase().unsignText().indexOf(tenNbSearch?.toLocaleLowerCase().unsignText()) !== -1
          && (item.sdtNguoiBaoLanh || "").indexOf(sdtNguoiBaoLanhSearch) !== -1
          && (item.maSoGiayToTuyThan || "").indexOf(maSoGiayToTuyThanSearch) !== -1
          && (item.diaChi || "").toLocaleLowerCase().unsignText().indexOf(diaChiSearch?.toLocaleLowerCase().unsignText()) !== -1
        )
      });
      setState({ dataIndex: dataSearchText });
    }, 300)
    setState({ clearTimeOutAffterRequest: timer });
  }
  const onBack = (data, code) => {
    setState({
      show: false,
      data: {},
    });
    if (refCallback.current) refCallback.current(data, code);
  };

  const onClickRow = (value) => {
    setState({ checked: value?.id?.toString() })
    thanhToan(value?.maNb);
  }
  const thanhToan = (value) => {
    props.kiemTraThanhToan({ maNb: value }).then((s) => {
      if (s?.code === 0) {
        onBack(s);
      } else if (
        s?.code === 7921
        || s?.code === 7922
        || s?.code === 7923
        || s?.code === 7924
      ) {
        ModalWarning({
          content: s?.message,
          onOk: () => onBack(s)
        });
      } else if (
        s?.code === 7920
        || s?.code === 7925
      ) {
        ModalConfirm({
          content: s?.message,
          onOk: () => onBack(s, true),
          onCancel: () => onBack(s)
        });
      }
    });
  }
  return (
    <Main
      visible={state.show} closable={false}>
      <div className="header">
        <div className="title">Danh sách Người bệnh trùng - khớp thông tin hành chính</div>
        <div className="button">
          <Button className="cancel" onClick={() => onBack()}>Hủy</Button>
          <Button className="ok" onClick={() => thanhToan(maNb)}>Xác nhận</Button>
        </div>
      </div>
      <div className="table">
        <TableWrapper
          columns={[
            {
              title: <HeaderSearch title="" />,
              width: 7,
              dataIndex: "action",
              key: "action",
              align: "center",
              render: (item, list) => {
                return (
                  <>
                    <Radio value={list?.id} checked={checked === list?.id?.toString()}
                      onClick={(e) => {
                        setState({
                          checked: e.target.value,
                          maNb: list?.maNb
                        })
                      }} />
                  </>
                )
              }
            },
            {
              title: <HeaderSearch
                title="SĐT"
                search={
                  <Input
                    placeholder="Tìm SĐT"
                    onChange={(e) => onSearch(e.target.value, "soDienThoai")}
                    value={soDienThoai}
                  />
                }
              />,
              width: 20,
              dataIndex: "soDienThoai",
              key: "soDienThoai",
            },
            {
              title: <HeaderSearch
                title="Mã NB"
                search={
                  <Input
                    placeholder="Tìm mã NB"
                    onChange={(e) => onSearch(e.target.value, "maNb")}
                    value={maNb}
                  />
                }
              />,
              width: 20,
              dataIndex: "maNb",
              key: "maNb",
            },
            {
              title: (
                <HeaderSearch
                  title="Tên NB"
                  search={
                    <Input
                      placeholder="Tìm tên NB"
                      onChange={(e) => onSearch(e.target.value, "tenNb")}
                      value={tenNb}
                    />
                  }
                />
              ),
              width: 30,
              dataIndex: "tenNb",
              key: "tenNb",
            },
            {
              title: <HeaderSearch
                title="SĐT người bảo lãnh"
                search={
                  <Input
                    placeholder="Tìm SĐT người bảo lãnh"
                    onChange={(e) => onSearch(e.target.value, "sdtNguoiBaoLanh")}
                    value={sdtNguoiBaoLanh}
                  />
                }
              />,
              width: 30,
              dataIndex: "sdtNguoiBaoLanh",
              key: "sdtNguoiBaoLanh",
            },
            {
              title: (
                <HeaderSearch
                  title="CMT/HC"
                  search={
                    <Input
                      placeholder="Tìm CMT/HC"
                      onChange={(e) => onSearch(e.target.value, "maSoGiayToTuyThan")}
                      value={maSoGiayToTuyThan}
                    />
                  }
                />
              ),
              width: 25,
              dataIndex: "maSoGiayToTuyThan",
              key: "maSoGiayToTuyThan",
            },
            {
              title: <HeaderSearch
                title="Địa chỉ"
                search={
                  <Input
                    placeholder="Tìm địa chỉ"
                    onChange={(e) => onSearch(e.target.value, "diaChi")}
                    value={diaChi}
                  />
                }
              />,
              width: 55,
              dataIndex: "diaChi",
              key: "diaChi",
            },
            {
              title: <HeaderSearch title="Thời gian khám chữa bệnh gần nhất" />,
              width: 35,
              dataIndex: "ngayVaoVien",
              key: "ngayVaoVien",
              render: (item) => {
                return (
                  <div>{item && moment(item).format("DD/MM/YYYY HH:mm:ss")}</div>
                )
              }
            },
            {
              title: <HeaderSearch title="Khoa" />,
              width: 20,
              dataIndex: "khoa",
              key: "khoa",
            },
            {
              title: <HeaderSearch title="Chuyên khoa" />,
              width: 20,
              dataIndex: "chuyenKhoa",
              key: "chuyenKhoa",
            },
          ]}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { onClickRow(record) }
            };
          }}
          dataSource={dataIndex}
        ></TableWrapper>
      </div>
    </Main>
  );
};

export default forwardRef(ModalTrungThongTin);
