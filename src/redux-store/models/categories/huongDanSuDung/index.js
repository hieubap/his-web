import fetchProvider from "data-access/categories/dm-huong-dan-su-dung-provider";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "hdsd",
    title: "Hướng dẫn sử dụng",
  }),
};
