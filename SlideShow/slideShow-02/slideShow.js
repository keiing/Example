window.slideShow = (function (window, undefined) {
    /**
     * @param {dom} el dom节点
     * @param {Object|Array} obj 对象或者数组
     * @param {Object} isSelect 如果为boolean就不现实左右移动，如果为Object就显示
     * @param {Object} config 配置动画时间等{datatime:500,Color:"#000",selectedColor:"#fff"}
     */
    function slideShow(el, obj, isSelect, config) {
        if (typeof el !== "object") {
            throw new Error("el is not Dom")
        } else if (typeof obj !== "object") {
            throw new Error("obj is not Object")
        }
        config = config || {
            ul: {},
            li: {}
        }; /*config不穿参数默认配置*/
        var ulLiArr = ["ul", "li"];
        Array.prototype.forEach.call(ulLiArr, (function (val) {
            return config[val] = config[val] || (config[val] = {});
        }));
  
        isSelect = isSelect || {};
        var typeofIselect;
        (typeofIselect = typeof isSelect) !== "boolean" ?
            isSelect = {
                leftUrl: isSelect["leftUrl"] || "https://i.52112.com/icon/jpg/256/NoPack/325.jpg",
                rightUrl: isSelect["rightUrl"] || "https://i.52112.com/icon/jpg/256/NoPack/280.jpg",
                backgroundColor: isSelect["backgroundColor"] || "#fff" || "transparent",
                /**默认div背景颜色透明*/
                opacity: isSelect["opacity"] || 0.6,
                /**透明度默认0.6 */
                backgroundSize: isSelect["backgroundSize"] || "100% 33%",
                /**默认宽度默认高度 */
                borderRadius: isSelect["borderRadius"] || "5px",
                /**默认圆角度数 */
                backgroundRepeat: isSelect["backgroundRepeat"] || "no-repeat",
                /**默认不重复背景图片*/
                width: isSelect["width"] || "60px",
                /**默认div宽度60px*/
                height: isSelect["height"] || "30%",
                /**默认div高度100%*/
                position: isSelect["position"] || "absolute",
                /** 默认悬浮呈现*/
                cursor: isSelect["cursor"] || "pointer",
                /**绝对定位 */
                top: isSelect["top"] || "50%",
                /**居中 */
                left: isSelect["left"] || "0px",
                transform: isSelect["transform"] || "translatex(0) translatey(-50%)",
                /**背景图片定位 */
                backgroundPosition: isSelect["backgroundPosition"] || "center center",
                /**默认选中状态背景颜色白色 */
                backgroundColored: isSelect["backgroundColored"] || "#fff",
                /**默认选中是否平铺 */
                backgroundRepeated: isSelect["backgroundRepeated"] || "repeat",
                /**默认选中圆角度数 */
                borderRadiused: isSelect["borderRadiused"] || "50%",
                /**默认透明度 */
                widthed: isSelect["widthed"] || "100px",
                /** 默认悬浮宽度*/
                heighted: isSelect["heighted"] || "100px",
                /** 默认悬浮高度*/
  
            } : isSelect;
        config["ul"] = {
            width: config["ul"]["width"] || 1000,
            /**图片宽度默认1000 px*/
            height: config["ul"]["height"] || 600,
            /**默认滑动时间-多久滑动 3000ms/次 */
            interval: config["ul"]["interval"] || 3000,
            /**图片高度默认600 px*/
            liTiem: config["ul"]["liTiem"] || 500,
            /**动画要跟css动画属性相对应 默认500 ms */
            delayTime: config["ul"]["delayTime"] || 30,
            /**点击滑动延迟事件 默认30 ms */
        }
        config["li"] = {
            ulWidth: config["li"]["ulWidth"] || "100px",
            /*默认100px*/
            ulBottom: config["li"]["ulBottom"] || "25px",
            /**默认距离底部25px */
            ulLeft: config["li"]["ulLeft"] || "50%",
            /**默认居中50% */
            margin: config["li"]["margin"] || "0 5px",
            /**默认li距离0 5px */
            width: config["li"]["width"] || "10px",
            /**li默认10px */
            height: config["li"]["height"] || "10px",
            /**li高度默认10px */
            backgroundColor: config["li"]["background"] || "#fff",
            /**li背景默认白色*/
            backgroundColored: config["li"]["backgrounded"] || "#000",
            /**li背景选中颜色默认白色*/
            cursor: config["li"]["cursor"] || "pointer",
            /**li选中默认小手*/
            borderRadius: config["li"]["borderRadius"] || "30px",
            /**圆角度数默认5px */
            border: config["li"]["bordered"] || '2px solid #fff',
            /**li选中默认边框 */
        }
  
        var Fragment, div, ul, lis, len, btnRight, btnLeft, i = 0,
            lisChildren, timer, canClick = true, timerMouseover, mouse = !0;/** canClick设置开关 让用户疯狂点击向左或者向右无效 为了放弃用户看出动画是欺骗视觉效果;*/
        /**init初始化 */
        (function () {
            len = obj.length || Object.keys(obj).length;
            let EventStyle = {
                divInit: {
                    width: config["ul"]["width"] + "px",
                    height: config["ul"]["height"] + "px",
                    overflow: "hidden",
                    position: "relative",
                },
                ulImgs: {
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    width: (1 + len) * config["ul"]["width"] + "px",
                    marginLeft: "0px"
                },
                ulImgsLi: {
                    width: config["ul"]["width"] + "px",
                    float: "left",
                },
                ulImgsImg: {
                    width: config["ul"]["width"] + "px",
                    height: config["ul"]["height"] + "px",
                    boxSizing: "border-box"
                },
                lis: {
                    /**li的ul*/
                    width: config["li"]["ulWidth"],
                    margin: "0 auto",
                    listStyle: "none",
                    position: "absolute",
                    bottom: config["li"]["ulBottom"],
                    left: config["li"]["ulLeft"],
                    transform: "translatex(-50%)"
                },
                lisLi: {
                    /**li大小样式 */
                    float: "left",
                    width: config["li"]["width"],
                    height: config["li"]["height"],
                    backgroundColor: config["li"]["backgroundColor"],
                    borderRadius: config["li"]["borderRadius"],
                    margin: config["li"]["margin"],
                    cursor: config["li"]["cursor"],
                    border: config["li"]["border"]
                }
            }
            if (typeofIselect !== "boolean") {
                EventStyle["btn"] = {
                    width: isSelect["width"],
                    height: isSelect["height"],
                    position: isSelect["position"],
                    top: isSelect["top"],
                    backgroundRepeat: isSelect["backgroundRepeat"],
                    backgroundPosition: isSelect["backgroundPosition"],
                    cursor: isSelect["cursor"],
                    backgroundColor: isSelect["backgroundColor"],
                    opacity: isSelect["opacity"],
                    transform: isSelect["transform"],
                    borderRadius: isSelect["borderRadius"],
                }
                EventStyle["btnLeft"] = {
                    left: "20px",
  
                    backgroundSize: isSelect["backgroundSize"]
                }
                EventStyle["btnRight"] = {
                    right: "20px",
                    backgroundSize: isSelect["backgroundSize"]
                }
            }
            for (var item in EventStyle) {
                EventStyle[item] = (
                    JSON.stringify(EventStyle[item])
                        .replace(/[A-Z]/g, $ => "-" + $.toLocaleLowerCase())
                        .replace(/(\{|\})|"/g, "")
                        .replace(/\,|$/g, ";"));
            }
            /**默认滑动时间防止太快 */
            config["ul"]["interval"] =
                config["ul"]["interval"] <= ((config["ul"]["delayTime"] + config["ul"]["liTiem"]) * 3) ?
                    ((config["ul"]["delayTime"] + config["ul"]["liTiem"]) * 4) :
                    config["ul"]["interval"]
  
            Fragment = document.createDocumentFragment();
            div = document.createElement("div");
  
            if (typeofIselect !== "boolean") {
                btnLeft = document.createElement("div");
                btnRight = document.createElement("div");
  
                btnLeft.setAttribute("style", EventStyle["btn"] + EventStyle["btnLeft"])
                btnRight.setAttribute("style", EventStyle["btn"] + EventStyle["btnRight"])
  
                btnLeft.style.setProperty('background-image', "url(" + isSelect["leftUrl"] + ")")
                btnRight.style.setProperty('background-image', "url(" + isSelect["rightUrl"] + ")")
                div.appendChild(btnLeft);
                div.appendChild(btnRight);
            }
  
            ul = document.createElement("ul");
            lis = document.createElement("ul");
            div.setAttribute("style", EventStyle["divInit"])
            ul.setAttribute("style", EventStyle["ulImgs"])
            lis.setAttribute("style", EventStyle["lis"])
            for (var i = 0, li, isObject = Object.prototype.toString.call(obj[i]), img; i < (len) + 1; i++) {
                li = document.createElement("li");
                li.setAttribute("style", EventStyle["ulImgsLi"])
                img = document.createElement("img")
  
                isObject == "[object Object]" ? i < len ? ((img.src = obj[i].src)
                    && (img.setAttribute("data-href", obj[i]["link"]))) :
                    ((img.src = obj[0].src) && (img.setAttribute("data-href", obj[0]["link"]))) :
                    i < len ? img.src = obj[i] : img.src = obj[0];
  
                img.setAttribute("style", EventStyle["ulImgsImg"])
                ul.appendChild(li).appendChild(img)
                if (i < len) {
                    li = document.createElement("li");
                    li.setAttribute("style", EventStyle["lisLi"]);
                    lis.appendChild(li);
                }
            }
            lisChildren = lis.children;
            lisChildren[0]["style"]["setProperty"]("background", config["li"]["backgroundColored"])
            div.appendChild(lis)
            Fragment.appendChild(div).appendChild(ul);
            EventStyle=null;
            return;
        }());
        // 
        if (obj[i]["link"]) {
            ul.addEventListener("click", event => location.href = (event.target["dataset"]["href"]), true)
        }
        function slide(to) {
            if (to == undefined) {
                to = i + 1;
            }
            if (i == 0) {
                if (to > i) {
                    ul.style.setProperty("transition", "all " + config["ul"]["liTiem"] + "ms linear");
                } else {
                    ul.style.transition = ""
                    ul.style.setProperty("margin-left", -config["ul"]["width"] * len + "px");
                    setTimeout(function () {
                        slide(len - 1);
                    }, config["ul"]["delayTime"]);
                    return;
                }
            }
            i = to;/**如果不设置判断直接 i = i + to 即可*/
            ul.style.setProperty("margin-left", -i * config["ul"]["width"] + "px");
            for (var li of lisChildren) {
                li["style"]["setProperty"]("background", config["li"]["backgroundColor"])
            }
            if (i == len) {
                i = 0;
                setTimeout(function () {
                    ul["style"]["transition"] = "";
                    ul["style"].setProperty("margin-left", 0);
                }, config["ul"]["liTiem"])
            }
            lisChildren[i]["style"]["setProperty"]("background", config["li"]["backgroundColored"])
            lisChildren[i]["style"]["setProperty"]("border", config["li"]["bordered"])
        }
  
        if (typeofIselect !== "boolean") {
            btnRight.onclick = function () {
                slidelay(1)
            }
            btnLeft.onclick = function () {
                slidelay(-1);
            }
        }
  
        function slidelay(n) {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            n = n || 1;
            if (canClick) {
                slide(i + n);
                canClick = false;/**为了实现等动画结束才会继续滑动，关闭开关 */
                setTimeout(function () {
                    canClick = true;
                    if (!timer) {
                        timer = setInterval(function () {
                            slide()
                        }, config["ul"]["interval"]);
                    }
                }, config["ul"]["liTiem"] + 30);/**开启开关事件需要和动画持续时间同步 */
            }
        }
  
        lis.onclick = function (e) {
            if (canClick) {
                var li = e.target;
                if (li.nodeName == "LI") {/**点击标签名等于LI */
                    if (li.className !== "active") {//*点击标签名class属性值不等于active/不在选中状态 */
                        for (var i = 0; i < lisChildren.length; i++) {//*循环lis.length总数 */
                            if (lisChildren[i] == li) {//*判断lis[i] 等于 当前点击的li  */
                                break;//*如果等于直接结束for循环 */
                            }
                        }
                        slide(i);//*利用 i 传递当前点击图片下标 */
                        if (timer) {
                            clearInterval(timer);
                            timer = null;
                        }
                        setTimeout(function () {
                            canClick = true;
                            if (!timer) {
                                timer = setInterval(function () {
                                    slide()
                                }, config["ul"]["interval"]);
                            }
                        }, config["ul"]["liTiem"]);
                    }
                }
            }
        }
  
        /**定时器 */
        timer = setInterval(function () {
            slide()
        }, config["ul"]["interval"]);
        ul.onmouseover = function () {
            clearInterval(timer);
            timer = null;
        }
        ul.onmouseout = function () {
            if (!timer) {
                timer = setInterval(function () {
                    slide()
                }, config["ul"]["interval"]);
            }
        }
        function mouseover() {
            if (mouse) {
                this.style.setProperty("opacity", isSelect["opacityed"])
                this.style.setProperty("background-color", isSelect["backgroundColored"])
                this.style.setProperty("border-radius", isSelect["borderRadiused"])
                this.style.setProperty("width", isSelect["widthed"])
                this.style.setProperty("height", isSelect["heighted"])
                this.style.setProperty("background-repeat", isSelect["backgroundRepeated"])
                setTimeout(function () {
                    mouse = !1;
                }, 150)
                if (timerMouseover) {
                    clearTimeout(timerMouseover);
                    timerMouseover = null;
                }
            }
        }
        function mouseout() {
            this.style.setProperty("opacity", isSelect["opacity"])
            this.style.setProperty("background-color", isSelect["backgroundColor"])
            this.style.setProperty("border-radius", isSelect["borderRadius"])
            this.style.setProperty("width", isSelect["width"])
            this.style.setProperty("height", isSelect["height"])
            this.style.setProperty("background-repeat", isSelect["backgroundRepeat"])
            timerMouseover = setTimeout(function () {
                mouse = !0
            }, 300)
        }
  
        if (typeof isSelect !== 'boolean') {
  
            btnRight.addEventListener("mouseover", mouseover),
            btnLeft.addEventListener("mouseover", mouseover),
            btnRight.addEventListener("mouseout", mouseout),
            btnLeft.addEventListener("mouseout", mouseout);
  
        }
        el.appendChild(Fragment),
        el=null,
        obj=null;
        return slidelay;
    }
    return slideShow;
  })(window)