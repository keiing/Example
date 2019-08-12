const express=require('express');

var bodyParser = require("body-parser");
// const mysql=require('mysql');
const fs=require('fs')
const server=express();

server.use(bodyParser.urlencoded({extended:false}));
server.use(express.static('strict'))
let users={
    'uname':"zhangsan",
    "upass":"123456"
}
server.get('/imageJson',function(req,res,next){
    console.log(req.query.uname+'-------req.query.uname');
    if(req.query.uname==users.uname&&req.query.upass==users.upass){
        // next();
        res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify('成功'))
    }else{
        res.send('密码错无')
    }
})
server.use('/index',function(req,res,next){
    var query=req.body;
    if(query.uname==users.uname&&query.upass==users.upass){
        console.log('/拦截器')
        next();
    }
})
server.post('/index',function(req,res){
    fs.readFile('image.json','utf8',function(err,data){
        res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify(data))
    })
})


// 写入文件内容（如果文件不存在会创建一个文件）
// 传递了追加参数 { 'flag': 'a' }
//fs.writeFile("文件么","写入数据","执行什么方法 默认 {'flag':'w'}",回调函数，第一个参数是error)
//flag传值，r代表读取文件，w代表写文件，a代表追加
fs.writeFile('image.json', (function(){
    arr=[];
    for(var i=0;i<100;i++){
        var obj={};
        obj['image']="image"+i+".jpg";
        arr.push(obj)
    }
    return JSON.stringify(arr);
})(),{'flag':'w'}, function(err) {
    if (err) {
        throw err;
    }
})
    // 写入成功后读取测试
server.listen(3000);