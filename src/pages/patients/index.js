import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List, Card, Icon, Avatar } from "antd";
import { Main } from "./styled";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchPatient from "components/SearchPatient";
import Pagination from "components/Pagination";
import Page from "components/common/Page";
import PageHeader from "components/common/PageHeader";
import { convertObjectToParams } from "utils";

const PatientList = ({
  patients,
  isLoadingSearchPatients,
  selectPatient,
  updatePatientDocument,
  ...props
}) => {
  const history = useHistory();
  const { search: searchParams } = useLocation();
  const [selectedIdx, setSelectedId] = useState(0);
  const { t } = useTranslation();
  const params = useParams();
  const [state, _setState] = useState({
    search: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    const queryString = decodeURIComponent(searchParams);
    const urlParams = new URLSearchParams(queryString);
    const { size, page, timKiem, phongId, khoaId } = Object.fromEntries(
      urlParams
    );

    onSearch({
      size: size || props.size || 10,
      page: page || props.page || 0,
      timKiem: timKiem || props.timKiem || "",
      phongId: phongId || props.phongId || "",
      khoaId: khoaId || props.khoaId || "",
    });
    props.setCurrentFuction("TREATMENT");
    props.clearCurrentFile();
  }, []);

  useEffect(() => {
    if (params.patientDocument) {
      const obj =
        patients.find((p) => p.maHoSo === params.patientDocument) || {};

      setSelectedId(obj.id);
    } else {
      if (patients.length > 0) {
        setSelectedId(patients[0].id);
        selectPatient(patients[0]);
      }
    }
  }, [patients]);

  useEffect(() => {
    updatePatientDocument(params.patientDocument);
  }, [params.patientDocument]);

  const onChangePage = (page) => {
    const queryString = decodeURIComponent(searchParams);
    const urlParams = new URLSearchParams(queryString);
    const allParams = {
      ...Object.fromEntries(urlParams),
      page: page - 1,
    };
    changeUrl(allParams);

    props.onSearch({
      page: page - 1,
      timKiem: allParams.timKiem || "",
      inPatient: true,
      patientState: 60,
      loadDanhSachKhoa: true,
    });
  };

  const selectRow = (item) => () => {
    setSelectedId(item.id);
    selectPatient(item);
  };

  const onSelectPatient = (item) => () => {
    selectPatient(item);
    props.openPatientStreatment({ patientDocument: item.maHoSo, history });
  };

  const onShowSizeChange = (current, size) => {
    const queryString = decodeURIComponent(searchParams);
    const urlParams = new URLSearchParams(queryString);
    const allParams = {
      ...Object.fromEntries(urlParams),
      size,
    };
    changeUrl(allParams);

    allParams.page = parseInt(allParams.page || 1);
    props.onSizeChange({
      size,
      timKiem: allParams.timKiem || "",
      inPatient: true,
      patientState: 60,
      loadDanhSachKhoa: true,
    });
  };
  const changeUrl = (customParams = {}) => {
    history.push(`/app/patient-list?${convertObjectToParams(customParams)}`);
  };

  const onSearch = ({
    khoaId = props.khoaId,
    timKiem = props.timKiem,
    phongId = props.phongId,
    page = props.page,
    size = props.size,
    inPatient = true,
    patientState = 60,
    loadDanhSachKhoa = true,
    ...params
  }) => {
    page = parseInt(page);
    changeUrl({
      khoaId,
      timKiem,
      phongId,
      page,
      size,
    });
    props.onSearch({
      khoaId,
      timKiem,
      phongId,
      page,
      size,
      inPatient,
      patientState,
      loadDanhSachKhoa,
    });
  };
  return (
    <Page
      header={
        <PageHeader
          leftArea={t("patient.list")}
          // rightArea={
          //   <Button type={"primary"} className="btn-add" onClick={showAddNew()}>
          //     <Icon component={AddNewIcon} />
          //     Thêm biểu mẫu
          //   </Button>
          // }
        />
      }
    >
      <Main>
        <SearchPatient onSearch={onSearch} />
        <List
          size={"small"}
          itemLayout="horizontal"
          dataSource={patients}
          loading={isLoadingSearchPatients}
          className={"patient-list"}
          renderItem={(item, index) => (
            <List.Item
              onClick={selectRow(item)}
              onDoubleClick={onSelectPatient(item)}
              actions={[<Icon type={"more"} />]}
              className={`patient-item ${
                selectedIdx === item.id ? "selected-item" : ""
              }`}
            >
              <List.Item.Meta
                className="col-patient-detail"
                avatar={<Avatar icon={"user"} />}
                title={
                  <div className="patient-info">
                    <div className="patient-name">
                      <span className={"item-num"}>{`${
                        props.page * props.size + index + 1
                      }. `}</span>
                      {item["tenNb"]}
                    </div>
                    <div className="patient-gender">
                      {`${props.windowWidth > 720 ? " - " : ""}Giới tính: ${
                        item["gioiTinh"]
                      }, ${item["tuoi"]} tuổi`}
                    </div>
                  </div>
                }
                description={
                  <div>
                    <span>
                      {`${item.phong !== null ? item.phong : ""}`}
                      {`- Giường ${item.giuong !== null ? item.giuong : ""}`}
                    </span>
                  </div>
                }
              />

              <div className="col-patient-document">
                <div>
                  <span>{"Mã HS: "}</span>
                  <span style={{ fontWeight: 600 }}>{item["maHoSo"]}</span>
                </div>
                <div>
                  <span>{"Mã BA: "}</span>
                  <span style={{ fontWeight: 600 }}>{item["maBenhAn"]}</span>
                </div>
              </div>
            </List.Item>
          )}
        />
        <Pagination
          current={props.page + 1}
          total={props.total}
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          pageSize={props.size || 10}
        />
      </Main>
      {/* <FormCatalog showAddNew={showAddNew} />
      <ModalAddForm wrappedComponentRef={refAddForm} /> */}
    </Page>
    // <Main>
    //   <Card bordered={false} size={"small"}>
    //     <h4 className="title-list">{t("patient.list")}</h4>
    //     <SearchPatient />

    //     <List
    //       size={"small"}
    //       itemLayout="horizontal"
    //       dataSource={patients}
    //       loading={isLoadingSearchPatients}
    //       className={"patient-list"}
    //       renderItem={(item, index) => (
    //         <List.Item
    //           onClick={selectRow(item)}
    //           onDoubleClick={onSelectPatient(item)}
    //           actions={[<Icon type={"more"} />]}
    //           className={`patient-item ${
    //             selectedIdx === item.id ? "selected-item" : ""
    //           }`}
    //         >
    //           <List.Item.Meta
    //             className="col-patient-detail"
    //             avatar={<Avatar icon={"user"} />}
    //             title={
    //               <div className="patient-info">
    //                 <div className="patient-name">
    //                   <span className={"item-num"}>{`${
    //                     props.page * props.size + index + 1
    //                   }. `}</span>
    //                   {item["tenNb"]}
    //                 </div>
    //                 <div className="patient-gender">
    //                   {`${props.windowWidth > 720 ? " - " : ""}Giới tính: ${
    //                     item["gioiTinh"]
    //                   }, ${item["tuoi"]} tuổi`}
    //                 </div>
    //               </div>
    //             }
    //             description={
    //               <div>
    //                 <span>
    //                   {`${item.phong !== null ? item.phong : ""}`}
    //                   {`- Giường ${item.giuong !== null ? item.giuong : ""}`}
    //                 </span>
    //               </div>
    //             }
    //           />

    //           <div className="col-patient-document">
    //             <div>
    //               <span>{"Mã HS: "}</span>
    //               <span style={{ fontWeight: 600 }}>{item["maHoSo"]}</span>
    //             </div>
    //             <div>
    //               <span>{"Mã BA: "}</span>
    //               <span style={{ fontWeight: 600 }}>{item["maBenhAn"]}</span>
    //             </div>
    //           </div>
    //         </List.Item>
    //       )}
    //     />

    //     <Pagination
    //       current={props.page + 1}
    //       total={props.total}
    //       onChange={onChangePage}
    //       onShowSizeChange={onShowSizeChange}
    //     />
    //   </Card>
    // </Main>
  );
};

const mapState = (state) => ({
  common: state.common,
  isLoadingSearchPatients: state.patient.isLoadingSearchPatients,
  patients: state.patient.patients,
  patientHistory: state.patient.patientHistory,
  total: state.patient.total,
  page: state.patient.page,
  timKiem: state.patient.timKiem,
  phongId: state.patient.phongId,
  khoaId: state.patient.khoaId,
  size: state.patient.size,
  windowWidth: state.application.width,
});

const mapDispatch = ({
  patient: { selectPatient, updatePatientDocument, onSearch, onSizeChange },
  application: { openPatientStreatment, setCurrentFuction },
  files: { clearCurrentFile },
}) => ({
  selectPatient,
  updatePatientDocument,
  onSearch,
  onSizeChange,
  openPatientStreatment,
  setCurrentFuction,
  clearCurrentFile,
});

export default connect(mapState, mapDispatch)(PatientList);
