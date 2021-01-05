import CategoryIcon from "assets/svg/category.svg";
import MedicineIcon from "assets/svg/medicine.svg";
import TreatmentIcon from "assets/svg/menu/treatment.svg";
import SCANIcon from "assets/svg/funScan.svg";
export const menu = [
  {
    name: "menu.treatment",
    link: "/app/patient-list",
    icon: TreatmentIcon,
  },
  {
    name: "menu.manageMedicine",
    icon: MedicineIcon,
    menus: [
      {
        name: "menu.medicinePlan",
        link: "/drug-distribution",
      },
      {
        name: "menu.medicineDistribution",
        link: "/drug-allocation",
      },
      {
        name: "menu.medicineReport",
        menus: [
          {
            name: "menu.medicineReport1",
            link: "/drug/report-summary",
          },
          {
            name: "menu.medicineReport2",
            link: "/drug/report-detail",
          },
        ],
      },
    ],
  },
  {
    icon: CategoryIcon,
    name: "menu.categories",
    menus: [
      {
        name: "menu.lifePoint",
        link: "/servival-index",
      },
      {
        name: "menu.formCategory",
        link: "/form-catalog",
        accessRoles: ["ROLE_IsofhAdmin", "ROLE_IsofhUser"],
      },
      {
        name: "menu.manageMedicalRecord",
        link: "/medical-record",
        accessRoles: ["ROLE_IsofhAdmin", "ROLE_IsofhUser"],
      },
    ],
  },
  {
    name: "Scan",
    link: "/scan",
    icon: SCANIcon,
    // iconType: "scan",
  },
  {
    icon: "",
    iconType: "setting",
    name: "menu.config",
    menus: [
      {
        name: "menu.room",
        link: "/patientRoom",
      },
    ],
  },
];

export const checkRole = (accessRoles, roles) => {
  if (!accessRoles || accessRoles.length < 1) {
    return true;
  }

  return (
    accessRoles.map((rA) => roles.includes(rA)).filter((b) => !b).length < 1
  );
};
