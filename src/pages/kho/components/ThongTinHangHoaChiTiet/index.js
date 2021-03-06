import { Button, Row, Input, Checkbox, Image } from "antd";
import React, { useEffect, useRef, useState } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect } from "react-redux";
import ThongTinChiTietPhieu from "pages/kho/components/ThongTinChiTietPhieu";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcSave from "assets/images/thuNgan/icSave.png";
import IcPrint from "assets/images/kho/IcPrint.png";
import { ModalNotification } from "components/ModalConfirm";
import ModalDichVu from "pages/kho/components/ModalDichVu";

const ThongTinHangHoaChiTiet = (props) => {
  const {
    getListPhieuNhapChiTiet,
    listPhieuNhapChiTiet,
    phieuNhapXuatId,
    currentItem,
    totalElements,
    page,
    size,
    onSizeChange,
  } = props;

  const [state, _setState] = useState({
    showDelete: false,
  });

  const DichVuRef = useRef(null);

  const handleDichVu = (CurrentItem) => {
    if (DichVuRef.current)
      DichVuRef.current.show(CurrentItem);
  }

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (phieuNhapXuatId) {
      getListPhieuNhapChiTiet({ phieuNhapXuatId });
    }
  }, [phieuNhapXuatId]);

  const onChangePage = (page) => {
    getListPhieuNhapChiTiet({ phieuNhapXuatId, page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onSearchInput = () => { };

  const rowSelection = {
    columnTitle: <HeaderSearch title={<Checkbox> </Checkbox>} />,
    columnWidth: 25,
    // onChange: onSelectChange,
    // selectedRowKeys: state.selectedRowKeys,
  };

  const onOkHuyXacNhan = (data) => () => {
    props.onDelete(data.id);
    huyXacNhan(false);
  };
  const huyXacNhan = (data) => {
    setState({ showDelete: data });
  };

  const onDelete = () => {
    setState({ showDelete: true });
  };

  const onCreate = () => {
    handleDichVu();
  }

  const onEdit = (data) => {
    handleDichVu(data)
  }

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="D???ch v???"
          search={
            <Input
              placeholder="Nh???p d???ch v???"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.dichVu?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="S??? l?????ng"
          search={
            <Input
              placeholder="Nh???p s??? h??a ????n"
              onChange={onSearchInput("soLuong")}
            />
          }
        />
      ),
      width: "35px",
      dataIndex: "soLuong",
      key: "soLuong",
    },
    {
      title: (
        <HeaderSearch
          title="S??? l??"
          search={
            <Input
              placeholder="S??? l??"
              onChange={onSearchInput("loNhap.soLo")}
            />
          }
        />
      ),
      width: "40px",
      dataIndex: "loNhap",
      key: "loNhap",
      render: (item) => {
        return item?.soLo;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ng??y s???n xu???t"
          search={<Input placeholder="Ng??y s???n xu???t" />}
        />
      ),
      width: "60px",
      dataIndex: "loNhap",
      key: "loNhap",
      render: (item) => {
        return item.ngaySanXuat;
      },
    },
    {
      title: <HeaderSearch title="HSD" />,
      width: "35px",
      dataIndex: "loNhap",
      key: "loNhap",
      render: (item) => {
        return item.ngayHanSuDung;
      },
    },
    {
      title: (
        <HeaderSearch
          title="??VT"
          search={<Input placeholder="Nh???p quy???t ?????nh th???u" />}
        />
      ),
      width: "30px",
      dataIndex: "",
      key: "",
    },

    {
      title: (
        <HeaderSearch
          title="Gi?? nh???p tr?????c VAT"
          search={<Input placeholder="Nh???p gi?? tr?????c VAT" />}
        />
      ),
      width: "60px",
      dataIndex: "",
      key: "",
    },
    {
      title: (
        <HeaderSearch title="VAT" search={<Input placeholder="Nh???p VAT" />} />
      ),
      width: "30px",
      dataIndex: "",
      key: "",
    },
    {
      title: (
        <HeaderSearch
          title="Gi?? nh???p sau VAT"
          search={<Input placeholder="Nh???p gi?? sau VAT" />}
        />
      ),
      width: "60px",
      dataIndex: "",
      key: "",
    },
    {
      title: (
        <HeaderSearch
          title="Th??nh ti???n"
          search={<Input placeholder="Nh???p th??nh ti???n " />}
        />
      ),
      width: "40px",
      dataIndex: "",
      key: "",
    },
    {
      title: (
        <HeaderSearch
          title="M?? DV"
          search={<Input placeholder="Nh???p m?? DV" />}
        />
      ),
      width: "30px",
      dataIndex: "",
      key: "",
    },
    {
      title: <HeaderSearch title="Ti???n ??ch" />,
      width: "40px",
      align: "center",
      dataIndex: "action",
      key: "action",
      render: (value, data, index) => {
        return (
          <div className="btn-action">
            <Image preview={false} src={IconEdit} onClick={() => onEdit(data)} />
            <Image
              preview={false}
              src={IconDelete}
              onClick={() => onDelete()}
            />
            {state.showDelete && (
              <ModalNotification
                visible={state.showDelete}
                title="X??c nh???n x??a"
                content="B???n c?? ch???c ch???n mu???n x??a h??ng h??a kh???i danh s??ch nh???p?"
                onOk={onOkHuyXacNhan(data)}
                onCancel={huyXacNhan}
                cancelText="Quay l???i"
                okText="?????ng ??"
                showImg={true}
                showBtnOk={true}
              />
            )}
          </div>
        );
      },
    },
  ];
  return (
    <Main>
      <Row className="header">
        <div className="header__left">Chi ti???t phi???u nh???p</div>
      </Row>
      <ContentTable>
        <ThongTinChiTietPhieu></ThongTinChiTietPhieu>
        <div className="table">
          <div className="header-table">
            <div className="header-table__left">
              <span> Th??ng tin h??ng h??a</span>
            </div>
            <div className="header-table__right">
              <Button onClick={() => onCreate()}>
                <span>Th??m m???i</span>
                <img src={IcCreate} alt="IcCreate" />
              </Button>
            </div>
          </div>
          <TableWrapper
            columns={columns}
            dataSource={listPhieuNhapChiTiet}
            rowSelection={rowSelection}
          />
        </div>
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
      <div className="footer">
        <div className="left">
          <Button className="btn-cancled">H???y</Button>
        </div>
        <div className="right">
          <Button className="btn-save">
            <span>L??u</span>
            <img src={IcSave} alt="..." />
          </Button>
          <Button className="btn-print">
            <span>In phi???u nh???p</span>
            <img src={IcPrint} alt="..." />
          </Button>
        </div>
      </div>
      <ModalDichVu ref={DichVuRef}></ModalDichVu>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    nhapKhoChiTiet: {
      listPhieuNhapChiTiet = [],
      phieuNhapXuatId,
      currentItem,
      totalElements,
      page,
      size,
    },
    nhapKho: { listPhieuNhap },
  } = state;
  return {
    listPhieuNhapChiTiet,
    phieuNhapXuatId,
    listPhieuNhap,
    currentItem,
    totalElements,
    page,
    size,
  };
};
const mapDispatchToProps = ({
  nhapKhoChiTiet: { getListPhieuNhapChiTiet, onSizeChange, onDelete },
  nhapKho: { getListPhieuNhap },
}) => ({ getListPhieuNhapChiTiet, getListPhieuNhap, onSizeChange, onDelete });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThongTinHangHoaChiTiet);
