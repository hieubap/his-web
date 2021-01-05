import CNSIcon from "assets/svg/funCns.svg";
import HSBAIcon from "assets/svg/funHsba.svg";
import PTTTIcon from "assets/svg/funPt.svg";
import YlenhIcon from "assets/svg/funYlenh.svg";
import KBCIcon from "assets/svg/funKcb.svg";
import SCANIcon from "assets/svg/funScan.svg";

export const applications = [
  {
    name: "CNS",
    link: "/app/vital-signs",
    icon: CNSIcon,
    display: ["110", "DHY", "MAT", "SPAUL", "DKTH", "MEDI+"],
  },
  {
    name: "KCB",
    href: process.env.REACT_APP_HIS_URL,
    icon: KBCIcon,
    display: ["MAT", "DHY", "110", "SPAUL", "DKTH", "MEDI+"],
  },
  {
    name: "HSBA",
    link: "/app/files",
    icon: HSBAIcon,
    display: ["MAT", "DHY", "110", "SPAUL", "DKTH", "MEDI+"],
  },
  {
    name: "SCAN",
    icon: SCANIcon,
    display: ["MAT", "DHY", "110", "SPAUL", "DKTH", "MEDI+"],
  },
  {
    name: "PTTT",
    link: "/app/phau-thuat-thu-thuat",
    icon: PTTTIcon,
    display: [],
  },
  { name: "Y lệnh", link: "/app/y-lenh", icon: YlenhIcon, display: [] },
];
