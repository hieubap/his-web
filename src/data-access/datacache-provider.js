var CryptoJS = require("crypto-js");
module.exports = {
  save(userId, key, value) {
    return new Promise((resolve, reject) => {
      try {
        var data = {
          value
        };
        let data2 = CryptoJS.AES.encrypt(JSON.stringify(data), "MediPlus");
        localStorage.setItem(userId + "_" + key, data2.toString());
        resolve(true);
      } catch (error) {
        reject(error);
      }
    })
  },
  read(userId, key, defaultValue) {
    if (localStorage.hasOwnProperty(userId + "_" + key)) {
      var item = localStorage.getItem(userId + "_" + key);
      var item = CryptoJS.AES.decrypt(item, "MediPlus").toString(CryptoJS.enc.Utf8);
      if (item)
        try {
          var data = JSON.parse(item);
          if (data && data.value) {
            return data.value;
          }
        } catch (error) {
        }
    }
    return (defaultValue);
  }
}