import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
    sendOTP(donViId, loaiXacThuc, taiKhoan) {
        let url = constants.api.sendOTP;
        console.log(url)
        return client.requestApi("post", url, {
            donViId,
            loaiXacThuc,
            taiKhoan,
        });

    },
};
