import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { connect } from "react-redux";
import { ModalWrapper, Main } from "./styled";
import { Card, Button, Col, Row, Spin, Icon } from "antd";
import { useTranslation } from "react-i18next";
import HistorySigned from "../HistorySigned";
import fileUtils from "utils/file-utils";
import { Document, Page, pdfjs } from "react-pdf";
import printJS from "print-js";
import ModalPatientSign from "../ModalPatientSign";
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.js`;

const ModalSignPdf = (
  { signer, signDigital, fileSigned, fileName, ...props },
  ref
) => {
  const refModalPatientSign = useRef(null);
  const { t } = useTranslation();
  const [isSign, setIsSign] = useState(false);
  const [state, _setState] = useState({
    numPages: null,
    pageNumber: 1,
  });
  const setState = (data = {}) => {
    _setState((state) => ({
      ...state,
      ...data,
    }));
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      let urlFileLocal = data.urlFile;
      setState({
        show: true,
        soPhieu: data.soPhieu || data.soPhieu,
        formId: data.formId,
        tenBieuMau: data.tenBieuMau,
        maBieuMau: data.maBieuMau,
        maHoSo: data.maHoSo,
        urlFileLocal,
        urlOriginFile: data.formId ? urlFileLocal : "",
        nbHoSoBaId: data.nbHoSoBaId, //sử dụng để update trạng thái ký cho fileEditor
      });
      console.log(data.formId ? urlFileLocal : "");
    },
  }));

  useEffect(() => {
    if (fileSigned) {
      const blob = new Blob([new Uint8Array(fileSigned)], {
        type: "application/pdf",
      });
      setState({ urlFileLocal: window.URL.createObjectURL(blob) });
    }
  }, [fileSigned]);

  const onOk = (isOk) => () => {
    setState({
      urlFileLocal: null,
      show: false,
      soPhieu: null,
      maBieuMau: null,
    });
  };

  const handleSignDigital = () => {
    if (state.urlFileLocal) {
      const params = {
        maBieuMau: state.maBieuMau,
        maHoSo: state.maHoSo,
        fileName: fileName || "",
        sequenceNo: 1,
        soPhieu: state.soPhieu,
        type: 1,
        formId: state.formId, //sử dụng để update trạng thái ký cho fileEditor
        nbHoSoBaId: state.nbHoSoBaId, //sử dụng để update trạng thái ký cho fileEditor
      };
      fileUtils
        .urltoFile(state.urlFileLocal, "file.pdf", "application/pdf")
        .then(function (file) {
          signDigital({ ...params, file });
        });
    }
  };
  const handleSignPatient = () => {
    generateFileSignForPatient().then((s) => {
      if (refModalPatientSign.current) {
        refModalPatientSign.current.show({
          ...s?.data,
          maHoSo: state.maHoSo,
          soPhieu: state.soPhieu,
          formId: state.formId, //sử dụng để update trạng thái ký cho fileEditor
          nbHoSoBaId: state.nbHoSoBaId, //sử dụng để update trạng thái ký cho fileEditor
        });
      }
    });
  };
  const generateFileSignForPatient = () => {
    return new Promise((resolve, reject) => {
      if (state.urlFileLocal) {
        const params = {
          maBieuMau: state.maBieuMau,
          maHoSo: state.maHoSo,
          fileName: fileName || null,
          sequenceNo: 1,
          soPhieu: state.soPhieu,
          type: 1,
        };
        fileUtils
          .urltoFile(state.urlFileLocal, "file.pdf", "application/pdf")
          .then(function (file) {
            props
              .generateFileSignForPatient({ ...params, file })
              .then((s) => {
                console.log(s);
                resolve(s);
              })
              .catch((e) => {
                reject(e);
              });
          });
      } else {
        reject();
      }
    });
  };

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

  const handleClickBtnSign = () => {
    setIsSign(!isSign);
  };

  const renderPagination = (pageNumber, pages) => {
    let previousButton = (
      <span className="previous" onClick={handlePrevious}>
        <Icon type="left" />
      </span>
    );
    if (pageNumber === 1) {
      previousButton = (
        <span className="previous disabled">
          <Icon type="left" />
        </span>
      );
    }
    let nextButton = (
      <span className="next" onClick={handleNext}>
        <Icon type="right" />
      </span>
    );
    if (pageNumber === pages) {
      nextButton = (
        <span className="next disabled">
          <Icon type="right" />
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
    <ModalWrapper
      centered={true}
      visible={state.show}
      okText={t("drugDistributions.close")}
      cancelText={""}
      onCancel={onOk(false)}
      // style={{ minWidth: 1360 }}
      bodyStyle={{ padding: 0 }}
      title={state.tenBieuMau}
      footer={false}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Main>
        <Card bordered={false}>
          <Row>
            <Col lg={4} md={0} sm={0} xs={0}></Col>
            <Col lg={14} md={24} sm={24} xs={24}>
              <div className="pdf-view">
                <Spin spinning={!state.urlFileLocal}>
                  <Document
                    file={state.urlFileLocal}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onDocumentComplete={onDocumentComplete}
                    onPageComplete={onPageComplete}
                    height={1150}
                  >
                    <Page pageNumber={state.pageNumber} />
                  </Document>
                  {state.urlFileLocal && state.numPages ? (
                    <div className="action">
                      {renderPagination(state.pageNumber, state.numPages)}
                      <span className="page-description">
                        Trang {state.pageNumber}/{state.numPages}
                      </span>
                    </div>
                  ) : null}
                </Spin>
              </div>
            </Col>
            <Button
              className="btn-sign"
              icon="form"
              onClick={handleClickBtnSign}
            ></Button>
            <Col lg={6} className={`sign-wrapper ${isSign ? "actived" : ""}`}>
              <div className="sign-container">
                <h4 className="title-sign">CHỮ KÝ NGƯỜI BỆNH</h4>
                <Button
                  icon={"file-done"}
                  type={"primary"}
                  className={"item-btn text-btn"}
                  onClick={handleSignPatient}
                  disabled={!state.soPhieu}
                >
                  {"KÝ NGƯỜI BỆNH"}
                </Button>
                <h4 className="title-sign">CHỮ KỸ SỐ</h4>
                <Button
                  icon={"file-done"}
                  type={"primary"}
                  className={"item-btn text-btn"}
                  disabled={!state.soPhieu}
                  onClick={handleSignDigital}
                >
                  {"KÝ SỐ"}
                </Button>
                <h4 className="title-sign">
                  TỔNG SỐ BẢN GHI: {state.numPages} TRANG
                </h4>
                <Button
                  icon={"printer"}
                  onClick={handlePrint}
                  type={"dashed"}
                  className={"item-btn text-btn"}
                  disabled={!state.numPages}
                >
                  IN
                </Button>
              </div>
              <div className="history-list">
                <HistorySigned
                  maHoSo={state.maHoSo}
                  soPhieu={state.soPhieu}
                  // formId={state.formId}
                  tenBieuMau={state.tenBieuMau}
                  maBieuMau={state.maBieuMau}
                  urlOriginFile={state.urlOriginFile}
                  isRefresh={state.show}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </Main>
      <ModalPatientSign ref={refModalPatientSign} />
    </ModalWrapper>
  );
};

const mapState = (state) => ({
  fileSigned: state.signer.fileSigned,
  fileName: state.signer.fileName,
});
const mapDispatch = ({
  signer: { generateFileSignForPatient, signDigital },
}) => ({
  generateFileSignForPatient,
  signDigital,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  forwardRef(ModalSignPdf)
);
