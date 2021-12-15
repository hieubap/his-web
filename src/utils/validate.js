String.prototype.isPhone = function () {
    var re = /^([0-9_]){10,18}$/g;
    return re.test(this.toLowerCase());
}
String.prototype.uintTextBox = function () {
    var re = /^\d*$/;
    return re.test(this);
}
String.prototype.checkNumber = function () {
    var re = /[^0-9\.]/g;
    return re.test(this);
}
String.prototype.validateEmail = function () {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this);
}
String.prototype.isUsername = function () {
    var re = /^([a-zA-Z0-9_]){6,20}$/g;
    return re.test(this.toLowerCase());
}
String.prototype.isPassword = function () {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(this);
}
String.prototype.getQueryStringHref = function (name) {
    // name = name.toLowerCase();
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
String.prototype.checkSpecialCharacters = function () {
    var re = /[~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return re.test(this);
}