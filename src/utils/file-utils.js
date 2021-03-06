import { client } from "client/request";
import { FILE } from "client/api";
import { HOST } from "client/request";

export default {
  absoluteFileUrl: (item) => {
    if (
      item?.indexOf("http") === 0 ||
      item?.indexOf("https") === 0 ||
      item?.indexOf("blob") === 0 ||
      item?.indexOf("data:") === 0
    )
      return this;
    return HOST + "/api/his/v1/files/" + item + "";
  },
  urltoFile: async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  },
  getFromUrl: ({ prefix, url = "" }) => {
    return new Promise((resolve, reject) => {
      let file = "";
      if (url.indexOf("blob:") == 0 || url.indexOf("http") == 0) {
        file = url;
      } else {
        if (prefix) file = `${prefix}${FILE}/${url}`;
        else {
          file = `${FILE}/${url}`;
        }
      }

      file = file.replaceAll("//api/", "/api/");
      client
        .get(file, {
          responseType: "arraybuffer",
        })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
