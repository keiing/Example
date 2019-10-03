const webSocket=require('nodejs-websocket');
const PORT=3000;
//记录当前连接上来用户的数量

const TYPE_ENTER=0
const TYPE_LEAVE=1
const TYPE_MSG=2
/**
 分析：
 * 消息不应该是简单的字符串
 这个消息应该是一个对象
 type:消息的类型，0：表示进入聊天室的消息 1：用户离开聊天室的消息,msg：消息的内容
 time：聊天的具体时间 
 */
let count=0;
//connect每个连接到服务器的用户，都有一个connect
const server=webSocket.createServer(connect=>{
    count++;
    connect.userName=`用户${count}`
        //1.告诉所有用户，有人加入了聊天室
    barodcast({
        type:TYPE_ENTER,
        msg:`${connect.userName}进入聊天室`,
        time:new Date().toLocaleString()
    })
    //收到浏览器的数据触发
    connect.on('text',data=>{
        //2.当我们们接受到某个用户的信息时候，告诉所用户发送消息内容是什么
        barodcast({
            type:TYPE_MSG,
            msg:data,
            time:new Date().toLocaleString()
        })
    })
    //关闭连接触发
    connect.on('close',data=>{
        count--;
        barodcast(
            {
                type:TYPE_LEAVE,
                msg:`${connect.userName}离开了聊天室`,
                time:new Date().toLocaleString()
            })
        //3.告诉所有人，有人离开了聊天室
    })
    //发生异常触发
    connect.on('error',data=>{
        console.log(data)
    })
})

//广播，给所有用户发消息
function barodcast(message){
    server.connections.forEach(item=>{
        item.send(JSON.stringify(message))
    })
}

server.listen(PORT,()=>console.log('websocket服务启动成功了，监听了端口'+PORT))