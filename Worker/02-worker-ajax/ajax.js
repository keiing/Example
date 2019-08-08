(function(window,undefined){
onmessage = function (e) {
    this.console.log(e.data);
    var _this = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.responseText);
            if (result !== undefined) {
                // resolve(result);
                _this.postMessage(result)
            }
        }
    }
    //127.242.19.39
    xhr.open('get', e.data, true);
    xhr.send();
}
})(global={})