// self代表子线程自身，即子线程的全局对象 因此，等同于下面两种写法。
(function (window, undefined) {
    window.a=10;//keyi1

    if (window.name === "myworker1") {
        window.addEventListener('message', function (e) {
            this.postMessage('myWorker1----' + e.data)
        }, false);
    }
    if (window.name === "myworker2") {
        window.addEventListener('message', function (e) {
            this.postMessage('myworker2-----' + e.data)
        }, false)
    }
    //写法二 意思相同
    // addEventListener('message',function(e){this.postMessage('my)})
    window.addEventListener('messageerror', function (err) {
        // 指定 messageerror 事件的监听函数。 发送的数据无法序列化成字符串时， 会触发这个事件。
        window.close();//关闭Worker线程
    })
})(self)