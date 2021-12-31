import danhSachDichVuKhoProvider from "data-access/kho/danh-sach-dich-vu-kho-provider.js";
import phieuNhapXuatChiTietProvider from "data-access/kho/phieu-nhap-xuat-chi-tiet-provieder.js";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
    state: {
        cachXem: "1",
        listDanhSachDichVuKhoChiTiet: [],
        page: PAGE_DEFAULT,
        size: PAGE_SIZE,
        dataSearch: {},
        totalElements: null,
        dataSortColumn: {},
        selectedItem: null,
        listPhieuNhapChiTiet: []
    },
    reducers: {
        updateData(state, payload = {}) {
            return { ...state, ...payload };
        },
    },
    effects: (dispatch) => ({
        onSizeChange: ({ dataSearch, ...rest }) => {
            dispatch.danhSachDichVuKhoChiTiet.updateData({
                page: 0,
                // dataSearch,
                ...rest,
            });
            dispatch.danhSachDichVuKhoChiTiet.getListDanhSachDichVuKhoChiTiet({ rest });
        },
        searchByParams: ({ page = 0, ...payload }, state) => {
            const obj = {
                ...payload
            }
            dispatch.danhSachDichVuKhoChiTiet.updateData({
                page: 0,
                dataSearch: { ...state?.danhSachDichVuKhoChiTiet?.dataSearch, ...payload },
                ...obj,
            });
            dispatch.danhSachDichVuKhoChiTiet.search({ ...obj })
        },
        search: ({ page = 0, dataSortColumn, ...payload }, state) => {
            let size = payload.size || state.danhSachDichVuKhoChiTiet.size || 10;
            const sort = combineSort(
                dataSortColumn || state.danhSachDichVuKhoChiTiet.dataSortColumn || {}
            );
            const dataSearch = payload.dataSearch || state.danhSachDichVuKhoChiTiet.dataSearch || {};
            const theoLo = payload.theoLo
            danhSachDichVuKhoProvider
                // .search({ page, size, sort,theoLo, ...dataSearch })
                .search({ page, size, sort, theoLo, ...dataSearch, ...payload })
                .then((s) => {
                    const listCustom = (s?.data || []).map((item, index) => {
                        item.index = page * size + index + 1;
                        return item;
                    })
                    dispatch.danhSachDichVuKhoChiTiet.updateData({
                        listDanhSachDichVuKhoChiTiet: listCustom,
                        totalElements: s?.totalElements || 0,
                        page,
                        size,
                    });
                })
                .catch((e) => {
                    message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
                });
        },
        getListDanhSachDichVuKhoChiTiet: ({ page = 0, ...payload }, state) => {
            let size = payload.size || state.danhSachDichVuKhoChiTiet.size || 10;
            const sort = combineSort(
                payload.dataSortColumn || state.danhSachDichVuKhoChiTiet.dataSortColumn || {}
            );
            // const dataSearch = payload.dataSearch || state.danhSachDichVuKhoChiTiet.dataSearch || {};
            const theoLo = payload.theoLo
            danhSachDichVuKhoProvider
                // .search({ page, size, sort,theoLo, ...dataSearch })
                .search({ page, size, sort, theoLo })
                .then((s) => {
                    const listCustom = (s?.data || []).map((item, index) => {
                        item.index = page * size + index + 1;
                        return item;
                    })
                    dispatch.danhSachDichVuKhoChiTiet.updateData({
                        listDanhSachDichVuKhoChiTiet: listCustom,
                        totalElements: s?.totalElements || 0,
                        page,
                        size,
                    });
                })
                .catch((e) => {
                    message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
                });
        },
        getChiTietDanhSachDichVuKhoChiTiet: ({ page = 0, ...payload }, state) => {
            console.log('payload: ', payload);
            let size = payload.size || state.danhSachDichVuKhoChiTiet.size || 10;
            const sort = combineSort(
                payload.dataSortColumn || state.danhSachDichVuKhoChiTiet.dataSortColumn || {}
            );
            // const dataSearch = payload.dataSearch || state.danhSachDichVuKhoChiTiet.dataSearch || {};
            const id = payload.id
            danhSachDichVuKhoProvider
                // .search({ page, size, sort,theoLo, ...dataSearch })
                .search({ page, size, sort, khoId: id })
                .then((s) => {
                    console.log('s: ', s);
                    const listCustom = (s?.data || []).find((item, index) => {
                        item.index = page * size + index + 1;
                        return item;
                    })
                    console.log('listCustom: ', listCustom);
                    dispatch.danhSachDichVuKhoChiTiet.updateData({
                        selectedItem: listCustom,
                        // totalElements: s?.totalElements || 0,
                        // page,
                        // size,
                    });
                })
                .catch((e) => {
                    message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
                });
        },
        onSortChange: ({ theoLo, ...payload }, state) => {
            const dataSortColumn = {
                ...state.danhSachDichVuKhoChiTiet.dataSortColumn,
                ...payload,
            };
            console.log('dataSortColumn: ', dataSortColumn);
            dispatch.danhSachDichVuKhoChiTiet.updateData({
                page: 0,
                dataSortColumn,
            });
            dispatch.danhSachDichVuKhoChiTiet.getListPhieuNhapXuatChiTiet({
                page: 0,
                dataSortColumn,
                theoLo
            });
        },
        getListPhieuNhapXuatChiTiet: ({ page = 0, ...payload }, state) => {
            let size = payload.size || state.danhSachDichVuKhoChiTiet.size || 10;
            const sort = combineSort(
                payload.dataSortColumn || state.danhSachDichVuKhoChiTiet.dataSortColumn || {}
            );
            const dichVuId = payload.dichVuId || state.danhSachDichVuKhoChiTiet.dichVuId || null;
            const khoId = payload.khoId || state.danhSachDichVuKhoChiTiet.khoId || null;
            const nhapKho = payload.nhapKho || state.danhSachDichVuKhoChiTiet.nhapKho || null;
            const trangThai = payload.trangThai || state.danhSachDichVuKhoChiTiet.trangThai || null;
            if (dichVuId && khoId) {
                dispatch.danhSachDichVuKhoChiTiet.updateData({
                    dichVuId,
                    khoId,
                    nhapKho,
                    trangThai
                })
            }
            const dataSearch =
                payload.dataSearch || state.danhSachDichVuKhoChiTiet.dataSearch || {};

            return new Promise((resolve, reject) => {
                phieuNhapXuatChiTietProvider
                    .searchTongHop({ trangThai, nhapKho, dichVuId, khoId, page, size, sort, ...dataSearch })
                    .then((s) => {
                        let listPhieuNhapChiTiet = (s?.data || []).map((item, index) => {
                            item.index = page * size + index + 1;
                            return item;
                        });
                        dispatch.danhSachDichVuKhoChiTiet.updateData({
                            listPhieuNhapChiTiet,
                            totalElements: s?.totalElements || 0,
                            page,
                            size,
                        });
                        resolve(listPhieuNhapChiTiet);
                    })
                    .catch((e) => {
                        message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
                        reject(e);
                    });
            });
        },
    }),
};
