import fetchProvider from "data-access/categories/dm-dich-vu-ngoai-dieu-tri";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "dichVuNgoaiDieuTri",
    title: "Dịch vụ ngoài điều trị",
  }),
};
