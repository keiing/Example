//寻龙千万看缠山，一重缠是一重关，关门若有千重锁，定有王候居此间
//看框架县先理架构，再看入口 调用的入口，依流程读下去;

(function(window,undefined){
    //工厂模式
    var jQuery=function(){
        return new jQuery.init();
    }
    jQuery.prototype={
        init:function(){
            
        },
    };
    //$.extend({}) 只给入一个对象，那么就把这个对象加入到jquery
    //$.extend({},{a:23}) 如果给两个对象，就会把两个对象合并，并且返回出去
    jQuery.extend=function(){
        //接受一个对象，然后把这个对象扩展到jquery上
        /** 
        //---------------------------------------------------
            //arguments是个类数组，但他不是数组
            var arguments=Array.prototype.slice.call(arguments);
            //所以需要把这个类数组，转换成真正的数组
        //---------------------------------------------------
        */
        //jquery是这么做的
        var target=arguments[0]||{};
        var length=arguments.length;
        var i=1;var options;
        //如果target不是一个对象
        if(typeof target!=='object'){
            target={};//那就把target改成一个对象
        }
        if(length===1){
            target=this;
            i--;
        }
        for(;i<length;i++){
            //做循环操作
            if((options=arguments[i])!=null){
                target[name]=options[name];
            }
        }
    }
    jQuery.extend({
        //操作css
    })
    jQuery.extend({
        //动画
    })
    //对amd进行支持
    if(typeof define==='function'&&define.amd&&define.amd.jQuery){
        define('jquery',[],function(){return jQuery});
    }
    //通过引用类型注入init中
    jQuery.prototype=jQuery.init.prototype=jQuery.fn;
    window.$=jQuery;
    window.jQuery=jQuery;
})(window);
//为什么要传入一个window和一个undefined
/**window 处于性能上的考虑,因为js是链式查找，
  window就会自动隐士转换成局部变量，在函数内进行使用window时
  就不会向上查找了，因此就提高了代码效率;保证window能最快的能被查找到
  */
 /**undefined  undefined=123没有问题 不会报错 null=123就会报错,
  所以我们就看出来undefined就是一个全局变量,向匿名函数注入undefined的原因有
  1.更快的获取undefined;
  2.防止undefined被篡改
 */