const proto=require('./application.js');//核心扩展操作文件
module.exports=createApplication;//express也需要别的模块
function createApplication(){
    /**每个请求都会执行这个function ，再取执行内部的handle方法 也就是 从 application.js上扩展进来的app.handle方法打印(hello world)*/
 var app=function(req,res,next) {
    app.handle(req,res);
 }
 for(var item in proto){
     app[item]=proto[item];
 }
 return app;
}