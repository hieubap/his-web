import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import dichVuProvider from "data-access/dich-vu-provider";
import dichVuXNProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvCLSProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import { combineSort } from "utils";
import { groupBy } from "lodash";
import printProvider from "data-access/print-provider";

export default {
  state: {
    elementScrollingPdfKey: 1,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchDvTiepDon: async (payload, state) => {
      let userId = state.auth.auth?.id;
      let listDvKham = await cacheUtils.read(
        userId,
        `DATA_DICH_VU_KHAM_${payload?.loaiDichVu}`,
        [],
        false
      );
      dispatch.tiepDonDichVu.updateData({ listDvKham });
      return new Promise((resolve, reject) => {
        dichVuProvider
          .searchDvTiepDon(payload)
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(listDvKham)) {
                dispatch.tiepDonDichVu.updateData({ listDvKham: data });
                cacheUtils.save(
                  userId,
                  `DATA_DICH_VU_KHAM_${payload?.loaiDichVu}`,
                  data,
                  false
                );
              }
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    keDichVuKham: ({ data }, state) => {
      const dataKham = data.filter((item) => item.nbDichVu?.loaiDichVu === 10);
      const dataXN = data.filter((item) => item.nbDichVu?.loaiDichVu === 20);
      const dataCLS = data.filter((item) =>
        [30, 40].includes(item.nbDichVu?.loaiDichVu)
      );

      const thens = (resolve, reject) => (s) => {
        if (s.code == 0) {
          const errors = s.data
            .filter((item) => item.code !== 0 && !item.id)
            .map((item) => item.message)
            .filter((item, index, self) => self.indexOf(item) == index);
          if (errors.length)
            resolve({
              code: 1,
              data: s.data.filter((item) => item.id),
              message: errors,
            });
          else {
            resolve({ code: 0, data: [] });
          }
        }
        resolve({
          code: 1,
          message: [s.message],
          data: [],
        });
      };

      const catchs = (resolve, reject) => (e) => {
        resolve({ code: 1, message: [e.message], data: [] });
      };
      const chiDinhKham = dataKham.length
        ? new Promise((resolve, reject) => {
            return nbDvKhamProvider
              .chiDinhDVKham(dataKham)
              .then(thens(resolve, reject))
              .catch(catchs(resolve, reject));
          })
        : { code: 0, data: [] };

      const chiDinhXN = dataXN.length
        ? new Promise((resolve, reject) => {
            return dichVuXNProvider
              .chiDinhXN(dataXN)
              .then(thens(resolve, reject))
              .catch(catchs(resolve, reject));
          })
        : { code: 0, data: [] };

      const chiDinhCLS = dataCLS.length
        ? new Promise((resolve, reject) => {
            return nbDvCLSProvider
              .chiDinhCLS(dataCLS)
              .then(thens(resolve, reject))
              .catch(catchs(resolve, reject));
          })
        : { code: 0, data: [] };

      return Promise.all([chiDinhKham, chiDinhXN, chiDinhCLS]);
    },
    searchNbDvKyThuat: ({ nbDotDieuTriId, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        const currentNbDotDieuTriId = state.tiepDonDichVu.currentNbDotDieuTriId; //lấy thông tin nbdotdieutri trong redux
        if (currentNbDotDieuTriId == nbDotDieuTriId) {
          //check nếu trùng với thông tin đang request thì bỏ qua, không load ds dich vu ra nữa
          //muc đích là để hiển thị các dữ liệu caching trước đấy chưa được submit
          resolve(true);
          return;
        }
        dichVuProvider
          .searchNbDvKyThuat({ nbDotDieuTriId, ...rest })
          .then((s) => {
            if (s?.code === 0) {
              let data = s.data || [];
              const serviceSelected = groupBy(data, "loaiDichVu"); //gom nhóm theo loại dịch vụ
              const promises = Object.keys(serviceSelected).map(
                //tao list promise theo loại dịch vụ
                (loaiDichVu) => {
                  return new Promise((resolve, reject) => {
                    dispatch.tiepDonDichVu
                      .tamTinhTien({
                        //voi mỗi loại dịch vụ thì gọi api tinh tien
                        data: serviceSelected[loaiDichVu].map((dv) => {
                          //{"data":[{"nbDotDieuTriId":"1255","nbDichVu":{"dichVuId":57,"soLuong":1,"loaiDichVu":10}}],"loaiDichVu":10}
                          //generate body api tam tính tiền theo form phía trên
                          return {
                            nbDotDieuTriId:
                              serviceSelected[loaiDichVu][0].nbDotDieuTriId,
                            nbDichVu: {
                              dichVuId: dv.dichVuId,
                              soLuong: 1,
                              loaiDichVu: dv.loaiDichVu,
                            },
                          };
                        }),
                        loaiDichVu: parseInt(loaiDichVu),
                      })
                      .then((s) => {
                        resolve(s.data || []);
                      })
                      .catch((e) => {
                        resolve([]);
                      });
                  });
                }
              );
              Promise.all(promises)
                .then((s) => {
                  //sau khi gọi xong tất cả api tạm tính tiền
                  data = data.map((item) => {
                    //duyệt qua danh sách dịch vụ đã chọn
                    s.forEach((tts) => {
                      //tìm tính tiền tương ứng với dịch vụ
                      const tt = tts.find((y) => {
                        return y.nbDichVu?.dichVuId == item.dichVuId;
                      });
                      //cập nhật giá trị tiền vào dịch vụ
                      item.tinhTien = tt?.nbDichVu || {};
                    });
                    item.tenPhong = item.tenPhongThucHien;
                    return item;
                  });
                  //dispart action
                  dispatch.tiepDonDichVu.updateData({
                    listDvChoose: data,
                    currentNbDotDieuTriId: nbDotDieuTriId, //cập nhật lại thong tin nbdotdieutriId
                  });
                  resolve(s);
                })
                .catch((e) => {
                  dispatch.tiepDonDichVu.updateData({
                    listDvChoose: [],
                    currentNbDotDieuTriId: nbDotDieuTriId, //cập nhật lại thong tin nbdotdieutriId
                  });
                  reject(e);
                });
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    tamTinhTien: (payload, state) => {
      return new Promise((resolve, reject) => {
        const { data, loaiDichVu } = payload;
        if (loaiDichVu === 10)
          nbDvKhamProvider
            .tamTinhTienDVKham(data)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        if (loaiDichVu === 20)
          dichVuXNProvider
            .tamTinhTienDVXN(data)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        if (loaiDichVu === 30)
          nbDvCLSProvider
            .tamTinhTienDVCLS(data)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
      });
    },
    deleteDvKyThuat: ({ id, loaiDichVu }, state) => {
      return new Promise((resolve, reject) => {
        if (loaiDichVu === 10) {
          nbDvKhamProvider
            .onDeleteDichVu({ id })
            .then((s) => {
              if (s.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        } else if (loaiDichVu === 20) {
          dichVuXNProvider
            .onDeleteDichVu({ id })
            .then((s) => {
              if (s.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        } else if (loaiDichVu === 30) {
          nbDvCLSProvider
            .onDeleteDichVu({ id })
            .then((s) => {
              if (s.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        }
      });
    },
    getPhieuKhamBenh: (id, state, payload) => {
      const nbTiepTheoId = state.goiSo.nbTiepTheo?.id;
      return new Promise((resolve, reject) => {
        dichVuProvider
          .getPhieuKhamBenh(id, payload)
          .then((s) => {
            if (s?.code === 0) {
              printProvider
                .printPdf(s.data)
                .then(() => {
                  console.info("Print success");
                })
                .catch((err) => {
                  console.error("Print fail", err);
                });
              dispatch.tiepDon.resetData({}); //clear form tiếp đón
              if (state.goiSo.quayTiepDonId)
                //nếu đang chọn quầy tiếp đón thì get nbTiếp Theo
                dispatch.goiSo.getNbTiepTheo({
                  id: state.goiSo.quayTiepDonId,
                  data: {
                    nbTiepTheoId: nbTiepTheoId,
                  },
                  isLoadNguoiBenhTiepDon: true,
                });
              dispatch.tiepDonDichVu.updateData({
                listDvChoose: [],
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    search: async ({ loaiDichVu, page = 0, size, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page == 0) {
        list = await cacheUtils.read(
          userId,
          `DATA_DICH_VU_${loaiDichVu}`,
          [],
          false
        );
        dispatch.dichVu.updateData({ listService: list });
      }
      return new Promise((resolve, reject) => {
        dichVuProvider
          .search({
            loaiDichVu,
            page,
            size: size || 99999,
            sort: "ten,asc",
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((item, index) => {
                const { ma, ten, id } = item;
                return {
                  ma,
                  ten,
                  loaiDichVu,
                  id,
                };
              });
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.dichVu.updateData({ listService: data });
                if (!size && page == 0)
                  cacheUtils.save(
                    userId,
                    `DATA_DICH_VU_${loaiDichVu}`,
                    data,
                    false
                  );
              }
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    onSizeChange: ({ size, loaiDichVu }, state) => {
      dispatch.dichVu.updateData({
        size,
        page: 0,
      });
      dispatch.dichVu.onSearch({ page: 0, size, loaiDichVu });
    },
    onSearch: ({ page = 0, loaiDichVu, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dichVu.updateData(newState);
      let size = payload.size || state.dichVu.size || 10;
      // let page = state.dichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.dichVu.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.dichVu.dataSearch || {};

      dichVuProvider
        .searchDichVuKyThuat({
          page,
          size,
          sort,
          loaiDichVu,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dichVu.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dichVu.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state, loaiDichVu) => {
      const dataSortColumn = {
        ...state.dichVu.dataSortColumn,
        ...payload,
      };
      dispatch.dichVu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dichVu.onSearch({
        page: 0,
        loaiDichVu,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state, loaiDichVu) => {
      const dataSearch = {
        ...(state.dichVu.dataSearch || {}),
        ...payload,
      };
      dispatch.dichVu.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dichVu.onSearch({
        page: 0,
        loaiDichVu,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state, loaiDichVu) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dichVuProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");

                let data = (state.dichVu.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.dichVu.updateData({
                  currentItem: null,
                  listData: data,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            dichVuProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu dịch vụ!");
                dispatch.dichVu.updateData({ currentItem: null });
                dispatch.dichVu.onSearch({
                  page: 0,
                  loaiDichVu,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    onDelete: async (payload, state) => {
      const {
        dichVu: { page, size },
      } = state;
      const response = await dichVuProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.dichVu.getListServicesPack({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getCamKetDieuTriCovid: (id) => {
      return new Promise((resolve, reject) => {
        dichVuProvider
          .getCamKetDieuTriCovid(id)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getPhieuIn: (payload = {}, state) => {
      const { nbDotDieuTriId } = payload;
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getPhieuIn({
            nbDotDieuTriId,
            maManHinh: "002",
            maViTri: "00201",
          })
          .then((s) => {
            const data = s.data || [];
            const promises = [];
            data.forEach((item) => {
              switch (item.ma) {
                case "P006":
                  promises.push(
                    dichVuProvider.getPhieuGiuTheBHYT(nbDotDieuTriId)
                  );
                  break;
                case "P007":
                  promises.push(
                    dichVuProvider.getCamKetDieuTriCovid(nbDotDieuTriId)
                  );
                  break;
                case "P008":
                  promises.push(
                    dichVuProvider.getVongTayNguoiBenh(nbDotDieuTriId)
                  );
                  break;
                case "P009":
                  promises.push(
                    dichVuProvider.getPhieuKhamBenh(nbDotDieuTriId, {
                      chiDinhTuLoaiDichVu: 200,
                    })
                  );
                  break;
                case "P010":
                  promises.push(
                    dichVuProvider.getPhieuXetNghiem(nbDotDieuTriId, {
                      chiDinhTuLoaiDichVu: 200,
                    })
                  );
                  break;
                case "P011":
                  promises.push(
                    dichVuProvider.getPhieuCdha(nbDotDieuTriId, {
                      chiDinhTuLoaiDichVu: 200,
                    })
                  );
                  break;
              }
            });
            Promise.all(promises)
              .then((s) => {
                dispatch.tiepDonDichVu.updateData({
                  listPhieu: s?.map((phieu, index) => {
                    const item = phieu.data;
                    item.key = item?.id;
                    item.index = index + 1;
                    if (Array.isArray(item?.file?.pdf)) {
                      item.filePdf = item?.file?.pdf?.map((x) => x);
                    } else {
                      item.filePdf = [item?.file?.pdf];
                    }
                    return item;
                  }),
                });
              })
              .catch((e) => {
              });
          })
          .catch((e) => {
          });
      });
    },

    getDataDanhSachPhieu: ({ dsFile, mode, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        printProvider
          .getMergePdf(dsFile)
          .then((s) => {
            console.info("Print success");
            resolve(s);
          })
          .catch((err) => {
            console.error("Print fail", err);
          });
      });
    },
  }),
};
