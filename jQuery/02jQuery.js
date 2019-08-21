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
        /**
         * 三.原型上的核心方法和属性
         * 1.jQuery 获取jq版本号
         * 2.selector 实例默认的选择器取值
         * 3.length 实例默认的长度
         * 4.push 给实例添加新元素
         * 5.splice 按照指定下标指定数量删除元素，也可以替换删除的元素
         * 
         * 6.toArray 把实例转换为数组返回
         * 7.get 获取指定下标元素，获取的是原生DOM，get如果不穿参数，相当于调用toArray()方法
         * 8.eq获取制定下表的元素，获取的是jQuery类型的实例对象
         */
        (function (window, undefined) {
            var jQuery = function (selector) {
                return new jQuery.prototype.init(selector);
            }
            jQuery.prototype = {
                constructor: jQuery,
                init: function (selector) {
                    selector = jQuery.trim(selector)
                    //1.传入'' null undefined NaN 0 false
                    if (!selector) {

                    } //处理方法
                    else if (jQuery.isFunction(selector)) {
                        jQuery.ready(selector)
                    }
                    //2.字符串
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
                            [].push.apply(this, elem.children)
                            //2.1.4返回加工好的this(jQuery)
                        }
                        //2.2 判断是否是选择器
                        else {
                            //2.2.1根据传入的选择器找到对应的元素
                            var elem = document.querySelectorAll(selector);
                            //2.2.2将找到的元素添加到jQuery上
                            [].push.apply(this, elem)
                            //2.2.3返回加工上的this
                            //现在没有对length==1处理，只返回了伪数组
                        }
                    } //3.数组
                    else if (jQuery.isArray(selector)) {
                        /**
                         * 优化
                        if(({}).toString.apply(selector)==="[object Array]"){//真数组
                            [].push.apply(this,selector);
                        }else{//伪数组
                            var arr=[].slice.call(selector);
                            //将真数组转换为伪数组
                            [].push.apply(this,arr)
                        }
                         */
                        //将自定义伪数组转换为真数组
                        var arr = [].slice.call(selector);
                        //将真数组转换为伪数组
                        [].push.apply(this, arr);
                    } //4.以上类型除外
                    else {
                        this[0] = selector;
                        this.length = 1;
                    }
                    return this;
                },
                jQuery: "1.0.2", //版本号
                selector: "", //默认选择器
                length: 0, //默认长度
                push: [].push, //[].push找到数组的push方法，相当于[].push.apply(this)
                sort: [].sort,
                splice: [].splice,
                toArray: function () { //伪转换为真数组
                    return [].slice.call(this);
                },
                get: function (num) {
                    // 没有传参数
                    if (arguments.length === 0) {
                        return this.toArray();
                    } else if (num >= 0) {
                        return this[num];
                    } else {
                        return this[this.length + num];
                    }
                },
                eq: function (num) {
                    if (arguments.length === 0) {
                        return new jQuery();
                    } else {
                        return jQuery(this.get(num))
                    }
                },
                first:function(){
                    return this.eq(0);
                },
                last:function(){
                    return this.eq(-1);
                },
                each:function(fn){
                    return jQuery.each(this,fn);
                }
            }

            jQuery.extend = jQuery.prototype.extend = function (obj) {
                for (var key in obj) {
                    this[key] = obj[key];
                }
            }
            jQuery.extend({
                isString: function (str) {
                    return typeof str === "string"
                },
                isHTML: function (str) {
                    return str.charAt(0) == "<" &&
                        str.charAt(str.length - 1) == ">" &&
                        str.length >= 3
                },
                trim: function (str) {
                    //如果不是字符串就不去除两端空格
                    if (!jQuery.isString(str)) {
                        return str;
                    }
                    //判断当前浏览器是否支持trim方法
                    if (str.trim) {
                        return str.trim();
                    } else {
                        return str.replace(/^\s+|\s+$/g, "");
                    }
                },
                isObject: function (obj) {
                    return typeof obj === "object"
                },
                isWindow: function (event) {
                    return event !== window;
                },
                isArray: function (array) {
                    if (jQuery.isObject(array) && jQuery.isWindow(array) &&
                        "length" in array) {
                        return true
                    } else {
                        return false
                    }
                },
                isFunction: function (fn) {
                    return typeof fn === 'function'
                },
                ready: function (fn) {
                    //判断DOM是否加载完毕,加载完毕执行这个回调函数
                    if (document.readyState == "complete") {
                        fn();
                    } else if (document.addEventListener) {
                        document.addEventListener('DOMContentLoaded', function () {
                            fn();
                        });
                    } else {
                        document.attachEvent('onreadystatechange', function () {
                            if (document.readyState == "complete") {
                                fn();
                            }
                        });
                    }
                },
                each:function(obj,fn){
                    //1.判断是否是数组
                    if(jQuery.isArray(obj)){
                        for(var i=0;i<obj.length;i++){
                        obj[i]=fn.call(obj[i],obj[i],i,obj);
                           /**
                        var result=fn.call(obj[i],obj[i],i,obj);
                        var result=fn.call(key,obj[key],key,obj);
                           if(result===true){
                               continue;
                           }else if(result===false){
                               break;
                           }
                           * jQuery中 */
                        }
                    }
                    //2.判断是否是对象
                    else if(jQuery.isObject(obj)){
                        for(var key in obj){
                            obj[key]=fn.call(key,obj[key],key,obj);
                        }
                    }
                    return obj;
                },
                map:function(obj,fn){
                    var result=[];
                    //1.判断是否是数组
                    if(jQuery.isArray(obj)){
                        for(var i=0;i<obj.length;i++){
                        var temp=fn(obj[i],i,obj);
                            if(temp){
                                result.push(temp)
                            }
                        }
                    }
                     //2.判断是否是对象
                     else if(jQuery.isObject(obj)){
                        for(var key in obj){
                        var temp=fn(obj[key],key,obj);
                        if(temp){
                            result.push(temp)
                            }
                        }
                    }
                    return result;
                }
            });
            jQuery.prototype.init.prototype = jQuery.prototype;
            window.jQuery = window.$ = jQuery;
        })(window)
