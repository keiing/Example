let express=require('express');
let WebSocket=require('ws');

let app=express();
//端口
let PORT=3000;
let TYPE_ENTER=0
let TYPE_LEAVE=1
let TYPE_MSG=2
let wss=new WebSocket.Server({port:PORT},()=>console.log('服务启动成功了'));
let count=0;//用户数量
wss.on('connection',function(ws){
// 当服务器和客户端握手成功后触发该事件,而第一个参数就是一个client对象
    count++;
    ws.userName=`用户${count}`
    //一旦有人进入聊天室就群发消息
    broadcast({type:TYPE_ENTER,
    data:`${ws.userName}进入了聊天室`,
    time:new Date().toLocaleString()})
    //收到客户端消息    
    ws.on('message', function incoming(data) {
        broadcast({name:ws.userName,type:TYPE_MSG,data:data,time:new Date().toLocaleString()});
    });
    ws.on('close',data=>{
        count--;
        broadcast({type:TYPE_LEAVE,data:`${ws.userName}离开了聊天室`,time:new Date().toLocaleString()});
    })
    //报错,防止报错服务器就终止运行
    wss.on('error',function(err){
        console.log(err);
    })
  });

// 给服务器对象上挂载一个广播的方法,向所有人广播
function broadcast(data){
    wss.clients.forEach(client=>{
        //如果连接是打开状态
        if(client.readyState===WebSocket.OPEN){
            client.send(JSON.stringify(data));
        }
/**readyState 当前连接的状态 一共四个值 0 连接中 1 打开 3 关闭中 4 关闭 (和浏览器端的状态码完全一致) */
/**如果连接状态是打开状态,且不是当前客户端对象client !== ws && client.readyState === WebSocket.OPEN */
    })    
}