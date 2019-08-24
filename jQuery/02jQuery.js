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
         * 9.first 获取实例中的第一个元素，是jQuery类型的实例对象
         * 10.last 获取实例中的最后一个元素，是jQuery类型的实例对象
         * 11.each 便利实例，把便利到的数据传给回调使用，修改原数组
         * 12.map 便利实例，把便利到的数据传给回调使用，然后吧回调的返回值收集起来组成一个新数组返回
         */

        /**
         * 四.jQueryDOM操作方法
         * appenTo
         * 1.如果指定元素有多个，会将元素拷贝多份添加到指定元素中
         * 2.给apendTo方法传递字符串，会根据字符串找到所有对应元素后再添加
         * 3.给appendTo方法传递jQuery对象，会将元素添加到jQuery对象保存的所有指定元素中
         * 4.给appendTo方法传递DOM元素，会将元素添加到所有指定DOM元素中
         */
        /**
         * DOM操作:
         * 8.指定元素.prepend.元素==>将元素添加到指定元素内部的最前面
         * 9.元素.insertAfter.指定元素==>将元素添加到指定外部的后面-->使用·原生的nextSibling属性
         * 10.指定元素.after.元素==>将元素添加到指定元素外部的后面
         * 11.元素.insertBefore.指定元素==>将元素添加到指定元素外部的前面
         * 12.指定元素.before.元素==>将元素添加到指定元素外部的前面
         * 13.元素.replaceAll.指定元素==>替换所有指定元素
         * 14.clone==>复制节点,(true深复制,false浅拷贝)
         * 
         */
        /**
         * DOM操作
         * 需要用的nextSibling和previousSibling属性
         * next([expr]) 获取紧邻的后面同辈元素的元素
         * prev([expr]) 获取紧邻的前一个同辈元素的元素
         * 
         */
        /**
         * 1.attr();设置或者获取属性的属性节点值
         * 2.prop();设置或者获取属性的属性值
         * 3.css();设置或者获取样式
         * 4.val();设置或者获取value的值
         * 5.hasClass();判断有没有指定类
         * 6.addClass();给所有元素添加指定类或所有类
         * 7.removeClass();清空所有元素指定类或者所有类
         * 8.toggleClass();有则删除，没有则添加
         */
        (function (global, factory) {
            if (typeof module === "object" && typeof module.export === "object") {
                module.export = window.document ?
                    factory(window, true) :
                    function (window) {
                        if (!window.document) {
                            throw new Error('jQuery requries a window with a document')
                        }
                        return factory(window);
                    }
            } else {
                factory(window);
            }

        }(typeof window !== "undefined" ? window : this, function (window, undefined) {
            var vision = "1.0.2",
                jQuery = function (selector) {
                    return new jQuery.fn.init(selector);
                },
                _jQuery = window.jQuery,
                _$ = window.$,
                document = window.document,
                noGlobal = !window;
            var arr = [],
                slice = arr.slice,
                concat = arr.concat,
                push = arr.push,
                indexOf = arr.indexOf;
            var classtype = {},
                toString = classtype.toString,
                has = classtype.hasOwnProperty,
                support = {};
            jQuery.prototype = jQuery.fn = {
                constructor: jQuery,
                init: function (selector) {
                    selector = jQuery.trim(selector)
                    //*1.传入'' null undefined NaN 0 false*/
                    if (!selector) {

                    } //*处理方法*/
                    else if (jQuery.isFunction(selector)) {
                        jQuery.ready(selector)
                    }
                    //*2.字符串*/
                    else if (jQuery.isString(selector)) {
                        //*2.1 判断是否是代码片段 <a>*/
                        if (jQuery.isHTML(selector)) {
                            //*2.1.1根据代码片段创建所有的元素*/
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
                            //*2.1.4返回加工好的this(jQuery)*/
                        }
                        //*2.2 判断是否是选择器 选择器需要改进*/
                        else {
                            /** 
                            //2.2.1根据传入的选择器找到对应的元素
                            var elem = document.querySelectorAll(selector);
                            //2.2.2将找到的元素添加到jQuery上
                            [].push.apply(this, elem)
                            //2.2.3返回加工上的this
                            //现在没有对length==1处理，只返回了伪数组
                            */
                            //*封装dom*/
                            jQuery.sizzle.call(this, selector)
                            this.prevObject = this;
                            this.content = document;
                            this.selector = selector;
                        }
                    } //*3.数组*/
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
                        this.prevObject = this;
                        this.content = document;
                        if (jQuery.isString(selector)) {
                            this.isSelect = selector;
                        } else {
                            this.selector = this.selector;
                        }
                        /**
                        if(!jQuery.isObject(selector)){
                                push(selector);
                            this.selector = selector;
                        }else{
                            if(arr.length>0){
                                console.log(arr,"arr")
                                this.selector=arr[arr.length-1]
                            }
                        } */
                    } //*4.以上类型除外*/
                    else {
                        this[0] = selector;
                        this.content = document;
                        this.selector = selector;
                        this.length = 1;
                    }
                    return this;
                },
                jQuery: vision, //*版本号*/
                selector: "", //*默认选择器*/
                length: 0, //*默认长度*/
                push: push, //*[].push找到数组的push方法，相当于[].push.apply(this)*/
                sort: arr.sort,
                splice: arr.splice,
                toArray: function () { //*伪转换为真数组*/
                    return [].slice.call(this);
                },
                get: function (num) {
                    //* 没有传参数*/
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
                first: function () {
                    return this.eq(0);
                },
                last: function () {
                    return this.eq(-1);
                },
                each: function (fn) {
                    return jQuery.each(this, fn);
                }
            }
            jQuery.prototype.init.prototype = jQuery.prototype = jQuery.fn;
            jQuery.extend = jQuery.fn.extend = function (obj) {
                /**简单克隆
                 * obj=obj||{};
                 for (var key in obj) {
                    this[key] = obj[key];
                    }*/
                /**
                //接受一个对象，然后把这个对象扩展到jquery上
                //---------------------------------------------------
                    arguments是个类数组，但他不是数组
                    var arguments=Array.prototype.slice.call(arguments);
                    所以需要把这个类数组，转换成真正的数组
                //---------------------------------------------------
                */
                //jquery是这么做的
                var target = arguments[0] || {};
                var length = arguments.length;
                var i = 1;
                var options;
                //如果target不是一个对象
                if (typeof target !== 'object') {
                    target = {}; //那就把target改成一个对象
                }
                if (length === 1) {
                    target = this;
                    i--;
                }
                for (; i < length; i++) {
                    if ((options = arguments[i]) != null)
                        for (var name in options) {
                            target[name] = options[name];
                        }
                }
                return target;
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
                    //*如果不是字符串就不去除两端空格*/
                    if (!jQuery.isString(str)) {
                        return str;
                    }
                    //*判断当前浏览器是否支持trim方法*/
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
                    //*判断DOM是否加载完毕,加载完毕执行这个回调函数*/
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
                each: function (obj, fn) {

                    //*1.判断是否是数组*/
                    if (jQuery.isArray(obj)) {
                        for (var i = 0; i < obj.length; i++) {
                            var result = fn.call(obj[i], obj[i], i, obj);
                            if (result) {
                                obj[i] = result;
                            }
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
                    //*2.判断是否是对象*/
                    else if (jQuery.isObject(obj)) {
                        for (var key in obj) {
                            var result = fn.call(key, obj[key], key, obj);
                        }
                        if (result) {
                            obj[key] = result;
                        }

                    }
                    return obj;
                },
                map: function (obj, fn) {
                    var arr = [];
                    //*1.判断是否是数组*/
                    if (jQuery.isArray(obj)) {
                        for (var i = 0; i < obj.length; i++) {
                            var temp = fn(obj[i], i, obj);
                            if (temp) {
                                arr.push(temp)
                            }
                        }
                    }
                    //*2.判断是否是对象*/
                    else if (jQuery.isObject(obj)) {
                        for (var key in obj) {
                            var temp = fn(obj[key], key, obj);
                            if (temp) {
                                arr.push(temp)
                            }
                        }
                    }
                    return arr;
                }
            });
            jQuery.fn.extend({
                empty: function () {
                    //*便利找到所有的元素*/
                    this.each(function (value, index) {
                        value.innerHTML = "";
                    })
                    return this;
                },
                remove: function (sele) {
                    if (arguments.length === 0 || arguments[0] === "") {
                        //*便利找到所有的元素*/
                        this.each(function (value, index) {
                            //*根据便利到的元素找到对应的父元素*/
                            var parent = value.parentNode;
                            //*通过父元素删除指定的元素*/
                            parent.removeChild(value)
                        })
                    } else {
                        var $this = this;
                        //*1.根据传入的选择器找到指定的元素*/
                        var selector = jQuery.isSelect(sele);
                        //*未改完 判断 是选择器还是标签*/
                        //*2.遍历找到的元素，获取的对应的类型*/
                        $(sele).each(function (value, index) {
                            var type = value.tagName;
                            var isName = value.getAttribute(selector);
                            //*3.遍历指定元素*/
                            $this.each(function (value, index) {
                                //*4.获取指定元素的类型*/
                                var t = value.tagName;
                                if (selector != "ID" && selector != "CLASS") {
                                    //*5.判断找到元素的类型和指定元素的类型*/
                                    if (t === type) {
                                        var parent = value.parentElement;
                                        parent.removeChild(value);
                                        jQuery.prototype.splice.call($this, index, 1)
                                    }

                                } else {
                                    //*5.判断找到元素的类型和指定元素的类型*/
                                    if (t === type && isName === value.getAttribute(selector)) {
                                        var parent = value.parentElement;
                                        parent.removeChild(value);
                                        jQuery.prototype.splice.call($this, index, 1)
                                    }
                                }
                            })
                        })
                    }
                    return this;
                },
                html: function (content) {
                    if (arguments.length === 0) {
                        return this[0].innerHTML;
                    } else {
                        this.each(function (val, index) {
                            val.innerHTML = content;
                        });
                    }
                    return this;
                },
                text: function (content) {
                    if (arguments.length === 0) {
                        var result = "";
                        this.each(function (value, index) {
                            result += value.innerText;
                        })
                        return result;
                    } else {
                        this.each(function (value, key) {
                            jQuery.fn.selector = value.innerText = content;
                        })
                    }
                    return this;
                },
                /**使用document.getElementsByClassName('')选择器传入数组会出现重复刷新数组数量造成无限循环的现象*/
                appendTo: function (sele) {
                    /**
                    for (var i = 0; i < $target.length; i++) {
                        //1.遍历取出所有指定的元素;
                        var targetElem=$target[i];
                        var Tips = false, //提示
                            warning = false, //警告
                            Danger = false; //危险
                        //2.判断当前是否是第0个指定元素
                        for (var j = 0; j < this.length; j++) {
                            var sourceElem = this[j];
                            if (i === 0) {
                                targetElem.appendChild(sourceElem)
                                //直接添加
                            } else {
                                //先拷贝再添加
                                var elem = sourceElem.cloneNode(true);
                                targetElem.appendChild(elem)
                                if (i > 100 || j > 100) {
                                    if (!Tips && confirm('检测到重复执行超过100次可能即将进入无限循环!!是否强制停止')) {
                                        break;
                                    } else {
                                        Tips = true;
                                    };
                                }
                                if (!warning && (i > 1000 || j > 1000)) {
                                    if (confirm('检测到重复执行超过1000次可能即将进入无限循环!!是否强制停止')) {
                                        break;
                                    } else {
                                        warning = true;
                                    };
                                }
                                if (!Danger && (i > 10000 || j > 10000)) {
                                    if (confirm('检测到重复执行超过10000次可能即将进入无限循环!!是否强制停止')) {
                                        break;
                                    };
                                } else {
                                    Danger = true;}
                            }
                        }
                    }*/
                    /** 把传入的参数统一转为jQuery对象*/
                    var $target = $(sele);
                    var $this = this;
                    var result = [];
                    /*1.遍历取出所有指定的元素;*/
                    $.each($target, function (value, index) {
                        var targetElem = value;
                        $this.each(function (value) {
                            /*2.判断当前是否是第0个指定元素*/
                            if (index === 0) {
                                targetElem.appendChild(value)
                                result.push(value);
                                /*直接添加*/
                            } else {
                                /*先拷贝再添加*/
                                var elem = value.cloneNode(true);
                                targetElem.appendChild(elem);
                                result.push(elem)
                            }
                        })
                    });
                    return $(result)
                },
                prependTo: function (sele) {
                    var $target = $(sele);
                    var $this = this;
                    var result = [];
                    /*1.遍历取出所有指定的元素;*/
                    $.each($target, function (val, index) {
                        var targetElem = val;
                        $this.each(function (value) {
                            /*2.判断当前是否是第0个指定元素*/
                            if (index === 0) {
                                targetElem.insertBefore(value, val.firstChild)
                                result.push(value);
                                /*直接添加*/
                            } else {
                                /*先拷贝再添加*/
                                var elem = value.cloneNode(true);
                                targetElem.insertBefore(elem, val.firstChild);
                                result.push(elem)
                            }
                        })
                    });
                    return $(result)
                },
                append: function (sele) {
                    //*判断传入的参数是否是字符串*/
                    if (jQuery.isString(sele)) {
                        this.each(function (val) {
                            val.innerHTML += sele;
                        });
                    } else { //*在什么什么标签后添加内容*/
                        if (sele instanceof jQuery) {
                            sele.appendTo(this)
                        } else {
                            $(sele).appendTo(this)
                        }
                    }
                    return this;
                },
                prepend: function (sele) {
                    /* 指定元素.prepend.元素==>将元素添加到指定元素内部的最前面*/
                    if (jQuery.isString(sele)) {
                        this.each(function (val) {
                            val.innerHTML = sele + val.innerHTML;
                        });
                    } else {
                        if (sele instanceof jQuery) {
                            sele.prependTo(this)
                        } else {
                            $(sele).prependTo(this)
                        }
                    }
                    return this;
                },
                /**元素.after(指定元素) 将元素添加到指定元素的后面 */
                insertAfter: function (sele) {
                    var $target = $(sele);
                    var $this = this;
                    var result = [];
                    $.each($target, function (val, index) {
                        $this.each(function (value) {
                            if (index === 0) {
                                val.after(value)
                                result.push(value);
                            } else {
                                var elem = value.cloneNode(true);
                                val.after(elem);
                                result.push(elem);
                            }
                        })
                    })
                    return result;
                },
                /**指定元素.after(元素) 将元素添加到指定元素的后面 */
                after: function (sele) {
                    var $target = $(sele);
                    var $this = this;
                    var result = [];
                    $.each($target, function (value, index) {
                        $this.each(function (val, index) {
                            if (index === 0) {
                                val.after(value)
                                result.push(value);
                            } else {
                                var elem = value.cloneNode(true);
                                val.after(elem);
                                result.push(elem);
                            }
                        })
                    })
                    return result;
                },
                /**元素.insertBefore(指定元素)调用者是谁，就会把元素插入到调用者的前面 将指定元素添加到元素的前面 */
                insertBefore: function (sele) {
                    var $target = $(sele),
                        $this = this;
                    var result = [];
                    /*1.遍历取出所有指定的元素;*/
                    $.each($target, function (value, index) {
                        var parent = value.parentNode;
                        $this.each(function (val) {
                            /*2.判断当前是否是第0个指定元素*/
                            if (index === 0) {
                                //在val==插入元素  val元素 前面 插入 value  value==被插入元素
                                parent.insertBefore(val, value)
                                result.push(val);
                                /*直接添加*/
                            } else {
                                /*先拷贝再添加*/
                                var elem = value.cloneNode(true);
                                parent.insertBefore(elem, value);
                                result.push(elem)
                            }
                        })
                    });
                    return $(result)
                },
                /**指定元素.before(元素) 将元素添加到指定元素的前面 */
                before: function (sele) {
                    var $target = $(sele),
                        $this = this;
                    var result = [];
                    $.each($target, function (value, index) {
                        $this.each(function (val, index) {
                            if (index === 0) {
                                val.before(value);
                                result.push(value);
                            } else {
                                var elem = value.cloneNode(true);
                                val.before(elem);
                                result.push(elem)
                            }
                        })
                    });
                    return $(result)
                },
                /**repaceAll替换内容.被替换内容*/
                replaceAll(sele) {
                    var $target = $(sele);
                    var $this = this;
                    var result = [];
                    $.each($target, function (value, index) {
                        var parent = value.parentNode;
                        //2.遍历取出所有的元素
                        $this.each(function (val, key) {
                            if (key === 0) {
                                var temp = val.cloneNode(true);
                                parent.insertBefore(temp, value)
                                if ($this.length - 1 == key) {
                                    $(value).remove();
                                } else if (key === $target.length) {
                                    $(value).remove();
                                }
                                result.push(temp);
                            } else {
                                var temp = val.cloneNode(true);
                                parent.insertBefore(temp, value)
                                if ($this.length - 1 == key) {
                                    $(value).remove();
                                } else if (key === $target.length - 1) {
                                    $(value).remove();
                                }
                                result.push(temp);
                            }
                        })
                    });
                    return $(result);
                }
            });
            jQuery.fn.extend({
                /**下一个选择器 */
                next: function (selector) {
                    return jQuery.nth.call(this,"nextElementSibling",1,selector);
                     /**
                    var $this = this,
                        result = [];
                        $this.each(function (value, index) {
                            if (val=value["nextElementSibling"]) {
                                if(val.nodeType===1){
                                    if (selector===undefined) {
                                        result.push(val);
                                    }else if((val.nodeName==selector.toLocaleUpperCase())){
                                        result.push(val)
                                    }
                                }
                            }
                        })
                    return $(result); 
                    */
                },
                /**上一个选择器 */
                prev: function (selector) {
                    return jQuery.nth.call(this,"previousElementSibling",1,selector);
                        /**selector.previousSibling;//下一个文本节点 */
                    /**
                    var $this = this,
                        result = [];
                        $this.each(function (value, index) {
                            if (val=value["previousElementSibling"]) {
                                if(val.nodeType===1){
                                    selector默认返回值
                                    if (selector===undefined) {
                                        result.push(val);
                                    }else if((val.nodeName==selector.toLocaleUpperCase())){
                                        result.push(val)
                                    }
                                }
                            }
                        })
                    return $(result); 
                    */
                },/**之后的所有兄弟 */
                nextAll:function(){

                },/**之前的所有兄弟 */
                prevAll:function(){}
            })
            jQuery.extend({
                //*判断什么类型选择器*/
                isSelect(selector) {
                    if (selector.charAt(0) === "#") {
                        //* console.log('id选择器')*/
                        return 'ID'
                    } else if (selector.charAt(0) === '.') {
                        //* console.log('class选择器')*/
                        return 'CLASS'
                    } else {
                        return selector;
                    }
                },
                /** 选择器 */
                sizzle: function (selector) {
                    var elem = document.querySelectorAll(selector);
                    arr.push.apply(this, elem)
                    return this;
                },/**next prev 仿写jQuery */
                nth:function(typeName,i,selector){
                    var $this = this,
                        result = [],
                        i=i||1,
                        selector=selector||undefined;
                        $this.each(function (value, index) {
                            if (val=value[typeName]) {
                                if(val.nodeType===i){
                                    /**selector默认返回值 */
                                    if (selector===undefined) {
                                        result.push(val);
                                    }else if((val.nodeName==selector.toLocaleUpperCase())){
                                        result.push(val)
                                    }
                                }
                            }
                        })
                    return $(result);
                }
            });
            jQuery.fn.extend({
                attr: function (attr, value) {
                    /**1.判断是否是字符串 */
                    if (jQuery.isString(attr)) {
                        //*判断是一个字符串还是两个字符串*/
                        if (arguments.length === 1) {
                            return this[0].getAttribute(attr);
                        } else {
                            this.each(function (val, key) {
                                val.setAttribute(attr, value);
                            })
                        }
                    }
                    /**2.判断是否是对象 */
                    else if (jQuery.isObject(attr)) {
                        var $this = this;
                        /*便利取出所有属性节点的名称和对应的值*/
                        $.each(attr, function (valKey, name) {
                            /*遍历取出所有的元素*/
                            $this.each(function (value, index) {
                                value.setAttribute(name, valKey)
                            })
                        })
                    }
                    return this;
                }
            })
            if (!noGlobal) {
                window.jQuery = window.$ = jQuery;
            }
            return jQuery;
        }));
