
function loadScript(url, callback, object) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    var fnlaodScript = function() {
        if(typeof callback==='function'){
            callback();
        }
      else if(
        object !== undefined &&
        callback !== undefined &&
        typeof callback !== "function"
      ) {
        if (typeof callback === "string" && typeof object === "string") {
          if (window[object][callback] === undefined)
            return console.log(
              new TypeError(
                `在${object}中找不到${object}.${callback}这个方法`
              )
            );
          window[object][callback]();
        } else {
          if (
            window.Object.prototype.toString.call(object, object) ===
            "[object Array]"
          ) {
            var prev;
            Array.prototype.forEach.call(object, (val, index) =>
              index == 0 ? (prev = window[val]) : (prev = prev[val])
            );
            if (
              window.Object.prototype.toString.call(callback, callback) ===
              "[object Array]"
            )
              Array.prototype.forEach.call(callback, val => prev[val]());
            else prev[callback]();
            return;
          } else {
            Array.prototype.forEach.call(callback, val => {
              if (window[object][val] === undefined)
                return console.log(
                  new TypeError(
                    `在${object}中找不到${object}.${val}这个方法`
                  )
                );
              window[object][val]();
            });
            return;
          }
        }
      }else if(callback){
        console.log(String.prototype.indexOf.call(callback,"."),callback)
        if(String.prototype.indexOf.call(callback,".")){
          var callbackone=String.prototype.split.call(callback,'.')
          var prev;
          Array.prototype.forEach.call(callbackone,(val,i)=>{
            if(i==0){
              if(!window[val])return console.log(new TypeError(`找不到${callbackone[0]}的属性或方法`));
              prev=window[val]
            }else if(i>0){
              if(!prev)return;
              if(!prev[val])return console.log(new TypeError(`在${callbackone[0]}中找不到${[val]}的方法`));
              prev=prev[val]()
            }
          })
        }
      }else{
        window[callback]();
      }
    };
    if (script.readyState) {
      //IE
      script.onreadystatechange = function() {
        if (
          script.readyState == "complete" ||
          script.readyState == "loaded"
        ) {
          fnlaodScript();
        }
      };
    } else {
      //Safari chrome firefox opera
      script.onload = function() {
        fnlaodScript();
      };
    }
    //防止script.readyState直接变为complete不再触发 把url放在绑定事件之后
    script.src = url;
    document.body.appendChild(script);
};