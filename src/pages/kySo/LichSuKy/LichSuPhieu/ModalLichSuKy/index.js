import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Row, Input, Button, message, Col, Card, Spin } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Main, ContentTable, ModalStyled, ButtonBack, ButtonNext, Footer } from "./styled";
import IconCancel from "assets/images/kho/icClose.png";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import { Document, Page, pdfjs } from "react-pdf";
import printJS from "print-js";
// import { TRANG_THAI_KHAM_BN } from "../../configs";
import { TRANG_THAI_DICH_VU } from "constants/index";
import { Modal } from "antd";
import moment from "moment";
// import { ModalNotification2 } from "../../../../components/ModalConfirm";
const { confirm } = Modal;
let timer = null;
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.js`;
const ModalLichSuKy = (props, ref) => {
  const { listtrangThaiKy } = useSelector(state => state.utils)

  const { getFilePdf, sign } = useDispatch().lichSuKyLichSuPhieu

  const [state, _setState] = useState({ open: false, pageNumber: 1, });
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
  const renderIcon = (state) => {
    switch (state) {
      case 0:
        return <img style={{ marginRight: 5 }} src={require("assets/images/utils/green-success.png")} alt="" />
      case 10:
        return <img style={{ marginRight: 5 }} src={require("assets/images/utils/hourglass.png")} alt="" />
      case 20:
        return <img style={{ marginRight: 5 }} src={require("assets/images/utils/gray-success.png")} alt="" />
      case 30:
        return <img style={{ marginRight: 5 }} src={require("assets/images/utils/x.png")} alt="" />
      default:
        break;
    }
  }
  const columns = [
    {
      title: <HeaderSearch title="Ng?????i k??" isTitleCenter={true}/>,
      width: "100px",
      dataIndex: "tenNguoiKy",
      key: "tenNguoiKy",
    },
    {
      title: (
        <HeaderSearch
          title="Th???i gian k??"
          // sort_key="thoiGianKy"
          isTitleCenter={true}
        />
      ),
      width: "100px",
      dataIndex: "thoiGianKy",
      key: "thoiGianKy",
      render: (item) =>{
        return item && moment(item)?.format("DD/MM/YYYY")
      }
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
    show: (options) => {
      const {
        fileLink = "",
        item
      } = options
      getFilePdf(fileLink).then((s) => {
        setState({
          // open: true,
          urlFileLocal: s,
          // urlOriginFile: data.formId ? urlFileLocal : "",
        })
      })
      setState({
        open: true,
        itemCurrent: item,
        urlFileLocal: "",
        pageNumber: 1,
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
        // setState({
        //   open: false
        // });
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
  //         formId: state.formId, //s??? d???ng ????? update tr???ng th??i k?? cho fileEditor
  //         nbHoSoBaId: state.nbHoSoBaId, //s??? d???ng ????? update tr???ng th??i k?? cho fileEditor
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
  const handlePrevious = () => {
    setState({
      pageNumber: state.pageNumber - 1,
    });
  };

  const handleNext = () => {
    setState({
      pageNumber: state.pageNumber + 1,
    });
  };
  const handlePrint = () => {
    printJS({
      printable: state.urlFileLocal,
      type: "pdf",
    });
  };

  const renderPagination = (pageNumber, pages) => {
    let previousButton = (
      <span className="previous" onClick={handlePrevious}>
        <LeftOutlined type="left" />
      </span>
    );
    if (pageNumber === 1) {
      previousButton = (
        <span className="previous disabled">
          <LeftOutlined type="left" />
        </span>
      );
    }
    let nextButton = (
      <span className="next" onClick={handleNext}>
        <RightOutlined type="right" />
      </span>
    );
    if (pageNumber === pages) {
      nextButton = (
        <span className="next disabled">
          <RightOutlined type="right" />
        </span>
      );
    }
    return (
      <div className="pager">
        {previousButton}
        {nextButton}
      </div>
    );
  };
  return (
    <ModalStyled width={1300} visible={state.open} closable={false} footer={null}>
      <Main>
        <Row className="header-table">
          <div className="header-table__left">K?? v?? in</div>
          <div className="header-table__right">
            <img src={IconCancel} alt="IconCancel" onClick={onCloseModal} />
          </div>
        </Row>
        <ContentTable>
          <Row>
            <Col span={16} className="left-box">
              <Row className="header-table">
                <div className="header-table__left">{state.itemCurrent?.tenBaoCao}</div>
              </Row>
              <Row align="center" className="pdf-view">
                <Spin spinning={!state.urlFileLocal}>
                  {state.urlFileLocal && ( // state.urlFileLocal l?? blob
                    <Document
                      file={state.urlFileLocal}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onDocumentComplete={onDocumentComplete}
                      onPageComplete={onPageComplete}
                      onLoadError={console.log}
                      height={200}
                    >
                      {/* <Page pageNumber={state.pageNumber} /> */}
                      {/* <Page pageNumber={state.numPages} /> */}
                      {Array.apply(null, Array(state.numPages))
                        .map((x, i) => i + 1)
                        .map(page => <Page pageNumber={page} />)}
                    </Document>
                  )}
                  {/* {state.urlFileLocal && state.numPages ? (
                    <div className="action">
                      {renderPagination(state.pageNumber, state.numPages)}
                      <span className="page-description">
                        Trang {state.pageNumber}/{state.numPages}
                      </span>
                    </div>
                  ) : null} */}
                </Spin>
              </Row>
            </Col>
            <Col span={7} className="right-box">
              <Row className="header-table">
                <div className="header-table__left">L???ch s??? k??</div>
              </Row>
              <TableWrapper
                // rowSelection={{
                //   type: "radio",
                // }}
                rowClassName={rowClassName}
                columns={columns}
                onRow={onRow}
                dataSource={[{ ...state?.itemCurrent }]}
                // onRow={onRow}
                scroll={{ y: 500, x: 350 }}
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
                {/* <ButtonNext
                  style={{ marginRight: 10 }}
                  onClick={async () => {
                    let signed = await sign({ id: state.itemCurrent.id })
                    if (signed) {
                      getFilePdf(signed.fileSauKy).then((s) => {
                        message.success("K?? th??nh c??ng")
                        setState({
                          urlFileLocal: s,
                          itemCurrent: { ...state.itemCurrent, ...signed },
                        })
                      })
                    }
                  }}
                >
                  K??/ Tr??nh k??
                  <img style={{ marginLeft: 5 }} src={require("assets/images/utils/pencil-white.png")} alt=""></img></ButtonNext> */}
                <ButtonNext onClick={handlePrint}>In <img style={{ marginLeft: 5 }} src={require("assets/images/utils/print-white.png")} alt=""></img></ButtonNext>
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
})(forwardRef(ModalLichSuKy));
