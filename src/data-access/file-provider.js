import client from '@utils/client-utils';
import constants from '@strings';

export default {
    uploadFile(file, url) {
        return new Promise((resolve, reject) => {
            client
                .uploadFile(url ? url : constants.api.file.upload, file)
                .then((s) => {
                    let data = s.data;
                    data.file = file;
                    resolve(data);
                })
                .catch((e) => {
                    e.file = file;
                    reject(e);
                });
        });
    },
} 