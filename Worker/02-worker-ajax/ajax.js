(function (window, undefined) {
    window.addEventListener('message', function (e) {
        this.console.log(e.data);
        var _this = this;
        var {
            url,
            type,
            data,
            dataType
        } = e.data
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300 || xhr.readyState === 4 && xhr.status === 304) {
                    if (dataType !== undefined &&dataType.toLowerCase() === "json")var result = JSON.parse(xhr.responseText)
                    else var result = xhr.responseText
                    _this.postMessage((result))
                }
            }
            if (type.toLowerCase() == "get" && data != undefined) {
                url += "?" + data;
            }
            //3.打开连接
            xhr.open(type, url, true);
            if (type.toLowerCase() === "post")
                //增加：设置请求消息头
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //4.发送请求
            if (type.toLowerCase() == "post" && data !== undefined)
                xhr.send(data);
            else
                xhr.send(null);

    });
    window.addEventListener('messageerror', function (e) {
        // 指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
        this.console.log(e)
    });
})(self)