import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Row, Input, Button, message } from "antd";
import { Main, ContentTable, ModalStyled, ButtonBack, ButtonNext, Footer } from "./styled";
import IconCancel from "assets/images/kho/icClose.png";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
// import { TRANG_THAI_KHAM_BN } from "../../configs";
import { TRANG_THAI_DICH_VU } from "constants/index";
import { Modal } from "antd";
import ModalRequest from "./ModalRequest";
// import { ModalNotification2 } from "../../../../components/ModalConfirm";
const { confirm } = Modal;
let timer = null;

const ModalListDichVuTimKiem = (props, ref) => {
  const refModalRequest = useRef(null)
  const { listAllDichVuTonKho } = useSelector(state => state.thuocChiTiet)
  const thuocChiTiet = useSelector(state => state.thuocChiTiet)
  const {
    isAdvised,
    infoPatient,
    nguoiBenhId,
    dsThuocEdit,
    pageDvSearch,
    sizeDvSearch,
    dataSearchDv,
    totalElementsDvSearch,
    khoId
  } = thuocChiTiet

  const { onSearchAllDichVuTonKho, onSearchListDichVuTonKho, changesDonThuoc } = useDispatch().thuocChiTiet

  // const onLoadNb = useDispatch().khamBenh.onLoadNb;
  // const boQuaKham = useDispatch().khamBenh.boQuaKham;
  // const updateData = useDispatch().khamBenh.updateData;
  // const trangThaiKham = useSelector(
  //   (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  // );
  // const { tenNb, maHoSo } = useSelector((state) => state.khamBenh.infoNb || {});
  // const { dangKhamError } = useSelector((state) => state.khamBenh);
  const [open, setOpen] = useState(false);

  const columns = [
    // {
    //   title: <HeaderSearch title="" />,
    //   width: "20px",
    //   dataIndex: "index",
    //   key: "index",
    //   align: "center",
    // },
    {
      title: (
        <HeaderSearch
          title="M??"
          sort_key="ma"
        // dataSort={dataSortColumn["stt"] || 0}
        // onClickSort={onClickSort}
        // search={
        //   <Input
        //     placeholder="Nh???p s??? kh??m"
        //     // onChange={onSearchInput("soKham")}
        //   />
        // }
        />
      ),
      width: "50px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="T??n d???ch v???"
          sort_key="ten"
        // dataSort={dataSortColumn["maHoSo"] || 0}
        // onClickSort={onClickSort}
        // search={
        //   <Input
        //     placeholder="Nh???p m?? h??? s??"
        //     // onChange={onSearchInput("maHoSo")}
        //   />
        // }
        />
      ),
      width: "120px",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="T??n ho???t ch???t"
          sort_key="tenHoatChat"
        // dataSort={dataSortColumn["tenNb"] || 0}
        // onClickSort={onClickSort}
        // search={
        //   <Input
        //     placeholder="Nh???p T??n - Tu???i - ?????a ch???"
        //     // onChange={onSearchInput("tenNb")}
        //   />
        // }
        />
      ),
      width: "80px",
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
    },
    {
      title: (
        <HeaderSearch
          title="H??m l?????ng"
          sort_key="hamLuong"
        // dataSort={dataSortColumn["trangThai"] || 0}
        // onClickSort={onClickSort}
        // searchSelect={
        //   <Select
        //     placeholder="Ch???n tr???ng th??i"
        //     // onChange={onSearchInput("trangThai")}
        //     // data={[{ id: "", ten: "T???t c???" }, ...TRANG_THAI_KHAM_BN]}
        //     defaultValue=""
        //   />
        // }
        />
      ),
      width: "80px",
      dataIndex: "hamLuong",
      key: "hamLuong",
      // render: (item) => {
      //   const res = TRANG_THAI_KHAM_BN.find((el) => el.id === item) || {};
      //   return res.ten;
      // },
    },
    {
      title: <HeaderSearch title="??VT" />,
      width: "30px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      // render: (item, record) => {
      //   return (
      //     <div className="action-group">
      //       {renderGoiButton(record)}
      //       {renderBoQuaButton(record)}
      //     </div>
      //   );
      // },
    },
    {
      title: <HeaderSearch title="Nh?? s???n xu???t" />,
      width: "50px",
      dataIndex: "tenNhaSanXuat",
      key: "tenNhaSanXuat",
      // render: (item, record) => {
      //   return (
      //     <div className="action-group">
      //       {renderGoiButton(record)}
      //       {renderBoQuaButton(record)}
      //     </div>
      //   );
      // },
    },
  ];
  const handleChangePage = (page) => {
    // onSearchListDichVuTonKho({ page: pageDvSearch - 1 }, true);
  };

  const handleSizeChange = (size) => {
    // onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
  };

  const rowClassName = (record) => {
    // return record.id === infoNb?.id ? "active" : "";
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setOpen(true);
      // onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
    },
  }));
  const oncloseModal = () => {
    setOpen(false);
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        if (record.soLuongKhaDung > 0) {
          if (record.nhapDotDung) { // y???u c???u nh???p ?????t d??ng
            refModalRequest.current.show({
              itemSelected : record
            })
          } else {
            let obj = {
              id: null,
              nbDichVu: {
                dichVuId: record.dichVuId,
                soLuong: record.soLuongKhaDung,
              }
            }
            dsThuocEdit.push(obj)
            changesDonThuoc({ id: nguoiBenhId, dsThuoc: dsThuocEdit })
          }
        } else {
          message.error("Kh??ng th??? k?? th??m d???ch v??? do c?? t???n kh??? d???ng b???ng 0")
        }
        setOpen(false);
      },
    };
  };
  return (
    <ModalStyled width={905} visible={open} closable={false} footer={null}>
      <Main>
        <Row className="header-table">
          <div className="header-table__left">Danh s??ch d???ch v???</div>
          <div className="header-table__right">
            <img src={IconCancel} alt="IconCancel" onClick={oncloseModal} />
          </div>
        </Row>
        <ContentTable>
          <TableWrapper
            // rowSelection={{
            //   type: "radio",
            // }}
            rowClassName={rowClassName}
            columns={columns}
            onRow={onRow}
            dataSource={listAllDichVuTonKho}
            // onRow={onRow}
            scroll={{ y: 450 }}
            rowKey={(record) => `${record.ma}`}
          />
          {/* {totalElements ? ( */}
          <Pagination
            onChange={handleChangePage}
            current={pageDvSearch + 1}
            pageSize={sizeDvSearch}
            total={totalElementsDvSearch}
            onShowSizeChange={handleSizeChange}
          />
          {/* ) : null} */}
          {/* <Footer align="end" >
            <ButtonBack style={{ marginRight: 10 }} >H???y</ButtonBack>
            <ButtonNext >?????ng ??</ButtonNext>
          </Footer> */}
        </ContentTable>
        {/* <ModalNotification2 ref={refModalNotification2} /> */}
      </Main>
      <ModalRequest ref={refModalRequest} {...props}/>
    </ModalStyled>
  );
};

export default connect(null, null, null, {
  forwardRef: true,
})(forwardRef(ModalListDichVuTimKiem));
