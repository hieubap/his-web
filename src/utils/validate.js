
String.prototype.validateEmail = function () {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this);
}
String.prototype.isCode = function () {
    var re = /^([a-zA-Z0-9_]){1,30}$/g;
    return re.test(this.toLowerCase());
}
String.prototype.getQueryStringHref = function (name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
String.prototype.uintTextBox = function () {
    var re = /^\d*$/;
    return re.test(this);
}
String.prototype.isPhone = function () {
    var re = /^([0-9_]){10,18}$/g;
    return re.test(this.toLowerCase());
}
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};