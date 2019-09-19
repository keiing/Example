/**
 * @param {Object} ajax ajax请求
 */
function ajax({
  type,
  url,
  data,
  token,
  header
}) {
  type = type || (type = "get") && type.toLowerCase();
  if (data !== undefined)
    data = JSON.stringify(data)
    .replace(/"|'/g, "")
    .replace(/\s*:\s*/g, "=")
    .replace(/\s*,\s*/, "&")
    .slice(1, -1); //String.prototype.slice.call(data,1,-1);
  return new Promise(function (resovled, rejected) {
    //1. 创建xhr对象
    let xhr = new XMLHttpRequest();
    //2.绑定监听事件
    xhr.onreadystatechange = function () {
      if (
        (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) ||
        (xhr.readyState === 4 && xhr.status === 304)
      ) {
        let res=xhr.responseText;
        let reg=/^\{.*\}$/g;
       if(res.match(reg)){
        res = JSON.parse(res);

          if (res.status == 403) {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            this.setIsLogin = false;
            this.setUname = "";

          } else if (res.code == -1) {
            this.setIsLogin = false;
            this.setUname = "";

          } else if (res.token) {
            this.setIsLogin = res['data'] && res.data.uname;
            this.setUname = true;

            if (res.remember === "true") {
              localStorage.setItem("token", res.token);
            } else {
              sessionStorage.setItem("token", res.token);
            }
        }
      }
        resovled(res);
      }
    };

    if (type === "get" && data != undefined) {
      url += "?" + data;
    }
    //3.打开连接
    xhr.open(type, url, true);

    if (type === "post") {
      header = header || {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      let headerType = Object.keys(header)[0];
      let headerValue = header[headerType];
      /**增加：设置请求消息头*/
      xhr.setRequestHeader(headerType, headerValue);
    }

    if(token){
      if (localStorage.getItem("token")) {
        xhr.setRequestHeader("token", localStorage.getItem("token"))
      } else if (sessionStorage.getItem("token")) {
        xhr.setRequestHeader("token", sessionStorage.getItem("token"))
      }
    }

    /**4.发送请求*/
    if (type === "post" && data !== undefined) xhr.send(data);
    else xhr.send(null);
  });
}
/*
(async function(){
    //ES7
    let res=await ajax({
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
