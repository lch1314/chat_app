const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const userRouter = require('./user');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const model = require('./model');
const Chat = model.getModel('chat');

io.on('connection', function(socket) {
    // console.log(socket)
    // 监听从前端发送过来的消息
    socket.on('sendmsg', function(data) {
        console.log(data)
        const { from, to, msg } = data;
        // 设置唯一id
        const chatid = [from,to].sort().join('_');
        // 把当前这条聊天信息插入到数据库中
        Chat.create({chatid, from, to, content: msg}, function(err, doc) {
            console.log('222',doc)
            // 入库之后并把消息发送给前端（全局）,前端在chat.redux中监听这个事件
            io.emit('recvmsg', Object.assign({}, doc))
        })
    })
})


app.use(cookieParser());
// 解析post数据
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093,function() {
    console.log('Node app start at port 9093')
})