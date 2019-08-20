        /**
         * 一.出口入口
         * 1.jQuery的本质是闭包
         * 2.jQuery为什么要使用必要来实现?为了避免多个框架冲突
         * 3.jQuery如何让外界访问内部定义的局部变量 window.xxx=xxx;
         * 4.jQuery为什么要给自己传递一个window参数？1.提高查找效率-2.为了后期压缩代码
         * 5.jQuery为什么要给自己传递一个undefined参数?1.防止undefined被篡改
         */
        /** 
         * 二.传入不同的类型，返回什么值
         * 1.传入 '' null undefined NaN 0 false 返回空的jQuery对象
         * 2.字符串:代码片段会创建好的DOM元素存储到jQueyr对象中放回
         * 选择器:会将找到的所有元素存储到jQuery对象中放回
         * 3.数组:会将数组中储存的元素一次储存到jQuery对象中返回
         * 4.除去上述类型意外的:
         * 会将传入的数据存储到jQuery对象中返回
         */
        (function (window, undefined) {
            var jQuery = function (selector) {
                return new jQuery.prototype.init(selector);
            }
            jQuery.prototype = {
                constructor: jQuery,
                init: function (selector) {
                    selector=jQuery.trim(selector)
                    //1.传入'' null undefined NaN 0 false
                    if (!selector) {
                        return this;
                    } //2.字符串
                    else if (jQuery.isString(selector)) {
                        //2.1 判断是否是代码片段 <a>
                        if (jQuery.isHTML(selector)) {
                            //2.1.1根据代码片段创建所有的元素
                            var elem = document.createElement('div');
                            elem.innerHTML = selector;
                            /**->简化 [].push.apply(this,elem.children) 为什么可以替换 前往./applay和call方法.html查看详细
                            //2.1.2将创建好的一级元素添加到jQuery当中
                            for (var i = 0; i < elem.children.length; i++) {
                                this[i] = elem.children[i];
                            }
                            //2.1.3给jQuery对象添加length属性
                            this.length = elem.children.length; 
                            */
                           [].push.apply(this,elem.children)
                            //2.1.4返回加工好的this(jQuery)
                            return this;
                        }
                        //2.2 判断是否是选择器
                        else{
                            //2.2.1根据传入的选择器找到对应的元素
                            var elem=document.querySelectorAll(selector);
                            //2.2.2将找到的元素添加到jQuery上
                            [].push.apply(this,elem)
                            //2.2.3返回加工上的this
                            return this;//现在没有对length==1处理，只返回了伪数组
                        }
                    }//数组
                    else if(jQuery.isArray(selector)){
                        //真数组
                        if({}.toString.apply(selector)==="[object Object]"){

                        }else{
                        //伪数组

                        }
                        console.log(selector)
                    }
                }
            }
            jQuery.isString = function (str) {
                return typeof str === "string"
            }
            jQuery.isHTML = function (str) {
                return str.charAt(0) == "<" &&
                    str.charAt(str.length - 1) == ">" &&
                    str.length >= 3
            }
            jQuery.isArray=function(str){
                if(typeof str ==="object" && "length" in str && str !==window){
                    return str;
                }
            }
            jQuery.trim=function(str){
                if(!jQuery.isString(str)){
                    return str;
                }
                //判断当前浏览器是否支持trim方法
                if(str.trim){
                   return str.trim();
                }else{
                    return str.replace(/^\s+|\s+$/g,"");
                }
            }
            jQuery.prototype.init.prototype = jQuery.prototype;
            window.jQuery = window.$ = jQuery;
        })(window)
