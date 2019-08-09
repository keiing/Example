// self代表子线程自身，即子线程的全局对象 因此，等同于下面两种写法。
self.addEventListener('message',function(e){
    this.console.log(e.data);
    this.postMessage('worker');
    // this.close();
},false)