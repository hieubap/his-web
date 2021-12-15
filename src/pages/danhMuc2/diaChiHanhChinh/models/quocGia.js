// import { Checkbox, Input } from "antd";
// import { HeaderSearch, Select } from "components";
// import { HIEU_LUC } from "constants/index";
// import React from "react";
// import { QuocGia } from "../components";

// export default (item) => {
//   console.log("render render ...");
//   return {
//     ...item,
//     tab: "Quốc gia",
//     getColumns: ({ onClickSort, onSearchInput, sortData }) => [
//       {
//         title: <HeaderSearch title="STT" />,
//         width: 7,
//         dataIndex: "index",
//         key: "index",
//         align: "center",
//       },
//       {
//         title: (
//           <HeaderSearch
//             title="Mã quốc gia"
//             sort_key="ma"
//             onClickSort={onClickSort}
//             dataSort={sortData.ma || 0}
//             search={
//               <Input
//                 placeholder="Tìm mã"
//                 onChange={(e) => {
//                   debugger;
//                   onSearchInput(e.target.value, "ma");
//                 }}
//               />
//             }
//           />
//         ),
//         width: 14,
//         dataIndex: "ma",
//         key: "ma",
//       },
//       {
//         title: (
//           <HeaderSearch
//             title="Tên quốc gia"
//             sort_key="ten"
//             onClickSort={onClickSort}
//             dataSort={sortData.ten || 0}
//             search={
//               <Input
//                 placeholder="Tìm tên quốc gia"
//                 onChange={(e) => {
//                   debugger;
//                   onSearchInput(e.target.value, "ten");
//                 }}
//               />
//             }
//           />
//         ),
//         width: 14,
//         dataIndex: "ten",
//         key: "ten",
//       },
//       {
//         title: (
//           <HeaderSearch
//             title="Có hiệu lực"
//             sort_key="active"
//             onClickSort={onClickSort}
//             dataSort={sortData.active || 0}
//             searchSelect={
//               <Select
//                 defaultValue=""
//                 data={HIEU_LUC}
//                 placeholder="Chọn hiệu lực"
//                 onChange={(value) => {
//                   debugger;
//                   onSearchInput(value, "active");
//                 }}
//               />
//             }
//           />
//         ),
//         width: 10,
//         dataIndex: "active",
//         key: "active",
//         align: "center",
//         render: (item) => {
//           return <Checkbox checked={item} onClick={() => {}} />;
//         },
//       },
//     ],
//     table: <QuocGia />,
//   };
// };
