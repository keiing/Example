(function (window, undefined) {
    window.addEventListener('message', function (e) {
        this.console.log(e.data);
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300 || xhr.readyState === 4 && xhr.status === 304) {
                var result = JSON.parse(xhr.responseText);
                if (result !== undefined) {
                    // resolve(result);
                    _this.postMessage(result);
                    //成功发送消息之后调用结束 之后关闭线程
                    _this.close();
                }
            }
        }
        //127.242.19.39
        xhr.open('get', e.data, true);
        xhr.send();
    });
    window.addEventListener('messageerror', function (e) {
        // 指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
        this.console.log(e)
    });
})(self)