import { combineUrlParams } from "utils";
import {
  client,
  formPath,
  masterDataPath,
  patientPath,
  signerPath,
  scanPath,
} from "client/request";
import {
  DOCUMENTS,
  MEDICAL_RECORD_TYPE,
  RECORD_TYPE,
  DS_XET_NGHIEM_LIST,
  DS_XET_NGHIEM_HIS,
  DS_CDHS_PACS,
  DS_CDHS_HIS,
} from "client/api";
import signProvier from "data-access/sign-provider";
import scanProvider from "data-access/scan-provider";
import recordTypeProvider from "data-access/record-type-provider";
export default {
  getFiles: ({ maHoSo, ...payload }) => {
    return new Promise((resolve, reject) => {
      let promise = [];
      promise.push(
        new Promise((resolve, reject) => {
          client
            .get(
              combineUrlParams(`${formPath}${DOCUMENTS}`, {
                maHoSo: maHoSo,
              })
            )
            .then((s) => {
              resolve(
                (s?.data?.data || [])
                  .filter((item) => item.nbHoSoBaId)
                  .map((item) => {
                    item.type = "emr";
                    item.maBieuMau = item.formValue;
                    item.soPhieu = item.nbHoSoBaId;
                    item.title = item.formName;
                    item.tenBieuMau = item.tenBieuMau || item.formName;
                    return item;
                  })
              );
            })
            .catch((e) => {
              resolve([]);
            });
        })
      );
      promise.push(
        new Promise((resolve, reject) => {
          recordTypeProvider
            .getRecordTypeByPatientDocument({ maHoSo })
            .then((s) => {
              let x = (s?.data?.dsBieuMau || [])
                // .filter((item) => item.active && item.macDinh)
                .map((item) => {
                  item.maBieuMau = item.bieuMau?.ma;
                  item.formName = item.bieuMau?.ten;
                  item.tenBieuMau = item.bieuMau?.ten;
                  item.type = "form";
                  item.api = item.bieuMau?.api;
                  item.title = item.bieuMau?.ten;
                  item.hsdd = item.bieuMau?.hsdd;
                  item.formId = item.bieuMau?.formId;
                  return item;
                });
              resolve(x);
            })
            .catch((e) => {
              resolve([]);
            });
        })
      );
      promise.push(
        new Promise((resolve, reject) => {
          signProvier
            .getHistory({ maHoSo, page: 0 })
            .then((s) => {
              let data = (s.data || []).map((item) => {
                item.type = "signed";
                item.formName = item.tenBieuMau;
                item.fileSauKy = item.fileSauKy
                  ? signerPath + "/files/" + item.fileSauKy
                  : "";
                item.fileTruocKy = item.fileTruocKy
                  ? signerPath + "/files/" + item.fileTruocKy
                  : "";

                item.api = item.fileSauKy || item.fileTruocKy;
                item.title =
                  item.soPhieu +
                  " - " +
                  item.ngayKy.toDateObject().format("dd/MM/yyyy");
                return item;
              });
              resolve(data);
            })
            .catch((e) => {
              resolve([]);
            });
        })
      );
      promise.push(
        new Promise((resolve, reject) => {
          scanProvider
            .searchDocument({ maHoSo, active: true })
            .then((s) => {
              let data = (s.data || []).map((item) => {
                item.type = "scan";
                item.formName = item.tenBieuMau;
                // item.noDescription = !item.moTa || !item.soPhieu;
                item.title =
                  (item.moTa || item.soPhieu) +
                  " - " +
                  item.ngayThucHien.toDateObject().format("dd/MM/yyyy");
                item.duongDan = item.duongDan
                  ? scanPath + "/files/" + item.duongDan
                  : "";
                item.api = item.duongDan;
                return item;
              });
              resolve(data);
            })
            .catch((e) => {
              resolve([]);
            });
        })
      );
      promise.push(
        new Promise((resolve, reject) => {
          client
            .get(
              combineUrlParams(`${patientPath}${DS_XET_NGHIEM_LIST}`, {
                maHoSo: maHoSo,
                page: 0,
              })
            )
            .then((s) => {
              resolve(
                (s?.data?.data || []).map((item) => {
                  item.type = "xnlis";
                  item.formName = item.tenBieuMau;
                  item.title =
                    item.soPhieu +
                      " - " +
                      item.ngayThucHien?.toDateObject().format("dd/MM/yyyy") ||
                    "";
                  item.ketQua = item.ketQua
                    ? patientPath + "/files/" + item.ketQua
                    : "";
                  item.api = item.ketQua;
                  return item;
                })
              );
            })
            .catch((e) => {
              resolve([]);
            });
        })
      );
      promise.push(
        new Promise((resolve, reject) => {
          client
            .get(
              combineUrlParams(`${patientPath}${DS_XET_NGHIEM_HIS}`, {
                maHoSo: maHoSo,
                page: 0,
              })
            )
            .then((s) => {
              resolve(
                (s?.data?.data || []).map((item) => {
                  item.type = "xnhis";
                  item.formName = item.tenBieuMau;
                  item.title =
                    item.soPhieu +
                      " - " +
                      item.ngayThucHien?.toDateObject().format("dd/MM/yyyy") ||
                    "";
                  return item;
                })
              );
            })
            .catch((e) => {
              resolve([]);
            });
        })
      );
      promise.push(
        new Promise((resolve, reject) => {
          client
            .get(
              combineUrlParams(`${patientPath}${DS_CDHS_PACS}`, {
                maHoSo: maHoSo,
                page: 0,
              })
            )
            .then((s) => {
              resolve(
                (s?.data?.data || []).map((item) => {
                  item.type = "cdhapacs";
                  item.formName = item.tenBieuMau;
                  item.title =
                    item.soPhieu +
                      " - " +
                      item.ngayThucHien?.toDateObject().format("dd/MM/yyyy") ||
                    "";
                  item.ketQua = item.ketQua
                    ? patientPath + "/files/" + item.ketQua
                    : "";
                  item.api = item.ketQua;
                  return item;
                })
              );
            })
            .catch((e) => {
              resolve([]);
            });
        })
      );
      promise.push(
        new Promise((resolve, reject) => {
          client
            .get(
              combineUrlParams(`${patientPath}${DS_CDHS_HIS}`, {
                maHoSo: maHoSo,
                page: 0,
              })
            )
            .then((s) => {
              resolve(
                (s?.data?.data || []).map((item) => {
                  item.type = "cdhahis";
                  item.formName = item.tenBieuMau;
                  item.title =
                    item.soPhieu +
                      " - " +
                      item.ngayThucHien?.toDateObject().format("dd/MM/yyyy") ||
                    "";
                  return item;
                })
              );
            })
            .catch((e) => {
              resolve([]);
            });
        })
      );
      Promise.all(promise)
        .then((values) => {
          values[0] = values[0].filter((item) => {
            let item2 = values[1].find((x) => x.maBieuMau == item.maBieuMau);
            if (item2) {
              item.formName = item.formName || item2.formName;
              item.stt = item2.stt;
              item.taoNhieuMau = item2.taoNhieuMau;
              item.hsdd = item2.hsdd;
              item.bieuMau = item2.bieuMau;
              item2.isHide = true;
              return true;
            } else {
              return false;
            }
          });
          values[2] = values[2].filter((item) => {
            if (!item.fileSauKy) return false;
            let item2 = values[1].find((x) => x.maBieuMau == item.maBieuMau);
            if (item2) {
              // item.formName = item.formName || item2.formName;
              item.formName = item2.formName;
              item.stt = item2.stt;
              item.hsdd = item2.hsdd;
              item2.isHide = true;
              return true;
            } else {
              return false;
            }
          });
          values[3] = values[3].filter((item) => {
            let item2 = values[1].find((x) => x.maBieuMau == item.maBieuMau);
            if (item2) {
              // item.formName = item.formName || item2.formName;
              item.formName = item2.formName;
              item.hsdd = item2.hsdd;
              item.stt = item2.stt;
              item2.isHide = true;
              return true;
            } else {
              return false;
            }
          });
          values[4] = values[4].filter((item) => {
            let item2 = values[1].find((x) => x.maBieuMau == item.maBieuMau);
            if (item2) {
              // item.formName = item.formName || item2.formName;
              item.formName = item2.formName;
              item.stt = item2.stt;
              item.hsdd = item2.hsdd;
              item2.isHide = true;
              return true;
            } else {
              return false;
            }
          });
          values[5] = values[5].filter((item) => {
            let item2 = values[1].find((x) => x.maBieuMau == item.maBieuMau);
            if (item2) {
              // item.formName = item.formName || item2.formName;
              item.formName = item2.formName;
              item.stt = item2.stt;
              item.hsdd = item2.hsdd;
              item2.isHide = true;
              return true;
            } else {
              return false;
            }
          });
          values[6] = values[6].filter((item) => {
            let item2 = values[1].find((x) => x.maBieuMau == item.maBieuMau);
            if (item2) {
              // item.formName = item.formName || item2.formName;
              item.formName = item2.formName;
              item.stt = item2.stt;
              item.hsdd = item2.hsdd;
              item2.isHide = true;
              return true;
            } else {
              return false;
            }
          });
          values[7] = values[7].filter((item) => {
            let item2 = values[1].find((x) => x.maBieuMau == item.maBieuMau);
            if (item2) {
              // item.formName = item.formName || item2.formName;
              item.formName = item2.formName;
              item.stt = item2.stt;
              item.hsdd = item2.hsdd;
              item2.isHide = true;
              return true;
            } else {
              return false;
            }
          });
          values[1] = values[1].filter((item) => {
            if (
              item.active &&
              item.macDinh &&
              (!item.isHide ||
                !values[0].find((item2) => item2.maBieuMau == item.maBieuMau))
            ) {
              return true;
            }
            if (item.active && !item.macDinh) {
              item.ignore = true; //thêm 1 trường để đánh dấu không hiển thị lên cây
              return true;
            }
            return false;
          });
          resolve({
            data: [].concat.apply([], values).map((item, index) => {
              item.key = index;
              return item;
            }),
          });
        })
        .catch((e) => {
          resolve({ data: [] });
        });
    });
  },
  deleteFile: ({ api, nbHsBaId }) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${formPath}${api}/${nbHsBaId}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  search: ({ page = 0, size = 10, sort = "name", ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${masterDataPath}${MEDICAL_RECORD_TYPE}`, {
            page: page + "",
            size,
            sort,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) resolve(s.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  onCreate: ({ ten, ma, loaiBa, mauBaId, active, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          combineUrlParams(`${formPath}${RECORD_TYPE}`, {
            ten,
            ma,
            loaiBa,
            mauBaId,
            active,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) resolve(s.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
