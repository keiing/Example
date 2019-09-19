class ajax{
    static get({url,method,token,header,async}){
        return this.ajax({type:"get",url,method,token,header,async})
    }
    static post({url,method,token,header,async}){
       return this.ajax({type:"post",url,method,token,header,async})
    }
    static ajax({type,url,method,token, header,async}) {
        type = type || (type = "get") && type.toLowerCase();
        if (method !== undefined)
        method = JSON.stringify(method)
          .replace(/"|'/g, "")
          .replace(/\s*:\s*/g, "=")
          .replace(/\s*,\s*/, "&")
          .slice(1, -1);
        return new Promise(function (resovled, rejected) {
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (
              (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) ||
              (xhr.readyState === 4 && xhr.status === 304)
            ) {
              let res={
                data:xhr.responseText,
                status:xhr.status,
                headers:xhr.getAllResponseHeaders(),
                url:xhr.responseURL,
                statusText:xhr.statusText,
                responseType:xhr.responseType,
                timeout:xhr.timeout,
                responseXML:xhr.responseXML,
                withCredentials:xhr.withCredentials,
                readyState:xhr.readyState,
                version:1.1
              };
              let reg=/^\{.*\}$/g;
             if(res.data.match(reg)){
              res.data = JSON.parse(res.data);
                if (res.data.status == 403) {
                  localStorage.removeItem("token");
                  sessionStorage.removeItem("token");

                  res.setIsLogin=false;
                  res.setUname="";
                } else if (res.data.code == -1) {
                  res.setIsLogin=false;
                  res.setUname="";
                } else if (res.data.token) {
                  res.setIsLogin=res.data['data'] && res.data.data.uname;
                  res.setUname=true;
                  if (res.data.remember === "true") {
                    localStorage.setItem("token", res.data.token);
                  } else {
                    sessionStorage.setItem("token", res.data.token);
                  }
              }
            }
              resovled(res);
              res=null;
            }
          };
          if (type === "get" && method != undefined) {
            url += "?" + method;
          }
          xhr.open(type, url, async||true);
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
          if (type === "post" && data !== undefined) xhr.send(data);
          else xhr.send(null);
        });
        xhr=null;
      }
}