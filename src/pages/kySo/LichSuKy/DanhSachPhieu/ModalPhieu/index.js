import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Row, Input, Button, message, Col, Card, Spin, Icon } from "antd";
import { Main, ContentTable, ModalStyled, ButtonBack, ButtonNext, Footer } from "./styled";
import IconCancel from "assets/images/kho/icClose.png";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import { Document, Page, pdfjs } from "react-pdf";
// import { TRANG_THAI_KHAM_BN } from "../../configs";
import { TRANG_THAI_DICH_VU } from "constants/index";
import { Modal } from "antd";
// import { ModalNotification2 } from "../../../../components/ModalConfirm";
const { confirm } = Modal;
let timer = null;

const ModalListDichVuTimKiem = (props, ref) => {
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
  const { getFilePdf } = useDispatch().danhSachPhieuChoKy

  const [state, _setState] = useState({ open: false });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  // useEffect(() => {
  //   getFilePdf("document/EMR_HSDD015.1/2021-09-14/489ff283-6f95-46e4-9e9d-336550ffa0a5/file.pdf").then((s) => {
  //     console.log('s: ', s);

  //   }) //  document/EMR_HSDD015.1/2021-09-14/489ff283-6f95-46e4-9e9d-336550ffa0a5/file.pdf
  //   ///state.urlFileLocal =  blob:http://localhost:3000/41540332-753a-4b5e-a426-33cfca05f6f0
  // }, [])


  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "20px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên phiếu"
          sort_key="ten"
        />
      ),
      width: "100px",
      dataIndex: "ten",
      key: "ten",
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
      setState({
        open: true
      });
      // onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
    },
  }));
  const onCloseModal = () => {
    setState({
      open: false
    });
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        setState({
          open: false
        });
      },
    };
  };

  //pdf
  const onDocumentLoadSuccess = ({ numPages }) => {
    setState({
      numPages: numPages,
    });
  };
  const onDocumentComplete = (pages) => {
    setState({
      pageNumber: 1,
      numPages: pages,
    });
  };
  const onPageComplete = (page) => {
    setState({
      pageNumber: page,
    });
  };
  // const handleSignPatient = () => {
  //   generateFileSignForPatient().then((s) => {
  //     if (refModalPatientSign.current) {
  //       refModalPatientSign.current.show({
  //         ...s?.data,
  //         maHoSo: state.maHoSo,
  //         soPhieu: state.soPhieu,
  //         formId: state.formId, //sử dụng để update trạng thái ký cho fileEditor
  //         nbHoSoBaId: state.nbHoSoBaId, //sử dụng để update trạng thái ký cho fileEditor
  //         ngayThucHien: state.ngayThucHien,
  //         khoaChiDinhId: state.khoaChiDinhId,
  //       });
  //     }
  //   });
  // };
  // const generateFileSignForPatient = () => {
  //   return new Promise((resolve, reject) => {
  //     if (state.urlFileLocal) {
  //       const params = {
  //         maBieuMau: state.maBieuMau,
  //         maHoSo: state.maHoSo,
  //         fileName: fileName || null,
  //         sequenceNo: 1,
  //         soPhieu: state.soPhieu,
  //         type: 1,
  //         ngayThucHien: state.ngayThucHien || "",
  //         khoaChiDinhId: state.khoaChiDinhId || "",
  //       };
  //       fileUtils
  //         .urltoFile(state.urlFileLocal, "file.pdf", "application/pdf")
  //         .then(function (file) {
  //           props
  //             .generateFileSignForPatient({ ...params, file })
  //             .then((s) => {
  //               resolve(s);
  //             })
  //             .catch((e) => {
  //               reject(e);
  //             });
  //         });
  //     } else {
  //       reject();
  //     }
  //   });
  // };
  return (
    <ModalStyled width={1300} visible={state.open} closable={false} footer={null}>
      <Main>
        <Row className="header-table">
          <div className="header-table__left">Ký và in</div>
          <div className="header-table__right">
            <img src={IconCancel} alt="IconCancel" onClick={onCloseModal} />
          </div>
        </Row>
        <ContentTable>
          <Row>
            <Col span={16} className="left-box">
              <Row className="header-table">
                <div className="header-table__left">Phiếu 1</div>
                {/* <Spin spinning={!state.urlFileLocal}> */}
                  {/* {state.urlFileLocal && ( // state.urlFileLocal là blob
                    <Document
                      file={state.urlFileLocal}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onDocumentComplete={onDocumentComplete}
                      onPageComplete={onPageComplete}
                      height={1150}
                    >
                      <Page pageNumber={state.pageNumber} />
                    </Document>
                  )}
                  {state.urlFileLocal && state.numPages ? (
                    <div className="action">
                      {renderPagination(state.pageNumber, state.numPages)}
                      <span className="page-description">
                        Trang {state.pageNumber}/{state.numPages}
                      </span>
                    </div>
                  ) : null} */}
                {/* </Spin> */}
              </Row>
            </Col>
            <Col span={8} className="right-box">
              <Row className="header-table">
                <div className="header-table__left">Danh sách phiếu</div>
              </Row>
              <TableWrapper
                // rowSelection={{
                //   type: "radio",
                // }}
                rowClassName={rowClassName}
                columns={columns}
                onRow={onRow}
                dataSource={listAllDichVuTonKho}
                // onRow={onRow}
                // scroll={{ y: 450 }}
                rowKey={(record) => `${record.ma}`}
              />
              {/* {totalElements ? ( */}
              {/* <Pagination
                onChange={handleChangePage}
                current={pageDvSearch + 1}
                pageSize={sizeDvSearch}
                total={totalElementsDvSearch}
                onShowSizeChange={handleSizeChange}
              /> */}

              <Footer align="end" >
                <ButtonNext style={{ marginRight: 10 }} >Ký <img style={{ marginLeft: 5 }} src={require("assets/images/utils/pencil-white.png")} alt=""></img></ButtonNext>
                <ButtonNext >In <img style={{ marginLeft: 5 }} src={require("assets/images/utils/print-white.png")} alt=""></img></ButtonNext>
              </Footer>
            </Col>
          </Row>
        </ContentTable>
      </Main>
    </ModalStyled>
  );
};

export default connect(null, null, null, {
  forwardRef: true,
})(forwardRef(ModalListDichVuTimKiem));
