import React, { Suspense } from "react";

import PageWrapper from "components/PageWrapper";

const Creation = React.lazy(() => import("./config"));
const PatientList = React.lazy(() => import("./patients"));
const Forms = React.lazy(() => import("./files"));
const CreateDoc = React.lazy(() => import("./createDoc"));
const PatientRoomMangement = React.lazy(() => import("./patientRoomMangement"));
const Documents = React.lazy(() => import("pages/documents"));
const Permission = React.lazy(() => import("./permission"));
const Role = React.lazy(() => import("./roles"));
const VitalSigns = React.lazy(() => import("./vital-signs"));
const DrugDistributions = React.lazy(() =>
  import("./drug/drug-allocation/distribution")
);
const DrugAllocation = React.lazy(() =>
  import("./drug/drug-allocation/allocation")
);
const Therapy = React.lazy(() => import("./therapy"));
const VitalSignsPrint = React.lazy(() =>
  import("./vital-signs/VitalSignsPrint")
);
const VitalSignsCategory = React.lazy(() => import("./categories/vital-signs"));
const FormCatalog = React.lazy(() => import("./formCatalog"));
const MedicalRecord = React.lazy(() => import("./medicalRecord"));
const Scan = React.lazy(() => import("./scan"));
const Preview = React.lazy(() => import("./preview"));
const DrugReportSummary = React.lazy(() => import("./drug/report/summary"));
const DrugReportDetail = React.lazy(() => import("./drug/report/detail"));

const Page = (Component, roles = []) => (props) => {
  return (
    <Suspense fallback={<div>{"loading..."}</div>}>
      <PageWrapper accessRoles={roles}>
        <Component {...props} />
      </PageWrapper>
    </Suspense>
  );
};

function vitalSignsPrint(props) {
  return Page(VitalSignsPrint, [])(props);
}

const therapyPages = {
  files: {
    component: Page(Forms, []),
    accessRoles: [],
    path: "/app/files/:patientDocument",
    exact: false,
  },
  patients: {
    component: Page(PatientList, []),
    accessRoles: [],
    path: "/app/patient-list",
    exact: true,
  },
  patientFocus: {
    component: Page(PatientList, []),
    accessRoles: [],
    path: "/app/patient-list/:patientDocument",
    exact: false,
  },
  vitalSigns: {
    component: Page(VitalSigns, []),
    accessRoles: [],
    path: "/app/vital-signs/:patientDocument",
    exact: false,
  },
};

const pages = {
  creation: {
    component: Page(Creation, []),
    accessRoles: [],
    path: "/config/:formId",
    exact: true,
  },
  createDoc: {
    component: Page(CreateDoc, []),
    accessRoles: [],
    path: "/createDoc",
    exact: true,
  },
  drugDistributions: {
    component: Page(DrugDistributions, []),
    accessRoles: [],
    path: "/drug-distribution",
    exact: false,
  },
  clinicManagement: {
    component: Page(PatientRoomMangement, []),
    accessRoles: [],
    path: "/patientRoom",
    exact: false,
  },
  documents: {
    component: Page(Documents, []),
    accessRoles: [],
    path: "/config",
    exact: true,
  },
  permission: {
    component: Page(Permission, []),
    accessRoles: [],
    path: "/permission",
    exact: false,
  },
  role: {
    component: Page(Role, []),
    accessRoles: [],
    path: "/roles",
    exact: false,
  },
  therapy: {
    component: Page(Therapy, []),
    accessRoles: [],
    path: "/app",
    exact: false,
  },
  drugAllocation: {
    component: Page(DrugAllocation, []),
    accessRoles: [],
    path: "/drug-allocation",
    exact: false,
  },
  vitalSignsCategory: {
    component: Page(VitalSignsCategory, []),
    accessRoles: [],
    path: "/servival-index",
    exact: false,
  },
  formCatalog: {
    component: Page(FormCatalog, ["ROLE_IsofhAdmin", "ROLE_IsofhUser"]),
    accessRoles: ["ROLE_IsofhAdmin", "ROLE_IsofhUser"],
    path: "/form-catalog",
    exact: false,
  },
  medicalRecord: {
    component: Page(MedicalRecord, ["ROLE_IsofhAdmin", "ROLE_IsofhUser"]),
    accessRoles: ["ROLE_IsofhAdmin", "ROLE_IsofhUser"],
    path: "/medical-record",
    exact: false,
  },
  scan: {
    component: Page(Scan, []),
    accessRoles: [],
    path: "/scan",
    exact: false,
  },
  preview: {
    component: Page(Preview, []),
    accessRoles: [],
    path: "/preview",
    exact: false,
  },
  drug_summary: {
    component: Page(DrugReportSummary, []),
    accessRoles: [],
    path: "/drug/report-summary",
    exact: false,
  },
  drug_detail: {
    component: Page(DrugReportDetail, []),
    accessRoles: [],
    path: "/drug/report-detail",
    exact: false,
  },
};

export { pages, therapyPages, vitalSignsPrint };
