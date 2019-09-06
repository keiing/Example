/**核心扩展操作js */
const http=require('http');
var app=module.exports={};//暴露出去了app app又等于{}
app.handle=function(req,res){//定义handle处理请求的
    res.end('hello world',res)
}
app.listen=function() {//开始服务
    //http.createServer(function(){}); 每个请求下来都会 都会对createServer传进去一个回调函数
    var server=http.createServer(this);//这个this指向 ./express.js的app上了，
    /**
     * 因为application是扩展方法，调用实在express.js运行的，该文件方法都会扩展到express.js app=fucntion()[}上
     */
    return server.listen.apply(server,arguments);
}