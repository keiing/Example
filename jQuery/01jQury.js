/** 
 * 1.jQuery的本质是闭包
 * 2.jQuery为什么要使用必要来实现?为了避免多个框架冲突
*/

//寻龙千万看缠山，一重缠是一重关，关门若有千重锁，定有王候居此间
//看框架县先理架构，再看入口 调用的入口，依流程读下去;

(function (window,factory, undefined) {
    "use strict";
    //工厂模式
    
    var jQuery = function (selector,content) {
        return new jQuery.fn.init(selector,content);
    }
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function (selector,content) {
            var element=this._$(selector,content);
            var num=element?element.length:0;
            for(let i=0;i<num;i++){
                this[i]=element[i];
            }
            element&&element.length?this.length=element.length:this.length=0;
            return this;
        },
        _$:function(elem,content){
            if(!content){
                var query=document.querySelectorAll(elem);
                if(query.length>1){
                    return query;
                }
                return query[0];
            }else{
                var query=content.querySelectorAll(elem);
                if(query.length>1){
                    return query;
                }
                return query[0];
            }
        },
    };
    //$.extend({}) 只给入一个对象，那么就把这个对象加入到jquery.prototype中
    //$.extend({},{a:23}) 如果给两个对象，就会把两个对象合并，并且返回出去
    jQuery.fn.extend =jQuery.prototype.extend= function () {
        //接受一个对象，然后把这个对象扩展到jquery上
        /** 
        //---------------------------------------------------
            //arguments是个类数组，但他不是数组
            var arguments=Array.prototype.slice.call(arguments);
            //所以需要把这个类数组，转换成真正的数组
        //---------------------------------------------------
        */
        //jquery是这么做的
        var target = arguments[0] || {};
        var length = arguments.length;
        console.log(target,length)
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
            //做循环操作 深克隆
            if ((options = arguments[i]) != null)
                for (var name in options) {
                        target[name] = options[name];
                    }
        }
        return target;
    }
    jQuery.extend({
        constructor:jQuery,
        //操作css
        css: function (selector) {
            console.log(this)
            console.log(selector)
        }
    })
    jQuery.extend({
        //动画
    })
    //对amd进行支持 模块进行检测
    if (typeof define === 'function' && define.amd && define.amd.jQuery) {
        define('jquery', [], function () {
            return jQuery
        });
    }
    //通过引用类型注入init中
    jQuery.fn = jQuery.fn.init.prototype = jQuery.prototype;

    jQuery.prototype = jQuery.prototype.init.prototype = jQuery.fn;

    window.jQuery = window.$ = jQuery;
}(typeof window!=="undefined"?window:this,function(window,factory){

}))
//为什么要传入一个window和一个undefined
/**1.window 处于性能上的考虑,因为js是链式查找，
  window就会自动隐士转换成局部变量，在函数内进行使用window时
  就不会向上查找了，因此就提高了代码效率;保证window能最快的能被查找到
  2.对压缩有好处
  */
/**undefined  undefined=123没有问题 不会报错 null=123就会报错,
 所以我们就看出来undefined就是一个全局变量,向匿名函数注入undefined的原因有
 1.更快的获取undefined;
 2.防止undefined被篡改
*/