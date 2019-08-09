/**  除了使用self.addEventListener()指定监听函数，
也可以使用self.onmessage指定。
监听函数的参数是一个事件对象，它的data属性包含主线程发来的数据。
self.postMessage()方法用来向主线程发送消息。*/

self.addEventListener('message', function (e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      this.postMessage('WORKER STOPPED:stop ' + data.msg);
      // self.close()用于在 Worker 内部关闭自身。
      // this.postMessage('worker1')
      this.close(); // Terminates the worker.
      break;
    default:
      this.postMessage(data);
  };
}, false);