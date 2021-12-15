import phoneProvider from "@data-access/phone-provider";
import snackbar from "@utils/snackbar-utils";
import translate from '../../../translations';

const updateData = (data) => {
    return (dispatch) => {
        dispatch({
            type: "PHONE-UPDATE-DATA",
            data: data,
        });
    };
}


const sendPhoneNumber = (soDienThoai) => {
    return (dispatch, getState) => {
        let intl = getState().Intl.locale
        let dataTranslate = translate[intl]
        let donViId = getState().ttHanhChinh.donViId;
        let loaiXacThuc = 20;
        phoneProvider.sendOTP(donViId, loaiXacThuc, soDienThoai).then(s => {
            if (s.code === 0) {
                dispatch(updateData({ otpCode: s.data.otp }));
            } else {
                snackbar.show(
                    s && s.message ? s.message : (dataTranslate.messages || {}).xayraloi,
                    "danger"
                );
            }
        }).catch((e) => {
            snackbar.show(
                e && e.message ? e.message : (dataTranslate.messages || {}).xayraloi,
                "danger"
            );
        })
    }
}
export default {
    updateData,
    sendPhoneNumber,
};
