import { PDF_HOST } from "client/request";
import { GENERATE_PDF } from "client/api";
import axios from "axios";
export default {
  htmlToPdf(html, options = {}) {
    return new Promise((resolve, reject) => {
      let urlPdf = PDF_HOST;
      // let urlPdf = "http://localhost:2200/";
      const client = axios.create({
        timeout: 240000,
        headers: {
          "Content-Type": "application/json",
        },
      });
      client
        .request({
          url: `${urlPdf}${GENERATE_PDF}`,
          responseType: "blob",
          method: "post",
          timeout: 1000 * 300, // Wait for 5 seconds
          data: {
            html: html,
            options: options,
          },
        })
        .then((response) => resolve(response.data))
        .catch((e) => {
          reject(e);
        });
    });
  },
};
