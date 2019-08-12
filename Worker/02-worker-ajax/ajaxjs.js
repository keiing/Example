function ajax({ type, url, data, dataType, header }) {
  type = type.toLowerCase();
  if(data!=undefined)
  data = JSON.stringify(data)
    .replace(/"|'/g, "")
    .replace(/\s*:\s*/g, "=")
    .replace(/\s*,\s*/, "&")
    .slice(1, -1); //String.prototype.slice.call(data,1,-1);
  return new Promise(function(resovled, rejected) {
    //1. 创建xhr对象
    var xhr = new XMLHttpRequest();
    //2.绑定监听事件
    xhr.onreadystatechange = function() {
      if (
        (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) ||
        (xhr.readyState === 4 && xhr.status === 304)
      ) {
        if (dataType !== undefined && dataType.toLowerCase() === "json")
          var res = JSON.parse(xhr.responseText);
        else var res = xhr.responseText;
        resovled(res);
      }
    };
    if (type === "get" && data != undefined) {
      url += "?" + data;
    }
    //3.打开连接
    xhr.open(type, url, true);
    if (type === "post") {
      header = header || {"Content-Type": "application/x-www-form-urlencoded"};
      var headerType = Object.keys(header)[0];
      var headerValue = header[headerType];
      //增加：设置请求消息头
      xhr.setRequestHeader(headerType, headerValue);
    }
    //4.发送请求
    if (type === "post" && data !== undefined) xhr.send(data);
    else xhr.send(null);
  });
}
/*
(async function(){
    //ES7
    var res=await ajax({
        url:"http://localhost:3000/index",
        type:"get",
        data:{'uname':"zhangsan"},
        dataType:"json",
        header:{"Content-TYpe":"application/x-www-form-urlencoded"}
    })
    //ES6
    .then(res=>{
        ... ...
    })
})();
*/
