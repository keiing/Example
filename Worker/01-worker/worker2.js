(function (window, undefined) {
  /**
        self.name： Worker 的名字。该属性只读，由构造函数指定。
        self.onmessage：指定message事件的监听函数。
        self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
        self.close()：关闭 Worker 线程。
        self.postMessage()：向产生这个 Worker 线程发送消息。
        self.importScripts()：加载 JS 脚本。
          */
      importScripts('./worker.js');//成功引入了WORKER.JS
      window.addEventListener('message',function(e){
        this.console.log(e.data)
        this.postMessage(a)
      },false);
})(self)